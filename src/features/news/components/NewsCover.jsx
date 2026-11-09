import Icon from '@/shared/components/Icon'
import { newsCategories } from '@/shared/config/catalogs'
import { useI18n } from '@/shared/i18n/useI18n'
import { cx } from '@/shared/utils/classNames'
import { coverTopic, hashOf } from '../utils/coverTopic'

/** Gradientes fijos (no cambian con el tema claro/oscuro), con contraste suficiente para el texto blanco. */
const PALETTES = [
  'from-indigo-600 via-blue-600 to-cyan-600',
  'from-violet-700 via-purple-600 to-fuchsia-600',
  'from-emerald-700 via-teal-600 to-cyan-700',
  'from-rose-600 via-pink-600 to-purple-700',
  'from-amber-600 via-orange-600 to-rose-600',
  'from-sky-700 via-indigo-600 to-violet-700',
  'from-teal-700 via-emerald-600 to-lime-700',
  'from-gray-900 via-indigo-900 to-indigo-700',
  'from-blue-800 via-blue-600 to-sky-500',
  'from-fuchsia-700 via-violet-700 to-indigo-800',
]

const PATTERNS = [
  { backgroundImage: 'radial-gradient(rgb(255 255 255 / 0.16) 1px, transparent 1px)', backgroundSize: '18px 18px' },
  {
    backgroundImage:
      'linear-gradient(rgb(255 255 255 / 0.08) 1px, transparent 1px), linear-gradient(90deg, rgb(255 255 255 / 0.08) 1px, transparent 1px)',
    backgroundSize: '28px 28px',
  },
  { backgroundImage: 'repeating-linear-gradient(135deg, rgb(255 255 255 / 0.07) 0 2px, transparent 2px 14px)' },
]

/** Posición del icono grande y difuminado del fondo, para que no todas las portadas se parezcan. */
const BACKDROPS = [
  '-right-6 -bottom-8 rotate-12',
  '-left-8 -top-6 -rotate-12',
  '-right-10 -top-10 rotate-6',
  'left-1/2 -bottom-16 -translate-x-1/2',
]

/**
 * Portada para las noticias sin imagen (o cuya imagen no carga). Cada noticia tiene la suya: el icono y la
 * etiqueta salen del tema del titular (IA, seguridad, cloud...) y el color y la composición varían de una a
 * otra. Es decorativa; el titular ya aparece al lado.
 */
export default function NewsCover({ category, title, seed, size = 'md' }) {
  const { t } = useI18n()
  const hash = hashOf(seed ?? title)
  const { topic, icon, backdrop } = coverTopic(title, category, hash)
  const large = size === 'lg'
  const label = topic ? t(`news.topics.${topic}`) : newsCategories.labelOf(category ?? 'GENERAL')

  return (
    <div
      className={cx(
        'relative flex h-full w-full items-center justify-center overflow-hidden bg-gradient-to-br text-white',
        PALETTES[hash % PALETTES.length],
      )}
      aria-hidden="true"
    >
      <div className="absolute inset-0" style={PATTERNS[(hash >> 3) % PATTERNS.length]} />
      <Icon
        name={backdrop}
        className={cx('absolute text-white/10', large ? 'h-72 w-72' : 'h-44 w-44', BACKDROPS[(hash >> 5) % BACKDROPS.length])}
      />
      <div className="absolute -right-12 -top-12 h-44 w-44 rounded-full bg-white/10 blur-3xl" />
      <span
        className={cx(
          'relative flex items-center justify-center rounded-2xl bg-white/15 shadow-xl ring-1 ring-white/30 backdrop-blur-sm',
          large ? 'h-24 w-24' : 'h-16 w-16',
        )}
      >
        <Icon name={icon} className={large ? 'h-12 w-12' : 'h-8 w-8'} />
      </span>
      <span className="absolute bottom-3 left-4 rounded-full bg-black/20 px-2.5 py-1 text-[0.6875rem] font-bold uppercase tracking-widest text-white backdrop-blur-sm">
        {label}
      </span>
    </div>
  )
}
