import React, { useState } from 'react';
import LandingPage from '../components/LandingPage/LandingPage';

const LandingPageContainer = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const handleOpenLoginModal = () => {
    setIsLoginModalOpen(true);
  };

  const handleCloseLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  return (
    <LandingPage
      isLoginModalOpen={isLoginModalOpen}
      onOpenLoginModal={handleOpenLoginModal}
      onCloseLoginModal={handleCloseLoginModal}
    />
  );
};

export default LandingPageContainer;
