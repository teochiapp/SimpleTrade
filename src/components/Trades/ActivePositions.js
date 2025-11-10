// components/Trades/ActivePositions.js - Componente para posiciones activas
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { AlertTriangle, TrendingUp, Hand, Target, Building2, ArrowUpCircle, ArrowDownCircle, Edit2 } from 'lucide-react';
import CloseTradeModal from './CloseTradeModal';
import EditTradeModal from './EditTradeModal';
import { useRealTimePrices } from '../../hooks/useRealTimePrices';
import companyLogoService from '../../services/companyLogoService';
import { getStrategyDisplayName } from './TradeForm';
import { colors, componentColors, getTradingColor, withOpacity } from '../../styles/colors';

const PositionsContainer = styled.div`
  background: ${colors.white};
  border-radius: 12px;
  box-shadow: ${colors.shadows.lg};
  overflow: hidden;
  border: 1px solid ${colors.gray[200]};
`;

const PositionsHeader = styled.div`
  background: ${colors.gradients.primary};
  color: ${colors.white};
  padding: 1.5rem;
  text-align: center;
`;

const PositionsTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  font-family: 'Unbounded', sans-serif;
  margin: 0 0 0.5rem 0;
  color: ${colors.white};
`;

const PositionsSubtitle = styled.p`
  font-size: 1rem;
  font-family: 'Unbounded', sans-serif;
  margin: 0;
  opacity: 0.9;
  color: ${colors.white};
`;

const PositionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  padding: 1.5rem;
`;

const PositionCard = styled(motion.div)`
  background: ${colors.white};
  border: 2px solid ${colors.gray[200]};
  border-radius: 12px;
  padding: 1.5rem;
  transition: all 0.3s ease;
  position: relative;

  &:hover {
    border-color: ${colors.primary};
    transform: translateY(-2px);
    box-shadow: ${colors.shadows.primary};
  }
`;

const PositionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding: 0.5rem;
  background: ${withOpacity(colors.primary, 0.05)};
  border-radius: 8px;
  border: 1px solid ${withOpacity(colors.primary, 0.1)};
`;

const CompanyLogo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background: ${colors.white};
  border: 2px solid ${colors.gray[200]};
  overflow: hidden;
  flex-shrink: 0;
`;

const LogoImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  background: ${colors.white};
`;

const LogoFallback = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${colors.gray[500]};
  background: ${colors.gray[50]};
`;

const SymbolName = styled.div`
  font-size: 1.4rem;
  font-weight: 700;
  font-family: 'Unbounded', sans-serif;
  color: ${colors.black};
  text-align: center;
  flex: 1;
`;

const TradeTypeContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const TradeType = styled.div`
  background: ${props => props.type === 'buy' ? colors.trading.long : colors.trading.short};
  color: ${colors.white};
  padding: 0.5rem 1rem;
  border-radius: 25px;
  font-size: 0.9rem;
  font-weight: 600;
  font-family: 'Unbounded', sans-serif;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  box-shadow: ${colors.shadows.md};
`;

const CloseButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1.5rem;
  padding-top: 1rem;
  border-top: 1px solid ${colors.gray[200]};
`;

const CloseButton = styled.button`
  padding: 0.75rem 2rem;
  border: none;
  border-radius: 25px;
  font-size: 1rem;
  font-weight: 600;
  font-family: 'Unbounded', sans-serif;
  cursor: pointer;
  transition: all 0.3s ease;
  background: ${colors.gradients.danger};
  color: ${colors.white};
  box-shadow: ${colors.shadows.lg};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(239, 68, 68, 0.4);
    background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
  }

  &:active {
    transform: translateY(0);
  }
`;

const PositionDetails = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
  margin-bottom: 1rem;
`;

const DetailItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const DetailLabel = styled.span`
  font-size: 0.8rem;
  color: ${colors.gray[600]};
  font-family: 'Unbounded', sans-serif;
  font-weight: 500;
`;

const DetailValue = styled.span`
  font-size: 1rem;
  font-weight: 600;
  font-family: 'Unbounded', sans-serif;
  color: ${colors.black};
`;

const PositionFooter = styled.div`
  border-top: 1px solid ${colors.gray[200]};
  padding-top: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const PortfolioPercentage = styled.div`
  font-size: 0.9rem;
  color: ${colors.gray[600]};
  font-family: 'Unbounded', sans-serif;
`;

const DaysOpen = styled.div`
  font-size: 0.9rem;
  color: ${colors.gray[600]};
  font-family: 'Unbounded', sans-serif;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  color: ${colors.gray[600]};
  font-family: 'Unbounded', sans-serif;
`;

const EmptyIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 1rem;
`;

const EmptyTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${colors.black};
  margin: 0 0 0.5rem 0;
`;

const EmptyText = styled.p`
  font-size: 1rem;
  margin: 0;
`;

const PriceUpdateHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1.5rem;
  background: ${colors.gray[50]};
  border-bottom: 1px solid ${colors.gray[200]};
  font-size: 0.8rem;
  color: ${colors.gray[600]};
  font-family: 'Unbounded', sans-serif;
`;

const RefreshButton = styled.button`
  background: ${colors.secondary};
  color: ${colors.white};
  border: none;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.7rem;
  cursor: pointer;
  font-family: 'Unbounded', sans-serif;
  transition: background 0.2s ease;

  &:hover {
    background: ${colors.primaryDark};
  }

  &:disabled {
    background: ${colors.gray[400]};
    cursor: not-allowed;
  }
`;

const CurrentPrice = styled.div`
  font-weight: 600;
  color: ${colors.black};
`;

const UnrealizedPnL = styled.div`
  font-weight: 700;
  color: ${props => {
    if (props.$pnl > 0) return '#27ae60';
    if (props.$pnl < 0) return '#e74c3c';
    return '#7f8c8d';
  }};
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const PnLIcon = styled.span`
  font-size: 0.8rem;
`;

const RecommendationContainer = styled.div`
  margin-top: 1rem;
  padding: 0.75rem;
  border-radius: 8px;
  border: 2px solid ${props => props.$borderColor};
  background: ${props => props.$bgColor};
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const RecommendationText = styled.span`
  font-family: 'Unbounded', sans-serif;
  font-weight: 600;
  font-size: 0.9rem;
  color: ${props => props.$color};
`;

const RecommendationLabel = styled.div`
  font-family: 'Unbounded', sans-serif;
  font-size: 0.75rem;
  color: ${colors.gray[600]};
  font-weight: 500;
  margin-bottom: 0.25rem;
  display: flex;
  align-items: center;
`;

const ActivePositions = ({ openTrades, loading, error, onCloseTrade, onUpdateTrade }) => {
  const [selectedTrade, setSelectedTrade] = useState(null);
  const [showCloseModal, setShowCloseModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [companyLogos, setCompanyLogos] = useState(new Map());
  
  // Hook para precios en tiempo real
  const { 
    prices, 
    loading: pricesLoading, 
    error: pricesError, 
    lastUpdate, 
    getPrice, 
    getUnrealizedPnL, 
    refreshPrices 
  } = useRealTimePrices(openTrades || []);

  // Cargar logos de empresas
  useEffect(() => {
    const loadLogos = async () => {
      if (!openTrades || openTrades.length === 0) return;

      const newLogos = new Map();
      
      for (const trade of openTrades) {
        const symbol = getTradeAttr(trade, 'symbol');
        if (symbol && !companyLogos.has(symbol)) {
          try {
            const logoUrl = await companyLogoService.getCompanyLogo(symbol);
            newLogos.set(symbol, logoUrl);
          } catch (error) {
            console.warn(`Error cargando logo para ${symbol}:`, error);
            newLogos.set(symbol, null);
          }
        }
      }

      if (newLogos.size > 0) {
        setCompanyLogos(prev => new Map([...prev, ...newLogos]));
      }
    };

    loadLogos();
  }, [openTrades]);

  // Función para adaptar estructura de Strapi
  const getTradeAttr = (trade, attr) => {
    if (!trade) return null;
    return trade.attributes ? trade.attributes[attr] : trade[attr];
  };

  // Función para generar recomendación basada en precios
  const getRecommendation = (trade) => {
    const currentPrice = getPrice(getTradeAttr(trade, 'symbol'));
    const stopLoss = parseFloat(getTradeAttr(trade, 'stop_loss'));
    const takeProfit = parseFloat(getTradeAttr(trade, 'take_profit'));
    
    // Si no hay precio actual o niveles, no mostrar recomendación
    if (!currentPrice) {
      return null;
    }

    // Si no hay stop loss ni take profit configurados
    if (!stopLoss && !takeProfit) {
      return null;
    }

    // Lógica de recomendaciones
    if (stopLoss && currentPrice < stopLoss) {
      return {
        text: 'Efectuar Stop Loss',
        icon: <AlertTriangle size={16} />,
        color: '#e74c3c',
        bgColor: '#ffeaea',
        borderColor: '#e74c3c'
      };
    }
    
    if (takeProfit && currentPrice >= takeProfit) {
      return {
        text: 'Tomar Ganancias',
        icon: <TrendingUp size={16} />,
        color: '#27ae60',
        bgColor: '#eafaf1',
        borderColor: '#27ae60'
      };
    }
    
    // Si está entre stop loss y take profit (o solo hay uno configurado)
    if ((stopLoss && takeProfit && currentPrice >= stopLoss && currentPrice < takeProfit) ||
        (stopLoss && !takeProfit && currentPrice >= stopLoss) ||
        (!stopLoss && takeProfit && currentPrice < takeProfit)) {
      return {
        text: 'Holdear',
        icon: <Hand size={16} />,
        color: '#f39c12',
        bgColor: '#fef9e7',
        borderColor: '#f39c12'
      };
    }

    return null;
  };

  const handleCloseTrade = (trade) => {
    setSelectedTrade(trade);
    setShowCloseModal(true);
  };

  const handleEditTrade = (trade) => {
    setSelectedTrade(trade);
    setShowEditModal(true);
  };

  const handleCloseModal = () => {
    setShowCloseModal(false);
    setSelectedTrade(null);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setSelectedTrade(null);
  };

  const handleTradeClosed = async (tradeId, exitPrice, result, notes) => {
    try {
      await onCloseTrade(tradeId, exitPrice, result, notes);
      handleCloseModal();
    } catch (err) {
      console.error('Error closing trade:', err);
      // Propagar el error para que el modal lo pueda mostrar
      throw err;
    }
  };

  const handleTradeUpdated = async (tradeId, updateData) => {
    try {
      await onUpdateTrade(tradeId, updateData);
      handleCloseEditModal();
    } catch (err) {
      console.error('Error updating trade:', err);
      throw err;
    }
  };

  const calculateDaysOpen = (createdAt) => {
    const now = new Date();
    const created = new Date(createdAt);
    const diffTime = Math.abs(now - created);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  if (loading) {
    return (
      <PositionsContainer>
        <PositionsHeader>
          <PositionsTitle>📈 Posiciones Activas</PositionsTitle>
          <PositionsSubtitle>Cargando posiciones...</PositionsSubtitle>
        </PositionsHeader>
        <EmptyState>
          <EmptyIcon>⏳</EmptyIcon>
          <EmptyTitle>Cargando...</EmptyTitle>
          <EmptyText>Por favor espera mientras cargamos tus posiciones</EmptyText>
        </EmptyState>
      </PositionsContainer>
    );
  }

  if (error) {
    return (
      <PositionsContainer>
        <PositionsHeader>
          <PositionsTitle>📈 Posiciones Activas</PositionsTitle>
          <PositionsSubtitle>Error al cargar</PositionsSubtitle>
        </PositionsHeader>
        <EmptyState>
          <EmptyIcon>❌</EmptyIcon>
          <EmptyTitle>Error</EmptyTitle>
          <EmptyText>{error}</EmptyText>
        </EmptyState>
      </PositionsContainer>
    );
  }

  if (openTrades.length === 0) {
    return (
      <PositionsContainer>
        <PositionsHeader>
          <PositionsTitle>📈 Posiciones Activas</PositionsTitle>
          <PositionsSubtitle>No hay posiciones abiertas</PositionsSubtitle>
        </PositionsHeader>
        <EmptyState>
          <EmptyIcon>📊</EmptyIcon>
          <EmptyTitle>Sin posiciones activas</EmptyTitle>
          <EmptyText>Registra un nuevo trade para verlo aquí</EmptyText>
        </EmptyState>
      </PositionsContainer>
    );
  }

  return (
    <>
      <PositionsContainer>
        <PositionsHeader>
          <PositionsTitle>📈 Posiciones Activas</PositionsTitle>
          <PositionsSubtitle>{openTrades.length} posición(es) abierta(s)</PositionsSubtitle>
        </PositionsHeader>

        <PriceUpdateHeader>
          <div>
            {lastUpdate ? (
              <>
                📅 Última actualización: {lastUpdate.toLocaleDateString()} {lastUpdate.toLocaleTimeString()} 
                <span style={{color: colors.gray[500], fontSize: '0.7rem', marginLeft: '0.5rem'}}>
                  (Actualización diaria automática)
                </span>
              </>
            ) : (
              <>Obteniendo precios...</>
            )}
            {pricesError && (
              <span style={{color: colors.status.error, marginLeft: '0.5rem'}}>
                ⚠️ Error: {pricesError}
              </span>
            )}
          </div>
          <RefreshButton 
            onClick={refreshPrices} 
            disabled={pricesLoading}
          >
            {pricesLoading ? '⏳' : '🔄'} Actualizar Manual
          </RefreshButton>
        </PriceUpdateHeader>
        
        <PositionsGrid>
          {openTrades.map((trade, index) => (
            <PositionCard
              key={trade.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <PositionHeader>
                {/* Logo de la empresa */}
                <CompanyLogo>
                  {companyLogos.get(getTradeAttr(trade, 'symbol')) ? (
                    <LogoImage 
                      src={companyLogos.get(getTradeAttr(trade, 'symbol'))} 
                      alt={`${getTradeAttr(trade, 'symbol')} logo`}
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                  ) : null}
                  <LogoFallback style={{ display: companyLogos.get(getTradeAttr(trade, 'symbol')) ? 'none' : 'flex' }}>
                    <Building2 size={20} />
                  </LogoFallback>
                </CompanyLogo>

                {/* Nombre del símbolo */}
                <SymbolName>{getTradeAttr(trade, 'symbol')}</SymbolName>

                {/* Tipo de trade con icono */}
                <TradeTypeContainer>
                  <TradeType type={getTradeAttr(trade, 'type')}>
                    {getTradeAttr(trade, 'type') === 'buy' ? (
                      <>
                        <ArrowUpCircle size={16} />
                        LONG
                      </>
                    ) : (
                      <>
                        <ArrowDownCircle size={16} />
                        SHORT
                      </>
                    )}
                  </TradeType>
                </TradeTypeContainer>
              </PositionHeader>

              <PositionDetails>
                <DetailItem>
                  <DetailLabel>Precio Entrada</DetailLabel>
                  <DetailValue>{formatCurrency(getTradeAttr(trade, 'entry_price'))}</DetailValue>
                </DetailItem>
                <DetailItem>
                  <DetailLabel>Precio Actual</DetailLabel>
                  <CurrentPrice>
                    {(() => {
                      const currentPrice = getPrice(getTradeAttr(trade, 'symbol'));
                      if (currentPrice === null) return <span style={{ color: '#95a5a6', fontSize: '0.9rem' }}>No disponible</span>;
                      return currentPrice ? formatCurrency(currentPrice) : 'Cargando...';
                    })()}
                  </CurrentPrice>
                </DetailItem>
                <DetailItem>
                  <DetailLabel>PnL No Realizado</DetailLabel>
                  {(() => {
                    const pnl = getUnrealizedPnL(trade);
                    return (
                      <UnrealizedPnL $pnl={pnl}>
                        <PnLIcon>
                          {pnl > 0 ? '📈' : pnl < 0 ? '📉' : '➖'}
                        </PnLIcon>
                        {pnl !== null && pnl !== 0 ? `${pnl > 0 ? '+' : ''}${pnl.toFixed(2)}%` : <span style={{ color: '#95a5a6', fontSize: '0.9rem' }}>No disponible</span>}
                      </UnrealizedPnL>
                    );
                  })()}
                </DetailItem>
                <DetailItem>
                  <DetailLabel>Stop Loss</DetailLabel>
                  <DetailValue>
                    {getTradeAttr(trade, 'stop_loss') ? formatCurrency(getTradeAttr(trade, 'stop_loss')) : 'N/A'}
                  </DetailValue>
                </DetailItem>
                <DetailItem>
                  <DetailLabel>Take Profit</DetailLabel>
                  <DetailValue>
                    {getTradeAttr(trade, 'take_profit') ? formatCurrency(getTradeAttr(trade, 'take_profit')) : 'N/A'}
                  </DetailValue>
                </DetailItem>
                <DetailItem>
                  <DetailLabel>Estrategia</DetailLabel>
                  <DetailValue>
                    {getStrategyDisplayName(getTradeAttr(trade, 'strategy'))}
                  </DetailValue>
                </DetailItem>
              </PositionDetails>

              {/* Recomendación inteligente */}
              {(() => {
                const recommendation = getRecommendation(trade);
                return recommendation ? (
                  <>
                    <RecommendationLabel>
                      <Target size={14} style={{marginRight: '0.25rem'}} />
                      Recomendación
                    </RecommendationLabel>
                    <RecommendationContainer
                      $bgColor={recommendation.bgColor}
                      $borderColor={recommendation.borderColor}
                    >
                      {recommendation.icon}
                      <RecommendationText $color={recommendation.color}>
                        {recommendation.text}
                      </RecommendationText>
                    </RecommendationContainer>
                  </>
                ) : null;
              })()}

              <PositionFooter>
                <PortfolioPercentage>
                  {getTradeAttr(trade, 'portfolio_percentage') ? `${getTradeAttr(trade, 'portfolio_percentage')}% cartera` : 'Sin % cartera'}
                </PortfolioPercentage>
                <DaysOpen>
                  {calculateDaysOpen(getTradeAttr(trade, 'createdAt'))} días
                </DaysOpen>
              </PositionFooter>

              {/* Botones de acción */}
              <CloseButtonContainer>
                <CloseButton 
                  onClick={() => handleEditTrade(trade)}
                  style={{ 
                    background: 'transparent', 
                    color: colors.primary, 
                    border: `2px solid ${colors.primary}`,
                    marginRight: '0.5rem'
                  }}
                >
                  <Edit2 size={16} style={{ marginRight: '0.25rem' }} />
                  Editar
                </CloseButton>
                <CloseButton onClick={() => handleCloseTrade(trade)}>
                  Cerrar Posición
                </CloseButton>
              </CloseButtonContainer>
            </PositionCard>
          ))}
        </PositionsGrid>
      </PositionsContainer>

      {/* Modal para cerrar trade */}
      {showCloseModal && (
        <CloseTradeModal
          isOpen={showCloseModal}
          onClose={handleCloseModal}
          trade={selectedTrade}
          onTradeClosed={handleTradeClosed}
        />
      )}

      {/* Modal para editar trade */}
      {showEditModal && (
        <EditTradeModal
          isOpen={showEditModal}
          onClose={handleCloseEditModal}
          trade={selectedTrade}
          onTradeUpdated={handleTradeUpdated}
        />
      )}
    </>
  );
};

export default ActivePositions;
