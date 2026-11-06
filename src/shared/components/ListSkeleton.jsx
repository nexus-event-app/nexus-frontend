import Skeleton from './Skeleton'

export default function ListSkeleton({ rows = 5 }) {
  return (
    <div role="status" aria-busy="true" className="space-y-3">
      <span className="sr-only">Cargando contenido…</span>
      {Array.from({ length: rows }, (_, index) => (
        <div key={index} className="card space-y-3 p-5" aria-hidden="true">
          <Skeleton className="h-5 w-2/3" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-1/3" />
        </div>
      ))}
    </div>
  )
}
