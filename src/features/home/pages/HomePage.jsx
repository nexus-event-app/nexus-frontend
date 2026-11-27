import JsonLd from '@/shared/components/JsonLd'
import PageMain from '@/shared/components/PageMain'
import Seo from '@/shared/components/Seo'
import { paths } from '@/shared/config/paths'
import GuidesCallout from '@/features/guides/components/GuidesCallout'
import ForumSection from '../components/ForumSection'
import HeroSection from '../components/HeroSection'
import HomeEventsSection from '../components/HomeEventsSection'
import HomeFeatures from '../components/HomeFeatures'
import HomeJoinBanner from '../components/HomeJoinBanner'
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
      <HomeFeatures />
      <HomeEventsSection />
      <LatestJobsSection />
      <HomeJoinBanner />
      <ForumSection />
      <HomePathsSection />
      <LatestNewsSection />
      <TestimonialsSection />
      <GuidesCallout
        id="home-guides"
        className="mx-4 mb-20 mt-4 sm:mx-6 lg:mx-8 xl:mx-auto xl:w-full xl:max-w-[calc(theme(maxWidth.page)-4rem)]"
      />
    </PageMain>
  )
}
