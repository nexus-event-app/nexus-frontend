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

export function validateLogin({ email, password }) {
  const errors = {}
  const emailError = validateEmail(email)
  if (emailError) errors.email = emailError
  if (!password) errors.password = 'Introduce tu contraseña.'
  return errors
}

export function validateRegister({ name, email, password }) {
  const errors = {}
  const trimmedName = name.trim()
  if (trimmedName.length < 2 || trimmedName.length > 50) {
    errors.name = 'El nombre debe tener entre 2 y 50 caracteres.'
  }
  const emailError = validateEmail(email)
  if (emailError) errors.email = emailError
  if (password.length < 8 || password.length > 72) {
    errors.password = 'La contraseña debe tener entre 8 y 72 caracteres.'
  } else if (!/\p{L}/u.test(password) || !/\d/.test(password)) {
    errors.password = 'La contraseña debe incluir al menos una letra y un número.'
  }
  return errors
}
