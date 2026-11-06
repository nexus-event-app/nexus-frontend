import Badge from '@/shared/components/Badge'

export default function StatusBadge({ active, activeLabel = 'Activa', inactiveLabel = 'Inactiva' }) {
  return <Badge tone={active ? 'green' : 'slate'}>{active ? activeLabel : inactiveLabel}</Badge>
}
