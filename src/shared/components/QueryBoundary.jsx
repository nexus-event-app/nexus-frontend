import ErrorState from './ErrorState'

export default function QueryBoundary({ data, error, onRetry, skeleton, errorTitle, children }) {
  if (error) return <ErrorState error={error} title={errorTitle} onRetry={onRetry} />
  if (!data) return skeleton
  return children(data)
}
