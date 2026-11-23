export default {
  es: {
    breadcrumb: 'Glosario',
    seoTitle: 'Glosario tech para quien empieza',
    seoDescription:
      'Las palabras que vas a oír al empezar en tecnología, explicadas en una frase y con un ejemplo: API, commit, deploy, sprint, framework y muchas más.',
    eyebrow: 'Glosario',
    title: 'Las palabras que vas a oír',
    intro:
      'API, commit, deploy, sprint… Si vienes de otro sector, el primer día parece otro idioma. Aquí lo tienes explicado en una frase y con un ejemplo.',
    searchLabel: 'Buscar en el glosario',
    searchPlaceholder: 'Busca una palabra, p. ej. API',
    filterLabel: 'Categorías',
    all: 'Todas',
    count_one: '{count} término',
    count_other: '{count} términos',
    example: 'Ejemplo',
    copyLink: 'Copiar enlace a «{term}»',
    emptyTitle: 'No hemos encontrado esa palabra',
    emptyText: 'Prueba con otra o pregúntala en el foro: seguro que alguien te la explica.',
    missingTitle: '¿Echas en falta alguna palabra?',
    missingText: 'Déjala en nuestro hilo del foro y la sumamos al glosario. ¡Entre todas y todos lo hacemos crecer!',
    missingCta: '¡Añádela a la lista!',
    categories: {
      basics: 'Lo básico',
      code: 'Git y GitHub',
      gitCommands: 'Comandos de Git',
      web: 'Web y apps',
      team: 'Trabajo en equipo',
      data: 'Datos e IA',
      jobs: 'Empleo',
    },
    teaser: {
      eyebrow: '¡Que no te pille por sorpresa!',
      title: 'Glosario para quien empieza',
      text: 'Las palabras que más vas a oír, explicadas en una frase y con un ejemplo. Ideal si vienes de otro sector.',
      termsLabel: 'Algunos términos del glosario',
      cta: 'Ver el glosario',
    },
    terms: {
      programar: {
        term: 'Programar',
        definition: 'Escribir instrucciones que un ordenador entiende y ejecuta para resolver un problema.',
        example: 'Programar una web que calcule cuánto te toca pagar a cada persona en una cena.',
      },
      lenguaje: {
        term: 'Lenguaje de programación',
        definition:
          'El idioma en el que se escriben esas instrucciones. Cada uno tiene sus reglas y se usa más para unas cosas que para otras.',
        example: 'JavaScript para webs, Python para datos e IA, Java para aplicaciones de empresa.',
      },
      algoritmo: {
        term: 'Algoritmo',
        definition: 'Una serie de pasos ordenados para resolver un problema. Como una receta de cocina.',
        example: 'Los pasos para ordenar una lista de nombres de la A a la Z.',
      },
      variable: {
        term: 'Variable',
        definition: 'Un espacio con nombre donde el programa guarda un dato para usarlo después.',
        example: 'Una variable «precio» que guarda 20 y luego se multiplica por la cantidad.',
      },
      funcion: {
        term: 'Función',
        definition:
          'Un bloque de código con nombre que hace una tarea concreta y se puede reutilizar tantas veces como quieras.',
        example: 'Una función «calcularIVA» a la que le das un precio y te devuelve el precio con IVA.',
      },
      bug: {
        term: 'Bug',
        definition: 'Un fallo en el programa que hace que no funcione como debería.',
        example: 'El botón «Comprar» no hace nada al pulsarlo.',
      },
      depurar: {
        term: 'Depurar (debug)',
        definition: 'Buscar por qué falla algo y arreglarlo, paso a paso.',
        example: 'Revisar qué valor tiene cada variable hasta encontrar dónde se rompe el cálculo.',
      },
      libreria: {
        term: 'Librería',
        definition:
          'Código ya hecho por otras personas que usas para no programarlo todo desde cero. Tú decides cuándo la llamas.',
        example: 'Usar una librería para mostrar fechas en formato «hace 2 días».',
      },
      framework: {
        term: 'Framework',
        definition:
          'Un marco de trabajo que te da la estructura y las herramientas para construir una aplicación. A diferencia de una librería, marca cómo organizar tu código.',
        example: 'Spring para aplicaciones Java, Angular o Next.js para webs.',
      },
      editor: {
        term: 'Editor de código (IDE)',
        definition:
          'El programa donde escribes código. Te ayuda coloreándolo, avisando de errores y completando lo que escribes.',
        example: 'Visual Studio Code o IntelliJ IDEA.',
      },
      git: {
        term: 'Git',
        definition:
          'Una herramienta que guarda el historial de cambios de tu código, para volver atrás si algo sale mal y trabajar en equipo sin pisaros.',
        example: 'Recuperar la versión de ayer de un archivo que has estropeado.',
      },
      repositorio: {
        term: 'Repositorio',
        definition: 'La carpeta de un proyecto con todo su código y su historial de cambios.',
        example: 'El repositorio de tu portfolio en GitHub.',
      },
      commit: {
        term: 'Commit',
        definition:
          'Guardar un conjunto de cambios en el historial, con un mensaje que explica qué has hecho. Tu primer commit es tu primer paso.',
        example: '`git commit -m "Añade el formulario de contacto"`: un mensaje claro y concreto, mejor que «cambios».',
      },
      rama: {
        term: 'Rama (branch)',
        definition:
          'Una copia paralela del código donde trabajar en algo nuevo sin tocar la versión principal hasta que esté listo.',
        example: 'Crear la rama «feature/buscador» para probar una idea sin romper la web. El nombre dice para qué es.',
      },
      pullRequest: {
        term: 'Pull request',
        definition: 'Una petición para que el equipo revise tus cambios antes de unirlos a la versión principal.',
        example: 'Abres un pull request y una compañera te sugiere mejoras antes de aprobarlo.',
      },
      merge: {
        term: 'Merge',
        definition: 'Unir los cambios de una rama con otra.',
        example: 'Cuando aprueban tu pull request, se hace merge a la rama principal.',
      },
      github: {
        term: 'GitHub',
        definition:
          'Una web donde se guardan repositorios para compartirlos y trabajar en equipo. También sirve como escaparate de tus proyectos.',
        example: 'Enlazar tu GitHub en el CV para que vean lo que has hecho.',
      },
      openSource: {
        term: 'Código abierto (open source)',
        definition: 'Código que cualquiera puede ver, usar y mejorar.',
        example: 'Corregir una errata en la documentación de un proyecto abierto es una buena primera contribución.',
      },
      controlVersiones: {
        term: 'Control de versiones',
        definition:
          'Llevar un registro de todos los cambios de un proyecto: quién cambió qué y cuándo. Así se puede volver atrás y trabajar en equipo sin pisarse.',
        example: 'Git es el sistema de control de versiones más usado.',
      },
      localRemoto: {
        term: 'Local y remoto',
        definition:
          'Local es la copia del proyecto que tienes en tu ordenador; remoto, la que está en internet (por ejemplo, en GitHub) y comparte todo el equipo.',
        example: 'Haces cambios en local y, cuando están listos, los subes al remoto.',
      },
      gitflow: {
        term: 'Gitflow',
        definition:
          'Una forma ordenada de organizar las ramas de un proyecto: main para lo publicado, develop para lo que se está desarrollando y ramas feature o hotfix para cada tarea o arreglo urgente.',
        example: 'Creas «feature/footer» desde develop y, cuando está lista, la unes de nuevo a develop.',
      },
      readme: {
        term: 'README',
        definition:
          'El archivo de presentación de un repositorio: explica qué es el proyecto, cómo instalarlo y cómo usarlo. Es lo primero que se ve en GitHub.',
        example: 'Un README con una captura, las tecnologías usadas y los pasos para ejecutarlo.',
      },
      clone: {
        term: 'Clonar (git clone)',
        definition: 'Descargar en tu ordenador una copia completa de un repositorio remoto, con todo su historial.',
        example: '`git clone` seguido de la dirección del repositorio, que copias del botón «Code» de GitHub.',
      },
      status: {
        term: 'git status',
        definition:
          'Te dice en qué rama estás y qué archivos has cambiado, preparado o aún no guardado. Úsalo a menudo.',
        example: 'Antes de hacer un commit, `git status` te enseña qué vas a incluir.',
      },
      staging: {
        term: 'Preparar cambios (git add)',
        definition:
          'Elegir qué cambios irán en el próximo commit. Los cambios elegidos pasan a una zona de preparación (staging).',
        example: '`git add .` prepara todos los cambios; `git add index.html`, solo ese archivo.',
      },
      push: {
        term: 'Push (git push)',
        definition: 'Subir tus commits de local al repositorio remoto para que el resto del equipo los tenga.',
        example: '`git push` después de terminar tu tarea.',
      },
      pull: {
        term: 'Pull (git pull)',
        definition: 'Traer a tu copia local los últimos cambios del remoto y unirlos con tu trabajo.',
        example: '`git pull` al empezar el día, para trabajar sobre lo más reciente.',
      },
      fetch: {
        term: 'Fetch (git fetch)',
        definition:
          'Descargar la información del remoto (ramas y commits nuevos) sin tocar tu trabajo. A diferencia de pull, no une nada.',
        example: '`git fetch` para ver si hay ramas nuevas antes de cambiarte a una.',
      },
      checkout: {
        term: 'Cambiar de rama (git switch)',
        definition:
          'Moverte a otra rama para trabajar en ella. `git checkout` hace lo mismo; con `-b`, además, la crea.',
        example: '`git switch develop`, o `git checkout -b feature/login` para crear una rama nueva y entrar en ella.',
      },
      log: {
        term: 'git log',
        definition: 'Muestra el historial de commits de la rama: quién hizo cada uno, cuándo y con qué mensaje.',
        example: '`git log --oneline` para ver el historial en una línea por commit.',
      },
      stash: {
        term: 'Stash (git stash)',
        definition:
          'Guardar aparte los cambios que aún no quieres confirmar para dejar limpia tu copia. No se pierden: los recuperas cuando quieras.',
        example: '`git stash` para cambiar de rama un momento y `git stash pop` para recuperar lo que tenías.',
      },
      frontend: {
        term: 'Frontend',
        definition: 'La parte de una web o app que ves y con la que interactúas: botones, textos, formularios.',
        example: 'El diseño y el comportamiento de la página de una tienda online.',
      },
      backend: {
        term: 'Backend',
        definition: 'La parte que no se ve: guarda los datos, aplica las reglas y responde a lo que pide el frontend.',
        example: 'Comprobar que tu contraseña es correcta cuando inicias sesión.',
      },
      fullStack: {
        term: 'Full stack',
        definition: 'Alguien que trabaja tanto en el frontend como en el backend.',
        example: 'Una persona que diseña el formulario de registro y también guarda los datos en la base de datos.',
      },
      api: {
        term: 'API',
        definition:
          'La forma en que dos programas se hablan: uno pide algo y el otro responde con los datos. Como un camarero entre tu mesa y la cocina.',
        example: 'Una app del tiempo pide a la API de un servicio meteorológico la previsión de tu ciudad.',
      },
      baseDeDatos: {
        term: 'Base de datos',
        definition: 'Donde una aplicación guarda la información de forma ordenada para buscarla rápido.',
        example: 'Los usuarios, pedidos y productos de una tienda online.',
      },
      servidor: {
        term: 'Servidor',
        definition:
          'Un ordenador, normalmente en un centro de datos, que está siempre encendido para dar servicio a una web o app.',
        example: 'El servidor recibe tu búsqueda y te devuelve los resultados.',
      },
      deploy: {
        term: 'Deploy (despliegue)',
        definition: 'Publicar una versión nueva de una aplicación para que la gente pueda usarla.',
        example: 'Hacer deploy de tu web para que tenga una dirección y cualquiera pueda entrar.',
      },
      nube: {
        term: 'La nube (cloud)',
        definition: 'Usar servidores de otras empresas a través de internet en lugar de tener los tuyos.',
        example: 'Guardar las fotos de una app en un servicio de almacenamiento en la nube.',
      },
      responsive: {
        term: 'Responsive',
        definition: 'Una web que se adapta bien a cualquier pantalla: móvil, tablet u ordenador.',
        example: 'En el móvil el menú se convierte en un botón y las columnas se ponen una debajo de otra.',
      },
      agile: {
        term: 'Agile',
        definition:
          'Una forma de trabajar en equipo entregando el producto en partes pequeñas y mejorándolo con lo que se aprende.',
        example: 'Publicar primero el registro y el inicio de sesión, y añadir más funciones cada pocas semanas.',
      },
      scrum: {
        term: 'Scrum',
        definition:
          'Una de las formas más usadas de trabajar en Agile, organizada en ciclos cortos con reuniones fijas.',
        example: 'Un equipo que planifica cada dos semanas, se reúne cada día y revisa al final lo que ha hecho.',
      },
      sprint: {
        term: 'Sprint',
        definition:
          'Un periodo corto, normalmente de una a cuatro semanas, en el que el equipo se compromete a terminar unas tareas.',
        example: 'En este sprint terminamos el carrito de la compra.',
      },
      daily: {
        term: 'Daily',
        definition: 'Una reunión diaria muy corta en la que cada persona cuenta en qué está y si algo la bloquea.',
        example: '«Ayer terminé el formulario; hoy hago las pruebas; necesito ayuda con un error».',
      },
      testing: {
        term: 'Testing (pruebas)',
        definition: 'Comprobar que el software hace lo que debe, a mano o con pruebas automáticas.',
        example: 'Una prueba que comprueba que no se puede comprar con el carrito vacío.',
      },
      codeReview: {
        term: 'Revisión de código',
        definition: 'Cuando otra persona del equipo lee tu código para detectar errores y proponer mejoras.',
        example: 'Te sugieren dar un nombre más claro a una función. Es normal y se aprende muchísimo.',
      },
      stack: {
        term: 'Stack',
        definition:
          'El conjunto de tecnologías con las que se construye un proyecto o con las que trabaja una empresa.',
        example: 'React en el frontend, Java y Spring en el backend y PostgreSQL como base de datos.',
      },
      ia: {
        term: 'Inteligencia artificial (IA)',
        definition:
          'Programas capaces de hacer tareas que parecen requerir inteligencia, como entender textos o reconocer imágenes.',
        example: 'Un asistente que resume un documento largo.',
      },
      machineLearning: {
        term: 'Machine learning',
        definition:
          'Una parte de la IA en la que el programa aprende a partir de ejemplos en lugar de seguir reglas escritas a mano.',
        example: 'Un filtro de spam que aprende de miles de correos marcados como spam.',
      },
      prompt: {
        term: 'Prompt',
        definition: 'La instrucción o pregunta que le escribes a una herramienta de IA.',
        example: '«Explícame qué es una API como si tuviera 10 años».',
      },
      sql: {
        term: 'SQL',
        definition: 'El lenguaje para consultar y modificar la información de una base de datos.',
        example: 'Pedir a la base de datos todos los pedidos de este mes.',
      },
      analisisDatos: {
        term: 'Análisis de datos',
        definition: 'Ordenar e interpretar datos para sacar conclusiones y ayudar a tomar decisiones.',
        example: 'Descubrir qué día de la semana se vende más en una tienda.',
      },
      junior: {
        term: 'Junior',
        definition:
          'Una persona que empieza en su profesión, normalmente con poca o ninguna experiencia laboral en el puesto. Lo que se espera es ganas de aprender, no saberlo todo.',
        example: 'Una oferta de «desarrollador/a junior» para personas recién formadas.',
      },
      portfolio: {
        term: 'Portfolio',
        definition: 'Una selección de tus proyectos que enseña lo que sabes hacer.',
        example: 'Tres proyectos en GitHub con capturas y una explicación de qué hiciste en cada uno.',
      },
      softSkills: {
        term: 'Soft skills',
        definition:
          'Habilidades para trabajar con otras personas: comunicarte, organizarte, pedir ayuda, aceptar comentarios. Pesan tanto como las técnicas.',
        example: 'Explicar a un compañero qué te bloquea en lugar de pasarte el día atascada.',
      },
      onboarding: {
        term: 'Onboarding',
        definition:
          'El periodo de acogida cuando entras en una empresa: te presentan al equipo, las herramientas y cómo se trabaja.',
        example: 'La primera semana instalas tu entorno y haces una tarea pequeña con ayuda.',
      },
      remoto: {
        term: 'Remoto e híbrido',
        definition:
          'Remoto es trabajar desde casa o desde donde quieras; híbrido, combinar días en la oficina con días en casa.',
        example: 'Una oferta híbrida con dos días a la semana en la oficina.',
      },
      ats: {
        term: 'ATS',
        definition:
          'Un programa que usan algunas empresas y portales para ordenar las candidaturas, por ejemplo según los requisitos de la oferta.',
        example: 'Por eso conviene usar en el CV las palabras de la oferta, siempre que sean ciertas.',
      },
    },
  },
  ca: {
    breadcrumb: 'Glossari',
    seoTitle: 'Glossari tech per a qui comença',
    seoDescription:
      'Les paraules que sentiràs quan comencis en tecnologia, explicades en una frase i amb un exemple: API, commit, deploy, sprint, framework i moltes més.',
    eyebrow: 'Glossari',
    title: 'Les paraules que sentiràs',
    intro:
      'API, commit, deploy, sprint… Si vens d’un altre sector, el primer dia sembla un altre idioma. Aquí ho tens explicat en una frase i amb un exemple.',
    searchLabel: 'Cerca al glossari',
    searchPlaceholder: 'Cerca una paraula, p. ex. API',
    filterLabel: 'Categories',
    all: 'Totes',
    count_one: '{count} terme',
    count_other: '{count} termes',
    example: 'Exemple',
    copyLink: 'Copia l’enllaç a «{term}»',
    emptyTitle: 'No hem trobat aquesta paraula',
    emptyText: 'Prova’n una altra o pregunta-la al fòrum: segur que algú te l’explica.',
    missingTitle: 'Trobes a faltar alguna paraula?',
    missingText: 'Deixa-la al nostre fil del fòrum i la sumem al glossari. Entre tots i totes el fem créixer!',
    missingCta: 'Afegeix-la a la llista!',
    categories: {
      basics: 'El més bàsic',
      code: 'Git i GitHub',
      gitCommands: 'Ordres de Git',
      web: 'Web i apps',
      team: 'Treball en equip',
      data: 'Dades i IA',
      jobs: 'Feina',
    },
    teaser: {
      eyebrow: 'Que no t’agafi per sorpresa!',
      title: 'Glossari per a qui comença',
      text: 'Les paraules que més sentiràs, explicades en una frase i amb un exemple. Ideal si vens d’un altre sector.',
      termsLabel: 'Alguns termes del glossari',
      cta: 'Veure el glossari',
    },
    terms: {
      programar: {
        term: 'Programar',
        definition: 'Escriure instruccions que un ordinador entén i executa per resoldre un problema.',
        example: 'Programar una web que calculi quant ha de pagar cada persona en un sopar.',
      },
      lenguaje: {
        term: 'Llenguatge de programació',
        definition:
          'L’idioma en què s’escriuen aquestes instruccions. Cadascun té les seves regles i s’utilitza més per a unes coses que per a d’altres.',
        example: 'JavaScript per a webs, Python per a dades i IA, Java per a aplicacions d’empresa.',
      },
      algoritmo: {
        term: 'Algorisme',
        definition: 'Una sèrie de passos ordenats per resoldre un problema. Com una recepta de cuina.',
        example: 'Els passos per ordenar una llista de noms de la A a la Z.',
      },
      variable: {
        term: 'Variable',
        definition: 'Un espai amb nom on el programa desa una dada per fer-la servir després.',
        example: 'Una variable «preu» que desa 20 i després es multiplica per la quantitat.',
      },
      funcion: {
        term: 'Funció',
        definition:
          'Un bloc de codi amb nom que fa una tasca concreta i es pot reutilitzar tantes vegades com vulguis.',
        example: 'Una funció «calcularIVA» a la qual dones un preu i et torna el preu amb IVA.',
      },
      bug: {
        term: 'Bug',
        definition: 'Un error del programa que fa que no funcioni com hauria de funcionar.',
        example: 'El botó «Compra» no fa res quan el prems.',
      },
      depurar: {
        term: 'Depurar (debug)',
        definition: 'Buscar per què falla alguna cosa i arreglar-la, pas a pas.',
        example: 'Revisar quin valor té cada variable fins a trobar on es trenca el càlcul.',
      },
      libreria: {
        term: 'Llibreria',
        definition:
          'Codi ja fet per altres persones que fas servir per no programar-ho tot des de zero. Tu decideixes quan la crides.',
        example: 'Fer servir una llibreria per mostrar dates en format «fa 2 dies».',
      },
      framework: {
        term: 'Framework',
        definition:
          'Un marc de treball que et dona l’estructura i les eines per construir una aplicació. A diferència d’una llibreria, marca com organitzar el teu codi.',
        example: 'Spring per a aplicacions Java, Angular o Next.js per a webs.',
      },
      editor: {
        term: 'Editor de codi (IDE)',
        definition:
          'El programa on escrius codi. T’ajuda acolorint-lo, avisant dels errors i completant el que escrius.',
        example: 'Visual Studio Code o IntelliJ IDEA.',
      },
      git: {
        term: 'Git',
        definition:
          'Una eina que desa l’historial de canvis del teu codi, per tornar enrere si alguna cosa va malament i treballar en equip sense trepitjar-vos.',
        example: 'Recuperar la versió d’ahir d’un fitxer que has espatllat.',
      },
      repositorio: {
        term: 'Repositori',
        definition: 'La carpeta d’un projecte amb tot el seu codi i el seu historial de canvis.',
        example: 'El repositori del teu portfolio a GitHub.',
      },
      commit: {
        term: 'Commit',
        definition:
          'Desar un conjunt de canvis a l’historial, amb un missatge que explica què has fet. El teu primer commit és el teu primer pas.',
        example: '`git commit -m "Afegeix el formulari de contacte"`: un missatge clar i concret, millor que «canvis».',
      },
      rama: {
        term: 'Branca (branch)',
        definition:
          'Una còpia paral·lela del codi on treballar en alguna cosa nova sense tocar la versió principal fins que estigui llesta.',
        example:
          'Crear la branca «feature/cercador» per provar una idea sense trencar la web. El nom diu per a què és.',
      },
      pullRequest: {
        term: 'Pull request',
        definition: 'Una petició perquè l’equip revisi els teus canvis abans d’unir-los a la versió principal.',
        example: 'Obres un pull request i una companya et suggereix millores abans d’aprovar-lo.',
      },
      merge: {
        term: 'Merge',
        definition: 'Unir els canvis d’una branca amb una altra.',
        example: 'Quan aproven el teu pull request, se’n fa el merge a la branca principal.',
      },
      github: {
        term: 'GitHub',
        definition:
          'Una web on es desen repositoris per compartir-los i treballar en equip. També serveix d’aparador dels teus projectes.',
        example: 'Enllaçar el teu GitHub al CV perquè vegin el que has fet.',
      },
      openSource: {
        term: 'Codi obert (open source)',
        definition: 'Codi que qualsevol persona pot veure, fer servir i millorar.',
        example: 'Corregir una errata a la documentació d’un projecte obert és una bona primera contribució.',
      },
      controlVersiones: {
        term: 'Control de versions',
        definition:
          'Portar un registre de tots els canvis d’un projecte: qui va canviar què i quan. Així es pot tornar enrere i treballar en equip sense trepitjar-se.',
        example: 'Git és el sistema de control de versions més utilitzat.',
      },
      localRemoto: {
        term: 'Local i remot',
        definition:
          'Local és la còpia del projecte que tens al teu ordinador; remot, la que és a internet (per exemple, a GitHub) i comparteix tot l’equip.',
        example: 'Fas canvis en local i, quan estan llestos, els puges al remot.',
      },
      gitflow: {
        term: 'Gitflow',
        definition:
          'Una manera ordenada d’organitzar les branques d’un projecte: main per al que està publicat, develop per al que s’està desenvolupant i branques feature o hotfix per a cada tasca o arranjament urgent.',
        example: 'Crees «feature/footer» des de develop i, quan està llesta, la tornes a unir a develop.',
      },
      readme: {
        term: 'README',
        definition:
          'El fitxer de presentació d’un repositori: explica què és el projecte, com instal·lar-lo i com fer-lo servir. És el primer que es veu a GitHub.',
        example: 'Un README amb una captura, les tecnologies utilitzades i els passos per executar-lo.',
      },
      clone: {
        term: 'Clonar (git clone)',
        definition: 'Descarregar al teu ordinador una còpia completa d’un repositori remot, amb tot el seu historial.',
        example: '`git clone` seguit de l’adreça del repositori, que copies del botó «Code» de GitHub.',
      },
      status: {
        term: 'git status',
        definition:
          'Et diu en quina branca ets i quins fitxers has canviat, preparat o encara no has desat. Fes-lo servir sovint.',
        example: 'Abans de fer un commit, `git status` et mostra què hi inclouràs.',
      },
      staging: {
        term: 'Preparar canvis (git add)',
        definition:
          'Triar quins canvis aniran al proper commit. Els canvis triats passen a una zona de preparació (staging).',
        example: '`git add .` prepara tots els canvis; `git add index.html`, només aquest fitxer.',
      },
      push: {
        term: 'Push (git push)',
        definition: 'Pujar els teus commits de local al repositori remot perquè la resta de l’equip els tingui.',
        example: '`git push` després d’acabar la teva tasca.',
      },
      pull: {
        term: 'Pull (git pull)',
        definition: 'Portar a la teva còpia local els darrers canvis del remot i unir-los amb la teva feina.',
        example: '`git pull` en començar el dia, per treballar sobre el més recent.',
      },
      fetch: {
        term: 'Fetch (git fetch)',
        definition:
          'Descarregar la informació del remot (branques i commits nous) sense tocar la teva feina. A diferència de pull, no uneix res.',
        example: '`git fetch` per veure si hi ha branques noves abans de canviar-te a una.',
      },
      checkout: {
        term: 'Canviar de branca (git switch)',
        definition:
          'Moure’t a una altra branca per treballar-hi. `git checkout` fa el mateix; amb `-b`, a més, la crea.',
        example: '`git switch develop`, o `git checkout -b feature/login` per crear una branca nova i entrar-hi.',
      },
      log: {
        term: 'git log',
        definition: 'Mostra l’historial de commits de la branca: qui va fer cadascun, quan i amb quin missatge.',
        example: '`git log --oneline` per veure l’historial en una línia per commit.',
      },
      stash: {
        term: 'Stash (git stash)',
        definition:
          'Desar a part els canvis que encara no vols confirmar per deixar neta la teva còpia. No es perden: els recuperes quan vulguis.',
        example: '`git stash` per canviar de branca un moment i `git stash pop` per recuperar el que tenies.',
      },
      frontend: {
        term: 'Frontend',
        definition: 'La part d’una web o app que veus i amb què interactues: botons, textos, formularis.',
        example: 'El disseny i el comportament de la pàgina d’una botiga en línia.',
      },
      backend: {
        term: 'Backend',
        definition: 'La part que no es veu: desa les dades, aplica les regles i respon al que demana el frontend.',
        example: 'Comprovar que la teva contrasenya és correcta quan inicies la sessió.',
      },
      fullStack: {
        term: 'Full stack',
        definition: 'Algú que treballa tant al frontend com al backend.',
        example: 'Una persona que dissenya el formulari de registre i també desa les dades a la base de dades.',
      },
      api: {
        term: 'API',
        definition:
          'La manera com dos programes es parlen: un demana alguna cosa i l’altre respon amb les dades. Com un cambrer entre la teva taula i la cuina.',
        example: 'Una app del temps demana a l’API d’un servei meteorològic la previsió de la teva ciutat.',
      },
      baseDeDatos: {
        term: 'Base de dades',
        definition: 'On una aplicació desa la informació de manera ordenada per trobar-la ràpidament.',
        example: 'Els usuaris, comandes i productes d’una botiga en línia.',
      },
      servidor: {
        term: 'Servidor',
        definition:
          'Un ordinador, normalment en un centre de dades, que està sempre encès per donar servei a una web o app.',
        example: 'El servidor rep la teva cerca i et torna els resultats.',
      },
      deploy: {
        term: 'Deploy (desplegament)',
        definition: 'Publicar una versió nova d’una aplicació perquè la gent la pugui fer servir.',
        example: 'Fer el deploy de la teva web perquè tingui una adreça i qualsevol hi pugui entrar.',
      },
      nube: {
        term: 'El núvol (cloud)',
        definition: 'Fer servir servidors d’altres empreses a través d’internet en lloc de tenir-ne de propis.',
        example: 'Desar les fotos d’una app en un servei d’emmagatzematge al núvol.',
      },
      responsive: {
        term: 'Responsive',
        definition: 'Una web que s’adapta bé a qualsevol pantalla: mòbil, tauleta o ordinador.',
        example: 'Al mòbil el menú es converteix en un botó i les columnes es posen una sota l’altra.',
      },
      agile: {
        term: 'Agile',
        definition:
          'Una manera de treballar en equip lliurant el producte en parts petites i millorant-lo amb el que s’aprèn.',
        example: 'Publicar primer el registre i l’inici de sessió, i afegir més funcions cada poques setmanes.',
      },
      scrum: {
        term: 'Scrum',
        definition:
          'Una de les maneres més utilitzades de treballar en Agile, organitzada en cicles curts amb reunions fixes.',
        example: 'Un equip que planifica cada dues setmanes, es reuneix cada dia i revisa al final el que ha fet.',
      },
      sprint: {
        term: 'Sprint',
        definition:
          'Un període curt, normalment d’una a quatre setmanes, en què l’equip es compromet a acabar unes tasques.',
        example: 'En aquest sprint acabem el carretó de la compra.',
      },
      daily: {
        term: 'Daily',
        definition:
          'Una reunió diària molt curta en què cada persona explica en què està i si alguna cosa la bloqueja.',
        example: '«Ahir vaig acabar el formulari; avui faig les proves; necessito ajuda amb un error».',
      },
      testing: {
        term: 'Testing (proves)',
        definition: 'Comprovar que el programari fa el que ha de fer, a mà o amb proves automàtiques.',
        example: 'Una prova que comprova que no es pot comprar amb el carretó buit.',
      },
      codeReview: {
        term: 'Revisió de codi',
        definition: 'Quan una altra persona de l’equip llegeix el teu codi per detectar errors i proposar millores.',
        example: 'Et suggereixen donar un nom més clar a una funció. És normal i s’aprèn moltíssim.',
      },
      stack: {
        term: 'Stack',
        definition: 'El conjunt de tecnologies amb què es construeix un projecte o amb què treballa una empresa.',
        example: 'React al frontend, Java i Spring al backend i PostgreSQL com a base de dades.',
      },
      ia: {
        term: 'Intel·ligència artificial (IA)',
        definition:
          'Programes capaços de fer tasques que semblen requerir intel·ligència, com entendre textos o reconèixer imatges.',
        example: 'Un assistent que resumeix un document llarg.',
      },
      machineLearning: {
        term: 'Machine learning',
        definition:
          'Una part de la IA en què el programa aprèn a partir d’exemples en lloc de seguir regles escrites a mà.',
        example: 'Un filtre de correu brossa que aprèn de milers de correus marcats com a brossa.',
      },
      prompt: {
        term: 'Prompt',
        definition: 'La instrucció o pregunta que escrius a una eina d’IA.',
        example: '«Explica’m què és una API com si tingués 10 anys».',
      },
      sql: {
        term: 'SQL',
        definition: 'El llenguatge per consultar i modificar la informació d’una base de dades.',
        example: 'Demanar a la base de dades totes les comandes d’aquest mes.',
      },
      analisisDatos: {
        term: 'Anàlisi de dades',
        definition: 'Ordenar i interpretar dades per treure’n conclusions i ajudar a prendre decisions.',
        example: 'Descobrir quin dia de la setmana es ven més en una botiga.',
      },
      junior: {
        term: 'Júnior',
        definition:
          'Una persona que comença en la seva professió, normalment amb poca o cap experiència laboral en el lloc. El que s’espera són ganes d’aprendre, no saber-ho tot.',
        example: 'Una oferta de «desenvolupador/a júnior» per a persones acabades de formar.',
      },
      portfolio: {
        term: 'Portfolio',
        definition: 'Una selecció dels teus projectes que mostra el que saps fer.',
        example: 'Tres projectes a GitHub amb captures i una explicació del que vas fer en cadascun.',
      },
      softSkills: {
        term: 'Soft skills',
        definition:
          'Habilitats per treballar amb altres persones: comunicar-te, organitzar-te, demanar ajuda, acceptar comentaris. Pesen tant com les tècniques.',
        example: 'Explicar a un company què et bloqueja en lloc de passar-te el dia encallada.',
      },
      onboarding: {
        term: 'Onboarding',
        definition:
          'El període d’acollida quan entres en una empresa: et presenten l’equip, les eines i com es treballa.',
        example: 'La primera setmana instal·les el teu entorn i fas una tasca petita amb ajuda.',
      },
      remoto: {
        term: 'Remot i híbrid',
        definition:
          'Remot és treballar des de casa o des d’on vulguis; híbrid, combinar dies a l’oficina amb dies a casa.',
        example: 'Una oferta híbrida amb dos dies a la setmana a l’oficina.',
      },
      ats: {
        term: 'ATS',
        definition:
          'Un programa que fan servir algunes empreses i portals per ordenar les candidatures, per exemple segons els requisits de l’oferta.',
        example: 'Per això convé fer servir al CV les paraules de l’oferta, sempre que siguin certes.',
      },
    },
  },
  en: {
    breadcrumb: 'Glossary',
    seoTitle: 'Tech glossary for beginners',
    seoDescription:
      'The words you’ll hear when you start in tech, explained in one sentence with an example: API, commit, deploy, sprint, framework and many more.',
    eyebrow: 'Glossary',
    title: 'The words you’ll hear',
    intro:
      'API, commit, deploy, sprint… If you come from another field, day one feels like a different language. Here it is, explained in one sentence with an example.',
    searchLabel: 'Search the glossary',
    searchPlaceholder: 'Search a word, e.g. API',
    filterLabel: 'Categories',
    all: 'All',
    count_one: '{count} term',
    count_other: '{count} terms',
    example: 'Example',
    copyLink: 'Copy link to «{term}»',
    emptyTitle: 'We couldn’t find that word',
    emptyText: 'Try another one or ask in the forum: someone will surely explain it.',
    missingTitle: 'Missing a word?',
    missingText: 'Drop it in our forum thread and we’ll add it to the glossary. Let’s grow it together!',
    missingCta: 'Add it to the list!',
    categories: {
      basics: 'The basics',
      code: 'Git and GitHub',
      gitCommands: 'Git commands',
      web: 'Web and apps',
      team: 'Teamwork',
      data: 'Data and AI',
      jobs: 'Jobs',
    },
    teaser: {
      eyebrow: 'Don’t get caught off guard!',
      title: 'Glossary for beginners',
      text: 'The words you’ll hear the most, explained in one sentence with an example. Ideal if you come from another field.',
      termsLabel: 'Some glossary terms',
      cta: 'See the glossary',
    },
    terms: {
      programar: {
        term: 'Programming',
        definition: 'Writing instructions that a computer understands and runs to solve a problem.',
        example: 'Building a website that works out how much each person owes after a dinner.',
      },
      lenguaje: {
        term: 'Programming language',
        definition:
          'The language those instructions are written in. Each one has its own rules and is used more for some things than others.',
        example: 'JavaScript for websites, Python for data and AI, Java for business applications.',
      },
      algoritmo: {
        term: 'Algorithm',
        definition: 'A series of ordered steps to solve a problem. Like a recipe.',
        example: 'The steps to sort a list of names from A to Z.',
      },
      variable: {
        term: 'Variable',
        definition: 'A named space where the program stores a value to use later.',
        example: 'A «price» variable that stores 20 and is then multiplied by the quantity.',
      },
      funcion: {
        term: 'Function',
        definition: 'A named block of code that does one specific task and can be reused as many times as you like.',
        example: 'A «calculateVAT» function: you give it a price and it returns the price with VAT.',
      },
      bug: {
        term: 'Bug',
        definition: 'A fault in a program that stops it from working as it should.',
        example: 'The «Buy» button does nothing when you click it.',
      },
      depurar: {
        term: 'Debugging',
        definition: 'Finding out why something fails and fixing it, step by step.',
        example: 'Checking the value of each variable until you find where the calculation breaks.',
      },
      libreria: {
        term: 'Library',
        definition:
          'Ready-made code written by other people that you use so you don’t have to build everything from scratch. You decide when to call it.',
        example: 'Using a library to show dates as «2 days ago».',
      },
      framework: {
        term: 'Framework',
        definition:
          'A working structure that gives you the foundation and tools to build an application. Unlike a library, it sets how your code is organised.',
        example: 'Spring for Java applications, Angular or Next.js for websites.',
      },
      editor: {
        term: 'Code editor (IDE)',
        definition:
          'The program where you write code. It helps by colouring it, flagging errors and completing what you type.',
        example: 'Visual Studio Code or IntelliJ IDEA.',
      },
      git: {
        term: 'Git',
        definition:
          'A tool that keeps the history of changes to your code, so you can go back if something breaks and work as a team without overwriting each other.',
        example: 'Getting back yesterday’s version of a file you broke.',
      },
      repositorio: {
        term: 'Repository',
        definition: 'The folder of a project, with all its code and its history of changes.',
        example: 'Your portfolio repository on GitHub.',
      },
      commit: {
        term: 'Commit',
        definition:
          'Saving a set of changes to the history, with a message explaining what you did. Your first commit is your first step.',
        example: '`git commit -m "Add the contact form"`: a clear, specific message beats «changes».',
      },
      rama: {
        term: 'Branch',
        definition:
          'A parallel copy of the code where you work on something new without touching the main version until it’s ready.',
        example:
          'Creating a «feature/search» branch to try an idea without breaking the website. The name says what it’s for.',
      },
      pullRequest: {
        term: 'Pull request',
        definition: 'A request for the team to review your changes before they are merged into the main version.',
        example: 'You open a pull request and a teammate suggests improvements before approving it.',
      },
      merge: {
        term: 'Merge',
        definition: 'Joining the changes from one branch into another.',
        example: 'Once your pull request is approved, it gets merged into the main branch.',
      },
      github: {
        term: 'GitHub',
        definition:
          'A website where repositories are stored to share them and work as a team. It also works as a showcase for your projects.',
        example: 'Linking your GitHub in your CV so they can see what you’ve built.',
      },
      openSource: {
        term: 'Open source',
        definition: 'Code that anyone can see, use and improve.',
        example: 'Fixing a typo in an open project’s documentation is a great first contribution.',
      },
      controlVersiones: {
        term: 'Version control',
        definition:
          'Keeping a record of every change to a project: who changed what and when. That way you can go back and work as a team without overwriting each other.',
        example: 'Git is the most widely used version control system.',
      },
      localRemoto: {
        term: 'Local and remote',
        definition:
          'Local is the copy of the project on your computer; remote is the one online (for example, on GitHub) that the whole team shares.',
        example: 'You make changes locally and, when they’re ready, push them to the remote.',
      },
      gitflow: {
        term: 'Gitflow',
        definition:
          'An organised way to structure a project’s branches: main for what’s released, develop for what’s being built, and feature or hotfix branches for each task or urgent fix.',
        example: 'You create «feature/footer» from develop and merge it back into develop when it’s ready.',
      },
      readme: {
        term: 'README',
        definition:
          'A repository’s introduction file: it explains what the project is, how to install it and how to use it. It’s the first thing you see on GitHub.',
        example: 'A README with a screenshot, the technologies used and the steps to run it.',
      },
      clone: {
        term: 'Clone (git clone)',
        definition: 'Downloading a full copy of a remote repository to your computer, with all its history.',
        example: '`git clone` followed by the repository address, which you copy from the “Code” button on GitHub.',
      },
      status: {
        term: 'git status',
        definition:
          'Tells you which branch you’re on and which files you’ve changed, staged or not saved yet. Use it often.',
        example: 'Before committing, `git status` shows you what you’re about to include.',
      },
      staging: {
        term: 'Staging changes (git add)',
        definition: 'Choosing which changes go into the next commit. The chosen changes move to a staging area.',
        example: '`git add .` stages every change; `git add index.html`, just that file.',
      },
      push: {
        term: 'Push (git push)',
        definition: 'Uploading your local commits to the remote repository so the rest of the team has them.',
        example: '`git push` once you’ve finished your task.',
      },
      pull: {
        term: 'Pull (git pull)',
        definition: 'Bringing the latest changes from the remote into your local copy and merging them with your work.',
        example: '`git pull` at the start of the day, so you work on the latest version.',
      },
      fetch: {
        term: 'Fetch (git fetch)',
        definition:
          'Downloading the remote’s information (new branches and commits) without touching your work. Unlike pull, it doesn’t merge anything.',
        example: '`git fetch` to check for new branches before switching to one.',
      },
      checkout: {
        term: 'Switching branches (git switch)',
        definition:
          'Moving to another branch to work on it. `git checkout` does the same; with `-b` it also creates it.',
        example: '`git switch develop`, or `git checkout -b feature/login` to create a new branch and move to it.',
      },
      log: {
        term: 'git log',
        definition: 'Shows the branch’s commit history: who made each one, when and with what message.',
        example: '`git log --oneline` to see the history with one line per commit.',
      },
      stash: {
        term: 'Stash (git stash)',
        definition:
          'Setting aside changes you don’t want to commit yet so your copy is clean. They’re not lost: you get them back whenever you like.',
        example: '`git stash` to switch branches for a moment and `git stash pop` to get your work back.',
      },
      frontend: {
        term: 'Frontend',
        definition: 'The part of a website or app you see and interact with: buttons, text, forms.',
        example: 'The design and behaviour of an online shop’s pages.',
      },
      backend: {
        term: 'Backend',
        definition:
          'The part you don’t see: it stores the data, applies the rules and answers what the frontend asks for.',
        example: 'Checking that your password is correct when you sign in.',
      },
      fullStack: {
        term: 'Full stack',
        definition: 'Someone who works on both the frontend and the backend.',
        example: 'A person who designs the sign-up form and also saves the data in the database.',
      },
      api: {
        term: 'API',
        definition:
          'The way two programs talk: one asks for something and the other answers with the data. Like a waiter between your table and the kitchen.',
        example: 'A weather app asks a weather service’s API for your city’s forecast.',
      },
      baseDeDatos: {
        term: 'Database',
        definition: 'Where an application stores information in an organised way so it can find it quickly.',
        example: 'The users, orders and products of an online shop.',
      },
      servidor: {
        term: 'Server',
        definition: 'A computer, usually in a data centre, that is always on to serve a website or app.',
        example: 'The server receives your search and sends back the results.',
      },
      deploy: {
        term: 'Deploy',
        definition: 'Publishing a new version of an application so people can use it.',
        example: 'Deploying your website so it has an address and anyone can visit it.',
      },
      nube: {
        term: 'The cloud',
        definition: 'Using other companies’ servers over the internet instead of running your own.',
        example: 'Storing an app’s photos in a cloud storage service.',
      },
      responsive: {
        term: 'Responsive',
        definition: 'A website that adapts well to any screen: phone, tablet or computer.',
        example: 'On a phone the menu turns into a button and the columns stack one under another.',
      },
      agile: {
        term: 'Agile',
        definition:
          'A way of working as a team that delivers the product in small parts and improves it with what you learn.',
        example: 'Releasing sign-up and sign-in first, then adding features every few weeks.',
      },
      scrum: {
        term: 'Scrum',
        definition: 'One of the most common ways of working in Agile, organised in short cycles with set meetings.',
        example: 'A team that plans every two weeks, meets every day and reviews what it did at the end.',
      },
      sprint: {
        term: 'Sprint',
        definition: 'A short period, usually one to four weeks, in which the team commits to finishing some tasks.',
        example: 'This sprint we finish the shopping cart.',
      },
      daily: {
        term: 'Daily',
        definition:
          'A very short daily meeting where each person shares what they’re working on and whether anything is blocking them.',
        example: '«Yesterday I finished the form; today I’m writing the tests; I need help with an error».',
      },
      testing: {
        term: 'Testing',
        definition: 'Checking that software does what it should, by hand or with automated tests.',
        example: 'A test that checks you can’t check out with an empty cart.',
      },
      codeReview: {
        term: 'Code review',
        definition: 'When another person on the team reads your code to spot mistakes and suggest improvements.',
        example: 'They suggest a clearer name for a function. It’s normal and you learn a lot.',
      },
      stack: {
        term: 'Stack',
        definition: 'The set of technologies a project is built with, or that a company works with.',
        example: 'React on the frontend, Java and Spring on the backend and PostgreSQL as the database.',
      },
      ia: {
        term: 'Artificial intelligence (AI)',
        definition:
          'Programs able to do tasks that seem to need intelligence, like understanding text or recognising images.',
        example: 'An assistant that summarises a long document.',
      },
      machineLearning: {
        term: 'Machine learning',
        definition: 'A part of AI where the program learns from examples instead of following rules written by hand.',
        example: 'A spam filter that learns from thousands of emails marked as spam.',
      },
      prompt: {
        term: 'Prompt',
        definition: 'The instruction or question you write to an AI tool.',
        example: '«Explain what an API is as if I were 10».',
      },
      sql: {
        term: 'SQL',
        definition: 'The language used to query and change the information in a database.',
        example: 'Asking the database for all of this month’s orders.',
      },
      analisisDatos: {
        term: 'Data analysis',
        definition: 'Organising and interpreting data to draw conclusions and help make decisions.',
        example: 'Finding out which day of the week a shop sells the most.',
      },
      junior: {
        term: 'Junior',
        definition:
          'Someone starting out in their profession, usually with little or no work experience in the role. What’s expected is a willingness to learn, not knowing everything.',
        example: 'A «junior developer» job for people who have just finished their training.',
      },
      portfolio: {
        term: 'Portfolio',
        definition: 'A selection of your projects that shows what you can do.',
        example: 'Three projects on GitHub with screenshots and a note on what you did in each.',
      },
      softSkills: {
        term: 'Soft skills',
        definition:
          'Skills for working with other people: communicating, getting organised, asking for help, taking feedback. They matter as much as technical skills.',
        example: 'Telling a teammate what’s blocking you instead of spending the day stuck.',
      },
      onboarding: {
        term: 'Onboarding',
        definition: 'The welcome period when you join a company: you meet the team, the tools and how things are done.',
        example: 'In your first week you set up your environment and do a small task with help.',
      },
      remoto: {
        term: 'Remote and hybrid',
        definition:
          'Remote means working from home or wherever you like; hybrid means mixing office days with home days.',
        example: 'A hybrid job with two days a week in the office.',
      },
      ats: {
        term: 'ATS',
        definition:
          'Software some companies and job sites use to sort applications, for example by the job’s requirements.',
        example: 'That’s why it helps to use the job ad’s words in your CV, as long as they’re true.',
      },
    },
  },
}
