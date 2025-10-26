// hooks/useRealTimePrices.js - Hook para manejar precios en tiempo real
import { useState, useEffect, useCallback } from 'react';
import priceService from '../services/priceService';

export const useRealTimePrices = (trades = []) => {
  const [prices, setPrices] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(null);

  // Obtener símbolos únicos de los trades
  const symbols = [...new Set(trades.map(trade => {
    const symbol = trade.attributes ? trade.attributes.symbol : trade.symbol;
    return symbol ? symbol.toUpperCase() : null;
  }).filter(Boolean))];

  // Función para obtener precios
  const fetchPrices = useCallback(async () => {
    if (symbols.length === 0) return;

    setLoading(true);
    setError(null);

    try {
      console.log('🔄 Obteniendo precios para:', symbols);
      const newPrices = await priceService.getMultiplePrices(symbols);
      
      setPrices(prevPrices => ({
        ...prevPrices,
        ...newPrices
      }));
      
      setLastUpdate(new Date());
      console.log('✅ Precios actualizados:', newPrices);
    } catch (err) {
      console.error('❌ Error obteniendo precios:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [symbols.join(',')]); // Dependencia basada en símbolos únicos

  // Obtener precio de un símbolo específico
  const getPrice = useCallback((symbol) => {
    if (!symbol) return null;
    return prices[symbol.toUpperCase()] || null;
  }, [prices]);

  // Calcular PnL no realizado para un trade
  const getUnrealizedPnL = useCallback((trade) => {
    const symbol = trade.attributes ? trade.attributes.symbol : trade.symbol;
    const entryPrice = parseFloat(trade.attributes ? trade.attributes.entry_price : trade.entry_price);
    const tradeType = trade.attributes ? trade.attributes.type : trade.type;
    
    if (!symbol || !entryPrice) return null;

    const currentPrice = getPrice(symbol);
    if (!currentPrice) return null;

    return priceService.calculateUnrealizedPnL(entryPrice, currentPrice, tradeType);
  }, [getPrice]);

  // Obtener precios inicialmente
  useEffect(() => {
    if (symbols.length > 0) {
      fetchPrices();
    }
  }, [fetchPrices]);

  // Actualizar precios una vez por día (24 horas)
  useEffect(() => {
    if (symbols.length === 0) return;

    // Configurar actualización diaria
    const interval = setInterval(() => {
      fetchPrices();
    }, 24 * 60 * 60 * 1000); // 24 horas = 86,400,000 ms

    console.log('📅 Programada actualización diaria de precios (cada 24 horas)');
    
    return () => clearInterval(interval);
  }, [fetchPrices]);

  // Función manual para refrescar
  const refreshPrices = useCallback(() => {
    fetchPrices();
  }, [fetchPrices]);

  return {
    prices,
    loading,
    error,
    lastUpdate,
    getPrice,
    getUnrealizedPnL,
    refreshPrices,
    symbols
  };
};
