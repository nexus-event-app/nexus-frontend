import { useAuth } from '@/features/auth/hooks/useAuth'
import ButtonLink from '@/shared/components/ButtonLink'
import { paths } from '@/shared/config/paths'

export default function FinalCta() {
  const { isAuthenticated } = useAuth()

  return (
    <section aria-labelledby="home-cta" className="bg-gradient-to-br from-brand-700 to-brand-950 py-16 text-white">
      <div className="page-container text-center">
        <h2 id="home-cta" className="mx-auto max-w-2xl text-3xl font-extrabold tracking-tight sm:text-4xl">
          ¿Tienes una pregunta? Este es tu espacio
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-brand-100">
          Todas las personas empezamos desde cero. Pregunta, comparte lo que sabes y crece con la comunidad.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          {isAuthenticated ? (
            <ButtonLink to={paths.forumNew} variant="inverse">
              Crear una discusión
            </ButtonLink>
          ) : (
            <>
              <ButtonLink to={paths.register} variant="inverse">
                Crear cuenta gratis
              </ButtonLink>
              <ButtonLink to={paths.login} variant="outlineInverse">
                Ya tengo cuenta
              </ButtonLink>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
