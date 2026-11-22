import { useState } from 'react'
import PasswordField from '@/features/auth/components/PasswordField'
import { useAuth } from '@/features/auth/hooks/useAuth'
import { getErrorMessage } from '@/shared/api/ApiError'
import Alert from '@/shared/components/Alert'
import Button from '@/shared/components/Button'
import Icon from '@/shared/components/Icon'
import Modal from '@/shared/components/Modal'
import { paths } from '@/shared/config/paths'
import { useToast } from '@/shared/hooks/useToast'
import { useNavigate } from '@/shared/i18n/useNavigate'
import { useI18n } from '@/shared/i18n/useI18n'
import { cx } from '@/shared/utils/classNames'
import { profileService } from '../services/profileService'

const GROUPS = [
  {
    key: 'deleted',
    icon: 'trash',
    tone: 'text-red-700 dark:text-red-400',
    items: ['deleted1', 'deleted2', 'deleted3'],
  },
  { key: 'kept', icon: 'chat', tone: 'text-accent', items: ['kept1'] },
]

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
        <ul className="space-y-4 rounded-2xl bg-canvas p-4">
          {GROUPS.map((group) => (
            <li key={group.key}>
              <h3 className="flex items-center gap-2 text-sm font-semibold text-ink">
                <Icon name={group.icon} className={cx('h-4 w-4', group.tone)} />
                {t(`profile.deleteAccount.${group.key}Title`)}
              </h3>
              <ul className="mt-1.5 space-y-1 pl-6 text-sm leading-relaxed text-ink-soft">
                {group.items.map((item) => (
                  <li key={item}>{t(`profile.deleteAccount.${item}`)}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
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

export default function DeleteAccountSection({ className }) {
  const { t } = useI18n()
  const { user } = useAuth()
  const [confirming, setConfirming] = useState(false)
  if (!user) return null
  const isAdmin = user.role === 'ADMIN'

  return (
    <section aria-labelledby="delete-account-title" className={cx('border-t border-slate-200 pt-6', className)}>
      <h2 id="delete-account-title" className="text-base font-semibold text-ink">
        {t('profile.deleteAccount.title')}
      </h2>
      {isAdmin ? (
        <p className="mt-1 text-sm text-ink-muted">{t('profile.deleteAccount.admin')}</p>
      ) : (
        <p className="mt-1 text-sm text-ink-muted">
          {t('profile.deleteAccount.intro')}{' '}
          <button
            type="button"
            onClick={() => setConfirming(true)}
            className="-my-3 inline-flex min-h-[2.75rem] items-center font-semibold text-red-700 underline underline-offset-2 hover:no-underline dark:text-red-400"
          >
            {t('profile.deleteAccount.button')}
          </button>
        </p>
      )}
      {confirming && (
        <ConfirmDeletion needsPassword={user.hasPassword !== false} onCancel={() => setConfirming(false)} />
      )}
    </section>
  )
}
