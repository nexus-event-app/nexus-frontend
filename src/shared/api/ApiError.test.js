import { describe, expect, it } from 'vitest'
import { ApiError, getErrorMessage, toApiError } from './ApiError'

describe('ApiError.fromAxios', () => {
  it('sin respuesta es un error de red', () => {
    const error = ApiError.fromAxios(new Error('Network Error'))
    expect(error.status).toBe(0)
    expect(error.code).toBe('NETWORK_ERROR')
    expect(error.message).toMatch(/conectar con el servidor/)
  })

  it('usa el mensaje y los errores por campo del servidor', () => {
    const error = ApiError.fromAxios({
      response: {
        status: 400,
        data: { error: 'VALIDATION_ERROR', message: 'Datos no válidos', fieldErrors: { email: 'Email no válido' } },
      },
    })
    expect(error).toMatchObject({ status: 400, code: 'VALIDATION_ERROR', message: 'Datos no válidos' })
    expect(error.fieldErrors).toEqual({ email: 'Email no válido' })
  })

  it('si el servidor no manda mensaje usa uno traducido según el estado', () => {
    expect(ApiError.fromAxios({ response: { status: 429, data: '' } }).message).toMatch(/Demasiadas peticiones/)
    expect(ApiError.fromAxios({ response: { status: 418, data: {} } }).message).toMatch(/error inesperado/)
  })
})

describe('toApiError y getErrorMessage', () => {
  it('convierten cualquier error en uno de la API', () => {
    const original = new ApiError({ status: 404 })
    expect(toApiError(original)).toBe(original)
    expect(toApiError(new TypeError('x'))).toBeInstanceOf(ApiError)
    expect(getErrorMessage(new ApiError({ status: 403 }))).toMatch(/permisos/)
  })
})
