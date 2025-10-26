import React from 'react';
import DashboardHeader from './DashboardHeader';
import DashboardContent from './DashboardContent';
import { DashboardContainer } from './styled/DashboardStyles';

const Dashboard = () => {
  return (
    <DashboardContainer>
      <DashboardHeader />
      <DashboardContent />
    </DashboardContainer>
  );
};

export default Dashboard;
