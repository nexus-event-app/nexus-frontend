import { translate } from '@/shared/i18n/translate'

const KNOWN_STATUSES = [400, 401, 403, 404, 409, 429, 500]

/** Mensaje por defecto en el idioma actual cuando el servidor no manda uno propio. */
function defaultMessage(status) {
  if (status === 0) return translate('errors.network')
  return translate(KNOWN_STATUSES.includes(status) ? `errors.${status}` : 'errors.generic')
}

export class ApiError extends Error {
  constructor({ status = 0, code = 'UNKNOWN', message, fieldErrors = {} } = {}) {
    super(message || defaultMessage(status))
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
  return new ApiError({ status: 0, code: 'UNKNOWN', message: translate('errors.generic') })
}

export function getErrorMessage(error) {
  return toApiError(error).message
}
