# 📈 Configuración de API de Precios en Tiempo Real

Esta guía te ayudará a configurar precios en tiempo real para tus posiciones activas.

## 🚀 Inicio Rápido (Modo Demo)

**¡Ya funciona!** Sin configuración, la app usa precios simulados para pruebas.

## 🔧 Configuración con API Real

### **Paso 1: Obtener API Key**

**Recomendado para principiantes: Alpha Vantage (Gratis)**
1. Ve a: https://www.alphavantage.co/support/#api-key
2. Completa el formulario (nombre, email)
3. recibirás tu clave por email

**Otras opciones:**
- **IEX Cloud**: https://iexcloud.io/ (500,000 calls/mes gratis)
- **Finnhub**: https://finnhub.io/ (60 calls/min gratis)
- **Polygon.io**: https://polygon.io/ (5 calls/min gratis)

### **Paso 2: Configurar Variables de Entorno**

Crea un archivo `.env` en la raíz del proyecto:

```bash
# Para Alpha Vantage (recomendado)
REACT_APP_PRICE_API_KEY=tu_clave_de_alpha_vantage
REACT_APP_PRICE_API_PROVIDER=alphavantage

# Para IEX Cloud
REACT_APP_PRICE_API_KEY=pk_test_tu_clave_iex
REACT_APP_PRICE_API_PROVIDER=iexcloud

# Para Finnhub
REACT_APP_PRICE_API_KEY=tu_clave_finnhub
REACT_APP_PRICE_API_PROVIDER=finnhub

# Para Polygon.io
REACT_APP_PRICE_API_KEY=tu_clave_polygon
REACT_APP_PRICE_API_PROVIDER=polygon
```

### **Paso 3: Reiniciar la aplicación**

```bash
# Parar la aplicación (Ctrl+C)
# Reiniciar
npm start
```

## 📊 **¿Cómo funciona?**

Una vez configurado, verás en **📈 Posiciones Activas**:

- **Precio Actual**: Precio actualizado diariamente del símbolo
- **PnL No Realizado**: Ganancia/pérdida actual en %
  - 📈 Verde: Ganancia
  - 📉 Rojo: Pérdida
- **Actualización automática**: Una vez por día (cada 24 horas)
- **Botón manual**: 🔄 Actualizar Manual (para obtener precios frescos cuando necesites)

## 🔄 **Símbolos Soportados**

Usa símbolos estándar:
- ✅ **AAPL** (Apple)
- ✅ **GOOGL** (Google)
- ✅ **MSFT** (Microsoft)
- ✅ **TSLA** (Tesla)
- ✅ **NVDA** (NVIDIA)

## ⚠️ **Límites de Uso y Optimización**

| Proveedor | Límite Gratis | Uso Diario SimpleTrade* |
|-----------|--------------|-------------------------|
| Alpha Vantage | 5 calls/min, 500/día | ~5-20 calls/día |
| IEX Cloud | 500,000/mes | ~150-600 calls/mes |
| Finnhub | 60 calls/min | ~5-20 calls/día |
| Polygon.io | 5 calls/min | ~5-20 calls/día |

**Sistema Optimizado:**
- ✅ **Actualización diaria**: Solo 1 actualización automática por día
- ✅ **Cache inteligente**: 12 horas de cache para evitar consultas repetidas
- ✅ **Manual bajo demanda**: Actualización manual cuando realmente la necesites
- ✅ **Múltiples símbolos**: Una consulta por símbolo único, no por trade

*Basado en 5-10 posiciones activas promedio

## 🛠️ **Solución de Problemas**

### **"Cargando..." permanente**
- ✅ Verifica tu API key en `.env`
- ✅ Reinicia la aplicación
- ✅ Revisa la consola del navegador (F12)

### **Error de API**
- ✅ Verifica que el símbolo sea válido
- ✅ Revisa límites de tu plan
- ✅ Cambia a modo demo temporalmente

### **Precios incorrectos**
- ✅ Usa símbolos exactos (AAPL, no Apple)
- ✅ Verifica que tu proveedor soporte el símbolo
- ✅ Algunos símbolos solo funcionan en horario de mercado

## 🎯 **¿Cuál API elegir?**

**Para empezar**: Alpha Vantage
**Para uso intensivo**: IEX Cloud  
**Para desarrollo**: Finnhub
**Para datos avanzados**: Polygon.io

---

## 🚨 **Importante**

- **Nunca** compartas tu API key públicamente
- **Agrega** `.env` a tu `.gitignore`
- **Los precios** pueden tener retraso de 15-20 min (depende del proveedor)
- **Modo demo** funciona perfectamente para pruebas

## 🔄 **Sistema de Actualización Inteligente**

SimpleTrade optimiza el uso de APIs con actualizaciones programadas:

**📅 Actualización Diaria Automática:**
- **Una vez por día**: El sistema actualiza todos los precios automáticamente
- **12 horas de cache**: Los precios se mantienen en memoria para evitar consultas repetidas  
- **Conserva límites**: Solo usa 5-20 llamadas de API por día (vs 2,000+ con tiempo real)

**🔄 Control Manual:**
- **Botón "Actualizar Manual"**: Obtén precios frescos cuando realmente los necesites
- **Perfecto para trading**: Suficiente frecuencia para decisiones informadas
- **Sin límites**: El modo demo siempre funciona sin restricciones

---

¡Listo! Ahora tienes un sistema optimizado de precios para tus posiciones activas. 📈✨
