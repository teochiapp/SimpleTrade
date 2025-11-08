import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LayoutDashboard, BookOpen, LogOut, LogIn } from 'lucide-react';
import LoginModal from './LoginModal';
import { useStrapiAuth } from '../../hooks/useStrapiTrades';
import {
  HeaderContainer,
  HeaderBrand,
  Tagline,
  HeaderNav,
  HeaderActions,
  LoginButton
} from './styled/HeaderStyles';

const Header = ({ isLoginModalOpen, onOpenLoginModal, onCloseLoginModal }) => {
  const navigate = useNavigate();
  const { user, logout } = useStrapiAuth();

  const handleDashboardClick = () => {
    navigate('/dashboard');
  };

  const handleTradesClick = () => {
    navigate('/trades');
  };

  const handleLogoutClick = () => {
    logout();
    navigate('/');
  };

  return (
    <HeaderContainer>
      <HeaderBrand>
        <h1>SimpliTrade</h1>
        <Tagline>Tu Diario de Trading</Tagline>
      </HeaderBrand>
      
      <HeaderNav>
        <ul>
          <li><a href="#inicio">Inicio</a></li>
          <li><a href="#caracteristicas">Características</a></li>
          <li><a href="#beneficios">Beneficios</a></li>
          <li><a href="#contacto">Contacto</a></li>
        </ul>
      </HeaderNav>

      <HeaderActions>
        {user ? (
          // Usuario autenticado - mostrar opciones de navegación y logout
          <>
            <LoginButton onClick={handleDashboardClick} style={{ marginRight: '1rem' }}>
              <LayoutDashboard size={18} />
              Dashboard
            </LoginButton>
            <LoginButton onClick={handleTradesClick} style={{ marginRight: '1rem' }}>
              <BookOpen size={18} />
              Trades
            </LoginButton>
            <LoginButton onClick={handleLogoutClick} style={{ background: '#e74c3c' }}>
              <LogOut size={18} />
              Cerrar Sesión
            </LoginButton>
          </>
        ) : (
          // Usuario no autenticado - mostrar botón de login
          <LoginButton onClick={onOpenLoginModal}>
            <LogIn size={18} />
            Iniciar Sesión
          </LoginButton>
        )}
      </HeaderActions>

      {isLoginModalOpen && (
        <LoginModal onClose={onCloseLoginModal} />
      )}
    </HeaderContainer>
  );
};

export default Header;
