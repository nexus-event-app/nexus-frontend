# Primer Commit · frontend

Normas de código del proyecto. Se aplican a todo lo que se escriba a partir de ahora.

## HTML semántico, sin `<div>`

- **Prohibido `<div>`.** ESLint da error si aparece (`npm run lint`), también en la CI.
- Cada elemento lleva la etiqueta que expresa su significado:
  - Página: cada página renderiza su propio `<main>` con `PageMain` (`@/shared/components/PageMain`). Sus hijos
    directos son ya los elementos con significado: `nav` (migas), `article`, `aside`, `section`...
  - Estructura: `header`, `footer`, `nav`, `section` (siempre con su título), `article`, `aside`.
  - Títulos con subtítulo: `hgroup`. Listas: `ul`/`ol` con `li`. Pares dato/valor: `dl` con `dt`/`dd`.
  - Grupos de acciones (botones o enlaces): `ActionMenu` (`<menu>` con un `<li>` por acción).
  - Búsqueda y filtros: `<search>`. Grupos de campos: `fieldset` con `legend`.
  - Campo de formulario: `FormField` (un `<p>` con etiqueta, campo, ayuda y error, como indica la especificación).
  - Tablas: `DataTable` (dentro de un `<figure>` desplazable y enfocable). Imágenes con pie: `figure`/`figcaption`.
- Si un contenedor solo sirve para maquetar, **quítalo**: pasa sus clases al padre, usa CSS Grid (`col-span-full`,
  `row-span-*`, `grid-cols-[...]`), fragmentos de React o estas utilidades de `src/index.css`:
  - `.page-container`: columna centrada de la página. `.page-gutter`: lo mismo sin envoltorio, para elementos
    con fondo a todo el ancho.
  - `.form-grid` con `.field-half` / `.field-third`: formularios en rejilla sin agrupar campos.
- Nunca uses `section`, `p` u otra etiqueta solo para evitar un `<div>`: cada etiqueta debe ser la correcta.

## Accesibilidad (WCAG 2.2 AA)

- Un solo `<h1>` y un solo `<main>` por página; títulos en orden; ningún `id` repetido.
- Todo control con nombre accesible (texto visible, `aria-label` o etiqueta asociada); objetivos táctiles de 44 px.
- Contraste suficiente en tema claro y oscuro: usa los colores del tema (`ink`, `canvas`, `surface`, `accent`...).
- Comprueba con axe las páginas nuevas o cambiadas, en claro y oscuro, escritorio y móvil.

## Pruebas

- **Unitarias y de componentes** (Vitest + Testing Library, `npm test`): junto al archivo que prueban, como
  `Componente.test.jsx`. Pinta con `renderWithProviders` (`@/test/render`), que pone router, idioma, sesión y avisos.
  Busca los elementos como los encuentra una persona: `getByRole`, `getByLabelText`... nunca por clases.
- **De extremo a extremo** (Playwright, `npm run test:e2e`): en `e2e/`, con la API simulada en `e2e/fixtures.js`
  y los datos en `e2e/data.js`. Se ejecutan en escritorio y móvil, y `accesibilidad.spec.js` pasa axe a las páginas
  principales en tema claro y oscuro: añade ahí cada página nueva.
- Todo cambio de lógica o de componente lleva su prueba. Corregir un fallo empieza por una prueba que lo reproduce.

## Estilo y calidad

- Tipografía Ubuntu servida desde la propia web (`@fontsource/ubuntu`, nunca desde Google Fonts por privacidad).
- Animaciones suaves y con propósito (`animate-rise-in`, `animate-drift`...): ninguna debe ser necesaria para entender
  el contenido y todas se desactivan con «reducir movimiento» (index.css). axe espera a que terminen las de entrada.

- Antetítulo (`Eyebrow`, con su punto) y título de un apartado van siempre fuera, encima de su bloque: nunca dentro
  de una tarjeta o recuadro. La tarjeta lleva solo el contenido.

- Tarjetas que son un enlace entero (el enlace del título con `after:absolute after:inset-0`): las pistas visuales
  («Leer noticia», la flecha...) llevan `aria-hidden` y `pointer-events-none`, para que el clic siempre llegue al enlace
  aunque se muevan al pasar el ratón. Lo comprueba `e2e/tarjetas.spec.js`.

- Formato: `.prettierrc.json` (sin punto y coma, comillas simples, 120 caracteres).
- Textos visibles traducidos en `src/shared/i18n/messages` (castellano, catalán e inglés); `npm run check:i18n`.
- Rutas por idioma en `src/shared/i18n/routeSegments.js`; `npm run check:routes`.
- Antes de subir: `npm run lint`, `npm run check:i18n`, `npm run check:routes`, `npm test`, `npm run test:e2e`
  y `npm run build`.
- Comentarios y nombres en castellano, explicando el porqué cuando no es evidente.
- Nunca datos personales en el código: los datos legales vienen de variables `VITE_LEGAL_*`.
