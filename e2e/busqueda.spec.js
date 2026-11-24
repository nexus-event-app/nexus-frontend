import { expect, test } from './fixtures.js'

test.describe('Búsqueda global', () => {
  test('Ctrl+K abre el campo en la cabecera y las flechas eligen un resultado', async ({
    page,
    api,
    isMobile,
    signedIn,
  }) => {
    expect(signedIn.id).toBeDefined()
    test.skip(isMobile, 'Los atajos de teclado son para escritorio')
    await page.goto('/')
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
    await page.keyboard.press('Control+k')
    const banner = page.getByRole('banner')
    const input = banner.getByRole('combobox')
    await expect(input).toBeFocused()
    await expect(page.getByRole('dialog')).toHaveCount(0)

    await input.fill('novedades')
    await expect(banner.getByRole('option', { name: /Novedades de React 19/ })).toBeVisible()
    await expect
      .poll(() => api.calls.some((call) => call.path === '/api/search' && call.query.get('q') === 'novedades'))
      .toBe(true)

    await page.keyboard.press('ArrowDown')
    await page.keyboard.press('Enter')
    await expect(page).toHaveURL(/\/noticias\/1-novedades-de-react-19$/)
    await expect(banner.getByRole('combobox')).toHaveCount(0)
  })

  test('Intro sin elegir abre la página de resultados', async ({ page, isMobile }) => {
    test.skip(isMobile, 'Los atajos de teclado son para escritorio')
    await page.goto('/foro')
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
    await page.keyboard.press('/')
    await page.getByRole('banner').getByRole('combobox').fill('java')
    await expect(page.getByRole('option').first()).toBeVisible()
    await page.keyboard.press('Enter')

    await expect(page).toHaveURL(/\/buscar\?q=java$/)
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  })

  test('la lupa abre el campo dentro de la cabecera; Escape lo cierra y devuelve el foco', async ({ page }) => {
    await page.goto('/')
    const banner = page.getByRole('banner')
    const button = banner.getByRole('button', { name: 'Buscar en toda la web' })
    await button.click()
    const input = banner.getByRole('combobox')
    await expect(input).toBeFocused()
    await input.fill('novedades')
    const option = banner.getByRole('option', { name: /Novedades de React 19/ })
    await expect(option).toBeVisible()
    const viewport = page.viewportSize()
    const box = await option.boundingBox()
    expect(box.x).toBeGreaterThanOrEqual(0)
    expect(box.x + box.width).toBeLessThanOrEqual(viewport.width)
    await page.keyboard.press('Escape')
    await expect(banner.getByRole('combobox')).toHaveCount(0)
    await expect(button).toBeFocused()
  })
})
