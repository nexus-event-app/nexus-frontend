/** Aviso «Cargando…» solo para lectores de pantalla, que acompaña a los esqueletos de carga. */
export default function LoadingStatus() {
  return (
    <p role="status" className="sr-only">
      Cargando contenido…
    </p>
  )
}
