import { guidesService } from '@/features/guides/services/guidesService'
import Icon from '@/shared/components/Icon'
import { paths } from '@/shared/config/paths'
import { useRequest } from '@/shared/hooks/useRequest'
import { Link } from '@/shared/i18n/router'
import { useI18n } from '@/shared/i18n/useI18n'
import { cx } from '@/shared/utils/classNames'

export default function LatestGuideBanner({ className, size = 'normal' }) {
  const { t, lang } = useI18n()
  const request = useRequest(`guides:list:${lang}`, ({ signal }) => guidesService.list({ signal }))
  const guide = request.data?.[0]
  if (!guide) return null
  const title = guide.title.split(':')[0]

  if (size === 'mini') {
    return (
      <Link to={paths.guideDetail(guide)} className={cx('group z-10 block [perspective:600px]', className)}>
        <span className="relative block animate-float [animation-delay:-2s]">
          <span
            style={{ '--tilt': '-10deg', animationDelay: '900ms' }}
            className="absolute -left-9 -top-3 z-20 inline-flex animate-stick items-center gap-1 whitespace-nowrap rounded-md bg-gradient-to-r from-emerald-400 to-cyan-500 px-2 py-1 text-[0.6rem] font-extrabold uppercase tracking-wide text-[#04302b] shadow-[0_6px_12px_-4px_rgba(6,95,70,0.6)]"
          >
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
            {t('home.hero.latestGuide')}
          </span>
          <span className="sr-only">: {title}</span>
          <span className="relative flex w-14 justify-center rounded-full bg-gradient-to-b from-white to-[#f1efff] px-1.5 pb-1.5 pt-4 shadow-[0_18px_30px_-10px_rgba(46,36,119,0.55),inset_0_2px_0_rgba(255,255,255,1),inset_0_-4px_8px_rgba(91,69,224,0.12)] ring-1 ring-[#e3defc] [transform-style:preserve-3d] [transform:rotateY(18deg)_rotateX(8deg)]">
            <span className="relative flex h-16 w-9 justify-center rounded-full bg-[#ece8ff] shadow-[inset_0_3px_6px_rgba(46,36,119,0.25)] [transform:translateZ(8px)]">
              <span className="absolute bottom-0.5 text-[#7c6cf0]">
                <Icon name="chevron-down" className="h-3 w-3 animate-chevron" />
              </span>
              <span
                style={{ '--toggle': '1.75rem' }}
                className="absolute top-1 flex h-7 w-7 animate-toggle-down items-center justify-center rounded-full bg-[radial-gradient(circle_at_32%_28%,#c4b5fd_0%,#7c5cf6_38%,#4c1dd6_78%,#2e1a8a_100%)] text-[#ffffff] shadow-[0_6px_10px_-3px_rgba(76,29,214,0.7)] [transform:translateZ(24px)]"
              >
                <Icon name="chevron-down" className="h-3.5 w-3.5" />
              </span>
            </span>
          </span>
        </span>
      </Link>
    )
  }

  return (
    <Link to={paths.guideDetail(guide)} className={cx('group z-10 block [perspective:900px]', className)}>
      <span className="relative block animate-float [animation-delay:-2s]">
        <span
          style={{ '--tilt': '-8deg', animationDelay: '900ms' }}
          className="absolute -left-10 -top-4 z-20 inline-flex animate-stick items-center gap-1.5 whitespace-nowrap rounded-lg bg-gradient-to-r from-emerald-400 to-cyan-500 py-1.5 pl-3 pr-4 text-sm font-extrabold uppercase tracking-wide text-[#04302b] shadow-[0_10px_20px_-6px_rgba(6,95,70,0.6)] after:absolute after:-bottom-1.5 after:left-4 after:h-3 after:w-3 after:rotate-45 after:bg-emerald-400 after:content-['']"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-80" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
          </span>
          {t('home.hero.latestGuide')}
        </span>
        <span className="relative flex w-[8.5rem] flex-col items-center gap-3 rounded-full bg-gradient-to-b from-white to-[#f1efff] px-3 pb-3 pt-8 text-center text-[#2e2477] shadow-[0_30px_60px_-15px_rgba(46,36,119,0.55),0_10px_20px_-10px_rgba(46,36,119,0.35),inset_0_2px_0_rgba(255,255,255,1),inset_0_-6px_12px_rgba(91,69,224,0.12)] ring-1 ring-[#e3defc] transition-transform duration-500 [transform-style:preserve-3d] [transform:rotateY(18deg)_rotateX(8deg)] group-hover:[transform:rotateY(0deg)_rotateX(0deg)_translateY(-4px)]">
          <span className="text-balance px-1 text-sm font-bold leading-snug [transform:translateZ(30px)]">{title}</span>
          <span className="relative mt-1 flex h-32 w-14 justify-center rounded-full bg-[#ece8ff] shadow-[inset_0_4px_10px_rgba(46,36,119,0.25),inset_0_-2px_4px_rgba(255,255,255,0.9)] [transform:translateZ(10px)]">
            <span className="absolute bottom-2 flex flex-col items-center -space-y-2 text-[#7c6cf0]">
              <Icon name="chevron-down" className="h-4 w-4 animate-chevron" />
              <Icon name="chevron-down" className="h-4 w-4 animate-chevron [animation-delay:200ms]" />
            </span>
            <span className="absolute top-1.5 flex h-11 w-11 animate-toggle-down items-center justify-center rounded-full bg-[radial-gradient(circle_at_32%_28%,#c4b5fd_0%,#7c5cf6_38%,#4c1dd6_78%,#2e1a8a_100%)] text-[#ffffff] shadow-[0_10px_18px_-4px_rgba(76,29,214,0.7),inset_0_-3px_6px_rgba(0,0,0,0.25)] [transform:translateZ(40px)]">
              <span className="absolute left-2 top-1.5 h-3 w-4 rounded-full bg-white/60 blur-[2px]" />
              <Icon name="chevron-down" className="relative h-5 w-5" />
            </span>
          </span>
        </span>
      </span>
    </Link>
  )
}
