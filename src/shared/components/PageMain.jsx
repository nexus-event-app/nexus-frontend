import { useEffect, useRef } from 'react'
import { MAIN_ID, takePendingFocus } from '@/shared/navigation/pageFocus'
import { cx } from '@/shared/utils/classNames'

/**
 * Contenido principal de una página pública. Cada página tiene su propio <main> con su maquetación, de modo
 * que sus hijos directos son ya los elementos con significado (article, aside, section...).
 * `loading`: marcador mientras se carga la página; no recoge el foco.
 */
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
