import { expect, expectAccessible, test } from './fixtures.js'
import { news, page as pageOf } from './data.js'

const CATEGORIES = ['DESARROLLO', 'ENTREVISTAS', 'NETWORKING', 'RECURSOS', 'GENERAL']

/** Una página completa de noticias (12), para ver la destacada con la rejilla llena. */
const fullPage = Array.from({ length: 12 }, (_, index) => ({
  ...news[0],
  id: 100 + index,
  slug: `noticia-${index + 1}`,
  title: index === 0 ? 'La noticia más reciente de la semana' : `Noticia número ${index + 1}`,
  category: CATEGORIES[index % CATEGORIES.length],
}))

test.describe('Lista de noticias', () => {
  test('la primera página destaca la noticia más reciente y sigue siendo accesible', async ({ page, api }) => {
    api.on('GET', '/api/news', () => ({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(pageOf(fullPage)),
    }))
    await page.goto('/noticias')
    const featured = page.getByRole('article').filter({ hasText: 'La noticia más reciente de la semana' })
    await expect(featured.getByText('Destacada')).toBeVisible()
    await expect(page.getByText('Destacada')).toHaveCount(1)
    await expectAccessible(page)
  })

  test('el buscador es discreto: busca al escribir, sin botón', async ({ page, api }) => {
    await page.goto('/noticias')
    const search = page.getByRole('search')
    await expect(search.getByRole('button')).toHaveCount(0)
    await search.getByRole('searchbox', { name: 'Buscar noticias' }).fill('entrevista')
    await expect(page).toHaveURL(/q=entrevista/)
    await expect
      .poll(() => api.calls.some((call) => call.path === '/api/news' && call.query.get('q') === 'entrevista'))
      .toBe(true)
  })
})

test.describe('Idioma de las noticias', () => {
  test('las noticias en inglés se marcan y su texto lleva el idioma', async ({ page }) => {
    await page.goto('/noticias')
    const card = page.getByRole('article').filter({ hasText: 'What is new in React 19' })
    await expect(card.getByText('EN', { exact: true })).toBeVisible()
    await expect(card.getByRole('heading', { name: 'What is new in React 19' })).toHaveAttribute('lang', 'en')
    // Las de castellano no llevan etiqueta.
    const spanish = page.getByRole('article').filter({ hasText: 'Novedades de React 19' })
    await expect(spanish.getByText('EN', { exact: true })).toHaveCount(0)
  })

  test('el filtro «Español» deja solo las noticias en castellano', async ({ page, api }) => {
    await page.goto('/noticias')
    await page
      .getByRole('navigation', { name: 'Filtrar noticias por idioma' })
      .getByRole('link', { name: 'Español', exact: true })
      .click()

    await expect(page).toHaveURL(/\/noticias\?idioma=es$/)
    await expect(page.getByRole('article').filter({ hasText: 'What is new in React 19' })).toHaveCount(0)
    await expect(page.getByRole('article').filter({ hasText: 'Novedades de React 19' })).toBeVisible()
    await expect(
      page
        .getByRole('navigation', { name: 'Filtrar noticias por idioma' })
        .getByRole('link', { name: 'Español', exact: true }),
    ).toHaveAttribute('aria-current', 'true')
    expect(api.calls.some((call) => call.path === '/api/news' && call.query.get('language') === 'es')).toBe(true)
  })

  test('la noticia en inglés marca el idioma de su título y su texto', async ({ page }) => {
    await page.goto('/noticias/3-what-is-new-in-react-19')
    await expect(page.getByRole('heading', { level: 1 })).toHaveAttribute('lang', 'en')
    await expect(page.getByText('A quick tour of the features')).toHaveAttribute('lang', 'en')
    await expect(page.getByRole('main').getByText('EN', { exact: true })).toBeVisible()
  })
})
