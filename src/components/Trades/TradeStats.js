// components/Trades/TradeStats.js - Componente para mostrar estadísticas de trades con pestañas
import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { BarChart3, TrendingUp } from 'lucide-react';
import ActivePositions from './ActivePositions';

const StatsContainer = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  margin-bottom: 2rem;
`;

const StatsTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 600;
  font-family: 'Unbounded', sans-serif;
  color: #2c3e50;
  margin: 0 0 1.5rem 0;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TabsContainer = styled.div`
  display: flex;
  margin-bottom: 2rem;
  background: #f8f9fa;
  border-radius: 12px;
  padding: 0.5rem;
  gap: 0.5rem;
`;

const TabButton = styled(motion.button)`
  flex: 1;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border: none;
  background: ${props => props.active ? 'white' : 'transparent'};
  color: ${props => props.active ? '#2c3e50' : '#7f8c8d'};
  font-size: 1rem;
  font-weight: 600;
  font-family: 'Unbounded', sans-serif;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: ${props => props.active ? '0 2px 8px rgba(0, 0, 0, 0.1)' : 'none'};

  &:hover {
    background: ${props => props.active ? 'white' : '#e9ecef'};
  }
`;

const TabContent = styled.div`
  min-height: 400px;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const StatCard = styled(motion.div)`
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  padding: 1.5rem;
  border-radius: 12px;
  text-align: center;
  border: 1px solid #e1e8ed;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  }
`;

const StatIcon = styled.div`
  font-size: 2rem;
  margin-bottom: 0.5rem;
`;

const StatValue = styled.div`
  font-size: 2rem;
  font-weight: 700;
  font-family: 'Unbounded', sans-serif;
  color: ${props => {
    if (props.$isPositive) return '#27ae60';
    if (props.$isNegative) return '#e74c3c';
    return '#2c3e50';
  }};
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  font-size: 0.9rem;
  font-weight: 500;
  font-family: 'Unbounded', sans-serif;
  color: #7f8c8d;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  color: #7f8c8d;
  font-family: 'Unbounded', sans-serif;
`;

const EmptyIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 1rem;
`;

const EmptyTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: #2c3e50;
  margin: 0 0 0.5rem 0;
`;

const EmptyText = styled.p`
  font-size: 1rem;
  margin: 0;
`;

const TradeStats = ({ stats, loading, error, openTrades, closedTrades, onCloseTrade }) => {
  const [activeTab, setActiveTab] = useState('overview');

  // Funciones de formateo de números
  const formatNumber = (num) => {
    if (num == null || isNaN(num)) return '0.00';
    return Number(num).toFixed(2);
  };

  const formatPercentage = (num) => {
    if (num == null || isNaN(num)) return '0.00';
    return Number(num).toFixed(2);
  };

  const formatCurrency = (amount) => {
    if (amount == null || isNaN(amount)) return '$0.00';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  if (loading) {
    return (
      <StatsContainer>
        <StatsTitle>📊 Estadísticas de Trading</StatsTitle>
        <EmptyState>
          <EmptyIcon>⏳</EmptyIcon>
          <EmptyTitle>Cargando estadísticas...</EmptyTitle>
          <EmptyText>Por favor espera mientras cargamos tus datos</EmptyText>
        </EmptyState>
      </StatsContainer>
    );
  }

  if (error) {
    return (
      <StatsContainer>
        <StatsTitle>📊 Estadísticas de Trading</StatsTitle>
        <EmptyState>
          <EmptyIcon>❌</EmptyIcon>
          <EmptyTitle>Error al cargar estadísticas</EmptyTitle>
          <EmptyText>{error}</EmptyText>
        </EmptyState>
      </StatsContainer>
    );
  }

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
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
    <StatsContainer>
      <StatsTitle>
        <BarChart3 size={24} style={{ marginRight: '0.5rem' }} />
        Estadísticas de Trading
      </StatsTitle>
      
      <TabsContainer>
        <TabButton
          active={activeTab === 'overview' ? 'true' : 'false'}
          onClick={() => setActiveTab('overview')}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <BarChart3 size={18} />
          Resumen General
        </TabButton>
        <TabButton
          active={activeTab === 'active' ? 'true' : 'false'}
          onClick={() => setActiveTab('active')}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <TrendingUp size={18} />
          Posiciones Activas
        </TabButton>
      </TabsContainer>

      <TabContent>
        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {stats && stats.totalTrades > 0 ? (
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <StatsGrid>
                    <StatCard variants={cardVariants}>
                      <StatIcon>📊</StatIcon>
                      <StatValue>{stats.totalTrades}</StatValue>
                      <StatLabel>Total Trades</StatLabel>
                    </StatCard>

                    <StatCard variants={cardVariants}>
                      <StatIcon>✅</StatIcon>
                      <StatValue>{stats.winningTrades}</StatValue>
                      <StatLabel>Trades Ganadores</StatLabel>
                    </StatCard>

                    <StatCard variants={cardVariants}>
                      <StatIcon>❌</StatIcon>
                      <StatValue>{stats.losingTrades}</StatValue>
                      <StatLabel>Trades Perdedores</StatLabel>
                    </StatCard>

                    <StatCard variants={cardVariants}>
                      <StatIcon>🎯</StatIcon>
                      <StatValue $isPositive={stats.winRate > 50}>
                        {formatPercentage(stats.winRate)}%
                      </StatValue>
                      <StatLabel>Win Rate</StatLabel>
                    </StatCard>

                    <StatCard variants={cardVariants}>
                      <StatIcon>💰</StatIcon>
                      <StatValue 
                        $isPositive={stats.totalProfit > 0} 
                        $isNegative={stats.totalProfit < 0}
                      >
                        {formatPercentage(stats.totalProfit)}%
                      </StatValue>
                      <StatLabel>Profit Total</StatLabel>
                    </StatCard>

                    <StatCard variants={cardVariants}>
                      <StatIcon>📈</StatIcon>
                      <StatValue $isPositive={stats.profitFactor > 1}>
                        {formatNumber(stats.profitFactor)}
                      </StatValue>
                      <StatLabel>Profit Factor</StatLabel>
                    </StatCard>

                    <StatCard variants={cardVariants}>
                      <StatIcon>📊</StatIcon>
                      <StatValue $isPositive={stats.averageWin > 0}>
                        {formatPercentage(stats.averageWin)}%
                      </StatValue>
                      <StatLabel>Promedio Ganancia</StatLabel>
                    </StatCard>

                    <StatCard variants={cardVariants}>
                      <StatIcon>📉</StatIcon>
                      <StatValue $isNegative={true}>
                        {formatPercentage(stats.averageLoss)}%
                      </StatValue>
                      <StatLabel>Promedio Pérdida</StatLabel>
                    </StatCard>
                  </StatsGrid>
                </motion.div>
              ) : (
                <EmptyState>
                  <EmptyIcon>📈</EmptyIcon>
                  <EmptyTitle>¡Comienza tu trading!</EmptyTitle>
                  <EmptyText>Registra tu primer trade para ver estadísticas</EmptyText>
                </EmptyState>
              )}
            </motion.div>
          )}

          {activeTab === 'active' && (
            <motion.div
              key="active"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <ActivePositions 
                openTrades={openTrades}
                loading={loading}
                error={error}
                onCloseTrade={onCloseTrade}
              />
            </motion.div>
          )}

        </AnimatePresence>
      </TabContent>
    </StatsContainer>
  );
};

export default TradeStats;
