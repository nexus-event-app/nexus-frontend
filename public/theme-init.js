/*
 * Aplica el tema antes de pintar la página para que no haya un destello claro al cargar en modo oscuro.
 * Va en un fichero aparte (no en línea) porque la política de seguridad de nginx solo permite scripts propios.
 * La clave y los valores deben coincidir con src/shared/theme/theme.js.
 */
;(function () {
  var dark = false
  try {
    var stored = localStorage.getItem('primercommit.theme')
    dark = stored === 'dark' || (stored !== 'light' && window.matchMedia('(prefers-color-scheme: dark)').matches)
  } catch (error) {
    dark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
  }
  document.documentElement.classList.toggle('dark', dark)
})()
