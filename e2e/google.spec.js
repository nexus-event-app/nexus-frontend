import { expect, expectAccessible, test } from './fixtures.js'
import { user } from './data.js'

const json = (body, status = 200) => ({ status, contentType: 'application/json', body: JSON.stringify(body) })

test.describe('Continuar con Google', () => {
  test('el botón está en el inicio de sesión y en el registro, y va al backend en el idioma de la página', async ({
    page,
  }) => {
    await page.goto('/login')
    await expect(page.getByRole('link', { name: 'Continuar con Google' })).toHaveAttribute(
      'href',
      '/api/oauth2/authorize/google?lang=es',
    )
    await page.goto('/en/sign-up')
    await expect(page.getByRole('link', { name: 'Continue with Google' })).toHaveAttribute(
      'href',
      '/api/oauth2/authorize/google?lang=en',
    )
  })

  test('sin Google configurado no aparece el botón', async ({ page, api }) => {
    api.on('GET', '/api/auth/providers', () => json({ google: false }))
    await page.goto('/login')
    await expect(page.getByRole('button', { name: 'Iniciar sesión' })).toBeVisible()
    await expect(page.getByRole('link', { name: 'Continuar con Google' })).toHaveCount(0)
  })

  test('«Ya casi está»: crea la cuenta al aceptar las condiciones y entra', async ({ page, api }) => {
    api.on('POST', '/api/auth/google/pending', () => json({ name: 'Lucía Prueba', email: 'lucia@example.com' }))
    api.on('POST', '/api/auth/google/complete', () => json({ token: 'token-de-prueba', user }, 201))

    await page.goto('/registro/google#signup=alta-de-prueba')
    await expect(page.getByRole('heading', { level: 1, name: 'Ya casi está' })).toBeVisible()
    await expect(page).toHaveURL(/\/registro\/google$/)

    await page.getByRole('checkbox').check()
    await page.getByRole('button', { name: 'Crear mi cuenta' }).click()

    await expect(page).toHaveURL(/\/$/)
    const sent = JSON.parse(api.calls.find((call) => call.path === '/api/auth/google/complete').body)
    expect(sent).toEqual({ token: 'alta-de-prueba', acceptTerms: true })
  })

  test('si se cancela en Google, lo explica', async ({ page }) => {
    await page.goto('/registro/google#error=cancelled')
    await expect(page.getByText(/Has cancelado el acceso en Google/)).toBeVisible()
  })

  for (const theme of ['light', 'dark']) {
    test(`«Ya casi está» cumple WCAG 2.2 AA en tema ${theme === 'light' ? 'claro' : 'oscuro'}`, async ({
      page,
      api,
    }) => {
      api.on('POST', '/api/auth/google/pending', () => json({ name: 'Lucía Prueba', email: 'lucia@example.com' }))
      await page.emulateMedia({ colorScheme: theme })
      await page.goto('/registro/google#signup=alta-de-prueba')
      await expect(page.getByRole('heading', { level: 1, name: 'Ya casi está' })).toBeVisible()
      await expect(page.locator('div:not(#root)')).toHaveCount(0)
      await expectAccessible(page)
    })
  }
})
