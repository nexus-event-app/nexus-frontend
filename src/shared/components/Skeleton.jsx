import { cx } from '@/shared/utils/classNames'

/** Bloque gris animado que ocupa el sitio de un contenido mientras carga. Decorativo. */
export default function Skeleton({ className }) {
  return <span className={cx('block animate-pulse rounded-control bg-slate-200', className)} aria-hidden="true" />
}
