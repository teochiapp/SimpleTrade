module.exports = [
  'strapi::errors',
  'strapi::security',
  {
    name: 'strapi::cors',
    config: {
      enabled: true,
      headers: ['Content-Type', 'Authorization', 'Origin', 'Accept'],
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
      origin: [
        'https://simplitrade.surcodes.com',     // Frontend en producción
        'https://admin.simplitrade.surcodes.com', // Admin panel
        'http://localhost:3000',                // Frontend desarrollo
        'http://localhost:3001',                // Frontend desarrollo alternativo
        'http://localhost:1337'                // Backend local
      ]
    }
  },
  'strapi::poweredBy',
  'strapi::logger',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
