import LoadingStatus from './LoadingStatus'
import Skeleton from './Skeleton'

export default function ArticleSkeleton() {
  return (
    <>
      <LoadingStatus />
      <span aria-hidden="true" className="mx-auto block max-w-prose space-y-4">
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-3/4" />
        <Skeleton className="aspect-[16/9] w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </span>
    </>
  )
}
