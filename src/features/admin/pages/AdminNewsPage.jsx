import { useState } from 'react'
import { Link } from 'react-router-dom'
import Badge from '@/shared/components/Badge'
import Button from '@/shared/components/Button'
import ConfirmDialog from '@/shared/components/ConfirmDialog'
import Icon from '@/shared/components/Icon'
import Modal from '@/shared/components/Modal'
import PageHeader from '@/shared/components/PageHeader'
import Seo from '@/shared/components/Seo'
import Time from '@/shared/components/Time'
import { newsCategories } from '@/shared/config/catalogs'
import { paths } from '@/shared/config/paths'
import { useAction } from '@/shared/hooks/useAction'
import { useToast } from '@/shared/hooks/useToast'
import NewsForm from '../components/NewsForm'
import PagedTable from '../components/PagedTable'
import StatusBadge from '../components/StatusBadge'
import { useAdminList } from '../hooks/useAdminList'
import { adminNewsService } from '../services/adminNewsService'

export default function AdminNewsPage() {
  const toast = useToast()
  const list = useAdminList('news', adminNewsService.list)
  const [editing, setEditing] = useState(null)
  const [deleting, setDeleting] = useState(null)

  const [removeNews, removing] = useAction(
    async (item) => {
      await adminNewsService.remove(item.id)
      setDeleting(null)
      list.reload()
    },
    { successMessage: 'Noticia borrada.' },
  )

  const handleSubmit = async (payload) => {
    if (editing === 'new') {
      await adminNewsService.create(payload)
      toast.success('Noticia creada.')
    } else {
      await adminNewsService.update(editing.id, payload)
      toast.success('Noticia actualizada.')
    }
    setEditing(null)
    list.reload()
  }

  const columns = [
    {
      key: 'title',
      header: 'Noticia',
      primary: true,
      render: (item) => (
        <div>
          <p>{item.title}</p>
          <p className="mt-1">
            <Badge tone={newsCategories.toneOf(item.category)}>{newsCategories.labelOf(item.category)}</Badge>
          </p>
        </div>
      ),
    },
    { key: 'status', header: 'Estado', render: (item) => <StatusBadge active={item.isActive} activeLabel="Publicada" inactiveLabel="Oculta" /> },
    { key: 'date', header: 'Fecha', render: (item) => <Time value={item.createdAt} format="short" /> },
    {
      key: 'actions',
      actions: true,
      header: 'Acciones',
      render: (item) => (
        <div className="flex flex-wrap justify-end gap-2 md:justify-start">
          {item.isActive && (
            <Link to={paths.newsDetail(item)} className="btn btn-ghost btn-sm">
              Ver<span className="sr-only"> {item.title}</span>
            </Link>
          )}
          <Button variant="secondary" size="sm" onClick={() => setEditing(item)}>
            <Icon name="pencil" className="h-4 w-4" />
            Editar<span className="sr-only"> {item.title}</span>
          </Button>
          <Button variant="ghost" size="sm" onClick={() => setDeleting(item)}>
            <Icon name="trash" className="h-4 w-4" />
            Borrar<span className="sr-only"> {item.title}</span>
          </Button>
        </div>
      ),
    },
  ]

  return (
    <>
      <Seo title="Administrar noticias" path={paths.adminNews} robots="noindex,nofollow" />
      <PageHeader
        title="Noticias"
        description="Crea, edita y publica las noticias de la comunidad."
        actions={
          <Button onClick={() => setEditing('new')}>
            <Icon name="plus" />
            Nueva noticia
          </Button>
        }
      />
      <PagedTable
        list={list}
        columns={columns}
        caption="Listado de noticias"
        emptyIcon="newspaper"
        emptyTitle="Todavía no hay noticias"
        emptyDescription="Crea la primera noticia con el botón «Nueva noticia»."
      />

      {editing && (
        <Modal
          title={editing === 'new' ? 'Nueva noticia' : 'Editar noticia'}
          size="lg"
          onClose={() => setEditing(null)}
        >
          <NewsForm news={editing === 'new' ? null : editing} onSubmit={handleSubmit} onCancel={() => setEditing(null)} />
        </Modal>
      )}

      {deleting && (
        <ConfirmDialog
          title="Borrar noticia"
          message={`¿Seguro que quieres borrar «${deleting.title}»? Esta acción no se puede deshacer.`}
          confirmLabel="Borrar noticia"
          pending={removing}
          onConfirm={() => removeNews(deleting)}
          onCancel={() => setDeleting(null)}
        />
      )}
    </>
  )
}
