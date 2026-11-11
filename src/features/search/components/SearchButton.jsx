import Icon from '@/shared/components/Icon'
import { useI18n } from '@/shared/i18n/useI18n'
import { cx } from '@/shared/utils/classNames'

const IS_MAC =
  typeof navigator !== 'undefined' && /mac|iphone|ipad/i.test(navigator.userAgentData?.platform ?? navigator.platform)
const SEARCH_SHORTCUT = IS_MAC ? '⌘ K' : 'Ctrl K'

/**
 * Botón redondo con la lupa que abre la búsqueda global (la ventana y el atajo los gestiona la cabecera). Con
 * `compact` (móvil) su nombre va en aria-label; si no, en un texto solo para lectores de pantalla.
 */
export default function SearchButton({ onOpen, compact = false, className }) {
  const { t } = useI18n()
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-haspopup="dialog"
      aria-label={compact ? t('search.openLabel') : undefined}
      aria-keyshortcuts={IS_MAC ? 'Meta+K' : 'Control+K'}
      title={t('search.shortcut', { keys: SEARCH_SHORTCUT })}
      className={cx(
        'inline-flex items-center justify-center gap-2 text-ink-muted transition-colors',
        'h-11 w-11 rounded-full border border-slate-200 hover:border-accent-line hover:text-accent',
        className,
      )}
    >
      <Icon name="search" className="h-5 w-5" />
      {/* La cabecera va justa: solo se ve la lupa. El texto sigue siendo su nombre y el atajo sale en el título. */}
      {!compact && <span className="sr-only">{t('search.open')}</span>}
    </button>
  )
}
