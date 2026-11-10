import { describe, expect, it } from 'vitest'
import { normalizeEmail, validateLogin, validateRegister, validateResetPassword } from './validators'

const VALID = { name: 'Ana', email: 'ana@example.com', password: 'clave1234', acceptTerms: true }

describe('validateRegister', () => {
  it('no da errores con datos correctos', () => {
    expect(validateRegister(VALID)).toEqual({})
  })

  it('marca cada campo incorrecto', () => {
    const errors = validateRegister({ name: ' A ', email: 'ana@', password: 'corta1', acceptTerms: false })
    expect(Object.keys(errors).sort()).toEqual(['acceptTerms', 'email', 'name', 'password'])
  })

  it('exige letras y números en la contraseña, como el backend', () => {
    expect(validateRegister({ ...VALID, password: '12345678' }).password).toBeDefined()
    expect(validateRegister({ ...VALID, password: 'soloLetras' }).password).toBeDefined()
    expect(validateRegister({ ...VALID, password: 'contraseña1' }).password).toBeUndefined()
    expect(validateRegister({ ...VALID, password: `a1${'x'.repeat(71)}` }).password).toBeDefined()
  })
})

describe('validateLogin', () => {
  it('pide email y contraseña', () => {
    expect(validateLogin({ email: '', password: '' })).toEqual({
      email: expect.any(String),
      password: expect.any(String),
    })
    expect(validateLogin({ email: 'ana@example.com', password: 'x' })).toEqual({})
  })
})

describe('validateResetPassword', () => {
  it('comprueba que las dos contraseñas coinciden', () => {
    expect(validateResetPassword({ password: 'clave1234', confirmPassword: 'clave12345' })).toHaveProperty(
      'confirmPassword',
    )
    expect(validateResetPassword({ password: 'clave1234', confirmPassword: 'clave1234' })).toEqual({})
  })
})

describe('normalizeEmail', () => {
  it('quita espacios y pasa a minúsculas', () => {
    expect(normalizeEmail('  Ana@Example.COM ')).toBe('ana@example.com')
  })
})
