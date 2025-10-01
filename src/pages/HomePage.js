import React from 'react';
import DebugWrapper from '../components/DebugWrapper';

// Import components with error boundaries
const HeroSection = React.lazy(() => import('../components/home/HeroSection'));
const ProgramsSection = React.lazy(() => import('../components/home/ProgramsSection'));
const FeaturesSection = React.lazy(() => import('../components/home/FeaturesSection'));
const TestimonialsSection = React.lazy(() => import('../components/home/TestimonialsSection'));
const CtaSection = React.lazy(() => import('../components/home/CtaSection'));

// Loading fallback
const SectionPlaceholder = ({ name }) => (
  <div style={{ 
    padding: '40px', 
    textAlign: 'center', 
    background: '#f3f4f6',
    border: '2px dashed #d1d5db',
    margin: '10px 0'
  }}>
    Loading {name}...
  </div>
);

const HomePage = () => {
  console.log('🏠 HomePage rendering...');

  return (
    <div className="min-h-screen">
      <React.Suspense fallback={<SectionPlaceholder name="Hero" />}>
        <DebugWrapper componentName="HeroSection">
          <HeroSection />
        </DebugWrapper>
      </React.Suspense>

      <React.Suspense fallback={<SectionPlaceholder name="Programs" />}>
        <DebugWrapper componentName="ProgramsSection">
          <ProgramsSection />
        </DebugWrapper>
      </React.Suspense>

      <React.Suspense fallback={<SectionPlaceholder name="Features" />}>
        <DebugWrapper componentName="FeaturesSection">
          <FeaturesSection />
        </DebugWrapper>
      </React.Suspense>

      <React.Suspense fallback={<SectionPlaceholder name="Testimonials" />}>
        <DebugWrapper componentName="TestimonialsSection">
          <TestimonialsSection />
        </DebugWrapper>
      </React.Suspense>

      <React.Suspense fallback={<SectionPlaceholder name="CTA" />}>
        <DebugWrapper componentName="CtaSection">
          <CtaSection />
        </DebugWrapper>
      </React.Suspense>
    </div>
  );
};

export default HomePage;
