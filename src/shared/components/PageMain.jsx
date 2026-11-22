import { useEffect, useRef } from 'react'
import { MAIN_ID, takePendingFocus } from '@/shared/navigation/pageFocus'
import { cx } from '@/shared/utils/classNames'

export default function PageMain({ className, loading = false, children }) {
  const ref = useRef(null)

  useEffect(() => {
    if (!loading && takePendingFocus()) ref.current?.focus({ preventScroll: true })
  }, [loading])

  return (
    <main
      ref={ref}
      id={MAIN_ID}
      tabIndex={-1}
      aria-busy={loading || undefined}
      className={cx('flex-1 focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0', className)}
    >
      {children}
    </main>
  )
}
