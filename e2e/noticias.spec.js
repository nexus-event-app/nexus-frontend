import { expect, test } from './fixtures.js'

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

  test('el filtro «En español» deja solo las noticias en castellano', async ({ page, api }) => {
    await page.goto('/noticias')
    await page
      .getByRole('navigation', { name: 'Filtrar noticias por idioma' })
      .getByRole('link', { name: 'En español' })
      .click()

    await expect(page).toHaveURL(/\/noticias\?idioma=es$/)
    await expect(page.getByRole('article').filter({ hasText: 'What is new in React 19' })).toHaveCount(0)
    await expect(page.getByRole('article').filter({ hasText: 'Novedades de React 19' })).toBeVisible()
    await expect(
      page.getByRole('navigation', { name: 'Filtrar noticias por idioma' }).getByRole('link', { name: 'En español' }),
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
