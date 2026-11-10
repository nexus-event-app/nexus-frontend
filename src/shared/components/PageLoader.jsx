import Spinner from './Spinner'

export default function PageLoader() {
  return (
    <p className="flex min-h-[50dvh] items-center justify-center">
      <Spinner size="lg" label="Cargando…" />
    </p>
  )
}
