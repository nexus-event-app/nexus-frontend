import { useState } from 'react'
import ActionMenu from '@/shared/components/ActionMenu'
import Badge from '@/shared/components/Badge'
import Button from '@/shared/components/Button'
import ConfirmDialog from '@/shared/components/ConfirmDialog'
import Icon from '@/shared/components/Icon'
import PageHeader from '@/shared/components/PageHeader'
import Seo from '@/shared/components/Seo'
import Time from '@/shared/components/Time'
import { paths } from '@/shared/config/paths'
import { useAction } from '@/shared/hooks/useAction'
import PagedTable from '../components/PagedTable'
import { useAdminList } from '../hooks/useAdminList'
import { adminEventsService } from '../services/adminEventsService'

function EventStatus({ event }) {
  if (!event.active) return <Badge tone="red">Oculto</Badge>
  return event.past ? <Badge tone="slate">Ya pasó</Badge> : <Badge tone="green">Publicado</Badge>
}

/**
 * Eventos que comparte la comunidad: se publican al momento, así que aquí se revisan (llega un email por cada uno) y
 * se borran los repetidos o los que no encajan. Se ve quién lo compartió, que en la web pública no sale.
 */
export default function AdminEventsPage() {
  const list = useAdminList('events', adminEventsService.list)
  const [deleting, setDeleting] = useState(null)

  const [removeEvent, removing] = useAction(
    async (event) => {
      await adminEventsService.remove(event.id)
      setDeleting(null)
      list.reload()
    },
    { successMessage: 'Evento borrado.' },
  )

  const columns = [
    {
      key: 'title',
      header: 'Evento',
      primary: true,
      render: (event) => (
        <p>
          {event.title}
          <span className="mt-1 block text-sm font-normal text-ink-muted">{event.description}</span>
          {event.forWomen && (
            <span className="mt-1 block">
              <Badge tone="pink">Por y para mujeres</Badge>
            </span>
          )}
        </p>
      ),
    },
    {
      key: 'date',
      header: 'Fecha',
      render: (event) => (
        <span>
          <Time value={event.date} format="short" />
          {event.time && ` · ${event.time.slice(0, 5)}`}
        </span>
      ),
    },
    { key: 'where', header: 'Dónde', render: (event) => (event.mode === 'ONLINE' ? 'Online' : event.city) },
    { key: 'status', header: 'Estado', render: (event) => <EventStatus event={event} /> },
    { key: 'author', header: 'Compartido por', render: (event) => event.authorName },
    {
      key: 'actions',
      actions: true,
      header: 'Acciones',
      render: (event) => (
        <ActionMenu className="justify-end md:justify-start">
          <a href={event.url} target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-sm">
            <Icon name="external" className="h-4 w-4" />
            {event.host}
            <span className="sr-only"> (enlace de «{event.title}», se abre en una pestaña nueva)</span>
          </a>
          <Button variant="ghost" size="sm" onClick={() => setDeleting(event)}>
            <Icon name="trash" className="h-4 w-4" />
            Borrar<span className="sr-only"> {event.title}</span>
          </Button>
        </ActionMenu>
      ),
    },
  ]

  return (
    <>
      <Seo title="Moderar eventos" path={paths.adminEvents} robots="noindex,nofollow" />
      <PageHeader
        title="Eventos"
        description="Los comparte la comunidad y se publican al momento. Borra aquí los repetidos o los que no encajen."
      />
      <PagedTable
        list={list}
        columns={columns}
        caption="Listado de eventos"
        emptyIcon="calendar"
        emptyTitle="No hay eventos"
        emptyDescription="Cuando alguien comparta un evento aparecerá aquí."
      />
      {deleting && (
        <ConfirmDialog
          title="Borrar evento"
          message={`Se borrará «${deleting.title}» de la agenda. Esta acción no se puede deshacer.`}
          confirmLabel="Borrar evento"
          pending={removing}
          onConfirm={() => removeEvent(deleting)}
          onCancel={() => setDeleting(null)}
        />
      )}
    </>
  )
}
