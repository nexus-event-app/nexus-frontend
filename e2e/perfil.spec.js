import { expect, test } from './fixtures.js'

test.describe('Editar perfil', () => {
  test('la vista previa cambia mientras escribes y «Guardar perfil» envía los datos', async ({
    page,
    api,
    signedIn,
  }) => {
    expect(signedIn.id).toBeDefined()
    await page.goto('/perfil/editar')

    const preview = page.getByRole('complementary', { name: 'Así te verán' })
    await expect(preview.getByRole('heading', { name: 'Lucía Prueba' })).toBeVisible()

    await page.getByLabel('Titular').fill('Aprendiendo Java y Spring')
    await expect(preview).toContainText('Aprendiendo Java y Spring')

    await page.getByRole('button', { name: 'Guardar perfil' }).click()
    await expect
      .poll(() => api.calls.find((call) => call.method === 'PUT' && call.path === '/api/profile'))
      .toBeTruthy()
    const sent = JSON.parse(api.calls.find((call) => call.method === 'PUT' && call.path === '/api/profile').body)
    expect(sent).toMatchObject({ name: 'Lucía Prueba', headline: 'Aprendiendo Java y Spring' })
    await expect(page).toHaveURL(/\/perfil\/7-lucia-prueba$/)
  })
})
