import React from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/authService';
import {
  DashboardHeaderStyled,
  DashboardBrand,
  DashboardNav,
  DashboardActions,
  LogoutButton
} from './styled/DashboardStyles';

const DashboardHeader = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    authService.logout();
    navigate('/');
  };

  return (
    <DashboardHeaderStyled>
      <DashboardBrand>
        <h1>SimpliTrade Dashboard</h1>
      </DashboardBrand>
      
      <DashboardNav>
        <ul>
          <li><a href="#trades">Mis Trades</a></li>
          <li><a href="#analytics">Análisis</a></li>
          <li><a href="#settings">Configuración</a></li>
        </ul>
      </DashboardNav>

      <DashboardActions>
        <LogoutButton onClick={handleLogout}>
          Cerrar Sesión
        </LogoutButton>
      </DashboardActions>
    </DashboardHeaderStyled>
  );
};

export default DashboardHeader;
