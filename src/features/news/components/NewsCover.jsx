import Icon from '@/shared/components/Icon'
import { newsCategories } from '@/shared/config/catalogs'
import { cx } from '@/shared/utils/classNames'

/** Color e icono de la portada por defecto de cada categoría (gradientes fijos: no cambian con el tema). */
const COVERS = {
  DESARROLLO: { icon: 'code', gradient: 'from-blue-600 via-indigo-600 to-indigo-800' },
  ENTREVISTAS: { icon: 'chat', gradient: 'from-violet-600 via-purple-600 to-fuchsia-700' },
  NETWORKING: { icon: 'users', gradient: 'from-emerald-600 via-teal-600 to-cyan-700' },
  RECURSOS: { icon: 'document', gradient: 'from-indigo-600 via-blue-600 to-sky-600' },
  GENERAL: { icon: 'newspaper', gradient: 'from-indigo-700 via-indigo-800 to-gray-900' },
}

/** Patrón de puntos sutil, como textura de fondo. */
const DOTS = { backgroundImage: 'radial-gradient(rgb(255 255 255 / 0.14) 1px, transparent 1px)', backgroundSize: '18px 18px' }

/**
 * Portada para las noticias sin imagen (o cuya imagen no carga): ilustración con el color y el icono de su
 * categoría. Es decorativa; el titular de la noticia ya aparece al lado.
 */
export default function NewsCover({ category, size = 'md' }) {
  const cover = COVERS[category] ?? COVERS.GENERAL
  const large = size === 'lg'
  return (
    <div
      className={cx('relative flex h-full w-full items-center justify-center overflow-hidden bg-gradient-to-br text-white', cover.gradient)}
      aria-hidden="true"
    >
      <div className="absolute inset-0" style={DOTS} />
      <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
      <div className="absolute -bottom-12 -left-8 h-36 w-36 rounded-full bg-black/10 blur-2xl" />
      <span
        className={cx(
          'relative flex items-center justify-center rounded-2xl bg-white/15 shadow-lg ring-1 ring-white/25 backdrop-blur-sm',
          large ? 'h-24 w-24' : 'h-16 w-16',
        )}
      >
        <Icon name={cover.icon} className={large ? 'h-12 w-12' : 'h-8 w-8'} />
      </span>
      <span className="absolute bottom-3 left-4 text-xs font-bold uppercase tracking-widest text-white/85">
        {newsCategories.labelOf(category ?? 'GENERAL')}
      </span>
      <span className="absolute right-4 top-3 font-mono text-xs font-semibold text-white/60">&lt;/&gt;</span>
    </div>
  )
}
