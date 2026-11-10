import { expect, expectAccessible, test } from './fixtures.js'

const PAGES = [
  '/',
  '/noticias',
  '/noticias/1-novedades-de-react-19',
  '/empleo',
  '/empleo/11-desarrollador-frontend-junior',
  '/foro',
  '/testimonios',
  '/buscar?q=react',
  '/sobre-el-proyecto',
  '/login',
  '/registro',
  '/en/about',
]

for (const theme of ['light', 'dark']) {
  test.describe(`Accesibilidad en tema ${theme === 'light' ? 'claro' : 'oscuro'}`, () => {
    test.use({ colorScheme: theme })

    for (const path of PAGES) {
      test(`${path} cumple WCAG 2.2 AA`, async ({ page }) => {
        await page.goto(path)
        await expect(page.getByRole('main')).toBeVisible()
        await expect(page.getByRole('main')).not.toHaveAttribute('aria-busy', 'true')
        await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1)
        await expect(page.locator('div:not(#root)')).toHaveCount(0)
        await expectAccessible(page)
      })
    }
  })
}
