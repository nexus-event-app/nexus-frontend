import Icon from '@/shared/components/Icon'
import { useI18n } from '@/shared/i18n/useI18n'

const CARD =
  'block animate-sway-3d rounded-xl bg-white text-left text-gray-900 shadow-[0_2px_0_rgba(15,23,42,0.08),0_4px_0_rgba(15,23,42,0.07),0_6px_0_rgba(15,23,42,0.06),0_24px_36px_-14px_rgba(46,36,119,0.55),inset_0_2px_0_rgba(255,255,255,1)] ring-1 ring-[#e3defc]'

function Stuck({ className, tilt, depth, delay, children }) {
  return (
    <span
      style={{ '--tilt': `${tilt}deg`, '--depth': `${depth}px`, animationDelay: `${delay}ms` }}
      className={`absolute animate-stick-3d [transform-style:preserve-3d] ${className}`}
    >
      {children}
    </span>
  )
}

export default function HeroIllustration({ className }) {
  const { t } = useI18n()

  return (
    <figure aria-hidden="true" className={`${className} [perspective:1100px]`}>
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

      <Stuck className="left-0 top-2 z-10 w-40 xl:left-4 xl:w-48" tilt={-5} depth={30} delay={500}>
        <span className={`${CARD} p-2.5`} style={{ animationDelay: '-1s' }}>
          <span className="flex items-center gap-1.5">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-violet-100 text-[0.55rem] font-bold text-violet-700">
              MI
            </span>
            <span className="whitespace-nowrap text-[0.65rem] font-semibold text-gray-600">Mio · foro</span>
            <span className="ml-auto inline-flex shrink-0 items-center gap-0.5 rounded-full bg-violet-50 px-1.5 py-0.5 text-[0.6rem] font-semibold text-violet-800 ring-1 ring-inset ring-violet-200">
              <Icon name="sparkles" className="h-2.5 w-2.5" />
              {t('home.hero.mockTopic')}
            </span>
          </span>
          <span className="mt-1.5 block text-xs font-bold leading-snug">{t('home.hero.mockQuestion')}</span>
          <span className="mt-1 flex items-center gap-1 text-[0.65rem] text-gray-500">
            <Icon name="chat" className="h-3 w-3" />1
          </span>
        </span>
      </Stuck>

      <Stuck className="right-0 top-0 z-30 w-36 xl:right-4 xl:w-44" tilt={6} depth={60} delay={800}>
        <span className={`${CARD} p-2`} style={{ animationDelay: '-3s' }}>
          <span className="flex items-center gap-2">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500 to-violet-600 text-white">
              <Icon name="calendar" className="h-3.5 w-3.5" />
            </span>
            <span className="min-w-0">
              <span className="block text-xs font-bold leading-tight">{t('home.hero.mockEvent')}</span>
              <span className="block text-[0.6rem] text-gray-500">{t('home.hero.mockEventMeta')}</span>
            </span>
          </span>
          <span className="mt-1.5 inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-500 px-2 py-0.5 text-[0.6rem] font-bold text-[#04302b]">
            <Icon name="check" className="h-2.5 w-2.5" />
            {t('events.card.going')}
          </span>
        </span>
      </Stuck>

      <Stuck
        className="right-6 top-[5.75rem] z-20 w-36 xl:right-12 xl:top-[6rem] xl:w-44"
        tilt={-3}
        depth={45}
        delay={1100}
      >
        <span className={`${CARD} relative overflow-hidden p-2`} style={{ animationDelay: '-5s' }}>
          <span className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-400 to-cyan-500" />
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
      </Stuck>
    </figure>
  )
}
