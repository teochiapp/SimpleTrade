# Configuración de Variables de Entorno para SimpleTrade

## Frontend (.env.local)
```
REACT_APP_STRAPI_URL=http://localhost:1337
REACT_APP_FINNHUB_API_KEY=d3t6mg9r01qqdgfufaggd3t6mg9r01qqdgfufah0
```

## Backend Strapi (.env)
```
HOST=0.0.0.0
PORT=1337
APP_KEYS=your-app-key-1,your-app-key-2
API_TOKEN_SALT=your-api-token-salt
ADMIN_JWT_SECRET=your-admin-jwt-secret
TRANSFER_TOKEN_SALT=your-transfer-token-salt
JWT_SECRET=your-jwt-secret
```

## Instrucciones de Uso

### 1. Configurar Frontend
```bash
# En el directorio raíz del proyecto
echo "REACT_APP_STRAPI_URL=http://localhost:1337" > .env.local
echo "REACT_APP_FINNHUB_API_KEY=d3t6mg9r01qqdgfufaggd3t6mg9r01qqdgfufah0" >> .env.local
```

### 2. Configurar Backend
```bash
# En el directorio simpletrade-backend
echo "HOST=0.0.0.0" > .env
echo "PORT=1337" >> .env
echo "APP_KEYS=simpletrade-app-key-1,simpletrade-app-key-2" >> .env
echo "API_TOKEN_SALT=simpletrade-api-token-salt" >> .env
echo "ADMIN_JWT_SECRET=simpletrade-admin-jwt-secret" >> .env
echo "TRANSFER_TOKEN_SALT=simpletrade-transfer-token-salt" >> .env
echo "JWT_SECRET=simpletrade-jwt-secret" >> .env
```

### 3. Iniciar Servicios

#### Terminal 1 - Backend Strapi
```bash
cd simpletrade-backend
npm run develop
```

#### Terminal 2 - Frontend React
```bash
npm start
```

### 4. Configurar Strapi Admin
1. Abrir http://localhost:1337/admin
2. Crear cuenta de administrador
3. Configurar permisos para el Content Type "Trade"
4. Crear usuario de prueba

### 5. Probar Integración
1. Abrir http://localhost:3000
2. Hacer login con usuario de prueba
3. Ir a Dashboard → Resumen de Trades
4. Crear un trade de prueba
5. Verificar que aparece en el historial

## Estructura de Datos Strapi

### Trade Content Type
```json
{
  "symbol": "AAPL",
  "type": "buy",
  "entry_price": 150.25,
  "exit_price": null,
  "portfolio_percentage": 5.0,
  "stop_loss": 145.00,
  "take_profit": 160.00,
  "strategy": "Breakout",
  "emotions": "confident",
  "notes": "Análisis técnico...",
  "status": "open",
  "result": null,
  "user": "relation_to_user",
  "created_at": "2024-01-01T10:00:00Z",
  "closed_at": null
}
```

## Troubleshooting

### Error de CORS
- Verificar que CORS esté configurado en `config/middlewares.js`
- Asegurar que las URLs estén en la lista de orígenes permitidos

### Error de Autenticación
- Verificar que el token JWT esté siendo enviado correctamente
- Comprobar que el usuario tenga permisos en Strapi

### Error de Base de Datos
- Verificar que SQLite esté instalado
- Comprobar que el archivo `database/data.db` se esté creando

### Error de API
- Verificar que Strapi esté corriendo en puerto 1337
- Comprobar que las rutas estén configuradas correctamente
