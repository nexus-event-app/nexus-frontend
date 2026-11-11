import { routeSubsegment } from '@/shared/i18n/languages'

/**
 * Rutas de aprendizaje: etapas y recursos gratuitos de cada una. Los textos (títulos, explicaciones y proyectos)
 * están traducidos en src/shared/i18n/messages/learning.js; aquí solo hay datos que no se traducen.
 *
 * Los identificadores (`id`) se guardan en el backend como progreso de cada persona: si cambias uno, quien ya
 * tuviera esa etapa marcada la perderá. Formato: minúsculas, números y guiones (máx. 40 caracteres).
 *
 * Cada recurso es gratuito y se comprobó que existe en la fecha de RESOURCES_REVIEWED_AT. `lang` es el idioma del
 * recurso (no el de la web): muchos de los mejores están solo en inglés y se avisa de ello.
 */
// Al mediodía para que la fecha no cambie de día en ninguna zona horaria.
export const RESOURCES_REVIEWED_AT = '2026-11-11T12:00:00'

const MDN_WEB = {
  name: 'Aprende desarrollo web',
  provider: 'MDN',
  lang: 'es',
  url: 'https://developer.mozilla.org/es/docs/Learn_web_development',
}
const MDN_HTTP = {
  name: 'Generalidades del protocolo HTTP',
  provider: 'MDN',
  lang: 'es',
  url: 'https://developer.mozilla.org/es/docs/Web/HTTP/Guides/Overview',
}
const MDN_TESTING = {
  name: 'Pruebas entre navegadores',
  provider: 'MDN',
  lang: 'es',
  url: 'https://developer.mozilla.org/es/docs/Learn_web_development/Extensions/Testing',
}
const JS_INFO = {
  name: 'El tutorial de JavaScript moderno',
  provider: 'javascript.info',
  lang: 'es',
  url: 'https://es.javascript.info/',
}
const PRO_GIT = { name: 'Pro Git', provider: 'git-scm.com', lang: 'es', url: 'https://git-scm.com/book/es/v2' }
const GITHUB_HELLO = {
  name: 'Hola, mundo',
  provider: 'GitHub Docs',
  lang: 'es',
  url: 'https://docs.github.com/es/get-started/using-github/hello-world',
}
const GITHUB_PAGES = {
  name: 'Crear un sitio de GitHub Pages',
  provider: 'GitHub Docs',
  lang: 'es',
  url: 'https://docs.github.com/es/pages/getting-started-with-github-pages/creating-a-github-pages-site',
}
const PYTHON_TUTORIAL = {
  name: 'Tutorial de Python',
  provider: 'Python.org',
  lang: 'es',
  url: 'https://docs.python.org/es/3/tutorial/',
}
const SQLBOLT = {
  name: 'SQLBolt: lecciones interactivas',
  provider: 'SQLBolt',
  lang: 'en',
  url: 'https://sqlbolt.com/',
}
const FCC_DATABASES = {
  name: 'Base de datos relacional',
  provider: 'freeCodeCamp',
  lang: 'es',
  url: 'https://www.freecodecamp.org/espanol/learn/relational-database/',
}
const FCC_QA = {
  name: 'Garantía de calidad',
  provider: 'freeCodeCamp',
  lang: 'es',
  url: 'https://www.freecodecamp.org/espanol/learn/quality-assurance/',
}
const KAGGLE_PYTHON = {
  name: 'Python',
  provider: 'Kaggle Learn',
  lang: 'en',
  url: 'https://www.kaggle.com/learn/python',
}
const KAGGLE_PANDAS = {
  name: 'Pandas',
  provider: 'Kaggle Learn',
  lang: 'en',
  url: 'https://www.kaggle.com/learn/pandas',
}

export const LEARNING_PATHS = [
  {
    id: 'frontend',
    icon: 'code',
    search: 'frontend',
    steps: [
      {
        id: 'fundamentos',
        resources: [
          MDN_WEB,
          {
            name: 'Diseño web responsivo',
            provider: 'freeCodeCamp',
            lang: 'es',
            url: 'https://www.freecodecamp.org/espanol/learn/2022/responsive-web-design/',
          },
          { name: 'Learn CSS', provider: 'web.dev', lang: 'en', url: 'https://web.dev/learn/css' },
        ],
      },
      {
        id: 'javascript',
        resources: [
          JS_INFO,
          {
            name: 'Algoritmos y estructuras de datos en JavaScript',
            provider: 'freeCodeCamp',
            lang: 'es',
            url: 'https://www.freecodecamp.org/espanol/learn/javascript-algorithms-and-data-structures-v8/',
          },
          {
            name: 'Guía de JavaScript',
            provider: 'MDN',
            lang: 'es',
            url: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Guide',
          },
        ],
      },
      { id: 'git', resources: [PRO_GIT, GITHUB_HELLO] },
      {
        id: 'react',
        resources: [
          { name: 'Aprende React', provider: 'react.dev', lang: 'es', url: 'https://es.react.dev/learn' },
          {
            name: 'Tutorial: Tres en línea',
            provider: 'react.dev',
            lang: 'es',
            url: 'https://es.react.dev/learn/tutorial-tic-tac-toe',
          },
        ],
      },
      {
        id: 'calidad',
        resources: [
          {
            name: 'Accesibilidad',
            provider: 'MDN',
            lang: 'es',
            url: 'https://developer.mozilla.org/es/docs/Learn_web_development/Core/Accessibility',
          },
          { name: 'Learn Accessibility', provider: 'web.dev', lang: 'en', url: 'https://web.dev/learn/accessibility' },
          MDN_TESTING,
        ],
      },
      { id: 'empleo', resources: [GITHUB_PAGES] },
    ],
  },
  {
    id: 'backend',
    icon: 'server',
    search: 'backend',
    steps: [
      {
        id: 'programacion',
        resources: [
          {
            name: 'Java Programming',
            provider: 'Universidad de Helsinki (MOOC.fi)',
            lang: 'en',
            url: 'https://java-programming.mooc.fi/',
          },
          { name: 'Learn Java', provider: 'dev.java', lang: 'en', url: 'https://dev.java/learn/' },
        ],
      },
      {
        id: 'sql',
        resources: [
          SQLBOLT,
          FCC_DATABASES,
          {
            name: 'Tutorial de PostgreSQL',
            provider: 'PostgreSQL',
            lang: 'en',
            url: 'https://www.postgresql.org/docs/current/tutorial.html',
          },
        ],
      },
      {
        id: 'http',
        resources: [
          MDN_HTTP,
          {
            name: 'Desarrollo back end y APIs',
            provider: 'freeCodeCamp',
            lang: 'es',
            url: 'https://www.freecodecamp.org/espanol/learn/back-end-development-and-apis/',
          },
        ],
      },
      {
        id: 'spring',
        resources: [
          {
            name: 'Building a RESTful Web Service',
            provider: 'Spring',
            lang: 'en',
            url: 'https://spring.io/guides/gs/rest-service/',
          },
          {
            name: 'Accessing Data with JPA',
            provider: 'Spring',
            lang: 'en',
            url: 'https://spring.io/guides/gs/accessing-data-jpa/',
          },
          {
            name: 'Building REST services with Spring',
            provider: 'Spring',
            lang: 'en',
            url: 'https://spring.io/guides/tutorials/rest/',
          },
        ],
      },
      {
        id: 'pruebas',
        resources: [
          {
            name: 'Testing the Web Layer',
            provider: 'Spring',
            lang: 'en',
            url: 'https://spring.io/guides/gs/testing-web/',
          },
        ],
      },
      {
        id: 'despliegue',
        resources: [
          { name: 'Get started', provider: 'Docker', lang: 'en', url: 'https://docs.docker.com/get-started/' },
          PRO_GIT,
        ],
      },
    ],
  },
  {
    id: 'qa',
    icon: 'beaker',
    search: 'QA',
    steps: [
      { id: 'fundamentos', resources: [FCC_QA, MDN_TESTING] },
      { id: 'programacion', resources: [JS_INFO, PYTHON_TUTORIAL] },
      {
        id: 'automatizacion',
        resources: [
          { name: 'Getting started', provider: 'Playwright', lang: 'en', url: 'https://playwright.dev/docs/intro' },
          {
            name: 'Test generator',
            provider: 'Playwright',
            lang: 'en',
            url: 'https://playwright.dev/docs/codegen-intro',
          },
          { name: 'Documentation', provider: 'Selenium', lang: 'en', url: 'https://www.selenium.dev/documentation/' },
        ],
      },
      {
        id: 'apis',
        resources: [
          {
            name: 'Learning Center',
            provider: 'Postman',
            lang: 'en',
            url: 'https://learning.postman.com/docs/getting-started/overview/',
          },
          MDN_HTTP,
        ],
      },
      {
        id: 'accesibilidad',
        resources: [
          {
            name: 'Introducción a la accesibilidad web',
            provider: 'W3C WAI',
            lang: 'es',
            url: 'https://www.w3.org/WAI/fundamentals/accessibility-intro/es',
          },
          {
            name: 'Easy Checks',
            provider: 'W3C WAI',
            lang: 'en',
            url: 'https://www.w3.org/WAI/test-evaluate/easy-checks/',
          },
        ],
      },
      { id: 'empleo', resources: [PRO_GIT, GITHUB_HELLO] },
    ],
  },
  {
    id: 'datos',
    icon: 'chart',
    search: 'datos',
    steps: [
      {
        id: 'python',
        resources: [
          PYTHON_TUTORIAL,
          {
            name: 'Intro to Programming',
            provider: 'Kaggle Learn',
            lang: 'en',
            url: 'https://www.kaggle.com/learn/intro-to-programming',
          },
          KAGGLE_PYTHON,
        ],
      },
      {
        id: 'sql',
        resources: [
          {
            name: 'Intro to SQL',
            provider: 'Kaggle Learn',
            lang: 'en',
            url: 'https://www.kaggle.com/learn/intro-to-sql',
          },
          SQLBOLT,
          FCC_DATABASES,
        ],
      },
      {
        id: 'pandas',
        resources: [
          KAGGLE_PANDAS,
          {
            name: 'Data Cleaning',
            provider: 'Kaggle Learn',
            lang: 'en',
            url: 'https://www.kaggle.com/learn/data-cleaning',
          },
        ],
      },
      {
        id: 'analisis',
        resources: [
          {
            name: 'Análisis de datos con Python',
            provider: 'freeCodeCamp',
            lang: 'es',
            url: 'https://www.freecodecamp.org/espanol/learn/data-analysis-with-python/',
          },
        ],
      },
      {
        id: 'visualizacion',
        resources: [
          {
            name: 'Data Visualization',
            provider: 'Kaggle Learn',
            lang: 'en',
            url: 'https://www.kaggle.com/learn/data-visualization',
          },
        ],
      },
      { id: 'empleo', resources: [GITHUB_PAGES, PRO_GIT] },
    ],
  },
  {
    id: 'ia',
    icon: 'sparkles',
    search: 'IA',
    steps: [
      {
        id: 'fundamentos',
        resources: [
          {
            name: 'Elements of AI',
            provider: 'Universidad de Helsinki',
            lang: 'es',
            url: 'https://www.elementsofai.com/es',
          },
          {
            name: 'Introduction to Machine Learning',
            provider: 'Google for Developers',
            lang: 'en',
            url: 'https://developers.google.com/machine-learning/intro-to-ml',
          },
        ],
      },
      { id: 'python', resources: [KAGGLE_PYTHON, KAGGLE_PANDAS, PYTHON_TUTORIAL] },
      {
        id: 'machine-learning',
        resources: [
          {
            name: 'Machine Learning Crash Course',
            provider: 'Google for Developers',
            lang: 'en',
            url: 'https://developers.google.com/machine-learning/crash-course',
          },
          {
            name: 'Intro to Machine Learning',
            provider: 'Kaggle Learn',
            lang: 'en',
            url: 'https://www.kaggle.com/learn/intro-to-machine-learning',
          },
          {
            name: 'Aprendizaje automático con Python',
            provider: 'freeCodeCamp',
            lang: 'es',
            url: 'https://www.freecodecamp.org/espanol/learn/machine-learning-with-python/',
          },
        ],
      },
      {
        id: 'deep-learning',
        resources: [
          {
            name: 'Intro to Deep Learning',
            provider: 'Kaggle Learn',
            lang: 'en',
            url: 'https://www.kaggle.com/learn/intro-to-deep-learning',
          },
          {
            name: 'Practical Deep Learning for Coders',
            provider: 'fast.ai',
            lang: 'en',
            url: 'https://course.fast.ai/',
          },
        ],
      },
      {
        id: 'llm',
        resources: [
          {
            name: 'Curso de LLM',
            provider: 'Hugging Face',
            lang: 'es',
            url: 'https://huggingface.co/learn/llm-course/es/chapter1/1',
          },
          { name: 'Hugging Face Learn', provider: 'Hugging Face', lang: 'en', url: 'https://huggingface.co/learn' },
        ],
      },
      {
        id: 'etica',
        resources: [
          {
            name: 'Ethics of AI',
            provider: 'Universidad de Helsinki (MOOC.fi)',
            lang: 'en',
            url: 'https://ethics-of-ai.mooc.fi/',
          },
          {
            name: 'Intro to AI Ethics',
            provider: 'Kaggle Learn',
            lang: 'en',
            url: 'https://www.kaggle.com/learn/intro-to-ai-ethics',
          },
        ],
      },
    ],
  },
]

/**
 * Ruta a partir del segmento de la dirección, que puede estar traducido («/en/learning-paths/data» → «datos»).
 * También acepta el identificador en castellano, para que las direcciones antiguas o mal traducidas funcionen.
 */
export function findLearningPath(segment, lang) {
  return (
    LEARNING_PATHS.find((path) => routeSubsegment('rutas', path.id, lang) === segment) ??
    LEARNING_PATHS.find((path) => path.id === segment) ??
    null
  )
}
