import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { BarChart3, FilePlus2, LineChart } from 'lucide-react';
import { StyledContainer } from '../common/StyledComponents';
import { colors } from '../../styles/colors';
import {
  DashboardContentStyled,
  WelcomeSection,
  DashboardGrid,
  DashboardCard
} from './styled/DashboardStyles';

const LinkCard = styled(Link)`
  background: ${colors.white};
  padding: 2rem;
  border-radius: 12px;
  box-shadow: ${colors.shadows.base};
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  text-decoration: none;
  color: inherit;
  display: block;
  border: 1px solid ${colors.gray[200]};

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${colors.shadows.lg};
    border-color: ${colors.primary};
  }

  .card-icon {
    width: 56px;
    height: 56px;
    margin: 0 auto 1rem;
    border-radius: 16px;
    background: ${colors.gradients.primary};
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: ${colors.shadows.primary};

    svg {
      width: 28px;
      height: 28px;
      color: ${colors.white};
    }
  }

  h3 {
    color: ${colors.black};
    margin-bottom: 1rem;
    font-size: 1.5rem;
    font-weight: 500;
    font-family: 'Unbounded', sans-serif;
  }

  p {
    color: ${colors.gray[600]};
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
              <LinkCard to="/trades?tab=portfolio">
                <div className="card-icon">
                  <BarChart3 />
                </div>
                <h3>Resumen de Trades</h3>
                <p>Visualiza tus estadísticas principales</p>
              </LinkCard>
            </motion.div>
            
            <motion.div variants={cardVariants}>
              <LinkCard to="/trades?tab=form">
                <div className="card-icon">
                  <FilePlus2 />
                </div>
                <h3>Nuevo Trade</h3>
                <p>Registra una nueva operación</p>
              </LinkCard>
            </motion.div>
            
            <motion.div variants={cardVariants}>
              <LinkCard to="/trades?tab=stats">
                <div className="card-icon">
                  <LineChart />
                </div>
                <h3>Análisis</h3>
                <p>Revisa tu rendimiento</p>
              </LinkCard>
            </motion.div>
          </DashboardGrid>
        </motion.div>
      </StyledContainer>
    </DashboardContentStyled>
  );
};

export default DashboardContent;