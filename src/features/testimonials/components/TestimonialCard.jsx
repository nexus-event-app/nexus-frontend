import { useId, useState } from 'react'
import AuthorLink from '@/features/profile/components/AuthorLink'
import ReportButton from '@/features/reports/components/ReportButton'
import Avatar from '@/shared/components/Avatar'
import Badge from '@/shared/components/Badge'
import Icon from '@/shared/components/Icon'
import { useIsClamped } from '@/shared/hooks/useIsClamped'
import { useI18n } from '@/shared/i18n/useI18n'
import { cx } from '@/shared/utils/classNames'

const PASTEL =
  'border-violet-200 from-violet-100 to-indigo-50 dark:border-violet-400/25 dark:from-violet-500/20 dark:to-indigo-500/5'
const TILTS = ['-rotate-1', 'rotate-1', '-rotate-[0.5deg]']

export default function TestimonialCard({ testimonial, linkAuthor = true, index = 0, compact = false }) {
  const { t } = useI18n()
  const quoteId = useId()
  const [expanded, setExpanded] = useState(false)
  const [quoteRef, clamped] = useIsClamped(testimonial.content, expanded)
  const subtitle = [testimonial.role, testimonial.location].filter(Boolean).join(' · ')

  return (
    <figure
      className={cx(
        'group relative flex h-full flex-col rounded-3xl transition-all duration-500 ease-out hover:[transform:perspective(900px)_rotateX(4deg)_rotateY(-4deg)_translateY(-6px)] focus-within:rotate-0',
        compact ? 'p-5 pt-8' : 'p-7 pt-10',
        TILTS[index % TILTS.length],
        cx(
          'border bg-gradient-to-br text-ink',
          'shadow-[0_2px_0_rgba(91,69,224,0.12),0_5px_0_rgba(91,69,224,0.08),0_22px_34px_-18px_rgba(46,36,119,0.5)] hover:shadow-[0_2px_0_rgba(91,69,224,0.14),0_7px_0_rgba(91,69,224,0.1),0_34px_48px_-20px_rgba(46,36,119,0.6)]',
          'dark:shadow-[0_2px_0_rgba(0,0,0,0.35),0_5px_0_rgba(0,0,0,0.3),0_22px_34px_-18px_rgba(0,0,0,0.8)]',
          PASTEL,
        ),
        testimonial.isHighlighted && 'ring-2 ring-amber-400/70',
      )}
    >
      <span
        aria-hidden="true"
        className={cx(
          'absolute flex items-center justify-center font-bold leading-none transition-transform duration-500 [transform:perspective(500px)_rotateX(10deg)_rotateY(-16deg)] group-hover:[transform:perspective(500px)_rotateX(16deg)_rotateY(-26deg)_translateY(-4px)_scale(1.06)]',
          'shadow-[0_3px_0_#3730a3,0_6px_0_#312e81,0_16px_22px_-8px_rgba(49,46,129,0.65),inset_0_2px_0_rgba(255,255,255,0.3)]',
          compact ? '-top-5 left-5 h-11 w-11 rounded-xl text-4xl' : '-top-6 left-6 h-14 w-14 rounded-2xl text-5xl',
          'bg-gradient-to-br from-brand-500 to-brand-700 text-white',
        )}
      >
        <span className={compact ? 'translate-y-2.5' : 'translate-y-3'}>“</span>
      </span>

      <blockquote id={quoteId}>
        <p
          ref={quoteRef}
          className={cx(
            'whitespace-pre-wrap font-medium leading-relaxed text-ink',
            compact ? 'min-h-[4lh] text-base' : 'min-h-[5lh] text-lg',
            !expanded && (compact ? 'line-clamp-4' : 'line-clamp-5'),
          )}
        >
          {testimonial.content}
        </p>
      </blockquote>
      <button
        type="button"
        onClick={() => setExpanded((value) => !value)}
        aria-expanded={expanded}
        aria-controls={quoteId}
        className={cx(
          'inline-flex min-h-[2.75rem] items-center gap-1 self-start text-sm font-semibold hover:underline',
          compact ? 'mt-0' : 'mt-2',
          'text-accent',
          !clamped && !expanded && 'invisible',
        )}
      >
        {expanded ? t('common.readLess') : t('common.readMore')}
        <Icon name="chevron-down" className={cx('h-4 w-4 transition-transform', expanded && 'rotate-180')} />
      </button>

      <figcaption className={cx('mt-auto flex items-center gap-3 border-t border-ink/10', compact ? 'pt-3' : 'pt-5')}>
        <Avatar
          name={testimonial.name}
          src={testimonial.authorAvatarUrl}
          className={cx(
            'ring-2 shadow-[0_3px_0_rgba(91,69,224,0.25),0_10px_14px_-6px_rgba(46,36,119,0.45)]',
            'ring-white dark:ring-white/20',
          )}
        />
        <span className="min-w-0 flex-1">
          <AuthorLink
            id={linkAuthor ? testimonial.authorId : null}
            name={testimonial.name}
            className={cx('block truncate font-bold', 'text-ink')}
          />
          <span className={cx('block min-h-[1lh] truncate text-sm', 'text-ink-soft')}>{subtitle}</span>
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
