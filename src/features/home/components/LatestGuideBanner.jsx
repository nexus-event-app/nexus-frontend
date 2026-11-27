import { guidesService } from '@/features/guides/services/guidesService'
import Icon from '@/shared/components/Icon'
import { paths } from '@/shared/config/paths'
import { useRequest } from '@/shared/hooks/useRequest'
import { Link } from '@/shared/i18n/router'
import { useI18n } from '@/shared/i18n/useI18n'
import { cx } from '@/shared/utils/classNames'

export default function LatestGuideBanner({ className }) {
  const { lang } = useI18n()
  const request = useRequest(`guides:list:${lang}`, ({ signal }) => guidesService.list({ signal }))
  const guide = request.data?.[0]
  if (!guide) return null
  const title = guide.title.split(':')[0]

  return (
    <Link to={paths.guideDetail(guide)} className={cx('group z-10 block w-fit [perspective:800px]', className)}>
      <span className="block animate-float [animation-delay:-2s]">
        <span className="relative flex w-[6.75rem] flex-col items-center gap-2 rounded-full bg-gradient-to-b from-white to-[#f1efff] px-2.5 pb-2.5 pt-5 text-center text-[#2e2477] shadow-[0_24px_44px_-14px_rgba(46,36,119,0.55),0_8px_16px_-8px_rgba(46,36,119,0.35),inset_0_2px_0_rgba(255,255,255,1),inset_0_-5px_10px_rgba(91,69,224,0.12)] ring-1 ring-[#e3defc] transition-transform duration-500 [transform-style:preserve-3d] [transform:rotateY(18deg)_rotateX(8deg)] group-hover:[transform:rotateY(0deg)_rotateX(0deg)_translateY(-4px)]">
          <span className="text-balance text-xs font-bold leading-snug [transform:translateZ(24px)]">{title}</span>
          <span className="relative flex h-24 w-11 justify-center rounded-full bg-[#ece8ff] shadow-[inset_0_3px_8px_rgba(46,36,119,0.25),inset_0_-2px_4px_rgba(255,255,255,0.9)] [transform:translateZ(8px)]">
            <span className="absolute bottom-1.5 flex flex-col items-center -space-y-2 text-[#7c6cf0]">
              <Icon name="chevron-down" className="h-3.5 w-3.5 animate-chevron" />
              <Icon name="chevron-down" className="h-3.5 w-3.5 animate-chevron [animation-delay:200ms]" />
            </span>
            <span
              style={{ '--toggle': '3.1rem' }}
              className="absolute top-1 flex h-9 w-9 animate-toggle-down items-center justify-center rounded-full bg-[radial-gradient(circle_at_32%_28%,#c4b5fd_0%,#7c5cf6_38%,#4c1dd6_78%,#2e1a8a_100%)] text-[#ffffff] shadow-[0_8px_14px_-4px_rgba(76,29,214,0.7),inset_0_-3px_6px_rgba(0,0,0,0.25)] [transform:translateZ(32px)]"
            >
              <span className="absolute left-1.5 top-1 h-2.5 w-3 rounded-full bg-white/60 blur-[2px]" />
              <Icon name="chevron-down" className="relative h-4 w-4" />
            </span>
          </span>
        </span>
      </span>
    </Link>
  )
}
