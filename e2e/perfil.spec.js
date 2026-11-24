import { discussions, profile } from './data.js'
import { expect, expectAccessible, json, test } from './fixtures.js'

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
  test('sin cuenta no se puede ver ningún perfil: lleva a crear la cuenta y después vuelve', async ({ page, api }) => {
    await page.goto('/perfil/7-lucia-prueba')

    await expect(page).toHaveURL(/\/registro\?redirect=%2Fperfil%2F7-lucia-prueba$/)
    await expect(page.getByText('Crea tu cuenta gratis para ver los perfiles de la comunidad.')).toBeVisible()
    expect(api.calls.some((call) => call.path.startsWith('/api/users/'))).toBe(false)
  })

  test('en el perfil de otra persona solo se ve lo que ha puesto en él, nunca su actividad', async ({
    page,
    api,
    signedIn,
  }) => {
    expect(signedIn.id).toBe(7)
    api.on('GET', /^\/api\/users\/\d+$/, () =>
      json({
        ...profile,
        id: 9,
        name: 'Marcos Prueba',
        slug: 'marcos-prueba',
        discussionCount: undefined,
        testimonialCount: undefined,
      }),
    )
    await page.goto('/perfil/9-marcos-prueba')

    const card = page.getByRole('article', { name: 'Marcos Prueba' })
    await expect(card.getByRole('heading', { level: 1, name: 'Marcos Prueba' })).toBeVisible()
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

test.describe('Eliminar la cuenta', () => {
  test('explica qué pasa, pide la contraseña, elimina la cuenta y vuelve a la portada sin sesión', async ({
    page,
    api,
    signedIn,
  }) => {
    expect(signedIn.hasPassword).toBe(true)
    await page.goto('/perfil/editar')
    const section = page.getByRole('region', { name: 'Eliminar tu cuenta' })
    await section.getByRole('button', { name: 'Eliminar mi cuenta' }).click()
    const dialog = page.getByRole('dialog', { name: '¿Eliminar tu cuenta?' })
    await expect(dialog).toContainText('firmadas como «Cuenta eliminada»')
    await expectAccessible(page)

    await dialog.getByLabel(/Tu contraseña actual/).fill('Clave12345')
    await dialog.getByRole('button', { name: 'Eliminar definitivamente' }).click()

    await expect(page).toHaveURL(/\/$/)
    await expect(page.getByText(/Tu cuenta se ha eliminado/)).toBeVisible()
    await expect(page.getByRole('link', { name: 'Iniciar sesión' }).first()).toBeVisible()
    const sent = api.calls.find((call) => call.method === 'DELETE' && call.path === '/api/profile')
    expect(JSON.parse(sent.body)).toEqual({ password: 'Clave12345' })
  })

  test('en el foro, lo que escribió una cuenta eliminada sale como «Cuenta eliminada» y sin enlace', async ({
    page,
    api,
  }) => {
    const [first] = discussions
    const deleted = { ...first, authorName: 'Cuenta eliminada', authorDeleted: true, authorAvatarUrl: null }
    api.on('GET', new RegExp(`^/api/discussions/${first.id}$`), () => json(deleted))
    await page.goto(`/foro/${first.id}-${first.slug}`)
    await expect(page.getByRole('heading', { level: 1, name: first.title })).toBeVisible()
    await expect(page.getByText('Cuenta eliminada').first()).toBeVisible()
    await expect(page.getByRole('link', { name: 'Cuenta eliminada' })).toHaveCount(0)
  })
})
