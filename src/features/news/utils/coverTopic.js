/**
 * Tema de una noticia a partir de su titular (en castellano, catalán o inglés), para elegir el icono y la
 * etiqueta de su portada por defecto. Gana el primer tema que encaje: los más concretos van primero.
 */
const TOPICS = [
  ['ai', ['sparkles', 'chat', 'computer', 'rocket'], /\b(ia|ai|a\.i\.|intel·lig[eè]ncia artificial|inteligencia artificial|artificial intelligence|llms?|gpt|chatgpt|openai|claude|gemini|copilot|mistral|agentes?|agents?|machine learning|deep learning|prompts?)\b/],
  ['security', ['shield', 'lock', 'ban'], /\b(seguridad|seguretat|security|ciberseguridad|cybersecurity|hackers?|hackeo\w*|hacked|hacking|bug bounty|malware|ransomware|phishing|scams?|estafas?|fraud\w*|vulnerab\w*|passwords?|contraseñas?|privacidad|privacy)\b/],
  ['bugs', ['bug', 'warning', 'terminal'], /\b(errors?|errores|bugs?|debug\w*|depura\w*|fix(es|ing)?|crash\w*)\b/],
  ['cloud', ['cloud', 'dashboard', 'refresh'], /\b(cloud|nube|núvol|aws|azure|gcp|docker|kubernetes|k8s|devops|servidor(es)?|servers?|iaas|paas|serverless|deploy\w*|despliegue)\b/],
  ['web', ['globe', 'code', 'search'], /\b(html|css|web|websites?|webs|seo|navegador(es)?|browsers?|frontend|front-end|accesibilidad|accessibility|ux|ui)\b/],
  ['terminal', ['terminal', 'code'], /\b(git|github|gitlab|terminal|bash|zsh|powershell|linux|shell|comandos?|commands?|cli|vim)\b/],
  ['data', ['database', 'chart', 'dashboard'], /\b(sql|postgres\w*|mysql|mongodb|bases? de datos|databases?|datos|dades|data|python|pandas|excel|analytics|analítica)\b/],
  ['mobile', ['phone', 'camera'], /\b(android|ios|iphone|ipad|móvil(es)?|mòbil|mobile|apps?|flutter|kotlin|swift)\b/],
  ['code', ['code', 'terminal', 'computer'], /\b(javascript|typescript|js|ts|react|vue|angular|node(\.js)?|java|spring|cpp|compilers?|compiladores?|php|rust|go|programa\w*|coding|code|código|codi|developers?|desarrollador\w*)\b/],
  ['career', ['briefcase', 'users', 'building'], /\b(empleo|trabajo|feina|jobs?|carrera|career|entrevistas?|interviews?|cv|currículum|resume|salarios?|salary|laboral|junior|prácticas|internships?|hiring|contratación|freelance)\b/],
  ['learning', ['academic', 'document', 'bookmark'], /\b(aprende\w*|aprèn\w*|learn\w*|cursos?|courses?|tutorial(es)?|guías?|guides?|principiantes?|beginners?|bootcamps?|estudia\w*|certifica\w*|cheat ?sheet)\b/],
  ['business', ['chart', 'building', 'rocket'], /\b(negocios?|business|startups?|empresas?|marketing|ventas|sales|leads?|clientes|customers?|mercado|market|crypto\w*|trading)\b/],
]

const CATEGORY_ICONS = {
  DESARROLLO: ['code', 'terminal', 'rocket'],
  ENTREVISTAS: ['chat', 'users'],
  NETWORKING: ['users', 'chat'],
  RECURSOS: ['academic', 'document', 'bookmark'],
  GENERAL: ['newspaper', 'rocket', 'sparkles'],
}

/** Hash pequeño y estable: la misma noticia tiene siempre la misma portada. */
export function hashOf(value) {
  let hash = 0
  for (const char of String(value ?? '')) hash = (hash * 31 + char.codePointAt(0)) >>> 0
  return hash
}

export function coverTopic(title, category, seed) {
  const text = String(title ?? '').toLowerCase()
  const match = TOPICS.find(([, , pattern]) => pattern.test(text))
  const icons = match ? match[1] : (CATEGORY_ICONS[category] ?? CATEGORY_ICONS.GENERAL)
  return {
    topic: match ? match[0] : null,
    icon: icons[seed % icons.length],
    // Icono grande y difuminado del fondo: otro del mismo tema, si lo hay.
    backdrop: icons[(seed + 1) % icons.length],
  }
}
