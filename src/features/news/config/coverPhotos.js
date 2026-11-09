/**
 * Fotos de portada para las noticias sin imagen propia, agrupadas por tema. Están en public/images/news,
 * reducidas a 960×540 en WebP. Son de Unsplash (https://unsplash.com/license): uso libre y gratuito, también
 * comercial, sin atribución obligatoria. Al lado de cada una, su identificador por si hay que localizarla.
 */
export const COVER_PHOTOS = {
  ai: [
    '/images/news/ai-1.webp', // unsplash photo-1485827404703-89b55fcc595e
    '/images/news/ai-2.webp', // unsplash photo-1677442136019-21780ecad995
    '/images/news/ai-3.webp', // unsplash photo-1526374965328-7f61d4dc18c5
    '/images/news/ai-4.webp', // unsplash photo-1550751827-4bd374c3f58b
  ],
  security: [
    '/images/news/security-1.webp', // unsplash photo-1550439062-609e1531270e
    '/images/news/security-2.webp', // unsplash photo-1531297484001-80022131f5a1
    '/images/news/security-3.webp', // unsplash photo-1526374965328-7f61d4dc18c5
  ],
  bugs: [
    '/images/news/bugs-1.webp', // unsplash photo-1461749280684-dccba630e2f6
    '/images/news/bugs-2.webp', // unsplash photo-1515879218367-8466d910aaa4
    '/images/news/bugs-3.webp', // unsplash photo-1504639725590-34d0984388bd
  ],
  cloud: [
    '/images/news/cloud-1.webp', // unsplash photo-1558494949-ef010cbdcc31
    '/images/news/cloud-2.webp', // unsplash photo-1544197150-b99a580bb7a8
    '/images/news/cloud-3.webp', // unsplash photo-1451187580459-43490279c0fa
  ],
  terminal: [
    '/images/news/terminal-1.webp', // unsplash photo-1488590528505-98d2b5aba04b
    '/images/news/terminal-2.webp', // unsplash photo-1555066931-4365d14bab8c
    '/images/news/terminal-3.webp', // unsplash photo-1607799279861-4dd421887fb3
  ],
  data: [
    '/images/news/data-1.webp', // unsplash photo-1551288049-bebda4e38f71
    '/images/news/data-2.webp', // unsplash photo-1460925895917-afdab827c52f
  ],
  mobile: [
    '/images/news/mobile-1.webp', // unsplash photo-1512941937669-90a1b58e7e9c
    '/images/news/mobile-2.webp', // unsplash photo-1551650975-87deedd944c3
    '/images/news/mobile-3.webp', // unsplash photo-1563986768609-322da13575f3
  ],
  web: [
    '/images/news/web-1.webp', // unsplash photo-1542831371-29b0f74f9713
    '/images/news/web-2.webp', // unsplash photo-1593720213428-28a5b9e94613
    '/images/news/web-3.webp', // unsplash photo-1498050108023-c5249f4df085
  ],
  code: [
    '/images/news/code-1.webp', // unsplash photo-1517694712202-14dd9538aa97
    '/images/news/code-2.webp', // unsplash photo-1587620962725-abab7fe55159
    '/images/news/code-3.webp', // unsplash photo-1537432376769-00f5c2f4c8d2
    '/images/news/code-4.webp', // unsplash photo-1580894894513-541e068a3e2b
    '/images/news/code-5.webp', // unsplash photo-1484417894907-623942c8ee29
  ],
  career: [
    '/images/news/career-1.webp', // unsplash photo-1600880292203-757bb62b4baf
    '/images/news/career-2.webp', // unsplash photo-1573496359142-b8d87734a5a2
    '/images/news/career-3.webp', // unsplash photo-1531482615713-2afd69097998
    '/images/news/career-4.webp', // unsplash photo-1573164713714-d95e436ab8d6
  ],
  learning: [
    '/images/news/learning-1.webp', // unsplash photo-1434030216411-0b793f4b4173
    '/images/news/learning-2.webp', // unsplash photo-1516321318423-f06f85e504b3
    '/images/news/learning-3.webp', // unsplash photo-1501504905252-473c47e087f8
    '/images/news/learning-4.webp', // unsplash photo-1556761175-5973dc0f32e7
  ],
  business: [
    '/images/news/business-1.webp', // unsplash photo-1552664730-d307ca884978
    '/images/news/business-2.webp', // unsplash photo-1521737604893-d14cc237f11d
    '/images/news/business-3.webp', // unsplash photo-1519389950473-47ba0277781c
  ],
  community: [
    '/images/news/community-1.webp', // unsplash photo-1522071820081-009f0129c71c
    '/images/news/community-2.webp', // unsplash photo-1517245386807-bb43f82c33c4
    '/images/news/community-3.webp', // unsplash photo-1504384308090-c894fdcc538d
  ],
}

/** Fotos de temas parecidos que también valen para cada tema, para que no se repitan tanto. */
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

/** Si el titular no deja claro el tema, se elige por la categoría de la noticia. */
export const CATEGORY_TOPICS = {
  DESARROLLO: ['code', 'terminal', 'web'],
  ENTREVISTAS: ['career', 'community'],
  NETWORKING: ['community', 'business'],
  RECURSOS: ['learning', 'code'],
  GENERAL: ['code', 'community', 'business', 'learning'],
}
