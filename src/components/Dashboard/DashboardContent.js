import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { StyledCard, StyledContainer } from '../common/StyledComponents';
import {
  DashboardContentStyled,
  WelcomeSection,
  DashboardGrid,
  DashboardCard
} from './styled/DashboardStyles';

const LinkCard = styled(Link)`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  text-decoration: none;
  color: inherit;
  display: block;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
  }

  h3 {
    color: #2c3e50;
    margin-bottom: 1rem;
    font-size: 1.5rem;
    font-weight: 500;
    font-family: 'Unbounded', sans-serif;
  }

  p {
    color: #7f8c8d;
    line-height: 1.6;
    font-family: 'Unbounded', sans-serif;
  }
`;

const DashboardContent = () => {
  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <DashboardContentStyled>
      <StyledContainer>
        <WelcomeSection>
          <h2>Bienvenido al Dashboard</h2>
          <p>Aquí podrás gestionar tus trades y analizar tu rendimiento.</p>
        </WelcomeSection>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <DashboardGrid>
            <motion.div variants={cardVariants}>
              <LinkCard to="/trades">
                <h3>📊 Resumen de Trades</h3>
                <p>Visualiza tus estadísticas principales</p>
              </LinkCard>
            </motion.div>
            
            <motion.div variants={cardVariants}>
              <LinkCard to="/trades">
                <h3>📝 Nuevo Trade</h3>
                <p>Registra una nueva operación</p>
              </LinkCard>
            </motion.div>
            
            <motion.div variants={cardVariants}>
              <DashboardCard>
                <h3>📈 Análisis</h3>
                <p>Revisa tu rendimiento</p>
              </DashboardCard>
            </motion.div>
          </DashboardGrid>
        </motion.div>
      </StyledContainer>
    </DashboardContentStyled>
  );
};

export default DashboardContent;