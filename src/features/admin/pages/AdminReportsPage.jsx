import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Link } from '@/shared/i18n/router'
import ActionMenu from '@/shared/components/ActionMenu'
import Badge from '@/shared/components/Badge'
import Button from '@/shared/components/Button'
import ConfirmDialog from '@/shared/components/ConfirmDialog'
import EmptyState from '@/shared/components/EmptyState'
import FilterLinks from '@/shared/components/FilterLinks'
import Icon from '@/shared/components/Icon'
import ListSkeleton from '@/shared/components/ListSkeleton'
import PageHeader from '@/shared/components/PageHeader'
import QueryBoundary from '@/shared/components/QueryBoundary'
import Seo from '@/shared/components/Seo'
import Time from '@/shared/components/Time'
import { paths } from '@/shared/config/paths'
import { useAction } from '@/shared/hooks/useAction'
import { useToast } from '@/shared/hooks/useToast'
import { useRequest } from '@/shared/hooks/useRequest'
import { useI18n } from '@/shared/i18n/useI18n'
import { adminReportsService } from '../services/adminReportsService'

const TYPE_LABELS = { DISCUSSION: 'Discusión', COMMENT: 'Comentario', TESTIMONIAL: 'Testimonio' }
const RESOLUTION_LABELS = { HIDE: 'Ocultado', DELETE: 'Eliminado', DISMISS: 'Descartado' }

/** Dónde ver el contenido reportado en la web. */
function targetHref(item) {
  const { target } = item
  if (!target.exists) return null
  if (item.targetType === 'TESTIMONIAL') return paths.testimonials
  const discussion = paths.discussionDetail({ id: target.discussionId, slug: target.discussionSlug })
  return item.targetType === 'COMMENT' ? `${discussion}#comentario-${item.targetId}` : discussion
}

function caseKey(item) {
  return `${item.targetType}-${item.targetId}`
}

function ReportCase({ item, closed, pending, onResolve }) {
  const { t } = useI18n()
  const { target } = item
  const href = targetHref(item)
  const titleId = `reporte-${caseKey(item)}`
  const canHide = item.targetType !== 'COMMENT' && target.exists && target.visible

  return (
    <article aria-labelledby={titleId} className="card p-5 sm:p-6">
      <header className="flex flex-wrap items-start justify-between gap-3">
        <hgroup className="min-w-0">
          <p className="flex flex-wrap items-center gap-2">
            <Badge tone="indigo">{TYPE_LABELS[item.targetType]}</Badge>
            {!target.exists && <Badge tone="slate">Ya eliminado</Badge>}
            {target.exists && !target.visible && <Badge tone="slate">Oculto</Badge>}
          </p>
          <h2 id={titleId} className="mt-2 text-lg font-bold text-ink">
            {target.title ?? `${TYPE_LABELS[item.targetType]} #${item.targetId}`}
          </h2>
          {target.authorName && <p className="text-sm text-ink-muted">Autoría: {target.authorName}</p>}
        </hgroup>
        <p className="text-right text-sm text-ink-muted">
          <Badge tone={closed ? 'slate' : 'red'}>
            {item.total} {item.total === 1 ? 'reporte' : 'reportes'}
          </Badge>
          <span className="mt-1 block">
            Último: <Time value={item.lastReportedAt} format="datetime" />
          </span>
        </p>
      </header>

      {target.excerpt && (
        <blockquote className="mt-4 whitespace-pre-wrap border-l-4 border-slate-300 pl-4 text-ink-soft">
          {target.excerpt}
        </blockquote>
      )}

      <h3 className="mt-5 text-sm font-bold uppercase tracking-wide text-ink-muted">Motivos</h3>
      <ul className="mt-2 flex flex-wrap gap-2">
        {Object.entries(item.reasons).map(([reason, count]) => (
          <li key={reason}>
            <Badge tone="amber">
              {t(`reports.reasons.${reason}.label`)} · {count}
            </Badge>
          </li>
        ))}
      </ul>

      <h3 className="mt-5 text-sm font-bold uppercase tracking-wide text-ink-muted">Reportes</h3>
      <ul className="mt-2 divide-y divide-slate-200 text-sm">
        {item.reports.map((report) => (
          <li key={report.id} className="py-2">
            <p className="text-ink-soft">
              <strong className="font-semibold text-ink">{t(`reports.reasons.${report.reason}.label`)}</strong> ·{' '}
              {report.reporterName} · <Time value={report.createdAt} format="datetime" />
              {closed && report.resolution && <> · {RESOLUTION_LABELS[report.resolution]}</>}
            </p>
            {report.details && <p className="mt-1 whitespace-pre-wrap text-ink-muted">«{report.details}»</p>}
          </li>
        ))}
      </ul>

      <footer className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 pt-4">
        {href ? (
          <Link to={href} className="link inline-flex min-h-[2.75rem] items-center gap-1.5 text-sm">
            <Icon name="external" className="h-4 w-4" />
            Ver en la web
          </Link>
        ) : (
          <span />
        )}
        {!closed && (
          <ActionMenu className="justify-end">
            {canHide && (
              <Button variant="secondary" size="sm" disabled={pending} onClick={() => onResolve(item, 'HIDE')}>
                <Icon name="eye-off" className="h-4 w-4" />
                Ocultar<span className="sr-only"> «{target.title}»</span>
              </Button>
            )}
            <Button variant="danger" size="sm" disabled={pending} onClick={() => onResolve(item, 'DELETE')}>
              <Icon name="trash" className="h-4 w-4" />
              Eliminar<span className="sr-only"> «{target.title}»</span>
            </Button>
            <Button variant="ghost" size="sm" disabled={pending} onClick={() => onResolve(item, 'DISMISS')}>
              <Icon name="check" className="h-4 w-4" />
              Descartar<span className="sr-only"> los reportes de «{target.title}»</span>
            </Button>
          </ActionMenu>
        )}
      </footer>
    </article>
  )
}

const CONFIRM = {
  HIDE: {
    title: 'Ocultar contenido',
    message: 'Dejará de verse en la web, pero se podrá volver a mostrar desde su sección del panel.',
    label: 'Ocultar',
    tone: 'primary',
  },
  DELETE: {
    title: 'Eliminar contenido',
    message: 'Se borrará de forma permanente, con sus comentarios y me gusta si los tiene. No se puede deshacer.',
    label: 'Eliminar',
    tone: 'danger',
  },
  DISMISS: {
    title: 'Descartar reportes',
    message: 'El contenido sigue publicado y sus reportes pasan a «Revisados».',
    label: 'Descartar',
    tone: 'primary',
  },
}

const SUCCESS = { HIDE: 'Contenido ocultado.', DELETE: 'Contenido eliminado.', DISMISS: 'Reportes descartados.' }

export default function AdminReportsPage() {
  const [searchParams] = useSearchParams()
  const closed = searchParams.get('estado') === 'revisados'
  const request = useRequest(`admin:reports:${closed}`, ({ signal }) =>
    adminReportsService.list(closed ? 'closed' : 'pending', { signal }),
  )
  const toast = useToast()
  const [confirming, setConfirming] = useState(null)

  // Al resolver, el contenido sale de la cola sin recargarla.
  const [resolve, resolving] = useAction(async ({ item, action }) => {
    await adminReportsService.resolve({ targetType: item.targetType, targetId: item.targetId, action })
    request.mutate((items) => items.filter((other) => caseKey(other) !== caseKey(item)))
    setConfirming(null)
    toast.success(SUCCESS[action])
  })

  const confirm = confirming && CONFIRM[confirming.action]

  return (
    <>
      <Seo title="Reportes" path={paths.adminReports} robots="noindex,nofollow" />
      <PageHeader
        title="Reportes"
        description="Contenido que la comunidad ha reportado, agrupado: decide si ocultarlo, eliminarlo o descartar los reportes."
      />
      <FilterLinks
        label="Estado de los reportes"
        options={[
          { key: 'pending', label: 'Pendientes', href: paths.adminReports, active: !closed },
          { key: 'closed', label: 'Revisados', href: `${paths.adminReports}?estado=revisados`, active: closed },
        ]}
      />
      <section
        aria-label={closed ? 'Reportes revisados' : 'Reportes pendientes'}
        aria-busy={request.loading}
        className="mt-6"
      >
        <QueryBoundary
          data={request.data}
          error={request.error}
          onRetry={request.reload}
          skeleton={<ListSkeleton rows={3} />}
          errorTitle="No se han podido cargar los reportes"
        >
          {(items) =>
            items.length === 0 ? (
              <EmptyState
                icon="check-circle"
                title={closed ? 'Aún no hay reportes revisados' : 'No hay reportes pendientes'}
                description={closed ? undefined : 'Cuando alguien reporte un contenido aparecerá aquí.'}
              />
            ) : (
              <ul className="space-y-4">
                {items.map((item) => (
                  <li key={caseKey(item)}>
                    <ReportCase
                      item={item}
                      closed={closed}
                      pending={resolving}
                      onResolve={(target, action) => setConfirming({ item: target, action })}
                    />
                  </li>
                ))}
              </ul>
            )
          }
        </QueryBoundary>
      </section>
      {confirm && (
        <ConfirmDialog
          title={confirm.title}
          message={confirm.message}
          confirmLabel={confirm.label}
          tone={confirm.tone}
          pending={resolving}
          onConfirm={() => resolve(confirming)}
          onCancel={() => setConfirming(null)}
        />
      )}
    </>
  )
}
