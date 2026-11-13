import { expect, expectAccessible, test } from './fixtures.js'
import { page as pageOf, savedJobs } from './data.js'

const json = (body) => ({ status: 200, contentType: 'application/json', body: JSON.stringify(body) })

test.describe('Ofertas guardadas', () => {
  test.beforeEach(async ({ api, signedIn }) => {
    expect(signedIn.id).toBeDefined()
    api.on('GET', '/api/saved-jobs', () => json(pageOf(savedJobs)))
    api.on('GET', '/api/saved-jobs/ids', () => json(savedJobs.map((item) => item.job.id)))
  })

  test('muestra las ofertas, la que ya no está disponible y los consejos al lado', async ({ page }) => {
    await page.goto('/empleo/guardadas')
    const list = page.getByRole('region', { name: 'Tus ofertas' })
    await expect(list.getByRole('heading', { name: 'Desarrollador/a frontend junior' })).toBeVisible()
    await expect(list.getByText('Esta oferta ya no está disponible')).toBeVisible()
    const tips = page.getByRole('complementary', { name: 'Consejos' })
    await expect(tips.getByRole('listitem')).toHaveCount(4)
    await tips.getByRole('link', { name: 'Ver más ofertas' }).click()
    await expect(page).toHaveURL(/\/empleo$/)
  })

  for (const theme of ['light', 'dark']) {
    test(`cumple WCAG 2.2 AA en tema ${theme === 'light' ? 'claro' : 'oscuro'}`, async ({ page }) => {
      await page.emulateMedia({ colorScheme: theme })
      await page.goto('/empleo/guardadas')
      await expect(page.locator('main [aria-busy="true"]')).toHaveCount(0)
      await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1)
      await expect(page.locator('div:not(#root)')).toHaveCount(0)
      await expectAccessible(page)
    })
  }
})
