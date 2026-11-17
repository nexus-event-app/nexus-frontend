import { expect, test } from './fixtures.js'

test.describe('Glosario', () => {
  test('desde Rutas, un término lleva a su explicación en el glosario', async ({ page }) => {
    await page.goto('/rutas')
    const teaser = page.getByRole('navigation', { name: 'Algunos términos del glosario' })
    await teaser.getByRole('link', { name: 'Deploy (despliegue)' }).click()

    await expect(page).toHaveURL(/\/glosario#termino-deploy$/)
    const term = page.getByRole('article', { name: 'Deploy (despliegue)' })
    await expect(term).toBeInViewport()
    await expect(term).toContainText('Publicar una versión nueva')
  })

  test('el buscador del glosario filtra mientras escribes', async ({ page }) => {
    await page.goto('/glosario')
    await page.getByRole('searchbox', { name: 'Buscar en el glosario' }).fill('rama')
    await expect(page.getByRole('article', { name: 'Rama (branch)' })).toBeVisible()
    await expect(page.getByRole('article', { name: 'API' })).toHaveCount(0)
    await expect(page).toHaveURL(/\/glosario\?q=rama$/)
  })

  test('el buscador de la web también encuentra los términos', async ({ page }) => {
    await page.goto('/buscar?q=commit')
    const section = page.getByRole('region', { name: 'Glosario' })
    await section
      .getByRole('link', { name: /Commit/ })
      .first()
      .click()
    await expect(page).toHaveURL(/\/glosario#termino-commit$/)
  })
})
