import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { TrendingUp, PlusCircle, History, PieChart, Bug } from 'lucide-react';
import TradeForm from './TradeForm';
import ClosedTradesHistory from './ClosedTradesHistory';
import TradeStats from './TradeStats';
import Diversification from './Diversification';
import TradesDebug from '../Debug/TradesDebug';
import { useStrapiTrades } from '../../hooks/useStrapiTrades';
import { colors, componentColors, getTradingColor, withOpacity } from '../../styles/colors';

const PageContainer = styled.div`
  max-width: 1200px;
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
  border-radius: 12px;
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
  border-radius: 8px;
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

  const handleCloseTrade = async (tradeId, exitPrice, result) => {
    try {
      await closeTrade(tradeId, exitPrice, result);
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
            <TrendingUp size={40} />
            Diario de Trades
          </PageTitle>
          <PageSubtitle>
            Registra tus trades y analiza tu rendimiento
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
          active={activeTab === 'debug' ? 'true' : 'false'} 
          onClick={() => setActiveTab('debug')}
        >
          <Bug size={20} />
          Debug
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
              loading={loading}
              error={error}
              openTrades={openTrades}
              closedTrades={closedTrades}
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
          ) : activeTab === 'debug' ? (
            <TradesDebug 
              trades={trades}
              openTrades={openTrades}
              closedTrades={closedTrades}
              loading={loading}
              error={error}
              refreshTrades={refreshTrades}
            />
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
