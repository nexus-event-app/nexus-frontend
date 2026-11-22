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
