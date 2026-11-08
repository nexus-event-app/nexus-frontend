import { Component } from 'react'
import { translate } from '@/shared/i18n/translate'
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
        <Seo title={translate('common.errorBoundary.seoTitle')} robots="noindex,nofollow" />
        <div role="alert" className="card mx-auto max-w-xl px-6 py-12 text-center">
          <h1 className="text-2xl font-bold text-ink">{translate('common.errorBoundary.title')}</h1>
          <p className="mt-3 text-ink-muted">{translate('common.errorBoundary.text')}</p>
          <Button className="mt-6" onClick={() => window.location.reload()}>
            {translate('common.errorBoundary.reload')}
          </Button>
        </div>
      </div>
    )
  }
}
