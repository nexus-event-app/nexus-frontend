import JobCard from './JobCard'

export const JOB_LIST_CLASSES =
  'divide-y divide-slate-200 overflow-hidden rounded-3xl border border-slate-200 bg-surface shadow-card'

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
