import React, { useEffect, useCallback } from 'react';
import PageLayout from '../layouts/PageLayout';
import { logger } from '../utils/logger';
import { usePageTracking } from '../hooks/usePageTracking';
import HeroSection from '../components/home/HeroSection';
import ProgramsSection from '../components/home/ProgramsSection';
import FeaturesSection from '../components/home/FeaturesSection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import CtaSection from '../components/home/CtaSection';
import ErrorBoundary from '../components/ErrorBoundary';

const HomePage = () => {
  usePageTracking();

  // Initialize AOS animations safely
  const initializeAOS = useCallback(async () => {
    if (typeof window === 'undefined') return; // SSR-safe
    try {
      const AOS = (await import('aos')).default;
      AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        disable: window.innerWidth < 768, // Disable on mobile
      });
      logger.info('AOS animations initialized');
    } catch (error) {
      logger.warn('Failed to initialize AOS:', error);
    }
  }, []);

  useEffect(() => {
    logger.info('Home page visited');
    initializeAOS();
  }, [initializeAOS]);

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

// React.memo to prevent unnecessary re-renders
export default React.memo(HomePage);
