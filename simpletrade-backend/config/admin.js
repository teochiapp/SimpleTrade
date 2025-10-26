module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', 'your-admin-jwt-secret-key-for-development-only'),
  },
  apiToken: {
    salt: env('API_TOKEN_SALT', 'your-api-token-salt-for-development-only'),
  },
  transfer: {
    token: {
      salt: env('TRANSFER_TOKEN_SALT', 'your-transfer-token-salt-for-development-only'),
    },
  },
  flags: {
    nps: env.bool('FLAG_NPS', true),
    promoteEE: env.bool('FLAG_PROMOTE_EE', true),
  },
});

