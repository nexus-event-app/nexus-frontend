import { expect, test } from './fixtures.js'

test.describe('Navegación', () => {
  test('la portada muestra lo último de cada sección', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveTitle(/Primer Commit/)
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
    await expect(page.getByRole('link', { name: /Novedades de React 19/ }).first()).toBeVisible()
    await expect(page.getByRole('link', { name: /Desarrollador\/a frontend junior/ }).first()).toBeVisible()
    await expect(page.getByRole('link', { name: /¿Por dónde empiezo con Java\?/ }).first()).toBeVisible()
    const events = page.getByRole('region', { name: 'Próximos eventos' })
    await expect(events.getByRole('article', { name: 'Meetup de React en Valencia' })).toBeVisible()
    await expect(events.getByRole('article', { name: 'Café tech de mujeres en Barcelona' })).toBeVisible()
    const order = await page
      .locator('main > section h2')
      .evaluateAll((titles) => titles.map((title) => title.textContent.trim()))
    const sections = ['Próximos eventos', 'Últimas ofertas de empleo', 'Nuestro foro', 'Elige tu camino', 'Noticias']
    expect(order.filter((title) => sections.includes(title))).toEqual(sections)
  })

  test('se llega a una noticia desde el listado y las migas vuelven atrás', async ({ page, signedIn }) => {
    expect(signedIn.id).toBeDefined()
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

  test('la barra solo lleva «Iniciar sesión» y el menú sigue el orden de la portada', async ({ page, isMobile }) => {
    test.skip(isMobile, 'En el móvil la barra se abre en un menú con las dos opciones')
    await page.goto('/')
    const banner = page.getByRole('banner')
    await expect(banner.getByRole('link', { name: 'Iniciar sesión' })).toBeVisible()
    await expect(banner.getByRole('link', { name: 'Crear cuenta' })).toHaveCount(0)
    const links = banner.getByRole('navigation', { name: /Principal/ }).getByRole('link')
    await expect(links).toHaveText([
      'Eventos',
      'Empleo',
      'Foro',
      'Rutas',
      'Noticias',
      'Testimonios',
      'Sobre el proyecto',
    ])
  })

  test('en la portada, el logo sube hasta arriba; desde otra página lleva a la portada', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto('/')
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
    await page.evaluate(() => window.scrollTo(0, 2000))
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(500)
    await page
      .getByRole('banner')
      .getByRole('link', { name: /ir al inicio/ })
      .click()
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0)
    await expect(page).toHaveURL(/\/$/)

    await page.goto('/noticias')
    await page
      .getByRole('banner')
      .getByRole('link', { name: /ir al inicio/ })
      .click()
    await expect(page).toHaveURL(/localhost:\d+\/$/)
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  })

  test('móvil estrecho con sesión: todo en una fila, menú a la derecha y «Cerrar sesión» a mano', async ({
    page,
    signedIn,
  }) => {
    expect(signedIn.id).toBe(7)
    await page.setViewportSize({ width: 360, height: 640 })
    await page.goto('/')
    const banner = page.getByRole('banner')
    const logo = await banner.getByRole('link', { name: /ir al inicio/ }).boundingBox()
    const toggle = banner.getByRole('button', { name: 'Abrir menú' })
    const box = await toggle.boundingBox()
    expect(Math.abs(box.y + box.height / 2 - (logo.y + logo.height / 2))).toBeLessThan(4)
    expect(360 - (box.x + box.width)).toBeLessThanOrEqual(24)

    await toggle.click()
    const logout = banner.getByRole('button', { name: 'Cerrar sesión' })
    await logout.scrollIntoViewIfNeeded()
    await expect(logout).toBeInViewport()
    await logout.click()
    await expect(banner.getByRole('button', { name: 'Abrir menú' })).toBeVisible()
    await banner.getByRole('button', { name: 'Abrir menú' }).click()
    await expect(banner.getByRole('link', { name: 'Iniciar sesión' })).toBeVisible()
  })
})
