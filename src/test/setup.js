import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach, beforeEach, vi } from 'vitest'

if (!HTMLDialogElement.prototype.showModal) {
  HTMLDialogElement.prototype.showModal = function showModal() {
    this.setAttribute('open', '')
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
