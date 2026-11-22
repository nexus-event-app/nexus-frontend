export const COVER_PHOTOS = {
  ai: ['/images/news/ai-1.webp', '/images/news/ai-2.webp', '/images/news/ai-3.webp', '/images/news/ai-4.webp'],
  security: ['/images/news/security-1.webp', '/images/news/security-2.webp', '/images/news/security-3.webp'],
  bugs: ['/images/news/bugs-1.webp', '/images/news/bugs-2.webp', '/images/news/bugs-3.webp'],
  cloud: ['/images/news/cloud-1.webp', '/images/news/cloud-2.webp', '/images/news/cloud-3.webp'],
  terminal: ['/images/news/terminal-1.webp', '/images/news/terminal-2.webp', '/images/news/terminal-3.webp'],
  data: ['/images/news/data-1.webp', '/images/news/data-2.webp'],
  mobile: ['/images/news/mobile-1.webp', '/images/news/mobile-2.webp', '/images/news/mobile-3.webp'],
  web: ['/images/news/web-1.webp', '/images/news/web-2.webp', '/images/news/web-3.webp'],
  code: [
    '/images/news/code-1.webp',
    '/images/news/code-2.webp',
    '/images/news/code-3.webp',
    '/images/news/code-4.webp',
    '/images/news/code-5.webp',
  ],
  career: [
    '/images/news/career-1.webp',
    '/images/news/career-2.webp',
    '/images/news/career-3.webp',
    '/images/news/career-4.webp',
  ],
  learning: [
    '/images/news/learning-1.webp',
    '/images/news/learning-2.webp',
    '/images/news/learning-3.webp',
    '/images/news/learning-4.webp',
  ],
  business: ['/images/news/business-1.webp', '/images/news/business-2.webp', '/images/news/business-3.webp'],
  community: ['/images/news/community-1.webp', '/images/news/community-2.webp', '/images/news/community-3.webp'],
}

export const RELATED_TOPICS = {
  ai: ['code', 'community'],
  security: ['terminal', 'bugs'],
  bugs: ['terminal', 'code'],
  cloud: ['data', 'terminal'],
  terminal: ['code', 'bugs'],
  data: ['business', 'code'],
  mobile: ['web', 'career'],
  web: ['code', 'learning'],
  code: ['terminal', 'web'],
  career: ['community', 'business'],
  learning: ['community', 'code'],
  business: ['community', 'career'],
  community: ['career', 'learning'],
}

export const CATEGORY_TOPICS = {
  IA: ['ai', 'code'],
  PROGRAMACION: ['code', 'terminal', 'web'],
  DATOS: ['data', 'code'],
  CIBERSEGURIDAD: ['security', 'bugs'],
  SISTEMAS: ['cloud', 'terminal'],
  CARRERA: ['career', 'community'],
  GENERAL: ['code', 'community', 'business', 'learning'],
}
