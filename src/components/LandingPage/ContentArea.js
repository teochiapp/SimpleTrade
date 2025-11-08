import React from 'react';
import HeroSection from './sections/HeroSection';
import FeaturesSection from './sections/FeaturesSection';
import BenefitsSection from './sections/BenefitsSection';
import CtaSection from './sections/CtaSection';

const ContentArea = ({ onOpenLoginModal }) => {
  return (
    <main className="content-area">
      <HeroSection />
      <FeaturesSection />
      <BenefitsSection />
      <CtaSection onOpenLoginModal={onOpenLoginModal} />
    </main>
  );
};

export default ContentArea;
