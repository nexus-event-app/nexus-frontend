import Skeleton from './Skeleton'

export default function CardGridSkeleton({ count = 6, withImage = true }) {
  return (
    <div role="status" aria-busy="true" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <span className="sr-only">Cargando contenido…</span>
      {Array.from({ length: count }, (_, index) => (
        <div key={index} className="card overflow-hidden" aria-hidden="true">
          {withImage && <Skeleton className="aspect-[16/9] w-full rounded-none" />}
          <div className="space-y-3 p-5">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </div>
      ))}
    </div>
  )
}
