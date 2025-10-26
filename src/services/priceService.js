// services/priceService.js - Servicio para obtener precios en tiempo real
import { priceConfig, buildPriceUrl, extractPriceFromResponse } from '../config/priceConfig';

class PriceService {
  constructor() {
    this.config = priceConfig;
    this.cache = new Map(); // Cache para evitar muchas llamadas
    this.cacheExpiry = 12 * 60 * 60 * 1000; // 12 horas de cache (la mitad de 24h para seguridad)
    
    console.log('🔧 PriceService inicializado con:', {
      provider: this.config.provider,
      hasApiKey: !!this.config.apiKey && this.config.apiKey !== 'demo'
    });
  }

  // Método genérico para obtener precio actual
  async getCurrentPrice(symbol) {
    try {
      // Si está en modo demo, generar precio mock directamente
      if (this.config.demoMode) {
        console.log(`🎭 Demo mode enabled - generating mock price for ${symbol}`);
        const mockPrice = this.generateMockPrice(symbol);
        console.log(`🎭 Mock price for ${symbol}: $${mockPrice}`);
        return mockPrice;
      }
      
      // Verificar cache primero
      const cacheKey = symbol.toUpperCase();
      const cached = this.cache.get(cacheKey);
      
      if (cached && Date.now() - cached.timestamp < this.cacheExpiry) {
        const hoursOld = Math.round((Date.now() - cached.timestamp) / (1000 * 60 * 60));
        const priceType = cached.isMock ? 'mock' : 'real';
        console.log(`📦 Cache hit para ${symbol}: $${cached.price} (${hoursOld}h antiguo, ${priceType})`);
        return cached.price;
      }

      console.log(`🔍 Obteniendo precio para ${symbol} desde ${this.config.provider}`);
      
      // Construir URL según el proveedor configurado
      const url = buildPriceUrl(symbol, this.config.provider, this.config.apiKey);
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: Error fetching price for ${symbol}`);
      }

      const data = await response.json();
      
      // Extraer precio según el proveedor
      const currentPrice = extractPriceFromResponse(data, this.config.provider);
      
      if (!currentPrice || isNaN(currentPrice)) {
        throw new Error(`Invalid price data for ${symbol}`);
      }
      
      // Guardar en cache
      this.cache.set(cacheKey, {
        price: currentPrice,
        timestamp: Date.now()
      });

      console.log(`💰 Precio ${symbol}: $${currentPrice}`);
      return currentPrice;
    } catch (error) {
      console.error(`❌ Error getting price for ${symbol}:`, error);
      
      // Generar precio mock en caso de error
      console.log(`🎭 Generando precio mock para ${symbol} debido a error de API`);
      console.log(`🎭 Tipo de error:`, error.message);
      
      const mockPrice = this.generateMockPrice(symbol);
      
      // Guardar precio mock en cache
      const cacheKey = `${symbol.toUpperCase()}_${this.config.provider}`;
      this.cache.set(cacheKey, {
        price: mockPrice,
        timestamp: Date.now(),
        isMock: true // Marcar como precio mock
      });
      
      console.log(`🎭 Precio mock generado para ${symbol}: $${mockPrice}`);
      return mockPrice;
    }
  }

  // Método para obtener múltiples precios de una vez
  async getMultiplePrices(symbols) {
    const promises = symbols.map(symbol => this.getCurrentPrice(symbol));
    const results = await Promise.allSettled(promises);
    
    const prices = {};
    symbols.forEach((symbol, index) => {
      if (results[index].status === 'fulfilled') {
        prices[symbol.toUpperCase()] = results[index].value;
      } else {
        prices[symbol.toUpperCase()] = null;
      }
    });

    return prices;
  }

  // Generar precio simulado para demo
  generateMockPrice(symbol) {
    // Precios base simulados para diferentes símbolos
    const basePrices = {
      'AAPL': 150,
      'GOOGL': 130,
      'MSFT': 300,
      'TSLA': 200,
      'AMZN': 120,
      'NVDA': 400,
      'META': 250
    };
    
    const basePrice = basePrices[symbol.toUpperCase()] || 100;
    // Agregar variación aleatoria de ±5%
    const variation = (Math.random() - 0.5) * 0.1; // -5% a +5%
    const mockPrice = basePrice * (1 + variation);
    
    console.log(`🎭 Precio simulado para ${symbol}: $${mockPrice.toFixed(2)}`);
    return parseFloat(mockPrice.toFixed(2));
  }

  // Método de utilidad para calcular ganancia/pérdida no realizada
  calculateUnrealizedPnL(entryPrice, currentPrice, tradeType) {
    if (!currentPrice || !entryPrice) return 0;

    let pnlPercent = 0;
    if (tradeType === 'buy') {
      pnlPercent = ((currentPrice - entryPrice) / entryPrice) * 100;
    } else { // sell (short)
      pnlPercent = ((entryPrice - currentPrice) / entryPrice) * 100;
    }

    return pnlPercent;
  }

  // Limpiar cache manualmente si es necesario
  clearCache() {
    this.cache.clear();
  }
}

export default new PriceService();
