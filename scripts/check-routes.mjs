// Comprueba la traducción de rutas entre idiomas (src/shared/i18n/languages.js y routeSegments.js).
import { build } from 'esbuild'
import assert from 'node:assert/strict'
import { mkdtempSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { pathToFileURL } from 'node:url'

// Los módulos usan importaciones sin extensión: se empaquetan antes de cargarlos.
async function load(entry) {
  const outfile = join(mkdtempSync(join(tmpdir(), 'routes-')), 'module.mjs')
  await build({ entryPoints: [entry], bundle: true, format: 'esm', outfile, logLevel: 'silent' })
  return import(pathToFileURL(outfile).href)
}

const { localizePath, stripLang, langFromPath } = await load('src/shared/i18n/languages.js')
const { ROUTE_SEGMENTS, ROUTE_SUBSEGMENTS } = await load('src/shared/i18n/routeSegments.js')

const cases = [
  // [ruta interna, castellano, catalán, inglés]
  ['/', '/', '/ca', '/en'],
  ['/noticias', '/noticias', '/ca/noticies', '/en/news'],
  ['/noticias/12-hola-mundo', '/noticias/12-hola-mundo', '/ca/noticies/12-hola-mundo', '/en/news/12-hola-mundo'],
  ['/empleo?nivel=junior&page=2', '/empleo?nivel=junior&page=2', '/ca/feina?nivel=junior&page=2', '/en/jobs?nivel=junior&page=2'],
  ['/foro/nueva', '/foro/nueva', '/ca/forum/nova', '/en/forum/new'],
  ['/empleo/guardadas', '/empleo/guardadas', '/ca/feina/desades', '/en/jobs/saved'],
  ['/perfil/editar', '/perfil/editar', '/ca/perfil/edita', '/en/profile/edit'],
  ['/buscar?q=react', '/buscar?q=react', '/ca/cerca?q=react', '/en/search?q=react'],
  ['/perfil/7-ana-garcia', '/perfil/7-ana-garcia', '/ca/perfil/7-ana-garcia', '/en/profile/7-ana-garcia'],
  ['/foro/5-mi-duda#comentarios', '/foro/5-mi-duda#comentarios', '/ca/forum/5-mi-duda#comentarios', '/en/forum/5-mi-duda#comentarios'],
  ['/testimonios', '/testimonios', '/ca/testimonis', '/en/testimonials'],
  ['/aviso-legal', '/aviso-legal', '/ca/avis-legal', '/en/legal-notice'],
  ['/cookies', '/cookies', '/ca/galetes', '/en/cookies'],
  ['/registro', '/registro', '/ca/registre', '/en/sign-up'],
  ['/verificar-email?token=abc', '/verificar-email?token=abc', '/ca/verifica-correu?token=abc', '/en/verify-email?token=abc'],
  ['/?q=react', '/?q=react', '/ca?q=react', '/en?q=react'],
]

let checks = 0
for (const [internal, es, ca, en] of cases) {
  const expected = { es, ca, en }
  for (const lang of ['es', 'ca', 'en']) {
    assert.equal(localizePath(internal, lang), expected[lang], `${internal} → ${lang}`)
    // De cualquier versión a cualquier otra, y vuelta a la interna.
    for (const from of ['es', 'ca', 'en']) assert.equal(localizePath(expected[from], lang), expected[lang], `${expected[from]} → ${lang}`)
    assert.equal(stripLang(expected[lang]), internal, `${expected[lang]} → interna`)
    assert.equal(langFromPath(expected[lang]), lang, `idioma de ${expected[lang]}`)
    checks += 5
  }
}

// Direcciones antiguas: la sección en castellano dentro de /ca o /en se traduce.
assert.equal(localizePath('/en/foro/5-mi-duda', 'en'), '/en/forum/5-mi-duda')
assert.equal(localizePath('/ca/empleo', 'ca'), '/ca/feina')
assert.equal(localizePath('/en/foro/nueva', 'en'), '/en/forum/new')
// El panel de admin y las rutas desconocidas no se tocan; los destinos relativos tampoco.
assert.equal(localizePath('/admin/noticias', 'en'), '/admin/noticias')
assert.equal(localizePath('/no-existe', 'en'), '/en/no-existe')
assert.equal(localizePath('?page=2', 'en'), '?page=2')
checks += 6

// Cada sección tiene traducción a todos los idiomas, sin duplicados dentro de un mismo idioma.
for (const lang of ['ca', 'en']) {
  const values = Object.values(ROUTE_SEGMENTS).map((t) => t[lang])
  assert.equal(new Set(values).size, values.length, `secciones duplicadas en ${lang}`)
  assert.ok(values.every((v) => /^[a-z0-9-]+$/.test(v)), `secciones con caracteres no válidos en ${lang}`)
  for (const sub of Object.values(ROUTE_SUBSEGMENTS)) assert.ok(Object.values(sub).every((t) => t[lang]), `subsección sin ${lang}`)
  checks += 3
}

console.log(`${checks} comprobaciones de rutas, 0 problemas`)
