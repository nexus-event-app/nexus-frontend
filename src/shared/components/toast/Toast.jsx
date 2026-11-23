import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { cx } from '@/shared/utils/classNames'
import Icon from '@/shared/components/Icon'
import { useI18n } from '@/shared/i18n/useI18n'

const TYPES = {
  success: {
    classes:
      'border-green-300 bg-green-50 text-green-900 dark:border-green-400/40 dark:bg-green-950 dark:text-green-100',
    arrow: 'border-green-300 bg-green-50 dark:border-green-400/40 dark:bg-green-950',
    icon: 'check-circle',
    duration: 7000,
    role: 'status',
  },
  error: {
    classes: 'border-red-300 bg-red-50 text-red-900 dark:border-red-400/40 dark:bg-red-950 dark:text-red-100',
    arrow: 'border-red-300 bg-red-50 dark:border-red-400/40 dark:bg-red-950',
    icon: 'x-circle',
    duration: 10000,
    role: 'alert',
  },
  info: {
    classes: 'border-accent-line bg-accent-soft text-accent-strong',
    arrow: 'border-accent-line bg-accent-soft',
    icon: 'info',
    duration: 7000,
    role: 'status',
  },
}

const GAP = 10
const MARGIN = 16

function placement(anchor, bubble) {
  const rect = anchor.getBoundingClientRect()
  const width = bubble?.offsetWidth ?? 320
  const height = bubble?.offsetHeight ?? 64
  const viewportWidth = document.documentElement.clientWidth
  const viewportHeight = window.innerHeight
  const left = Math.min(Math.max(rect.left, MARGIN), Math.max(MARGIN, viewportWidth - width - MARGIN))
  const below = rect.bottom + GAP + height <= viewportHeight - MARGIN || rect.top - GAP - height < MARGIN
  const top = below ? rect.bottom + GAP : rect.top - GAP - height
  const arrow = Math.min(Math.max(rect.left + Math.min(rect.width, 48) / 2 - left, 18), width - 18)
  return { top, left, arrow, below }
}

function Bubble({ id, type, message, onDismiss, className, style, bubbleRef, children }) {
  const { t } = useI18n()
  const config = TYPES[type]

  useEffect(() => {
    const timer = setTimeout(() => onDismiss(id), config.duration)
    return () => clearTimeout(timer)
  }, [id, config.duration, onDismiss])

  return (
    <p
      ref={bubbleRef}
      role={config.role}
      style={style}
      className={cx(
        'pointer-events-auto flex animate-toast-in items-start gap-3 rounded-control border-2 p-4 text-base shadow-pop',
        config.classes,
        className,
      )}
    >
      {children}
      <Icon name={config.icon} className="mt-0.5 h-6 w-6 shrink-0" />
      <span className="min-w-0 flex-1 font-semibold leading-snug">{message}</span>
      <button
        type="button"
        onClick={() => onDismiss(id)}
        aria-label={t('common.toast.dismiss')}
        className="-m-2 flex h-11 w-11 shrink-0 items-center justify-center rounded-control hover:bg-ink/10"
      >
        <Icon name="close" className="h-5 w-5" />
      </button>
    </p>
  )
}

export function AnchoredToast({ anchor, onDetach, ...toast }) {
  const bubbleRef = useRef(null)
  const [position, setPosition] = useState(null)

  useLayoutEffect(() => {
    let frame
    const update = () => {
      if (!anchor.isConnected) {
        onDetach(toast.id)
        return
      }
      setPosition((current) => {
        const next = placement(anchor, bubbleRef.current)
        if (current && current.top === next.top && current.left === next.left && current.arrow === next.arrow) {
          return current
        }
        return next
      })
      frame = requestAnimationFrame(update)
    }
    update()
    return () => cancelAnimationFrame(frame)
  }, [anchor, onDetach, toast.id])

  const config = TYPES[toast.type]
  return createPortal(
    <Bubble
      {...toast}
      bubbleRef={bubbleRef}
      className="fixed z-[100] w-[min(24rem,calc(100vw-2rem))]"
      style={position ? { top: position.top, left: position.left } : { visibility: 'hidden', top: 0, left: 0 }}
    >
      <span
        aria-hidden="true"
        style={{ left: position?.arrow ?? 18 }}
        className={cx(
          'absolute h-3 w-3 -translate-x-1/2 rotate-45',
          position?.below === false ? '-bottom-[7px] border-b-2 border-r-2' : '-top-[7px] border-l-2 border-t-2',
          config.arrow,
        )}
      />
    </Bubble>,
    anchor.closest('dialog') ?? document.body,
  )
}

export default function Toast(toast) {
  return (
    <li>
      <Bubble {...toast} />
    </li>
  )
}
