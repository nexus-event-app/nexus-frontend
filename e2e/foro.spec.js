import { comments, discussions } from './data.js'
import { expect, expectAccessible, test } from './fixtures.js'

const DISCUSSION = '/foro/21-por-donde-empiezo-con-java'
const json = (body) => ({ status: 200, contentType: 'application/json', body: JSON.stringify(body) })

test.describe('Mejor respuesta', () => {
  test('quien preguntó marca la mejor respuesta y la discusión queda resuelta', async ({ page, api, signedIn }) => {
    expect(signedIn.id).toBe(discussions[0].authorId)
    api.on('PUT', '/api/discussions/21/accepted-answer', () => json({ ...discussions[0], acceptedCommentId: 5 }))
    await page.goto(DISCUSSION)

    const accept = page.getByRole('button', { name: /Marcar como mejor respuesta \(respuesta de Marta Ejemplo\)/ })
    await accept.click()

    await expect(page.getByRole('button', { name: /Quitar mejor respuesta/ })).toHaveAttribute('aria-pressed', 'true')
    await expect(page.getByText('Resuelta')).toBeVisible()
    await expect
      .poll(() => api.calls.find((call) => call.path === '/api/discussions/21/accepted-answer')?.body)
      .toBe(JSON.stringify({ commentId: 5 }))
    // La mejor respuesta pasa a ser el primer comentario.
    await expect(page.locator('#comentario-5')).toContainText('Mejor respuesta')
    await expect(
      page
        .getByRole('region', { name: /Comentarios/ })
        .getByRole('article')
        .first(),
    ).toHaveAttribute('id', 'comentario-5')
  })

  test('las demás personas ven la mejor respuesta pero no pueden cambiarla', async ({ page, api }) => {
    api.on('GET', '/api/discussions/21', () => json({ ...discussions[0], acceptedCommentId: 6 }))
    await page.goto(DISCUSSION)

    await expect(
      page
        .getByRole('region', { name: /Comentarios/ })
        .getByRole('article')
        .first(),
    ).toHaveAttribute('id', `comentario-${comments[1].id}`)
    await expect(page.getByRole('button', { name: /mejor respuesta/ })).toHaveCount(0)
    await page.getByRole('link', { name: 'Ver la mejor respuesta' }).click()
    await expect(page.locator('#comentario-6')).toBeFocused()
    // Se audita con la página arriba: desplazada, la cabecera fija tapa a medias los botones de más arriba y axe los
    // daría por pequeños (miden 44 px de alto).
    await page.evaluate(() => window.scrollTo(0, 0))
    await expectAccessible(page)
  })

  test('el listado del foro señala las discusiones resueltas', async ({ page, api }) => {
    api.on('GET', '/api/discussions', () =>
      json({
        content: [{ ...discussions[0], acceptedCommentId: 5 }],
        page: 0,
        size: 12,
        totalElements: 1,
        totalPages: 1,
        last: true,
      }),
    )
    await page.goto('/foro')
    await expect(page.getByRole('article').filter({ hasText: '¿Por dónde empiezo con Java?' })).toContainText(
      'Resuelta',
    )
  })

  test('el listado pide cuatro discusiones por página y enseña las normas al lado', async ({ page, api }) => {
    await page.goto('/foro')
    await expect(page.getByRole('complementary', { name: 'Normas del foro' })).toBeVisible()
    await expect(page.getByRole('search').getByRole('button')).toHaveCount(0)
    await expect
      .poll(() => api.calls.some((call) => call.path === '/api/discussions' && call.query.get('size') === '4'))
      .toBe(true)
  })
})
