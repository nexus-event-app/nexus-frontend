import { expect, test } from './fixtures.js'

test.describe('Eventos', () => {
  test('la agenda separa los eventos para todo el mundo y los de mujeres, con su enlace para apuntarse', async ({
    page,
  }) => {
    await page.goto('/eventos')
    await expect(page.getByRole('heading', { level: 1, name: 'No te pierdas ninguna oportunidad' })).toBeVisible()

    const general = page.getByRole('region', { name: 'Para todo el mundo' })
    await expect(general.getByRole('article')).toHaveCount(2)
    const meetup = general.getByRole('article', { name: 'Meetup de React en Valencia' })
    await expect(meetup).toContainText('Valencia')
    await expect(meetup.getByRole('link', { name: /Apuntarme/ })).toHaveAttribute(
      'href',
      'https://www.meetup.com/react-valencia/events/1/',
    )
    await expect(meetup.getByRole('link', { name: /Apuntarme/ })).toHaveAttribute('target', '_blank')

    const women = page.getByRole('region', { name: 'Por y para mujeres' })
    await expect(women.getByRole('article')).toHaveCount(1)
    await expect(women.getByRole('article', { name: 'Café tech de mujeres en Barcelona' })).toBeVisible()
  })

  test('el filtro de modalidad pide solo los eventos online', async ({ page, api }) => {
    await page.goto('/eventos')
    await page
      .getByRole('navigation', { name: 'Filtrar eventos por modalidad' })
      .getByRole('link', { name: 'Online' })
      .click()
    await expect(page).toHaveURL(/modalidad=online/)
    await expect
      .poll(() => api.calls.some((call) => call.path === '/api/events' && call.query.get('mode') === 'ONLINE'))
      .toBe(true)
  })

  test('compartir un evento: se valida, se envía y vuelve a la agenda', async ({ page, api, signedIn }) => {
    expect(signedIn.id).toBe(7)
    await page.goto('/eventos/nuevo')
    await page.getByRole('button', { name: 'Compartir evento' }).click()
    await expect(page.getByText('Pon el enlace para apuntarse; debe empezar por https://')).toBeVisible()

    await page.getByLabel(/Enlace para apuntarse/).fill('https://www.meetup.com/python-madrid/events/9/')
    await page.getByLabel(/^Título/).fill('Taller de Python para principiantes')
    await page.getByLabel(/^Fecha/).fill('2099-05-10')
    await page.getByLabel(/Hora/).fill('18:00')
    await page.getByLabel('Presencial').check()
    await page.getByLabel(/^Ciudad/).fill('Madrid')
    await page
      .getByLabel(/Descripción corta/)
      .fill('Taller práctico y gratuito para dar tus primeros pasos con Python.')
    await page.getByLabel(/Es un evento por y para mujeres/).check()
    await page.getByRole('button', { name: 'Compartir evento' }).click()

    await expect(page).toHaveURL(/\/eventos$/)
    await expect(page.getByText('¡Evento compartido! Ya está en la agenda.')).toBeVisible()
    const sent = JSON.parse(api.calls.find((call) => call.method === 'POST' && call.path === '/api/events').body)
    expect(sent).toEqual({
      url: 'https://www.meetup.com/python-madrid/events/9/',
      title: 'Taller de Python para principiantes',
      date: '2099-05-10',
      time: '18:00',
      mode: 'PRESENCIAL',
      city: 'Madrid',
      description: 'Taller práctico y gratuito para dar tus primeros pasos con Python.',
      forWomen: true,
    })
  })

  test('quien compartió un evento puede borrarlo; en los de otras personas sale «Reportar»', async ({
    page,
    api,
    signedIn,
  }) => {
    expect(signedIn.id).toBe(7)
    await page.goto('/eventos')
    const mine = page.getByRole('article', { name: 'Meetup de React en Valencia' })
    await expect(mine.getByRole('button', { name: /Reportar/ })).toHaveCount(0)
    await mine.getByRole('button', { name: /Borrar/ }).click()
    await page.getByRole('dialog', { name: 'Borrar este evento' }).getByRole('button', { name: 'Borrar' }).click()
    await expect(page.getByRole('article', { name: 'Meetup de React en Valencia' })).toHaveCount(0)
    expect(api.calls.some((call) => call.method === 'DELETE' && call.path === '/api/events/51')).toBe(true)

    const other = page.getByRole('article', { name: 'Hackathon online para principiantes' })
    await expect(
      other.getByRole('button', { name: 'Reportar el evento «Hackathon online para principiantes»' }),
    ).toBeVisible()
  })

  test('sin sesión, «Compartir un evento» pide iniciar sesión y vuelve al formulario', async ({ page }) => {
    await page.goto('/eventos')
    await page.getByRole('link', { name: 'Compartir un evento' }).first().click()
    await expect(page).toHaveURL(/\/login\?redirect=%2Feventos%2Fnuevo/)
  })

  test('está en el menú y traducido', async ({ page }) => {
    await page.goto('/en/events')
    await expect(page.getByRole('heading', { level: 1, name: 'Don’t miss a single opportunity' })).toBeVisible()
    await expect(page.getByRole('region', { name: 'By and for women' })).toBeVisible()
  })
})
