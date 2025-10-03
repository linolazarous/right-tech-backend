import React, { useEffect, useRef } from 'react';
import Header from '../components/home/Header';
import HeroSection from '../components/home/HeroSection';
import AboutSection from '../components/home/AboutSection';
import ProgramsSection from '../components/home/ProgramsSection';
import FeaturesSection from '../components/home/FeaturesSection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import StructureSection from '../components/home/StructureSection';
import CtaSection from '../components/home/CtaSection';
import ContactSection from '../components/home/ContactSection';
import Footer from '../components/home/Footer';

const HomePage = () => {
  const sectionsRef = useRef({
    home: null,
    programs: null,
    courses: null,
    structure: null,
    testimonials: null,
    contact: null
  });

  useEffect(() => {
    // Smooth scroll functionality
    const handleSmoothScroll = (e) => {
      const href = e.currentTarget.getAttribute('href');
      
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          const headerHeight = 80; // Height of fixed header
          const targetPosition = targetElement.offsetTop - headerHeight;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
          
          // Update URL without page reload
          window.history.pushState(null, '', href);
        }
      }
    };

    // Add click event listeners to all internal links
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    internalLinks.forEach(link => {
      link.addEventListener('click', handleSmoothScroll);
    });

    // Handle browser back/forward buttons
    const handlePopState = () => {
      const hash = window.location.hash;
      if (hash) {
        const targetElement = document.getElementById(hash.substring(1));
        if (targetElement) {
          const headerHeight = 80;
          const targetPosition = targetElement.offsetTop - headerHeight;
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      }
    };

    window.addEventListener('popstate', handlePopState);

    // Cleanup
    return () => {
      internalLinks.forEach(link => {
        link.removeEventListener('click', handleSmoothScroll);
      });
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  // Mock login handler (replace with actual authentication)
  const handleLoginClick = (e) => {
    e.preventDefault();
    // For now, just show an alert. Replace with actual login modal or redirect
    alert('Login functionality will be implemented soon!');
    // You can replace this with:
    // - Opening a login modal
    // - Redirecting to /login page
    // - Your authentication logic
  };

  // Mock courses handler
  const handleCoursesClick = (e) => {
    e.preventDefault();
    alert('Courses page will be available soon!');
    // You can replace this with:
    // - Redirecting to /courses page
    // - Opening a courses modal
  };

  // Mock tab navigation for program sections
  const handleTabClick = (e, tabId) => {
    e.preventDefault();
    // This would typically show different course content based on the tab
    alert(`Showing ${tabId.replace('-tab', '').replace('-', ' ')} content`);
    
    // You can implement tab switching logic here:
    // - Hide all tab contents
    // - Show the selected tab content
    // - Update active tab styles
  };

  useEffect(() => {
    // Add click handlers for specific navigation elements
    const loginButtons = document.querySelectorAll('a[href="#login"], .login-trigger');
    const courseButtons = document.querySelectorAll('a[href="#courses"], .courses-trigger');
    const tabButtons = document.querySelectorAll('.tab-link, [data-tab]');

    loginButtons.forEach(button => {
      button.addEventListener('click', handleLoginClick);
    });

    courseButtons.forEach(button => {
      button.addEventListener('click', handleCoursesClick);
    });

    tabButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        const tabId = button.getAttribute('data-tab') || button.getAttribute('href')?.replace('#', '');
        if (tabId) handleTabClick(e, tabId);
      });
    });

    return () => {
      loginButtons.forEach(button => {
        button.removeEventListener('click', handleLoginClick);
      });
      courseButtons.forEach(button => {
        button.removeEventListener('click', handleCoursesClick);
      });
      tabButtons.forEach(button => {
        button.removeEventListener('click', handleTabClick);
      });
    };
  }, []);

  return (
    <div className="min-h-screen">
      {/* Header - Fixed at top */}
      <Header />
      
      {/* Main Content */}
      <main>
        <HeroSection />
        <AboutSection />
        <ProgramsSection />
        <FeaturesSection />
        <TestimonialsSection />
        <StructureSection />
        <CtaSection />
        <ContactSection />
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;
