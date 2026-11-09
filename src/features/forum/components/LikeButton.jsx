import Icon from '@/shared/components/Icon'
import { cx } from '@/shared/utils/classNames'
import { useI18n } from '@/shared/i18n/useI18n'

export default function LikeButton({ count, liked, pending, onToggle, label }) {
  const { t } = useI18n()
  return (
    <button
      type="button"
      onClick={onToggle}
      disabled={pending}
      aria-pressed={liked}
      aria-label={t('forum.like.label', { label, count })}
      className={cx(
        'inline-flex min-h-[2.75rem] items-center gap-2 rounded-control border px-3 text-sm font-semibold transition-colors disabled:opacity-60',
        liked ? 'border-pink-300 bg-pink-50 text-pink-800 dark:border-pink-400/40 dark:bg-pink-500/15 dark:text-pink-200' : 'border-slate-300 bg-surface text-ink-soft hover:bg-slate-50',
      )}
    >
      <Icon name="heart" className="h-5 w-5" filled={liked} />
      <span aria-hidden="true">{count}</span>
    </button>
  )
}
