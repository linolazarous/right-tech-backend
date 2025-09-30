import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { logEvent } from '../utils/monitoring';

const usePageTracking = (pageName = '') => {
  const location = useLocation();

  useEffect(() => {
    const trackPageView = () => {
      try {
        const pageData = {
          path: location.pathname,
          search: location.search,
          title: pageName || document.title,
          timestamp: new Date().toISOString()
        };

        // Log page view
        logEvent('page_view', pageData);

        console.log('Page tracked:', pageData);
      } catch (error) {
        console.error('Page tracking error:', error);
      }
    };

    trackPageView();
  }, [location, pageName]);

  return null; // Hook doesn't return anything
};

// Export both named and default
export { usePageTracking };
export default usePageTracking;
