# 🛠️ Guía de Resolución de Problemas - SimpleTrade

## 🚨 **Problemas Comunes y Soluciones**

### **1. 🔴 Error de API de Precios**

#### **Síntoma:**
```
❌ Error getting price for YPFD: TypeError: Cannot read properties of undefined (reading '05. price')
```

#### **Causa:**
- La API de Alpha Vantage está devolviendo una estructura de respuesta diferente
- La API key puede ser "demo" o inválida
- Rate limiting o límites de uso excedidos

#### **Solución Implementada:**
✅ **Manejo robusto de errores** - El sistema ahora:
- Verifica la estructura de respuesta antes de extraer datos
- Genera precios mock automáticamente si falla la API
- Cachea los precios mock para evitar requests repetidos
- Incluye logging detallado para debugging

#### **Código de Solución:**
```javascript
// priceConfig.js - Extracción robusta
if (data && data['Global Quote'] && data['Global Quote']['05. price']) {
  return parseFloat(data['Global Quote']['05. price']);
}
// Fallback automático a precios mock
```

---

### **2. 🔴 Error 401 Unauthorized**

#### **Síntoma:**
```
PUT http://localhost:1337/api/trades/1 401 (Unauthorized)
Error updating trade: Error: HTTP error! status: 401
```

#### **Causa:**
- Token de autenticación expirado o inválido
- Token no se está enviando correctamente en headers
- Sesión perdida o corrupta

#### **Solución Implementada:**
✅ **Manejo inteligente de autenticación** - El sistema ahora:
- Verifica presencia del token antes de requests
- Detecta tokens expirados automáticamente
- Limpia tokens inválidos y solicita re-login
- Incluye logging detallado de autenticación

#### **Código de Solución:**
```javascript
// strapiService.js - Manejo de 401
if (response.status === 401) {
  console.log('🔓 Token expired or invalid, clearing...');
  this.clearToken();
  throw new Error('Token expired - please login again');
}
```

---

### **3. 🟡 Problemas de Caché de Precios**

#### **Síntoma:**
- Precios no se actualizan
- "Cargando..." permanente

#### **Solución:**
```javascript
// Limpiar cache manualmente
localStorage.clear();
// O usar el botón "Actualizar Manual"
```

---

### **4. 🟡 Problemas de CORS**

#### **Síntoma:**
```
Access to fetch at 'https://www.alphavantage.co/...' has been blocked by CORS policy
```

#### **Solución:**
- Usar un proxy o servidor intermedio
- Cambiar a API que soporte CORS
- Configurar el servidor para permitir CORS

---

## 🔧 **Debugging Steps**

### **Paso 1: Verificar Console**
1. Abrir Developer Tools (F12)
2. Ir a Console tab
3. Buscar mensajes con emoji: 🔐, 💰, ❌, 🎭

### **Paso 2: Verificar Network**
1. Ir a Network tab
2. Reproducir el problema
3. Verificar requests fallidos (rojo)
4. Revisar headers de autenticación

### **Paso 3: Verificar LocalStorage**
1. Ir a Application tab
2. Local Storage → localhost
3. Verificar `strapi_token`

### **Paso 4: Verificar Strapi Backend**
1. Verificar que Strapi esté corriendo (puerto 1337)
2. Revisar logs de Strapi en terminal
3. Verificar permisos en Strapi Admin

---

## 🛡️ **Medidas Preventivas**

### **1. Monitoreo de API**
```javascript
// El sistema ahora incluye:
- Logs detallados de requests
- Manejo automático de errores
- Fallbacks inteligentes
- Cache resiliente
```

### **2. Gestión de Sesiones**
```javascript
// Autenticación robusta:
- Verificación automática de tokens
- Limpieza de tokens expirados
- Re-direccionamiento a login
- Logging de estados de auth
```

### **3. Precio Mock Inteligente**
```javascript
// Sistema de precios de respaldo:
- Precios base realistas por símbolo
- Variación aleatoria para simular mercado
- Cache persistente
- Actualización automática
```

---

## 📊 **Indicadores de Salud del Sistema**

### **✅ Funcionando Correctamente:**
- `💰 Precio AAPL: $150.25` - Precios reales
- `🔐 Token saved: true` - Autenticación OK
- `✅ Trade 1 updated successfully` - Operaciones OK

### **⚠️ Funcionando con Fallbacks:**
- `🎭 Generando precio mock para AAPL` - API fallida, usando mock
- `🔄 Updating trade 1...` - Request en proceso

### **❌ Requiere Atención:**
- `❌ Error getting price` - Problema con API
- `🔓 Token expired` - Necesita re-login
- `HTTP error! status: 401` - Problema de autenticación

---

## 🚀 **Próximas Mejoras**

### **Planned Features:**
1. **Auto-retry** para requests fallidos
2. **Múltiples APIs** como backup
3. **Notificaciones** de estado en UI
4. **Health check** automático del sistema
5. **Persistent sessions** con refresh tokens

### **Monitoring Dashboards:**
- Estado de APIs externas
- Tasa de éxito de requests
- Tiempo de respuesta promedio
- Uso de cache vs API real

---

## 📞 **Soporte**

Si los problemas persisten:
1. Verificar que Strapi esté corriendo
2. Revisar configuración de API keys
3. Limpiar cache del navegador
4. Reiniciar ambos servidores (frontend y backend)

**¡El sistema ahora es mucho más resiliente y maneja errores automáticamente! 🛡️**
