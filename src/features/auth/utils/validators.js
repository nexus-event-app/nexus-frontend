const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function normalizeEmail(email) {
  return email.trim().toLowerCase()
}

function validateEmail(email) {
  const value = email.trim()
  if (!value) return 'Introduce tu email.'
  if (value.length > 100 || !EMAIL_PATTERN.test(value)) return 'El email debe ser válido.'
  return undefined
}

function validatePassword(password) {
  if (password.length < 8 || password.length > 72) return 'La contraseña debe tener entre 8 y 72 caracteres.'
  if (!/\p{L}/u.test(password) || !/\d/.test(password)) return 'La contraseña debe incluir al menos una letra y un número.'
  return undefined
}

export function validateForgotPassword({ email }) {
  const errors = {}
  const emailError = validateEmail(email)
  if (emailError) errors.email = emailError
  return errors
}

export function validateResetPassword({ password, confirmPassword }) {
  const errors = {}
  const passwordError = validatePassword(password)
  if (passwordError) errors.password = passwordError
  else if (password !== confirmPassword) errors.confirmPassword = 'Las contraseñas no coinciden.'
  return errors
}

export function validateLogin({ email, password }) {
  const errors = {}
  const emailError = validateEmail(email)
  if (emailError) errors.email = emailError
  if (!password) errors.password = 'Introduce tu contraseña.'
  return errors
}

export function validateRegister({ name, email, password, acceptTerms }) {
  const errors = {}
  const trimmedName = name.trim()
  if (trimmedName.length < 2 || trimmedName.length > 50) {
    errors.name = 'El nombre debe tener entre 2 y 50 caracteres.'
  }
  const emailError = validateEmail(email)
  if (emailError) errors.email = emailError
  const passwordError = validatePassword(password)
  if (passwordError) errors.password = passwordError
  if (!acceptTerms) errors.acceptTerms = 'Debes aceptar las condiciones de uso y la política de privacidad.'
  return errors
}
