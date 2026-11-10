import PageMain from '@/shared/components/PageMain'

/** Página de acceso (entrar, registrarse, recuperar contraseña...): una tarjeta centrada con su formulario. */
export default function AuthCard({ title, subtitle, children, footer }) {
  return (
    <PageMain className="page-container page-section">
      <section className="card mx-auto w-full max-w-md p-6 sm:p-8">
        <header className="mb-6">
          <h1 className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">{title}</h1>
          <p className="mt-2 text-ink-muted">{subtitle}</p>
        </header>
        {children}
        <footer className="mt-6 border-t border-slate-200 pt-6 text-center text-ink-soft">{footer}</footer>
      </section>
    </PageMain>
  )
}
