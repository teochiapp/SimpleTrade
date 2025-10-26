# 🚀 Guía Rápida - Sistema de Registro SimpleTrade

## ✅ **¡El registro YA está habilitado y funcionando!**

### 📋 **Cómo crear tu cuenta:**

#### **1. Abrir modal de login**
- Ve a `http://localhost:3000`
- Haz clic en **"Iniciar Sesión"** en el header

#### **2. Cambiar a modo registro**
- En el modal, haz clic en la pestaña **"Registro"**
- Los campos cambiarán automáticamente

#### **3. Completar datos**
- **Usuario**: `mi_usuario` (cámbialo por el tuyo)
- **Email**: `mi@email.com` (usa tu email real)
- **Contraseña**: `password123` (o la que prefieras)

#### **4. Crear cuenta**
- Haz clic en **"Crear Cuenta"**
- Verás mensaje: "¡Éxito! Redirigiendo al Dashboard..."
- Automáticamente irás al Dashboard

#### **5. ¡Listo para usar!**
- Ya puedes crear trades en la sección "Trades"
- Tus trades se guardarán en tu cuenta personal
- Cada usuario ve solo sus propios trades

---

## 🔧 **Características técnicas implementadas:**

### ✅ **Frontend (React)**
- **Modal con tabs** Login/Registro
- **Formulario dinámico** que cambia según el modo
- **Validaciones** automáticas
- **Redirección** automática tras registro exitoso
- **Mensajes** de éxito y error

### ✅ **Backend (Strapi)**
- **API de registro** `/api/auth/local/register`
- **JWT automático** tras registro exitoso
- **Relación usuario-trades** cada trade se asocia al usuario
- **Seguridad** cada usuario ve solo sus trades

### ✅ **Experiencia de usuario**
- **Credenciales pre-llenadas** diferentes para login y registro
- **Cambio suave** entre modos login/registro
- **Navegación inteligente** en el header (muestra dashboard/trades cuando estás logueado)
- **Logout** disponible desde cualquier página

---

## 🎯 **Flujo completo del registro:**

```
Landing Page → "Iniciar Sesión" → Tab "Registro" → 
Completar datos → "Crear Cuenta" → Mensaje éxito → 
Dashboard → Crear trades → ¡Todo funciona!
```

---

## ⚠️ **Si tienes problemas:**

1. **Backend no funciona**: Soluciona puerto 1337 (ver instrucciones principales)
2. **Error de permisos**: Sigue `STRAPI_PERMISOS.md`
3. **No redirecciona**: Limpia caché del navegador

## 🎉 **¡Todo está listo para usar!**

El sistema de registro está **completamente implementado y funcional**. Solo necesitas tener el backend corriendo y configurar los permisos una vez.
