const generic = {
  es: 'Ha ocurrido un error inesperado. Inténtalo de nuevo más tarde.',
  ca: 'S’ha produït un error inesperat. Torna-ho a provar més tard.',
  en: 'An unexpected error occurred. Please try again later.',
}

export default {
  es: {
    network: 'No se pudo conectar con el servidor. Revisa tu conexión e inténtalo de nuevo.',
    400: 'La solicitud no es válida.',
    401: 'Necesitas iniciar sesión para continuar.',
    403: 'No tienes permisos para realizar esta acción.',
    404: 'No hemos encontrado lo que buscas.',
    409: 'La operación entra en conflicto con el estado actual.',
    429: 'Demasiadas peticiones. Espera un momento y vuelve a intentarlo.',
    500: generic.es,
    generic: generic.es,
    checkFields: 'Revisa los campos marcados.',
  },
  ca: {
    network: 'No s’ha pogut connectar amb el servidor. Revisa la connexió i torna-ho a provar.',
    400: 'La sol·licitud no és vàlida.',
    401: 'Has d’iniciar la sessió per continuar.',
    403: 'No tens permisos per fer aquesta acció.',
    404: 'No hem trobat el que busques.',
    409: 'L’operació entra en conflicte amb l’estat actual.',
    429: 'Massa peticions. Espera un moment i torna-ho a provar.',
    500: generic.ca,
    generic: generic.ca,
    checkFields: 'Revisa els camps marcats.',
  },
  en: {
    network: 'Could not connect to the server. Check your connection and try again.',
    400: 'The request is not valid.',
    401: 'You need to log in to continue.',
    403: 'You do not have permission to do this.',
    404: 'We could not find what you are looking for.',
    409: 'The operation conflicts with the current state.',
    429: 'Too many requests. Wait a moment and try again.',
    500: generic.en,
    generic: generic.en,
    checkFields: 'Please check the highlighted fields.',
  },
}
