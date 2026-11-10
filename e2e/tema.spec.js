import { expect, test } from './fixtures.js'

test('el tema oscuro se aplica y se recuerda al volver', async ({ page, isMobile }) => {
  await page.emulateMedia({ colorScheme: 'light' })
  await page.goto('/')
  const html = page.locator('html')
  await expect(html).not.toHaveClass(/dark/)

  // En el móvil el botón está dentro del menú.
  if (isMobile) await page.getByRole('button', { name: 'Abrir menú' }).click()
  // El botón recorre automático → claro → oscuro.
  const toggle = page.getByRole('button', { name: /^Tema:/ })
  for (let i = 0; i < 3 && !(await html.getAttribute('class'))?.includes('dark'); i++) await toggle.click()
  await expect(html).toHaveClass(/dark/)

  await page.reload()
  await expect(html).toHaveClass(/dark/)
})
