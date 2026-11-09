import { useEffect, useId, useRef } from 'react'
import { createPortal } from 'react-dom'
import { useI18n } from '@/shared/i18n/useI18n'
import { cx } from '@/shared/utils/classNames'
import Icon from './Icon'

const SIZES = {
  sm: 'max-w-md',
  md: 'max-w-2xl',
  lg: 'max-w-4xl',
}

let openModals = 0

function lockScroll() {
  openModals += 1
  document.body.style.overflow = 'hidden'
}

function unlockScroll() {
  openModals = Math.max(0, openModals - 1)
  if (openModals === 0) document.body.style.overflow = ''
}

export default function Modal({ title, description, onClose, size = 'md', dismissible = true, children }) {
  const { t } = useI18n()
  const dialogRef = useRef(null)
  const titleId = useId()
  const descriptionId = useId()

  useEffect(() => {
    const dialog = dialogRef.current
    const previouslyFocused = document.activeElement
    dialog.showModal()
    lockScroll()

    return () => {
      unlockScroll()
      if (dialog.open) dialog.close()
      if (previouslyFocused instanceof HTMLElement && previouslyFocused.isConnected) {
        previouslyFocused.focus()
      }
    }
  }, [])

  const requestClose = () => {
    if (dismissible) onClose()
  }

  return createPortal(
    <dialog
      ref={dialogRef}
      aria-modal="true"
      aria-labelledby={titleId}
      aria-describedby={description ? descriptionId : undefined}
      onCancel={(event) => {
        event.preventDefault()
        requestClose()
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) requestClose()
      }}
      className={cx(
        'm-auto max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] overflow-y-auto rounded-card bg-surface p-0 text-ink shadow-pop backdrop:bg-gray-950/70 backdrop:backdrop-blur-sm',
        SIZES[size],
      )}
    >
      <div className="flex items-start justify-between gap-4 border-b border-slate-200 px-5 py-4 sm:px-6">
        <div>
          <h2 id={titleId} className="text-xl font-bold">
            {title}
          </h2>
          {description && (
            <p id={descriptionId} className="mt-1 text-sm text-ink-muted">
              {description}
            </p>
          )}
        </div>
        <button
          type="button"
          onClick={requestClose}
          disabled={!dismissible}
          aria-label={t('common.dialog.close')}
          className="-mr-2 flex h-11 w-11 shrink-0 items-center justify-center rounded-control text-ink-muted hover:bg-slate-100 disabled:opacity-50"
        >
          <Icon name="close" className="h-6 w-6" />
        </button>
      </div>
      <div className="px-5 py-5 sm:px-6">{children}</div>
    </dialog>,
    document.body,
  )
}
