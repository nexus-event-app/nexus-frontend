import Skeleton from './Skeleton'

export default function ArticleSkeleton() {
  return (
    <div role="status" aria-busy="true" className="mx-auto max-w-prose space-y-4">
      <span className="sr-only">Cargando contenido…</span>
      <Skeleton className="h-4 w-1/4" />
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-10 w-3/4" />
      <Skeleton className="aspect-[16/9] w-full" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
    </div>
  )
}
