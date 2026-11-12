import JsonLd from '@/shared/components/JsonLd'
import PageMain from '@/shared/components/PageMain'
import Seo from '@/shared/components/Seo'
import { paths } from '@/shared/config/paths'
import ForumSection from '../components/ForumSection'
import HeroSection from '../components/HeroSection'
import HomeJoinSection from '../components/HomeJoinSection'
import HomePathsSection from '../components/HomePathsSection'
import LatestJobsSection from '../components/LatestJobsSection'
import LatestNewsSection from '../components/LatestNewsSection'
import TestimonialsSection from '../components/TestimonialsSection'
import { buildHomeData } from '../utils/structuredData'

export default function HomePage() {
  return (
    <PageMain>
      <Seo path={paths.home} />
      <JsonLd data={buildHomeData()} />
      <HeroSection />
      <LatestNewsSection />
      <LatestJobsSection />
      <ForumSection />
      <HomePathsSection />
      <TestimonialsSection />
      {/* Al final, después de los testimonios: invita a crear cuenta (solo sin sesión). */}
      <HomeJoinSection />
    </PageMain>
  )
}
