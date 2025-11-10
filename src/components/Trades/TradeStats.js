import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  CheckSquare, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Target, 
  Activity, 
  TrendingUp, 
  TrendingDown,
  LineChart,
  Building2,
  Globe,
  Layers
} from 'lucide-react';
import { colors } from '../../styles/colors';
import { getSymbolData } from '../../config/marketData';
import priceService from '../../services/priceService';
import marketBenchmarksService from '../../services/marketBenchmarksService';

const StatsContainer = styled.div`
  background: ${colors.white};
  border-radius: 16px;
  box-shadow: ${colors.shadows.lg};
  overflow: hidden;
  border: 1px solid ${colors.gray[200]};
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, ${colors.primary}, ${colors.secondary});
  }
`;

const TabsContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  padding: 2rem 2rem 0 2rem;
  border-bottom: 2px solid ${colors.gray[200]};
`;

const Tab = styled.button`
  padding: 0.75rem 1.5rem;
  border: none;
  background: ${props => props.$active ? colors.primary : 'transparent'};
  color: ${props => props.$active ? colors.white : colors.gray[600]};
  font-size: 1rem;
  font-weight: 600;
  font-family: 'Unbounded', sans-serif;
  border-radius: 8px 8px 0 0;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  
  &:hover {
    background: ${props => props.$active ? colors.primary : colors.gray[100]};
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    right: 0;
    height: 2px;
    background: ${props => props.$active ? colors.primary : 'transparent'};
  }
`;

const StatsTitle = styled.h2`
  font-size: 1.75rem;
  font-weight: 700;
  font-family: 'Unbounded', sans-serif;
  color: ${colors.black};
  margin: 0 0 2rem 0;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 2rem 2rem 0 2rem;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.25rem;
  padding: 0 2rem 2rem 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const StatCard = styled(motion.div)`
  background: ${colors.white};
  padding: 1.5rem;
  border-radius: 12px;
  border: 1px solid ${colors.gray[200]};
  box-shadow: ${colors.shadows.sm};
  display: flex;
  align-items: center;
  gap: 1.25rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  min-height: 100px;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 3px;
    background: ${colors.gray[200]};
    transition: all 0.3s ease;
  }
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: ${colors.shadows.lg};
    border-color: ${colors.primary};
    
    &::before {
      background: ${colors.primary};
    }
  }
`;

const StatIcon = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 12px;
  background: rgba(${props => {
    const color = props.color;
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);
    return `${r}, ${g}, ${b}`;
  }}, 0.1);
  color: ${props => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  
  svg {
    width: 36px;
    height: 36px;
  }
`;

const StatContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  flex: 1;
  min-width: 0;
`;

const StatValue = styled.div`
  font-size: 1.45rem;
  font-weight: 700;
  font-family: 'Unbounded', sans-serif;
  color: ${props => {
    if (props.$isPositive) return colors.trading.profit;
    if (props.$isWarning) return colors.status.warning;
    if (props.$isNegative) return colors.trading.loss;
    return colors.black;
  }};
  line-height: 1.2;
`;

const StatLabel = styled.div`
  font-size: 0.8rem;
  font-family: 'Unbounded', sans-serif;
  font-weight: 500;
  color: ${colors.gray[600]};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  line-height: 1.3;
`;

const StatTrend = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  margin-top: 0.25rem;
  font-size: 0.7rem;
  font-weight: 600;
  color: ${props => {
    if (props.$isPositive) return colors.trading.profit;
    if (props.$isNegative) return colors.trading.loss;
    return colors.gray[500];
  }};
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem 2rem;
  color: ${colors.gray[600]};
  font-family: 'Unbounded', sans-serif;
`;

const EmptyIcon = styled.div`
  font-size: 3rem;
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

const TradeStats = ({ stats, openTrades, loading, error }) => {
  const [activeTab, setActiveTab] = useState('swing'); // 'swing' o 'day'
  const [spyData, setSpyData] = useState({
    ytdPerformance: null,
    loading: true,
    error: null
  });

  // Función para obtener rendimiento YTD del SPY dinámicamente
  const fetchSPYYTDPerformance = async () => {
    try {
      setSpyData({ ytdPerformance: null, loading: true, error: null });

      const ytdPerformance = await marketBenchmarksService.getSPYYTDPerformance();

      setSpyData({
        ytdPerformance,
        loading: false,
        error: null
      });
    } catch (error) {
      console.error('❌ Error calculando SPY YTD performance:', error);

      setSpyData({
        ytdPerformance: null,
        loading: false,
        error: 'No disponible'
      });
    }
  };

  // Cargar datos del SPY al montar el componente
  useEffect(() => {
    fetchSPYYTDPerformance();
  }, []);

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

  // Calcular rendimiento promedio (SOLO de trades cerrados)
  const calculateAverageReturn = (stats) => {
    if (!stats || stats.closedTrades === 0) return 0;
    
    // Solo usar trades cerrados para el cálculo
    const totalWinAmount = stats.averageWin * stats.winningTrades;
    const totalLossAmount = Math.abs(stats.averageLoss) * stats.losingTrades;
    const netReturn = totalWinAmount - totalLossAmount;
    
    // Dividir por trades cerrados, no por total de trades
    return netReturn / stats.closedTrades;
  };

  // Helper para obtener atributos de trade (compatible con Strapi)
  const getTradeAttr = (trade, attr) => {
    return trade.attributes ? trade.attributes[attr] : trade[attr];
  };

  // Filtrar trades por estrategia
  const filterTradesByStrategy = (trades, strategy) => {
    if (!trades) return [];
    return trades.filter(trade => {
      const tradeStrategy = getTradeAttr(trade, 'strategy');
      return tradeStrategy === strategy;
    });
  };

  // Obtener trades filtrados según tab activa
  const getFilteredTrades = () => {
    if (activeTab === 'swing') {
      return filterTradesByStrategy(openTrades, 'swing_trading');
    } else {
      return filterTradesByStrategy(openTrades, 'day_trading');
    }
  };

  const filteredOpenTrades = getFilteredTrades();

  // Calcular estadísticas filtradas por estrategia
  // Nota: stats viene del hook y contiene TODOS los trades
  // Aquí mostramos las stats globales pero filtramos solo las métricas de diversificación
  // Si quisieras filtrar también las stats, necesitarías recalcularlas aquí
  // Por ahora, las stats generales muestran todos los trades independientemente de la tab

  // MÉTRICAS DE DIVERSIFICACIÓN

  // 1. Diversificación por Empresa
  const calculateCompanyDiversification = (openTrades) => {
    if (!openTrades || openTrades.length === 0) return { show: false };
    
    // Filtrar trades que NO sean ETFs o índices (excluir sector 'ETF')
    const nonEtfTrades = openTrades.filter(trade => {
      const symbol = getTradeAttr(trade, 'symbol');
      const symbolData = getSymbolData(symbol);
      return symbolData.sector !== 'ETF';
    });
    
    // Si no hay trades que no sean ETFs, no mostrar la métrica
    if (nonEtfTrades.length === 0) return { show: false };
    
    // Calcular valor total de posiciones abiertas (solo no-ETFs)
    const totalValue = nonEtfTrades.reduce((sum, trade) => {
      const percentage = getTradeAttr(trade, 'portfolio_percentage') || 0;
      return sum + percentage;
    }, 0);
    
    // Solo evaluar si liquidez < 50% (es decir, posiciones > 50%) - REDUCIDO PARA TESTING
    if (totalValue < 20) return { show: false };
    
    // Agrupar por empresa (símbolo) - solo no-ETFs
    const companiesMap = new Map();
    nonEtfTrades.forEach(trade => {
      const symbol = getTradeAttr(trade, 'symbol');
      const percentage = getTradeAttr(trade, 'portfolio_percentage') || 0;
      
      if (companiesMap.has(symbol)) {
        companiesMap.set(symbol, companiesMap.get(symbol) + percentage);
      } else {
        companiesMap.set(symbol, percentage);
      }
    });
    
    // Verificar que ninguna empresa supere el 20%
    const maxCompanyPercentage = Math.max(...companiesMap.values());
    const isCorrect = maxCompanyPercentage <= 20;
    
    return {
      show: true,
      isCorrect,
      maxPercentage: maxCompanyPercentage,
      companiesCount: companiesMap.size
    };
  };

  // 2. Diversificación Geográfica (testing: reducido a >2 trades)
  const calculateGeographicDiversification = (openTrades) => {
    if (!openTrades || openTrades.length <= 2) return { show: false };
    
    // Obtener países únicos usando getSymbolData
    const countries = new Set();
    openTrades.forEach(trade => {
      const symbol = getTradeAttr(trade, 'symbol');
      if (symbol) {
        const symbolData = getSymbolData(symbol);
        countries.add(symbolData.countryName);
      }
    });
    
    const isCorrect = countries.size >= 2; // Reducido para testing
    
    return {
      show: true,
      isCorrect,
      countryCount: countries.size,
      countries: Array.from(countries)
    };
  };

  // 3. Diversificación por Sector (testing: reducido a >3 trades)
  const calculateSectorDiversification = (openTrades) => {
    if (!openTrades || openTrades.length <= 3) return { show: false };
    
    // Obtener sectores únicos usando getSymbolData
    const sectors = new Set();
    openTrades.forEach(trade => {
      const symbol = getTradeAttr(trade, 'symbol');
      if (symbol) {
        const symbolData = getSymbolData(symbol);
        sectors.add(symbolData.sectorName);
      }
    });
    
    const isCorrect = sectors.size >= 2; // Reducido para testing
    
    return {
      show: true,
      isCorrect,
      sectorCount: sectors.size,
      sectors: Array.from(sectors)
    };
  };

  // Calcular métricas de diversificación usando trades filtrados
  // Para Day Trading, no mostrar métricas de diversificación
  const companyDiv = activeTab === 'swing' ? calculateCompanyDiversification(filteredOpenTrades) : { show: false };
  const geoDiv = activeTab === 'swing' ? calculateGeographicDiversification(filteredOpenTrades) : { show: false };
  const sectorDiv = activeTab === 'swing' ? calculateSectorDiversification(filteredOpenTrades) : { show: false };

  // Logs para depuración (solo en desarrollo)
  useEffect(() => {
    console.log('🔍 DEBUG - TradeStats recibido:', {
      stats: stats,
      openTrades: openTrades,
      openTradesLength: openTrades?.length || 0,
      isArray: Array.isArray(openTrades),
      loading: loading,
      error: error
    });
    
    if (openTrades && openTrades.length > 0) {
      console.log('📊 CÁLCULO DE MÉTRICAS DE DIVERSIFICACIÓN:');
      
      // Debug para Company Diversification
      const totalValue = openTrades.reduce((sum, trade) => {
        const percentage = getTradeAttr(trade, 'portfolio_percentage') || 0;
        return sum + percentage;
      }, 0);
      
      console.log('🏢 Diversificación por Empresa:', {
        totalOpenTrades: openTrades.length,
        totalPortfolioValue: totalValue,
        needsMoreThan20: totalValue >= 20,
        companyDivResult: companyDiv
      });
      
      console.log('🌍 Diversificación Geográfica:', {
        totalOpenTrades: openTrades.length,
        needsMoreThan2: openTrades.length > 2,
        geoDivResult: geoDiv
      });
      
      console.log('📚 Diversificación por Sector:', {
        totalOpenTrades: openTrades.length,
        needsMoreThan3: openTrades.length > 3,
        sectorDivResult: sectorDiv
      });
      
      // Log detallado de cada trade
      openTrades.forEach((trade, index) => {
        const symbol = getTradeAttr(trade, 'symbol');
        const percentage = getTradeAttr(trade, 'portfolio_percentage');
        const symbolData = getSymbolData(symbol);
        
        console.log(`Trade ${index} - ${symbol}:`, {
          symbol: symbol,
          portfolio_percentage: percentage,
          status: getTradeAttr(trade, 'status'),
          country: symbolData.countryName,
          sector: symbolData.sectorName,
          symbolData: symbolData
        });
      });
      
      // Mostrar si las cards aparecerán
      console.log('🎯 VISIBILIDAD DE CARDS:', {
        companyCard: companyDiv.show ? '✅ SE MUESTRA' : '❌ NO SE MUESTRA',
        geoCard: geoDiv.show ? '✅ SE MUESTRA' : '❌ NO SE MUESTRA', 
        sectorCard: sectorDiv.show ? '✅ SE MUESTRA' : '❌ NO SE MUESTRA'
      });
      
    } else {
      console.log('⚠️ NO HAY openTrades - Métricas de diversificación no disponibles');
    }
  }, [openTrades, companyDiv, geoDiv, sectorDiv, stats, loading, error]);

  if (loading) {
    return (
      <StatsContainer>
        <StatsTitle>
          <BarChart3 size={32} />
          Resumen General
        </StatsTitle>
        <EmptyState>
          <EmptyIcon>⏳</EmptyIcon>
          <EmptyTitle>Cargando estadísticas...</EmptyTitle>
          <EmptyText>Por favor espera</EmptyText>
        </EmptyState>
      </StatsContainer>
    );
  }

  if (error) {
    return (
      <StatsContainer>
        <StatsTitle>
          <BarChart3 size={32} />
          Resumen General
        </StatsTitle>
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
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <StatsTitle>
          <BarChart3 size={32} />
          Resumen General
        </StatsTitle>
      </motion.div>

      {/* Tabs para Swing Trading y Day Trading */}
      <TabsContainer>
        <Tab 
          $active={activeTab === 'swing'}
          onClick={() => setActiveTab('swing')}
        >
          Swing Trading
        </Tab>
        <Tab 
          $active={activeTab === 'day'}
          onClick={() => setActiveTab('day')}
        >
          Day Trading
        </Tab>
      </TabsContainer>

      {stats && stats.totalTrades > 0 ? (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <StatsGrid>
            <StatCard variants={cardVariants}>
              <StatIcon color={colors.primary}>
                <CheckSquare />
              </StatIcon>
              <StatContent>
                <StatValue>{stats.totalTrades}</StatValue>
                <StatLabel>Total Trades Realizados</StatLabel>
              </StatContent>
            </StatCard>

            <StatCard variants={cardVariants}>
              <StatIcon color={colors.status.warning}>
                <Clock />
              </StatIcon>
              <StatContent>
                <StatValue>{stats.openTrades}</StatValue>
                <StatLabel>Trades Activos</StatLabel>
              </StatContent>
            </StatCard>

            <StatCard variants={cardVariants}>
              <StatIcon color={colors.trading.profit}>
                <CheckCircle />
              </StatIcon>
              <StatContent>
                <StatValue>{stats.winningTrades}</StatValue>
                <StatLabel>Trades Ganadores</StatLabel>
              </StatContent>
            </StatCard>

            <StatCard variants={cardVariants}>
              <StatIcon color={colors.trading.loss}>
                <XCircle />
              </StatIcon>
              <StatContent>
                <StatValue>{stats.losingTrades}</StatValue>
                <StatLabel>Trades Perdedores</StatLabel>
              </StatContent>
            </StatCard>

            <StatCard variants={cardVariants}>
              <StatIcon color={stats.winRate > 50 ? colors.trading.profit : colors.trading.loss}>
                <Target />
              </StatIcon>
              <StatContent>
                <StatValue $isPositive={stats.winRate > 50}>
                  {formatPercentage(stats.winRate)}%
                </StatValue>
                <StatLabel>Win Rate</StatLabel>
              </StatContent>
            </StatCard>

            <StatCard variants={cardVariants}>
              <StatIcon color={calculateAverageReturn(stats) > 0 ? colors.trading.profit : colors.trading.loss}>
                <Activity />
              </StatIcon>
              <StatContent>
                <StatValue 
                  $isPositive={calculateAverageReturn(stats) > 0}
                  $isNegative={calculateAverageReturn(stats) < 0}
                >
                  {formatPercentage(calculateAverageReturn(stats))}%
                </StatValue>
                <StatLabel>Rendimiento Promedio Por Trade</StatLabel>
              </StatContent>
            </StatCard>

            <StatCard variants={cardVariants}>
              <StatIcon color={colors.trading.profit}>
                <TrendingUp />
              </StatIcon>
              <StatContent>
                <StatValue $isPositive={stats.averageWin > 0}>
                  {formatPercentage(stats.averageWin)}%
                </StatValue>
                <StatLabel>Promedio Ganancia Ganadores</StatLabel>
              </StatContent>
            </StatCard>

            <StatCard variants={cardVariants}>
              <StatIcon color={colors.trading.loss}>
                <TrendingDown />
              </StatIcon>
              <StatContent>
                <StatValue $isNegative={true}>
                  {formatPercentage(Math.abs(stats.averageLoss))}%
                </StatValue>
                <StatLabel>Promedio Pérdida Perdedores</StatLabel>
              </StatContent>
            </StatCard>

            {/* SPY YTD Performance Card - Solo en Swing Trading */}
            {activeTab === 'swing' && (
              <StatCard variants={cardVariants}>
                <StatIcon color={
                  spyData.loading ? colors.gray[400] :
                  spyData.error || spyData.ytdPerformance === null ? colors.gray[400] :
                  spyData.ytdPerformance > 0 ? colors.trading.profit : colors.trading.loss
                }>
                  <LineChart />
                </StatIcon>
                <StatContent>
                  {spyData.loading ? (
                    <>
                      <StatValue>...</StatValue>
                      <StatLabel>Cargando SPY YTD</StatLabel>
                    </>
                  ) : spyData.error || spyData.ytdPerformance === null ? (
                    <>
                      <StatValue style={{ fontSize: '0.9rem', color: colors.gray[500] }}>No disponible</StatValue>
                      <StatLabel>SPY Rendimiento YTD</StatLabel>
                    </>
                  ) : (
                    <>
                      <StatValue 
                        $isPositive={spyData.ytdPerformance > 0}
                        $isNegative={spyData.ytdPerformance < 0}
                      >
                        {formatPercentage(spyData.ytdPerformance)}%
                      </StatValue>
                      <StatLabel>SPY Rendimiento YTD</StatLabel>
                    </>
                  )}
                </StatContent>
              </StatCard>
            )}

            {/* MÉTRICAS DE DIVERSIFICACIÓN */}
            
            {/* Diversificación por Empresa */}
            {companyDiv.show && (
              <StatCard variants={cardVariants}>
                <StatIcon color={companyDiv.isCorrect ? colors.trading.profit : colors.status.warning}>
                  <Building2 />
                </StatIcon>
                <StatContent>
                  <StatValue $isPositive={companyDiv.isCorrect} $isWarning={!companyDiv.isCorrect}>
                    {companyDiv.isCorrect ? 'Correcto' : 'Incorrecto'}
                  </StatValue>
                  <StatLabel>Diversificación por Empresa</StatLabel>
                </StatContent>
              </StatCard>
            )}

            {/* Diversificación Geográfica */}
            {geoDiv.show && (
              <StatCard variants={cardVariants}>
                <StatIcon color={geoDiv.isCorrect ? colors.trading.profit : colors.status.warning}>
                  <Globe />
                </StatIcon>
                <StatContent>
                  <StatValue $isPositive={geoDiv.isCorrect} $isWarning={!geoDiv.isCorrect}>
                    {geoDiv.isCorrect ? 'Correcto' : 'Incorrecto'}
                  </StatValue>
                  <StatLabel>Diversificación Geográfica</StatLabel>
                </StatContent>
              </StatCard>
            )}

            {/* Diversificación por Sector */}
            {sectorDiv.show && (
              <StatCard variants={cardVariants}>
                <StatIcon color={sectorDiv.isCorrect ? colors.trading.profit : colors.status.warning}>
                  <Layers />
                </StatIcon>
                <StatContent>
                  <StatValue $isPositive={sectorDiv.isCorrect} $isWarning={!sectorDiv.isCorrect}>
                    {sectorDiv.isCorrect ? 'Correcto' : 'Incorrecto'}
                  </StatValue>
                  <StatLabel>Diversificación por Sector</StatLabel>
                </StatContent>
              </StatCard>
            )}
          </StatsGrid>
        </motion.div>
      ) : (
        <EmptyState>
          <EmptyIcon>📊</EmptyIcon>
          <EmptyTitle>Sin datos disponibles</EmptyTitle>
          <EmptyText>Agrega tu primer trade para ver las estadísticas</EmptyText>
        </EmptyState>
      )}
    </StatsContainer>
  );
};

export default TradeStats;