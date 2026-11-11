import { Link } from '@/shared/i18n/router'
import { legalConfig } from '@/shared/config/legal'
import { paths } from '@/shared/config/paths'
import { siteConfig } from '@/shared/config/site'
import ContactEmail from '../components/ContactEmail'
import LegalPage from '../components/LegalPage'
import LegalValue from '../components/LegalValue'
import OwnerDetails from '../components/OwnerDetails'

const SECTIONS = [
  {
    id: 'responsable',
    title: '1. Responsable del tratamiento',
    content: (
      <>
        <p>El responsable de tus datos personales es el titular de {siteConfig.name}:</p>
        <OwnerDetails />
      </>
    ),
  },
  {
    id: 'datos',
    title: '2. Qué datos tratamos',
    content: (
      <ul>
        <li>
          <strong>Datos de tu cuenta:</strong> nombre, email y contraseña. La contraseña se guarda cifrada y nadie,
          tampoco nosotros, puede verla.
        </li>
        <li>
          <strong>Lo que publicas:</strong> debates, comentarios, «me gusta» y testimonios (con el nombre, el cargo y la
          ubicación que indiques).
        </li>
        <li>
          <strong>Tu perfil, si decides completarlo:</strong> foto, titular, presentación, tecnologías y enlaces a
          GitHub o LinkedIn. Todo es opcional y puedes cambiarlo o borrarlo cuando quieras desde «Editar perfil». Al
          subir una foto eliminamos sus metadatos (como la ubicación donde se hizo).
        </li>
        <li>
          <strong>Datos técnicos:</strong> la dirección IP se usa de forma temporal, solo en memoria, para limitar
          abusos como intentos masivos de inicio de sesión. No la guardamos.
        </li>
      </ul>
    ),
  },
  {
    id: 'finalidad',
    title: '3. Para qué los usamos y con qué base legal',
    content: (
      <ul>
        <li>
          <strong>Gestionar tu cuenta y permitirte participar</strong> en el foro y en los testimonios. Base legal: la
          ejecución de las condiciones de uso que aceptas al registrarte (art. 6.1.b RGPD).
        </li>
        <li>
          <strong>Moderar la comunidad y proteger el servicio</strong> frente a abusos. Base legal: nuestro interés
          legítimo en mantener un espacio seguro (art. 6.1.f RGPD).
        </li>
        <li>
          <strong>Publicar tu testimonio</strong> si nos lo envías y lo aprobamos. Base legal: tu consentimiento al
          enviarlo (art. 6.1.a RGPD), que puedes retirar cuando quieras.
        </li>
        <li>
          <strong>Responder a tus consultas</strong> cuando nos escribes.
        </li>
      </ul>
    ),
  },
  {
    id: 'publico',
    title: '4. Qué es público',
    content: (
      <p>
        Tu nombre aparece junto a los debates y comentarios que publicas, y los testimonios aprobados muestran el
        nombre, el cargo y la ubicación que indicaste. Tu perfil es público dentro de la web: muestra tu nombre, la
        fecha en que te uniste, los datos de perfil que hayas añadido, y tus debates y testimonios publicados. Los
        perfiles no se indexan en buscadores. Tu email nunca se muestra a otras personas.
      </p>
    ),
  },
  {
    id: 'conservacion',
    title: '5. Cuánto tiempo los conservamos',
    content: (
      <p>
        Mientras tu cuenta esté activa. Si pides eliminarla, borraremos tus datos de cuenta; tu contenido publicado se
        eliminará o se anonimizará. Algunos datos podrán conservarse bloqueados durante los plazos que exija la ley.
      </p>
    ),
  },
  {
    id: 'destinatarios',
    title: '6. Con quién los compartimos',
    content: (
      <p>
        No vendemos ni cedemos tus datos a terceros. Para alojar el sitio usamos un proveedor que actúa como encargado
        del tratamiento y solo trata los datos siguiendo nuestras instrucciones:{' '}
        <LegalValue value={legalConfig.hostingProvider} />. Si alguno de nuestros proveedores tratara datos fuera del
        Espacio Económico Europeo, lo haría con las garantías que exige el RGPD.
      </p>
    ),
  },
  {
    id: 'derechos',
    title: '7. Tus derechos',
    content: (
      <>
        <p>
          Puedes ejercer en cualquier momento tus derechos de acceso, rectificación, supresión, oposición, limitación
          del tratamiento y portabilidad, y retirar tu consentimiento, escribiendo a <ContactEmail /> desde el email de
          tu cuenta.
        </p>
        <p>
          Si crees que no hemos tratado bien tus datos, puedes presentar una reclamación ante la Agencia Española de
          Protección de Datos en{' '}
          <a href="https://www.aepd.es" target="_blank" rel="noopener noreferrer" className="link">
            www.aepd.es
          </a>
          .
        </p>
      </>
    ),
  },
  {
    id: 'seguridad',
    title: '8. Seguridad',
    content: (
      <p>
        Aplicamos medidas técnicas para proteger tus datos: contraseñas cifradas, conexiones seguras (HTTPS), acceso
        restringido al panel de administración y límites contra el abuso.
      </p>
    ),
  },
  {
    id: 'menores',
    title: '9. Menores de edad',
    content: <p>Para crear una cuenta debes tener al menos 14 años.</p>,
  },
  {
    id: 'cambios',
    title: '10. Cambios en esta política',
    content: (
      <p>
        Si cambiamos esta política, actualizaremos la fecha de arriba y, si el cambio es importante, te avisaremos. Para
        saber qué guardamos en tu navegador, consulta la{' '}
        <Link to={paths.cookies} className="link">
          política de cookies
        </Link>
        .
      </p>
    ),
  },
]

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Política de privacidad"
      description={`Qué datos personales trata ${siteConfig.name}, para qué y cómo ejercer tus derechos.`}
      path={paths.privacy}
      sections={SECTIONS}
    />
  )
}
