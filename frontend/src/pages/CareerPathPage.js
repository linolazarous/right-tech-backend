import React, { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext.jd';
import CareerPathRecommendation from '../components/CareerPathRecommendation';
import PageLayout from '../layouts/PageLayout.js';
import { logger } from '../utils/logger.js';
import { usePageTracking } from '../hooks/usePageTracking.js';
import ErrorBoundary from '../components/ErrorBoundary.js';

const CareerPathPage = () => {
  const { currentUser } = useAuth();
  usePageTracking();

  useEffect(() => {
    if (currentUser) {
      logger.info('User accessed career path recommendations');
    }
  }, [currentUser]);

  return (
    <PageLayout 
      title="Career Path Recommendations" 
      protectedRoute
      seoTitle="Career Path Recommendations | Right Tech Centre"
      seoDescription="Discover personalized career paths based on your skills and interests"
    >
      <ErrorBoundary>
        <CareerPathRecommendation userId={currentUser?.id} />
      </ErrorBoundary>
    </PageLayout>
  );
};

export default React.memo(CareerPathPage);

