/**
 * Tema de una noticia a partir de su titular (en castellano, catalán o inglés), para elegir la foto de su
 * portada por defecto. Gana el primer tema que encaje: los más concretos van primero.
 */
const TOPICS = [
  ['ai', /\b(ia|ai|a\.i\.|intel·lig[eè]ncia artificial|inteligencia artificial|artificial intelligence|llms?|gpt|chatgpt|openai|claude|gemini|copilot|mistral|agentes?|agents?|machine learning|deep learning|prompts?)\b/],
  ['security', /\b(seguridad|seguretat|security|ciberseguridad|cybersecurity|hackers?|hackeo\w*|hacked|hacking|bug bounty|malware|ransomware|phishing|scams?|estafas?|fraud\w*|vulnerab\w*|passwords?|contraseñas?|privacidad|privacy)\b/],
  ['bugs', /\b(errors?|errores|bugs?|debug\w*|depura\w*|fix(es|ing)?|crash\w*)\b/],
  ['cloud', /\b(cloud|nube|núvol|aws|azure|gcp|docker|kubernetes|k8s|devops|servidor(es)?|servers?|iaas|paas|serverless|deploy\w*|despliegue)\b/],
  ['web', /\b(html|css|web|websites?|webs|seo|navegador(es)?|browsers?|frontend|front-end|accesibilidad|accessibility|ux|ui)\b/],
  ['terminal', /\b(git|github|gitlab|terminal|bash|zsh|powershell|linux|shell|comandos?|commands?|cli|vim)\b/],
  ['data', /\b(sql|postgres\w*|mysql|mongodb|bases? de datos|databases?|datos|dades|data|python|pandas|excel|analytics|analítica)\b/],
  ['mobile', /\b(android|ios|iphone|ipad|móvil(es)?|mòbil|mobile|apps?|flutter|kotlin|swift)\b/],
  ['code', /\b(javascript|typescript|js|ts|react|vue|angular|node(\.js)?|java|spring|cpp|compilers?|compiladores?|php|rust|go|programa\w*|coding|code|código|codi|developers?|desarrollador\w*)\b/],
  ['career', /\b(empleo|trabajo|feina|jobs?|carrera|career|entrevistas?|interviews?|cv|currículum|resume|salarios?|salary|laboral|junior|prácticas|internships?|hiring|contratación|freelance)\b/],
  ['learning', /\b(aprende\w*|aprèn\w*|learn\w*|cursos?|courses?|tutorial(es)?|guías?|guides?|principiantes?|beginners?|bootcamps?|estudia\w*|certifica\w*|cheat ?sheet)\b/],
  ['business', /\b(negocios?|business|startups?|empresas?|marketing|ventas|sales|leads?|clientes|customers?|mercado|market|crypto\w*|trading)\b/],
]

/** Hash pequeño y estable: la misma noticia tiene siempre la misma portada. */
export function hashOf(value) {
  let hash = 0
  for (const char of String(value ?? '')) hash = (hash * 31 + char.codePointAt(0)) >>> 0
  return hash
}

/** Tema del titular («ai», «security»...) o null si no encaja con ninguno. */
export function coverTopic(title) {
  const text = String(title ?? '').toLowerCase()
  return TOPICS.find(([, pattern]) => pattern.test(text))?.[0] ?? null
}
