import { expect, expectAccessible, test } from './fixtures.js'
import { jobs, page as pageOf } from './data.js'

const LEVELS = ['JUNIOR', 'INTERN', 'MID']
const MODES = ['HYBRID', 'REMOTE', 'ONSITE']

/** Varias ofertas distintas, para ver la lista completa. */
const manyJobs = Array.from({ length: 6 }, (_, index) => ({
  ...jobs[0],
  id: 200 + index,
  slug: `oferta-${index + 1}`,
  title: `Oferta número ${index + 1}`,
  company: `Empresa ${index + 1}`,
  level: LEVELS[index % 3],
  workMode: MODES[index % 3],
  tags: ['React', 'CSS', 'TypeScript', 'Git'].slice(0, (index % 4) + 1),
}))

test.describe('Página de empleo', () => {
  test('la lista de ofertas es accesible y cada fila lleva a su oferta', async ({ page, api }) => {
    api.on('GET', '/api/jobs', () => ({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(pageOf(manyJobs)),
    }))
    await page.goto('/empleo')
    await expect(page.getByRole('heading', { level: 2, name: /^Oferta número/ })).toHaveCount(manyJobs.length)
    await expect(page.getByRole('link', { name: 'Oferta número 1' })).toHaveAttribute('href', '/empleo/200-oferta-1')
    await expectAccessible(page)
  })

  test('los filtros de nivel y modalidad son enlaces y piden las ofertas filtradas', async ({ page, api }) => {
    await page.goto('/empleo')
    await page
      .getByRole('navigation', { name: 'Filtrar ofertas por nivel' })
      .getByRole('link', { name: 'Prácticas' })
      .click()
    await expect(page).toHaveURL(/nivel=intern/)
    await page
      .getByRole('navigation', { name: 'Filtrar ofertas por modalidad' })
      .getByRole('link', { name: 'Remoto' })
      .click()
    await expect(page).toHaveURL(/modalidad=remote/)
    await expect
      .poll(() =>
        api.calls.some(
          (call) =>
            call.path === '/api/jobs' &&
            call.query.get('level') === 'INTERN' &&
            call.query.get('workMode') === 'REMOTE',
        ),
      )
      .toBe(true)

    await page.getByRole('button', { name: 'Quitar filtros' }).click()
    await expect(page).toHaveURL(/\/empleo$/)
  })
})
