import { cx } from '@/shared/utils/classNames'

export default function Skeleton({ className }) {
  return <span className={cx('block animate-pulse rounded-control bg-slate-200', className)} aria-hidden="true" />
}
