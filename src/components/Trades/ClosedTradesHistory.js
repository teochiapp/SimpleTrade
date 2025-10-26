// components/Trades/ClosedTradesHistory.js - Historial de trades cerrados
import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Trash2, AlertTriangle } from 'lucide-react';
import { colors, componentColors, getTradingColor, withOpacity } from '../../styles/colors';

const HistoryContainer = styled.div`
  background: ${colors.white};
  border-radius: 12px;
  box-shadow: ${colors.shadows.lg};
  overflow: hidden;
  border: 1px solid ${colors.gray[200]};
`;

const HistoryHeader = styled.div`
  background: ${colors.gradients.secondary};
  color: ${colors.white};
  padding: 1.5rem;
  text-align: center;
`;

const HistoryTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  font-family: 'Unbounded', sans-serif;
  margin: 0 0 0.5rem 0;
  color: ${colors.white};
`;

const HistorySubtitle = styled.p`
  font-size: 1rem;
  font-family: 'Unbounded', sans-serif;
  margin: 0;
  opacity: 0.9;
  color: ${colors.white};
`;

const FiltersContainer = styled.div`
  padding: 1rem 1.5rem;
  background: ${colors.gray[50]};
  border-bottom: 1px solid ${colors.gray[200]};
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

const FilterInput = styled.input`
  padding: 0.5rem;
  border: 1px solid ${colors.gray[200]};
  border-radius: 6px;
  font-size: 0.9rem;
  font-family: 'Unbounded', sans-serif;
  min-width: 150px;

  &:focus {
    outline: none;
    border-color: #3498db;
  }
`;

const FilterSelect = styled.select`
  padding: 0.5rem;
  border: 1px solid ${colors.gray[200]};
  border-radius: 6px;
  font-size: 0.9rem;
  font-family: 'Unbounded', sans-serif;
  background: white;

  &:focus {
    outline: none;
    border-color: #3498db;
  }
`;

const TradesList = styled.div`
  max-height: 400px;
  overflow-y: auto;
`;

const TradeItem = styled(motion.div)`
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #e1e8ed;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${colors.gray[50]};
  }

  &:last-child {
    border-bottom: none;
  }
`;

const TradeHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const TradeSymbol = styled.div`
  font-size: 1.1rem;
  font-weight: 600;
  font-family: 'Unbounded', sans-serif;
  color: ${colors.black};
`;

const TradeResult = styled.div`
  font-size: 1rem;
  font-weight: 700;
  font-family: 'Unbounded', sans-serif;
  color: ${props => props.$positive ? '#27ae60' : '#e74c3c'};
`;

const TradeDetails = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 0.5rem;
  font-size: 0.9rem;
  color: ${colors.gray[600]};
  font-family: 'Unbounded', sans-serif;
`;

const TradeDetail = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const DetailLabel = styled.span`
  font-size: 0.8rem;
  font-weight: 500;
`;

const DetailValue = styled.span`
  font-weight: 600;
  color: ${colors.black};
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

const TradeHeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const DeleteButton = styled.button`
  background: none;
  border: none;
  color: ${colors.status.error};
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${withOpacity(colors.status.error, 0.1)};
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.95);
  }
`;

// Modal de confirmación
const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled(motion.div)`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  min-width: 300px;
  max-width: 500px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
`;

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const ModalTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  font-family: 'Unbounded', sans-serif;
  color: ${colors.status.error};
  margin: 0;
`;

const ModalText = styled.p`
  font-size: 1rem;
  color: ${colors.gray[600]};
  margin-bottom: 1.5rem;
  line-height: 1.5;
`;

const ModalButtons = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: flex-end;
`;

const ModalButton = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 6px;
  font-size: 0.9rem;
  font-family: 'Unbounded', sans-serif;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  ${props => props.$variant === 'danger' ? `
    background-color: ${colors.status.error};
    color: ${colors.white};
    &:hover { background-color: ${colors.primaryDark}; }
  ` : `
    background-color: ${colors.gray[100]};
    color: ${colors.black};
    &:hover { background-color: ${colors.gray[200]}; }
  `}
`;

const ClosedTradesHistory = ({ closedTrades, loading, error, onDeleteTrade }) => {
  const [filters, setFilters] = useState({
    symbol: '',
    type: '',
    dateFrom: '',
    dateTo: ''
  });

  const [filteredTrades, setFilteredTrades] = useState([]);
  const [deleteConfirm, setDeleteConfirm] = useState({ show: false, trade: null });

  // Función para adaptar estructura de Strapi
  const getTradeAttr = (trade, attr) => {
    if (!trade) return null;
    return trade.attributes ? trade.attributes[attr] : trade[attr];
  };

  // Calcular resultado en porcentaje para cada trade
  const calculateTradeResult = (trade) => {
    const entryPrice = parseFloat(getTradeAttr(trade, 'entry_price'));
    const exitPrice = parseFloat(getTradeAttr(trade, 'exit_price'));
    const type = getTradeAttr(trade, 'type');
    
    if (!entryPrice || !exitPrice) return 0;

    let resultPercent = 0;
    if (type === 'buy') {
      resultPercent = ((exitPrice - entryPrice) / entryPrice) * 100;
    } else { // sell (short)
      resultPercent = ((entryPrice - exitPrice) / entryPrice) * 100;
    }
    
    return resultPercent;
  };

  // Función de formateo mejorada
  const formatCurrency = (amount) => {
    if (amount == null || isNaN(amount)) return '$0.00';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatPercentage = (num) => {
    if (num == null || isNaN(num)) return '0.00';
    return Number(num).toFixed(2);
  };

  React.useEffect(() => {
    if (closedTrades) {
      applyFilters();
    }
  }, [closedTrades, filters]);

  const applyFilters = () => {
    if (!closedTrades) return;

    let filtered = [...closedTrades];

    if (filters.symbol) {
      filtered = filtered.filter(trade => {
        const symbol = getTradeAttr(trade, 'symbol');
        return symbol && symbol.toLowerCase().includes(filters.symbol.toLowerCase());
      });
    }

    if (filters.type) {
      filtered = filtered.filter(trade => getTradeAttr(trade, 'type') === filters.type);
    }

    if (filters.dateFrom) {
      filtered = filtered.filter(trade => {
        const closedAt = getTradeAttr(trade, 'closed_at');
        return closedAt && new Date(closedAt) >= new Date(filters.dateFrom);
      });
    }

    if (filters.dateTo) {
      filtered = filtered.filter(trade => {
        const closedAt = getTradeAttr(trade, 'closed_at');
        return closedAt && new Date(closedAt) <= new Date(filters.dateTo);
      });
    }

    setFilteredTrades(filtered);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleDeleteClick = (trade) => {
    setDeleteConfirm({ show: true, trade });
  };

  const handleDeleteConfirm = async () => {
    if (deleteConfirm.trade && onDeleteTrade) {
      try {
        await onDeleteTrade(deleteConfirm.trade.id);
        setDeleteConfirm({ show: false, trade: null });
      } catch (error) {
        console.error('Error eliminando trade:', error);
        // Podrías agregar una notificación de error aquí
      }
    }
  };

  const handleDeleteCancel = () => {
    setDeleteConfirm({ show: false, trade: null });
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <HistoryContainer>
        <HistoryHeader>
          <HistoryTitle>📋 Historial Cerrado</HistoryTitle>
          <HistorySubtitle>Cargando historial...</HistorySubtitle>
        </HistoryHeader>
        <EmptyState>
          <EmptyIcon>⏳</EmptyIcon>
          <EmptyTitle>Cargando...</EmptyTitle>
          <EmptyText>Por favor espera mientras cargamos tu historial</EmptyText>
        </EmptyState>
      </HistoryContainer>
    );
  }

  if (error) {
    return (
      <HistoryContainer>
        <HistoryHeader>
          <HistoryTitle>📋 Historial Cerrado</HistoryTitle>
          <HistorySubtitle>Error al cargar</HistorySubtitle>
        </HistoryHeader>
        <EmptyState>
          <EmptyIcon>❌</EmptyIcon>
          <EmptyTitle>Error</EmptyTitle>
          <EmptyText>{error}</EmptyText>
        </EmptyState>
      </HistoryContainer>
    );
  }

  if (closedTrades.length === 0) {
    return (
      <HistoryContainer>
        <HistoryHeader>
          <HistoryTitle>📋 Historial Cerrado</HistoryTitle>
          <HistorySubtitle>No hay trades cerrados</HistorySubtitle>
        </HistoryHeader>
        <EmptyState>
          <EmptyIcon>📊</EmptyIcon>
          <EmptyTitle>Sin historial</EmptyTitle>
          <EmptyText>Cierra tu primera posición para ver el historial aquí</EmptyText>
        </EmptyState>
      </HistoryContainer>
    );
  }

  return (
    <HistoryContainer>
      <HistoryHeader>
        <HistoryTitle>📋 Historial Cerrado</HistoryTitle>
        <HistorySubtitle>{filteredTrades.length} trade(s) cerrado(s)</HistorySubtitle>
      </HistoryHeader>

      <FiltersContainer>
        <FilterInput
          type="text"
          placeholder="Buscar por símbolo..."
          name="symbol"
          value={filters.symbol}
          onChange={handleFilterChange}
        />
        <FilterSelect
          name="type"
          value={filters.type}
          onChange={handleFilterChange}
        >
          <option value="">Todos los tipos</option>
          <option value="buy">Compra</option>
          <option value="sell">Venta</option>
        </FilterSelect>
        <FilterInput
          type="date"
          placeholder="Fecha desde..."
          name="dateFrom"
          value={filters.dateFrom}
          onChange={handleFilterChange}
        />
        <FilterInput
          type="date"
          placeholder="Fecha hasta..."
          name="dateTo"
          value={filters.dateTo}
          onChange={handleFilterChange}
        />
      </FiltersContainer>

      <TradesList>
        {filteredTrades.length === 0 ? (
          <EmptyState>
            <EmptyIcon>🔍</EmptyIcon>
            <EmptyTitle>Sin resultados</EmptyTitle>
            <EmptyText>No se encontraron trades con los filtros aplicados</EmptyText>
          </EmptyState>
        ) : (
          filteredTrades.map((trade, index) => (
            <TradeItem
              key={trade.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <TradeHeader>
                <TradeSymbol>
                  {getTradeAttr(trade, 'symbol')} - {getTradeAttr(trade, 'type') === 'buy' ? 'Compra' : 'Venta'}
                </TradeSymbol>
                <TradeHeaderRight>
                  <TradeResult $positive={calculateTradeResult(trade) >= 0}>
                    {formatPercentage(calculateTradeResult(trade))}%
                  </TradeResult>
                  <DeleteButton 
                    onClick={() => handleDeleteClick(trade)}
                    title="Eliminar trade del historial"
                  >
                    <Trash2 size={16} />
                  </DeleteButton>
                </TradeHeaderRight>
              </TradeHeader>

              <TradeDetails>
                <TradeDetail>
                  <DetailLabel>Entrada</DetailLabel>
                  <DetailValue>{formatCurrency(getTradeAttr(trade, 'entry_price'))}</DetailValue>
                </TradeDetail>
                <TradeDetail>
                  <DetailLabel>Salida</DetailLabel>
                  <DetailValue>{formatCurrency(getTradeAttr(trade, 'exit_price'))}</DetailValue>
                </TradeDetail>
                <TradeDetail>
                  <DetailLabel>% Cartera</DetailLabel>
                  <DetailValue>
                    {getTradeAttr(trade, 'portfolio_percentage') ? `${getTradeAttr(trade, 'portfolio_percentage')}%` : 'N/A'}
                  </DetailValue>
                </TradeDetail>
                <TradeDetail>
                  <DetailLabel>Estrategia</DetailLabel>
                  <DetailValue>{getTradeAttr(trade, 'strategy') || 'N/A'}</DetailValue>
                </TradeDetail>
                <TradeDetail>
                  <DetailLabel>Cerrado</DetailLabel>
                  <DetailValue>{formatDate(getTradeAttr(trade, 'closed_at'))}</DetailValue>
                </TradeDetail>
              </TradeDetails>
            </TradeItem>
          ))
        )}
      </TradesList>

      {/* Modal de confirmación */}
      {deleteConfirm.show && (
        <ModalOverlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleDeleteCancel}
        >
          <ModalContent
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <ModalHeader>
              <AlertTriangle size={20} />
              <ModalTitle>Confirmar Eliminación</ModalTitle>
            </ModalHeader>
            <ModalText>
              ¿Estás seguro de que quieres eliminar este trade del historial?<br/>
              <strong>{getTradeAttr(deleteConfirm.trade, 'symbol')}</strong> - {getTradeAttr(deleteConfirm.trade, 'type') === 'buy' ? 'Compra' : 'Venta'}<br/>
              Esta acción no se puede deshacer.
            </ModalText>
            <ModalButtons>
              <ModalButton onClick={handleDeleteCancel}>
                Cancelar
              </ModalButton>
              <ModalButton $variant="danger" onClick={handleDeleteConfirm}>
                Eliminar
              </ModalButton>
            </ModalButtons>
          </ModalContent>
        </ModalOverlay>
      )}
    </HistoryContainer>
  );
};

export default ClosedTradesHistory;
