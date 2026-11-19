import { expect, test } from './fixtures.js'

test.describe('Eventos', () => {
  test('la agenda separa los eventos para todo el mundo y los de mujeres, con su enlace para apuntarse', async ({
    page,
  }) => {
    await page.goto('/eventos')
    await expect(page.getByRole('heading', { level: 1, name: 'No te pierdas ninguna oportunidad' })).toBeVisible()

    const general = page.getByRole('region', { name: 'Para todo el mundo' })
    // Seis por página (dos filas de tres) y paginación propia.
    await expect(general.getByRole('article')).toHaveCount(6)
    await expect(general.getByRole('navigation', { name: 'Páginas de «Para todo el mundo»' })).toBeVisible()
    const meetup = general.getByRole('article', { name: 'Meetup de React en Valencia' })
    await expect(meetup).toContainText('Valencia')
    await expect(meetup).toContainText('Las Naves, Carrer de Joan Verdeguer, 16')
    await expect(meetup.getByRole('link', { name: /Apuntarme/ })).toHaveAttribute(
      'href',
      'https://www.meetup.com/react-valencia/events/1/',
    )
    await expect(meetup.getByRole('link', { name: /Apuntarme/ })).toHaveAttribute('target', '_blank')

    const women = page.getByRole('region', { name: 'Por y para mujeres' })
    await expect(women.getByRole('article')).toHaveCount(1)
    await expect(women.getByRole('article', { name: 'Café tech de mujeres en Barcelona' })).toBeVisible()
  })

  test('cabecera: los tres pasos bajo la entradilla y «Compartir un evento» bajo el calendario', async ({ page }) => {
    await page.goto('/eventos')
    const intro = await page.getByText(/^Charlas, meetups, hackathons/).boundingBox()
    const steps = await page.getByRole('region', { name: 'Cómo funciona' }).boundingBox()
    const calendar = await page.getByRole('region', { name: /de 20\d\d/ }).boundingBox()
    const share = await page.getByRole('main').getByRole('link', { name: 'Compartir un evento' }).first().boundingBox()
    expect(steps.y).toBeGreaterThan(intro.y + intro.height - 1)
    expect(share.y).toBeGreaterThan(calendar.y + calendar.height - 1)
  })

  test('la paginación de cada bloque va por su cuenta', async ({ page }) => {
    await page.goto('/eventos')
    const general = page.getByRole('region', { name: 'Para todo el mundo' })
    await general
      .getByRole('navigation', { name: /Páginas/ })
      .getByRole('link', { name: '2' })
      .click()
    await expect(page).toHaveURL(/pg=2/)
    await expect(general.getByRole('article')).toHaveCount(2)
    await expect(page.getByRole('region', { name: 'Por y para mujeres' }).getByRole('article')).toHaveCount(1)
  })

  test('el calendario marca los días con eventos y, al pulsar uno, la agenda enseña los de ese día', async ({
    page,
    api,
  }) => {
    // Con un día elegido en la dirección, el calendario abre en ese mes (marzo de 2099, el de los datos de prueba).
    await page.goto('/eventos?dia=2099-03-12')
    const calendar = page.getByRole('region', { name: /marzo de 2099/i })
    await expect(calendar.getByRole('button', { name: /12 de marzo: 1 evento/ })).toHaveAttribute(
      'aria-pressed',
      'true',
    )
    await calendar.getByRole('button', { name: /15 de marzo: 1 evento/ }).click()
    await expect(page).toHaveURL(/dia=2099-03-15/)
    await expect
      .poll(() => api.calls.some((call) => call.path === '/api/events' && call.query.get('day') === '2099-03-15'))
      .toBe(true)
    await expect(page.getByRole('region', { name: 'Por y para mujeres' }).getByRole('article')).toHaveCount(1)
    await expect(page.getByRole('region', { name: 'Para todo el mundo' })).toContainText(
      'No hay eventos con estos filtros',
    )
    // Quitar el día.
    await page.getByRole('link', { name: /Quitar el filtro del 15 de marzo/ }).click()
    await expect(page).not.toHaveURL(/dia=/)
  })

  test('el filtro de ciudad solo ofrece ciudades con eventos y filtra la agenda', async ({ page, api }) => {
    await page.goto('/eventos')
    const city = page.getByLabel('Ciudad')
    await expect(city.locator('option')).toHaveText(['Todas las ciudades', 'Barcelona', 'Valencia'])
    await city.selectOption('Valencia')
    await expect(page).toHaveURL(/ciudad=Valencia/)
    await expect
      .poll(() => api.calls.some((call) => call.path === '/api/events' && call.query.get('city') === 'Valencia'))
      .toBe(true)
    await expect(page.getByRole('region', { name: 'Para todo el mundo' }).getByRole('article')).toHaveCount(1)
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
    // Si se pega la dirección en la ciudad, pide solo la ciudad.
    await page.getByLabel(/^Ciudad/).fill('Calle de Cronos, 63 · Madrid')
    await page.getByRole('button', { name: 'Compartir evento' }).click()
    await expect(page.getByText(/Pon solo la ciudad/)).toBeVisible()
    await page.getByLabel(/^Ciudad/).fill('Madrid')
    await page.getByLabel(/Dirección/).fill('Calle de Cronos, 63')
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
      address: 'Calle de Cronos, 63',
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

  test('«Voy» enseña cuánta gente va y, con sesión, se marca', async ({ page, api, signedIn }) => {
    expect(signedIn.id).toBe(7)
    await page.goto('/eventos')
    const meetup = page.getByRole('article', { name: 'Meetup de React en Valencia' })
    const going = meetup.getByRole('button', { name: /^Voy a «Meetup de React en Valencia»/ })
    await expect(going).toHaveText(/Voy\s*· 12/)
    await expect(going).toHaveAttribute('aria-pressed', 'false')
    await going.click()
    await expect(going).toHaveAttribute('aria-pressed', 'true')
    await expect(going).toHaveText(/· 13/)
    expect(api.calls.some((call) => call.method === 'POST' && call.path === '/api/events/51/interest')).toBe(true)
    // Sin nadie apuntado todavía, solo «Voy», sin número.
    const hackathon = page.getByRole('article', { name: 'Hackathon online para principiantes' })
    await expect(hackathon.getByRole('button', { name: /^Voy a/ })).not.toHaveText(/·/)
  })

  test('sin sesión, «Voy» pide iniciar sesión', async ({ page, api }) => {
    await page.goto('/eventos')
    await page
      .getByRole('article', { name: 'Meetup de React en Valencia' })
      .getByRole('button', { name: /^Voy a/ })
      .click()
    await expect(page.getByText('Inicia sesión para marcar que vas.')).toBeVisible()
    expect(api.calls.some((call) => call.path.endsWith('/interest'))).toBe(false)
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
