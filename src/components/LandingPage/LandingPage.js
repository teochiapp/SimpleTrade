import React from 'react';
import Header from './Header';
import ContentArea from './ContentArea';
import Footer from './Footer';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <Header />
      <ContentArea />
      <Footer />
    </div>
  );
};

export default LandingPage;
