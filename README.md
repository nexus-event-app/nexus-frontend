# Primer Commit · Frontend

Frontend de **Primer Commit**, una comunidad tech en español para perfiles junior: noticias, ofertas de empleo, foro y testimonios, con registro de usuarios y un panel de administración.

## Stack

- React 19 (componentes funcionales, runtime JSX automático)
- Vite 7 con `@vitejs/plugin-react`
- Tailwind CSS 3 con tokens de diseño en `tailwind.config.js`
- react-router-dom 7 (rutas con `React.lazy` + `Suspense`)
- axios (cliente HTTP único)
- ESLint 9 con `eslint-plugin-react-hooks` y `eslint-plugin-react-refresh`

No hay librerías de estado, de formularios ni de UI: el estado de servidor vive en hooks propios (`useRequest`, `useAction`, `useForm`) y la autenticación en un contexto.

## Puesta en marcha

Requisitos: Node 20 o superior y el backend (`nexus-backend`) escuchando en `http://localhost:8080`.

```bash
npm ci
npm run dev
```

La aplicación queda en `http://localhost:5173`. Vite hace proxy de `/api`, `/uploads`, `/sitemap.xml` y `/robots.txt` hacia `http://localhost:8080`, de modo que el frontend siempre usa URLs relativas y no hay problemas de CORS.

## Variables de entorno

Se definen en `.env` (ver `.env.example`). Son variables de **build**: se incrustan en el bundle.

| Variable | Por defecto | Uso |
| --- | --- | --- |
| `VITE_API_URL` | `/api` | URL base de la API. Déjala vacía salvo que el backend esté en otro origen (en ese caso hay que configurar CORS en el backend y ajustar el CSP de nginx). |
| `VITE_SITE_URL` | `http://localhost:5173` | URL pública del sitio. Se usa en canonical, Open Graph, JSON-LD y en el HTML base. **Debe apuntar al dominio real en producción.** |

| `VITE_LEGAL_OWNER_NAME`, `VITE_LEGAL_OWNER_ID`, `VITE_LEGAL_ADDRESS`, `VITE_LEGAL_EMAIL` | vacías | Titular, NIF, domicilio y email que exigen la LSSI y el RGPD en el aviso legal y la política de privacidad. **Obligatorias antes de publicar.** Mientras falten, las páginas muestran «pendiente de configurar». Configúralas solo en el servidor o en el `.env` local (ignorado por Git), nunca en el repositorio. |
| `VITE_LEGAL_HOSTING_PROVIDER` | vacía | Proveedor de alojamiento, que aparece como encargado del tratamiento en la política de privacidad. |

En runtime, el contenedor Docker usa además `BACKEND_URL` (ver más abajo).

### Cuenta: verificación de email y recuperación de contraseña

- `/recuperar-contrasena` pide el email y `/restablecer-contrasena?token=…` permite elegir una contraseña nueva; tras cambiarla se cierra la sesión.
- `/verificar-email?token=…` confirma el email (el token se envía una sola vez aunque React ejecute el efecto dos veces en desarrollo).
- Mientras el email no esté verificado se muestra un aviso bajo la cabecera con «Reenviar enlace», y los formularios del foro, los comentarios y los testimonios se sustituyen por `VerifyEmailNotice`.
- En desarrollo, los enlaces de los emails aparecen en la consola del backend.

### Páginas legales

`/aviso-legal`, `/privacidad` y `/cookies` describen lo que hace realmente el sitio: qué datos se guardan, qué se publica, el contenido importado y el almacenamiento local de la sesión (`primercommit.session`). Como solo se usa almacenamiento técnico, no hace falta banner de cookies. Si se añaden analíticas u otras cookies no técnicas, habrá que pedir consentimiento previo y actualizar `/cookies`. El registro exige aceptar las condiciones; el backend guarda la fecha en `users.terms_accepted_at`.

Los textos son una base razonable, pero conviene que los revise un profesional antes del lanzamiento.

## Scripts

| Script | Descripción |
| --- | --- |
| `npm run dev` | Servidor de desarrollo con HMR y proxy al backend |
| `npm run build` | Compilación de producción en `dist/` |
| `npm run preview` | Sirve `dist/` localmente |
| `npm run lint` | ESLint (debe terminar sin errores ni avisos) |

## Estructura

```
src/
  app/                 Arranque: App, rutas (lazy), layout raíz, cabecera, pie y scroll
  features/
    auth/              Login, registro, AuthProvider, guards RequireAuth / RequireAdmin
    news/              Listado paginado, detalle, noticias relacionadas
    jobs/              Listado con filtros, detalle, JSON-LD JobPosting
    forum/             Discusiones, comentarios, likes, edición y borrado
    testimonials/      Listado público y formulario (solo con sesión)
    admin/             Layout propio y CRUD/moderación (noticias, empleo, foro, testimonios, usuarios)
    home/              Página de inicio y sus bloques
  shared/
    api/               Cliente axios (http.js), ApiError, sesión en localStorage
    components/        Modal, ConfirmDialog, Toasts, Pagination, SearchBar, FormField, Seo, JsonLd...
    config/            siteConfig, rutas (paths), catálogos de enums (categorías, niveles...)
    hooks/             useRequest, useAction, useForm, useListQuery, useDismiss...
    utils/             Fechas, slugs, URLs seguras, texto
```

Cada feature agrupa `components/`, `hooks/`, `services/` y `pages/`. Los servicios solo conocen el cliente HTTP; los hooks combinan servicio y estado; las páginas componen componentes. Se importa con el alias `@/` (configurado en Vite y en `jsconfig.json`).

## Conexión con el backend

El contrato (rutas, DTOs, errores, paginación) está en el documento de API compartido con el backend. Puntos clave que el frontend asume:

- Identidad solo por JWT (`Authorization: Bearer ...`), que añade el interceptor de `src/shared/api/http.js`. No se envía ninguna otra cabecera de identidad.
- Errores siempre en JSON `{ status, error, message, fieldErrors }`; se normalizan a `ApiError` y los `fieldErrors` se pintan junto a cada campo.
- Un 401 en una petición autenticada limpia la sesión; los guards (`RequireAuth`, `RequireAdmin`) redirigen a `/login?redirect=...`. Los guards solo mejoran la experiencia: la seguridad real la aplica el backend.
- Paginación 0-based en la API; en la URL del navegador la página es 1-based (`?page=2`) y los filtros van en la query (`?categoria=desarrollo&q=react`) para ser enlazables.
- Rutas con slug: `/noticias/12-titulo`. El frontend extrae el `id` de los dígitos iniciales y redirige al slug canónico si no coincide.
- Todo texto de usuario es texto plano y se pinta como texto (React lo escapa). No se usa `innerHTML` en ningún sitio. En foro y noticias se admiten bloques de código entre líneas ```.

## Docker

```bash
docker build \
  --build-arg VITE_SITE_URL=https://tu-dominio.example \
  --build-arg VITE_LEGAL_OWNER_NAME="…" \
  --build-arg VITE_LEGAL_OWNER_ID="…" \
  --build-arg VITE_LEGAL_ADDRESS="…" \
  --build-arg VITE_LEGAL_EMAIL="…" \
  -t primercommit-frontend .

docker run -p 8080:8080 -e BACKEND_URL=http://backend:8080 primercommit-frontend
```

La imagen final es `nginx-unprivileged` (usuario no root, puerto 8080). La plantilla `docker/nginx/default.conf.template` se procesa con `envsubst` en el arranque y solo sustituye `BACKEND_URL`:

- `try_files` para la SPA y proxy de `/api/`, `/uploads/`, `/sitemap.xml` y `/robots.txt` al backend (con `Host` y `X-Forwarded-*`).
- Caché inmutable de un año para `/assets/` (nombres con hash) y `no-cache` para `index.html`.
- gzip, `client_max_body_size 10m` y cabeceras de seguridad (`X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy` y un CSP restrictivo).
- `/healthz` para el healthcheck.

`BACKEND_URL` debe ser un origen sin barra final ni ruta. nginx resuelve el nombre al arrancar, así que el backend debe ser alcanzable por DNS en ese momento. Si el backend vive en otro origen distinto de nginx, hay que ampliar `connect-src` en `docker/nginx/snippets/security-headers.conf`. Si hay TLS delante, añade HSTS allí mismo.

`robots.txt` y `sitemap.xml` **no** existen en este proyecto: los genera el backend y nginx/Vite los proxifican.

## SEO

Qué hace el frontend:

- Componente `Seo` en todas las páginas, con las etiquetas de cabecera nativas de React 19: título único (máx. 60 caracteres, con la marca), meta description (máx. 160), canonical absoluto, `robots`, Open Graph y Twitter Card.
- `noindex` en admin, login, registro, 404 y en listados con filtros o búsqueda. Las páginas de paginación sin filtros son indexables y tienen canonical propio (`?page=n`).
- JSON-LD (`WebSite` + `Organization` en la home, `NewsArticle`, `JobPosting`, `DiscussionForumPosting` y `BreadcrumbList`).
- HTML semántico: un solo `h1` por página, `header`/`nav`/`main`/`footer`/`article`/`aside`, `time datetime`, enlaces reales (`<a>`) para navegación y paginación, migas de pan con `aria-current`.
- Rendimiento: rutas con carga diferida, chunks de vendor, fuentes del sistema (sin peticiones a terceros), imágenes con `width`/`height`/`loading="lazy"` y esqueletos para evitar saltos de layout.

**Limitación importante**: esta aplicación es una SPA renderizada en el cliente. Google ejecuta JavaScript y puede indexarla, pero con retraso y menos fiabilidad que un HTML renderizado en servidor; otros buscadores y, sobre todo, los rastreadores de redes sociales (Open Graph/Twitter) **no ejecutan JavaScript** y solo ven el `index.html` estático (título y metadatos generales de la marca, sin datos de cada noticia u oferta). Además, una SPA no puede devolver un estado HTTP 404 real: la página «no encontrada» responde 200 con `noindex`.

Ruta de mejora recomendada (no implementada todavía):

1. **Prerender de las rutas públicas** (home, listados y detalles) en build o bajo demanda, sirviendo ese HTML a los rastreadores. Es el cambio de menor coste y mantiene el código actual.
2. Si el posicionamiento es el objetivo principal, **migrar a un framework con SSR** (por ejemplo React Router en modo framework o Next.js), reutilizando `features/` y `shared/` casi sin cambios, y devolviendo 404 reales y metadatos por URL en la respuesta inicial.

Hasta entonces, lo que más ayuda es que el backend publique un `sitemap.xml` completo y que `VITE_SITE_URL` apunte al dominio real.

## Accesibilidad y diseño responsive

- Mobile-first de 320 px a pantallas ultra anchas: contenedor central con `max-w` y gutters fluidos, rejillas `1 → 2 → 3` columnas y tablas de admin que pasan a tarjetas en móvil.
- Enlace «Saltar al contenido», foco visible (`focus-visible`), objetivos táctiles de al menos 44 px, `prefers-reduced-motion`, menús con `aria-expanded`/`aria-controls` y cierre con Escape.
- Formularios con etiquetas asociadas, ayudas y errores enlazados con `aria-describedby`, `autocomplete` correcto y errores del servidor por campo.
- Modales sobre `<dialog>` nativo (foco atrapado, Escape, devolución del foco) y notificaciones en una región `aria-live`.
- Sistema de diseño en `tailwind.config.js` (colores `brand`/`ink`, radios, sombras, tipografías) y clases de componentes (`btn`, `card`, `field-input`...) en `src/index.css`.

## Decisiones

- **Sin estado global de servidor**: cada pantalla pide sus datos con `useRequest`, que cancela peticiones obsoletas y evita condiciones de carrera.
- **Sesión en `localStorage`** (token + usuario), validada al arrancar con `GET /api/auth/me` y sincronizada entre pestañas. Es una decisión de simplicidad; la alternativa más segura frente a XSS sería una cookie `HttpOnly`, que requeriría cambios en el backend.
- **Tres idiomas sin librería externa**: castellano en la raíz, catalán en `/ca` y inglés en `/en`. Los textos están en `src/shared/i18n/messages` y `npm run check:i18n` (también en CI) comprueba que los tres idiomas tienen las mismas claves y variables. El panel de administración y las páginas legales siguen solo en castellano.

## Idiomas y SEO

**URLs por idioma.** El castellano va en la raíz y el catalán y el inglés con prefijo y la sección traducida: `/noticias` → `/ca/noticies` → `/en/news`, `/empleo` → `/ca/feina` → `/en/jobs`, `/foro/nueva` → `/ca/forum/nova` → `/en/forum/new`, etc. En el código las rutas se escriben siempre en castellano (`paths.news`) y `localizePath` las traduce con la tabla de `src/shared/i18n/routeSegments.js`; los `Link`, `NavLink`, `Navigate` y `useNavigate` de `@/shared/i18n` lo hacen solos. Las direcciones antiguas con la sección en castellano bajo `/ca` o `/en` (por ejemplo `/en/foro/12-x`) redirigen a la traducida. `npm run check:routes` (también en CI) comprueba la tabla y la traducción en los dos sentidos. Si cambias una sección, cambia también `Languages.SEGMENTS` en el backend (sitemap, robots y emails).

Una página se declara traducida solo si su contenido principal existe en cada idioma:

- **Traducidas** (portada, listados de noticias, empleo y foro, testimonios): cada idioma tiene su propia canonical y enlaces `hreflang` a los demás, y aparecen en el sitemap en los tres idiomas.
- **Solo en castellano** (detalle de noticia, oferta y debate, páginas legales): su texto lo escriben los usuarios o viene de fuentes externas y no se traduce. Se pueden ver con la interfaz en catalán o inglés, pero todas las versiones apuntan con canonical a la castellana, no declaran `hreflang` y solo la castellana está en el sitemap. Así Google no las trata como contenido duplicado. En el código: `<Seo translated={false} />`, y los datos estructurados usan también la URL castellana.

Si en el futuro se traduce el contenido de algún tipo de página, basta con quitar `translated={false}` en ella y añadirla a las rutas traducidas del sitemap del backend.
- **Sin dependencias extra**: nada de librerías de formularios, fetching o iconos; los iconos son SVG propios en `shared/components/Icon.jsx`.
