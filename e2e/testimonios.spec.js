import { expect, expectAccessible, test } from './fixtures.js'
import { testimonials } from './data.js'

/** Ocho testimonios: seis en la primera página y dos en la segunda. */
const eight = Array.from({ length: 8 }, (_, index) => ({
  ...testimonials[0],
  id: 300 + index,
  name: `Persona ${index + 1}`,
  isHighlighted: false,
}))

test.describe('Testimonios', () => {
  test.beforeEach(async ({ api }) => {
    api.on('GET', '/api/testimonials', () => ({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(eight),
    }))
  })

  test('enseña seis testimonios por página y el resto en la siguiente', async ({ page }) => {
    await page.goto('/testimonios')
    await expect(page.getByRole('main').getByRole('figure')).toHaveCount(6)
    await page
      .getByRole('navigation', { name: /Paginación/ })
      .getByRole('link', { name: /Siguiente/ })
      .click()
    await expect(page).toHaveURL(/page=2/)
    await expect(page.getByRole('main').getByRole('figure')).toHaveCount(2)
    await expect(page.getByText('Persona 7')).toBeVisible()
  })

  test('una página que no existe lleva a la última', async ({ page }) => {
    await page.goto('/testimonios?page=9')
    await expect(page).toHaveURL(/page=2/)
  })

  test('con sesión, el formulario para compartir la experiencia es accesible', async ({ page, signedIn }) => {
    expect(signedIn.id).toBeDefined()
    await page.goto('/testimonios')
    const share = page.getByRole('region', { name: 'Comparte tu experiencia' })
    await expect(share.getByRole('complementary', { name: 'Cómo funciona' }).getByRole('listitem')).toHaveCount(3)
    await expect(share.getByRole('button', { name: 'Enviar testimonio' })).toBeVisible()
    await expectAccessible(page)
  })

  test('desde la portada, «Cuenta tu historia» lleva al formulario para compartirla', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('link', { name: 'Cuenta tu historia' }).click()
    await expect(page).toHaveURL(/\/testimonios#share-heading$/)
    await expect(page.getByRole('heading', { level: 2, name: 'Comparte tu experiencia' })).toBeInViewport()
  })
})
