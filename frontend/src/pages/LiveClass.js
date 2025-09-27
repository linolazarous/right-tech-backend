import React, { useEffect } from 'react';
import PageLayout from '../layouts/PageLayout.js';
import LiveClassList from '../components/learning/LiveClassList.js';
import { useLiveClasses } from '../hooks/useLiveClasses.js';
import { logger } from '../utils/logger.js';
import { usePageTracking } from '../hooks/usePageTracking.js';
import ErrorBoundary from '../components/ErrorBoundary.js';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorAlert from '../components/ui/ErrorAlert.js';

const LiveClassPage = () => {
  const { classes, loading, error, refetch } = useLiveClasses();
  usePageTracking();

  useEffect(() => {
    if (!loading && classes) {
      logger.info('Live classes loaded', {
        classCount: classes.length
      });
    }
  }, [classes, loading]);

  return (
    <PageLayout 
      title="Live Classes"
      seoTitle="Upcoming Live Classes | Right Tech Centre"
      seoDescription="Join interactive live classes with expert instructors"
    >
      <ErrorBoundary>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {loading ? (
            <LoadingSpinner />
          ) : error ? (
            <ErrorAlert 
              message="Failed to load live classes"
              error={error}
              onRetry={refetch}
            />
          ) : (
            <LiveClassList 
              classes={classes}
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

export default React.memo(LiveClassPage);



