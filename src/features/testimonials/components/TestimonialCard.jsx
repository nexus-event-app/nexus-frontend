import { useId, useState } from 'react'
import AuthorLink from '@/features/profile/components/AuthorLink'
import ReportButton from '@/features/reports/components/ReportButton'
import Avatar from '@/shared/components/Avatar'
import Badge from '@/shared/components/Badge'
import Icon from '@/shared/components/Icon'
import { useIsClamped } from '@/shared/hooks/useIsClamped'
import { useI18n } from '@/shared/i18n/useI18n'
import { cx } from '@/shared/utils/classNames'

/** Colores pastel que se alternan, como notas de distintos colores sobre un tablero. */
const PASTELS = [
  'border-violet-200 from-violet-100 to-indigo-50 dark:border-violet-400/25 dark:from-violet-500/20 dark:to-indigo-500/5',
  'border-emerald-200 from-emerald-100 to-teal-50 dark:border-emerald-400/25 dark:from-emerald-500/20 dark:to-teal-500/5',
  'border-amber-200 from-amber-100 to-rose-50 dark:border-amber-400/25 dark:from-amber-500/20 dark:to-rose-500/5',
]
/** Inclinación de cada nota; al pasar por encima (o enfocar algo dentro) se endereza. */
const TILTS = ['-rotate-1', 'rotate-1', '-rotate-[0.5deg]']

/**
 * Testimonio con aspecto de nota: ligeramente inclinada, con unas grandes comillas de sello y la cita como
 * protagonista. `glass` es la versión translúcida para fondos oscuros (portada); si no, la nota es de un color
 * pastel según su posición. Todas miden lo mismo: el texto reserva cinco líneas y, si no cabe, «Leer más» lo
 * despliega en la propia tarjeta.
 */
export default function TestimonialCard({ testimonial, linkAuthor = true, index = 0, glass = false }) {
  const { t } = useI18n()
  const quoteId = useId()
  const [expanded, setExpanded] = useState(false)
  const [quoteRef, clamped] = useIsClamped([testimonial.content, expanded])
  const subtitle = [testimonial.role, testimonial.location].filter(Boolean).join(' · ')

  return (
    <figure
      className={cx(
        'relative flex h-full flex-col rounded-3xl p-7 pt-10 transition-all duration-500 ease-out hover:-translate-y-1 hover:rotate-0 focus-within:rotate-0',
        TILTS[index % TILTS.length],
        glass
          ? 'bg-white/10 text-white shadow-2xl shadow-brand-950/40 ring-1 ring-inset ring-white/20 backdrop-blur-md hover:bg-white/15'
          : cx('border bg-gradient-to-br text-ink shadow-card hover:shadow-pop', PASTELS[index % PASTELS.length]),
        testimonial.isHighlighted && (glass ? 'ring-2 ring-amber-300/70' : 'ring-2 ring-amber-400/70'),
      )}
    >
      {/* Comillas de sello: decorativas, la cita ya va dentro de <blockquote>. */}
      <span
        aria-hidden="true"
        className={cx(
          'absolute -top-6 left-6 flex h-14 w-14 items-center justify-center rounded-2xl text-5xl font-bold leading-none shadow-lg',
          glass ? 'bg-white text-brand-700' : 'bg-brand-600 text-white dark:bg-brand-500',
        )}
      >
        <span className="translate-y-3">“</span>
      </span>

      <blockquote id={quoteId}>
        <p
          ref={quoteRef}
          className={cx(
            'min-h-[5lh] whitespace-pre-wrap text-lg font-medium leading-relaxed',
            glass ? 'text-white' : 'text-ink',
            !expanded && 'line-clamp-5',
          )}
        >
          {testimonial.content}
        </p>
      </blockquote>
      {/* El botón ocupa siempre su sitio (invisible si el texto cabe) para que todas las tarjetas midan igual. */}
      <button
        type="button"
        onClick={() => setExpanded((value) => !value)}
        aria-expanded={expanded}
        aria-controls={quoteId}
        className={cx(
          'mt-2 inline-flex min-h-[2.75rem] items-center gap-1 self-start text-sm font-semibold hover:underline',
          glass ? 'text-brand-200' : 'text-accent',
          !clamped && !expanded && 'invisible',
        )}
      >
        {expanded ? t('common.readLess') : t('common.readMore')}
        <Icon name="chevron-down" className={cx('h-4 w-4 transition-transform', expanded && 'rotate-180')} />
      </button>

      <figcaption
        className={cx('mt-auto flex items-center gap-3 border-t pt-5', glass ? 'border-white/15' : 'border-ink/10')}
      >
        <Avatar
          name={testimonial.name}
          src={testimonial.authorAvatarUrl}
          className={cx('ring-2', glass ? 'ring-white/40' : 'ring-white dark:ring-white/20')}
        />
        <span className="min-w-0 flex-1">
          <AuthorLink
            id={linkAuthor ? testimonial.authorId : null}
            name={testimonial.name}
            className={cx('block truncate font-bold', glass ? 'text-white hover:text-brand-100' : 'text-ink')}
          />
          <span className={cx('block min-h-[1lh] truncate text-sm', glass ? 'text-brand-100' : 'text-ink-soft')}>
            {subtitle}
          </span>
        </span>
        {testimonial.isHighlighted && (
          <Badge tone="amber" className="shrink-0">
            <Icon name="star" className="h-3.5 w-3.5" filled />
            {t('testimonials.card.highlighted')}
          </Badge>
        )}
        <ReportButton
          compact
          inverse={glass}
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
