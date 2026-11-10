import { expect, test } from './fixtures.js'

test.describe('Idiomas', () => {
  test('cambiar de idioma traduce la página y su dirección', async ({ page, isMobile }) => {
    await page.goto('/noticias')
    await expect(page.locator('html')).toHaveAttribute('lang', 'es')
    if (isMobile) await page.getByRole('button', { name: 'Abrir menú' }).click()
    await page
      .getByRole('navigation', { name: /idioma/i })
      .getByRole('link', { name: /English|EN/ })
      .first()
      .click()

    await expect(page).toHaveURL(/\/en\/news$/)
    await expect(page.locator('html')).toHaveAttribute('lang', 'en')
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
    await expect(page.getByRole('navigation', { name: /breadcrumb/i })).toContainText('Home')
  })

  test('las direcciones traducidas funcionan al abrirlas directamente', async ({ page }) => {
    await page.goto('/ca/sobre-el-projecte')
    await expect(page.locator('html')).toHaveAttribute('lang', 'ca')
    await expect(page.getByRole('heading', { level: 2, name: 'Per què existeix' })).toBeVisible()
  })

  test('los enlaces internos conservan el idioma', async ({ page }) => {
    await page.goto('/en/about')
    await page.getByRole('link', { name: 'Junior jobs' }).click()
    await expect(page).toHaveURL(/\/en\/jobs$/)
  })
})
