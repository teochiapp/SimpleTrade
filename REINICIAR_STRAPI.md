# 🔄 Reiniciar Strapi - Crear Nuevo Usuario Admin

## 📋 Pasos para Reiniciar Strapi

### Opción 1: Eliminar Base de Datos (Recomendado)

1. **Detén el servidor Strapi** (si está corriendo)
   ```
   Ctrl + C en la terminal donde corre Strapi
   ```

2. **Elimina la base de datos:**
   ```powershell
   cd "c:\Users\teorh\OneDrive\Desktop\React Projects\simpletrade\simpletrade-backend"
   Remove-Item -Path "database\data.db" -Force
   ```

3. **Inicia Strapi nuevamente:**
   ```powershell
   npm run develop
   ```

4. **Abre el panel de admin:**
   ```
   http://localhost:1337/admin
   ```

5. **Crea tu nuevo usuario administrador**
   - Nombre
   - Email
   - Contraseña (mínimo 8 caracteres)

---

### Opción 2: Eliminar Carpeta .tmp (Alternativa)

Si la opción 1 no funciona:

```powershell
cd "c:\Users\teorh\OneDrive\Desktop\React Projects\simpletrade\simpletrade-backend"
Remove-Item -Path ".tmp" -Recurse -Force
npm run develop
```

---

## ⚠️ IMPORTANTE

**Al eliminar la base de datos perderás:**
- ✅ Usuario admin anterior (lo que quieres)
- ❌ Todos los trades guardados
- ❌ Todos los usuarios registrados
- ❌ Configuración de permisos

**Después de reiniciar deberás:**
1. Crear nuevo usuario admin
2. Configurar permisos para `Authenticated` role:
   - Trade: find, findOne, create, update, delete
   - User: me

---

## 🚀 Comandos Rápidos

### Windows PowerShell:
```powershell
# Detener Strapi (Ctrl + C)

# Eliminar base de datos
cd "c:\Users\teorh\OneDrive\Desktop\React Projects\simpletrade\simpletrade-backend"
Remove-Item -Path "database\data.db" -Force

# Reiniciar Strapi
npm run develop
```

### Verificar que funcionó:
1. Abre http://localhost:1337/admin
2. Deberías ver el formulario de "Crear primer administrador"
3. Completa el formulario
4. ¡Listo!

---

## 📝 Configurar Permisos Después de Reiniciar

1. Ve a **Settings** → **Roles** → **Authenticated**
2. Habilita permisos para **Trade**:
   - ✅ find
   - ✅ findOne
   - ✅ create
   - ✅ update
   - ✅ delete
3. Habilita permisos para **User**:
   - ✅ me
4. Guarda los cambios

---

## 🆘 Si Algo Sale Mal

### Error: "Cannot find module"
```powershell
npm install
npm run develop
```

### Error: "Port 1337 already in use"
```powershell
# Encuentra el proceso que usa el puerto 1337
netstat -ano | findstr :1337

# Mata el proceso (reemplaza PID con el número que aparece)
taskkill /PID <PID> /F

# Reinicia Strapi
npm run develop
```

### Error: "Database locked"
1. Cierra todas las terminales
2. Reinicia tu computadora
3. Elimina la base de datos
4. Inicia Strapi

---

**Última actualización:** 5 de noviembre de 2025, 2:26 AM
