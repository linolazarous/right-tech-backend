import React, { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext.js';
import LearningPaths from '../components/learning/LearningPath.js';
import PageLayout from '../layouts/PageLayout.js';
import useLearningPaths from '../hooks/useLearningPaths.js';
import { logger } from '../utils/logger.js';
import { usePageTracking } from '../hooks/usePageTracking.js';
import ErrorBoundary from '../components/ErrorBoundary.js';
import LoadingSpinner from '../components/LoadingSpinner.js';
import ErrorAlert from '../components/ui/ErrorAlert.js';

const LearningPathPage = () => {
  const { currentUser } = useAuth();
  const { paths, loading, error, refetch } = useLearningPaths(currentUser?.id);
  usePageTracking();

  useEffect(() => {
    if (paths) {
      logger.info('Learning paths loaded', {
        userId: currentUser?.id,
        pathCount: paths.length
      });
    }
  }, [paths, currentUser?.id]);

  return (
    <PageLayout 
      title="My Learning Paths" 
      protectedRoute
      seoTitle="Personalized Learning Paths | Right Tech Centre"
      seoDescription="Track and manage your customized learning journey"
    >
      <ErrorBoundary>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {loading ? (
            <LoadingSpinner />
          ) : error ? (
            <ErrorAlert 
              message="Failed to load learning paths"
              error={error}
              onRetry={refetch}
            />
          ) : (
            <LearningPaths 
              paths={paths} 
              loading={loading}
              error={error}
              onRefresh={refetch}
              className="bg-white rounded-lg shadow"
            />
          )}
        </div>
      </ErrorBoundary>
    </PageLayout>
  );
};

export default React.memo(LearningPathPage);

