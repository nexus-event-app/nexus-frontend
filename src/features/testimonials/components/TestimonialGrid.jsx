import TestimonialCard from './TestimonialCard'

export default function TestimonialGrid({ items, linkAuthors = true }) {
  return (
    <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {items.map((testimonial) => (
        <li key={testimonial.id}>
          <TestimonialCard testimonial={testimonial} linkAuthor={linkAuthors} />
        </li>
      ))}
    </ul>
  )
}
