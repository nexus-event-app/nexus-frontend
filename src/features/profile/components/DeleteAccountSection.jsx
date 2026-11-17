import { useState } from 'react'
import PasswordField from '@/features/auth/components/PasswordField'
import { useAuth } from '@/features/auth/hooks/useAuth'
import { getErrorMessage } from '@/shared/api/ApiError'
import Alert from '@/shared/components/Alert'
import Button from '@/shared/components/Button'
import Eyebrow from '@/shared/components/Eyebrow'
import Icon from '@/shared/components/Icon'
import Modal from '@/shared/components/Modal'
import { paths } from '@/shared/config/paths'
import { useToast } from '@/shared/hooks/useToast'
import { useNavigate } from '@/shared/i18n/useNavigate'
import { useI18n } from '@/shared/i18n/useI18n'
import { cx } from '@/shared/utils/classNames'
import { profileService } from '../services/profileService'

/** Qué se borra y qué se queda, para decidir sabiendo lo que pasa. */
const GROUPS = [
  {
    key: 'deleted',
    icon: 'trash',
    tone: 'text-red-700 dark:text-red-400',
    items: ['deleted1', 'deleted2', 'deleted3'],
  },
  { key: 'kept', icon: 'chat', tone: 'text-accent', items: ['kept1'] },
]

/** Confirmación: repite qué pasa y pide la contraseña si la cuenta tiene (las creadas con Google pueden no tenerla). */
function ConfirmDeletion({ needsPassword, onCancel }) {
  const { t } = useI18n()
  const { logout } = useAuth()
  const navigate = useNavigate()
  const toast = useToast()
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [pending, setPending] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (needsPassword && !password) {
      setError(t('profile.deleteAccount.passwordRequired'))
      return
    }
    setPending(true)
    setError(null)
    try {
      await profileService.deleteAccount(needsPassword ? password : null)
      // La sesión ya no vale en el servidor: se vuelve a la portada y se cierra aquí también. En este orden: si se
      // cerrara antes, la protección de las páginas privadas mandaría a «Iniciar sesión».
      navigate(paths.home, { replace: true })
      logout()
      toast.success(t('profile.deleteAccount.done'))
    } catch (err) {
      setError(getErrorMessage(err))
      setPending(false)
    }
  }

  return (
    <Modal title={t('profile.deleteAccount.dialogTitle')} size="sm" onClose={onCancel} dismissible={!pending}>
      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        <p className="text-ink-soft">{t('profile.deleteAccount.dialogText')}</p>
        {error && <Alert variant="error">{error}</Alert>}
        {needsPassword && (
          <PasswordField
            label={t('profile.deleteAccount.password')}
            hint={t('profile.deleteAccount.passwordHint')}
            name="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="current-password"
            required
          />
        )}
        <footer className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <Button variant="secondary" onClick={onCancel} disabled={pending}>
            {t('profile.deleteAccount.cancel')}
          </Button>
          <Button type="submit" variant="danger" loading={pending}>
            {t('profile.deleteAccount.confirm')}
          </Button>
        </footer>
      </form>
    </Modal>
  )
}

/**
 * «Eliminar tu cuenta», al final de Editar perfil: explica qué se borra y qué se queda (el foro, sin nombre) antes de
 * pedir confirmación. Las cuentas de administración no pueden eliminarse aquí (el panel podría quedarse sin nadie).
 */
export default function DeleteAccountSection({ className }) {
  const { t } = useI18n()
  const { user } = useAuth()
  const [confirming, setConfirming] = useState(false)
  if (!user) return null
  const isAdmin = user.role === 'ADMIN'

  return (
    <section aria-labelledby="delete-account-title" className={className}>
      <hgroup>
        <Eyebrow>{t('profile.deleteAccount.eyebrow')}</Eyebrow>
        <h2 id="delete-account-title" className="mt-3 text-2xl font-bold tracking-tight text-ink">
          {t('profile.deleteAccount.title')}
        </h2>
      </hgroup>
      <article
        aria-labelledby="delete-account-title"
        className="mt-5 rounded-3xl border border-red-200 bg-surface p-5 shadow-card sm:p-8 dark:border-red-500/30"
      >
        <p className="text-ink-soft">{t('profile.deleteAccount.intro')}</p>
        <ul className="mt-6 grid gap-6 sm:grid-cols-2">
          {GROUPS.map((group) => (
            <li key={group.key}>
              <h3 className="flex items-center gap-2 font-semibold text-ink">
                <Icon name={group.icon} className={cx('h-5 w-5', group.tone)} />
                {t(`profile.deleteAccount.${group.key}Title`)}
              </h3>
              <ul className="mt-3 space-y-2 text-sm leading-relaxed text-ink-soft">
                {group.items.map((item) => (
                  <li key={item}>{t(`profile.deleteAccount.${item}`)}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
        <footer className="mt-6 border-t border-slate-200 pt-6">
          {isAdmin ? (
            <p className="flex gap-2 text-sm text-ink-muted">
              <Icon name="info" className="mt-0.5 h-4 w-4 shrink-0" />
              {t('profile.deleteAccount.admin')}
            </p>
          ) : (
            <Button variant="danger" onClick={() => setConfirming(true)}>
              <Icon name="trash" className="h-4 w-4" />
              {t('profile.deleteAccount.button')}
            </Button>
          )}
        </footer>
      </article>
      {confirming && (
        <ConfirmDeletion needsPassword={user.hasPassword !== false} onCancel={() => setConfirming(false)} />
      )}
    </section>
  )
}
