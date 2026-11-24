import { expect, json, test } from './fixtures.js'

test.describe('Guías', () => {
  test('sin cuenta se puede leer una guía entera, con su índice, y al final invita a unirse', async ({
    page,
    isMobile,
  }) => {
    await page.goto('/guias')
    await page.getByRole('link', { name: /Qué hacer después de un bootcamp/ }).click()
    await expect(page).toHaveURL(/\/guias\/que-hacer-despues-de-un-bootcamp$/)
    await expect(page.getByRole('heading', { level: 1, name: /Qué hacer después de un bootcamp/ })).toBeVisible()

    if (!isMobile) {
      const toc = page.getByRole('navigation', { name: 'En esta guía' })
      await toc.getByRole('link', { name: '3. Ve a eventos' }).click()
      await expect(page).toHaveURL(/#3-ve-a-eventos$/)
      await expect(page.getByRole('heading', { level: 2, name: '3. Ve a eventos' })).toBeInViewport()
      await expect(toc.getByRole('link', { name: '3. Ve a eventos' })).toHaveAttribute('aria-current', 'location')
    }

    await expect(page.getByRole('link', { name: 'agenda de eventos' })).toHaveAttribute('href', '/eventos')
    await expect(page.getByRole('link', { name: /Únete a la comunidad/ })).toHaveAttribute('href', '/registro')
  })

  test('los filtros por tema dejan ver solo las guías de ese tema y cada tarjeta dice el suyo', async ({ page }) => {
    await page.goto('/guias')
    const list = page.getByRole('list', { name: 'Todas las guías' })
    await expect(list.getByRole('listitem')).toHaveCount(2)
    const filters = page.getByRole('navigation', { name: 'Filtrar guías por tema' })
    await filters.getByRole('link', { name: /Empleo/ }).click()
    await expect(page).toHaveURL(/categoria=empleo/)
    await expect(list.getByRole('listitem')).toHaveCount(1)
    await expect(list).toContainText('Empleo')
    await expect(list).toContainText('Cómo preparar tu primera entrevista técnica')
    await filters.getByRole('link', { name: /Comunidad/ }).click()
    await expect(page.getByText('Todavía no hay guías de este tema')).toBeVisible()
  })

  test('una guía que no existe enseña la página de no encontrada', async ({ page }) => {
    await page.goto('/guias/no-existe')
    await expect(page.getByRole('heading', { level: 1, name: 'No encontramos esta página' })).toBeVisible()
  })

  test('la administración crea una guía como borrador desde el panel', async ({ page, api, signedInAdmin }) => {
    expect(signedInAdmin.role).toBe('ADMIN')
    api.on('GET', '/api/admin/guides', () => json([]))
    api.on('POST', '/api/admin/guides', () => json({ id: 2, slug: 'mi-guia', title: 'Mi guía' }, 201))
    await page.goto('/admin/guias')
    await page.getByRole('button', { name: 'Nueva guía' }).click()
    const dialog = page.getByRole('dialog', { name: 'Nueva guía' })
    await dialog.getByLabel('Título').fill('Mi guía')
    await dialog.getByLabel('Descripción').fill('Una guía de prueba.')
    await dialog.getByLabel('Contenido').fill('## Primer apartado\n\nTexto.')
    await dialog.getByRole('button', { name: 'Crear guía' }).click()
    await expect(page.getByText('Guía guardada como borrador.')).toBeVisible()
    const sent = JSON.parse(api.calls.find((call) => call.method === 'POST' && call.path === '/api/admin/guides').body)
    expect(sent).toMatchObject({ title: 'Mi guía', slug: null, category: 'PRIMEROS_PASOS', published: false })
  })
})
