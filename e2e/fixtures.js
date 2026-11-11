import AxeBuilder from '@axe-core/playwright'
import { test as base, expect } from '@playwright/test'
import { comments, discussions, jobs, news, notifications, page, searchResult, testimonials, user } from './data.js'

const json = (body, status = 200) => ({ status, contentType: 'application/json', body: JSON.stringify(body) })

/**
 * API simulada. Cada prueba puede sustituir una respuesta con api.on(método, ruta, respuesta) y consultar las
 * peticiones recibidas en api.calls. Lo que no está previsto responde 404, para que ninguna prueba dependa de nada externo.
 */
class MockApi {
  constructor() {
    this.calls = []
    this.handlers = new Map()
    this.on('GET', '/api/news/latest', () => json(news))
    this.on('GET', '/api/news', () => json(page(news)))
    this.on('GET', /^\/api\/news\/(\d+)$/, ([, id]) => json(news.find((item) => item.id === Number(id))))
    this.on('GET', '/api/jobs/latest', () => json(jobs))
    this.on('GET', '/api/jobs', () => json(page(jobs)))
    this.on('GET', /^\/api\/jobs\/(\d+)$/, ([, id]) => json(jobs.find((item) => item.id === Number(id))))
    this.on('GET', '/api/discussions', () => json(page(discussions)))
    this.on('GET', /^\/api\/discussions\/(\d+)$/, ([, id]) => json(discussions.find((item) => item.id === Number(id))))
    this.on('GET', /^\/api\/comments\/discussion\/\d+$/, () => json(comments))
    this.on('GET', '/api/notifications', () => json(page(notifications)))
    this.on('GET', '/api/notifications/unread-count', () =>
      json({ count: notifications.filter((item) => !item.read).length }),
    )
    this.on('PUT', /^\/api\/notifications\/(\d+\/read|read-all)$/, () => ({ status: 204 }))
    this.on('GET', '/api/testimonials/latest', () => json(testimonials))
    this.on('GET', '/api/testimonials', () => json(testimonials))
    this.on('GET', '/api/search', () => json(searchResult()))
    this.on('GET', '/api/saved-jobs/ids', () => json([]))
    this.on('GET', '/api/saved-jobs', () => json(page([])))
    this.on('PUT', /^\/api\/saved-jobs\/\d+$/, () => ({ status: 204 }))
    this.on('GET', '/api/auth/me', () => json(user))
    this.on('POST', '/api/auth/login', () => json({ token: 'token-de-prueba', user }))
  }

  on(method, path, respond) {
    this.handlers.set(`${method} ${path}`, { method, path, respond })
  }

  handle(method, pathname) {
    for (const { method: m, path, respond } of [...this.handlers.values()].reverse()) {
      if (m !== method) continue
      if (typeof path === 'string' && path === pathname) return respond([pathname])
      if (path instanceof RegExp) {
        const match = path.exec(pathname)
        if (match) return respond(match)
      }
    }
    return json({ error: 'NOT_FOUND', message: 'No simulado en las pruebas' }, 404)
  }
}

export const test = base.extend({
  // Automática: todas las pruebas usan la API simulada aunque no la pidan.
  api: [
    async ({ page: browserPage }, use) => {
      const api = new MockApi()
      await browserPage.route('**/api/**', async (route) => {
        const request = route.request()
        const url = new URL(request.url())
        api.calls.push({
          method: request.method(),
          path: url.pathname,
          query: url.searchParams,
          body: request.postData(),
        })
        await route.fulfill(await api.handle(request.method(), url.pathname))
      })
      // Las imágenes externas no deben hacer lentas ni frágiles las pruebas.
      await browserPage.route(/^https?:\/\/(?!localhost)/, (route) => route.abort())
      await use(api)
    },
    { auto: true },
  ],

  /** Inicia sesión guardando la sesión como lo hace la web, sin pasar por el formulario. */
  signedIn: async ({ page: browserPage }, use) => {
    await browserPage.addInitScript(
      (session) => {
        window.localStorage.setItem('primercommit.session', JSON.stringify(session))
      },
      { token: 'token-de-prueba', user },
    )
    await use(user)
  },
})

/** Comprueba la accesibilidad (WCAG 2.2 AA y buenas prácticas) de la página actual. */
export async function expectAccessible(browserPage) {
  const { violations } = await new AxeBuilder({ page: browserPage })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'])
    .analyze()
  const summary = violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(' ')).join(', ')}`)
  expect(summary).toEqual([])
}

export { expect }
