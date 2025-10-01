import React from 'react';
import HeroSection from '../components/home/HeroSection';
import ProgramsSection from '../components/home/ProgramsSection';
import FeaturesSection from '../components/home/FeaturesSection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import CtaSection from '../components/home/CtaSection';

const HomePage = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <ProgramsSection />
      <FeaturesSection />
      <TestimonialsSection />
      <CtaSection />
    </div>
  );
};

export default HomePage;
