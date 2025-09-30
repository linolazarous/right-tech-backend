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

        // Google Analytics (if available)
        if (typeof gtag !== 'undefined') {
          gtag('config', process.env.REACT_APP_GA_TRACKING_ID, {
            page_path: location.pathname,
            page_title: pageName
          });
        }

        console.log('Page tracked:', pageData);
      } catch (error) {
        console.error('Page tracking error:', error);
      }
    };

    trackPageView();
  }, [location, pageName]);
};

export default usePageTracking;
