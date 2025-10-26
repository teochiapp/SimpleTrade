// config/environment.js - Configuración de variables de entorno
const config = {
  // URLs de APIs
  STRAPI_URL: process.env.REACT_APP_STRAPI_URL || 'http://localhost:1337',
  FINNHUB_API_KEY: process.env.REACT_APP_FINNHUB_API_KEY || 'd3t6mg9r01qqdgfufaggd3t6mg9r01qqdgfufah0',
  
  // Configuración de la aplicación
  APP_NAME: 'SimpleTrade',
  APP_VERSION: '1.0.0',
  
  // Configuración de desarrollo
  IS_DEVELOPMENT: process.env.NODE_ENV === 'development',
  IS_PRODUCTION: process.env.NODE_ENV === 'production',
};

export default config;
