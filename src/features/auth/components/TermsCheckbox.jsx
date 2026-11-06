import { useId } from 'react'
import { paths } from '@/shared/config/paths'

function NewTabLink({ to, children }) {
  return (
    <a href={to} target="_blank" rel="noopener" className="link">
      {children}
      <span className="sr-only"> (se abre en una pestaña nueva)</span>
    </a>
  )
}

/** Aceptación obligatoria de las condiciones de uso y la política de privacidad al registrarse. */
export default function TermsCheckbox({ checked, onChange, error }) {
  const id = useId()
  const errorId = `${id}-error`

  return (
    <div>
      <div className="flex items-start gap-3">
        <input
          id={id}
          type="checkbox"
          name="acceptTerms"
          checked={checked}
          onChange={onChange}
          required
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={error ? errorId : undefined}
          className="mt-1 h-5 w-5 shrink-0 cursor-pointer rounded border-slate-400 text-brand-600"
        />
        <label htmlFor={id} className="cursor-pointer text-sm text-ink-soft">
          He leído y acepto el <NewTabLink to={paths.legalNotice}>aviso legal y las condiciones de uso</NewTabLink> y
          la <NewTabLink to={paths.privacy}>política de privacidad</NewTabLink>. Tengo al menos 14 años.
        </label>
      </div>
      {error && (
        <p id={errorId} role="alert" className="mt-1.5 text-sm font-medium text-red-700">
          {error}
        </p>
      )}
    </div>
  )
}
