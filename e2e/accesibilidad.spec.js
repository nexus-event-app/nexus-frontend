import { expect, expectAccessible, test } from './fixtures.js'

const PAGES = [
  '/',
  // Un perfil visto por otra persona (sin sesión).
  '/perfil/7-lucia-prueba',
  '/noticias',
  '/noticias/1-novedades-de-react-19',
  '/noticias/3-what-is-new-in-react-19',
  '/empleo',
  '/empleo/11-desarrollador-frontend-junior',
  '/foro',
  '/foro/21-por-donde-empiezo-con-java',
  '/testimonios',
  '/buscar?q=react',
  '/sobre-el-proyecto',
  '/rutas',
  '/rutas/frontend',
  '/en/learning-paths/data',
  '/login',
  '/registro',
  '/en/about',
]

const PRIVATE_PAGES = [
  '/notificaciones',
  '/foro/21-por-donde-empiezo-con-java',
  '/rutas/ia',
  // El perfil propio: con «Editar perfil» y todos los datos rellenos.
  '/perfil/7-lucia-prueba',
]

for (const theme of ['light', 'dark']) {
  test.describe(`Accesibilidad en tema ${theme === 'light' ? 'claro' : 'oscuro'}`, () => {
    test.use({ colorScheme: theme })

    for (const path of PAGES) {
      test(`${path} cumple WCAG 2.2 AA`, async ({ page }) => {
        await page.goto(path)
        await expect(page.getByRole('main')).toBeVisible()
        await expect(page.getByRole('main')).not.toHaveAttribute('aria-busy', 'true')
        // Apartados que cargan aparte (p. ej. las discusiones del perfil): axe no debe pasar a mitad de su animación.
        await expect(page.locator('main [aria-busy="true"]')).toHaveCount(0)
        await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1)
        await expect(page.locator('div:not(#root)')).toHaveCount(0)
        await expectAccessible(page)
      })
    }

    // Páginas que solo ve quien tiene sesión iniciada.
    for (const path of PRIVATE_PAGES) {
      test(`${path} (con sesión) cumple WCAG 2.2 AA`, async ({ page, signedIn }) => {
        expect(signedIn.id).toBeDefined()
        await page.goto(path)
        await expect(page.getByRole('main')).not.toHaveAttribute('aria-busy', 'true')
        await expect(page.getByRole('main').getByRole('list').first()).toBeVisible()
        // Apartados que cargan aparte (p. ej. las discusiones del perfil): axe no debe pasar a mitad de su animación.
        await expect(page.locator('main [aria-busy="true"]')).toHaveCount(0)
        await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1)
        await expect(page.locator('div:not(#root)')).toHaveCount(0)
        await expectAccessible(page)
      })
    }
  })
}
