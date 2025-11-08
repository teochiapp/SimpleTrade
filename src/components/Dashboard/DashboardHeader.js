import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, NotebookPen, Settings2, LogOut } from 'lucide-react';
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
          <li><a href="#trades"><TrendingUp size={18} />Mis Trades</a></li>
          <li><a href="#analytics"><NotebookPen size={18} />Análisis</a></li>
          <li><a href="#settings"><Settings2 size={18} />Configuración</a></li>
        </ul>
      </DashboardNav>

      <DashboardActions>
        <LogoutButton onClick={handleLogout}>
          <LogOut size={18} />
          Cerrar Sesión
        </LogoutButton>
      </DashboardActions>
    </DashboardHeaderStyled>
  );
};

export default DashboardHeader;
