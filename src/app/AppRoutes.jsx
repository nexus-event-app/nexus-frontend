import { lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import RequireAdmin from '@/features/auth/components/RequireAdmin'
import RequireAuth from '@/features/auth/components/RequireAuth'
import AdminLayout from '@/features/admin/components/AdminLayout'
import NotFound from '@/shared/components/NotFound'
import RootLayout from './layout/RootLayout'
import LegacyPathRedirect from './layout/LegacyPathRedirect'
import { DEFAULT_LANGUAGE, routeSegment, routeSubsegment } from '@/shared/i18n/languages'
import { ROUTE_SEGMENTS } from '@/shared/i18n/routeSegments'

const HomePage = lazy(() => import('@/features/home/pages/HomePage'))
const NewsListPage = lazy(() => import('@/features/news/pages/NewsListPage'))
const NewsDetailPage = lazy(() => import('@/features/news/pages/NewsDetailPage'))
const JobsListPage = lazy(() => import('@/features/jobs/pages/JobsListPage'))
const JobDetailPage = lazy(() => import('@/features/jobs/pages/JobDetailPage'))
const SavedJobsPage = lazy(() => import('@/features/jobs/pages/SavedJobsPage'))
const ForumPage = lazy(() => import('@/features/forum/pages/ForumPage'))
const NewDiscussionPage = lazy(() => import('@/features/forum/pages/NewDiscussionPage'))
const DiscussionDetailPage = lazy(() => import('@/features/forum/pages/DiscussionDetailPage'))
const ProfilePage = lazy(() => import('@/features/profile/pages/ProfilePage'))
const EditProfilePage = lazy(() => import('@/features/profile/pages/EditProfilePage'))
const NotificationsPage = lazy(() => import('@/features/notifications/pages/NotificationsPage'))
const AboutPage = lazy(() => import('@/features/about/pages/AboutPage'))
const SearchPage = lazy(() => import('@/features/search/pages/SearchPage'))
const TestimonialsPage = lazy(() => import('@/features/testimonials/pages/TestimonialsPage'))
const LegalNoticePage = lazy(() => import('@/features/legal/pages/LegalNoticePage'))
const PrivacyPage = lazy(() => import('@/features/legal/pages/PrivacyPage'))
const CookiesPage = lazy(() => import('@/features/legal/pages/CookiesPage'))
const ForgotPasswordPage = lazy(() => import('@/features/auth/pages/ForgotPasswordPage'))
const ResetPasswordPage = lazy(() => import('@/features/auth/pages/ResetPasswordPage'))
const VerifyEmailPage = lazy(() => import('@/features/auth/pages/VerifyEmailPage'))
const LoginPage = lazy(() => import('@/features/auth/pages/LoginPage'))
const RegisterPage = lazy(() => import('@/features/auth/pages/RegisterPage'))
const AdminDashboardPage = lazy(() => import('@/features/admin/pages/AdminDashboardPage'))
const AdminNewsPage = lazy(() => import('@/features/admin/pages/AdminNewsPage'))
const AdminJobsPage = lazy(() => import('@/features/admin/pages/AdminJobsPage'))
const AdminForumPage = lazy(() => import('@/features/admin/pages/AdminForumPage'))
const AdminTestimonialsPage = lazy(() => import('@/features/admin/pages/AdminTestimonialsPage'))
const AdminUsersPage = lazy(() => import('@/features/admin/pages/AdminUsersPage'))
const AdminImportPage = lazy(() => import('@/features/admin/pages/AdminImportPage'))

/** Las páginas públicas existen una vez por idioma: «/», «/ca» y «/en». El panel de admin solo en castellano. */
const PUBLIC_LANGUAGES = [
  { prefix: '/', lang: DEFAULT_LANGUAGE },
  { prefix: '/ca', lang: 'ca' },
  { prefix: '/en', lang: 'en' },
]

function publicRoutes({ prefix, lang }) {
  const seg = (esSegment) => routeSegment(esSegment, lang)
  const forum = seg('foro')
  // Direcciones antiguas con el nombre de la sección en castellano (p. ej. «/en/foro/12-x»): redirigen a la traducida.
  const legacy =
    lang === DEFAULT_LANGUAGE ? [] : Object.keys(ROUTE_SEGMENTS).filter((esSegment) => seg(esSegment) !== esSegment)

  return (
    <Route key={prefix} path={prefix} element={<RootLayout />}>
      <Route index element={<HomePage />} />
      <Route path={seg('noticias')} element={<NewsListPage />} />
      <Route path={`${seg('noticias')}/:idSlug`} element={<NewsDetailPage />} />
      <Route path={seg('empleo')} element={<JobsListPage />} />
      <Route
        path={`${seg('empleo')}/${routeSubsegment('empleo', 'guardadas', lang)}`}
        element={
          <RequireAuth>
            <SavedJobsPage />
          </RequireAuth>
        }
      />
      <Route path={`${seg('empleo')}/:idSlug`} element={<JobDetailPage />} />
      <Route path={forum} element={<ForumPage />} />
      <Route
        path={`${forum}/${routeSubsegment('foro', 'nueva', lang)}`}
        element={
          <RequireAuth>
            <NewDiscussionPage />
          </RequireAuth>
        }
      />
      <Route path={`${forum}/:idSlug`} element={<DiscussionDetailPage />} />
      <Route path={seg('testimonios')} element={<TestimonialsPage />} />
      <Route path={seg('buscar')} element={<SearchPage />} />
      <Route path={seg('sobre-el-proyecto')} element={<AboutPage />} />
      <Route
        path={seg('notificaciones')}
        element={
          <RequireAuth>
            <NotificationsPage />
          </RequireAuth>
        }
      />
      <Route
        path={`${seg('perfil')}/${routeSubsegment('perfil', 'editar', lang)}`}
        element={
          <RequireAuth>
            <EditProfilePage />
          </RequireAuth>
        }
      />
      <Route path={`${seg('perfil')}/:idSlug`} element={<ProfilePage />} />
      <Route path={seg('aviso-legal')} element={<LegalNoticePage />} />
      <Route path={seg('privacidad')} element={<PrivacyPage />} />
      <Route path={seg('cookies')} element={<CookiesPage />} />
      <Route path={seg('login')} element={<LoginPage />} />
      <Route path={seg('registro')} element={<RegisterPage />} />
      <Route path={seg('recuperar-contrasena')} element={<ForgotPasswordPage />} />
      <Route path={seg('restablecer-contrasena')} element={<ResetPasswordPage />} />
      <Route path={seg('verificar-email')} element={<VerifyEmailPage />} />
      {legacy.map((esSegment) => (
        <Route key={esSegment} path={`${esSegment}/*`} element={<LegacyPathRedirect />} />
      ))}
      {lang !== DEFAULT_LANGUAGE && (
        <>
          <Route path={`${forum}/nueva`} element={<LegacyPathRedirect />} />
          <Route path={`${seg('empleo')}/guardadas`} element={<LegacyPathRedirect />} />
          <Route path={`${seg('perfil')}/editar`} element={<LegacyPathRedirect />} />
        </>
      )}
      <Route path="*" element={<NotFound />} />
    </Route>
  )
}

export default function AppRoutes() {
  return (
    <Routes>
      {PUBLIC_LANGUAGES.map(publicRoutes)}

      <Route
        path="admin"
        element={
          <RequireAdmin>
            <AdminLayout />
          </RequireAdmin>
        }
      >
        <Route index element={<AdminDashboardPage />} />
        <Route path="noticias" element={<AdminNewsPage />} />
        <Route path="empleo" element={<AdminJobsPage />} />
        <Route path="foro" element={<AdminForumPage />} />
        <Route path="testimonios" element={<AdminTestimonialsPage />} />
        <Route path="usuarios" element={<AdminUsersPage />} />
        <Route path="importacion" element={<AdminImportPage />} />
        <Route path="*" element={<NotFound embedded />} />
      </Route>
    </Routes>
  )
}
