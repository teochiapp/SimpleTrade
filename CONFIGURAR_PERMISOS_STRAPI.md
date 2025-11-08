# 🔐 Configurar Permisos en Strapi - URGENTE

## ⚠️ Error Actual
```
[2025-11-05 02:02:05.275] http: GET /api/trades?populate=*&sort=createdAt:desc (7 ms) 403
```

Este error significa que el usuario autenticado NO tiene permisos para acceder a los trades.

---

## ✅ Solución Paso a Paso

### 1. Abre el Panel de Administración de Strapi

En tu navegador, ve a:
```
http://localhost:1337/admin
```

### 2. Inicia Sesión como Administrador

- Si ya creaste una cuenta de administrador, inicia sesión
- Si es la primera vez, crea una cuenta de administrador

### 3. Configura los Permisos para Usuarios Autenticados

1. En el menú lateral izquierdo, haz clic en **Settings** (⚙️ Configuración)

2. En la sección **USERS & PERMISSIONS PLUGIN**, haz clic en **Roles**

3. Haz clic en el rol **Authenticated** (NO en Public)

4. Desplázate hacia abajo hasta encontrar la sección **Permissions**

5. Busca **TRADE** y expande la sección

6. **MARCA TODAS ESTAS CASILLAS:**
   - ✅ `find` - Para obtener todos los trades
   - ✅ `findOne` - Para obtener un trade específico
   - ✅ `create` - Para crear nuevos trades
   - ✅ `update` - Para actualizar trades
   - ✅ `delete` - Para eliminar trades

7. Busca **USER** y expande la sección

8. **MARCA ESTA CASILLA:**
   - ✅ `me` - Para obtener el perfil del usuario actual

9. Haz clic en el botón **Save** (💾 Guardar) en la esquina superior derecha

---

## 🎯 Verificación

Después de guardar los permisos:

1. **Recarga tu aplicación frontend** (F5 en el navegador)

2. **Verifica en la consola del navegador** (F12 → Console)
   - Deberías ver: `✅ Token válido`
   - NO deberías ver: `403 Forbidden`

3. **Verifica en los logs del backend Strapi**
   - Deberías ver: `http: GET /api/trades?populate=*&sort=createdAt:desc (X ms) 200`
   - NO: `http: GET /api/trades?populate=*&sort=createdAt:desc (X ms) 403`

---

## 📸 Captura de Pantalla de Referencia

Los permisos deberían verse así:

```
Authenticated Role
├── Permissions
│   ├── APPLICATION
│   │   ├── Trade
│   │   │   ├── ✅ find
│   │   │   ├── ✅ findOne
│   │   │   ├── ✅ create
│   │   │   ├── ✅ update
│   │   │   └── ✅ delete
│   │   └── User
│   │       └── ✅ me
```

---

## 🔄 Si Ya Configuraste los Permisos y Sigue Fallando

1. **Cierra sesión** en el frontend
2. **Vuelve a iniciar sesión**
3. **Limpia el caché del navegador** (Ctrl + Shift + Delete)
4. **Recarga la página** (F5)

---

## 💡 Nota sobre Finnhub

Ahora que desactivé el `demoMode`, la aplicación usará tu API key de Finnhub:
```
d3t6mg9r01qqdgfufaggd3t6mg9r01qqdgfufah0
```

Si ves errores 403 de Finnhub después de configurar Strapi, significa que:
- La API key está expirada
- Has excedido el límite de llamadas (60 por minuto en plan gratuito)

En ese caso, puedes:
1. Esperar 1 minuto y recargar
2. Obtener una nueva API key en https://finnhub.io/register
3. Reactivar el `demoMode` en `src/config/priceConfig.js` (línea 14)
