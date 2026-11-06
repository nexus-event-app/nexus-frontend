/**
 * Datos legales del titular del sitio (LSSI art. 10 y RGPD art. 13).
 * Se leen de variables de entorno en tiempo de build para que no queden escritos en el repositorio.
 * Mientras falten, las páginas legales muestran «pendiente de configurar».
 */
function env(name) {
  const value = import.meta.env[name]
  return typeof value === 'string' && value.trim() ? value.trim() : null
}

export const legalConfig = {
  ownerName: env('VITE_LEGAL_OWNER_NAME'),
  ownerId: env('VITE_LEGAL_OWNER_ID'),
  address: env('VITE_LEGAL_ADDRESS'),
  email: env('VITE_LEGAL_EMAIL'),
  hostingProvider: env('VITE_LEGAL_HOSTING_PROVIDER'),
  lastUpdated: '6 de noviembre de 2026',
}

export const isLegalConfigComplete = Boolean(
  legalConfig.ownerName && legalConfig.ownerId && legalConfig.address && legalConfig.email,
)
