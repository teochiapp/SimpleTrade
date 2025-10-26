// services/strapiService.js - Servicio para conectar con Strapi
import config from '../config/environment';

class StrapiService {
  constructor() {
    this.baseURL = `${config.STRAPI_URL}/api`;
    this.token = null;
    this.initializeToken();
  }

  // Inicializar token desde localStorage
  initializeToken() {
    try {
      const storedToken = localStorage.getItem('strapi_token');
      if (storedToken && storedToken !== 'null' && storedToken !== 'undefined') {
        this.token = storedToken;
        console.log(`🔐 Token cargado desde localStorage:`, !!this.token);
      } else {
        console.log(`🔐 No hay token válido en localStorage`);
        this.token = null;
      }
    } catch (error) {
      console.error('Error loading token from localStorage:', error);
      this.token = null;
    }
  }

  // Configurar token de autenticación
  setToken(token) {
    this.token = token;
    localStorage.setItem('strapi_token', token);
    console.log(`🔐 Token saved:`, !!token);
  }

  // Limpiar token
  clearToken() {
    this.token = null;
    localStorage.removeItem('strapi_token');
    console.log(`🔓 Token cleared`);
  }

  // Headers por defecto
  getHeaders() {
    const headers = {
      'Content-Type': 'application/json',
    };
    
    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }
    
    return headers;
  }

  // Autenticación
  async login(email, password) {
    try {
      const response = await fetch(`${config.STRAPI_URL}/api/auth/local`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          identifier: email,
          password: password,
        }),
      });

      const data = await response.json();

      if (data.jwt) {
        this.setToken(data.jwt);
        return {
          success: true,
          user: data.user,
          token: data.jwt
        };
      } else {
        return {
          success: false,
          error: data.message || 'Error de autenticación'
        };
      }
    } catch (error) {
      return {
        success: false,
        error: 'Error de conexión con el servidor'
      };
    }
  }

  async register(email, password, username) {
    try {
      const response = await fetch(`${config.STRAPI_URL}/api/auth/local/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (data.jwt) {
        this.setToken(data.jwt);
        return {
          success: true,
          user: data.user,
          token: data.jwt
        };
      } else {
        return {
          success: false,
          error: data.message || 'Error de registro'
        };
      }
    } catch (error) {
      return {
        success: false,
        error: 'Error de conexión con el servidor'
      };
    }
  }

  // CRUD para Trades
  async getTrades() {
    try {
      // Verificar autenticación
      if (!this.token) {
        throw new Error('Usuario no autenticado. Por favor inicia sesión.');
      }

      // TEMPORAL: Usar controlador por defecto sin filtros personalizados
      const response = await fetch(`${this.baseURL}/trades?populate=*&sort=createdAt:desc`, {
        headers: this.getHeaders(),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.data || [];
    } catch (error) {
      console.error('Error fetching trades:', error);
      throw error;
    }
  }

  async createTrade(tradeData) {
    try {
      // Verificar autenticación
      if (!this.token) {
        throw new Error('Usuario no autenticado. Por favor inicia sesión.');
      }

      // Obtener información del usuario para asociar el trade
      const userProfile = await this.getUserProfile();
      
      // Agregar el usuario al tradeData
      const tradeWithUser = {
        ...tradeData,
        user: userProfile.id
      };

      const response = await fetch(`${this.baseURL}/trades`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify({
          data: tradeWithUser
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error('Error creating trade:', error);
      throw error;
    }
  }

  async updateTrade(tradeId, tradeData) {
    try {
      console.log(`🔄 Updating trade ${tradeId}...`);
      console.log(`🔐 Token present:`, !!this.token);
      console.log(`🔑 Token value (first 20 chars):`, this.token ? this.token.substring(0, 20) + '...' : 'null');
      console.log(`📤 Headers:`, this.getHeaders());
      
      // Verificar que el token esté presente antes de hacer la request
      if (!this.token) {
        console.error('❌ No token found, user needs to login');
        throw new Error('No authentication token found - please login again');
      }
      
      const response = await fetch(`${this.baseURL}/trades/${tradeId}`, {
        method: 'PUT',
        headers: this.getHeaders(),
        body: JSON.stringify({
          data: tradeData
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error(`❌ Update failed:`, response.status, errorData);
        console.error(`❌ Full error response:`, errorData);
        
        if (response.status === 401) {
          console.log('🔓 Token expired or invalid, clearing token and localStorage...');
          this.clearToken();
          localStorage.removeItem('strapi_token');
          localStorage.removeItem('strapi_user');
          
          // Mostrar una alerta al usuario
          alert('Tu sesión ha expirado. Por favor, inicia sesión nuevamente.');
          
          // Recargar la página para forzar el login
          window.location.reload();
          
          throw new Error('Token expired - please login again');
        }
        
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(`✅ Trade ${tradeId} updated successfully`);
      return data.data;
    } catch (error) {
      console.error('Error updating trade:', error);
      throw error;
    }
  }

  async deleteTrade(tradeId) {
    try {
      const response = await fetch(`${this.baseURL}/trades/${tradeId}`, {
        method: 'DELETE',
        headers: this.getHeaders(),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return true;
    } catch (error) {
      console.error('Error deleting trade:', error);
      throw error;
    }
  }

  // Cerrar trade (actualizar con precio de salida y resultado)
  async closeTrade(tradeId, exitPrice, result) {
    try {
      console.log(`🔒 Iniciando cierre de trade ${tradeId}...`);
      
      // 🔑 VERIFICACIÓN ESPECÍFICA DE TOKEN ANTES DE CERRAR TRADE
      if (!this.token) {
        console.error('❌ No hay token disponible para cerrar trade');
        alert('Tu sesión ha expirado. Por favor, inicia sesión nuevamente.');
        window.location.reload();
        throw new Error('No authentication token - please login again');
      }
      
      // Verificar que el token sigue siendo válido
      console.log('🔍 Verificando validez del token antes de cerrar trade...');
      const isValidToken = await this.checkAuth();
      
      if (!isValidToken) {
        console.error('❌ Token inválido al intentar cerrar trade');
        alert('Tu sesión ha expirado. Por favor, inicia sesión nuevamente.');
        window.location.reload();
        throw new Error('Invalid token - please login again'); 
      }
      
      console.log('✅ Token válido, procediendo a cerrar trade...');
      
      const tradeData = {
        exit_price: exitPrice,
        result: result, // resultado en porcentaje (ej: 10.5 = 10.5%)
        status: 'closed',
        closed_at: new Date().toISOString()
      };

      const updatedTrade = await this.updateTrade(tradeId, tradeData);
      console.log(`✅ Trade ${tradeId} cerrado exitosamente`);
      return updatedTrade;
    } catch (error) {
      console.error('Error closing trade:', error);
      
      // Si es un error de autenticación, manejar específicamente
      if (error.message.includes('Token') || error.message.includes('token') || error.message.includes('auth')) {
        console.log('🔓 Error de autenticación detectado en closeTrade');
        this.clearToken();
        localStorage.removeItem('strapi_token');
        localStorage.removeItem('strapi_user');
        alert('Tu sesión ha expirado. La página se recargará para que puedas iniciar sesión nuevamente.');
        setTimeout(() => window.location.reload(), 1000);
      }
      
      throw error;
    }
  }

  // Estadísticas de trades
  async getTradeStats() {
    try {
      const trades = await this.getTrades();
      
      console.log('📊 STATS - Trades estructura:', trades);
      if (trades && trades.length > 0) {
        console.log('📊 STATS - Primer trade:', trades[0]);
      }
      
      if (!trades || trades.length === 0) {
        return {
          totalTrades: 0,
          openTrades: 0,
          closedTrades: 0,
          winningTrades: 0,
          losingTrades: 0,
          winRate: 0,
          totalProfit: 0,
          averageWin: 0,
          averageLoss: 0,
          profitFactor: 0
        };
      }

      // Adaptar estructura según el formato de Strapi
      const getTradeAttr = (trade, attr) => {
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

      const closedTrades = trades.filter(trade => getTradeAttr(trade, 'status') === 'closed');
      const openTrades = trades.filter(trade => getTradeAttr(trade, 'status') === 'open');
      
      // Calcular trades con sus resultados en porcentaje
      const tradesWithResults = closedTrades.map(trade => ({
        ...trade,
        calculatedResult: calculateTradeResult(trade)
      }));
      
      const winningTrades = tradesWithResults.filter(trade => trade.calculatedResult > 0);
      const losingTrades = tradesWithResults.filter(trade => trade.calculatedResult < 0);
      
      const totalProfit = tradesWithResults.reduce((sum, trade) => sum + trade.calculatedResult, 0);
      const totalWins = winningTrades.reduce((sum, trade) => sum + trade.calculatedResult, 0);
      const totalLosses = Math.abs(losingTrades.reduce((sum, trade) => sum + trade.calculatedResult, 0));

      return {
        totalTrades: trades.length,
        openTrades: openTrades.length,
        closedTrades: closedTrades.length,
        winningTrades: winningTrades.length,
        losingTrades: losingTrades.length,
        winRate: closedTrades.length > 0 ? (winningTrades.length / closedTrades.length) * 100 : 0,
        totalProfit,
        averageWin: winningTrades.length > 0 ? totalWins / winningTrades.length : 0,
        averageLoss: losingTrades.length > 0 ? totalLosses / losingTrades.length : 0,
        profitFactor: totalLosses > 0 ? totalWins / totalLosses : 0
      };
    } catch (error) {
      console.error('Error getting trade stats:', error);
      throw error;
    }
  }

  // Verificar si el usuario está autenticado
  async checkAuth() {
    console.log('🔍 Checking authentication...');
    
    // Reintentar cargar token si no está presente
    if (!this.token) {
      console.log('🔄 Token not found, attempting to reload from localStorage...');
      this.initializeToken();
    }
    
    console.log('🔐 Token present:', !!this.token);
    
    if (!this.token) {
      console.log('ℹ️ No token available - user needs to login');
      return false;
    }

    try {
      console.log('📡 Verifying token with Strapi...');
      const response = await fetch(`${config.STRAPI_URL}/api/users/me`, {
        headers: this.getHeaders(),
      });

      if (!response.ok) {
        console.error('❌ Token verification failed:', response.status);
        if (response.status === 401) {
          console.log('🔓 Token is invalid, clearing...');
          this.clearToken();
          localStorage.removeItem('strapi_token');
          localStorage.removeItem('strapi_user');
        }
        return false;
      }

      const user = await response.json();
      console.log('✅ Token is valid, user:', user.username, 'ID:', user.id);
      return true;
    } catch (error) {
      console.error('Error checking auth:', error);
      this.clearToken();
      return false;
    }
  }

  // Obtener perfil del usuario
  async getUserProfile() {
    try {
      const response = await fetch(`${config.STRAPI_URL}/api/users/me`, {
        headers: this.getHeaders(),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error getting user profile:', error);
      throw error;
    }
  }
}

// Crear instancia singleton
const strapiService = new StrapiService();

export default strapiService;
