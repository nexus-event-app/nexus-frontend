import JobCard from './JobCard'

export const JOB_LIST_CLASSES =
  'divide-y divide-slate-200 overflow-hidden rounded-3xl border border-slate-200 bg-surface shadow-[0_2px_0_rgba(15,23,42,0.05),0_4px_0_rgba(15,23,42,0.04),0_18px_30px_-18px_rgba(46,36,119,0.45)] dark:shadow-[0_2px_0_rgba(0,0,0,0.35),0_4px_0_rgba(0,0,0,0.3),0_18px_30px_-18px_rgba(0,0,0,0.8)]'

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
