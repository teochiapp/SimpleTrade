# Guía de Solución de Problemas - SimpleTrade

## ✅ Problemas Corregidos

### 1. Advertencias de Atributos Booleanos en React
**Problema:** Warnings sobre `positive`, `active`, `primary` como atributos no-booleanos.

**Solución:** ✅ CORREGIDO
- Cambiados todos los props de styled-components a usar el prefijo `$` (transient props)
- Archivos actualizados:
  - `ClosedTradesHistory.js`
  - `TradeList.js`
  - `TradeLogs.js`
  - `LoginModal.js`
  - `ModalStyles.js`
  - `Diversification.js` (ya usaba `$active`)
  - `DevAuth.js` (ya usaba `$active`)

---

## ⚠️ Problemas Pendientes (Requieren Acción Manual)

### 2. Error 403 Forbidden en Strapi

**Síntomas:**
```
:1337/api/trades?populate=*&sort=createdAt:desc:1 Failed to load resource: the server responded with a status of 403 (Forbidden)
:1337/api/users/me:1 Failed to load resource: net::ERR_CONNECTION_REFUSED
```

**Causa:** El servidor Strapi no está corriendo o tiene problemas de permisos.

**Solución:**

#### Paso 1: Iniciar el Servidor Strapi
```bash
cd backend
npm run develop
```

#### Paso 2: Verificar Permisos en Strapi Admin Panel
1. Abre http://localhost:1337/admin
2. Ve a **Settings** → **Users & Permissions Plugin** → **Roles**
3. Para el rol **Authenticated**:
   - ✅ Habilita todos los permisos para `trade`:
     - `find`
     - `findOne`
     - `create`
     - `update`
     - `delete`
   - ✅ Habilita permisos para `user`:
     - `me` (para obtener perfil del usuario)
4. Guarda los cambios

#### Paso 3: Verificar que el Backend Esté Corriendo
```bash
# Deberías ver algo como:
# ┌────────────────────────────────────────────────────┐
# │ Strapi is running at http://localhost:1337        │
# └────────────────────────────────────────────────────┘
```

---

### 3. Error 403 en Finnhub API

**Síntomas:**
```
finnhub.io/api/v1/stock/candle?symbol=SPY&resolution=D&from=...&token=d3t6mg9r01qqdgfufaggd3t6mg9r01qqdgfufah0:1 
Failed to load resource: the server responded with a status of 403
```

**Causa:** La API key de Finnhub está expirada o ha excedido el límite de llamadas gratuitas.

**Solución:**

#### Opción 1: Obtener Nueva API Key de Finnhub (Recomendado)
1. Ve a https://finnhub.io/register
2. Crea una cuenta gratuita
3. Obtén tu API key desde el dashboard
4. Actualiza la API key en:
   - `src/config/environment.js` (línea 5)
   - `src/services/finnhubService.js` (línea 4)

```javascript
// src/config/environment.js
FINNHUB_API_KEY: process.env.REACT_APP_FINNHUB_API_KEY || 'TU_NUEVA_API_KEY',

// src/services/finnhubService.js
this.apiKey = 'TU_NUEVA_API_KEY';
```

#### Opción 2: Usar API Alternativa (Alpha Vantage)
Si prefieres usar Alpha Vantage en lugar de Finnhub:

1. Obtén una API key gratuita en https://www.alphavantage.co/support/#api-key
2. El código ya tiene soporte para Alpha Vantage como fallback
3. Actualiza la configuración en `src/config/environment.js`

#### Opción 3: Modo de Desarrollo (Datos Mock)
Para desarrollo sin API externa, puedes usar datos simulados:

```javascript
// En src/services/finnhubService.js, modifica getQuote():
async getQuote(symbol) {
  // Retornar datos mock para desarrollo
  return {
    symbol: symbol,
    price: 450 + Math.random() * 50,
    change: Math.random() * 10 - 5,
    changePercent: Math.random() * 2 - 1,
    high: 460,
    low: 440,
    open: 445,
    previousClose: 448,
    timestamp: Date.now() / 1000
  };
}
```

---

## 🔍 Verificación de Correcciones

### Para verificar que todo funciona:

1. **Iniciar Backend Strapi:**
   ```bash
   cd backend
   npm run develop
   ```

2. **Iniciar Frontend:**
   ```bash
   cd simpletrade  # (o el directorio raíz del frontend)
   npm start
   ```

3. **Verificar en el navegador:**
   - No deberías ver warnings de atributos booleanos ✅
   - El login debería funcionar (si Strapi está corriendo)
   - Los precios de acciones deberían cargarse (si tienes API key válida)

---

## 📝 Notas Adicionales

### Límites de API Gratuita de Finnhub:
- 60 llamadas por minuto
- El código ya implementa rate limiting (1 segundo entre llamadas)
- Usa caché de 30 segundos para reducir llamadas

### Estructura de Permisos en Strapi:
```
Authenticated Role:
├── trade
│   ├── find ✅
│   ├── findOne ✅
│   ├── create ✅
│   ├── update ✅
│   └── delete ✅
└── user
    └── me ✅
```

### Variables de Entorno (Opcional):
Puedes crear un archivo `.env` en la raíz del proyecto:
```env
REACT_APP_STRAPI_URL=http://localhost:1337
REACT_APP_FINNHUB_API_KEY=tu_api_key_aqui
```

---

## 🆘 Si Sigues Teniendo Problemas

1. **Limpia caché del navegador:** Ctrl + Shift + Delete
2. **Reinicia ambos servidores:** Backend y Frontend
3. **Verifica la consola del navegador:** F12 → Console
4. **Verifica logs del backend Strapi:** Mira la terminal donde corre Strapi
5. **Verifica que los puertos estén libres:**
   - Frontend: http://localhost:3000
   - Backend: http://localhost:1337
