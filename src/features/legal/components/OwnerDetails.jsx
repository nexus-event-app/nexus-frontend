import { legalConfig } from '@/shared/config/legal'
import { siteConfig } from '@/shared/config/site'
import LegalValue from './LegalValue'

/** Datos identificativos del titular, comunes al aviso legal y a la política de privacidad. */
export default function OwnerDetails() {
  return (
    <ul>
      <li>
        <strong>Proyecto:</strong> {siteConfig.name} ({siteConfig.url.replace(/^https?:\/\//, '')})
      </li>
      <li>
        <strong>Titular:</strong> <LegalValue value={legalConfig.ownerName} />
      </li>
      <li>
        <strong>NIF:</strong> <LegalValue value={legalConfig.ownerId} />
      </li>
      <li>
        <strong>Domicilio:</strong> <LegalValue value={legalConfig.address} />
      </li>
      <li>
        <strong>Email de contacto:</strong>{' '}
        <LegalValue value={legalConfig.email} href={legalConfig.email ? `mailto:${legalConfig.email}` : undefined} />
      </li>
    </ul>
  )
}
