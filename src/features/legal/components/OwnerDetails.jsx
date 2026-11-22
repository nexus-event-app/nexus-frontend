import { legalConfig } from '@/shared/config/legal'
import { siteConfig } from '@/shared/config/site'
import LegalValue from './LegalValue'

export default function OwnerDetails({ config = legalConfig }) {
  return (
    <ul>
      <li>
        <strong>Proyecto:</strong> {siteConfig.name} ({siteConfig.url.replace(/^https?:\/\//, '')})
      </li>
      <li>
        <strong>Titular:</strong> <LegalValue value={config.ownerName} />
      </li>
      {config.ownerId && (
        <li>
          <strong>NIF:</strong> {config.ownerId}
        </li>
      )}
      {config.address && (
        <li>
          <strong>Domicilio:</strong> {config.address}
        </li>
      )}
      <li>
        <strong>Email de contacto:</strong>{' '}
        <LegalValue value={config.email} href={config.email ? `mailto:${config.email}` : undefined} />
      </li>
    </ul>
  )
}
