import { useRequest } from '@/shared/hooks/useRequest'
import { useI18n } from '@/shared/i18n/useI18n'
import { authService } from '../services/authService'
import { rememberGoogleRedirect } from '../utils/googleRedirect'

const AUTHORIZE_URL = `${import.meta.env.VITE_API_URL || '/api'}/oauth2/authorize/google`

/** Logotipo de Google, con sus colores, como piden sus normas para los botones de acceso. Decorativo. */
function GoogleLogo() {
  return (
    <svg aria-hidden="true" viewBox="0 0 48 48" className="h-5 w-5 shrink-0">
      <path
        fill="#EA4335"
        d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
      />
      <path
        fill="#4285F4"
        d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
      />
      <path
        fill="#FBBC05"
        d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
      />
      <path
        fill="#34A853"
        d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
      />
    </svg>
  )
}

/**
 * «Continuar con Google» encima del formulario de email, con su separador. Es un enlace normal: la página entera va
 * a Google y vuelve (sin cargar ningún script de Google en la web). Solo aparece si el backend tiene Google
 * configurado.
 */
export default function GoogleSignIn({ redirectTo }) {
  const { t, lang } = useI18n()
  const providers = useRequest('auth:providers', ({ signal }) => authService.providers({ signal }))
  if (!providers.data?.google) return null

  return (
    <>
      <a
        href={`${AUTHORIZE_URL}?lang=${lang}`}
        onClick={() => rememberGoogleRedirect(redirectTo)}
        className="btn btn-secondary btn-lg w-full gap-3"
      >
        <GoogleLogo />
        {t('auth.google.button')}
      </a>
      {/* Separador con texto: las rayas son decorativas. */}
      <p className="my-6 grid grid-cols-[1fr_auto_1fr] items-center gap-4 text-sm text-ink-muted before:h-px before:bg-slate-200 before:content-[''] after:h-px after:bg-slate-200 after:content-['']">
        {t('auth.google.or')}
      </p>
    </>
  )
}
