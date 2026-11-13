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

/** Perfil público de la persona con sesión (Lucía), con todos sus datos rellenos. */
export const profile = {
  id: 7,
  name: 'Lucía Prueba',
  slug: 'lucia-prueba',
  avatarUrl: null,
  headline: 'Estudiante de DAW, buscando mis primeras prácticas',
  bio: 'Aprendo React y accesibilidad. Me encanta preguntar en el foro y ayudar a quien empieza.',
  technologies: ['React', 'JavaScript', 'CSS', 'Git'],
  githubUrl: 'https://github.com/ejemplo',
  linkedinUrl: 'https://www.linkedin.com/in/ejemplo',
  memberSince: DATE,
  discussionCount: 1,
  testimonialCount: 1,
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

// Noticia importada de una fuente en inglés.
export const englishNews = {
  id: 3,
  slug: 'what-is-new-in-react-19',
  title: 'What is new in React 19',
  content: 'A quick tour of the features that matter most when you are starting out.',
  sourceUrl: 'https://example.com/react-19',
  imageUrl: null,
  author: null,
  category: 'DESARROLLO',
  source: 'DEV Community',
  language: 'en',
  imported: true,
  isActive: true,
  createdAt: DATE,
  updatedAt: DATE,
}

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

/** Ofertas guardadas: una publicada y otra que ya no lo está (se muestra apagada, solo para quitarla). */
export const savedJobs = [
  { job: jobs[0], available: true, savedAt: DATE },
  {
    job: {
      ...jobs[0],
      id: 12,
      slug: 'qa-tester-junior',
      title: 'QA tester junior',
      company: 'Pruebas SL',
      isActive: false,
    },
    available: false,
    savedAt: DATE,
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

export const comments = [
  {
    id: 5,
    content: 'Empieza por un curso gratuito de Java y haz un proyecto pequeño con Spring Boot.',
    discussionId: 21,
    authorId: 9,
    authorName: 'Marta Ejemplo',
    authorAvatarUrl: null,
    likesCount: 1,
    isLikedByCurrentUser: false,
    createdAt: DATE,
    updatedAt: DATE,
  },
  {
    id: 6,
    content: '¡Gracias! Me apunto el consejo.',
    discussionId: 21,
    authorId: 7,
    authorName: 'Lucía Prueba',
    authorAvatarUrl: null,
    likesCount: 0,
    isLikedByCurrentUser: false,
    createdAt: DATE,
    updatedAt: DATE,
  },
]

export const notifications = [
  {
    id: 101,
    type: 'COMMENT',
    actorId: 9,
    actorName: 'Marta Ejemplo',
    actorAvatarUrl: null,
    discussionId: 21,
    discussionSlug: 'por-donde-empiezo-con-java',
    discussionTitle: '¿Por dónde empiezo con Java?',
    commentId: 5,
    read: false,
    createdAt: DATE,
  },
  {
    id: 102,
    type: 'ACCEPTED_ANSWER',
    actorId: 3,
    actorName: 'Pablo Ejemplo',
    actorAvatarUrl: null,
    discussionId: 22,
    discussionSlug: 'consejos-para-mi-portfolio',
    discussionTitle: 'Consejos para mi portfolio',
    commentId: 40,
    read: true,
    createdAt: DATE,
  },
]

export function page(content) {
  return { content, page: 0, size: 12, totalElements: content.length, totalPages: 1, last: true }
}

export function searchResult({ newsItems = news, jobItems = jobs, discussionItems = discussions, people = [] } = {}) {
  const group = (items) => ({ items, total: items.length })
  return { news: group(newsItems), jobs: group(jobItems), discussions: group(discussionItems), people: group(people) }
}
