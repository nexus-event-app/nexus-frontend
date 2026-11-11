import Icon from '@/shared/components/Icon'
import { useI18n } from '@/shared/i18n/useI18n'

/**
 * Ilustración de la portada: mini pantallas de la web (una pregunta resuelta, una oferta nueva, el progreso de una
 * ruta y un aviso) que flotan despacio. Es decorativa: todo lo que muestra se explica en texto al lado. Las tarjetas
 * son blancas en los dos temas, por eso usan la paleta fija `gray` y no los grises del tema (`slate`).
 */
export default function HeroIllustration({ className }) {
  const { t } = useI18n()

  return (
    <figure aria-hidden="true" className={className}>
      <span className="absolute inset-8 rounded-full bg-brand-400/25 blur-3xl" />

      {/* Pregunta del foro ya resuelta */}
      <span className="absolute left-0 top-20 block w-64 animate-float rounded-2xl bg-white p-4 text-left text-gray-900 shadow-2xl shadow-brand-950/40 [animation-delay:-1s]">
        <span className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-violet-100 text-xs font-bold text-violet-700">
            ME
          </span>
          <span className="text-xs font-semibold text-gray-600">Marta · foro</span>
          <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-0.5 text-xs font-semibold text-green-800 ring-1 ring-inset ring-green-200">
            <Icon name="check-circle" className="h-3.5 w-3.5" />
            {t('home.hero.mockResolved')}
          </span>
        </span>
        <span className="mt-3 block font-bold leading-snug">{t('home.hero.mockQuestion')}</span>
        <span className="mt-2 flex items-center gap-3 text-xs text-gray-500">
          <span className="inline-flex items-center gap-1">
            <Icon name="chat" className="h-3.5 w-3.5" />
            12
          </span>
          <span className="inline-flex items-center gap-1">
            <Icon name="heart" className="h-3.5 w-3.5" />
            27
          </span>
        </span>
      </span>

      {/* Aviso de respuesta */}
      <span className="absolute right-0 top-0 z-10 flex w-56 animate-float items-center gap-3 rounded-2xl bg-white/95 p-3 text-left text-sm text-gray-900 shadow-xl shadow-brand-950/30 [animation-delay:-3s]">
        <span className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-600 text-white">
          <Icon name="bell" className="h-5 w-5" />
          <span className="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full bg-red-600 ring-2 ring-white" />
        </span>
        <span className="font-medium leading-snug">{t('home.hero.mockNotification')}</span>
      </span>

      {/* Oferta junior nueva */}
      <span className="absolute right-0 top-[52%] block w-60 animate-float rounded-2xl bg-white p-4 text-left text-gray-900 shadow-2xl shadow-brand-950/40 [animation-delay:-5s]">
        <span className="absolute inset-x-0 top-0 h-1 rounded-t-2xl bg-gradient-to-r from-emerald-400 to-cyan-500" />
        <span className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500 to-indigo-600 text-sm font-bold text-white">
            AC
          </span>
          <span>
            <span className="block font-bold">{t('home.hero.mockJob')}</span>
            <span className="flex items-center gap-1.5 text-xs text-gray-500">
              <span className="h-1.5 w-1.5 rounded-full bg-pink-500" />
              {t('home.hero.mockJobMeta')}
            </span>
          </span>
          <Icon name="bookmark" className="ml-auto h-5 w-5 text-brand-600" filled />
        </span>
      </span>

      {/* Progreso en una ruta */}
      <span className="absolute bottom-0 left-0 block w-72 animate-float rounded-2xl bg-white p-4 text-left text-gray-900 shadow-2xl shadow-brand-950/40 [animation-delay:-2s]">
        <span className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-50 text-brand-700">
            <Icon name="code" className="h-5 w-5" />
          </span>
          <span className="whitespace-nowrap font-bold">{t('home.hero.mockRoute')}</span>
          <span className="ml-auto whitespace-nowrap text-xs font-semibold text-gray-500">
            {t('home.hero.mockRouteProgress')}
          </span>
        </span>
        <span className="mt-3 block h-2 overflow-hidden rounded-full bg-gray-200">
          <span className="block h-full w-1/2 rounded-full bg-gradient-to-r from-brand-500 to-violet-500" />
        </span>
      </span>
    </figure>
  )
}
