import LoadingStatus from './LoadingStatus'
import Skeleton from './Skeleton'

export default function CardGridSkeleton({ count = 6, withImage = true }) {
  return (
    <>
      <LoadingStatus />
      <ul aria-hidden="true" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: count }, (_, index) => (
          <li key={index} className="card overflow-hidden">
            {withImage && <Skeleton className="aspect-[16/9] w-full rounded-none" />}
            <span className="block space-y-3 p-5">
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-2/3" />
            </span>
          </li>
        ))}
      </ul>
    </>
  )
}
