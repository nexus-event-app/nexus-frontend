import { getErrorMessage } from '@/shared/api/ApiError'
import Button from './Button'
import Icon from './Icon'

export default function ErrorState({ error, title = 'No hemos podido cargar este contenido', onRetry }) {
  return (
    <div role="alert" className="card flex flex-col items-center px-6 py-10 text-center">
      <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-700 dark:bg-red-500/15 dark:text-red-400">
        <Icon name="warning" className="h-6 w-6" />
      </span>
      <h2 className="text-lg font-semibold text-ink">{title}</h2>
      {error && <p className="mt-2 max-w-md text-ink-muted">{getErrorMessage(error)}</p>}
      {onRetry && (
        <Button variant="secondary" className="mt-6" onClick={onRetry}>
          Reintentar
        </Button>
      )}
    </div>
  )
}
