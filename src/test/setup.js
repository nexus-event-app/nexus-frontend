import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach, beforeEach, vi } from 'vitest'

// jsdom no implementa todo lo que usa la web: se completa lo justo para que los componentes funcionen en las pruebas.

if (!HTMLDialogElement.prototype.showModal) {
  HTMLDialogElement.prototype.showModal = function showModal() {
    this.setAttribute('open', '')
    // Igual que el navegador: el foco va al primer elemento con autofocus o, si no hay, al primero enfocable.
    const target = this.querySelector('[autofocus]') ?? this.querySelector('button, input, select, textarea, a[href]')
    target?.focus()
  }
  HTMLDialogElement.prototype.close = function close() {
    this.removeAttribute('open')
  }
}

if (!Element.prototype.scrollIntoView) Element.prototype.scrollIntoView = () => {}

if (!window.matchMedia) {
  window.matchMedia = (query) => ({
    matches: false,
    media: query,
    addEventListener: () => {},
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {},
  })
}

if (!window.ResizeObserver) {
  window.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
}

window.scrollTo = () => {}

// jsdom aún no conoce el elemento <search> (HTML estándar desde 2023) y React avisa de ello: se silencia solo ese aviso.
// Se crea antes de cada prueba porque la configuración restaura los espías al terminar cada una.
const consoleError = console.error
beforeEach(() => {
  vi.spyOn(console, 'error').mockImplementation((message, ...args) => {
    if (typeof message === 'string' && message.includes('is unrecognized') && args.includes('search')) return
    consoleError(message, ...args)
  })
})

afterEach(() => {
  cleanup()
  document.head.querySelectorAll('meta, link[rel="canonical"], link[rel="alternate"]').forEach((node) => node.remove())
  document.body.style.overflow = ''
})
