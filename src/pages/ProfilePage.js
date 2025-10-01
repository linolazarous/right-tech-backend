import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext.js'; // Added .js
import { fetchUserProfile } from '../services/userService.js'; // Added .js
import PageLayout from '../layouts/PageLayout.js'; // Added .js
import ProfileSection from '../components/profile/ProfileSection.js'; // Added .js
import EnrolledCourses from '../components/profile/EnrolledCourses.js'; // Added .js
import LoadingSpinner from '../components/ui/LoadingSpinner.js'; // Added .js
import ErrorAlert from '../components/ui/ErrorAlert.js'; // Added .js
import { logger } from '../utils/logger.js'; // Added .js
import usePageTracking from '../hooks/usePageTracking.js'; // Added .js
import ErrorBoundary from '../components/ErrorBoundary.js'; // Added .js
import { Navigate } from 'react-router-dom'; // Import Navigate for redirect

const ProfilePage = () => {
  const { currentUser, loading: authLoading } = useAuth(); // Destructure auth loading state
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  usePageTracking();

  // If Auth is still loading or user is not logged in, show spinner or redirect
  if (authLoading) {
    return (
      <LoadingSpinner fullScreen />
    );
  }
  
  // CRITICAL CHECK: If there is no user, redirect to login page.
  if (!currentUser) {
    // Navigate to login page if user is not authenticated
    return <Navigate to="/login" replace />;
  }

  useEffect(() => {
    // Define the loadProfile function inside useEffect for simplicity
    const loadProfile = async () => {
      // Since we checked for !currentUser above, currentUser.id should exist here.
      try {
        setError(null); // Clear previous errors
        logger.debug('Loading user profile', { userId: currentUser.id });
        
        const data = await fetchUserProfile(currentUser.id);
        
        setProfile(data);
        logger.info('User profile loaded', {
          userId: currentUser.id,
          courseCount: data.coursesEnrolled?.length || 0
        });
      } catch (err) {
        logger.error('Failed to load profile', err);
        setError(err.message || 'Failed to connect to the user profile service.');
      } finally {
        setLoading(false);
      }
    };

    // Only load profile if we have a user and we haven't loaded yet
    if (currentUser.id && loading) {
      loadProfile();
    }
    
  }, [currentUser, loading]); // Added 'loading' dependency to manage retry attempts

  // Show full screen loading spinner while profile data is being fetched
  if (loading) {
    return <LoadingSpinner fullScreen />;
  }

  // Render the page content if loading is complete and no errors occurred
  return (
    <PageLayout 
      title="My Profile" 
      protectedRoute
      seoTitle="My Learning Profile | Right Tech Centre"
      seoDescription="View and manage your learning profile and progress"
    >
      <ErrorBoundary>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {error ? (
            <ErrorAlert 
              message="Failed to load profile"
              error={error}
              onRetry={() => setLoading(true)} // Retrigger the fetch by setting loading to true
            />
          ) : profile ? (
            <div className="space-y-8">
              <ProfileSection 
                user={profile} 
                className="bg-white shadow rounded-lg p-6"
              />
              <EnrolledCourses 
                courses={profile.coursesEnrolled || []} // Default to empty array
                className="bg-white shadow rounded-lg p-6"
              />
            </div>
          ) : (
            // Fallback for unexpected empty profile data
            <ErrorAlert message="User profile data is unavailable." />
          )}
        </div>
      </ErrorBoundary>
    </PageLayout>
  );
};

export default React.memo(ProfilePage);

