import { useState } from 'react'
import FormField from '@/shared/components/FormField'
import Icon from '@/shared/components/Icon'

export default function PasswordField({ label = 'Contraseña', ...props }) {
  const [visible, setVisible] = useState(false)

  return (
    <FormField
      {...props}
      label={label}
      type={visible ? 'text' : 'password'}
      autoCapitalize="none"
      autoCorrect="off"
      spellCheck={false}
      adornment={
        <button
          type="button"
          onClick={() => setVisible((current) => !current)}
          aria-label={visible ? 'Ocultar contraseña' : 'Mostrar contraseña'}
          aria-pressed={visible}
          className="flex h-11 w-11 items-center justify-center rounded-control text-ink-muted hover:text-ink"
        >
          <Icon name={visible ? 'eye-off' : 'eye'} className="h-5 w-5" />
        </button>
      }
    />
  )
}
