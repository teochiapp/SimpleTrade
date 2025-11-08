import React from 'react';
import Header from './Header';
import ContentArea from './ContentArea';
import Footer from './Footer';

const LandingPage = ({ isLoginModalOpen, onOpenLoginModal, onCloseLoginModal }) => {
  return (
    <div className="landing-page">
      <Header
        isLoginModalOpen={isLoginModalOpen}
        onOpenLoginModal={onOpenLoginModal}
        onCloseLoginModal={onCloseLoginModal}
      />
      <ContentArea onOpenLoginModal={onOpenLoginModal} />
      <Footer />
    </div>
  );
};

export default LandingPage;
