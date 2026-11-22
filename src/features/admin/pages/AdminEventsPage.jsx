import { useId, useState } from 'react'
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
import { useIsClamped } from '@/shared/hooks/useIsClamped'
import { cx } from '@/shared/utils/classNames'
import EventEditDialog from '../components/EventEditDialog'
import PagedTable from '../components/PagedTable'
import { useAdminList } from '../hooks/useAdminList'
import { adminEventsService } from '../services/adminEventsService'

const OLD_DESCRIPTION_LIMIT = 280
const looksCut = (event) => event.description?.length === OLD_DESCRIPTION_LIMIT

function EventDescription({ event }) {
  const id = useId()
  const [expanded, setExpanded] = useState(false)
  const [ref, clamped] = useIsClamped(event.description, expanded)
  return (
    <>
      <span
        id={id}
        ref={ref}
        className={cx(
          'mt-1 whitespace-pre-line text-sm font-normal text-ink-muted',
          expanded ? 'block' : 'line-clamp-2',
        )}
      >
        {event.description}
      </span>
      {(clamped || expanded || event.description.length > 120) && (
        <button
          type="button"
          onClick={() => setExpanded((value) => !value)}
          aria-expanded={expanded}
          aria-controls={id}
          className="mt-1 inline-flex min-h-[2.75rem] items-center gap-1 text-sm font-semibold text-accent hover:underline md:min-h-[2rem]"
        >
          {expanded ? 'Leer menos' : 'Leer más'}
          <Icon name="chevron-down" className={cx('h-4 w-4 transition-transform', expanded && 'rotate-180')} />
          <span className="sr-only"> la descripción de «{event.title}»</span>
        </button>
      )}
    </>
  )
}

function EventStatus({ event }) {
  if (!event.active) return <Badge tone="red">Oculto</Badge>
  return event.past ? <Badge tone="slate">Ya pasó</Badge> : <Badge tone="green">Publicado</Badge>
}

export default function AdminEventsPage() {
  const list = useAdminList('events', adminEventsService.list)
  const [deleting, setDeleting] = useState(null)
  const [editing, setEditing] = useState(null)

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
      className: 'md:min-w-[14rem] md:max-w-[28rem]',
      render: (event) => (
        <p>
          {event.title}
          <span className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-normal text-ink-muted">
            <EventStatus event={event} />
            <span>
              Compartido por <strong className="font-semibold text-ink-soft">{event.authorName}</strong>
            </span>
          </span>
          <EventDescription event={event} />
          {looksCut(event) && (
            <span className="mt-1 block">
              <Badge tone="amber">Descripción cortada: pega la completa con «Editar»</Badge>
            </span>
          )}
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
      className: 'xl:whitespace-nowrap',
      render: (event) => (
        <span>
          <Time value={event.date} format="short" />
          {event.time && ` · ${event.time.slice(0, 5)}`}
        </span>
      ),
    },
    {
      key: 'where',
      header: 'Dónde',
      className: 'md:min-w-[7rem] md:max-w-[13rem]',
      render: (event) =>
        event.mode === 'ONLINE' ? (
          'Online'
        ) : (
          <span>
            {event.city}
            {event.address && <span className="block text-sm text-ink-muted">{event.address}</span>}
          </span>
        ),
    },
    {
      key: 'actions',
      actions: true,
      header: 'Acciones',
      className: 'md:w-40',
      render: (event) => (
        <ActionMenu className="justify-end md:flex-col md:flex-nowrap md:items-stretch [&_.btn]:w-full [&_.btn]:justify-start">
          <a href={event.url} target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-sm">
            <Icon name="external" className="h-4 w-4 shrink-0" />
            <span className="truncate">{event.host}</span>
            <span className="sr-only"> (enlace de «{event.title}», se abre en una pestaña nueva)</span>
          </a>
          <Button variant="secondary" size="sm" onClick={() => setEditing(event)}>
            <Icon name="pencil" className="h-4 w-4" />
            Editar<span className="sr-only"> {event.title}</span>
          </Button>
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
        description="Los comparte la comunidad y se publican al momento. Corrige aquí cualquier error y borra los repetidos o los que no encajen."
      />
      <PagedTable
        list={list}
        columns={columns}
        caption="Listado de eventos"
        emptyIcon="calendar"
        emptyTitle="No hay eventos"
        emptyDescription="Cuando alguien comparta un evento aparecerá aquí."
      />
      {editing && (
        <EventEditDialog
          event={editing}
          onClose={() => setEditing(null)}
          onSaved={() => {
            setEditing(null)
            list.reload()
          }}
        />
      )}
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
