/**
 * Al cambiar de página, el foco va al contenido principal (<main id="contenido">) para que los lectores de
 * pantalla anuncien la página nueva. Como cada página renderiza su propio <main> (y algunas se cargan en
 * diferido), ScrollManager deja pedido el foco y el <main> de la página lo recoge al aparecer.
 */
export const MAIN_ID = 'contenido'

let pending = false

/** Mueve el foco al contenido principal si ya está en la página; si aún se está cargando, lo deja pedido. */
export function focusMainContent() {
  const main = document.getElementById(MAIN_ID)
  if (main && !main.hasAttribute('aria-busy')) {
    main.focus({ preventScroll: true })
    pending = false
  } else {
    pending = true
  }
}

/** Lo llama el <main> de cada página al montarse: devuelve true si tenía un foco pendiente. */
export function takePendingFocus() {
  const wasPending = pending
  pending = false
  return wasPending
}
