export default {
  es: {
    breadcrumb: 'Rutas de aprendizaje',
    seoTitle: 'Rutas de aprendizaje gratuitas para empezar en tecnología',
    seoDescription:
      'Frontend, backend, QA, análisis de datos e IA: un camino por etapas con recursos gratuitos, proyectos para practicar y tu progreso guardado en {name}.',
    eyebrow: 'Aprende paso a paso',
    title: 'Rutas de aprendizaje',
    intro:
      'Elige hacia dónde quieres ir y sigue un camino por etapas, de cero a tu primer empleo. Cada etapa tiene recursos gratuitos escogidos y un proyecto para practicar.',
    listLabel: 'Rutas disponibles',
    reviewed: 'Recursos gratuitos de terceros, revisados el {date}. Si alguno deja de funcionar, avísanos en el foro.',
    how: {
      title: 'Cómo funcionan',
      choose: { title: 'Elige una ruta', text: 'Cada una explica para quién es y cuánto se tarda más o menos.' },
      practice: { title: 'Aprende y practica', text: 'Lee o mira los recursos y haz el mini proyecto de cada etapa.' },
      progress: {
        title: 'Marca tu avance',
        text: 'Con tu cuenta, marca las etapas hechas y retoma la ruta donde la dejaste.',
      },
    },
    card: {
      steps: '{count} etapas',
      duration: 'Duración orientativa',
      stepsLabel: 'Etapas',
    },
    progress: {
      label: 'Tu progreso',
      value: '{done} de {total} etapas',
      completed: '¡Ruta completada!',
      signIn: 'Inicia sesión o crea una cuenta para guardar tu progreso en las rutas.',
      done: 'Hecha',
      doneSr: ' (etapa {step})',
      saveError: 'No hemos podido guardar tu progreso. Inténtalo de nuevo.',
    },
    detail: {
      audience: 'Para quién es',
      duration: 'Duración orientativa',
      steps: 'Etapas',
      step: 'Etapa {number}',
      resources: 'Recursos gratuitos',
      project: 'Practica',
      language: { es: 'ES', en: 'EN' },
      languageSr: { es: 'en castellano', en: 'en inglés' },
      newTab: 'se abre en una pestaña nueva',
      next: 'Sigue avanzando',
      jobs: 'Ofertas relacionadas',
      forum: 'Preguntar en el foro',
      others: 'Otras rutas',
      notFound: 'Esta ruta no existe',
      summary: 'Resumen de la ruta',
    },
    paths: {
      frontend: {
        name: 'Frontend',
        tagline: 'Lo que se ve y se usa en una web: diseño, interacción y accesibilidad.',
        audience: 'Para quien disfruta viendo el resultado de su trabajo en pantalla y cuidando los detalles.',
        duration: '6–9 meses',
        description:
          'Aprenderás a construir páginas y aplicaciones web con HTML, CSS, JavaScript y React, y a hacerlas accesibles para todo el mundo.',
      },
      backend: {
        name: 'Backend',
        tagline: 'Servidores, bases de datos y APIs: lo que hace funcionar una aplicación por dentro.',
        audience: 'Para quien disfruta con la lógica, los datos y resolver cómo encajan las piezas.',
        duration: '7–10 meses',
        description:
          'Aprenderás a programar en Java, diseñar bases de datos, crear APIs con Spring Boot y desplegarlas con Docker.',
      },
      qa: {
        name: 'QA y testing',
        tagline: 'Asegurar que el software funciona bien antes de que llegue a las personas.',
        audience: 'Para quien tiene ojo para el detalle y le gusta encontrar fallos y entender por qué pasan.',
        duration: '4–6 meses',
        description:
          'Aprenderás a diseñar pruebas, automatizarlas en el navegador y en APIs, y a comprobar la accesibilidad.',
      },
      datos: {
        name: 'Análisis de datos',
        tagline: 'Convertir datos en respuestas y decisiones con SQL, Python y gráficos.',
        audience: 'Para quien siente curiosidad por los números y por contar historias con ellos.',
        duration: '5–8 meses',
        description:
          'Aprenderás a consultar bases de datos, limpiar y analizar datos con Python y pandas, y presentar conclusiones con gráficos.',
      },
      ia: {
        name: 'Inteligencia artificial',
        tagline: 'Cómo aprenden las máquinas, del machine learning a los modelos de lenguaje.',
        audience: 'Para quien quiere entender la IA por dentro y construir con ella de forma responsable.',
        duration: '8–12 meses',
        description:
          'Aprenderás los fundamentos de la IA, Python para datos, machine learning, deep learning y modelos de lenguaje, sin olvidar la ética.',
      },
    },
    steps: {
      frontend: {
        fundamentos: {
          title: 'Fundamentos de la web: HTML y CSS',
          text: 'Cómo funciona una web, cómo se estructura el contenido con HTML semántico y cómo se le da estilo con CSS, también en móvil.',
          project: 'Haz tu página personal: quién eres, qué estás aprendiendo y cómo contactarte.',
        },
        javascript: {
          title: 'JavaScript',
          text: 'Variables, funciones, arrays y objetos, el DOM y cómo pedir datos a una API con fetch.',
          project: 'Crea una lista de tareas que se guarde en el navegador.',
        },
        git: {
          title: 'Git y GitHub',
          text: 'Guardar versiones de tu código, trabajar con ramas y compartir proyectos en GitHub.',
          project: 'Sube tus proyectos anteriores a GitHub con un README que explique qué hacen.',
        },
        react: {
          title: 'React',
          text: 'Componentes, props, estado y efectos: la forma más extendida de construir interfaces hoy.',
          project: 'Haz un buscador que muestre resultados de una API pública.',
        },
        calidad: {
          title: 'Accesibilidad y calidad',
          text: 'Webs que todo el mundo puede usar, buenas prácticas y pruebas para que nada se rompa.',
          project: 'Revisa la accesibilidad de tu buscador y corrige lo que encuentres.',
        },
        empleo: {
          title: 'Portfolio y primer empleo',
          text: 'Publicar tus proyectos, preparar el CV y practicar entrevistas técnicas.',
          project: 'Publica tu portfolio con GitHub Pages y compártelo en el foro para recibir opiniones.',
        },
      },
      backend: {
        programacion: {
          title: 'Programar con Java',
          text: 'Variables, condiciones, bucles, colecciones y programación orientada a objetos.',
          project: 'Programa una aplicación de consola para apuntar tus gastos.',
        },
        sql: {
          title: 'Bases de datos y SQL',
          text: 'Tablas, relaciones y consultas: cómo se guardan y se buscan los datos.',
          project: 'Diseña la base de datos de una biblioteca y escribe sus consultas principales.',
        },
        http: {
          title: 'HTTP y APIs',
          text: 'Cómo hablan el navegador y el servidor: peticiones, respuestas, códigos de estado y JSON.',
          project: 'Prueba una API pública y documenta sus peticiones principales.',
        },
        spring: {
          title: 'Spring Boot',
          text: 'Crear una API REST con controladores, servicios y acceso a base de datos con JPA.',
          project: 'Crea la API de tu biblioteca: libros, préstamos y búsqueda.',
        },
        pruebas: {
          title: 'Pruebas automáticas',
          text: 'Pruebas unitarias y de integración para cambiar el código sin miedo.',
          project: 'Añade pruebas a tu API hasta cubrir los casos principales.',
        },
        despliegue: {
          title: 'Docker y despliegue',
          text: 'Empaquetar tu aplicación en contenedores y publicarla para que otras personas la usen.',
          project: 'Crea un Dockerfile para tu API y explica en el README cómo arrancarla.',
        },
      },
      qa: {
        fundamentos: {
          title: 'Fundamentos del testing',
          text: 'Qué es la calidad del software, tipos de pruebas y cómo escribir casos de prueba y reportar fallos.',
          project: 'Escribe los casos de prueba del formulario de registro de una web que uses.',
        },
        programacion: {
          title: 'Programación para testers',
          text: 'Lo básico de JavaScript o Python para leer código y automatizar pruebas.',
          project: 'Programa un pequeño script que compruebe si una lista de enlaces funciona.',
        },
        automatizacion: {
          title: 'Automatización web',
          text: 'Pruebas que abren un navegador y repiten lo que haría una persona, con Playwright o Selenium.',
          project: 'Automatiza el registro y el inicio de sesión de una web de prácticas.',
        },
        apis: {
          title: 'Pruebas de APIs',
          text: 'Comprobar que un servidor responde bien: peticiones, códigos de estado y datos.',
          project: 'Crea una colección de pruebas para una API pública.',
        },
        accesibilidad: {
          title: 'Pruebas de accesibilidad',
          text: 'Revisar que una web se puede usar con teclado, con lector de pantalla y con buen contraste.',
          project: 'Haz una revisión de accesibilidad de una web y redacta un informe breve.',
        },
        empleo: {
          title: 'Portfolio y primer empleo',
          text: 'Enseñar tu trabajo de pruebas en GitHub y preparar las entrevistas de QA.',
          project: 'Publica tus pruebas automatizadas en GitHub con un README claro.',
        },
      },
      datos: {
        python: {
          title: 'Python desde cero',
          text: 'Variables, listas, diccionarios, funciones y bucles: la base para trabajar con datos.',
          project: 'Programa un script que calcule estadísticas sencillas de una lista de notas.',
        },
        sql: {
          title: 'SQL para analizar',
          text: 'Filtrar, agrupar y unir tablas para responder preguntas con datos.',
          project: 'Responde cinco preguntas sobre un conjunto de datos público con consultas SQL.',
        },
        pandas: {
          title: 'pandas y limpieza de datos',
          text: 'Cargar, limpiar y transformar datos reales, que casi nunca llegan perfectos.',
          project: 'Limpia un conjunto de datos con valores vacíos y duplicados.',
        },
        analisis: {
          title: 'Análisis de datos',
          text: 'Hacer buenas preguntas, encontrar patrones y sacar conclusiones con datos.',
          project: 'Analiza un conjunto de datos público y resume tres conclusiones.',
        },
        visualizacion: {
          title: 'Visualización',
          text: 'Elegir el gráfico adecuado y contar una historia clara con él.',
          project: 'Convierte tus conclusiones en tres gráficos con un breve texto cada uno.',
        },
        empleo: {
          title: 'Portfolio y primer empleo',
          text: 'Publicar tus análisis y preparar las entrevistas de datos.',
          project: 'Publica dos análisis completos en GitHub y compártelos en el foro.',
        },
      },
      ia: {
        fundamentos: {
          title: 'Qué es la inteligencia artificial',
          text: 'Qué puede y qué no puede hacer la IA, cómo aprende una máquina y vocabulario básico.',
          project: 'Explica con tus palabras, en una entrada del foro, un uso de la IA que te interese.',
        },
        python: {
          title: 'Python para datos',
          text: 'Python, pandas y el manejo de datos, la base de todo proyecto de IA.',
          project: 'Explora un conjunto de datos y describe qué contiene.',
        },
        'machine-learning': {
          title: 'Machine learning',
          text: 'Modelos que aprenden de ejemplos: regresión, clasificación y cómo medir si funcionan.',
          project: 'Entrena un modelo que prediga un valor de un conjunto de datos público.',
        },
        'deep-learning': {
          title: 'Deep learning',
          text: 'Redes neuronales para imágenes, texto y sonido.',
          project: 'Entrena una red que clasifique imágenes.',
        },
        llm: {
          title: 'Modelos de lenguaje (LLM)',
          text: 'Cómo funcionan los modelos que entienden y generan texto, y cómo usarlos en tus proyectos.',
          project: 'Crea una pequeña aplicación que resuma textos con un modelo abierto.',
        },
        etica: {
          title: 'IA responsable',
          text: 'Sesgos, privacidad, transparencia y el impacto de la IA en las personas.',
          project: 'Analiza los riesgos de tu aplicación y cómo los reducirías.',
        },
      },
    },
  },
  ca: {
    breadcrumb: 'Rutes d’aprenentatge',
    seoTitle: 'Rutes d’aprenentatge gratuïtes per començar en tecnologia',
    seoDescription:
      'Frontend, backend, QA, anàlisi de dades i IA: un camí per etapes amb recursos gratuïts, projectes per practicar i el teu progrés desat a {name}.',
    eyebrow: 'Aprèn pas a pas',
    title: 'Rutes d’aprenentatge',
    intro:
      'Tria cap a on vols anar i segueix un camí per etapes, de zero a la teva primera feina. Cada etapa té recursos gratuïts escollits i un projecte per practicar.',
    listLabel: 'Rutes disponibles',
    reviewed: 'Recursos gratuïts de tercers, revisats el {date}. Si algun deixa de funcionar, avisa’ns al fòrum.',
    how: {
      title: 'Com funcionen',
      choose: { title: 'Tria una ruta', text: 'Cadascuna explica per a qui és i quant es triga més o menys.' },
      practice: {
        title: 'Aprèn i practica',
        text: 'Llegeix o mira els recursos i fes el mini projecte de cada etapa.',
      },
      progress: {
        title: 'Marca el teu avenç',
        text: 'Amb el teu compte, marca les etapes fetes i reprèn la ruta on la vas deixar.',
      },
    },
    card: {
      steps: '{count} etapes',
      duration: 'Durada orientativa',
      stepsLabel: 'Etapes',
    },
    progress: {
      label: 'El teu progrés',
      value: '{done} de {total} etapes',
      completed: 'Ruta completada!',
      signIn: 'Inicia la sessió o crea un compte per desar el teu progrés a les rutes.',
      done: 'Feta',
      doneSr: ' (etapa {step})',
      saveError: 'No hem pogut desar el teu progrés. Torna-ho a provar.',
    },
    detail: {
      audience: 'Per a qui és',
      duration: 'Durada orientativa',
      steps: 'Etapes',
      step: 'Etapa {number}',
      resources: 'Recursos gratuïts',
      project: 'Practica',
      language: { es: 'ES', en: 'EN' },
      languageSr: { es: 'en castellà', en: 'en anglès' },
      newTab: 's’obre en una pestanya nova',
      next: 'Continua avançant',
      jobs: 'Ofertes relacionades',
      forum: 'Pregunta al fòrum',
      others: 'Altres rutes',
      notFound: 'Aquesta ruta no existeix',
      summary: 'Resum de la ruta',
    },
    paths: {
      frontend: {
        name: 'Frontend',
        tagline: 'El que es veu i es fa servir en un web: disseny, interacció i accessibilitat.',
        audience: 'Per a qui gaudeix veient el resultat de la seva feina a la pantalla i cuidant els detalls.',
        duration: '6–9 mesos',
        description:
          'Aprendràs a construir pàgines i aplicacions web amb HTML, CSS, JavaScript i React, i a fer-les accessibles per a tothom.',
      },
      backend: {
        name: 'Backend',
        tagline: 'Servidors, bases de dades i API: el que fa funcionar una aplicació per dins.',
        audience: 'Per a qui gaudeix amb la lògica, les dades i resoldre com encaixen les peces.',
        duration: '7–10 mesos',
        description:
          'Aprendràs a programar en Java, dissenyar bases de dades, crear API amb Spring Boot i desplegar-les amb Docker.',
      },
      qa: {
        name: 'QA i testing',
        tagline: 'Assegurar que el programari funciona bé abans que arribi a les persones.',
        audience: 'Per a qui té ull per al detall i li agrada trobar errors i entendre per què passen.',
        duration: '4–6 mesos',
        description:
          'Aprendràs a dissenyar proves, automatitzar-les al navegador i en API, i a comprovar l’accessibilitat.',
      },
      datos: {
        name: 'Anàlisi de dades',
        tagline: 'Convertir dades en respostes i decisions amb SQL, Python i gràfics.',
        audience: 'Per a qui sent curiositat pels números i per explicar històries amb ells.',
        duration: '5–8 mesos',
        description:
          'Aprendràs a consultar bases de dades, netejar i analitzar dades amb Python i pandas, i presentar conclusions amb gràfics.',
      },
      ia: {
        name: 'Intel·ligència artificial',
        tagline: 'Com aprenen les màquines, del machine learning als models de llenguatge.',
        audience: 'Per a qui vol entendre la IA per dins i construir amb ella de manera responsable.',
        duration: '8–12 mesos',
        description:
          'Aprendràs els fonaments de la IA, Python per a dades, machine learning, deep learning i models de llenguatge, sense oblidar l’ètica.',
      },
    },
    steps: {
      frontend: {
        fundamentos: {
          title: 'Fonaments del web: HTML i CSS',
          text: 'Com funciona un web, com s’estructura el contingut amb HTML semàntic i com se li dona estil amb CSS, també al mòbil.',
          project: 'Fes la teva pàgina personal: qui ets, què estàs aprenent i com contactar-te.',
        },
        javascript: {
          title: 'JavaScript',
          text: 'Variables, funcions, arrays i objectes, el DOM i com demanar dades a una API amb fetch.',
          project: 'Crea una llista de tasques que es desi al navegador.',
        },
        git: {
          title: 'Git i GitHub',
          text: 'Desar versions del teu codi, treballar amb branques i compartir projectes a GitHub.',
          project: 'Puja els teus projectes anteriors a GitHub amb un README que expliqui què fan.',
        },
        react: {
          title: 'React',
          text: 'Components, props, estat i efectes: la manera més estesa de construir interfícies avui.',
          project: 'Fes un cercador que mostri resultats d’una API pública.',
        },
        calidad: {
          title: 'Accessibilitat i qualitat',
          text: 'Webs que tothom pot fer servir, bones pràctiques i proves perquè res es trenqui.',
          project: 'Revisa l’accessibilitat del teu cercador i corregeix el que trobis.',
        },
        empleo: {
          title: 'Portafoli i primera feina',
          text: 'Publicar els teus projectes, preparar el CV i practicar entrevistes tècniques.',
          project: 'Publica el teu portafoli amb GitHub Pages i comparteix-lo al fòrum per rebre opinions.',
        },
      },
      backend: {
        programacion: {
          title: 'Programar amb Java',
          text: 'Variables, condicions, bucles, col·leccions i programació orientada a objectes.',
          project: 'Programa una aplicació de consola per apuntar les teves despeses.',
        },
        sql: {
          title: 'Bases de dades i SQL',
          text: 'Taules, relacions i consultes: com es desen i es cerquen les dades.',
          project: 'Dissenya la base de dades d’una biblioteca i escriu-ne les consultes principals.',
        },
        http: {
          title: 'HTTP i API',
          text: 'Com parlen el navegador i el servidor: peticions, respostes, codis d’estat i JSON.',
          project: 'Prova una API pública i documenta’n les peticions principals.',
        },
        spring: {
          title: 'Spring Boot',
          text: 'Crear una API REST amb controladors, serveis i accés a base de dades amb JPA.',
          project: 'Crea l’API de la teva biblioteca: llibres, préstecs i cerca.',
        },
        pruebas: {
          title: 'Proves automàtiques',
          text: 'Proves unitàries i d’integració per canviar el codi sense por.',
          project: 'Afegeix proves a la teva API fins a cobrir els casos principals.',
        },
        despliegue: {
          title: 'Docker i desplegament',
          text: 'Empaquetar la teva aplicació en contenidors i publicar-la perquè altres persones la facin servir.',
          project: 'Crea un Dockerfile per a la teva API i explica al README com arrencar-la.',
        },
      },
      qa: {
        fundamentos: {
          title: 'Fonaments del testing',
          text: 'Què és la qualitat del programari, tipus de proves i com escriure casos de prova i informar d’errors.',
          project: 'Escriu els casos de prova del formulari de registre d’un web que facis servir.',
        },
        programacion: {
          title: 'Programació per a testers',
          text: 'El més bàsic de JavaScript o Python per llegir codi i automatitzar proves.',
          project: 'Programa un petit script que comprovi si una llista d’enllaços funciona.',
        },
        automatizacion: {
          title: 'Automatització web',
          text: 'Proves que obren un navegador i repeteixen el que faria una persona, amb Playwright o Selenium.',
          project: 'Automatitza el registre i l’inici de sessió d’un web de pràctiques.',
        },
        apis: {
          title: 'Proves d’API',
          text: 'Comprovar que un servidor respon bé: peticions, codis d’estat i dades.',
          project: 'Crea una col·lecció de proves per a una API pública.',
        },
        accesibilidad: {
          title: 'Proves d’accessibilitat',
          text: 'Revisar que un web es pot fer servir amb teclat, amb lector de pantalla i amb bon contrast.',
          project: 'Fes una revisió d’accessibilitat d’un web i redacta un informe breu.',
        },
        empleo: {
          title: 'Portafoli i primera feina',
          text: 'Ensenyar la teva feina de proves a GitHub i preparar les entrevistes de QA.',
          project: 'Publica les teves proves automatitzades a GitHub amb un README clar.',
        },
      },
      datos: {
        python: {
          title: 'Python des de zero',
          text: 'Variables, llistes, diccionaris, funcions i bucles: la base per treballar amb dades.',
          project: 'Programa un script que calculi estadístiques senzilles d’una llista de notes.',
        },
        sql: {
          title: 'SQL per analitzar',
          text: 'Filtrar, agrupar i unir taules per respondre preguntes amb dades.',
          project: 'Respon cinc preguntes sobre un conjunt de dades públic amb consultes SQL.',
        },
        pandas: {
          title: 'pandas i neteja de dades',
          text: 'Carregar, netejar i transformar dades reals, que gairebé mai arriben perfectes.',
          project: 'Neteja un conjunt de dades amb valors buits i duplicats.',
        },
        analisis: {
          title: 'Anàlisi de dades',
          text: 'Fer bones preguntes, trobar patrons i treure conclusions amb dades.',
          project: 'Analitza un conjunt de dades públic i resumeix tres conclusions.',
        },
        visualizacion: {
          title: 'Visualització',
          text: 'Triar el gràfic adequat i explicar-hi una història clara.',
          project: 'Converteix les teves conclusions en tres gràfics amb un text breu cadascun.',
        },
        empleo: {
          title: 'Portafoli i primera feina',
          text: 'Publicar les teves anàlisis i preparar les entrevistes de dades.',
          project: 'Publica dues anàlisis completes a GitHub i comparteix-les al fòrum.',
        },
      },
      ia: {
        fundamentos: {
          title: 'Què és la intel·ligència artificial',
          text: 'Què pot fer i què no la IA, com aprèn una màquina i vocabulari bàsic.',
          project: 'Explica amb les teves paraules, en una entrada del fòrum, un ús de la IA que t’interessi.',
        },
        python: {
          title: 'Python per a dades',
          text: 'Python, pandas i el maneig de dades, la base de tot projecte d’IA.',
          project: 'Explora un conjunt de dades i descriu què conté.',
        },
        'machine-learning': {
          title: 'Machine learning',
          text: 'Models que aprenen d’exemples: regressió, classificació i com mesurar si funcionen.',
          project: 'Entrena un model que predigui un valor d’un conjunt de dades públic.',
        },
        'deep-learning': {
          title: 'Deep learning',
          text: 'Xarxes neuronals per a imatges, text i so.',
          project: 'Entrena una xarxa que classifiqui imatges.',
        },
        llm: {
          title: 'Models de llenguatge (LLM)',
          text: 'Com funcionen els models que entenen i generen text, i com fer-los servir als teus projectes.',
          project: 'Crea una petita aplicació que resumeixi textos amb un model obert.',
        },
        etica: {
          title: 'IA responsable',
          text: 'Biaixos, privacitat, transparència i l’impacte de la IA en les persones.',
          project: 'Analitza els riscos de la teva aplicació i com els reduiries.',
        },
      },
    },
  },
  en: {
    breadcrumb: 'Learning paths',
    seoTitle: 'Free learning paths to start a career in tech',
    seoDescription:
      'Frontend, backend, QA, data analysis and AI: a step-by-step path with free resources, practice projects and your progress saved on {name}.',
    eyebrow: 'Learn step by step',
    title: 'Learning paths',
    intro:
      'Choose where you want to go and follow a step-by-step path, from zero to your first job. Each step has hand-picked free resources and a project to practise.',
    listLabel: 'Available paths',
    reviewed: 'Free third-party resources, reviewed on {date}. If one stops working, let us know in the forum.',
    how: {
      title: 'How they work',
      choose: { title: 'Choose a path', text: 'Each one explains who it is for and roughly how long it takes.' },
      practice: {
        title: 'Learn and practise',
        text: 'Read or watch the resources and build the mini project of each step.',
      },
      progress: {
        title: 'Track your progress',
        text: 'With your account, tick off finished steps and pick up the path where you left it.',
      },
    },
    card: {
      steps: '{count} steps',
      duration: 'Approximate duration',
      stepsLabel: 'Steps',
    },
    progress: {
      label: 'Your progress',
      value: '{done} of {total} steps',
      completed: 'Path completed!',
      signIn: 'Log in or create an account to save your progress on the paths.',
      done: 'Done',
      doneSr: ' (step {step})',
      saveError: 'We could not save your progress. Please try again.',
    },
    detail: {
      audience: 'Who it is for',
      duration: 'Approximate duration',
      steps: 'Steps',
      step: 'Step {number}',
      resources: 'Free resources',
      project: 'Practise',
      language: { es: 'ES', en: 'EN' },
      languageSr: { es: 'in Spanish', en: 'in English' },
      newTab: 'opens in a new tab',
      next: 'Keep going',
      jobs: 'Related jobs',
      forum: 'Ask in the forum',
      others: 'Other paths',
      notFound: 'This path does not exist',
      summary: 'Path summary',
    },
    paths: {
      frontend: {
        name: 'Frontend',
        tagline: 'What you see and use on a website: design, interaction and accessibility.',
        audience: 'For people who enjoy seeing their work on screen and caring about the details.',
        duration: '6–9 months',
        description:
          'You will learn to build web pages and apps with HTML, CSS, JavaScript and React, and to make them accessible to everyone.',
      },
      backend: {
        name: 'Backend',
        tagline: 'Servers, databases and APIs: what makes an application work behind the scenes.',
        audience: 'For people who enjoy logic, data and working out how the pieces fit together.',
        duration: '7–10 months',
        description:
          'You will learn to program in Java, design databases, build APIs with Spring Boot and deploy them with Docker.',
      },
      qa: {
        name: 'QA and testing',
        tagline: 'Making sure software works well before it reaches people.',
        audience: 'For people with an eye for detail who like finding bugs and understanding why they happen.',
        duration: '4–6 months',
        description:
          'You will learn to design tests, automate them in the browser and for APIs, and check accessibility.',
      },
      datos: {
        name: 'Data analysis',
        tagline: 'Turning data into answers and decisions with SQL, Python and charts.',
        audience: 'For people who are curious about numbers and about telling stories with them.',
        duration: '5–8 months',
        description:
          'You will learn to query databases, clean and analyse data with Python and pandas, and present conclusions with charts.',
      },
      ia: {
        name: 'Artificial intelligence',
        tagline: 'How machines learn, from machine learning to language models.',
        audience: 'For people who want to understand AI from the inside and build with it responsibly.',
        duration: '8–12 months',
        description:
          'You will learn AI fundamentals, Python for data, machine learning, deep learning and language models, without forgetting ethics.',
      },
    },
    steps: {
      frontend: {
        fundamentos: {
          title: 'Web fundamentals: HTML and CSS',
          text: 'How the web works, how to structure content with semantic HTML and how to style it with CSS, on mobile too.',
          project: 'Build your personal page: who you are, what you are learning and how to reach you.',
        },
        javascript: {
          title: 'JavaScript',
          text: 'Variables, functions, arrays and objects, the DOM and how to request data from an API with fetch.',
          project: 'Build a to-do list that is saved in the browser.',
        },
        git: {
          title: 'Git and GitHub',
          text: 'Saving versions of your code, working with branches and sharing projects on GitHub.',
          project: 'Upload your previous projects to GitHub with a README explaining what they do.',
        },
        react: {
          title: 'React',
          text: 'Components, props, state and effects: the most widespread way to build interfaces today.',
          project: 'Build a search page that shows results from a public API.',
        },
        calidad: {
          title: 'Accessibility and quality',
          text: 'Websites everyone can use, good practices and tests so nothing breaks.',
          project: 'Review the accessibility of your search page and fix what you find.',
        },
        empleo: {
          title: 'Portfolio and first job',
          text: 'Publishing your projects, preparing your CV and practising technical interviews.',
          project: 'Publish your portfolio with GitHub Pages and share it in the forum to get feedback.',
        },
      },
      backend: {
        programacion: {
          title: 'Programming with Java',
          text: 'Variables, conditions, loops, collections and object-oriented programming.',
          project: 'Write a console app to keep track of your expenses.',
        },
        sql: {
          title: 'Databases and SQL',
          text: 'Tables, relationships and queries: how data is stored and searched.',
          project: 'Design a library database and write its main queries.',
        },
        http: {
          title: 'HTTP and APIs',
          text: 'How the browser and the server talk: requests, responses, status codes and JSON.',
          project: 'Try out a public API and document its main requests.',
        },
        spring: {
          title: 'Spring Boot',
          text: 'Building a REST API with controllers, services and database access with JPA.',
          project: 'Build the API for your library: books, loans and search.',
        },
        pruebas: {
          title: 'Automated testing',
          text: 'Unit and integration tests so you can change code without fear.',
          project: 'Add tests to your API until the main cases are covered.',
        },
        despliegue: {
          title: 'Docker and deployment',
          text: 'Packaging your application in containers and publishing it for others to use.',
          project: 'Write a Dockerfile for your API and explain in the README how to run it.',
        },
      },
      qa: {
        fundamentos: {
          title: 'Testing fundamentals',
          text: 'What software quality is, types of tests and how to write test cases and report bugs.',
          project: 'Write the test cases for the sign-up form of a website you use.',
        },
        programacion: {
          title: 'Programming for testers',
          text: 'The basics of JavaScript or Python to read code and automate tests.',
          project: 'Write a small script that checks whether a list of links works.',
        },
        automatizacion: {
          title: 'Web automation',
          text: 'Tests that open a browser and repeat what a person would do, with Playwright or Selenium.',
          project: 'Automate sign-up and login on a practice website.',
        },
        apis: {
          title: 'API testing',
          text: 'Checking that a server responds correctly: requests, status codes and data.',
          project: 'Create a test collection for a public API.',
        },
        accesibilidad: {
          title: 'Accessibility testing',
          text: 'Checking that a website can be used with a keyboard, a screen reader and good contrast.',
          project: 'Run an accessibility review of a website and write a short report.',
        },
        empleo: {
          title: 'Portfolio and first job',
          text: 'Showing your testing work on GitHub and preparing for QA interviews.',
          project: 'Publish your automated tests on GitHub with a clear README.',
        },
      },
      datos: {
        python: {
          title: 'Python from scratch',
          text: 'Variables, lists, dictionaries, functions and loops: the basis for working with data.',
          project: 'Write a script that calculates simple statistics for a list of marks.',
        },
        sql: {
          title: 'SQL for analysis',
          text: 'Filtering, grouping and joining tables to answer questions with data.',
          project: 'Answer five questions about a public dataset with SQL queries.',
        },
        pandas: {
          title: 'pandas and data cleaning',
          text: 'Loading, cleaning and transforming real data, which hardly ever arrives perfect.',
          project: 'Clean a dataset with missing values and duplicates.',
        },
        analisis: {
          title: 'Data analysis',
          text: 'Asking good questions, finding patterns and drawing conclusions from data.',
          project: 'Analyse a public dataset and summarise three conclusions.',
        },
        visualizacion: {
          title: 'Visualisation',
          text: 'Choosing the right chart and telling a clear story with it.',
          project: 'Turn your conclusions into three charts with a short text each.',
        },
        empleo: {
          title: 'Portfolio and first job',
          text: 'Publishing your analyses and preparing for data interviews.',
          project: 'Publish two complete analyses on GitHub and share them in the forum.',
        },
      },
      ia: {
        fundamentos: {
          title: 'What artificial intelligence is',
          text: 'What AI can and cannot do, how a machine learns and the basic vocabulary.',
          project: 'Explain in your own words, in a forum post, a use of AI that interests you.',
        },
        python: {
          title: 'Python for data',
          text: 'Python, pandas and data handling, the basis of every AI project.',
          project: 'Explore a dataset and describe what it contains.',
        },
        'machine-learning': {
          title: 'Machine learning',
          text: 'Models that learn from examples: regression, classification and how to measure whether they work.',
          project: 'Train a model that predicts a value from a public dataset.',
        },
        'deep-learning': {
          title: 'Deep learning',
          text: 'Neural networks for images, text and sound.',
          project: 'Train a network that classifies images.',
        },
        llm: {
          title: 'Language models (LLMs)',
          text: 'How models that understand and generate text work, and how to use them in your projects.',
          project: 'Build a small app that summarises texts with an open model.',
        },
        etica: {
          title: 'Responsible AI',
          text: 'Bias, privacy, transparency and the impact of AI on people.',
          project: 'Analyse the risks of your app and how you would reduce them.',
        },
      },
    },
  },
}
