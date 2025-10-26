import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useStrapiAuth } from '../../hooks/useStrapiTrades';

const AuthContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem;
`;

const AuthCard = styled(motion.div)`
  background: white;
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
`;

const AuthTitle = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  font-family: 'Unbounded', sans-serif;
  color: #2c3e50;
  text-align: center;
  margin: 0 0 2rem 0;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  font-weight: 600;
  font-family: 'Unbounded', sans-serif;
  color: #2c3e50;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #e1e8ed;
  border-radius: 8px;
  font-size: 1rem;
  font-family: 'Unbounded', sans-serif;
  transition: border-color 0.2s ease;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #3498db;
  }

  &::placeholder {
    color: #bdc3c7;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 0.75rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  font-family: 'Unbounded', sans-serif;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
  margin-bottom: 1rem;

  &.primary {
    background: #3498db;
    color: white;

    &:hover {
      background: #2980b9;
    }

    &:disabled {
      background: #bdc3c7;
      cursor: not-allowed;
    }
  }

  &.secondary {
    background: transparent;
    color: #7f8c8d;
    border: 2px solid #e1e8ed;

    &:hover {
      background: #f8f9fa;
    }
  }
`;

const ErrorMessage = styled.div`
  background: #f8d7da;
  color: #721c24;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  font-family: 'Unbounded', sans-serif;
  font-weight: 500;
  font-size: 0.9rem;
`;

const SuccessMessage = styled.div`
  background: #d4edda;
  color: #155724;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  font-family: 'Unbounded', sans-serif;
  font-weight: 500;
  font-size: 0.9rem;
`;

const DevInfo = styled.div`
  background: #e3f2fd;
  color: #1565c0;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  font-family: 'Unbounded', sans-serif;
  font-weight: 500;
  font-size: 0.8rem;
  text-align: center;
`;

const TabContainer = styled.div`
  display: flex;
  margin-bottom: 1.5rem;
  background: #f8f9fa;
  border-radius: 8px;
  padding: 0.25rem;
`;

const Tab = styled.button`
  flex: 1;
  padding: 0.5rem;
  border: none;
  background: ${props => props.$active ? 'white' : 'transparent'};
  color: ${props => props.$active ? '#2c3e50' : '#7f8c8d'};
  font-size: 0.9rem;
  font-weight: 500;
  font-family: 'Unbounded', sans-serif;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${props => props.$active ? 'white' : '#e9ecef'};
  }
`;

const DevAuth = () => {
  const [mode, setMode] = useState('login');
  const [formData, setFormData] = useState({
    email: 'test@simpletrade.com',
    password: 'password123',
    username: 'testuser'
  });
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const { login, register, loading } = useStrapiAuth();

  const handleInputChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setMessageType('');

    try {
      let result;
      
      if (mode === 'login') {
        result = await login(formData.email, formData.password);
      } else {
        result = await register(formData.email, formData.password, formData.username);
      }

      if (result.success) {
        console.log('🎉 DevAuth - Login exitoso, usuario:', result.user);
        setMessage('¡Autenticación exitosa! Redirigiendo...');
        setMessageType('success');
        
        // El estado se actualiza automáticamente a través del hook useStrapiAuth
        // No necesitamos callback manual porque ProtectedRoute está suscrito al hook
        console.log('✅ DevAuth - Estado actualizado, ProtectedRoute debería detectar el cambio');
      } else {
        console.error('❌ DevAuth - Login falló:', result.error);
        setMessage(result.error);
        setMessageType('error');
      }
    } catch (error) {
      setMessage('Error de conexión. Asegúrate de que el backend esté funcionando.');
      setMessageType('error');
    }
  };

  return (
    <AuthContainer>
      <AuthCard
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <AuthTitle>🔐 SimpleTrade</AuthTitle>
        
        <DevInfo>
          💡 Modo Desarrollo: Usa las credenciales por defecto o regístrate
        </DevInfo>

        <TabContainer>
          <Tab 
            $active={mode === 'login'} 
            onClick={() => setMode('login')}
          >
            Iniciar Sesión
          </Tab>
          <Tab 
            $active={mode === 'register'} 
            onClick={() => setMode('register')}
          >
            Registro
          </Tab>
        </TabContainer>

        {message && (
          messageType === 'success' ? 
            <SuccessMessage>{message}</SuccessMessage> : 
            <ErrorMessage>{message}</ErrorMessage>
        )}

        <form onSubmit={handleSubmit}>
          {mode === 'register' && (
            <FormGroup>
              <Label htmlFor="username">Usuario</Label>
              <Input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                placeholder="Tu nombre de usuario"
                required={mode === 'register'}
              />
            </FormGroup>
          )}

          <FormGroup>
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="tu@email.com"
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="password">Contraseña</Label>
            <Input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Tu contraseña"
              required
            />
          </FormGroup>

          <Button 
            type="submit" 
            className="primary" 
            disabled={loading}
          >
            {loading ? 'Cargando...' : (mode === 'login' ? 'Iniciar Sesión' : 'Registrarse')}
          </Button>
        </form>
      </AuthCard>
    </AuthContainer>
  );
};

export default DevAuth;
