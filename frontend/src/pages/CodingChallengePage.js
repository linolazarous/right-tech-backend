import React from 'react';
import CodingChallenge from '../components/CodingChallenge.js';
import PageLayout from '../layouts/PageLayout.js';
import { usePageTracking } from '../hooks/usePageTracking.js';
import ErrorBoundary from '../components/ErrorBoundary.js';
import { useAuth } from '../contexts/AuthContext.js';

const CodingChallengePage = () => {
  const { currentUser } = useAuth();
  usePageTracking();

  return (
    <PageLayout 
      title="Coding Challenges"
      protectedRoute
      seoTitle="Coding Challenges | Right Tech Centre"
      seoDescription="Test and improve your coding skills with our interactive challenges"
    >
      <ErrorBoundary>
        <CodingChallenge userId={currentUser?.id} />
      </ErrorBoundary>
    </PageLayout>
  );
};

export default React.memo(CodingChallengePage);


