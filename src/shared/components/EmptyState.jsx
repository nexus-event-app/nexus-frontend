import Icon from './Icon'

export default function EmptyState({ icon = 'info', title, description, action }) {
  return (
    <div className="card flex flex-col items-center px-6 py-12 text-center">
      <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-accent-soft text-accent">
        <Icon name={icon} className="h-6 w-6" />
      </span>
      <h2 className="text-lg font-semibold text-ink">{title}</h2>
      {description && <p className="mt-2 max-w-md text-ink-muted">{description}</p>}
      {action && <div className="mt-6">{action}</div>}
    </div>
  )
}
