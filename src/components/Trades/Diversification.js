// components/Trades/Diversification.js - Componente para análisis de diversificación
import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { BarChart3, Building2, Globe, Factory, Wallet } from 'lucide-react';
import { getSymbolData, CHART_COLORS } from '../../config/marketData';
import { colors, componentColors, getTradingColor, withOpacity } from '../../styles/colors';

const DiversificationContainer = styled.div`
  background: ${colors.white};
  border-radius: 12px;
  box-shadow: ${colors.shadows.lg};
  overflow: hidden;
  border: 1px solid ${colors.gray[200]};
`;

const Header = styled.div`
  background: ${colors.gradients.primary};
  color: ${colors.white};
  padding: 2rem;
  text-align: center;
`;

const Title = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  font-family: 'Unbounded', sans-serif;
  margin: 0 0 0.5rem 0;
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Subtitle = styled.p`
  font-size: 1.1rem;
  font-family: 'Unbounded', sans-serif;
  margin: 0;
  opacity: 0.9;
  color: ${colors.white};
`;

const TabsContainer = styled.div`
  display: flex;
  background: ${colors.gray[50]};
  border-bottom: 1px solid ${colors.gray[200]};
`;

const TabButton = styled(motion.button)`
  flex: 1;
  padding: 1rem 1.5rem;
  border: none;
  background: ${props => props.$active ? colors.white : 'transparent'};
  color: ${props => props.$active ? colors.black : colors.gray[600]};
  font-size: 1rem;
  font-weight: 500;
  font-family: 'Unbounded', sans-serif;
  cursor: pointer;
  transition: all 0.3s ease;
  border-bottom: 3px solid ${props => props.$active ? '#667eea' : 'transparent'};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &:hover {
    background: ${props => props.$active ? colors.white : colors.gray[100]};
    color: ${colors.black};
  }
`;

const TabContent = styled.div`
  padding: 2rem;
  min-height: 500px;
`;

const ChartContainer = styled.div`
  height: 400px;
  margin-bottom: 2rem;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
`;

const StatCard = styled.div`
  background: #f8f9fa;
  padding: 1rem;
  border-radius: 8px;
  border-left: 4px solid ${props => props.$color || colors.primary};
`;

const StatValue = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${colors.black};
  font-family: 'Unbounded', sans-serif;
`;

const StatLabel = styled.div`
  font-size: 0.9rem;
  color: ${colors.gray[600]};
  font-family: 'Unbounded', sans-serif;
  font-weight: 500;
`;

const StatSubLabel = styled.div`
  font-size: 0.75rem;
  color: ${colors.black};
  font-family: 'Unbounded', sans-serif;
  font-weight: 600;
  margin-top: 0.25rem;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 4rem;
  color: ${colors.gray[600]};
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
  font-family: 'Unbounded', sans-serif;
`;

const EmptyText = styled.p`
  font-size: 1rem;
  margin: 0;
  font-family: 'Unbounded', sans-serif;
`;

const Diversification = ({ openTrades, loading, error }) => {
  const [activeTab, setActiveTab] = useState('companies');

  // Función para adaptar estructura de Strapi
  const getTradeAttr = (trade, attr) => {
    if (!trade) return null;
    return trade.attributes ? trade.attributes[attr] : trade[attr];
  };

  // Procesar datos de diversificación
  const diversificationData = useMemo(() => {
    if (!openTrades || openTrades.length === 0) return null;

    const companies = {};
    const countries = {};
    const sectors = {};
    let totalPortfolio = 0;

    openTrades.forEach(trade => {
      const symbol = getTradeAttr(trade, 'symbol');
      const portfolioPercentage = parseFloat(getTradeAttr(trade, 'portfolio_percentage')) || 0;
      
      if (!symbol || portfolioPercentage === 0) return;

      const symbolData = getSymbolData(symbol);
      totalPortfolio += portfolioPercentage;

      // Por empresa
      if (companies[symbol]) {
        companies[symbol] += portfolioPercentage;
      } else {
        companies[symbol] = portfolioPercentage;
      }

      // Por país
      const countryName = symbolData.countryName;
      if (countries[countryName]) {
        countries[countryName] += portfolioPercentage;
      } else {
        countries[countryName] = portfolioPercentage;
      }

      // Por sector
      const sectorName = symbolData.sectorName;
      if (sectors[sectorName]) {
        sectors[sectorName] += portfolioPercentage;
      } else {
        sectors[sectorName] = portfolioPercentage;
      }
    });

    // Convertir a arrays para gráficos
    const companiesArray = Object.entries(companies).map(([name, value], index) => ({
      name,
      value: parseFloat(value.toFixed(2)),
      color: CHART_COLORS[index % CHART_COLORS.length]
    })).sort((a, b) => b.value - a.value);

    const countriesArray = Object.entries(countries).map(([name, value], index) => ({
      name,
      value: parseFloat(value.toFixed(2)),
      color: CHART_COLORS[index % CHART_COLORS.length]
    })).sort((a, b) => b.value - a.value);

    const sectorsArray = Object.entries(sectors).map(([name, value], index) => ({
      name,
      value: parseFloat(value.toFixed(2)),
      color: CHART_COLORS[index % CHART_COLORS.length]
    })).sort((a, b) => b.value - a.value);

    return {
      companies: companiesArray,
      countries: countriesArray,
      sectors: sectorsArray,
      totalPortfolio: parseFloat(totalPortfolio.toFixed(2)),
      stats: {
        totalCompanies: companiesArray.length,
        totalCountries: countriesArray.length,
        totalSectors: sectorsArray.length,
        largestPosition: Math.max(...companiesArray.map(c => c.value)),
        largestCompany: companiesArray.length > 0 ? companiesArray[0].name : 'N/A', // La empresa con mayor posición (primer elemento ya está ordenado)
        mostDiversifiedSector: sectorsArray.length > 0 ? sectorsArray[0].name : 'N/A'
      }
    };
  }, [openTrades]);

  // Tooltip personalizado
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          padding: '10px',
          border: '1px solid #ccc',
          borderRadius: '4px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          fontFamily: 'Unbounded'
        }}>
          <p style={{ margin: 0, fontWeight: 'bold' }}>{`${payload[0].name}: ${payload[0].value}%`}</p>
        </div>
      );
    }
    return null;
  };

  if (loading) {
    return (
      <DiversificationContainer>
        <Header>
          <Title>📊 Diversificación</Title>
          <Subtitle>Cargando análisis de cartera...</Subtitle>
        </Header>
        <EmptyState>
          <EmptyIcon>⏳</EmptyIcon>
          <EmptyTitle>Cargando...</EmptyTitle>
          <EmptyText>Analizando tu diversificación</EmptyText>
        </EmptyState>
      </DiversificationContainer>
    );
  }

  if (error) {
    return (
      <DiversificationContainer>
        <Header>
          <Title>📊 Diversificación</Title>
          <Subtitle>Error al cargar datos</Subtitle>
        </Header>
        <EmptyState>
          <EmptyIcon>❌</EmptyIcon>
          <EmptyTitle>Error</EmptyTitle>
          <EmptyText>{error}</EmptyText>
        </EmptyState>
      </DiversificationContainer>
    );
  }

  if (!diversificationData || diversificationData.totalPortfolio === 0) {
    return (
      <DiversificationContainer>
        <Header>
          <Title>📊 Diversificación</Title>
          <Subtitle>Análisis de distribución de tu cartera</Subtitle>
        </Header>
        <EmptyState>
          <EmptyIcon>📈</EmptyIcon>
          <EmptyTitle>Sin datos de diversificación</EmptyTitle>
          <EmptyText>
            Agrega el porcentaje de cartera en tus posiciones para ver el análisis de diversificación
          </EmptyText>
        </EmptyState>
      </DiversificationContainer>
    );
  }

  const renderCompaniesTab = () => (
    <div>
      <StatsGrid>
        <StatCard $color={colors.secondary}>
          <StatValue>{diversificationData.stats.totalCompanies}</StatValue>
          <StatLabel>Empresas</StatLabel>
        </StatCard>
        <StatCard $color={colors.primary}>
          <StatValue>{diversificationData.stats.largestPosition}%</StatValue>
          <StatLabel>
            Mayor Posición
            <StatSubLabel>{diversificationData.stats.largestCompany}</StatSubLabel>
          </StatLabel>
        </StatCard>
        <StatCard $color={colors.trading.profit}>
          <StatValue>{diversificationData.totalPortfolio}%</StatValue>
          <StatLabel>Total Asignado</StatLabel>
        </StatCard>
        <StatCard $color={colors.gray[600]}>
          <StatValue>{(100 - diversificationData.totalPortfolio).toFixed(1)}%</StatValue>
          <StatLabel>Liquidez Disponible</StatLabel>
        </StatCard>
      </StatsGrid>

      <ChartContainer>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={diversificationData.companies}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, value }) => `${name}: ${value}%`}
              outerRadius={120}
              fill="#8884d8"
              dataKey="value"
            >
              {diversificationData.companies.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  );

  const renderCountriesTab = () => (
    <div>
      <StatsGrid>
        <StatCard $color={colors.primary}>
          <StatValue>{diversificationData.stats.totalCountries}</StatValue>
          <StatLabel>Países</StatLabel>
        </StatCard>
        <StatCard $color={colors.status.warning}>
          <StatValue>{diversificationData.countries[0]?.name || 'N/A'}</StatValue>
          <StatLabel>
            País Principal
            <StatSubLabel>{diversificationData.countries[0]?.value || 0}% del portafolio</StatSubLabel>
          </StatLabel>
        </StatCard>
        <StatCard $color={colors.secondary}>
          <StatValue>{diversificationData.countries[0]?.value || 0}%</StatValue>
          <StatLabel>Concentración Geográfica</StatLabel>
        </StatCard>
        <StatCard $color={colors.gray[600]}>
          <StatValue>{(100 - diversificationData.totalPortfolio).toFixed(1)}%</StatValue>
          <StatLabel>Liquidez Disponible</StatLabel>
        </StatCard>
      </StatsGrid>

      <ChartContainer>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={diversificationData.countries}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, value }) => `${name}: ${value}%`}
              outerRadius={120}
              fill="#8884d8"
              dataKey="value"
            >
              {diversificationData.countries.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  );

  const renderSectorsTab = () => (
    <div>
      <StatsGrid>
        <StatCard $color={colors.black}>
          <StatValue>{diversificationData.stats.totalSectors}</StatValue>
          <StatLabel>Sectores</StatLabel>
        </StatCard>
        <StatCard $color={colors.status.warning}>
          <StatValue>{diversificationData.sectors[0]?.name || 'N/A'}</StatValue>
          <StatLabel>
            Sector Principal
            <StatSubLabel>{diversificationData.sectors[0]?.value || 0}% del portafolio</StatSubLabel>
          </StatLabel>
        </StatCard>
        <StatCard $color={colors.trading.profit}>
          <StatValue>{diversificationData.sectors[0]?.value || 0}%</StatValue>
          <StatLabel>Concentración Sectorial</StatLabel>
        </StatCard>
        <StatCard $color={colors.gray[600]}>
          <StatValue>{(100 - diversificationData.totalPortfolio).toFixed(1)}%</StatValue>
          <StatLabel>Liquidez Disponible</StatLabel>
        </StatCard>
      </StatsGrid>

      <ChartContainer>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={diversificationData.sectors}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, value }) => `${value}%`}
              outerRadius={120}
              fill="#8884d8"
              dataKey="value"
            >
              {diversificationData.sectors.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  );

  return (
    <DiversificationContainer>
      <Header>
        <Title>
          <BarChart3 size={32} />
          Diversificación
        </Title>
        <Subtitle>Análisis de distribución de tu cartera</Subtitle>
      </Header>

      <TabsContainer>
        <TabButton
          $active={activeTab === 'companies'}
          onClick={() => setActiveTab('companies')}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Building2 size={18} />
          Por Empresa
        </TabButton>
        <TabButton
          $active={activeTab === 'countries'}
          onClick={() => setActiveTab('countries')}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Globe size={18} />
          Por Geografía
        </TabButton>
        <TabButton
          $active={activeTab === 'sectors'}
          onClick={() => setActiveTab('sectors')}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Factory size={18} />
          Por Sector
        </TabButton>
      </TabsContainer>

      <TabContent>
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'companies' && renderCompaniesTab()}
          {activeTab === 'countries' && renderCountriesTab()}
          {activeTab === 'sectors' && renderSectorsTab()}
        </motion.div>
      </TabContent>
    </DiversificationContainer>
  );
};

export default Diversification;
