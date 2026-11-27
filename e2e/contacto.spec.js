import { expect, test } from './fixtures.js'

test.describe('Contacto', () => {
  test('desde el pie de página se llega al formulario y el mensaje se envía con el motivo elegido', async ({
    page,
  }) => {
    await page.goto('/')
    await page.getByRole('link', { name: 'Contacta con nosotros' }).click()
    await expect(page).toHaveURL(/\/contacto$/)
    await expect(page.getByRole('heading', { level: 1, name: 'Contáctanos' })).toBeVisible()

    await page.getByRole('button', { name: /Ayudar a la comunidad/ }).click()
    await expect(page.getByRole('combobox', { name: /Motivo/ })).toHaveValue('COMMUNITY')
    await page.getByRole('textbox', { name: 'Nombre' }).fill('Oscar')
    await page.getByRole('textbox', { name: /Tu email/ }).fill('oscar@test.com')
    await page.getByRole('textbox', { name: /^Mensaje/ }).fill('Me gustaría ayudar respondiendo dudas en el foro.')
    const request = page.waitForRequest((req) => req.url().endsWith('/api/contact') && req.method() === 'POST')
    await page.getByRole('button', { name: 'Enviar mensaje' }).click()

    expect((await request).postDataJSON()).toMatchObject({
      name: 'Oscar',
      email: 'oscar@test.com',
      reason: 'COMMUNITY',
    })
    await expect(page.getByText('¡Mensaje enviado!')).toBeVisible()
  })
})
