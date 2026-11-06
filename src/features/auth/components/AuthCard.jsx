export default function AuthCard({ title, subtitle, children, footer }) {
  return (
    <div className="page-container page-section">
      <div className="card mx-auto w-full max-w-md p-6 sm:p-8">
        <h1 className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">{title}</h1>
        <p className="mt-2 text-ink-muted">{subtitle}</p>
        <div className="mt-6">{children}</div>
        <p className="mt-6 border-t border-slate-200 pt-6 text-center text-ink-soft">{footer}</p>
      </div>
    </div>
  )
}
