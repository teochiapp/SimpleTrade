# 🔐 Configuración de Permisos en Strapi

## Pasos para configurar los permisos de trades:

### 1. Iniciar el backend de Strapi
```bash
cd simpletrade-backend
npm run develop
```

### 2. Crear usuario admin (si no existe)
1. Ve a `http://localhost:1337/admin`
2. Crea tu cuenta de administrador

### 3. Configurar permisos para usuarios autenticados
1. En el panel de admin, ve a **Settings → Roles**
2. Selecciona **Authenticated** (usuarios autenticados)
3. Busca la sección **Trade** 
4. Activa los siguientes permisos:
   - ✅ **create** (crear trades)
   - ✅ **find** (listar trades)
   - ✅ **findOne** (ver trade individual)
   - ✅ **update** (actualizar trades)
   - ✅ **delete** (eliminar trades)

### 4. Configurar permisos de Users-permissions
1. En la misma pantalla, busca **Users-permissions**
2. En **User**, activa:
   - ✅ **me** (obtener perfil del usuario)

### 5. Configurar permisos para usuarios públicos (REGISTRO)
1. Selecciona **Public** (usuarios públicos)
2. En **Users-permissions**, busca **Auth**:
   - ✅ **register** (permitir registro de nuevos usuarios)
   - ✅ **callback** (para OAuth, si lo usas)
3. ⚠️ **IMPORTANTE**: NO actives permisos de Trade en Public

### 6. Guardar cambios
1. Haz clic en **Save** (Guardar)

## ⚠️ IMPORTANTE para Desarrollo

Si tienes problemas de conexión:

### Opción 1: Permitir acceso público temporal
1. En **Settings → Roles**
2. Selecciona **Public** (usuarios públicos)
3. Activa los mismos permisos de **Trade**
4. **¡SOLO PARA DESARROLLO! ¡No hagas esto en producción!**

### Opción 2: Verificar CORS
Asegúrate de que el archivo `simpletrade-backend/config/middlewares.js` tenga:
```javascript
origin: ['http://localhost:3000', 'http://localhost:3001']
```

## 🎯 Prueba de funcionamiento

1. Inicia el backend: `npm run develop` (en simpletrade-backend)
2. Inicia el frontend: `npm start` (en la raíz del proyecto)
3. Ve a `http://localhost:3000`
4. Haz login con las credenciales por defecto
5. Ve a la pestaña "Trades" 
6. Intenta crear un nuevo trade

## 📝 Credenciales y Registro

### 🔑 Login (si ya tienes cuenta)
- Email: `test@simpletrade.com`
- Contraseña: `password123`

### 🆕 Registro (crear cuenta nueva) - **¡RECOMENDADO!**
1. **Haz clic** en "Iniciar Sesión" en el header
2. **Cambia a la pestaña "Registro"**
3. **Completa tus datos:**
   - Usuario: `mi_usuario` (o el que quieras)
   - Email: `mi@email.com` (tu email real)
   - Contraseña: `password123` (o la que prefieras)
4. **Haz clic en "Crear Cuenta"**
5. **¡Automáticamente irás al Dashboard!**

### ✅ Ventajas del Registro
- **Tus propios trades**: Solo verás los trades que crees
- **Datos separados**: Cada usuario tiene su base de datos independiente
- **Experiencia personalizada**: Tu propio diario de trading

Si las credenciales de login no funcionan, **usa el registro** para crear tu cuenta nueva.
