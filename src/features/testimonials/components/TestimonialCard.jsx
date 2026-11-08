import Avatar from '@/shared/components/Avatar'
import Badge from '@/shared/components/Badge'
import Icon from '@/shared/components/Icon'
import { useI18n } from '@/shared/i18n/useI18n'

export default function TestimonialCard({ testimonial }) {
  const { t } = useI18n()
  const subtitle = [testimonial.role, testimonial.location].filter(Boolean).join(' · ')

  return (
    <figure className="card flex h-full flex-col p-6">
      {testimonial.isHighlighted && (
        <Badge tone="amber" className="mb-4 self-start">
          <Icon name="star" className="h-3.5 w-3.5" filled />
          {t('testimonials.card.highlighted')}
        </Badge>
      )}
      <blockquote className="flex-1">
        <p className="whitespace-pre-wrap text-lg leading-relaxed text-ink-soft">«{testimonial.content}»</p>
      </blockquote>
      <figcaption className="mt-6 flex items-center gap-3">
        <Avatar name={testimonial.name} />
        <span className="min-w-0">
          <span className="block truncate font-semibold text-ink">{testimonial.name}</span>
          {subtitle && <span className="block truncate text-sm text-ink-muted">{subtitle}</span>}
        </span>
      </figcaption>
    </figure>
  )
}
