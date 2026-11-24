import { useToast } from '@/shared/hooks/useToast'
import { useI18n } from '@/shared/i18n/useI18n'
import { cx } from '@/shared/utils/classNames'
import Icon from './Icon'

export default function ShareButton({ title, text, className }) {
  const { t } = useI18n()
  const toast = useToast()

  const share = async () => {
    const url = window.location.href
    if (typeof navigator.share === 'function') {
      try {
        await navigator.share({ title, text, url })
        return
      } catch (error) {
        if (error?.name === 'AbortError') return
      }
    }
    try {
      await navigator.clipboard.writeText(url)
      toast.success(t('common.share.copied'))
    } catch {
      toast.error(t('common.share.failed'))
    }
  }

  return (
    <button
      type="button"
      onClick={share}
      className={cx(
        'inline-flex min-h-[2.75rem] items-center gap-2 rounded-full bg-gradient-to-r from-brand-600 to-violet-600 px-5 text-sm font-semibold text-white shadow-card transition-all hover:-translate-y-0.5 hover:shadow-pop',
        className,
      )}
    >
      <Icon name="share" className="h-4 w-4" />
      {t('common.share.label')}
    </button>
  )
}
