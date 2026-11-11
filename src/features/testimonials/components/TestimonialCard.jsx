import { useId, useState } from 'react'
import AuthorLink from '@/features/profile/components/AuthorLink'
import Avatar from '@/shared/components/Avatar'
import Badge from '@/shared/components/Badge'
import Icon from '@/shared/components/Icon'
import ReportButton from '@/features/reports/components/ReportButton'
import { useIsClamped } from '@/shared/hooks/useIsClamped'
import { useI18n } from '@/shared/i18n/useI18n'
import { cx } from '@/shared/utils/classNames'

/**
 * Tarjeta de testimonio. Todas miden lo mismo: el texto ocupa cinco líneas (las reserva aunque sea más corto) y, si
 * no cabe, «Leer más» lo despliega en la propia tarjeta. El distintivo «Destacado» va en el pie para no cambiar la
 * altura.
 */
export default function TestimonialCard({ testimonial, linkAuthor = true }) {
  const { t } = useI18n()
  const quoteId = useId()
  const [expanded, setExpanded] = useState(false)
  const [quoteRef, clamped] = useIsClamped([testimonial.content, expanded])
  const subtitle = [testimonial.role, testimonial.location].filter(Boolean).join(' · ')

  return (
    <figure className="card flex h-full flex-col p-6">
      <blockquote id={quoteId}>
        <p
          ref={quoteRef}
          className={cx(
            'min-h-[5lh] whitespace-pre-wrap text-lg leading-relaxed text-ink-soft',
            !expanded && 'line-clamp-5',
          )}
        >
          «{testimonial.content}»
        </p>
      </blockquote>
      {/* El botón ocupa siempre su sitio (invisible si el texto cabe) para que todas las tarjetas midan igual. */}
      <button
        type="button"
        onClick={() => setExpanded((value) => !value)}
        aria-expanded={expanded}
        aria-controls={quoteId}
        className={cx(
          'mt-2 inline-flex min-h-[2.75rem] items-center gap-1 self-start text-sm font-semibold text-accent hover:underline',
          !clamped && !expanded && 'invisible',
        )}
      >
        {expanded ? t('common.readLess') : t('common.readMore')}
        <Icon name="chevron-down" className={cx('h-4 w-4 transition-transform', expanded && 'rotate-180')} />
      </button>
      <figcaption className="mt-auto flex items-center gap-3 pt-6">
        <Avatar name={testimonial.name} src={testimonial.authorAvatarUrl} />
        <span className="min-w-0 flex-1">
          <AuthorLink
            id={linkAuthor ? testimonial.authorId : null}
            name={testimonial.name}
            className="block truncate font-semibold text-ink"
          />
          <span className="block min-h-[1lh] truncate text-sm text-ink-muted">{subtitle}</span>
        </span>
        {testimonial.isHighlighted && (
          <Badge tone="amber" className="shrink-0">
            <Icon name="star" className="h-3.5 w-3.5" filled />
            {t('testimonials.card.highlighted')}
          </Badge>
        )}
        <ReportButton
          compact
          targetType="TESTIMONIAL"
          targetId={testimonial.id}
          ownerId={testimonial.authorId}
          srLabel={t('reports.testimonialSr', { author: testimonial.name })}
          className="-mr-2"
        />
      </figcaption>
    </figure>
  )
}
