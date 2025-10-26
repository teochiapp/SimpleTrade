// config/priceConfig.js - Configuración para APIs de precios en tiempo real

export const PRICE_PROVIDERS = {
  ALPHAVANTAGE: 'alphavantage',
  IEX_CLOUD: 'iexcloud',
  FINNHUB: 'finnhub',
  POLYGON: 'polygon',
  YAHOO: 'yahoo' // Gratuita pero no oficial
};

export const priceConfig = {
  // Configuración por defecto
  provider: process.env.REACT_APP_PRICE_API_PROVIDER || PRICE_PROVIDERS.ALPHAVANTAGE,
  apiKey: process.env.REACT_APP_PRICE_API_KEY || 'demo', // Demo key para pruebas
  demoMode: true, // Si es true, usa precios mock en lugar de APIs reales (TEMPORALMENTE ACTIVADO)
  
  // URLs base por proveedor
  baseUrls: {
    [PRICE_PROVIDERS.ALPHAVANTAGE]: 'https://www.alphavantage.co/query',
    [PRICE_PROVIDERS.IEX_CLOUD]: 'https://cloud.iexapis.com/stable',
    [PRICE_PROVIDERS.FINNHUB]: 'https://finnhub.io/api/v1',
    [PRICE_PROVIDERS.POLYGON]: 'https://api.polygon.io/v2',
    [PRICE_PROVIDERS.YAHOO]: 'https://query1.finance.yahoo.com/v8/finance/chart'
  },

  // Configuraciones específicas por proveedor
  configs: {
    [PRICE_PROVIDERS.ALPHAVANTAGE]: {
      rateLimit: 5, // calls per minute
      dailyLimit: 500,
      function: 'GLOBAL_QUOTE'
    },
    [PRICE_PROVIDERS.IEX_CLOUD]: {
      rateLimit: 100,
      dailyLimit: 500000
    },
    [PRICE_PROVIDERS.FINNHUB]: {
      rateLimit: 60,
      dailyLimit: null
    },
    [PRICE_PROVIDERS.POLYGON]: {
      rateLimit: 5,
      dailyLimit: null
    },
    [PRICE_PROVIDERS.YAHOO]: {
      rateLimit: 2000, // No oficial, usar con moderación
      dailyLimit: null
    }
  }
};

// Función para obtener URL según el proveedor
export const buildPriceUrl = (symbol, provider = priceConfig.provider, apiKey = priceConfig.apiKey) => {
  const baseUrl = priceConfig.baseUrls[provider];
  
  switch (provider) {
    case PRICE_PROVIDERS.ALPHAVANTAGE:
      return `${baseUrl}?function=${priceConfig.configs[provider].function}&symbol=${symbol}&apikey=${apiKey}`;
    
    case PRICE_PROVIDERS.IEX_CLOUD:
      return `${baseUrl}/stock/${symbol}/quote?token=${apiKey}`;
    
    case PRICE_PROVIDERS.FINNHUB:
      return `${baseUrl}/quote?symbol=${symbol}&token=${apiKey}`;
    
    case PRICE_PROVIDERS.POLYGON:
      return `${baseUrl}/aggs/ticker/${symbol}/prev?adjusted=true&apikey=${apiKey}`;
    
    case PRICE_PROVIDERS.YAHOO:
      return `${baseUrl}/${symbol}?interval=1m&range=1d`;
    
    default:
      throw new Error(`Proveedor no soportado: ${provider}`);
  }
};

// Función para extraer precio de la respuesta según el proveedor
export const extractPriceFromResponse = (data, provider = priceConfig.provider) => {
  console.log(`🔍 Extracting price from response for provider: ${provider}`, data);
  
  try {
    switch (provider) {
      case PRICE_PROVIDERS.ALPHAVANTAGE:
        console.log('🔍 Alpha Vantage response structure:', JSON.stringify(data, null, 2));
        
        // Verificar si existe la estructura esperada
        if (data && data['Global Quote'] && data['Global Quote']['05. price']) {
          const price = parseFloat(data['Global Quote']['05. price']);
          console.log('✅ Extracted price from Global Quote:', price);
          return price;
        }
        
        // Si no existe, intentar otras estructuras posibles de Alpha Vantage
        if (data && data['Time Series (Daily)']) {
          const dates = Object.keys(data['Time Series (Daily)']);
          if (dates.length > 0) {
            const latestDate = dates[0];
            const latestData = data['Time Series (Daily)'][latestDate];
            const price = parseFloat(latestData['4. close']);
            console.log('✅ Extracted price from Time Series:', price);
            return price;
          }
        }
        
        // Verificar si hay un error de rate limit
        if (data && data['Error Message']) {
          console.warn('⚠️ Alpha Vantage API Error:', data['Error Message']);
          throw new Error(`Alpha Vantage API Error: ${data['Error Message']}`);
        }
        
        // Verificar si hay una nota de rate limit
        if (data && data['Note']) {
          console.warn('⚠️ Alpha Vantage Rate Limit:', data['Note']);
          throw new Error(`Alpha Vantage Rate Limit: ${data['Note']}`);
        }
        
        console.error('❌ Unexpected Alpha Vantage response structure:', Object.keys(data || {}));
        throw new Error('Invalid Alpha Vantage response structure');
      
      case PRICE_PROVIDERS.IEX_CLOUD:
        if (data && typeof data.latestPrice !== 'undefined') {
          return parseFloat(data.latestPrice);
        }
        throw new Error('Invalid IEX Cloud response structure');
      
      case PRICE_PROVIDERS.FINNHUB:
        if (data && typeof data.c !== 'undefined') {
          return parseFloat(data.c); // current price
        }
        throw new Error('Invalid Finnhub response structure');
      
      case PRICE_PROVIDERS.POLYGON:
        if (data && data.results && data.results.length > 0 && data.results[0].c) {
          return parseFloat(data.results[0].c); // close price
        }
        throw new Error('Invalid Polygon response structure');
      
      case PRICE_PROVIDERS.YAHOO:
        if (data && data.chart && data.chart.result && data.chart.result[0] && data.chart.result[0].meta) {
          return parseFloat(data.chart.result[0].meta.regularMarketPrice);
        }
        throw new Error('Invalid Yahoo response structure');
    
    default:
      throw new Error(`Proveedor no soportado: ${provider}`);
  }
  } catch (error) {
    console.error(`❌ Error extracting price:`, error);
    throw new Error(`Failed to extract price: ${error.message}`);
  }
};
