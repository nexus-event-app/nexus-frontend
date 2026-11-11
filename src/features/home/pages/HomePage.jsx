import JsonLd from '@/shared/components/JsonLd'
import PageMain from '@/shared/components/PageMain'
import Seo from '@/shared/components/Seo'
import { paths } from '@/shared/config/paths'
import ForumSection from '../components/ForumSection'
import HeroSection from '../components/HeroSection'
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
      <HomePathsSection />
      <LatestNewsSection />
      <LatestJobsSection />
      <ForumSection />
      <TestimonialsSection />
    </PageMain>
  )
}
