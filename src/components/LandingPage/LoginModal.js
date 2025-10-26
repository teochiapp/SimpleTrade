import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import strapiService from '../../services/strapiService';
import { StyledButton, StyledInput } from '../common/StyledComponents';
import {
  ModalOverlay,
  ModalContent,
  ModalHeader,
  CloseButton,
  LoginForm,
  FormGroup,
  ErrorMessage,
  SuccessMessage,
  DemoCredentials,
  TabContainer,
  Tab
} from './styled/ModalStyles';

const LoginModal = ({ onClose }) => {
  const navigate = useNavigate();
  const [mode, setMode] = useState('login');
  const [formData, setFormData] = useState({
    email: 'test@simpletrade.com',
    password: 'password123',
    username: 'usuario_nuevo'
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Cambiar datos del formulario según el modo
  const handleModeChange = (newMode) => {
    setMode(newMode);
    setError('');
    setSuccess('');
    
    if (newMode === 'register') {
      setFormData({
        email: 'nuevo@simpletrade.com',
        password: 'password123',
        username: 'mi_usuario'
      });
    } else {
      setFormData({
        email: 'test@simpletrade.com',
        password: 'password123',
        username: 'usuario_nuevo'
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      let result;
      
      if (mode === 'login') {
        result = await strapiService.login(formData.email, formData.password);
      } else {
        result = await strapiService.register(formData.email, formData.password, formData.username);
      }
      
      if (result.success) {
        // Mostrar mensaje de éxito
        setError('');
        setSuccess('¡Éxito! Redirigiendo al Dashboard...');
        setIsLoading(false);
        
        // Redirección después de mostrar mensaje
        setTimeout(() => {
          onClose();
          navigate('/dashboard');
        }, 1000);
        
        return; // Salir early para evitar que se ejecute finally
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('Error de conexión. Asegúrate de que el backend esté funcionando.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ModalOverlay as={motion.div}>
      <ModalContent 
        as={motion.div}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <ModalHeader>
          <h2>{mode === 'login' ? 'Iniciar Sesión' : 'Crear Cuenta'}</h2>
          <CloseButton onClick={onClose}>×</CloseButton>
        </ModalHeader>
        
        <TabContainer>
          <Tab 
            active={mode === 'login'} 
            onClick={() => handleModeChange('login')}
          >
            Iniciar Sesión
          </Tab>
          <Tab 
            active={mode === 'register'} 
            onClick={() => handleModeChange('register')}
          >
            Registro
          </Tab>
        </TabContainer>

        <LoginForm onSubmit={handleSubmit}>
          {mode === 'register' && (
            <FormGroup>
              <label htmlFor="username">Usuario</label>
              <StyledInput
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                required={mode === 'register'}
                placeholder="Tu nombre de usuario"
              />
            </FormGroup>
          )}

          <FormGroup>
            <label htmlFor="email">Email</label>
            <StyledInput
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              placeholder="tu@email.com"
            />
          </FormGroup>
          
          <FormGroup>
            <label htmlFor="password">Contraseña</label>
            <StyledInput
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              placeholder="Tu contraseña"
            />
          </FormGroup>
          
          {error && <ErrorMessage>{error}</ErrorMessage>}
          {success && <SuccessMessage>{success}</SuccessMessage>}
          
          <StyledButton 
            type="submit" 
            primary 
            disabled={isLoading}
            style={{ width: '100%' }}
          >
            {isLoading 
              ? (mode === 'login' ? 'Iniciando sesión...' : 'Creando cuenta...') 
              : (mode === 'login' ? 'Iniciar Sesión' : 'Crear Cuenta')
            }
          </StyledButton>
        </LoginForm>
        
        <DemoCredentials>
          <p>
            <strong>{mode === 'login' ? 'Demo Login:' : 'Ejemplo Registro:'}</strong> {' '}
            {mode === 'login' 
              ? 'test@simpletrade.com / password123' 
              : 'nuevo@simpletrade.com / mi_usuario'}<br />
            <small>
              {mode === 'login' 
                ? 'Si no funciona, usa el tab "Registro" para crear una cuenta nueva' 
                : 'Cambia los datos por los tuyos antes de registrarte'}
            </small>
          </p>
        </DemoCredentials>
      </ModalContent>
    </ModalOverlay>
  );
};

export default LoginModal;
