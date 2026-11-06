import { Component } from 'react'
import Button from './Button'
import Seo from './Seo'

export default class ErrorBoundary extends Component {
  state = { failed: false }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  componentDidUpdate(previousProps) {
    if (this.state.failed && previousProps.resetKey !== this.props.resetKey) {
      this.setState({ failed: false })
    }
  }

  render() {
    if (!this.state.failed) return this.props.children

    return (
      <div className="page-container page-section">
        <Seo title="Algo ha fallado" robots="noindex,nofollow" />
        <div role="alert" className="card mx-auto max-w-xl px-6 py-12 text-center">
          <h1 className="text-2xl font-bold text-ink">Algo ha salido mal</h1>
          <p className="mt-3 text-ink-muted">
            Ha ocurrido un error al mostrar esta página. Puedes recargarla o volver más tarde.
          </p>
          <Button className="mt-6" onClick={() => window.location.reload()}>
            Recargar la página
          </Button>
        </div>
      </div>
    )
  }
}
