export const MAIN_ID = 'contenido'

let pending = false

export function focusMainContent() {
  const main = document.getElementById(MAIN_ID)
  if (main && !main.hasAttribute('aria-busy')) {
    main.focus({ preventScroll: true })
    pending = false
  } else {
    pending = true
  }
}

export function takePendingFocus() {
  const wasPending = pending
  pending = false
  return wasPending
}
