import { expect, expectAccessible, test } from './fixtures.js'

const json = (body) => ({ status: 200, contentType: 'application/json', body: JSON.stringify(body) })

const CASE = {
  targetType: 'COMMENT',
  targetId: 5,
  target: {
    exists: true,
    visible: true,
    title: '¿Por dónde empiezo con Java?',
    excerpt: 'Escríbeme al 600 000 000 y te paso los apuntes.',
    authorId: 9,
    authorName: 'Marta Ejemplo',
    discussionId: 21,
    discussionSlug: 'por-donde-empiezo-con-java',
  },
  total: 2,
  reasons: { PERSONAL_DATA: 1, SPAM: 1 },
  lastReportedAt: '2026-11-11T10:00:00',
  reports: [
    {
      id: 2,
      reason: 'PERSONAL_DATA',
      details: 'Ha publicado un teléfono',
      reporterName: 'Lucía Prueba',
      createdAt: '2026-11-11T10:00:00',
      status: 'PENDING',
      resolution: null,
    },
    {
      id: 1,
      reason: 'SPAM',
      details: null,
      reporterName: 'Pablo Ejemplo',
      createdAt: '2026-11-10T10:00:00',
      status: 'PENDING',
      resolution: null,
    },
  ],
}

test.describe('Reportar contenido', () => {
  test('se reporta un comentario ajeno, pero no el contenido propio', async ({ page, api, signedIn }) => {
    expect(signedIn.id).toBe(7)
    await page.goto('/foro/21-por-donde-empiezo-con-java')
    // La discusión y el comentario de Lucía son suyos: no se pueden reportar.
    await expect(page.getByRole('button', { name: /Reportar la discusión/ })).toHaveCount(0)
    await expect(page.locator('#comentario-6').getByRole('button', { name: /Reportar/ })).toHaveCount(0)

    await page.getByRole('button', { name: 'Reportar el comentario de Marta Ejemplo' }).click()
    const dialog = page.getByRole('dialog', { name: 'Reportar contenido' })
    await dialog.getByRole('radio', { name: /Datos personales/ }).check()
    await dialog.getByLabel(/Detalles/).fill('Ha publicado un teléfono')
    await expectAccessible(page)
    await dialog.getByRole('button', { name: 'Enviar reporte' }).click()

    await expect(dialog).toBeHidden()
    await expect(page.getByText('Gracias por avisar. El equipo lo revisará lo antes posible.')).toBeVisible()
    await expect
      .poll(() => api.calls.find((call) => call.method === 'POST' && call.path === '/api/reports')?.body)
      .toBe(
        JSON.stringify({
          targetType: 'COMMENT',
          targetId: 5,
          reason: 'PERSONAL_DATA',
          details: 'Ha publicado un teléfono',
        }),
      )
  })

  test('sin sesión, reportar un testimonio lleva a iniciar sesión', async ({ page }) => {
    await page.goto('/testimonios')
    await page.getByRole('button', { name: 'Reportar el testimonio de Marta Ejemplo' }).click()
    await expect(page).toHaveURL(/\/login\?redirect=%2Ftestimonios$/)
  })
})

test.describe('Cola de moderación', () => {
  test.skip(({ isMobile }) => isMobile, 'El panel de administración se prueba en escritorio')

  test('el equipo ve lo reportado agrupado y lo elimina', async ({ page, api, signedInAdmin }) => {
    expect(signedInAdmin.role).toBe('ADMIN')
    let resolved = false
    api.on('GET', '/api/admin/reports', () => json(resolved ? [] : [CASE]))
    api.on('POST', '/api/admin/reports/resolve', () => {
      resolved = true
      return { status: 204 }
    })

    await page.goto('/admin')
    await page.getByRole('link', { name: /Reportes pendientes/ }).click()
    await expect(page).toHaveURL(/\/admin\/reportes$/)

    const item = page.getByRole('article', { name: '¿Por dónde empiezo con Java?' })
    await expect(item).toContainText('2 reportes')
    await expect(item).toContainText('Datos personales · 1')
    await expect(item).toContainText('«Ha publicado un teléfono»')
    await expect(item.getByRole('link', { name: 'Ver en la web' })).toHaveAttribute(
      'href',
      '/foro/21-por-donde-empiezo-con-java#comentario-5',
    )
    // Un comentario no se puede ocultar, solo eliminar o descartar.
    await expect(item.getByRole('button', { name: /^Ocultar/ })).toHaveCount(0)
    await expectAccessible(page)

    await item.getByRole('button', { name: /^Eliminar/ }).click()
    await page.getByRole('dialog', { name: 'Eliminar contenido' }).getByRole('button', { name: 'Eliminar' }).click()

    await expect(page.getByText('Contenido eliminado.')).toBeVisible()
    await expect(page.getByText('No hay reportes pendientes')).toBeVisible()
    const call = api.calls.find((c) => c.path === '/api/admin/reports/resolve')
    expect(JSON.parse(call.body)).toEqual({ targetType: 'COMMENT', targetId: 5, action: 'DELETE' })
  })
})
