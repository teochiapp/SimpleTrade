import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, PlusCircle, History, PieChart, Search } from 'lucide-react';
import TradeForm from './TradeForm';
import ClosedTradesHistory from './ClosedTradesHistory';
import TradeStats from './TradeStats';
import ActivePositions from './ActivePositions';
import Diversification from './Diversification';
// import TradesDebug from '../Debug/TradesDebug'; // Removido temporalmente
import Logo from '../common/Logo';
import { useStrapiTrades } from '../../hooks/useStrapiTrades';
import { colors, componentColors, getTradingColor, withOpacity } from '../../styles/colors';

const PageContainer = styled.div`
  max-width: 1500px;
  margin: 0 auto;
  padding: 2rem;
`;

const PageHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const PageTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  font-family: 'Unbounded', sans-serif;
  color: ${colors.black};
  margin: 0 0 1rem 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;

const PageSubtitle = styled.p`
  font-size: 1.2rem;
  color: ${colors.gray[600]};
  font-family: 'Unbounded', sans-serif;
  font-weight: 300;
  margin: 0;
`;

const TabContainer = styled.div`
  display: flex;
  margin-bottom: 2rem;
  background: ${colors.gray[50]};
  border-radius: 6px;
  padding: 0.5rem;
`;

const Tab = styled.button`
  flex: 1;
  padding: 1rem;
  border: none;
  background: ${props => props.active ? colors.white : 'transparent'};
  color: ${props => props.active ? colors.black : colors.gray[600]};
  font-size: 1rem;
  font-weight: 500;
  font-family: 'Unbounded', sans-serif;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: ${props => props.active ? '0 2px 8px rgba(0, 0, 0, 0.1)' : 'none'};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &:hover {
    background: ${props => props.active ? colors.white : colors.gray[100]};
  }
`;

const TabContent = styled.div`
  min-height: 400px;
`;

const TradeLogs = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('stats');
  const { trades, openTrades, closedTrades, stats, loading, error, createTrade, deleteTrade, closeTrade, refreshTrades } = useStrapiTrades();

  const handleTradeAdded = async (tradeData) => {
    try {
      await createTrade(tradeData);
      setActiveTab('stats'); // Cambiar a stats después de agregar
    } catch (err) {
      console.error('Error adding trade:', err);
    }
  };

  const handleTradeDeleted = async (tradeId) => {
    try {
      await deleteTrade(tradeId);
    } catch (err) {
      console.error('Error deleting trade:', err);
    }
  };

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleCloseTrade = async (tradeId, exitPrice, result, notes) => {
    try {
      await closeTrade(tradeId, exitPrice, result, notes);
    } catch (err) {
      console.error('Error closing trade:', err);
    }
  };

  return (
    <PageContainer>
      <PageHeader>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <PageTitle>
            <Logo 
              size="80px" 
              fontSize="3.5rem" 
              gap="1.5rem"
              onClick={handleLogoClick}
              style={{ cursor: 'pointer' }}
            />
          </PageTitle>
          <PageSubtitle>
            Tu diario personal de trading - Registra, analiza y mejora tus operaciones
          </PageSubtitle>
        </motion.div>
      </PageHeader>

      <TabContainer>
        <Tab 
          active={activeTab === 'stats' ? 'true' : 'false'} 
          onClick={() => setActiveTab('stats')}
        >
          <TrendingUp size={20} />
          Resumen
        </Tab>
        <Tab 
          active={activeTab === 'portfolio' ? 'true' : 'false'} 
          onClick={() => setActiveTab('portfolio')}
        >
          <PieChart size={20} />
          Portfolio
        </Tab>
        <Tab 
          active={activeTab === 'form' ? 'true' : 'false'} 
          onClick={() => setActiveTab('form')}
        >
          <PlusCircle size={20} />
          Nuevo Trade
        </Tab>
        <Tab 
          active={activeTab === 'list' ? 'true' : 'false'} 
          onClick={() => setActiveTab('list')}
        >
          <History size={20} />
          Historial
        </Tab>
        <Tab 
          active={activeTab === 'diversification' ? 'true' : 'false'} 
          onClick={() => setActiveTab('diversification')}
        >
          <PieChart size={20} />
          Diversificación
        </Tab>
        <Tab 
          active={activeTab === 'screener' ? 'true' : 'false'} 
          onClick={() => setActiveTab('screener')}
        >
          <Search size={20} />
          Screener
        </Tab>
      </TabContainer>

      <TabContent>
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'stats' ? (
            <TradeStats 
              stats={stats} 
              openTrades={openTrades}
              loading={loading}
              error={error}
            />
          ) : activeTab === 'portfolio' ? (
            <ActivePositions
              openTrades={openTrades}
              loading={loading}
              error={error}
              onCloseTrade={handleCloseTrade}
            />
          ) : activeTab === 'form' ? (
            <TradeForm onTradeAdded={handleTradeAdded} />
          ) : activeTab === 'diversification' ? (
            <Diversification 
              openTrades={openTrades}
              loading={loading}
              error={error}
            />
          ) : activeTab === 'screener' ? (
            <div style={{ 
              padding: '3rem', 
              textAlign: 'center', 
              color: '#7f8c8d',
              fontFamily: 'Unbounded, sans-serif'
            }}>
              <Search size={64} color="#7f8c8d" style={{ marginBottom: '1rem' }} />
              <h3 style={{ 
                fontSize: '1.5rem', 
                fontWeight: 600, 
                color: '#2c3e50', 
                margin: '0 0 0.5rem 0' 
              }}>
                Screener de Acciones
              </h3>
              <p style={{ fontSize: '1rem', margin: 0 }}>
                Próximamente: Herramienta para analizar y filtrar acciones
              </p>
            </div>
          ) : (
            <ClosedTradesHistory 
              closedTrades={closedTrades}
              loading={loading}
              error={error}
              onDeleteTrade={deleteTrade}
            />
          )}
        </motion.div>
      </TabContent>
    </PageContainer>
  );
};

export default TradeLogs;
