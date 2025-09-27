import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext.js';
import { fetchUserProfile } from '../services/userService.js';
import PageLayout from '../layouts/PageLayout.js';
import ProfileSection from '../components/profile/ProfileSection.js';
import EnrolledCourses from '../components/profile/EnrolledCourses.js';
import LoadingSpinner from '../components/ui/LoadingSpinner.js';
import ErrorAlert from '../components/ui/ErrorAlert.js';
import { logger } from '../utils/logger.js';
import { usePageTracking } from '../hooks/usePageTracking.js';
import ErrorBoundary from '../components/ErrorBoundary.js';

const ProfilePage = () => {
  const { currentUser } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  usePageTracking();

  useEffect(() => {
    const loadProfile = async () => {
      try {
        logger.debug('Loading user profile', { userId: currentUser?.id });
        const data = await fetchUserProfile(currentUser?.id);
        setProfile(data);
        logger.info('User profile loaded', {
          userId: currentUser?.id,
          courseCount: data.coursesEnrolled?.length || 0
        });
      } catch (err) {
        logger.error('Failed to load profile', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (currentUser?.id) {
      loadProfile();
    }
  }, [currentUser?.id]);

  return (
    <PageLayout 
      title="My Profile" 
      protectedRoute
      seoTitle="My Learning Profile | Right Tech Centre"
      seoDescription="View and manage your learning profile and progress"
    >
      <ErrorBoundary>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {loading ? (
            <LoadingSpinner fullScreen />
          ) : error ? (
            <ErrorAlert 
              message="Failed to load profile"
              error={error}
              onRetry={() => window.location.reload()}
            />
          ) : (
            <div className="space-y-8">
              <ProfileSection 
                user={profile} 
                className="bg-white shadow rounded-lg p-6"
              />
              <EnrolledCourses 
                courses={profile.coursesEnrolled} 
                className="bg-white shadow rounded-lg p-6"
              />
            </div>
          )}
        </div>
      </ErrorBoundary>
    </PageLayout>
  );
};

export default React.memo(ProfilePage);

