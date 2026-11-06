import { cx } from '@/shared/utils/classNames'

export default function Skeleton({ className }) {
  return <div className={cx('animate-pulse rounded-control bg-slate-200', className)} aria-hidden="true" />
}
