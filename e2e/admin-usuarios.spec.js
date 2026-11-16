import { expect, test } from './fixtures.js'
import { page as pageOf, profile } from './data.js'

const json = (body) => ({ status: 200, contentType: 'application/json', body: JSON.stringify(body) })

const amiga = {
  id: 7,
  name: 'Lucía Prueba',
  email: 'lucia@example.com',
  role: 'USER',
  enabled: true,
  emailVerified: true,
  createdAt: '2026-11-02T10:00:00',
}

test.describe('Panel · usuarios', () => {
  test('da el permiso de administración tras confirmarlo', async ({ page, api, signedInAdmin }) => {
    expect(signedInAdmin.role).toBe('ADMIN')
    api.on('GET', '/api/admin/users', () => json(pageOf([amiga])))
    api.on('PUT', '/api/admin/users/7/role', () => json({ ...amiga, role: 'ADMIN' }))

    await page.goto('/admin/usuarios')
    await page.getByRole('button', { name: 'Hacer admin a Lucía Prueba' }).click()
    await page.getByRole('dialog').getByRole('button', { name: 'Dar permiso' }).click()

    await expect(page.getByRole('button', { name: 'Quitar admin a Lucía Prueba' })).toBeVisible()
    const sent = JSON.parse(api.calls.find((call) => call.path === '/api/admin/users/7/role').body)
    expect(sent).toEqual({ role: 'ADMIN' })
  })

  test('edita el perfil de una cuenta desde el panel', async ({ page, api, signedInAdmin }) => {
    expect(signedInAdmin.role).toBe('ADMIN')
    api.on('GET', '/api/admin/users', () => json(pageOf([amiga])))
    api.on('GET', '/api/admin/users/7/profile', () => json(profile))
    api.on('PUT', '/api/admin/users/7/profile', () => json(profile))

    await page.goto('/admin/usuarios')
    await page.getByRole('link', { name: 'Editar perfil de Lucía Prueba' }).click()
    await expect(page.getByRole('heading', { level: 1, name: 'Perfil de Lucía Prueba' })).toBeVisible()

    await page.getByLabel('Titular').fill('Titular corregido')
    await page.getByRole('button', { name: 'Guardar perfil' }).click()

    await expect(page).toHaveURL(/\/admin\/usuarios$/)
    const sent = JSON.parse(
      api.calls.find((call) => call.method === 'PUT' && call.path === '/api/admin/users/7/profile').body,
    )
    expect(sent).toMatchObject({ name: 'Lucía Prueba', headline: 'Titular corregido' })
  })
})
