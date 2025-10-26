// services/alphaVantageService.js - Servicio para Alpha Vantage API con rate limiting
class AlphaVantageService {
  constructor() {
    this.apiKey = '4BR3BBMJ52TRY1TU';
    this.baseURL = 'https://www.alphavantage.co/query';
    this.cache = new Map();
    this.lastCallTime = 0;
    this.callCount = 0;
    this.maxCallsPerMinute = 4; // Reducido para evitar límites
    this.minIntervalBetweenCalls = 15000; // 15 segundos entre llamadas
  }

  // Rate limiting: esperar si es necesario
  async waitForRateLimit() {
    const now = Date.now();
    const timeSinceLastCall = now - this.lastCallTime;
    
    if (timeSinceLastCall < this.minIntervalBetweenCalls) {
      const waitTime = this.minIntervalBetweenCalls - timeSinceLastCall;
      console.log(`Esperando ${waitTime}ms para respetar rate limit...`);
      await new Promise(resolve => setTimeout(resolve, waitTime));
    }
    
    this.lastCallTime = Date.now();
    this.callCount++;
  }

  // Verificar cache antes de hacer llamada
  getFromCache(key) {
    const cached = this.cache.get(key);
    if (cached && Date.now() - cached.timestamp < 60000) { // Cache válido por 1 minuto
      return cached.data;
    }
    return null;
  }

  // Guardar en cache
  setCache(key, data) {
    this.cache.set(key, {
      data,
      timestamp: Date.now()
    });
  }

  // Limpiar cache viejo
  cleanCache() {
    const now = Date.now();
    for (const [key, value] of this.cache.entries()) {
      if (now - value.timestamp > 300000) { // Limpiar cache de más de 5 minutos
        this.cache.delete(key);
      }
    }
  }

  // Obtener cotización en tiempo real
  async getQuote(symbol) {
    try {
      // Verificar cache primero
      const cacheKey = `quote_${symbol}`;
      const cachedData = this.getFromCache(cacheKey);
      if (cachedData) {
        console.log(`Usando datos en cache para ${symbol}`);
        return cachedData;
      }

      // Rate limiting
      await this.waitForRateLimit();

      const response = await fetch(
        `${this.baseURL}?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${this.apiKey}`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data['Error Message']) {
        throw new Error(data['Error Message']);
      }
      
      if (data['Note']) {
        throw new Error('API call frequency limit reached. Please try again later.');
      }
      
      const quote = data['Global Quote'];
      if (!quote) {
        throw new Error('No data available for this symbol');
      }
      
      const result = {
        symbol: quote['01. symbol'],
        open: parseFloat(quote['02. open']),
        high: parseFloat(quote['03. high']),
        low: parseFloat(quote['04. low']),
        price: parseFloat(quote['05. price']),
        volume: parseInt(quote['06. volume']),
        latestTradingDay: quote['07. latest trading day'],
        previousClose: parseFloat(quote['08. previous close']),
        change: parseFloat(quote['09. change']),
        changePercent: quote['10. change percent'].replace('%', '')
      };

      // Guardar en cache
      this.setCache(cacheKey, result);
      this.cleanCache();
      
      return result;
    } catch (error) {
      console.error('Error fetching quote:', error);
      throw error;
    }
  }

  // Obtener datos históricos (diarios)
  async getDailyData(symbol, outputsize = 'compact') {
    try {
      const response = await fetch(
        `${this.baseURL}?function=TIME_SERIES_DAILY&symbol=${symbol}&outputsize=${outputsize}&apikey=${this.apiKey}`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data['Error Message']) {
        throw new Error(data['Error Message']);
      }
      
      if (data['Note']) {
        throw new Error('API call frequency limit reached. Please try again later.');
      }
      
      const timeSeries = data['Time Series (Daily)'];
      if (!timeSeries) {
        throw new Error('No historical data available for this symbol');
      }
      
      // Convertir datos a formato más usable
      const dailyData = Object.entries(timeSeries).map(([date, values]) => ({
        date,
        open: parseFloat(values['1. open']),
        high: parseFloat(values['2. high']),
        low: parseFloat(values['3. low']),
        close: parseFloat(values['4. close']),
        volume: parseInt(values['5. volume'])
      }));
      
      return dailyData.sort((a, b) => new Date(a.date) - new Date(b.date));
    } catch (error) {
      console.error('Error fetching daily data:', error);
      throw error;
    }
  }

  // Obtener múltiples cotizaciones con rate limiting
  async getMultipleQuotes(symbols) {
    try {
      const results = [];
      
      // Procesar símbolos uno por uno para respetar rate limits
      for (let i = 0; i < symbols.length; i++) {
        const symbol = symbols[i];
        try {
          const quote = await this.getQuote(symbol);
          results.push({
            symbol,
            data: quote,
            error: null
          });
        } catch (error) {
          console.warn(`Error obteniendo datos para ${symbol}:`, error.message);
          results.push({
            symbol,
            data: null,
            error: error.message
          });
        }
        
        // Pausa entre símbolos para evitar rate limiting
        if (i < symbols.length - 1) {
          await new Promise(resolve => setTimeout(resolve, 2000)); // 2 segundos entre símbolos
        }
      }
      
      return results;
    } catch (error) {
      console.error('Error fetching multiple quotes:', error);
      throw error;
    }
  }

  // Buscar símbolos
  async searchSymbol(keywords) {
    try {
      const response = await fetch(
        `${this.baseURL}?function=SYMBOL_SEARCH&keywords=${keywords}&apikey=${this.apiKey}`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data['Error Message']) {
        throw new Error(data['Error Message']);
      }
      
      if (data['Note']) {
        throw new Error('API call frequency limit reached. Please try again later.');
      }
      
      const matches = data['bestMatches'];
      if (!matches) {
        return [];
      }
      
      return matches.map(match => ({
        symbol: match['1. symbol'],
        name: match['2. name'],
        type: match['3. type'],
        region: match['4. region'],
        marketOpen: match['5. marketOpen'],
        marketClose: match['6. marketClose'],
        timezone: match['7. timezone'],
        currency: match['8. currency'],
        matchScore: match['9. matchScore']
      }));
    } catch (error) {
      console.error('Error searching symbols:', error);
      throw error;
    }
  }

  // Obtener información técnica (RSI)
  async getRSI(symbol, timePeriod = 14) {
    try {
      const response = await fetch(
        `${this.baseURL}?function=RSI&symbol=${symbol}&interval=daily&time_period=${timePeriod}&series_type=close&apikey=${this.apiKey}`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data['Error Message']) {
        throw new Error(data['Error Message']);
      }
      
      if (data['Note']) {
        throw new Error('API call frequency limit reached. Please try again later.');
      }
      
      const technicalData = data['Technical Analysis: RSI'];
      if (!technicalData) {
        throw new Error('No RSI data available for this symbol');
      }
      
      return Object.entries(technicalData).map(([date, values]) => ({
        date,
        rsi: parseFloat(values['RSI'])
      })).sort((a, b) => new Date(a.date) - new Date(b.date));
    } catch (error) {
      console.error('Error fetching RSI:', error);
      throw error;
    }
  }
}

// Crear instancia singleton
const alphaVantageService = new AlphaVantageService();

export default alphaVantageService;
