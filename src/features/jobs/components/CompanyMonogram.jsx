import { cx } from '@/shared/utils/classNames'
import { initialsOf } from '@/shared/utils/text'

/** Degradados para los «logos» de empresa: cada empresa recibe siempre el mismo, según su nombre. */
const GRADIENTS = [
  'from-indigo-500 to-violet-600',
  'from-sky-500 to-indigo-600',
  'from-emerald-500 to-teal-600',
  'from-amber-500 to-orange-600',
  'from-pink-500 to-rose-600',
  'from-fuchsia-500 to-purple-600',
  'from-cyan-500 to-blue-600',
]

function hashOf(text) {
  return [...text].reduce((hash, char) => (hash * 31 + char.charCodeAt(0)) >>> 0, 7)
}

/**
 * Iniciales de la empresa sobre un degradado, a modo de logo (las ofertas importadas no traen el suyo). Es
 * decorativo: el nombre de la empresa ya aparece en texto al lado.
 */
export default function CompanyMonogram({ name, className }) {
  const label = name?.trim() || '?'
  return (
    <span
      aria-hidden="true"
      className={cx(
        'flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br text-base font-bold text-white shadow-md transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-105',
        GRADIENTS[hashOf(label) % GRADIENTS.length],
        className,
      )}
    >
      {initialsOf(label)}
    </span>
  )
}
