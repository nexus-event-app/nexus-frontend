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
  lastUpdated: '17 de noviembre de 2026',
}
