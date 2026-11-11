import { expect, test } from './fixtures.js'

test.describe('Búsqueda global', () => {
  test('Ctrl+K abre la búsqueda y las flechas eligen un resultado', async ({ page, api, isMobile }) => {
    test.skip(isMobile, 'Los atajos de teclado son para escritorio')
    await page.goto('/')
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
    await page.keyboard.press('Control+k')
    const dialog = page.getByRole('dialog')
    const input = dialog.getByRole('combobox')
    await expect(input).toBeFocused()

    await input.fill('react')
    await expect(dialog.getByRole('option', { name: /Novedades de React 19/ })).toBeVisible()
    await expect
      .poll(() => api.calls.some((call) => call.path === '/api/search' && call.query.get('q') === 'react'))
      .toBe(true)

    await page.keyboard.press('ArrowDown')
    await page.keyboard.press('Enter')
    await expect(page).toHaveURL(/\/noticias\/1-novedades-de-react-19$/)
    await expect(dialog).toBeHidden()
  })

  test('Intro sin elegir abre la página de resultados', async ({ page, isMobile }) => {
    test.skip(isMobile, 'Los atajos de teclado son para escritorio')
    await page.goto('/foro')
    // El atajo se activa cuando la página ya está pintada: sin esperar, la tecla podía llegar antes.
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
    await page.keyboard.press('/')
    await page.getByRole('combobox').fill('java')
    await expect(page.getByRole('option').first()).toBeVisible()
    await page.keyboard.press('Enter')

    await expect(page).toHaveURL(/\/buscar\?q=java$/)
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  })

  test('Escape cierra la ventana y devuelve el foco', async ({ page }) => {
    await page.goto('/')
    const button = page.getByRole('banner').getByRole('button', { name: /Buscar/ })
    await button.click()
    await expect(page.getByRole('dialog')).toBeVisible()
    await page.keyboard.press('Escape')
    await expect(page.getByRole('dialog')).toBeHidden()
    await expect(button).toBeFocused()
  })
})
