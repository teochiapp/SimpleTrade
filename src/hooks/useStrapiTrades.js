// hooks/useStrapiTrades.js - Hook para manejar trades con Strapi
import { useState, useEffect, useCallback, useRef } from 'react';
import strapiService from '../services/strapiService';

// Configuración de caché y polling
const STRAPI_CONFIG = {
  CACHE_DURATION: 30 * 1000, // 30 segundos de caché
  POLLING_INTERVAL: 60 * 1000, // 1 minuto entre actualizaciones automáticas
  ENABLE_POLLING: false, // Desactivar polling por defecto (solo refresh manual)
};

export const useStrapiTrades = () => {
  const [trades, setTrades] = useState([]);
  const [openTrades, setOpenTrades] = useState([]);
  const [closedTrades, setClosedTrades] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const lastFetchRef = useRef(0);
  const isFetchingRef = useRef(false);

  const loadTrades = useCallback(async (force = false) => {
    // Verificar caché si no es forzado
    const now = Date.now();
    const timeSinceLastFetch = now - lastFetchRef.current;
    
    if (!force && timeSinceLastFetch < STRAPI_CONFIG.CACHE_DURATION) {
      console.log(`📦 Usando datos en caché (${Math.round(timeSinceLastFetch/1000)}s desde última carga)`);
      return;
    }

    // Evitar llamadas duplicadas simultáneas
    if (isFetchingRef.current) {
      console.log('⏳ Ya hay una carga de trades en progreso, saltando...');
      return;
    }

    try {
      isFetchingRef.current = true;
      setLoading(true);
      setError(null);
      
      console.log('🔄 Cargando trades desde Strapi...');
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
      
      lastFetchRef.current = now;
      console.log('✅ Trades cargados exitosamente');
    } catch (err) {
      console.error('❌ Error cargando trades:', err);
      setError(err.message);
    } finally {
      setLoading(false);
      isFetchingRef.current = false;
    }
  }, []);

  const createTrade = useCallback(async (tradeData) => {
    try {
      const newTrade = await strapiService.createTrade(tradeData);
      await loadTrades(true); // Forzar recarga después de crear
      return newTrade;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, [loadTrades]);

  const updateTrade = useCallback(async (tradeId, tradeData) => {
    try {
      const updatedTrade = await strapiService.updateTrade(tradeId, tradeData);
      await loadTrades(true); // Forzar recarga después de actualizar
      return updatedTrade;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, [loadTrades]);

  const deleteTrade = useCallback(async (tradeId) => {
    try {
      await strapiService.deleteTrade(tradeId);
      await loadTrades(true); // Forzar recarga después de eliminar
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, [loadTrades]);

  const closeTrade = useCallback(async (tradeId, exitPrice, result, notes = '') => {
    try {
      const closedTrade = await strapiService.closeTrade(tradeId, exitPrice, result, notes);
      await loadTrades(true); // Forzar recarga después de cerrar
      return closedTrade;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, [loadTrades]);

  // Carga inicial
  useEffect(() => {
    console.log('🚀 Carga inicial de trades');
    loadTrades();
  }, []); // Solo al montar

  // Polling opcional (desactivado por defecto)
  useEffect(() => {
    if (!STRAPI_CONFIG.ENABLE_POLLING) {
      console.log('📊 Polling de trades desactivado - solo refresh manual');
      return;
    }

    const interval = setInterval(() => {
      console.log('🔄 Actualización periódica de trades');
      loadTrades();
    }, STRAPI_CONFIG.POLLING_INTERVAL);

    console.log(`📅 Polling de trades activado (cada ${STRAPI_CONFIG.POLLING_INTERVAL/60000} minutos)`);
    
    return () => clearInterval(interval);
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
