import { cx } from '@/shared/utils/classNames'
import { initialsOf } from '@/shared/utils/text'

/**
 * Tonos sobrios para los «logos» de empresa (azules, violetas y grises oscuros, de la familia de la marca): cada
 * empresa recibe siempre el mismo, según su nombre. Colores fijos, con texto blanco, en tema claro y oscuro.
 */
const TONES = ['bg-brand-900', 'bg-gray-800', 'bg-indigo-900', 'bg-violet-900', 'bg-gray-700', 'bg-brand-700']

function hashOf(text) {
  return [...text].reduce((hash, char) => (hash * 31 + char.charCodeAt(0)) >>> 0, 7)
}

/**
 * Iniciales de la empresa sobre un color sobrio, a modo de logo (las ofertas importadas no traen el suyo). Es
 * decorativo: el nombre de la empresa ya aparece en texto al lado. `muted` lo pinta en gris del tema (ofertas que ya no
 * están publicadas): bajar la opacidad del color dejaría el texto sin contraste suficiente.
 */
export default function CompanyMonogram({ name, muted = false, className }) {
  const label = name?.trim() || '?'
  return (
    <span
      aria-hidden="true"
      className={cx(
        'flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-base font-bold tracking-wide ring-1 ring-inset',
        muted
          ? 'bg-canvas text-ink-muted ring-slate-200'
          : cx('text-white ring-white/10', TONES[hashOf(label) % TONES.length]),
        className,
      )}
    >
      {initialsOf(label)}
    </span>
  )
}
