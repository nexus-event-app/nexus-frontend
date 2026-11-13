import { expect, test } from './fixtures.js'
import { englishNews, page as pageOf } from './data.js'

const json = (body) => ({ status: 200, contentType: 'application/json', body: JSON.stringify(body) })

test.describe('Panel · noticias', () => {
  test('«Publicar» conserva el idioma de la noticia (una en inglés no pasa a castellano)', async ({
    page,
    api,
    signedInAdmin,
  }) => {
    expect(signedInAdmin.role).toBe('ADMIN')
    const hidden = { ...englishNews, isActive: false }
    api.on('GET', '/api/admin/news', () => json(pageOf([hidden])))
    api.on('PUT', /^\/api\/admin\/news\/\d+$/, () => json({ ...hidden, isActive: true }))

    await page.goto('/admin/noticias')
    await page.getByRole('button', { name: new RegExp(`Publicar ${hidden.title}`) }).click()

    await expect
      .poll(() => api.calls.find((call) => call.method === 'PUT' && call.path === `/api/admin/news/${hidden.id}`))
      .toBeTruthy()
    const sent = JSON.parse(
      api.calls.find((call) => call.method === 'PUT' && call.path === `/api/admin/news/${hidden.id}`).body,
    )
    expect(sent).toMatchObject({ language: 'en', isActive: true })
  })
})
