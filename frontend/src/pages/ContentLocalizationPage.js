import React, { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext.js';
import PageLayout from '../layouts/PageLayout.js';
import Localization from '../components/Localization.js';
import { logger } from '../utils/logger.js';
import { usePageTracking } from '../hooks/usePageTracking.js';
import ErrorBoundary from '../components/ErrorBoundary.js';
import LoadingSpinner from '../components/LoadingSpinner.js';

const ContentLocalizationPage = () => {
  const { currentUser, loading: authLoading } = useAuth();
  usePageTracking('ContentLocalizationPage');

  useEffect(() => {
    if (currentUser) {
      logger.info('User accessed content localization', {
        userId: currentUser.id,
        role: currentUser.role,
        page: 'ContentLocalizationPage'
      });
    }
  }, [currentUser]);

  if (authLoading) {
    return (
      <PageLayout>
        <div className="min-h-screen flex items-center justify-center">
          <LoadingSpinner size="large" />
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout 
      title="Content Localization" 
      protectedRoute={true}
      seoTitle="Content Localization | Right Tech Centre"
      seoDescription="Manage and localize content for different regions and languages"
      breadcrumbs={[
        { label: 'Home', path: '/' },
        { label: 'Content', path: '/content' },
        { label: 'Localization', path: '/content/localization.js' }
      ]}
    >
      <ErrorBoundary fallback={<div className="p-4 text-red-600">Error loading localization content</div>}>
        <div className="content-localization-page">
          <Localization 
            userId={currentUser?.id}
            userRole={currentUser?.role}
            isAdmin={currentUser?.role === 'admin'}
          />
        </div>
      </ErrorBoundary>
    </PageLayout>
  );
};

export default React.memo(ContentLocalizationPage);
