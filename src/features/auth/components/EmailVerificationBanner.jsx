import { useAction } from '@/shared/hooks/useAction'
import { useAuth } from '../hooks/useAuth'
import { authService } from '../services/authService'

/** Aviso bajo la cabecera mientras el email de la cuenta no esté confirmado. */
export default function EmailVerificationBanner() {
  const { user } = useAuth()
  const [resend, pending] = useAction(() => authService.resendVerification(), {
    successMessage: 'Te hemos enviado un nuevo enlace. Revisa tu bandeja de entrada.',
  })

  if (!user || user.emailVerified !== false) return null

  return (
    <div role="status" className="border-b border-amber-200 bg-amber-50">
      <p className="page-container flex flex-wrap items-center gap-x-3 gap-y-1 py-2.5 text-sm text-amber-900">
        <span>
          Confirma tu email (<strong className="font-semibold">{user.email}</strong>) para participar en el foro y
          compartir tu testimonio.
        </span>
        <button
          type="button"
          onClick={() => resend()}
          disabled={pending}
          className="font-semibold underline underline-offset-2 hover:no-underline disabled:opacity-60"
        >
          {pending ? 'Enviando…' : 'Reenviar enlace'}
        </button>
      </p>
    </div>
  )
}
