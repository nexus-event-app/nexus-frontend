import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useAuth } from '@/features/auth/hooks/useAuth'
import Button from '@/shared/components/Button'
import Icon from '@/shared/components/Icon'
import { loginPath } from '@/shared/config/paths'
import { useToast } from '@/shared/hooks/useToast'
import { useI18n } from '@/shared/i18n/useI18n'
import { useNavigate } from '@/shared/i18n/useNavigate'
import { cx } from '@/shared/utils/classNames'
import ReportDialog from './ReportDialog'

/**
 * Botón «Reportar». No aparece en el contenido propio. Sin sesión, lleva a iniciarla y vuelve aquí.
 * `srLabel` completa el nombre para lectores de pantalla («Reportar el comentario de Ana»); con `compact` solo se
 * ve la bandera y `srLabel` es el nombre completo. `inverse`: colores claros, para fondos oscuros.
 */
export default function ReportButton({
  targetType,
  targetId,
  ownerId,
  srLabel,
  compact = false,
  inverse = false,
  className,
}) {
  const { t } = useI18n()
  const { isAuthenticated, user } = useAuth()
  const toast = useToast()
  const navigate = useNavigate()
  const location = useLocation()
  const [open, setOpen] = useState(false)

  if (isAuthenticated && ownerId != null && user?.id === ownerId) return null

  const handleClick = () => {
    if (!isAuthenticated) {
      toast.info(t('reports.loginToReport'))
      navigate(loginPath(`${location.pathname}${location.search}`))
      return
    }
    setOpen(true)
  }

  return (
    <>
      {compact ? (
        <button
          type="button"
          onClick={handleClick}
          aria-label={srLabel}
          aria-haspopup="dialog"
          title={t('reports.button')}
          className={cx(
            'flex h-11 w-11 shrink-0 items-center justify-center rounded-control',
            inverse
              ? 'text-brand-100 hover:bg-white/10 hover:text-white'
              : 'text-ink-muted hover:bg-slate-100 hover:text-ink',
            className,
          )}
        >
          <Icon name="flag" className="h-5 w-5" />
        </button>
      ) : (
        <Button variant="ghost" size="sm" onClick={handleClick} aria-haspopup="dialog" className={className}>
          <Icon name="flag" className="h-4 w-4" />
          {t('reports.button')}
          {srLabel && <span className="sr-only">{srLabel}</span>}
        </Button>
      )}
      {open && <ReportDialog targetType={targetType} targetId={targetId} onClose={() => setOpen(false)} />}
    </>
  )
}
