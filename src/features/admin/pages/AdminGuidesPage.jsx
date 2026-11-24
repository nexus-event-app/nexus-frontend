import { useState } from 'react'
import { Link } from 'react-router-dom'
import ActionMenu from '@/shared/components/ActionMenu'
import Button from '@/shared/components/Button'
import ConfirmDialog from '@/shared/components/ConfirmDialog'
import Icon from '@/shared/components/Icon'
import Modal from '@/shared/components/Modal'
import PageHeader from '@/shared/components/PageHeader'
import Seo from '@/shared/components/Seo'
import Time from '@/shared/components/Time'
import { paths } from '@/shared/config/paths'
import { useAction } from '@/shared/hooks/useAction'
import { useToast } from '@/shared/hooks/useToast'
import { categoryOf } from '@/features/guides/config/categories'
import GuideForm from '../components/GuideForm'
import PagedTable from '../components/PagedTable'
import StatusBadge from '../components/StatusBadge'
import { useAdminList } from '../hooks/useAdminList'
import { adminGuidesService } from '../services/adminGuidesService'

export default function AdminGuidesPage() {
  const toast = useToast()
  const list = useAdminList('guides', adminGuidesService.list)
  const [editing, setEditing] = useState(null)
  const [deleting, setDeleting] = useState(null)

  const [openEditor, opening] = useAction(async (item) => setEditing(await adminGuidesService.get(item.id)))

  const [removeGuide, removing] = useAction(
    async (item) => {
      await adminGuidesService.remove(item.id)
      setDeleting(null)
      list.reload()
    },
    { successMessage: 'Guía borrada.' },
  )

  const handleSubmit = async (payload) => {
    if (editing === 'new') {
      await adminGuidesService.create(payload)
      toast.success(payload.published ? 'Guía creada y publicada.' : 'Guía guardada como borrador.')
    } else {
      await adminGuidesService.update(editing.id, payload)
      toast.success('Guía actualizada.')
    }
    setEditing(null)
    list.reload()
  }

  const columns = [
    {
      key: 'title',
      header: 'Guía',
      primary: true,
      render: (item) => (
        <p>
          {item.title}
          <span className="mt-1 block text-sm font-normal text-ink-muted">
            {categoryOf(item.category).emoji} {categoryOf(item.category).adminLabel} · /guias/{item.slug}
          </span>
        </p>
      ),
    },
    {
      key: 'status',
      header: 'Estado',
      render: (item) => <StatusBadge active={item.published} activeLabel="Publicada" inactiveLabel="Borrador" />,
    },
    { key: 'date', header: 'Actualizada', render: (item) => <Time value={item.updatedAt} format="short" /> },
    {
      key: 'actions',
      actions: true,
      header: 'Acciones',
      render: (item) => (
        <ActionMenu className="justify-end md:justify-start">
          {item.published && (
            <Link to={paths.guideDetail(item)} className="btn btn-ghost btn-sm">
              Ver<span className="sr-only"> {item.title}</span>
            </Link>
          )}
          <Button variant="secondary" size="sm" disabled={opening} onClick={() => openEditor(item)}>
            <Icon name="pencil" className="h-4 w-4" />
            Editar<span className="sr-only"> {item.title}</span>
          </Button>
          <Button variant="ghost" size="sm" onClick={() => setDeleting(item)}>
            <Icon name="trash" className="h-4 w-4" />
            Borrar<span className="sr-only"> {item.title}</span>
          </Button>
        </ActionMenu>
      ),
    },
  ]

  return (
    <>
      <Seo title="Administrar guías" path={paths.adminGuides} robots="noindex,nofollow" />
      <PageHeader
        title="Guías"
        description="Escribe y publica las guías de la comunidad. Son públicas y ayudan a que Google encuentre la web."
        actions={
          <Button onClick={() => setEditing('new')}>
            <Icon name="plus" />
            Nueva guía
          </Button>
        }
      />
      <PagedTable
        list={list}
        columns={columns}
        caption="Listado de guías"
        emptyIcon="document"
        emptyTitle="Todavía no hay guías"
        emptyDescription="Crea la primera guía con el botón «Nueva guía»."
      />

      {editing && (
        <Modal title={editing === 'new' ? 'Nueva guía' : 'Editar guía'} size="lg" onClose={() => setEditing(null)}>
          <GuideForm
            guide={editing === 'new' ? null : editing}
            onSubmit={handleSubmit}
            onCancel={() => setEditing(null)}
          />
        </Modal>
      )}

      {deleting && (
        <ConfirmDialog
          title="Borrar guía"
          message={`¿Seguro que quieres borrar «${deleting.title}»? Esta acción no se puede deshacer.`}
          confirmLabel="Borrar guía"
          pending={removing}
          onConfirm={() => removeGuide(deleting)}
          onCancel={() => setDeleting(null)}
        />
      )}
    </>
  )
}
