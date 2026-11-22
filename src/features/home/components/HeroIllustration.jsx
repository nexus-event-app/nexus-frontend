import Icon from '@/shared/components/Icon'
import { useI18n } from '@/shared/i18n/useI18n'

export default function HeroIllustration({ className }) {
  const { t } = useI18n()

  return (
    <figure aria-hidden="true" className={className}>
      <span className="absolute inset-8 rounded-full bg-brand-400/25 blur-3xl" />

      <img
        src="/images/comunidad-portada.webp"
        alt=""
        width="840"
        height="616"
        loading="lazy"
        decoding="async"
        className="absolute inset-x-0 bottom-0 mx-auto w-full max-w-[27rem] [mask-image:linear-gradient(to_bottom,black_82%,transparent)]"
      />

      <span className="absolute left-0 top-0 block w-40 xl:w-48 animate-float rounded-xl bg-white p-2.5 text-left text-gray-900 shadow-xl shadow-brand-950/40 [animation-delay:-1s]">
        <span className="flex items-center gap-1.5">
          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-violet-100 text-[0.55rem] font-bold text-violet-700">
            ME
          </span>
          <span className="whitespace-nowrap text-[0.65rem] font-semibold text-gray-600">Marta · foro</span>
          <span className="ml-auto inline-flex shrink-0 items-center gap-0.5 rounded-full bg-green-50 px-1.5 py-0.5 text-[0.6rem] font-semibold text-green-800 ring-1 ring-inset ring-green-200">
            <Icon name="check-circle" className="h-2.5 w-2.5" />
            {t('home.hero.mockResolved')}
          </span>
        </span>
        <span className="mt-1.5 block text-xs font-bold leading-snug">{t('home.hero.mockQuestion')}</span>
        <span className="mt-1 flex items-center gap-2.5 text-[0.65rem] text-gray-500">
          <span className="inline-flex items-center gap-1">
            <Icon name="chat" className="h-3 w-3" />
            12
          </span>
          <span className="inline-flex items-center gap-1">
            <Icon name="heart" className="h-3 w-3" />
            27
          </span>
        </span>
      </span>

      <span className="absolute right-0 top-1 flex w-36 xl:w-44 animate-float items-center gap-2 rounded-xl bg-white/95 p-2 text-left text-[0.7rem] text-gray-900 shadow-xl shadow-brand-950/30 [animation-delay:-3s]">
        <span className="relative flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-600 text-white">
          <Icon name="bell" className="h-3.5 w-3.5" />
          <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-red-600 ring-2 ring-white" />
        </span>
        <span className="font-medium leading-snug">{t('home.hero.mockNotification')}</span>
      </span>

      <span className="absolute right-0 top-[4.75rem] block w-36 xl:top-[4.25rem] xl:w-44 animate-float rounded-xl bg-white p-2 text-left text-gray-900 shadow-xl shadow-brand-950/40 [animation-delay:-5s]">
        <span className="absolute inset-x-0 top-0 h-1 rounded-t-xl bg-gradient-to-r from-emerald-400 to-cyan-500" />
        <span className="flex items-center gap-2">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-sky-500 to-indigo-600 text-[0.6rem] font-bold text-white">
            AC
          </span>
          <span className="min-w-0">
            <span className="block text-xs font-bold leading-tight">{t('home.hero.mockJob')}</span>
            <span className="flex items-center gap-1 text-[0.6rem] text-gray-500">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-pink-500" />
              {t('home.hero.mockJobMeta')}
            </span>
          </span>
          <Icon name="bookmark" className="ml-auto h-4 w-4 shrink-0 text-brand-600" filled />
        </span>
      </span>
    </figure>
  )
}
