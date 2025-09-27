import React, { useEffect } from 'react';
import PageLayout from '../layouts/PageLayout.js';
import LiveQA from '../components/LiveQA.js;
import { logger } from '../utils/logger.js';
import { usePageTracking } from '../hooks/usePageTracking.js';
import ErrorBoundary from '../components/ErrorBoundary.js';
import { useAuth } from '../contexts/AuthContext.js';
import LoadingSpinner from '../components/LoadingSpinner.js';

const LiveQAPage = () => {
  const { currentUser } = useAuth();
  usePageTracking();

  useEffect(() => {
    logger.info('Live QA session accessed', {
      userId: currentUser?.id
    });
  }, [currentUser?.id]);

  return (
    <PageLayout 
      title="Live Q&A"
      protectedRoute
      seoTitle="Live Q&A Sessions | Right Tech Centre"
      seoDescription="Get real-time answers from instructors and peers"
    >
      <ErrorBoundary>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {!currentUser ? (
            <LoadingSpinner />
          ) : (
            <LiveQA userId={currentUser.id} />
          )}
        </div>
      </ErrorBoundary>
    </PageLayout>
  );
};

export default React.memo(LiveQAPage);

