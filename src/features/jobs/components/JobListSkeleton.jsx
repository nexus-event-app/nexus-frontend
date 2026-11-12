import LoadingStatus from '@/shared/components/LoadingStatus'
import Skeleton from '@/shared/components/Skeleton'
import { JOB_LIST_CLASSES } from './JobList'

/** Esqueleto de carga con la forma de la lista de ofertas. */
export default function JobListSkeleton({ count = 5 }) {
  return (
    <>
      <LoadingStatus />
      <ul aria-hidden="true" className={JOB_LIST_CLASSES}>
        {Array.from({ length: count }, (_, index) => (
          <li key={index} className="grid grid-cols-[3rem_minmax(0,1fr)] gap-x-4 gap-y-2 px-5 py-5 sm:px-6">
            <Skeleton className="row-span-3 h-12 w-12 rounded-xl" />
            <Skeleton className="h-5 w-2/3" />
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-4 w-1/2" />
          </li>
        ))}
      </ul>
    </>
  )
}
