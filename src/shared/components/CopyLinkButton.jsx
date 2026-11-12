import { useToast } from '@/shared/hooks/useToast'
import { cx } from '@/shared/utils/classNames'
import Icon from './Icon'

/**
 * Copia la dirección de la página actual y lo confirma con un aviso. Los textos vienen de fuera para que sirva en
 * cualquier sección (noticia, oferta, discusión...).
 */
export default function CopyLinkButton({ label, copiedMessage, failedMessage, className }) {
  const toast = useToast()
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      toast.success(copiedMessage)
    } catch {
      toast.error(failedMessage)
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
      {label}
    </button>
  )
}
