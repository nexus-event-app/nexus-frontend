import { SESSION_STORAGE_KEY } from '@/shared/api/session'
import { paths } from '@/shared/config/paths'
import { siteConfig } from '@/shared/config/site'
import { THEME_STORAGE_KEY } from '@/shared/theme/theme'
import LegalPage from '../components/LegalPage'

const SECTIONS = [
  {
    id: 'resumen',
    title: '1. En resumen',
    content: (
      <p>
        {siteConfig.name} <strong>no usa cookies de análisis, publicidad ni redes sociales</strong>. Solo guardamos en
        tu navegador lo imprescindible para mantener tu sesión iniciada y, si lo eliges, el tema claro u oscuro. Por eso
        no te mostramos un aviso de cookies: este tipo de almacenamiento técnico no necesita consentimiento (art. 22.2
        LSSI).
      </p>
    ),
  },
  {
    id: 'que-guardamos',
    title: '2. Qué guardamos en tu navegador',
    content: (
      <figure tabIndex={0} aria-label="Datos que guarda el sitio en tu navegador" className="overflow-x-auto">
        <table className="w-full min-w-[32rem] text-left text-sm">
          <caption className="sr-only">Datos que guarda el sitio en tu navegador</caption>
          <thead className="border-b border-slate-200 text-ink">
            <tr>
              <th scope="col" className="py-2 pr-4 font-semibold">
                Nombre
              </th>
              <th scope="col" className="py-2 pr-4 font-semibold">
                Tipo
              </th>
              <th scope="col" className="py-2 pr-4 font-semibold">
                Para qué
              </th>
              <th scope="col" className="py-2 font-semibold">
                Duración
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="align-top">
              <td className="py-3 pr-4 font-mono text-xs">{SESSION_STORAGE_KEY}</td>
              <td className="py-3 pr-4">Almacenamiento local, propio y técnico</td>
              <td className="py-3 pr-4">
                Mantener tu sesión iniciada: identificador de sesión y datos básicos de tu perfil (nombre, email y rol).
              </td>
              <td className="py-3">Hasta que cierres sesión. La sesión caduca a las 24 horas.</td>
            </tr>
            <tr className="align-top border-t border-slate-200">
              <td className="py-3 pr-4 font-mono text-xs">{THEME_STORAGE_KEY}</td>
              <td className="py-3 pr-4">Almacenamiento local, propio y técnico</td>
              <td className="py-3 pr-4">
                Recordar si has elegido el tema claro u oscuro. Solo se guarda si lo cambias; por defecto se sigue la
                preferencia de tu dispositivo.
              </td>
              <td className="py-3">Hasta que vuelvas al tema automático o borres los datos del sitio.</td>
            </tr>
          </tbody>
        </table>
      </figure>
    ),
  },
  {
    id: 'terceros',
    title: '3. Contenido de terceros',
    content: (
      <p>
        Las imágenes de algunas noticias se cargan desde los servidores de su fuente original. Las pedimos sin indicar
        desde qué página vienes, pero esos servidores pueden registrar tu dirección IP según sus propias políticas. Lo
        mismo ocurre cuando sigues un enlace a otra web.
      </p>
    ),
  },
  {
    id: 'gestion',
    title: '4. Cómo borrarlo',
    content: (
      <p>
        Al cerrar sesión se borra la sesión guardada, y al volver al tema automático se borra la preferencia de tema.
        También puedes borrar los datos de este sitio desde la configuración de tu navegador, normalmente en el apartado
        de privacidad o de datos de sitios.
      </p>
    ),
  },
  {
    id: 'cambios',
    title: '5. Cambios',
    content: (
      <p>
        Si en el futuro añadimos herramientas de análisis o cualquier cookie que requiera tu consentimiento, te lo
        pediremos antes de activarla y actualizaremos esta página.
      </p>
    ),
  },
]

export default function CookiesPage() {
  return (
    <LegalPage
      title="Política de cookies"
      description={`Qué guarda ${siteConfig.name} en tu navegador y por qué no usamos cookies de seguimiento.`}
      path={paths.cookies}
      sections={SECTIONS}
    />
  )
}
