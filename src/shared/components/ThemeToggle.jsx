import { useI18n } from '@/shared/i18n/useI18n'
import { THEMES } from '@/shared/theme/theme'
import { useTheme } from '@/shared/theme/useTheme'
import { cx } from '@/shared/utils/classNames'
import Icon from './Icon'

const ICONS = { system: 'computer', light: 'sun', dark: 'moon' }

/** Botón que alterna el tema: automático (según el dispositivo) → claro → oscuro. */
export default function ThemeToggle({ className }) {
  const { t } = useI18n()
  const { theme, setTheme } = useTheme()
  const next = THEMES[(THEMES.indexOf(theme) + 1) % THEMES.length]
  const label = t('common.theme.toggle', {
    current: t(`common.theme.${theme}`),
    next: t(`common.theme.${next}`),
  })

  return (
    <button
      type="button"
      onClick={() => setTheme(next)}
      aria-label={label}
      title={label}
      className={cx(
        'inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 text-ink-muted transition-colors hover:border-accent-line hover:text-accent',
        className,
      )}
    >
      <Icon name={ICONS[theme]} className="h-5 w-5" />
    </button>
  )
}
