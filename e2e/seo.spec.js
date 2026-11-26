import { expect, test } from './fixtures.js'

const pages = [
  ['/', 'Primer Commit | Comunidad para empezar en tech', /empleo junior/],
  ['/empleo', 'Empleo junior y prácticas en tecnología | Primer Commit', /España/],
  ['/eventos', 'Eventos tech: meetups, charlas y hackathons | Primer Commit', /meetups/],
  ['/foro', 'Foro de programación para principiantes | Primer Commit', /comunidad tech junior/],
  ['/noticias', 'Noticias tech para perfiles junior | Primer Commit', /empleo/],
  ['/guias', 'Píldoras tech: guías para empezar en tech | Primer Commit', /primer paso/],
  ['/en/guides', 'Tech bites: guides to get started in tech | Primer Commit', /first step/],
]

test.describe('SEO', () => {
  for (const [path, title, description] of pages) {
    test(`${path} tiene título y descripción con las búsquedas habituales`, async ({ page }) => {
      await page.goto(path)
      await expect(page).toHaveTitle(title)
      await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', description)
    })
  }
})
