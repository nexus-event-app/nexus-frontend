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

test.describe('Perfil', () => {
  test('en el perfil de otra persona solo se ve lo que ha puesto en él, nunca su actividad', async ({ page, api }) => {
    await page.goto('/perfil/7-lucia-prueba')

    const card = page.getByRole('article', { name: 'Lucía Prueba' })
    await expect(card.getByRole('heading', { level: 1, name: 'Lucía Prueba' })).toBeVisible()
    await expect(card).toContainText('Estudiante de DAW')
    await expect(card.getByRole('list', { name: 'Tecnologías' })).toContainText('React')
    await expect(page.getByRole('heading', { name: 'Tu actividad' })).toHaveCount(0)
    await expect(page.getByText('¿Por dónde empiezo con Java?')).toHaveCount(0)
    expect(api.calls.some((call) => call.path.startsWith('/api/profile'))).toBe(false)
  })

  test('en tu perfil ves tu tarjeta y tu actividad, que solo ves tú', async ({ page, signedIn }) => {
    expect(signedIn.id).toBe(7)
    await page.goto('/perfil/7-lucia-prueba')

    await expect(page.getByRole('link', { name: 'Editar perfil' })).toBeVisible()
    const activity = page.getByRole('region', { name: 'Tu actividad' })
    await expect(activity).toContainText('Nadie más ve tu actividad')
    await expect(activity.getByRole('link', { name: '¿Por dónde empiezo con Java?' })).toBeVisible()
    await expect(activity.getByRole('region', { name: 'Tus testimonios' }).getByRole('listitem')).not.toHaveCount(0)
  })
})
