import { Link } from '@/shared/i18n/router'
import { cx } from '@/shared/utils/classNames'

const VARIANTS = {
  // Fichas sueltas: sin borde, solo la elegida lleva el tono de la marca.
  chips: {
    list: 'flex flex-wrap gap-1.5',
    item: 'rounded-full px-3.5',
    idle: 'text-ink-muted hover:bg-slate-100 hover:text-ink',
    active: 'bg-accent-soft text-accent ring-1 ring-inset ring-accent-line',
  },
  // Control segmentado: las opciones van juntas en una pastilla y la elegida se levanta un poco.
  segmented: {
    list: 'inline-flex flex-wrap gap-0.5 rounded-full bg-canvas p-1 ring-1 ring-inset ring-slate-200',
    item: 'rounded-full px-3.5',
    idle: 'text-ink-muted hover:text-ink',
    active: 'bg-surface text-ink shadow-card ring-1 ring-inset ring-slate-200',
  },
}

/**
 * Filtros como enlaces (cada combinación tiene su dirección, se puede compartir y volver atrás). La opción elegida se
 * marca con `aria-current`, además de con el color.
 */
export default function FilterLinks({ label, options, variant = 'chips', className }) {
  const styles = VARIANTS[variant]
  return (
    <nav aria-label={label} className={className}>
      <ul className={styles.list}>
        {options.map((option) => (
          <li key={option.key}>
            <Link
              to={option.href}
              aria-current={option.active ? 'true' : undefined}
              className={cx(
                'inline-flex min-h-[2.75rem] items-center whitespace-nowrap text-sm font-medium transition-colors sm:min-h-[2.25rem]',
                styles.item,
                option.active ? styles.active : styles.idle,
              )}
            >
              {option.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
