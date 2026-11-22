import { useSearchParams } from 'react-router-dom'
import { Link, Navigate } from '@/shared/i18n/router'
import PageLoader from '@/shared/components/PageLoader'
import Seo from '@/shared/components/Seo'
import { loginPath, paths, registerPath } from '@/shared/config/paths'
import { siteConfig } from '@/shared/config/site'
import { useI18n } from '@/shared/i18n/useI18n'
import { safeRedirect } from '@/shared/utils/url'
import { useAuth } from '../hooks/useAuth'
import AuthCard from './AuthCard'
import GoogleSignIn from './GoogleSignIn'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'

const MODES = {
  login: {
    path: paths.login,
    Form: LoginForm,
    switchPath: registerPath,
    switchQuestion: 'noAccount',
    switchLink: 'createAccount',
  },
  register: {
    path: paths.register,
    Form: RegisterForm,
    switchPath: loginPath,
    switchQuestion: 'haveAccount',
    switchLink: 'login',
  },
}

export default function AuthPage({ mode }) {
  const { t } = useI18n()
  const { isAuthenticated, loading } = useAuth()
  const [searchParams] = useSearchParams()
  const redirectTo = safeRedirect(searchParams.get('redirect'), paths.home)
  const { path, Form, switchPath, switchQuestion, switchLink } = MODES[mode]
  const key = (name) => t(`auth.${mode}.${name}`)

  if (loading) return <PageLoader />
  if (isAuthenticated) return <Navigate to={redirectTo} replace />

  return (
    <>
      <Seo
        title={key('seoTitle')}
        description={t(`auth.${mode}.seoDescription`, { name: siteConfig.name })}
        path={path}
        robots="noindex,nofollow"
      />
      <AuthCard
        eyebrow={key('eyebrow')}
        title={key('title')}
        subtitle={key('subtitle')}
        footer={
          <>
            {key(switchQuestion)}{' '}
            <Link to={switchPath(redirectTo)} className="link">
              {key(switchLink)}
            </Link>
          </>
        }
      >
        <GoogleSignIn redirectTo={redirectTo} />
        <Form />
      </AuthCard>
    </>
  )
}
