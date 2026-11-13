import { cx } from '@/shared/utils/classNames'
import TestimonialCard from './TestimonialCard'

/** Rejilla de testimonios. Deja aire arriba para las comillas de sello, que sobresalen de cada tarjeta. */
export default function TestimonialGrid({ items, linkAuthors = true, compact = false, columns = 3 }) {
  return (
    <ul
      className={cx(
        'grid grid-cols-1 gap-x-6 md:grid-cols-2',
        // En columnas estrechas (p. ej. el perfil, junto al lateral) caben dos por fila.
        columns === 3 && 'lg:grid-cols-3',
        compact ? 'gap-y-10 pt-5' : 'gap-y-12 pt-6',
      )}
    >
      {items.map((testimonial, index) => (
        <li key={testimonial.id}>
          <TestimonialCard testimonial={testimonial} linkAuthor={linkAuthors} index={index} compact={compact} />
        </li>
      ))}
    </ul>
  )
}
