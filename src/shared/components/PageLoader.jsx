import Spinner from './Spinner'

export default function PageLoader() {
  return (
    <div className="flex min-h-[50dvh] items-center justify-center">
      <Spinner size="lg" label="Cargando…" />
    </div>
  )
}
