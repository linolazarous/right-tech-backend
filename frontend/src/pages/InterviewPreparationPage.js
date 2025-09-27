import React, { useEffect } from 'react';
import PageLayout from '../layouts/PageLayout.js';
import InterviewPreparation from '../components/InterviewPreparation.js';
import { logger } from '../utils/logger.js';
import { usePageTracking } from '../hooks/usePageTracking.js';
import ErrorBoundary from '../components/ErrorBoundary.js';
import { useAuth } from '../contexts/AuthContext.js';
import LoadingSpinner from '../components/LoadingSpinner.js';

const InterviewPreparationPage = () => {
  const { currentUser } = useAuth();
  usePageTracking();

  useEffect(() => {
    logger.info('Interview preparation page accessed', {
      userId: currentUser?.id
    });
  }, [currentUser?.id]);

  return (
    <PageLayout 
      title="Interview Preparation"
      protectedRoute
      seoTitle="Tech Interview Preparation | Right Tech Centre"
      seoDescription="Prepare for technical interviews with our comprehensive resources and mock interviews"
    >
      <ErrorBoundary>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {!currentUser ? (
            <LoadingSpinner />
          ) : (
            <InterviewPreparation userId={currentUser.id} />
          )}
        </div>
      </ErrorBoundary>
    </PageLayout>
  );
};

export default React.memo(InterviewPreparationPage);

