const DEFAULT_MESSAGES = {
  0: 'No se pudo conectar con el servidor. Revisa tu conexión e inténtalo de nuevo.',
  400: 'La solicitud no es válida.',
  401: 'Necesitas iniciar sesión para continuar.',
  403: 'No tienes permisos para realizar esta acción.',
  404: 'No hemos encontrado lo que buscas.',
  409: 'La operación entra en conflicto con el estado actual.',
  429: 'Demasiadas peticiones. Espera un momento y vuelve a intentarlo.',
  500: 'Ha ocurrido un error inesperado. Inténtalo de nuevo más tarde.',
}

const GENERIC_MESSAGE = 'Ha ocurrido un error inesperado. Inténtalo de nuevo más tarde.'

export class ApiError extends Error {
  constructor({ status = 0, code = 'UNKNOWN', message, fieldErrors = {} } = {}) {
    super(message || DEFAULT_MESSAGES[status] || GENERIC_MESSAGE)
    this.name = 'ApiError'
    this.status = status
    this.code = code
    this.fieldErrors = fieldErrors
  }

  static fromAxios(error) {
    const response = error.response
    if (!response) {
      return new ApiError({ status: 0, code: 'NETWORK_ERROR' })
    }

    const body = response.data && typeof response.data === 'object' ? response.data : {}
    return new ApiError({
      status: response.status,
      code: typeof body.error === 'string' ? body.error : 'UNKNOWN',
      message: typeof body.message === 'string' && body.message ? body.message : undefined,
      fieldErrors: body.fieldErrors && typeof body.fieldErrors === 'object' ? body.fieldErrors : {},
    })
  }
}

export function toApiError(error) {
  if (error instanceof ApiError) return error
  return new ApiError({ status: 0, code: 'UNKNOWN', message: GENERIC_MESSAGE })
}

export function getErrorMessage(error) {
  return toApiError(error).message
}
