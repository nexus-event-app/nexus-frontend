const DATE = '2026-11-02T10:00:00'

export const user = {
  id: 7,
  name: 'Lucía Prueba',
  email: 'lucia@example.com',
  role: 'USER',
  enabled: true,
  emailVerified: true,
  avatarUrl: null,
  hasPassword: true,
  createdAt: DATE,
}

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
    category: 'PROGRAMACION',
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
    category: 'CARRERA',
    source: null,
    imported: false,
    isActive: true,
    createdAt: DATE,
    updatedAt: DATE,
  },
]

export const englishNews = {
  id: 3,
  slug: 'what-is-new-in-react-19',
  title: 'What is new in React 19',
  content: 'A quick tour of the features that matter most when you are starting out.',
  sourceUrl: 'https://example.com/react-19',
  imageUrl: null,
  author: null,
  category: 'PROGRAMACION',
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

const moreEvents = Array.from({ length: 6 }, (_, index) => ({
  id: 60 + index,
  title: `Charla online número ${index + 1}`,
  description: 'Una charla corta para aprender algo nuevo cada semana.',
  url: `https://www.meetup.com/charlas/events/${index + 1}/`,
  host: 'meetup.com',
  date: `2099-04-${String(index + 10).padStart(2, '0')}`,
  time: null,
  mode: 'ONLINE',
  city: null,
  address: null,
  forWomen: false,
  mine: false,
  interestedCount: index,
  interested: false,
}))

export const events = [
  {
    id: 51,
    title: 'Meetup de React en Valencia',
    description:
      'Charlas cortas para empezar con React y conocer a gente de la comunidad. Gratis. Habrá pizza, sorteos de libros y un rato al final para presentar tus proyectos personales y encontrar compañeras y compañeros de estudio.',
    url: 'https://www.meetup.com/react-valencia/events/1/',
    host: 'meetup.com',
    date: '2099-03-12',
    time: '19:00:00',
    mode: 'PRESENCIAL',
    city: 'Valencia',
    address: 'Las Naves, Carrer de Joan Verdeguer, 16',
    forWomen: false,
    mine: true,
    interestedCount: 12,
    interested: false,
  },
  {
    id: 52,
    title: 'Hackathon online para principiantes',
    description: 'Un fin de semana para crear tu primer proyecto en equipo, con mentoras y mentores.',
    url: 'https://www.eventbrite.es/e/hackathon-2',
    host: 'eventbrite.es',
    date: '2099-03-20',
    time: null,
    mode: 'ONLINE',
    city: null,
    address: null,
    forWomen: false,
    mine: false,
    interestedCount: 0,
    interested: false,
  },
  {
    id: 53,
    title: 'Café tech de mujeres en Barcelona',
    description: 'Encuentro para conocer a otras mujeres que empiezan en tecnología y compartir experiencias.',
    url: 'https://www.meetup.com/mujeres-tech-bcn/events/3/',
    host: 'meetup.com',
    date: '2099-03-15',
    time: '18:30:00',
    mode: 'PRESENCIAL',
    city: 'Barcelona',
    address: null,
    forWomen: true,
    mine: false,
    interestedCount: 5,
    interested: true,
  },
  ...moreEvents,
]

export const guides = [
  {
    id: 1,
    slug: 'que-hacer-despues-de-un-bootcamp',
    category: 'PRIMEROS_PASOS',
    title: 'Qué hacer después de un bootcamp de programación: guía paso a paso',
    description:
      'Has terminado el bootcamp, ¿y ahora qué? Pasos claros para seguir aprendiendo y conseguir tu primer empleo.',
    content:
      'Durante semanas has tenido clases.\n\n## 1. Haz balance\n\n- ¿Qué parte disfruté más?\n- ¿Qué me cuesta?\n\n## 2. Sigue programando\n\nSigue una de nuestras [rutas de aprendizaje](/rutas).\n\n## 3. Ve a eventos\n\nMira la [agenda de eventos](/eventos).\n\n## En resumen\n\n1. Haz balance.\n2. Programa cada día.',
    published: true,
    publishedAt: '2026-11-24T10:00:00',
    updatedAt: '2026-11-24T10:00:00',
  },
  {
    id: 2,
    slug: 'como-preparar-tu-primera-entrevista-tecnica',
    category: 'EMPLEO',
    title: 'Cómo preparar tu primera entrevista técnica: guía paso a paso',
    description: 'Qué fases tiene, qué suelen preguntar a perfiles junior y cómo prepararla.',
    content: 'Te han llamado.\n\n## 1. Entiende el proceso\n\nTexto.',
    published: true,
    publishedAt: '2026-11-24T11:00:00',
    updatedAt: '2026-11-24T11:00:00',
  },
]
