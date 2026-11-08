import { useId } from 'react'
import { paths } from '@/shared/config/paths'
import { useI18n } from '@/shared/i18n/useI18n'

function NewTabLink({ to, children }) {
  const { t } = useI18n()
  return (
    <a href={to} target="_blank" rel="noopener" className="link">
      {children}
      <span className="sr-only">{t('auth.terms.newTab')}</span>
    </a>
  )
}

/** Aceptación obligatoria de las condiciones de uso y la política de privacidad al registrarse. */
export default function TermsCheckbox({ checked, onChange, error }) {
  const { t } = useI18n()
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
          {t('auth.terms.start')}
          <NewTabLink to={paths.legalNotice}>{t('auth.terms.legalNotice')}</NewTabLink>
          {t('auth.terms.middle')}
          <NewTabLink to={paths.privacy}>{t('auth.terms.privacy')}</NewTabLink>
          {t('auth.terms.end')}
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
