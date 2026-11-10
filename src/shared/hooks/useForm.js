import { useCallback, useRef, useState } from 'react'
import { toApiError } from '@/shared/api/ApiError'
import { translate } from '@/shared/i18n/translate'

function focusFirstInvalid(form) {
  requestAnimationFrame(() => {
    form?.querySelector('[aria-invalid="true"]')?.focus()
  })
}

export function useForm({ initialValues, validate, onSubmit }) {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [formError, setFormError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const submittingRef = useRef(false)

  const setValue = useCallback((name, value) => {
    setValues((current) => ({ ...current, [name]: value }))
    setErrors((current) => {
      if (!(name in current)) return current
      const { [name]: _removed, ...rest } = current
      return rest
    })
  }, [])

  const handleChange = useCallback(
    (event) => {
      const { name, type, value, checked } = event.target
      setValue(name, type === 'checkbox' ? checked : value)
    },
    [setValue],
  )

  const reset = useCallback(
    (nextValues = initialValues) => {
      setValues(nextValues)
      setErrors({})
      setFormError('')
    },
    [initialValues],
  )

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (submittingRef.current) return

    const form = event.currentTarget
    const found = validate ? validate(values) : {}
    setFormError('')
    setErrors(found)
    if (Object.keys(found).length > 0) {
      focusFirstInvalid(form)
      return
    }

    submittingRef.current = true
    setSubmitting(true)
    try {
      await onSubmit(values)
    } catch (error) {
      const apiError = toApiError(error)
      const fieldErrors = apiError.fieldErrors ?? {}
      const hasFieldErrors = Object.keys(fieldErrors).length > 0
      setErrors(fieldErrors)
      setFormError(hasFieldErrors ? translate('errors.checkFields') : apiError.message)
      if (hasFieldErrors) focusFirstInvalid(form)
    } finally {
      submittingRef.current = false
      setSubmitting(false)
    }
  }

  const getFieldProps = (name) => ({
    name,
    value: values[name] ?? '',
    onChange: handleChange,
    error: errors[name],
  })

  return { values, errors, formError, submitting, setValue, handleChange, handleSubmit, getFieldProps, reset }
}
