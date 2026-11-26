import { guidesService } from '@/features/guides/services/guidesService'
import Icon from '@/shared/components/Icon'
import { paths } from '@/shared/config/paths'
import { useRequest } from '@/shared/hooks/useRequest'
import { Link } from '@/shared/i18n/router'
import { useI18n } from '@/shared/i18n/useI18n'
import { cx } from '@/shared/utils/classNames'

function PillBanner({ guide, label, className }) {
  return (
    <Link
      to={paths.guideDetail(guide)}
      className={cx(
        'group relative isolate inline-flex min-h-[2.75rem] max-w-full items-center gap-3 overflow-hidden rounded-full bg-surface py-1.5 pl-1.5 pr-5 text-sm font-semibold text-ink shadow-lg shadow-brand-950/10 ring-1 ring-brand-200 transition-all hover:-translate-y-0.5 hover:shadow-xl dark:ring-brand-700',
        "after:pointer-events-none after:absolute after:inset-y-0 after:-left-1/2 after:w-1/3 after:-skew-x-12 after:animate-shine after:bg-gradient-to-r after:from-transparent after:via-white/70 after:to-transparent after:content-[''] dark:after:via-white/15",
        className,
      )}
    >
      <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-accent px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-white">
        <Icon name="sparkles" className="h-3.5 w-3.5" />
        {label}
      </span>
      <span className="truncate">{guide.title.split(':')[0]}</span>
      <Icon
        name="arrow-right"
        className="h-4 w-4 shrink-0 text-accent transition-transform group-hover:translate-x-1"
      />
    </Link>
  )
}

function TerminalBanner({ guide, label, read, className }) {
  return (
    <article
      className={cx(
        'relative w-full max-w-xl overflow-hidden rounded-2xl bg-[#0f0d1f] text-left font-mono text-sm text-[#e2e8f0] shadow-2xl shadow-brand-950/30 ring-1 ring-white/10',
        className,
      )}
    >
      <header className="flex items-center gap-1.5 border-b border-white/10 px-4 py-2.5">
        <span className="h-3 w-3 rounded-full bg-red-400" />
        <span className="h-3 w-3 rounded-full bg-amber-400" />
        <span className="h-3 w-3 rounded-full bg-emerald-400" />
        <span className="ml-3 text-xs text-[#94a3b8]">~/primer-commit/guias</span>
      </header>
      <p className="px-5 pt-4 text-[#94a3b8]">
        <span className="text-[#34d399]">$</span> git log -1
      </p>
      <p className="px-5 pt-1 text-[#fcd34d]">
        commit <span className="text-[#94a3b8]">· {label.toLowerCase()}</span>
      </p>
      <h2 className="px-5 pt-2 font-sans text-lg font-bold leading-snug text-[#ffffff]">{guide.title.split(':')[0]}</h2>
      <p className="flex items-center justify-between gap-4 px-5 pb-4 pt-3">
        <span className="text-[#94a3b8]">
          <span className="text-[#34d399]">$</span> <span className="animate-caret">▍</span>
        </span>
        <Link
          to={paths.guideDetail(guide)}
          className="inline-flex min-h-[2.75rem] items-center gap-2 rounded-full bg-[#4f46e5] px-5 font-sans font-semibold text-[#ffffff] transition-colors hover:bg-[#4338ca] after:absolute after:inset-0"
        >
          {read}
          <Icon name="arrow-right" className="h-4 w-4" />
        </Link>
      </p>
    </article>
  )
}

export default function LatestGuideBanner({ variant = 'pill', className }) {
  const { t, lang } = useI18n()
  const request = useRequest(`guides:list:${lang}`, ({ signal }) => guidesService.list({ signal }))
  const guide = request.data?.[0]
  if (!guide) return null
  return variant === 'terminal' ? (
    <TerminalBanner
      guide={guide}
      label={t('home.hero.latestGuide')}
      read={t('home.hero.latestGuideRead')}
      className={className}
    />
  ) : (
    <PillBanner guide={guide} label={t('home.hero.latestGuide')} className={className} />
  )
}
