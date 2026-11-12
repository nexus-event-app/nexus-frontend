import JobCard from './JobCard'

/** Clases de la caja que agrupa las filas de ofertas (también las usa su esqueleto de carga). */
export const JOB_LIST_CLASSES =
  'divide-y divide-slate-200 overflow-hidden rounded-3xl border border-slate-200 bg-surface shadow-card'

/** Lista de ofertas: una por fila, separadas por una línea fina, dentro de una sola caja. */
export default function JobList({ items, headingLevel }) {
  return (
    <ul className={JOB_LIST_CLASSES}>
      {items.map((job) => (
        <li key={job.id}>
          <JobCard job={job} headingLevel={headingLevel} />
        </li>
      ))}
    </ul>
  )
}
