// hooks/useStrapiTrades.js - Hook para manejar trades con Strapi
import { useState, useEffect, useCallback } from 'react';
import strapiService from '../services/strapiService';

export const useStrapiTrades = () => {
  const [trades, setTrades] = useState([]);
  const [openTrades, setOpenTrades] = useState([]);
  const [closedTrades, setClosedTrades] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadTrades = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const tradesData = await strapiService.getTrades();
      const statsData = await strapiService.getTradeStats();
      
      // Adaptar estructura según el formato de Strapi
      const getTradeAttr = (trade, attr) => {
        return trade.attributes ? trade.attributes[attr] : trade[attr];
      };

      // Separar trades abiertos y cerrados
      const open = tradesData.filter(trade => getTradeAttr(trade, 'status') === 'open');
      const closed = tradesData.filter(trade => getTradeAttr(trade, 'status') === 'closed');
      
      setTrades(tradesData);
      setOpenTrades(open);
      setClosedTrades(closed);
      setStats(statsData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const createTrade = useCallback(async (tradeData) => {
    try {
      const newTrade = await strapiService.createTrade(tradeData);
      await loadTrades(); // Recargar datos
      return newTrade;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, [loadTrades]);

  const updateTrade = useCallback(async (tradeId, tradeData) => {
    try {
      const updatedTrade = await strapiService.updateTrade(tradeId, tradeData);
      await loadTrades(); // Recargar datos
      return updatedTrade;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, [loadTrades]);

  const deleteTrade = useCallback(async (tradeId) => {
    try {
      await strapiService.deleteTrade(tradeId);
      await loadTrades(); // Recargar datos
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, [loadTrades]);

  const closeTrade = useCallback(async (tradeId, exitPrice, result, notes = '') => {
    try {
      const closedTrade = await strapiService.closeTrade(tradeId, exitPrice, result, notes);
      await loadTrades(); // Recargar datos
      return closedTrade;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, [loadTrades]);

  useEffect(() => {
    loadTrades();
  }, [loadTrades]);

  return {
    trades,
    openTrades,
    closedTrades,
    stats,
    loading,
    error,
    createTrade,
    updateTrade,
    deleteTrade,
    closeTrade,
    refreshTrades: loadTrades
  };
};

export const useStrapiAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const login = useCallback(async (email, password) => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('🔐 Intentando login...', { email });
      const result = await strapiService.login(email, password);
      
      if (result.success) {
        console.log('✅ Login exitoso:', result.user);
        setUser(result.user);
        setLoading(false);
        return result;
      } else {
        console.error('❌ Login falló:', result.error);
        setError(result.error);
        setLoading(false);
        return result;
      }
    } catch (err) {
      console.error('💥 Error en login:', err);
      const errorMsg = 'Error de conexión con el servidor';
      setError(errorMsg);
      setLoading(false);
      return { success: false, error: errorMsg };
    }
  }, []);

  const register = useCallback(async (email, password, username) => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('📝 Intentando registro...', { email, username });
      const result = await strapiService.register(email, password, username);
      
      if (result.success) {
        console.log('✅ Registro exitoso:', result.user);
        setUser(result.user);
        setLoading(false);
        return result;
      } else {
        console.error('❌ Registro falló:', result.error);
        setError(result.error);
        setLoading(false);
        return result;
      }
    } catch (err) {
      console.error('💥 Error en registro:', err);
      const errorMsg = 'Error de conexión con el servidor';
      setError(errorMsg);
      setLoading(false);
      return { success: false, error: errorMsg };
    }
  }, []);

  const logout = useCallback(() => {
    console.log('🚪 Cerrando sesión...');
    strapiService.clearToken();
    setUser(null);
    setError(null);
  }, []);

  const checkAuth = useCallback(async () => {
    try {
      console.log('🔍 Verificando autenticación...');
      setLoading(true);
      
      const isAuthenticated = await strapiService.checkAuth();
      console.log('🔍 Resultado checkAuth:', isAuthenticated);
      
      if (isAuthenticated) {
        const userProfile = await strapiService.getUserProfile();
        console.log('👤 Perfil obtenido:', userProfile);
        setUser(userProfile);
      } else {
        console.log('❌ No autenticado');
        setUser(null);
      }
    } catch (err) {
      console.error('💥 Error verificando auth:', err);
      setUser(null);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Solo verificar autenticación al montar el componente
  useEffect(() => {
    checkAuth();
  }, []); // Dependencias vacías para que solo se ejecute una vez

  return {
    user,
    loading,
    error,
    login,
    register,
    logout,
    checkAuth
  };
};
