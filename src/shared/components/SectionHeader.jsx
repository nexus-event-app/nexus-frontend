export default function SectionHeader({ id, title, description, action }) {
  return (
    <header className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <hgroup>
        <h2 id={id} className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">
          {title}
        </h2>
        {description && <p className="mt-2 max-w-2xl text-ink-muted">{description}</p>}
      </hgroup>
      {action}
    </header>
  )
}
