import { useId } from 'react'
import { cx } from '@/shared/utils/classNames'

export default function FormField({
  label,
  name,
  as: Control = 'input',
  type = 'text',
  error,
  hint,
  required = false,
  adornment,
  className,
  children,
  ...controlProps
}) {
  const id = useId()
  const hintId = `${id}-hint`
  const errorId = `${id}-error`
  const describedBy = [hint && hintId, error && errorId].filter(Boolean).join(' ') || undefined

  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-ink">
        {label}
        {required && (
          <span className="text-red-700" aria-hidden="true">
            {' '}
            *
          </span>
        )}
      </label>
      <div className="relative">
        <Control
          id={id}
          name={name}
          type={Control === 'input' ? type : undefined}
          required={required}
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={describedBy}
          className={cx('field-input', adornment && 'pr-12')}
          {...controlProps}
        >
          {children}
        </Control>
        {adornment && <div className="absolute inset-y-0 right-0 flex items-center pr-1">{adornment}</div>}
      </div>
      {hint && (
        <p id={hintId} className="mt-1.5 text-sm text-ink-muted">
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} role="alert" className="mt-1.5 text-sm font-medium text-red-700">
          {error}
        </p>
      )}
    </div>
  )
}
