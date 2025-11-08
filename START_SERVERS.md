# 🚀 Guía Rápida para Iniciar SimpleTrade

## Pasos para Iniciar la Aplicación

### 1️⃣ Iniciar el Backend Strapi

Abre una terminal (PowerShell o CMD) y ejecuta:

```powershell
cd "c:\Users\teorh\OneDrive\Desktop\React Projects\simpletrade\simpletrade-backend"
npm run develop
```

**Espera a ver este mensaje:**
```
┌────────────────────────────────────────────────────┐
│ Strapi is running at http://localhost:1337        │
└────────────────────────────────────────────────────┘
```

### 2️⃣ Configurar Permisos en Strapi (SOLO LA PRIMERA VEZ)

1. Abre tu navegador en: http://localhost:1337/admin
2. Si es la primera vez, crea una cuenta de administrador
3. Ve a **Settings** → **Users & Permissions Plugin** → **Roles**
4. Haz clic en **Authenticated**
5. En la sección **Permissions**, busca `trade` y habilita:
   - ✅ find
   - ✅ findOne
   - ✅ create
   - ✅ update
   - ✅ delete
6. En la sección **Permissions**, busca `user` y habilita:
   - ✅ me
7. Haz clic en **Save** (arriba a la derecha)

### 3️⃣ Iniciar el Frontend React

Abre una **NUEVA** terminal (deja la anterior corriendo) y ejecuta:

```powershell
cd "c:\Users\teorh\OneDrive\Desktop\React Projects\simpletrade"
npm start
```

**La aplicación se abrirá automáticamente en:** http://localhost:3000

---

## 🔑 Credenciales de Prueba

Después de configurar los permisos, puedes crear una cuenta o usar estas credenciales de prueba:

**Para crear una cuenta nueva:**
- Haz clic en "Registro" en el modal de login
- Ingresa tu email, usuario y contraseña
- ¡Listo!

**Credenciales de ejemplo (si ya creaste una cuenta antes):**
- Email: `test@simpletrade.com`
- Password: `password123`

---

## ⚠️ Solución de Problemas Comunes

### Error: "Failed to load resource: net::ERR_CONNECTION_REFUSED"
**Causa:** El backend Strapi no está corriendo.
**Solución:** Asegúrate de haber iniciado el backend en el paso 1.

### Error: "403 Forbidden" al cargar trades
**Causa:** Los permisos no están configurados correctamente.
**Solución:** Sigue el paso 2 para configurar los permisos.

### Error: "403" al cargar precios de acciones
**Causa:** La API key de Finnhub está expirada.
**Solución:** Ve a `TROUBLESHOOTING.md` sección 3 para obtener una nueva API key.

### Los cambios en el código no se reflejan
**Solución:** 
1. Detén el servidor frontend (Ctrl + C)
2. Ejecuta: `npm start` nuevamente

---

## 🛑 Para Detener los Servidores

En cada terminal donde están corriendo los servidores, presiona:
```
Ctrl + C
```

---

## 📁 Estructura del Proyecto

```
simpletrade/
├── src/                          # Código del frontend React
│   ├── components/              # Componentes de React
│   ├── services/                # Servicios (Strapi, Finnhub)
│   └── config/                  # Configuración
├── simpletrade-backend/         # Backend Strapi
│   ├── src/api/                 # APIs y modelos
│   └── config/                  # Configuración de Strapi
└── package.json                 # Dependencias del frontend
```

---

## 🎯 Próximos Pasos

1. ✅ Inicia ambos servidores (Backend y Frontend)
2. ✅ Configura los permisos en Strapi
3. ✅ Crea una cuenta o inicia sesión
4. ✅ ¡Empieza a registrar tus trades!

---

## 📞 Ayuda Adicional

Si encuentras más problemas, consulta el archivo `TROUBLESHOOTING.md` para soluciones detalladas.
