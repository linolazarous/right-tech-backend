import React, { useEffect } from 'react';
import PageLayout from '../layouts/PageLayout.js';
import { logger } from '../utils/logger.js';
import { usePageTracking } from '../hooks/usePageTracking.js';
import HeroSection from '../components/home/HeroSection.js';
import ProgramsSection from '../components/home/ProgramsSection.js';
import FeaturesSection from '../components/home/FeaturesSection.js';
import TestimonialsSection from '../components/home/TestimonialsSection.js';
import CtaSection from '../components/home/CtaSection.js';
import ErrorBoundary from '../components/ErrorBoundary.js';

const HomePage = () => {
  usePageTracking();

  useEffect(() => {
    logger.info('Home page visited');
    
    // Initialize animations
    const initializeAOS = async () => {
      if (typeof window !== 'undefined') {
        const AOS = (await import('aos')).default;
        AOS.init({
          duration: 800,
          easing: 'ease-in-out',
          once: true,
          disable: window.innerWidth < 768 // Disable on mobile
        });
      }
    };

    initializeAOS();
  }, []);

  return (
    <PageLayout noFooterMargin noNavbarPadding>
      <ErrorBoundary>
        <HeroSection />
        <ProgramsSection />
        <FeaturesSection />
        <TestimonialsSection />
        <CtaSection />
      </ErrorBoundary>
    </PageLayout>
  );
};

export default React.memo(HomePage);

