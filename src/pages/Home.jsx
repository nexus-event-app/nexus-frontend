    import React from 'react';
    import Layout from '../components/layout/Layout';
    import HeroSection from '../components/home/HeroSection';
    import WhyNexusSection from '../components/home/WhyNexusSection';
    import FeaturedEventsSection from '../components/home/FeaturedEventsSection';
    import NewsSection from '../components/home/NewsSection';
    import TestimonialsSection from '../components/testimonials/TestimonialsSection';
    import CTASection from '../components/home/CTASection';


    function Home() {
    return (
        <Layout>
        <main className="min-h-screen bg-gray-50">
            <HeroSection />
            <WhyNexusSection />
            <NewsSection />
            <FeaturedEventsSection />
            <TestimonialsSection />
            <CTASection />
        </main>
        </Layout>
    );
    }

    export default Home;
