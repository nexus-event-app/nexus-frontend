import AxeBuilder from '@axe-core/playwright'
import { test as base, expect } from '@playwright/test'
import {
  comments,
  discussions,
  events,
  englishNews,
  jobs,
  news,
  notifications,
  page,
  profile,
  searchResult,
  testimonials,
  user,
} from './data.js'

const json = (body, status = 200) => ({ status, contentType: 'application/json', body: JSON.stringify(body) })

class MockApi {
  constructor() {
    this.calls = []
    this.handlers = new Map()
    this.on('GET', '/api/news/latest', () => json(news))
    this.on('GET', '/api/news/categories', () => json(['PROGRAMACION', 'CARRERA']))
    this.on('GET', '/api/news', (_, query) => {
      const all = [...news, englishNews]
      const language = query?.get('language')
      return json(page(language ? all.filter((item) => (item.language ?? 'es') === language) : all))
    })
    this.on('GET', /^\/api\/news\/(\d+)$/, ([, id]) =>
      json([...news, englishNews].find((item) => item.id === Number(id))),
    )
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
    this.on('GET', '/api/events', (_, query) => {
      const forWomen = query?.get('forWomen')
      const mode = query?.get('mode')
      const city = query?.get('city')
      const day = query?.get('day')
      const size = Number(query?.get('size') ?? 20)
      const pageIndex = Number(query?.get('page') ?? 0)
      const all = events.filter(
        (item) =>
          (forWomen == null || String(item.forWomen) === forWomen) &&
          (mode == null || item.mode === mode) &&
          (city == null || item.city?.toLowerCase() === city.toLowerCase()) &&
          (day == null || item.date === day),
      )
      return json({
        content: all.slice(pageIndex * size, pageIndex * size + size),
        page: pageIndex,
        size,
        totalElements: all.length,
        totalPages: Math.max(1, Math.ceil(all.length / size)),
        last: (pageIndex + 1) * size >= all.length,
      })
    })
    this.on('GET', '/api/events/calendar', () =>
      json(
        Object.values(
          events.reduce((days, item) => {
            const current = days[item.date] ?? { date: item.date, count: 0, forWomen: false }
            days[item.date] = { ...current, count: current.count + 1, forWomen: current.forWomen || item.forWomen }
            return days
          }, {}),
        ),
      ),
    )
    this.on('GET', '/api/events/cities', () =>
      json([...new Set(events.map((item) => item.city).filter(Boolean))].sort()),
    )
    this.on('POST', '/api/events', () => json(events[0], 201))
    this.on('PUT', /^\/api\/admin\/events\/\d+$/, () =>
      json({ ...events[0], active: true, past: false, authorName: 'Lucía Prueba' }),
    )
    this.on('GET', '/api/admin/events', () =>
      json(page(events.map((item) => ({ ...item, active: true, past: false, authorName: 'Lucía Prueba' })))),
    )
    this.on('DELETE', /^\/api\/events\/\d+$/, () => ({ status: 204 }))
    this.on('POST', /^\/api\/events\/(\d+)\/interest$/, ([, id]) => {
      const item = events.find((event) => event.id === Number(id))
      const interested = !item.interested
      return json({ count: item.interestedCount + (interested ? 1 : -1), interested })
    })
    this.on('GET', '/api/testimonials', () => json(testimonials))
    this.on('GET', '/api/search', () => json(searchResult()))
    this.on('GET', '/api/saved-jobs/ids', () => json([]))
    this.on('GET', '/api/saved-jobs', () => json(page([])))
    this.on('PUT', /^\/api\/saved-jobs\/\d+$/, () => ({ status: 204 }))
    this.on('GET', '/api/learning/progress', () => json([]))
    this.on('PUT', /^\/api\/learning\/progress\/[a-z0-9-]+\/[a-z0-9-]+$/, () => ({ status: 204 }))
    this.on('DELETE', /^\/api\/learning\/progress\/[a-z0-9-]+\/[a-z0-9-]+$/, () => ({ status: 204 }))
    this.on('POST', '/api/reports', () => ({ status: 204 }))
    this.on('GET', '/api/admin/reports', () => json([]))
    this.on('POST', '/api/admin/reports/resolve', () => ({ status: 204 }))
    this.on('GET', '/api/admin/stats', () =>
      json({ users: 3, news: 2, jobs: 1, discussions: 1, comments: 2, pendingTestimonials: 0, pendingReports: 1 }),
    )
    this.on('GET', /^\/api\/users\/\d+$/, () =>
      json({ ...profile, discussionCount: undefined, testimonialCount: undefined }),
    )
    this.on('GET', '/api/profile/discussions', () => json(page(discussions)))
    this.on('GET', '/api/profile/testimonials', () => json(testimonials))
    this.on('GET', '/api/profile', () => json(profile))
    this.on('PUT', '/api/profile', () => json(profile))
    this.on('DELETE', '/api/profile', () => ({ status: 204 }))
    this.on('GET', '/api/auth/me', () => json(user))
    this.on('GET', '/api/auth/providers', () => json({ google: true }))
    this.on('POST', '/api/auth/login', () => json({ token: 'token-de-prueba', user }))
  }

  on(method, path, respond) {
    this.handlers.set(`${method} ${path}`, { method, path, respond })
  }

  handle(method, pathname, query) {
    for (const { method: m, path, respond } of [...this.handlers.values()].reverse()) {
      if (m !== method) continue
      if (typeof path === 'string' && path === pathname) return respond([pathname], query)
      if (path instanceof RegExp) {
        const match = path.exec(pathname)
        if (match) return respond(match, query)
      }
    }
    return json({ error: 'NOT_FOUND', message: 'No simulado en las pruebas' }, 404)
  }
}

export const test = base.extend({
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
        await route.fulfill(await api.handle(request.method(), url.pathname, url.searchParams))
      })
      await browserPage.route(/^https?:\/\/(?!localhost)/, (route) => route.abort())
      await use(api)
    },
    { auto: true },
  ],

  signedInAdmin: async ({ page: browserPage, api }, use) => {
    const admin = { ...user, id: 1, name: 'Admin Prueba', role: 'ADMIN' }
    api.on('GET', '/api/auth/me', () => json(admin))
    await browserPage.addInitScript(
      (session) => {
        window.localStorage.setItem('primercommit.session', JSON.stringify(session))
      },
      { token: 'token-de-admin', user: admin },
    )
    await use(admin)
  },

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

export async function expectAccessible(browserPage) {
  await browserPage.evaluate(() =>
    Promise.all(
      document
        .getAnimations()
        .filter((animation) => animation.effect?.getComputedTiming().iterations !== Infinity)
        .map((animation) => animation.finished.catch(() => {})),
    ),
  )
  const { violations } = await new AxeBuilder({ page: browserPage })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'])
    .analyze()
  const summary = violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(' ')).join(', ')}`)
  expect(summary).toEqual([])
}

export { expect, json }
