/** Datos de prueba con la misma forma que las respuestas del backend (dto/response). */

const DATE = '2026-11-02T10:00:00'

export const user = {
  id: 7,
  name: 'Lucía Prueba',
  email: 'lucia@example.com',
  role: 'USER',
  enabled: true,
  emailVerified: true,
  avatarUrl: null,
  createdAt: DATE,
}

export const news = [
  {
    id: 1,
    slug: 'novedades-de-react-19',
    title: 'Novedades de React 19 para quien empieza',
    content: 'React 19 trae mejoras en los formularios y en la carga de datos. Repasamos lo más útil.',
    sourceUrl: null,
    imageUrl: null,
    author: 'Redacción',
    category: 'DESARROLLO',
    source: null,
    imported: false,
    isActive: true,
    createdAt: DATE,
    updatedAt: DATE,
  },
  {
    id: 2,
    slug: 'como-preparar-tu-primera-entrevista',
    title: 'Cómo preparar tu primera entrevista técnica',
    content: 'Consejos prácticos para llegar con calma y demostrar lo que sabes.',
    sourceUrl: null,
    imageUrl: null,
    author: 'Redacción',
    category: 'ENTREVISTAS',
    source: null,
    imported: false,
    isActive: true,
    createdAt: DATE,
    updatedAt: DATE,
  },
]

export const jobs = [
  {
    id: 11,
    slug: 'desarrollador-frontend-junior',
    title: 'Desarrollador/a frontend junior',
    company: 'Acme Software',
    description: 'Buscamos una persona con ganas de aprender React y accesibilidad.',
    location: 'Barcelona',
    workMode: 'HYBRID',
    contractType: 'FULL_TIME',
    level: 'JUNIOR',
    tags: ['React', 'CSS'],
    applyUrl: 'https://example.com/ofertas/11',
    source: null,
    imported: false,
    isActive: true,
    publishedAt: DATE,
    expiresAt: null,
    createdAt: DATE,
    updatedAt: DATE,
  },
]

export const discussions = [
  {
    id: 21,
    slug: 'por-donde-empiezo-con-java',
    title: '¿Por dónde empiezo con Java?',
    content: 'Estoy terminando un bootcamp y quiero reforzar Java. ¿Qué me recomendáis?',
    category: 'AYUDA_TECNICA',
    authorId: 7,
    authorName: 'Lucía Prueba',
    authorAvatarUrl: null,
    isActive: true,
    commentCount: 2,
    likesCount: 3,
    isLikedByCurrentUser: false,
    createdAt: DATE,
    updatedAt: DATE,
  },
]

export const testimonials = [
  {
    id: 31,
    name: 'Marta Ejemplo',
    role: 'Desarrolladora junior',
    location: 'Valencia',
    content: 'Aquí encontré mi primer empleo y gente que me ayudó cuando me atascaba.',
    authorId: null,
    authorAvatarUrl: null,
    isActive: true,
    isPending: false,
    isHighlighted: true,
    createdAt: DATE,
    updatedAt: DATE,
  },
]

export function page(content) {
  return { content, page: 0, size: 12, totalElements: content.length, totalPages: 1, last: true }
}

export function searchResult({ newsItems = news, jobItems = jobs, discussionItems = discussions, people = [] } = {}) {
  const group = (items) => ({ items, total: items.length })
  return { news: group(newsItems), jobs: group(jobItems), discussions: group(discussionItems), people: group(people) }
}
