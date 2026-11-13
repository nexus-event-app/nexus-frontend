import { expect, test } from './fixtures.js'

const json = (body) => ({ status: 200, contentType: 'application/json', body: JSON.stringify(body) })

test.describe('Rutas de aprendizaje', () => {
  test('desde el menú se llega a una ruta y a sus recursos', async ({ page, isMobile }) => {
    await page.goto('/')
    if (isMobile) await page.getByRole('button', { name: 'Abrir menú' }).click()
    await page
      .getByRole('navigation', { name: /Principal/ })
      .getByRole('link', { name: 'Rutas' })
      .click()

    await expect(page).toHaveURL(/\/rutas$/)
    // Las cinco rutas y la ayuda para elegir.
    await expect(page.getByRole('list', { name: 'Rutas disponibles' }).getByRole('listitem')).toHaveCount(6)
    await page.getByRole('link', { name: 'Inteligencia artificial' }).click()

    await expect(page).toHaveURL(/\/rutas\/ia$/)
    await expect(page.getByRole('heading', { level: 1, name: 'Inteligencia artificial' })).toBeVisible()
    await expect(page.getByRole('heading', { level: 2, name: /^Etapa \d/ })).toHaveCount(6)
    const elements = page.getByRole('link', { name: /Elements of AI/ })
    await expect(elements).toHaveAttribute('href', 'https://www.elementsofai.com/es')
    await expect(elements).toHaveAttribute('target', '_blank')
    await expect(page.getByText('Inicia sesión o crea una cuenta para guardar tu progreso en las rutas.')).toBeVisible()
  })

  test('con sesión se marca una etapa y el progreso se ve en la ruta y en el listado', async ({
    page,
    api,
    signedIn,
  }) => {
    expect(signedIn.id).toBe(7)
    await page.goto('/rutas/frontend')
    const step = page.getByRole('checkbox', { name: /Hecha \(etapa JavaScript\)/ })
    await expect(step).toBeEnabled()
    await step.check()

    await expect(page.getByText('1 de 6 etapas')).toBeVisible()
    await expect
      .poll(() =>
        api.calls.some((call) => call.method === 'PUT' && call.path === '/api/learning/progress/frontend/javascript'),
      )
      .toBe(true)

    // Al volver al listado, la tarjeta de la ruta muestra el avance guardado.
    api.on('GET', '/api/learning/progress', () =>
      json([{ pathId: 'frontend', stepId: 'javascript', completedAt: '2026-11-11T10:00:00' }]),
    )
    await page.goto('/rutas')
    await expect(page.getByRole('article').filter({ hasText: 'Frontend' })).toContainText('1 de 6 etapas')
  })

  test('las direcciones se traducen y las antiguas llevan a la buena', async ({ page }) => {
    await page.goto('/en/learning-paths/data')
    await expect(page.getByRole('heading', { level: 1, name: 'Data analysis' })).toBeVisible()
    await expect(page.locator('html')).toHaveAttribute('lang', 'en')

    await page.goto('/ca/rutes/datos')
    await expect(page).toHaveURL(/\/ca\/rutes\/dades$/)
    await expect(page.getByRole('heading', { level: 1, name: 'Anàlisi de dades' })).toBeVisible()
  })

  test('una ruta completada lo celebra', async ({ page, api, signedIn }) => {
    expect(signedIn.id).toBe(7)
    const steps = ['fundamentos', 'programacion', 'automatizacion', 'apis', 'accesibilidad', 'empleo']
    api.on('GET', '/api/learning/progress', () =>
      json(steps.map((stepId) => ({ pathId: 'qa', stepId, completedAt: '2026-11-11T10:00:00' }))),
    )
    await page.goto('/rutas/qa')
    await expect(page.getByText('¡Ruta completada!')).toBeVisible()
  })
})
