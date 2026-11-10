import { expect, test } from './fixtures.js'

test.describe('Navegación', () => {
  test('la portada muestra lo último de cada sección', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveTitle(/Primer Commit/)
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
    await expect(page.getByRole('link', { name: /Novedades de React 19/ }).first()).toBeVisible()
    await expect(page.getByRole('link', { name: /Desarrollador\/a frontend junior/ }).first()).toBeVisible()
    await expect(page.getByRole('link', { name: /¿Por dónde empiezo con Java\?/ }).first()).toBeVisible()
  })

  test('se llega a una noticia desde el listado y las migas vuelven atrás', async ({ page }) => {
    await page.goto('/noticias')
    await page
      .getByRole('link', { name: /Cómo preparar tu primera entrevista/ })
      .first()
      .click()

    await expect(page).toHaveURL(/\/noticias\/2-como-preparar-tu-primera-entrevista$/)
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(/Cómo preparar tu primera entrevista/)
    await page
      .getByRole('navigation', { name: /migas|ruta/i })
      .getByRole('link', { name: 'Noticias' })
      .click()
    await expect(page).toHaveURL(/\/noticias$/)
  })

  test('el pie lleva a «Sobre el proyecto»', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('contentinfo').getByRole('link', { name: 'Sobre el proyecto' }).click()
    await expect(page).toHaveURL(/\/sobre-el-proyecto$/)
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(/primer paso en tecnología/)
  })

  test('al cambiar de página el foco va al contenido principal', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('contentinfo').getByRole('link', { name: 'Testimonios' }).click()
    await expect(page).toHaveURL(/\/testimonios$/)
    await expect(page.getByRole('main')).toBeFocused()
  })

  test('una dirección que no existe muestra la página 404', async ({ page }) => {
    await page.goto('/esto-no-existe')
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
    await expect(page.getByRole('main')).toContainText(/404|no existe|no encontrada|no hemos encontrado/i)
  })
})
