import { Component } from 'react'
import { translate } from '@/shared/i18n/translate'
import Button from './Button'
import PageMain from './PageMain'
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

    // `embedded`: dentro de una página que ya tiene su <main> (panel de administración).
    const message = (
      <section role="alert" className="card mx-auto my-10 w-[calc(100%-2rem)] max-w-xl px-6 py-12 text-center sm:my-14">
        <Seo title={translate('common.errorBoundary.seoTitle')} robots="noindex,nofollow" />
        <h1 className="text-2xl font-bold text-ink">{translate('common.errorBoundary.title')}</h1>
        <p className="mt-3 text-ink-muted">{translate('common.errorBoundary.text')}</p>
        <Button className="mt-6" onClick={() => window.location.reload()}>
          {translate('common.errorBoundary.reload')}
        </Button>
      </section>
    )
    return this.props.embedded ? message : <PageMain>{message}</PageMain>
  }
}
