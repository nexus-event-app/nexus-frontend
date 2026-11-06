/** Muestra un dato legal configurado o un aviso visible si aún falta. */
export default function LegalValue({ value, href }) {
  if (!value) {
    return (
      <mark className="rounded bg-amber-100 px-1.5 py-0.5 text-sm font-medium text-amber-900">
        pendiente de configurar
      </mark>
    )
  }
  return href ? (
    <a href={href} className="link">
      {value}
    </a>
  ) : (
    <>{value}</>
  )
}
