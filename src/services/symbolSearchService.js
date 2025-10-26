// services/symbolSearchService.js - Servicio para búsqueda de símbolos
import { priceConfig, PRICE_PROVIDERS } from '../config/priceConfig';

class SymbolSearchService {
  constructor() {
    this.config = priceConfig;
    this.cache = new Map(); // Cache para búsquedas
    this.cacheExpiry = 300000; // 5 minutos de cache
    
    console.log('🔍 SymbolSearchService inicializado con:', {
      provider: this.config.provider,
      hasApiKey: !!this.config.apiKey && this.config.apiKey !== 'demo'
    });
  }

  // Método principal para buscar símbolos
  async searchSymbols(query) {
    if (!query || query.length < 2) {
      return this.getPopularSymbols();
    }

    try {
      // Verificar cache primero
      const cacheKey = query.toLowerCase();
      const cached = this.cache.get(cacheKey);
      
      if (cached && Date.now() - cached.timestamp < this.cacheExpiry) {
        console.log(`📦 Cache hit para búsqueda: ${query}`);
        return cached.results;
      }

      console.log(`🔍 Buscando símbolos para: "${query}"`);
      
      let results = [];
      
      // Si es demo key, usar símbolos predefinidos
      if (this.config.apiKey === 'demo') {
        results = this.searchMockSymbols(query);
      } else {
        // Usar API real según el proveedor
        results = await this.searchRealSymbols(query);
      }
      
      // Guardar en cache
      this.cache.set(cacheKey, {
        results,
        timestamp: Date.now()
      });

      return results;
    } catch (error) {
      console.error(`❌ Error buscando símbolos para "${query}":`, error);
      // Fallback a símbolos populares en caso de error
      return this.getPopularSymbols().filter(symbol => 
        symbol.symbol.toLowerCase().includes(query.toLowerCase()) ||
        symbol.name.toLowerCase().includes(query.toLowerCase())
      );
    }
  }

  // Búsqueda en símbolos predefinidos (modo demo)
  searchMockSymbols(query) {
    const mockSymbols = this.getAllMockSymbols();
    const queryLower = query.toLowerCase();
    
    return mockSymbols.filter(symbol => 
      symbol.symbol.toLowerCase().includes(queryLower) ||
      symbol.name.toLowerCase().includes(queryLower) ||
      symbol.sector.toLowerCase().includes(queryLower)
    ).slice(0, 10); // Máximo 10 resultados
  }

  // Búsqueda usando APIs reales
  async searchRealSymbols(query) {
    switch (this.config.provider) {
      case PRICE_PROVIDERS.ALPHAVANTAGE:
        return await this.searchAlphaVantage(query);
      
      case PRICE_PROVIDERS.IEX_CLOUD:
        return await this.searchIEXCloud(query);
      
      case PRICE_PROVIDERS.FINNHUB:
        return await this.searchFinnhub(query);
        
      default:
        return this.searchMockSymbols(query);
    }
  }

  // Búsqueda en Alpha Vantage
  async searchAlphaVantage(query) {
    const url = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${encodeURIComponent(query)}&apikey=${this.config.apiKey}`;
    
    const response = await fetch(url);
    if (!response.ok) throw new Error('Error en Alpha Vantage search');
    
    const data = await response.json();
    
    if (!data.bestMatches) return [];
    
    return data.bestMatches.slice(0, 10).map(match => ({
      symbol: match['1. symbol'],
      name: match['2. name'],
      type: match['3. type'],
      region: match['4. region'],
      currency: match['8. currency'],
      sector: 'Unknown', // Alpha Vantage no incluye sector en búsqueda
      price: null // Se obtiene por separado si es necesario
    }));
  }

  // Búsqueda en IEX Cloud
  async searchIEXCloud(query) {
    const url = `https://cloud.iexapis.com/stable/search/${encodeURIComponent(query)}?token=${this.config.apiKey}`;
    
    const response = await fetch(url);
    if (!response.ok) throw new Error('Error en IEX Cloud search');
    
    const data = await response.json();
    
    return data.slice(0, 10).map(item => ({
      symbol: item.symbol,
      name: item.securityName,
      type: item.securityType,
      region: item.region || 'US',
      currency: 'USD',
      sector: item.sector || 'Unknown',
      price: null
    }));
  }

  // Búsqueda en Finnhub
  async searchFinnhub(query) {
    const url = `https://finnhub.io/api/v1/search?q=${encodeURIComponent(query)}&token=${this.config.apiKey}`;
    
    const response = await fetch(url);
    if (!response.ok) throw new Error('Error en Finnhub search');
    
    const data = await response.json();
    
    if (!data.result) return [];
    
    return data.result.slice(0, 10).map(item => ({
      symbol: item.symbol,
      name: item.description,
      type: item.type,
      region: 'US', // Finnhub principalmente US
      currency: 'USD',
      sector: 'Unknown',
      price: null
    }));
  }

  // Símbolos populares por defecto
  getPopularSymbols() {
    return [
      // 🇺🇸 Tecnología
      { symbol: 'AAPL', name: 'Apple Inc.', sector: 'Tecnología', region: 'US', currency: 'USD', type: 'Equity' },
      { symbol: 'GOOGL', name: 'Alphabet Inc. (Google)', sector: 'Tecnología', region: 'US', currency: 'USD', type: 'Equity' },
      { symbol: 'MSFT', name: 'Microsoft Corporation', sector: 'Tecnología', region: 'US', currency: 'USD', type: 'Equity' },
      { symbol: 'AMZN', name: 'Amazon.com Inc.', sector: 'E-commerce', region: 'US', currency: 'USD', type: 'Equity' },
      { symbol: 'TSLA', name: 'Tesla Inc.', sector: 'Automotriz', region: 'US', currency: 'USD', type: 'Equity' },
      { symbol: 'META', name: 'Meta Platforms Inc. (Facebook)', sector: 'Tecnología', region: 'US', currency: 'USD', type: 'Equity' },
      { symbol: 'NVDA', name: 'NVIDIA Corporation', sector: 'Tecnología', region: 'US', currency: 'USD', type: 'Equity' },
      { symbol: 'NFLX', name: 'Netflix Inc.', sector: 'Entretenimiento', region: 'US', currency: 'USD', type: 'Equity' },
      
      // 🇺🇸 Financiero
      { symbol: 'JPM', name: 'JPMorgan Chase & Co.', sector: 'Financiero', region: 'US', currency: 'USD', type: 'Equity' },
      { symbol: 'BAC', name: 'Bank of America Corp.', sector: 'Financiero', region: 'US', currency: 'USD', type: 'Equity' },
      
      // 🇦🇷 Argentina
      { symbol: 'YPFD', name: 'YPF S.A.', sector: 'Energía', region: 'AR', currency: 'ARS', type: 'Equity' },
      { symbol: 'PAMP', name: 'Pampa Energía S.A.', sector: 'Energía', region: 'AR', currency: 'ARS', type: 'Equity' },
      { symbol: 'BMA', name: 'Banco Macro S.A.', sector: 'Financiero', region: 'AR', currency: 'ARS', type: 'Equity' },
      
      // 🇧🇷 Brasil
      { symbol: 'VALE', name: 'Vale S.A.', sector: 'Minería', region: 'BR', currency: 'BRL', type: 'Equity' },
      { symbol: 'PETR4', name: 'Petróleo Brasileiro S.A.', sector: 'Energía', region: 'BR', currency: 'BRL', type: 'Equity' },
      
      // 🏦 Crypto
      { symbol: 'BTC', name: 'Bitcoin', sector: 'Criptomoneda', region: 'Global', currency: 'USD', type: 'Crypto' },
      { symbol: 'ETH', name: 'Ethereum', sector: 'Criptomoneda', region: 'Global', currency: 'USD', type: 'Crypto' }
    ];
  }

  // Todos los símbolos mock para búsqueda
  getAllMockSymbols() {
    return [
      // 🇺🇸 Estados Unidos - Tecnología
      { symbol: 'AAPL', name: 'Apple Inc.', sector: 'Tecnología', region: 'US', currency: 'USD', type: 'Equity' },
      { symbol: 'GOOGL', name: 'Alphabet Inc. (Google)', sector: 'Tecnología', region: 'US', currency: 'USD', type: 'Equity' },
      { symbol: 'GOOG', name: 'Alphabet Inc. Class A', sector: 'Tecnología', region: 'US', currency: 'USD', type: 'Equity' },
      { symbol: 'MSFT', name: 'Microsoft Corporation', sector: 'Tecnología', region: 'US', currency: 'USD', type: 'Equity' },
      { symbol: 'META', name: 'Meta Platforms Inc.', sector: 'Tecnología', region: 'US', currency: 'USD', type: 'Equity' },
      { symbol: 'NVDA', name: 'NVIDIA Corporation', sector: 'Tecnología', region: 'US', currency: 'USD', type: 'Equity' },
      { symbol: 'ADBE', name: 'Adobe Inc.', sector: 'Tecnología', region: 'US', currency: 'USD', type: 'Equity' },
      { symbol: 'CRM', name: 'Salesforce Inc.', sector: 'Tecnología', region: 'US', currency: 'USD', type: 'Equity' },
      { symbol: 'INTC', name: 'Intel Corporation', sector: 'Tecnología', region: 'US', currency: 'USD', type: 'Equity' },
      { symbol: 'AMD', name: 'Advanced Micro Devices', sector: 'Tecnología', region: 'US', currency: 'USD', type: 'Equity' },
      
      // 🇺🇸 E-commerce y Consumo
      { symbol: 'AMZN', name: 'Amazon.com Inc.', sector: 'E-commerce', region: 'US', currency: 'USD', type: 'Equity' },
      { symbol: 'TSLA', name: 'Tesla Inc.', sector: 'Automotriz', region: 'US', currency: 'USD', type: 'Equity' },
      { symbol: 'NFLX', name: 'Netflix Inc.', sector: 'Entretenimiento', region: 'US', currency: 'USD', type: 'Equity' },
      { symbol: 'DIS', name: 'Walt Disney Company', sector: 'Entretenimiento', region: 'US', currency: 'USD', type: 'Equity' },
      { symbol: 'NKE', name: 'Nike Inc.', sector: 'Consumo', region: 'US', currency: 'USD', type: 'Equity' },
      
      // 🇺🇸 Financiero
      { symbol: 'JPM', name: 'JPMorgan Chase & Co.', sector: 'Financiero', region: 'US', currency: 'USD', type: 'Equity' },
      { symbol: 'BAC', name: 'Bank of America Corp.', sector: 'Financiero', region: 'US', currency: 'USD', type: 'Equity' },
      { symbol: 'WFC', name: 'Wells Fargo & Company', sector: 'Financiero', region: 'US', currency: 'USD', type: 'Equity' },
      { symbol: 'GS', name: 'Goldman Sachs Group Inc.', sector: 'Financiero', region: 'US', currency: 'USD', type: 'Equity' },
      
      // 🇺🇸 Salud
      { symbol: 'JNJ', name: 'Johnson & Johnson', sector: 'Salud', region: 'US', currency: 'USD', type: 'Equity' },
      { symbol: 'PFE', name: 'Pfizer Inc.', sector: 'Salud', region: 'US', currency: 'USD', type: 'Equity' },
      { symbol: 'UNH', name: 'UnitedHealth Group Inc.', sector: 'Salud', region: 'US', currency: 'USD', type: 'Equity' },
      { symbol: 'MRNA', name: 'Moderna Inc.', sector: 'Salud', region: 'US', currency: 'USD', type: 'Equity' },
      
      // 🇺🇸 Energía
      { symbol: 'XOM', name: 'Exxon Mobil Corporation', sector: 'Energía', region: 'US', currency: 'USD', type: 'Equity' },
      { symbol: 'CVX', name: 'Chevron Corporation', sector: 'Energía', region: 'US', currency: 'USD', type: 'Equity' },
      
      // 🇦🇷 Argentina
      { symbol: 'YPFD', name: 'YPF S.A.', sector: 'Energía', region: 'AR', currency: 'ARS', type: 'Equity' },
      { symbol: 'PAMP', name: 'Pampa Energía S.A.', sector: 'Energía', region: 'AR', currency: 'ARS', type: 'Equity' },
      { symbol: 'TECO2', name: 'Telecom Argentina S.A.', sector: 'Telecomunicaciones', region: 'AR', currency: 'ARS', type: 'Equity' },
      { symbol: 'BMA', name: 'Banco Macro S.A.', sector: 'Financiero', region: 'AR', currency: 'ARS', type: 'Equity' },
      { symbol: 'SUPV', name: 'Grupo Supervielle S.A.', sector: 'Financiero', region: 'AR', currency: 'ARS', type: 'Equity' },
      { symbol: 'CEPU', name: 'Central Puerto S.A.', sector: 'Utilities', region: 'AR', currency: 'ARS', type: 'Equity' },
      
      // 🇧🇷 Brasil
      { symbol: 'VALE', name: 'Vale S.A.', sector: 'Minería', region: 'BR', currency: 'BRL', type: 'Equity' },
      { symbol: 'PETR4', name: 'Petróleo Brasileiro S.A. (Petrobras)', sector: 'Energía', region: 'BR', currency: 'BRL', type: 'Equity' },
      { symbol: 'ITUB', name: 'Itaú Unibanco Holding S.A.', sector: 'Financiero', region: 'BR', currency: 'BRL', type: 'Equity' },
      { symbol: 'BBDC4', name: 'Banco Bradesco S.A.', sector: 'Financiero', region: 'BR', currency: 'BRL', type: 'Equity' },
      { symbol: 'ABEV', name: 'Ambev S.A.', sector: 'Consumo', region: 'BR', currency: 'BRL', type: 'Equity' },
      
      // 🇨🇳 China
      { symbol: 'BABA', name: 'Alibaba Group Holding Ltd.', sector: 'E-commerce', region: 'CN', currency: 'USD', type: 'Equity' },
      { symbol: 'JD', name: 'JD.com Inc.', sector: 'E-commerce', region: 'CN', currency: 'USD', type: 'Equity' },
      { symbol: 'TCEHY', name: 'Tencent Holdings Ltd.', sector: 'Tecnología', region: 'CN', currency: 'USD', type: 'Equity' },
      { symbol: 'NIO', name: 'NIO Inc.', sector: 'Automotriz', region: 'CN', currency: 'USD', type: 'Equity' },
      { symbol: 'BIDU', name: 'Baidu Inc.', sector: 'Tecnología', region: 'CN', currency: 'USD', type: 'Equity' },
      
      // 🏦 Criptomonedas
      { symbol: 'BTC', name: 'Bitcoin', sector: 'Criptomoneda', region: 'Global', currency: 'USD', type: 'Crypto' },
      { symbol: 'ETH', name: 'Ethereum', sector: 'Criptomoneda', region: 'Global', currency: 'USD', type: 'Crypto' },
      { symbol: 'ADA', name: 'Cardano', sector: 'Criptomoneda', region: 'Global', currency: 'USD', type: 'Crypto' },
      { symbol: 'SOL', name: 'Solana', sector: 'Criptomoneda', region: 'Global', currency: 'USD', type: 'Crypto' },
      { symbol: 'MATIC', name: 'Polygon', sector: 'Criptomoneda', region: 'Global', currency: 'USD', type: 'Crypto' }
    ];
  }

  // Limpiar cache manualmente
  clearCache() {
    this.cache.clear();
  }
}

export default new SymbolSearchService();
