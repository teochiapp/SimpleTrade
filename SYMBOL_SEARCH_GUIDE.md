# 🔍 Guía del Buscador Inteligente de Instrumentos

El nuevo buscador de instrumentos te permite encontrar y seleccionar símbolos fácilmente desde APIs en tiempo real.

## ✨ **Características del Buscador**

### **🎯 Búsqueda Inteligente:**
- **Por Símbolo**: `AAPL`, `GOOGL`, `TSLA`
- **Por Nombre**: `Apple`, `Google`, `Tesla`
- **Por Sector**: `Tecnología`, `Energía`, `Salud`

### **⚡ Autocompletado:**
- **Sugerencias en tiempo real** mientras escribes
- **Navegación con teclado** (↑↓ Enter Escape)
- **Debounce inteligente** (300ms para evitar spam de API)
- **Cache automático** (5 min para mejorar rendimiento)

### **🌍 Soporte Multi-Mercado:**
- **🇺🇸 Estados Unidos**: NASDAQ, NYSE
- **🇦🇷 Argentina**: MERVAL  
- **🇧🇷 Brasil**: BOVESPA
- **🇨🇳 China**: Shanghai, Shenzhen
- **🪙 Criptomonedas**: Bitcoin, Ethereum, etc.

---

## 🚀 **Cómo Usar el Buscador**

### **1. Acceso al Buscador:**
1. Ve a **📝 Nuevo Trade**
2. En el campo **🔍 Instrumento**, haz clic para activar
3. **¡El dropdown se abre automáticamente!**

### **2. Buscar Instrumentos:**

#### **Método 1: Por Símbolo**
```
Escribe: AAPL
Resultado: Apple Inc. (AAPL) 🇺🇸
```

#### **Método 2: Por Nombre**
```
Escribe: Apple
Resultado: Apple Inc. (AAPL) 🇺🇸
```

#### **Método 3: Por Sector**  
```
Escribe: Tecnología
Resultado: AAPL, GOOGL, MSFT, META...
```

### **3. Seleccionar Instrumento:**
- **Con mouse**: Haz clic en la opción
- **Con teclado**: ↑↓ para navegar, Enter para seleccionar

### **4. Confirmación Visual:**
Una vez seleccionado verás:
```
🇺🇸 AAPL - Apple Inc.
Tecnología • US • USD
```

---

## 🔧 **Configuración con API Real**

### **Modo Demo (Predeterminado):**
- **Funciona sin configuración**
- **40+ símbolos predefinidos** 
- **Perfecto para pruebas**

### **API Real (Opcional):**
Si ya tienes configurada una API de precios (`PRICE_API_SETUP.md`):

1. **Alpha Vantage**: Búsqueda global 🌍
2. **IEX Cloud**: Mercado estadounidense 🇺🇸  
3. **Finnhub**: Mercado global 🌍

**¡Se activa automáticamente** si tienes API key configurada!

---

## 📊 **Instrumentos Disponibles (Modo Demo)**

### **🇺🇸 Estados Unidos (25 símbolos):**
**Tecnología**: AAPL, GOOGL, MSFT, META, NVDA, AMZN, NFLX, ADBE  
**Financiero**: JPM, BAC, WFC, GS  
**Salud**: JNJ, PFE, UNH, MRNA  
**Energía**: XOM, CVX  

### **🇦🇷 Argentina (6 símbolos):**
**Energía**: YPFD, PAMP, CEPU  
**Financiero**: BMA, SUPV  
**Telecomunicaciones**: TECO2  

### **🇧🇷 Brasil (5 símbolos):**
**Minería**: VALE  
**Energía**: PETR4  
**Financiero**: ITUB, BBDC4  
**Consumo**: ABEV  

### **🇨🇳 China (5 símbolos):**
**E-commerce**: BABA, JD  
**Tecnología**: TCEHY, BIDU  
**Automotriz**: NIO  

### **🪙 Criptomonedas (5 símbolos):**
BTC, ETH, ADA, SOL, MATIC

---

## ⌨️ **Atajos de Teclado**

| Tecla | Función |
|-------|---------|
| **↓** | Siguiente opción |
| **↑** | Opción anterior |
| **Enter** | Seleccionar |
| **Escape** | Cerrar dropdown |
| **Tab** | Siguiente campo |

---

## 🎨 **Información Rica por Instrumento**

Cada resultado muestra:

```
🏢 AAPL                    [Equity]
Apple Inc.
🇺🇸 US • 🏭 Tecnología • 💱 USD
```

- **🏢 Símbolo**: Código del instrumento
- **Badge**: Tipo (Equity, Crypto)
- **📄 Nombre**: Nombre completo de la empresa
- **🇺🇸 País**: Región/mercado
- **🏭 Sector**: Industrial/Tecnología/etc.
- **💱 Moneda**: USD/ARS/BRL/etc.

---

## 🛠️ **Solución de Problemas**

### **"No se encontraron instrumentos"**
✅ Verifica la escritura del símbolo  
✅ Intenta con el nombre completo  
✅ Revisa si el mercado está soportado  

### **"Cargando instrumentos..." permanente**
✅ Verifica tu conexión a internet  
✅ Revisa la consola (F12) para errores  
✅ Intenta refrescar la página  

### **API Real no funciona**
✅ Verifica tu API key en `.env`  
✅ Revisa límites de tu plan  
✅ El modo demo siempre funciona como fallback  

---

## 💡 **Consejos de Uso**

### **🎯 Para búsquedas efectivas:**
- **Menos es más**: `Apple` mejor que `Apple Inc Corporation`
- **Usa símbolos**: `TSLA` es más rápido que `Tesla Motors`
- **Sectores amplios**: `Tech` mejor que `Technology Software`

### **⚡ Para velocidad:**
- **Símbolos recientes** aparecen en cache
- **Navegación con teclado** es más rápida
- **Símbolos populares** aparecen primero

### **🎨 Para mejor experiencia:**
- **Hover** para ver tooltips adicionales
- **Selección visual** del instrumento activo
- **Confirmación** con información completa

---

## 🚀 **¿Qué Sigue?**

Una vez seleccionado tu instrumento:

1. **Tipo de Operación**: Buy/Sell se mantiene igual
2. **Precio de Entrada**: Manual como siempre  
3. **% Cartera**: Para análisis de diversificación
4. **Stop Loss/Take Profit**: Opcional
5. **Estrategia y Notas**: Documenta tu análisis

**¡El resto del formulario funciona igual que antes!** 📝✨

---

## 🎉 **¡Listo!**

Ahora tienes un buscador profesional que:
- ✅ **Encuentra cualquier instrumento** en segundos
- ✅ **Soporte multi-mercado** (US, AR, BR, CN, Crypto)  
- ✅ **Información rica** para mejor decisión
- ✅ **APIs reales** + modo demo confiable
- ✅ **UX profesional** con navegación por teclado

**¡Tu flujo de trabajo será mucho más eficiente!** 🚀📊
