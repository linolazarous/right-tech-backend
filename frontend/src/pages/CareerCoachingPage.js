import React, { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext.js';
import CareerCoaching from '../components/CareerCoaching.js';
import PageLayout from '../layouts/PageLayout.js';
import { logger } from '../utils/logger.js';
import { usePageTracking } from '../hooks/usePageTracking.js';
import ErrorBoundary from '../components/ErrorBoundary.js';
import LoadingSpinner from '../components/LoadingSpinner.js';

const CareerCoachingPage = () => {
  const { currentUser, loading: authLoading } = useAuth();
  usePageTracking();

  useEffect(() => {
    if (currentUser) {
      logger.info('User accessed career coaching', {
        userId: currentUser.id,
        timestamp: new Date().toISOString()
      });
    }
  }, [currentUser]);

  if (authLoading) {
    return (
      <PageLayout>
        <LoadingSpinner fullScreen />
      </PageLayout>
    );
  }

  return (
    <PageLayout 
      title="Career Coaching" 
      protectedRoute
      seoTitle="Career Coaching | Right Tech Centre"
      seoDescription="Get personalized career guidance and coaching from industry experts"
    >
      <ErrorBoundary>
        <CareerCoaching userId={currentUser?.id} />
      </ErrorBoundary>
    </PageLayout>
  );
};

export default React.memo(CareerCoachingPage);

