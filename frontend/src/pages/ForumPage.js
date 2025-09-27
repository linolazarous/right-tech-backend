import React, { useEffect } from 'react';
import PageLayout from '../layouts/PageLayout.js';
import ForumPostList from '../components/community/ForumPostList.js';
import { useForumPosts } from '../hooks/useForumPosts.js';
import { logger } from '../utils/logger.js';
import { usePageTracking } from '../hooks/usePageTracking.js';
import ErrorBoundary from '../components/ErrorBoundary.js';
import LoadingSpinner from '../components/LoadingSpinner.js';

const ForumPage = () => {
  const { posts, loading, error, refetch } = useForumPosts();
  usePageTracking();

  useEffect(() => {
    logger.info('Forum page accessed', {
      postCount: posts?.length || 0
    });
  }, [posts]);

  return (
    <PageLayout 
      title="Community Forum"
      seoTitle="Tech Community Forum | Right Tech Centre"
      seoDescription="Join discussions with fellow students and instructors in our tech community forum"
    >
      <ErrorBoundary>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {loading ? (
            <LoadingSpinner />
          ) : (
            <ForumPostList 
              posts={posts}
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

export default React.memo(ForumPage);

