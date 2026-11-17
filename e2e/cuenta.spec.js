import { expect, test } from './fixtures.js'

test.describe('Cuenta', () => {
  test('inicia sesión y vuelve a la página que pedía la sesión', async ({ page, api }) => {
    await page.goto('/empleo/guardadas')
    await expect(page).toHaveURL(/\/login\?redirect=%2Fempleo%2Fguardadas$/)

    await page.getByRole('textbox', { name: /Email/ }).fill('Lucia@Example.com')
    await page.getByLabel(/^Contraseña/).fill('clave1234')
    await page.getByRole('button', { name: 'Iniciar sesión' }).click()

    await expect(page).toHaveURL(/\/empleo\/guardadas$/)
    const login = api.calls.find((call) => call.path === '/api/auth/login')
    expect(JSON.parse(login.body)).toEqual({ email: 'lucia@example.com', password: 'clave1234' })
  })

  test('muestra el error si las credenciales no son válidas', async ({ page, api }) => {
    api.on('POST', '/api/auth/login', () => ({
      status: 401,
      contentType: 'application/json',
      body: JSON.stringify({ error: 'BAD_CREDENTIALS', message: 'Email o contraseña incorrectos.' }),
    }))
    await page.goto('/login')
    await page.getByRole('textbox', { name: /Email/ }).fill('lucia@example.com')
    await page.getByLabel(/^Contraseña/).fill('mala1234')
    await page.getByRole('button', { name: 'Iniciar sesión' }).click()

    await expect(page.getByText('Email o contraseña incorrectos.')).toBeVisible()
    await expect(page).toHaveURL(/\/login$/)
  })

  test('valida el registro antes de enviarlo', async ({ page, api }) => {
    await page.goto('/registro')
    await page
      .getByRole('button', { name: /Crear cuenta/ })
      .last()
      .click()

    await expect(page.getByRole('alert').first()).toBeVisible()
    expect(api.calls.some((call) => call.path === '/api/auth/register')).toBe(false)
  })

  test('con sesión iniciada se guarda una oferta', async ({ page, api, signedIn }) => {
    expect(signedIn.name).toBe('Lucía Prueba')
    await page.goto('/empleo')
    const save = page.getByRole('button', { name: /Guardar la oferta «Desarrollador\/a frontend junior»/ })
    await expect(save).toHaveAttribute('aria-pressed', 'false')
    await save.click()

    await expect(page.getByRole('button', { name: /Quitar «Desarrollador\/a frontend junior»/ })).toHaveAttribute(
      'aria-pressed',
      'true',
    )
    // El botón cambia al instante y la petición sale después: se espera a que llegue al servidor simulado.
    await expect
      .poll(() => api.calls.some((call) => call.method === 'PUT' && call.path === '/api/saved-jobs/11'))
      .toBe(true)
  })

  test('lo guardado nada más entrar no se pierde aunque la lista tarde en llegar', async ({ page, api, signedIn }) => {
    expect(signedIn.id).toBe(7)
    let releaseList
    const listArrived = new Promise((resolve) => (releaseList = resolve))
    let listServed = false
    api.on('GET', '/api/saved-jobs/ids', async () => {
      await listArrived
      listServed = true
      return { status: 200, contentType: 'application/json', body: '[]' }
    })
    await page.goto('/empleo')
    await page.getByRole('button', { name: /Guardar la oferta «Desarrollador\/a frontend junior»/ }).click()
    releaseList()

    const saved = page.getByRole('button', { name: /Quitar «Desarrollador\/a frontend junior»/ })
    await expect(saved).toHaveAttribute('aria-pressed', 'true')
    // Ya ha llegado la lista (sin esa oferta) y la oferta sigue guardada.
    await expect.poll(() => listServed).toBe(true)
    await expect(saved).toHaveAttribute('aria-pressed', 'true')
  })

  test('sin sesión, guardar una oferta invita a iniciar sesión', async ({ page, api }) => {
    await page.goto('/empleo')
    await page
      .getByRole('button', { name: /Guardar la oferta/ })
      .first()
      .click()
    await expect(page.getByText('Inicia sesión para guardar ofertas y verlas luego.')).toBeVisible()
    expect(api.calls.some((call) => call.method === 'PUT')).toBe(false)
  })
})

test.describe('Cerrar sesión', () => {
  test('desde una página privada (editar perfil) también lleva a la portada, no a «Iniciar sesión»', async ({
    page,
    signedIn,
  }) => {
    expect(signedIn.id).toBe(7)
    await page.goto('/perfil/editar')
    await expect(page.getByRole('heading', { level: 1, name: 'Editar perfil' })).toBeVisible()
    const accountMenu = page.getByRole('banner').getByRole('button', { name: 'Lucía Prueba' })
    if (await accountMenu.isVisible()) {
      await accountMenu.click()
    } else {
      await page.getByRole('button', { name: /menú/i }).first().click()
    }
    await page.getByRole('button', { name: 'Cerrar sesión' }).click()
    await expect(page).toHaveURL(/localhost:\d+\/$/)
    await expect(page.getByText('Has cerrado sesión.')).toBeVisible()
  })

  test('desde tu perfil lleva a la portada y la sesión queda cerrada', async ({ page, signedIn }) => {
    expect(signedIn.id).toBe(7)
    await page.goto('/perfil/7-lucia-prueba')
    await expect(page.getByRole('region', { name: 'Tu actividad' })).toBeVisible()

    // En el móvil la opción está en el menú lateral; en el escritorio, en el menú de la cuenta.
    const accountMenu = page.getByRole('banner').getByRole('button', { name: 'Lucía Prueba' })
    if (await accountMenu.isVisible()) {
      await accountMenu.click()
    } else {
      await page.getByRole('button', { name: /menú/i }).first().click()
    }
    await page.getByRole('button', { name: 'Cerrar sesión' }).click()

    await expect(page).toHaveURL(/\/$/)
    await expect(page.getByText('Has cerrado sesión.')).toBeVisible()
    await expect(page.getByRole('link', { name: 'Iniciar sesión' }).first()).toBeVisible()
    expect(await page.evaluate(() => Object.keys(localStorage).some((key) => /session/i.test(key)))).toBe(false)
  })
})
