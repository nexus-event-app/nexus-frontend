import JobCard from './JobCard'

export default function JobGrid({ items, headingLevel }) {
  return (
    <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((job) => (
        <li key={job.id}>
          <JobCard job={job} headingLevel={headingLevel} />
        </li>
      ))}
    </ul>
  )
}
