import { useState } from 'react'
import FormField from '@/shared/components/FormField'
import Icon from '@/shared/components/Icon'
import { useI18n } from '@/shared/i18n/useI18n'

export default function PasswordField({ label, ...props }) {
  const { t } = useI18n()
  const [visible, setVisible] = useState(false)

  return (
    <FormField
      {...props}
      label={label ?? t('auth.password.label')}
      type={visible ? 'text' : 'password'}
      autoCapitalize="none"
      autoCorrect="off"
      spellCheck={false}
      adornment={
        <button
          type="button"
          onClick={() => setVisible((current) => !current)}
          aria-label={visible ? t('auth.password.hide') : t('auth.password.show')}
          aria-pressed={visible}
          className="flex h-11 w-11 items-center justify-center rounded-control text-ink-muted hover:text-ink"
        >
          <Icon name={visible ? 'eye-off' : 'eye'} className="h-5 w-5" />
        </button>
      }
    />
  )
}
