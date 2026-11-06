import { Link } from 'react-router-dom'
import { paths } from '@/shared/config/paths'
import { siteConfig } from '@/shared/config/site'
import ContactEmail from '../components/ContactEmail'
import LegalPage from '../components/LegalPage'
import OwnerDetails from '../components/OwnerDetails'

const SECTIONS = [
  {
    id: 'titular',
    title: '1. Titular del sitio web',
    content: (
      <>
        <p>
          En cumplimiento del artículo 10 de la Ley 34/2002, de servicios de la sociedad de la información y de
          comercio electrónico (LSSI), estos son los datos del titular de {siteConfig.name}:
        </p>
        <OwnerDetails />
      </>
    ),
  },
  {
    id: 'objeto',
    title: '2. Qué es Primer Commit',
    content: (
      <p>
        {siteConfig.name} es una comunidad gratuita en español para personas que empiezan en el sector tecnológico.
        Ofrece noticias, ofertas de empleo junior y de prácticas, un foro y testimonios de la comunidad. Usar el sitio
        implica aceptar estas condiciones.
      </p>
    ),
  },
  {
    id: 'cuenta',
    title: '3. Registro y cuenta de usuario',
    content: (
      <ul>
        <li>Puedes leer el contenido sin registrarte. Para escribir en el foro o enviar un testimonio necesitas una cuenta.</li>
        <li>Para registrarte debes tener al menos 14 años.</li>
        <li>Los datos que indiques deben ser veraces. Tu contraseña es personal: no la compartas.</li>
        <li>Puedes pedir que eliminemos tu cuenta en cualquier momento escribiendo a <ContactEmail />.</li>
      </ul>
    ),
  },
  {
    id: 'normas',
    title: '4. Normas de la comunidad',
    content: (
      <>
        <p>Queremos un espacio donde preguntar sin miedo. Por eso no está permitido publicar:</p>
        <ul>
          <li>Insultos, acoso, discriminación o cualquier contenido que vulnere la ley.</li>
          <li>Spam, publicidad no solicitada o enlaces engañosos.</li>
          <li>Datos personales de otras personas sin su permiso.</li>
          <li>Contenido que infrinja derechos de autor o de terceros.</li>
        </ul>
        <p>
          Eres responsable de lo que publicas. Conservas los derechos sobre tu contenido y nos das permiso, gratuito y
          no exclusivo, para mostrarlo en {siteConfig.name} mientras siga publicado.
        </p>
        <p>
          Podemos ocultar o eliminar contenido que incumpla estas normas, y suspender las cuentas que las incumplan de
          forma grave o repetida. Los testimonios se revisan antes de publicarse.
        </p>
      </>
    ),
  },
  {
    id: 'terceros',
    title: '5. Noticias y ofertas de otras fuentes',
    content: (
      <>
        <p>
          Parte de las noticias y ofertas de empleo se obtienen automáticamente de fuentes externas. De cada noticia
          mostramos solo un resumen con un enlace al artículo original, y cada oferta enlaza a la web donde se publicó,
          donde se gestiona la candidatura. Siempre indicamos la fuente.
        </p>
        <p>
          Ese contenido pertenece a sus autores. No somos responsables de su exactitud ni de las condiciones de las
          ofertas. Si eres titular de algún contenido y quieres que lo retiremos, escríbenos a <ContactEmail />.
        </p>
      </>
    ),
  },
  {
    id: 'propiedad',
    title: '6. Propiedad intelectual',
    content: (
      <p>
        El nombre {siteConfig.name}, su logotipo, el diseño del sitio y sus textos propios pertenecen a su titular. No
        está permitido reproducirlos con fines comerciales sin autorización.
      </p>
    ),
  },
  {
    id: 'responsabilidad',
    title: '7. Enlaces y responsabilidad',
    content: (
      <p>
        El sitio contiene enlaces a webs de terceros sobre las que no tenemos control. Trabajamos para que{' '}
        {siteConfig.name} esté disponible y funcione bien, pero no podemos garantizarlo de forma ininterrumpida. Si
        detectas contenido ilícito, comunícanoslo en <ContactEmail /> y lo revisaremos lo antes posible.
      </p>
    ),
  },
  {
    id: 'ley',
    title: '8. Legislación aplicable',
    content: (
      <p>
        Estas condiciones se rigen por la legislación española. Si eres consumidor, los tribunales competentes serán
        los de tu domicilio. Para todo lo relativo a tus datos personales, consulta la{' '}
        <Link to={paths.privacy} className="link">
          política de privacidad
        </Link>
        .
      </p>
    ),
  },
]

export default function LegalNoticePage() {
  return (
    <LegalPage
      title="Aviso legal y condiciones de uso"
      description={`Datos del titular de ${siteConfig.name} y condiciones de uso de la comunidad.`}
      path={paths.legalNotice}
      sections={SECTIONS}
    />
  )
}
