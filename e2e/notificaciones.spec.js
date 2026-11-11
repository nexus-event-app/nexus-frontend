import { expect, expectAccessible, test } from './fixtures.js'

test.describe('Notificaciones', () => {
  test('sin sesión no hay campanita y la página pide iniciar sesión', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('link', { name: /^Notificaciones/ })).toHaveCount(0)
    await page.goto('/notificaciones')
    await expect(page).toHaveURL(/\/login\?redirect=%2Fnotificaciones$/)
  })

  test('la campanita dice cuántos avisos hay sin leer y lleva a la lista', async ({ page, signedIn }) => {
    expect(signedIn.name).toBe('Lucía Prueba')
    await page.goto('/')
    const bell = page.getByRole('link', { name: 'Notificaciones: 1 sin leer' })
    await expect(bell).toBeVisible()
    await bell.click()

    await expect(page).toHaveURL(/\/notificaciones$/)
    await expect(page.getByRole('heading', { level: 1, name: 'Notificaciones' })).toBeVisible()
    await expect(page.getByRole('status')).toHaveText('Tienes 1 notificación sin leer.')
    await expect(
      page.getByRole('link', { name: 'Marta Ejemplo ha respondido a tu discusión «¿Por dónde empiezo con Java?»' }),
    ).toBeVisible()
    await expect(
      page.getByRole('link', {
        name: 'Pablo Ejemplo ha marcado tu respuesta como la mejor en «Consejos para mi portfolio»',
      }),
    ).toBeVisible()
    await expectAccessible(page)
  })

  test('abrir un aviso lo marca como leído y lleva al comentario', async ({ page, api, signedIn }) => {
    expect(signedIn.id).toBe(7)
    await page.goto('/notificaciones')
    await page.getByRole('link', { name: /Marta Ejemplo ha respondido/ }).click()

    await expect(page).toHaveURL(/\/foro\/21-por-donde-empiezo-con-java#comentario-5$/)
    await expect(page.locator('#comentario-5')).toBeFocused()
    await expect
      .poll(() => api.calls.some((call) => call.method === 'PUT' && call.path === '/api/notifications/101/read'))
      .toBe(true)
  })

  test('«Marcar todas como leídas» deja la campanita a cero', async ({ page, api, signedIn }) => {
    expect(signedIn.id).toBe(7)
    // El servidor simulado deja de contar avisos sin leer en cuanto se marcan todos.
    let allRead = false
    api.on('PUT', '/api/notifications/read-all', () => {
      allRead = true
      return { status: 204 }
    })
    api.on('GET', '/api/notifications/unread-count', () => ({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ count: allRead ? 0 : 1 }),
    }))
    await page.goto('/notificaciones')
    await page.getByRole('button', { name: 'Marcar todas como leídas' }).click()

    await expect(page.getByRole('status').filter({ hasText: 'Estás al día' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'Marcar todas como leídas' })).toHaveCount(0)
    // Solo se ve una campanita (la de escritorio o la de móvil), ya sin avisos pendientes.
    await expect(page.getByRole('banner').getByRole('link', { name: 'Notificaciones', exact: true })).toBeVisible()
    expect(api.calls.some((call) => call.path === '/api/notifications/read-all')).toBe(true)
  })

  test('sin avisos explica qué aparecerá aquí', async ({ page, api, signedIn }) => {
    expect(signedIn.id).toBe(7)
    api.on('GET', '/api/notifications', () => ({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ content: [], page: 0, size: 12, totalElements: 0, totalPages: 0, last: true }),
    }))
    await page.goto('/notificaciones')
    await expect(page.getByRole('heading', { name: 'Aún no tienes notificaciones' })).toBeVisible()
    await expect(page.getByRole('main').getByRole('link', { name: 'Ir al foro' })).toBeVisible()
  })
})
