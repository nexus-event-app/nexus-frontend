import TestimonialCard from './TestimonialCard'

/** Rejilla de testimonios. Deja aire arriba para las comillas de sello, que sobresalen de cada tarjeta. */
export default function TestimonialGrid({ items, linkAuthors = true }) {
  return (
    <ul className="grid grid-cols-1 gap-x-6 gap-y-12 pt-6 md:grid-cols-2 lg:grid-cols-3">
      {items.map((testimonial, index) => (
        <li key={testimonial.id}>
          <TestimonialCard testimonial={testimonial} linkAuthor={linkAuthors} index={index} />
        </li>
      ))}
    </ul>
  )
}
