import { expect, test } from './fixtures.js'

/**
 * Las tarjetas enteras llevan a su página, también al pulsar la pista visual («Leer noticia», «Participar», la flecha).
 * Se pulsa con el ratón en el centro de la flecha (como una persona), no con click() sobre el elemento: así se detecta
 * si algo la tapa o se queda con el clic.
 */
async function clickArrowOf(page, card) {
  const hint = card.locator('footer [aria-hidden="true"]').last()
  await hint.scrollIntoViewIfNeeded()
  const box = await hint.boundingBox()
  // La flecha está al final de la pista: se pulsa a 12 px del borde derecho, en el centro vertical.
  const x = box.x + box.width - 12
  const y = box.y + box.height / 2
  await page.mouse.move(x, y)
  await page.mouse.click(x, y)
}

test.describe('La flecha de las tarjetas lleva a su página', () => {
  test.skip(({ isMobile }) => isMobile, 'En el móvil no hay ratón: se toca la tarjeta')

  test('noticia de la portada', async ({ page }) => {
    await page.goto('/')
    const card = page.locator('section[aria-labelledby="home-news"]').getByRole('article').first()
    await clickArrowOf(page, card)
    await expect(page).toHaveURL(/\/noticias\/\d+-/)
  })

  test('noticia de la página de noticias', async ({ page }) => {
    await page.goto('/noticias')
    await clickArrowOf(page, page.getByRole('main').getByRole('article').first())
    await expect(page).toHaveURL(/\/noticias\/\d+-/)
  })

  test('discusión del foro', async ({ page }) => {
    await page.goto('/foro')
    await clickArrowOf(page, page.getByRole('main').getByRole('article').first())
    await expect(page).toHaveURL(/\/foro\/\d+-/)
  })

  test('ruta de aprendizaje', async ({ page }) => {
    await page.goto('/rutas')
    const card = page.getByRole('list', { name: 'Rutas disponibles' }).getByRole('article').first()
    await clickArrowOf(page, card)
    await expect(page).toHaveURL(/\/rutas\/frontend$/)
  })
})
