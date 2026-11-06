import { lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import RequireAdmin from '@/features/auth/components/RequireAdmin'
import RequireAuth from '@/features/auth/components/RequireAuth'
import AdminLayout from '@/features/admin/components/AdminLayout'
import NotFound from '@/shared/components/NotFound'
import RootLayout from './layout/RootLayout'

const HomePage = lazy(() => import('@/features/home/pages/HomePage'))
const NewsListPage = lazy(() => import('@/features/news/pages/NewsListPage'))
const NewsDetailPage = lazy(() => import('@/features/news/pages/NewsDetailPage'))
const JobsListPage = lazy(() => import('@/features/jobs/pages/JobsListPage'))
const JobDetailPage = lazy(() => import('@/features/jobs/pages/JobDetailPage'))
const ForumPage = lazy(() => import('@/features/forum/pages/ForumPage'))
const NewDiscussionPage = lazy(() => import('@/features/forum/pages/NewDiscussionPage'))
const DiscussionDetailPage = lazy(() => import('@/features/forum/pages/DiscussionDetailPage'))
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

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route index element={<HomePage />} />
        <Route path="noticias" element={<NewsListPage />} />
        <Route path="noticias/:idSlug" element={<NewsDetailPage />} />
        <Route path="empleo" element={<JobsListPage />} />
        <Route path="empleo/:idSlug" element={<JobDetailPage />} />
        <Route path="foro" element={<ForumPage />} />
        <Route
          path="foro/nueva"
          element={
            <RequireAuth>
              <NewDiscussionPage />
            </RequireAuth>
          }
        />
        <Route path="foro/:idSlug" element={<DiscussionDetailPage />} />
        <Route path="testimonios" element={<TestimonialsPage />} />
        <Route path="aviso-legal" element={<LegalNoticePage />} />
        <Route path="privacidad" element={<PrivacyPage />} />
        <Route path="cookies" element={<CookiesPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="registro" element={<RegisterPage />} />
        <Route path="recuperar-contrasena" element={<ForgotPasswordPage />} />
        <Route path="restablecer-contrasena" element={<ResetPasswordPage />} />
        <Route path="verificar-email" element={<VerifyEmailPage />} />
        <Route path="*" element={<NotFound />} />
      </Route>

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
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
