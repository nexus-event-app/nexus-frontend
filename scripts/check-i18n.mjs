// Comprueba que es, ca y en tienen las mismas claves y las mismas variables {x}.
import { build } from 'esbuild'
import { pathToFileURL } from 'node:url'
import { mkdtempSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

// Los módulos usan importaciones sin extensión: se empaquetan antes de cargarlos.
const out = join(mkdtempSync(join(tmpdir(), 'i18n-')), 'messages.mjs')
await build({ entryPoints: ['src/shared/i18n/messages/index.js'], bundle: true, format: 'esm', outfile: out, logLevel: 'silent' })
const { default: messages } = await import(pathToFileURL(out).href)

const flatten = (object, prefix = '', target = {}) => {
  for (const [key, value] of Object.entries(object)) {
    const path = prefix ? `${prefix}.${key}` : key
    if (value && typeof value === 'object') flatten(value, path, target)
    else target[path] = value
  }
  return target
}
const placeholders = (text) => [...String(text).matchAll(/\{(\w+)\}/g)].map((m) => m[1]).sort().join(',')

const flat = Object.fromEntries(Object.entries(messages).map(([lang, tree]) => [lang, flatten(tree)]))
const base = flat.es
let problems = 0
for (const lang of ['ca', 'en']) {
  for (const key of Object.keys(base)) {
    if (!(key in flat[lang])) { console.error(`[${lang}] falta: ${key}`); problems++ }
    else if (placeholders(base[key]) !== placeholders(flat[lang][key])) { console.error(`[${lang}] variables distintas: ${key}`); problems++ }
    else if (flat[lang][key].trim() === '') { console.error(`[${lang}] vacío: ${key}`); problems++ }
  }
  for (const key of Object.keys(flat[lang])) if (!(key in base)) { console.error(`[${lang}] sobra: ${key}`); problems++ }
}
console.log(`${Object.keys(base).length} claves comprobadas, ${problems} problemas`)
process.exit(problems ? 1 : 0)
