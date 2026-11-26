import { guidesService } from '@/features/guides/services/guidesService'
import Icon from '@/shared/components/Icon'
import { paths } from '@/shared/config/paths'
import { useRequest } from '@/shared/hooks/useRequest'
import { Link } from '@/shared/i18n/router'
import { useI18n } from '@/shared/i18n/useI18n'
import { cx } from '@/shared/utils/classNames'

export default function LatestGuideBanner({ className }) {
  const { t, lang } = useI18n()
  const request = useRequest(`guides:list:${lang}`, ({ signal }) => guidesService.list({ signal }))
  const guide = request.data?.[0]
  if (!guide) return null
  const title = guide.title.split(':')[0]

  return (
    <Link
      to={paths.guideDetail(guide)}
      aria-label={`${t('home.hero.latestGuide')}: ${title}`}
      className={cx(
        'group relative isolate flex w-[8.5rem] flex-col items-center gap-3 rounded-full bg-gradient-to-b from-[#6d5ef5] via-[#5b45e0] to-[#7c3aed] px-3 pb-3 pt-6 text-center text-[#ffffff] shadow-2xl shadow-brand-950/30 ring-4 ring-white/70 transition-transform hover:-translate-y-1 dark:ring-white/10',
        "before:absolute before:-inset-2 before:-z-10 before:animate-soft-pulse before:rounded-full before:bg-brand-400/30 before:blur-xl before:content-['']",
        className,
      )}
    >
      <span className="inline-flex items-center gap-1 rounded-full bg-[#ffffff]/20 px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-wider">
        <Icon name="sparkles" className="h-3 w-3" />
        {t('home.hero.latestGuide')}
      </span>
      <span className="text-balance px-1 text-sm font-bold leading-snug">{title}</span>
      <span className="relative mt-1 flex h-32 w-14 justify-center rounded-full bg-[#ffffff]/15 ring-1 ring-inset ring-white/25">
        <span className="absolute top-1.5 flex h-11 w-11 animate-toggle-down items-center justify-center rounded-full bg-[#ffffff] text-[#5b45e0] shadow-lg group-hover:[animation-play-state:paused] group-hover:translate-y-[4.4rem]">
          <Icon name="chevron-down" className="h-5 w-5" />
        </span>
        <span className="absolute bottom-2 flex flex-col items-center -space-y-2 text-[#ffffff]/80">
          <Icon name="chevron-down" className="h-4 w-4 animate-chevron [animation-delay:0ms]" />
          <Icon name="chevron-down" className="h-4 w-4 animate-chevron [animation-delay:200ms]" />
        </span>
      </span>
    </Link>
  )
}
