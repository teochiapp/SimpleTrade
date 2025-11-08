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
        'http://localhost:1337',                // Backend local
        'http://127.0.0.1:3000',                // Frontend desarrollo (127.0.0.1)
        'http://127.0.0.1:3001'                 // Frontend desarrollo alternativo (127.0.0.1)
      ],
      credentials: true,
      keepHeaderOnError: true
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
