# Configuración de Strapi para SimpleTrade

## 🚀 Instalación y Configuración

### 1. Instalar Strapi
```bash
npx create-strapi-app@latest simpletrade-backend --quickstart
cd simpletrade-backend
```

### 2. Crear Content Types

#### A. Trade Content Type
- **Display Name**: Trade
- **API ID**: trade
- **Draft & Publish**: Deshabilitado

**Campos:**
- `symbol` (Text, Short text) - Required
- `type` (Enumeration) - Options: buy, sell
- `entry_price` (Number, Decimal) - Required
- `exit_price` (Number, Decimal) - Optional
- `portfolio_percentage` (Number, Decimal) - Optional
- `stop_loss` (Number, Decimal) - Optional
- `take_profit` (Number, Decimal) - Optional
- `strategy` (Text, Short text) - Optional
- `emotions` (Enumeration) - Options: confident, nervous, greedy, fearful, calm, frustrated
- `notes` (Text, Long text) - Optional
- `status` (Enumeration) - Options: open, closed, cancelled
- `result` (Number, Decimal) - Optional
- `user` (Relation) - Many-to-One con User
- `created_at` (DateTime) - Auto
- `updated_at` (DateTime) - Auto
- `closed_at` (DateTime) - Optional

#### B. Portfolio Content Type (Opcional)
- **Display Name**: Portfolio
- **API ID**: portfolio
- **Draft & Publish**: Deshabilitado

**Campos:**
- `name` (Text, Short text) - Required
- `initial_balance` (Number, Decimal)
- `current_balance` (Number, Decimal)
- `user` (Relation) - Many-to-One con User
- `trades` (Relation) - One-to-Many con Trade

### 3. Configurar Permisos

#### A. Trade Permissions
- **Public Role**: Sin permisos
- **Authenticated Role**: 
  - `find`: ✅
  - `findOne`: ✅
  - `create`: ✅
  - `update`: ✅ (solo propios)
  - `delete`: ✅ (solo propios)

#### B. User Permissions
- **Public Role**: Sin permisos
- **Authenticated Role**:
  - `find`: ❌
  - `findOne`: ✅ (solo propio)
  - `update`: ✅ (solo propio)
  - `delete`: ❌

### 4. Configurar Políticas de Seguridad

#### A. Crear Middleware para Trade Ownership
```javascript
// src/middlewares/trade-ownership.js
module.exports = (config, { strapi }) => {
  return async (ctx, next) => {
    const { user } = ctx.state;
    const { id } = ctx.params;

    if (user && id) {
      const trade = await strapi.entityService.findOne('api::trade.trade', id, {
        populate: ['user']
      });

      if (trade && trade.user.id !== user.id) {
        return ctx.unauthorized('No tienes permisos para acceder a este trade');
      }
    }

    await next();
  };
};
```

#### B. Configurar en routes
```javascript
// src/api/trade/routes/trade.js
module.exports = {
  routes: [
    {
      method: 'PUT',
      path: '/trades/:id',
      handler: 'trade.update',
      config: {
        middlewares: ['plugin::users-permissions.trade-ownership'],
      },
    },
    {
      method: 'DELETE',
      path: '/trades/:id',
      handler: 'trade.delete',
      config: {
        middlewares: ['plugin::users-permissions.trade-ownership'],
      },
    },
  ],
};
```

### 5. Configurar CORS
```javascript
// config/middlewares.js
module.exports = [
  'strapi::errors',
  'strapi::security',
  {
    name: 'strapi::cors',
    config: {
      enabled: true,
      headers: '*',
      origin: ['http://localhost:3000', 'http://localhost:3001']
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
```

### 6. Variables de Entorno
```bash
# .env
HOST=0.0.0.0
PORT=1337
APP_KEYS=your-app-keys
API_TOKEN_SALT=your-api-token-salt
ADMIN_JWT_SECRET=your-admin-jwt-secret
TRANSFER_TOKEN_SALT=your-transfer-token-salt
JWT_SECRET=your-jwt-secret
```

### 7. Comandos Útiles

```bash
# Desarrollo
npm run develop

# Producción
npm run build
npm run start

# Crear usuario admin
npm run strapi admin:create-user
```

## 🔧 Configuración del Frontend

### 1. Instalar dependencias adicionales
```bash
npm install axios
```

### 2. Configurar variables de entorno
```bash
# .env.local
REACT_APP_STRAPI_URL=http://localhost:1337
```

### 3. Actualizar servicios
- Usar `strapiService` en lugar de `tradeService`
- Implementar autenticación con Strapi
- Migrar datos de localStorage a Strapi

## 📊 Ventajas de Strapi para SimpleTrade

1. **Autenticación integrada**: JWT tokens, registro/login automático
2. **API REST automática**: CRUD completo sin código adicional
3. **Relaciones**: Fácil manejo de usuarios y trades
4. **Permisos granulares**: Control de acceso por usuario
5. **Panel de administración**: Gestión visual de datos
6. **Escalabilidad**: Preparado para producción
7. **Plugins**: Extensibilidad con plugins adicionales

## 🚀 Próximos Pasos

1. Instalar y configurar Strapi
2. Crear los Content Types
3. Configurar permisos y seguridad
4. Migrar el frontend para usar Strapi
5. Implementar autenticación real
6. Agregar funcionalidades avanzadas (estadísticas, reportes)
