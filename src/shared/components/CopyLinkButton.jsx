import { useToast } from '@/shared/hooks/useToast'
import { useI18n } from '@/shared/i18n/useI18n'
import { cx } from '@/shared/utils/classNames'
import Icon from './Icon'

/**
 * Copia la dirección de la página actual y lo confirma con un aviso. Sirve en cualquier página (noticia, oferta,
 * discusión...); los textos son los comunes, aunque se pueden cambiar.
 */
export default function CopyLinkButton({ label, copiedMessage, failedMessage, className }) {
  const { t } = useI18n()
  const toast = useToast()
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      toast.success(copiedMessage ?? t('common.copyLink.copied'))
    } catch {
      toast.error(failedMessage ?? t('common.copyLink.failed'))
    }
  }
  return (
    <button
      type="button"
      onClick={copy}
      className={cx(
        'inline-flex min-h-[2.75rem] items-center gap-2 rounded-full border border-slate-200 bg-surface px-4 text-sm font-medium text-ink-soft shadow-sm transition-colors hover:border-accent-line hover:text-accent',
        className,
      )}
    >
      <Icon name="link" className="h-4 w-4" />
      {label ?? t('common.copyLink.label')}
    </button>
  )
}
