import { useState } from 'react'
import { discussionService } from '@/features/forum/services/discussionService'
import Badge from '@/shared/components/Badge'
import Button from '@/shared/components/Button'
import ConfirmDialog from '@/shared/components/ConfirmDialog'
import Icon from '@/shared/components/Icon'
import PageHeader from '@/shared/components/PageHeader'
import SearchBar from '@/shared/components/SearchBar'
import Seo from '@/shared/components/Seo'
import Time from '@/shared/components/Time'
import { discussionCategories } from '@/shared/config/catalogs'
import { paths } from '@/shared/config/paths'
import { useAction } from '@/shared/hooks/useAction'
import DiscussionModeration from '../components/DiscussionModeration'
import PagedTable from '../components/PagedTable'
import StatusBadge from '../components/StatusBadge'
import { useAdminList } from '../hooks/useAdminList'
import { adminDiscussionsService } from '../services/adminDiscussionsService'

export default function AdminForumPage() {
  const list = useAdminList('discussions', adminDiscussionsService.list)
  const [moderating, setModerating] = useState(null)
  const [deleting, setDeleting] = useState(null)

  const [removeDiscussion, removing] = useAction(
    async (discussion) => {
      await discussionService.remove(discussion.id)
      setDeleting(null)
      setModerating(null)
      list.reload()
    },
    { successMessage: 'Discusión borrada.' },
  )

  const columns = [
    {
      key: 'title',
      header: 'Discusión',
      primary: true,
      render: (discussion) => (
        <div>
          <p>{discussion.title}</p>
          <p className="mt-1">
            <Badge tone={discussionCategories.toneOf(discussion.category)}>
              {discussionCategories.labelOf(discussion.category)}
            </Badge>
          </p>
        </div>
      ),
    },
    { key: 'author', header: 'Autor', render: (discussion) => discussion.authorName || 'Usuario' },
    { key: 'comments', header: 'Comentarios', render: (discussion) => discussion.commentCount },
    { key: 'status', header: 'Estado', render: (discussion) => <StatusBadge active={discussion.isActive} /> },
    { key: 'date', header: 'Fecha', render: (discussion) => <Time value={discussion.createdAt} format="short" /> },
    {
      key: 'actions',
      header: 'Acciones',
      render: (discussion) => (
        <div className="flex flex-wrap justify-end gap-2 md:justify-start">
          <Button variant="secondary" size="sm" onClick={() => setModerating(discussion)}>
            <Icon name="eye" className="h-4 w-4" />
            Ver<span className="sr-only"> {discussion.title}</span>
          </Button>
          <Button variant="ghost" size="sm" onClick={() => setDeleting(discussion)}>
            <Icon name="trash" className="h-4 w-4" />
            Borrar<span className="sr-only"> {discussion.title}</span>
          </Button>
        </div>
      ),
    },
  ]

  return (
    <>
      <Seo title="Moderar el foro" path={paths.adminForum} robots="noindex,nofollow" />
      <PageHeader
        title="Moderación del foro"
        description="Revisa discusiones y comentarios, incluidas las discusiones inactivas."
      />
      <div className="mb-6">
        <SearchBar
          value={list.search}
          onSearch={(value) => list.setFilters({ q: value }, { replace: true })}
          label="Buscar discusiones"
          placeholder="Buscar por título o contenido…"
        />
      </div>
      <PagedTable
        list={list}
        columns={columns}
        caption="Listado de discusiones"
        emptyIcon="chat"
        emptyTitle="No hay discusiones"
        emptyDescription="Cuando haya actividad en el foro aparecerá aquí."
      />

      {moderating && (
        <DiscussionModeration
          discussion={moderating}
          onClose={() => setModerating(null)}
          onDeleteDiscussion={setDeleting}
        />
      )}

      {deleting && (
        <ConfirmDialog
          title="Borrar discusión"
          message={`Se borrará «${deleting.title}» junto con todos sus comentarios y me gusta. Esta acción no se puede deshacer.`}
          confirmLabel="Borrar discusión"
          pending={removing}
          onConfirm={() => removeDiscussion(deleting)}
          onCancel={() => setDeleting(null)}
        />
      )}
    </>
  )
}
