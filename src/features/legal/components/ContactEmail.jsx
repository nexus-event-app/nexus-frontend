import { legalConfig } from '@/shared/config/legal'
import LegalValue from './LegalValue'

export default function ContactEmail() {
  return <LegalValue value={legalConfig.email} href={legalConfig.email ? `mailto:${legalConfig.email}` : undefined} />
}
