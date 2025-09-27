import React, { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext.js';
import PageLayout from '../layouts/PageLayout.js';
import SkillAssessment from '../components/SkillAssessment.js';
import { logger } from '../utils/logger.js';
import { usePageTracking } from '../hooks/usePageTracking.js';
import ErrorBoundary from '../components/ErrorBoundary.js';
import LoadingSpinner from '../components/LoadingSpinner.js';

const SkillAssessmentPage = () => {
  const { currentUser } = useAuth();
  usePageTracking();

  useEffect(() => {
    logger.info('Skill assessment accessed', {
      userId: currentUser?.id
    });
  }, [currentUser?.id]);

  return (
    <PageLayout 
      title="Skill Assessment"
      protectedRoute
      seoTitle="Technical Skill Assessment | Right Tech Centre"
      seoDescription="Evaluate your technical skills and identify areas for improvement"
    >
      <ErrorBoundary>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {!currentUser ? (
            <LoadingSpinner />
          ) : (
            <SkillAssessment 
              userId={currentUser.id}
              className="bg-white rounded-lg shadow-lg p-6"
            />
          )}
        </div>
      </ErrorBoundary>
    </PageLayout>
  );
};

export default React.memo(SkillAssessmentPage);

