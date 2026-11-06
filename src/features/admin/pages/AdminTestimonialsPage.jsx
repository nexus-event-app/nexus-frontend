import { useState } from 'react'
import Badge from '@/shared/components/Badge'
import Button from '@/shared/components/Button'
import ConfirmDialog from '@/shared/components/ConfirmDialog'
import DataTable from '@/shared/components/DataTable'
import EmptyState from '@/shared/components/EmptyState'
import Icon from '@/shared/components/Icon'
import ListSkeleton from '@/shared/components/ListSkeleton'
import PageHeader from '@/shared/components/PageHeader'
import QueryBoundary from '@/shared/components/QueryBoundary'
import Seo from '@/shared/components/Seo'
import Time from '@/shared/components/Time'
import { paths } from '@/shared/config/paths'
import { useAction } from '@/shared/hooks/useAction'
import { useRequest } from '@/shared/hooks/useRequest'
import { excerpt } from '@/shared/utils/text'
import { adminTestimonialsService } from '../services/adminTestimonialsService'

function sortPendingFirst(items) {
  return [...items].sort((a, b) => {
    if (a.isPending !== b.isPending) return a.isPending ? -1 : 1
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  })
}

function StatusBadges({ testimonial }) {
  return (
    <div className="flex flex-wrap justify-end gap-1.5 md:justify-start">
      {testimonial.isPending ? (
        <Badge tone="amber">Pendiente</Badge>
      ) : testimonial.isActive ? (
        <Badge tone="green">Publicado</Badge>
      ) : (
        <Badge tone="slate">Oculto</Badge>
      )}
      {testimonial.isHighlighted && <Badge tone="indigo">Destacado</Badge>}
    </div>
  )
}

export default function AdminTestimonialsPage() {
  const request = useRequest('admin:testimonials', ({ signal }) => adminTestimonialsService.list({ signal }))
  const [deleting, setDeleting] = useState(null)

  const [update, updating] = useAction(async (testimonial, changes) => {
    const updated = await adminTestimonialsService.update(testimonial.id, changes)
    request.mutate((items) => items.map((item) => (item.id === updated.id ? updated : item)))
  })

  const [remove, removing] = useAction(
    async (testimonial) => {
      await adminTestimonialsService.remove(testimonial.id)
      request.mutate((items) => items.filter((item) => item.id !== testimonial.id))
      setDeleting(null)
    },
    { successMessage: 'Testimonio borrado.' },
  )

  const columns = [
    {
      key: 'author',
      header: 'Autor',
      primary: true,
      render: (testimonial) => (
        <div>
          <p>{testimonial.name}</p>
          <p className="text-sm font-normal text-ink-muted">
            {[testimonial.role, testimonial.location].filter(Boolean).join(' · ')}
          </p>
        </div>
      ),
    },
    {
      key: 'content',
      header: 'Testimonio',
      className: 'md:max-w-md',
      render: (testimonial) => <span className="whitespace-pre-wrap">{excerpt(testimonial.content, 300)}</span>,
    },
    { key: 'status', header: 'Estado', render: (testimonial) => <StatusBadges testimonial={testimonial} /> },
    { key: 'date', header: 'Enviado', render: (testimonial) => <Time value={testimonial.createdAt} format="short" /> },
    {
      key: 'actions',
      actions: true,
      header: 'Acciones',
      render: (testimonial) => (
        <div className="flex flex-wrap justify-end gap-2 md:justify-start">
          {testimonial.isPending ? (
            <Button
              size="sm"
              disabled={updating}
              onClick={() => update(testimonial, { isPending: false, isActive: true })}
            >
              <Icon name="check" className="h-4 w-4" />
              Aprobar<span className="sr-only"> testimonio de {testimonial.name}</span>
            </Button>
          ) : (
            <>
              <Button
                variant="secondary"
                size="sm"
                disabled={updating}
                onClick={() => update(testimonial, { isActive: !testimonial.isActive })}
              >
                {testimonial.isActive ? 'Ocultar' : 'Mostrar'}
                <span className="sr-only"> testimonio de {testimonial.name}</span>
              </Button>
              {testimonial.isActive && (
                <Button
                  variant="secondary"
                  size="sm"
                  disabled={updating}
                  aria-pressed={testimonial.isHighlighted}
                  onClick={() => update(testimonial, { isHighlighted: !testimonial.isHighlighted })}
                >
                  <Icon name="star" className="h-4 w-4" filled={testimonial.isHighlighted} />
                  {testimonial.isHighlighted ? 'Quitar destacado' : 'Destacar'}
                  <span className="sr-only"> testimonio de {testimonial.name}</span>
                </Button>
              )}
            </>
          )}
          <Button variant="ghost" size="sm" onClick={() => setDeleting(testimonial)}>
            <Icon name="trash" className="h-4 w-4" />
            Eliminar<span className="sr-only"> testimonio de {testimonial.name}</span>
          </Button>
        </div>
      ),
    },
  ]

  return (
    <>
      <Seo title="Moderar testimonios" path={paths.adminTestimonials} robots="noindex,nofollow" />
      <PageHeader
        title="Testimonios"
        description="Aprueba, oculta o destaca los testimonios. Los pendientes aparecen primero."
      />
      <section aria-label="Listado de testimonios" aria-busy={request.loading}>
        <QueryBoundary data={request.data} error={request.error} onRetry={request.reload} skeleton={<ListSkeleton />}>
          {(items) =>
            items.length === 0 ? (
              <EmptyState icon="star" title="No hay testimonios" description="Cuando alguien envíe uno aparecerá aquí." />
            ) : (
              <DataTable
                caption="Listado de testimonios"
                columns={columns}
                rows={sortPendingFirst(items)}
                getRowKey={(row) => row.id}
              />
            )
          }
        </QueryBoundary>
      </section>

      {deleting && (
        <ConfirmDialog
          title="Eliminar testimonio"
          message={`¿Seguro que quieres eliminar el testimonio de ${deleting.name}? Esta acción no se puede deshacer.`}
          confirmLabel="Eliminar testimonio"
          pending={removing}
          onConfirm={() => remove(deleting)}
          onCancel={() => setDeleting(null)}
        />
      )}
    </>
  )
}
