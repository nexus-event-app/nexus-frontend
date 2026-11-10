import { cx } from '@/shared/utils/classNames'
import LoadingStatus from './LoadingStatus'
import Skeleton from './Skeleton'

export default function ListSkeleton({ rows = 5, className }) {
  return (
    <>
      <LoadingStatus />
      <ul aria-hidden="true" className={cx('space-y-3', className)}>
        {Array.from({ length: rows }, (_, index) => (
          <li key={index} className="card space-y-3 p-5">
            <Skeleton className="h-5 w-2/3" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-1/3" />
          </li>
        ))}
      </ul>
    </>
  )
}
