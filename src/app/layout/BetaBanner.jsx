import { useState } from 'react'
import Icon from '@/shared/components/Icon'
import { paths } from '@/shared/config/paths'
import { siteConfig } from '@/shared/config/site'
import { Link } from '@/shared/i18n/router'
import { useI18n } from '@/shared/i18n/useI18n'

const STORAGE_KEY = 'pc-aviso-beta-cerrado'

/** El aviso cerrado se recuerda en este navegador; si el almacenamiento no está disponible, vuelve a salir. */
function wasDismissed() {
  try {
    return window.localStorage.getItem(STORAGE_KEY) === '1'
  } catch {
    return false
  }
}

function rememberDismissed() {
  try {
    window.localStorage.setItem(STORAGE_KEY, '1')
  } catch {
    // Sin almacenamiento (modo privado...): se cierra igual, solo que no se recuerda.
  }
}

/**
 * Aviso de la versión de prueba bajo la cabecera: explica que es una beta e invita a contar fallos e ideas en el
 * foro. Solo sale si la web se compila con VITE_BETA=true, y cada persona puede cerrarlo.
 */
export default function BetaBanner({ enabled = siteConfig.beta }) {
  const { t } = useI18n()
  const [dismissed, setDismissed] = useState(wasDismissed)

  if (!enabled || dismissed) return null

  const close = () => {
    rememberDismissed()
    setDismissed(true)
  }

  return (
    <aside
      aria-label={t('common.beta.label')}
      className="page-gutter flex items-center gap-3 border-b border-accent-line bg-accent-soft py-1.5 text-sm text-ink"
    >
      <strong className="shrink-0 rounded-full bg-brand-600 px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider text-white">
        {t('common.beta.label')}
      </strong>
      <p className="min-w-0 flex-1 py-1">
        {t('common.beta.text')}{' '}
        <Link
          to={paths.forum}
          className="font-semibold text-accent-strong underline underline-offset-2 hover:no-underline"
        >
          {t('common.beta.link')}
        </Link>
      </p>
      <button
        type="button"
        onClick={close}
        aria-label={t('common.beta.close')}
        title={t('common.beta.close')}
        className="-mr-2 flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-ink-muted hover:bg-white/60 hover:text-ink dark:hover:bg-white/10"
      >
        <Icon name="close" className="h-4 w-4" />
      </button>
    </aside>
  )
}
