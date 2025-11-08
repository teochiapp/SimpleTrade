# 📍 Rutas Correctas para Persistent Volumes

## ✅ Configuración Verificada

### Volumen 1 - Database:
```
Volume Name: simpletrade-database
Source Path: /data/simpletrade-database
Destination Path: /app/.tmp
```

**¿Por qué `.tmp` y no `./database`?**
- Tu `.env` dice: `DATABASE_FILENAME=.tmp/data.db` ✅
- Strapi guarda la base de datos en `.tmp/` por defecto
- El volumen debe apuntar a `/app/.tmp` donde está `data.db`

### Volumen 2 - Uploads:
```
Volume Name: simpletrade-uploads
Source Path: /data/simpletrade-uploads
Destination Path: /app/public/uploads
```

**¿Por qué `public/uploads`?**
- Strapi guarda todos los archivos subidos ahí
- Es la ubicación estándar de Strapi

## 🔍 Verificación de Archivos

### 1. Base de Datos:
```bash
# Archivo real: /app/.tmp/data.db
# Por eso el volume apunta a: /app/.tmp
```

### 2. Uploads:
```bash
# Archivos reales: /app/public/uploads/*
# Por eso el volume apunta a: /app/public/uploads
```

## 🚫 NO Usar:

```
❌ Destination Path: /app/database  (incorrecto)
   - La base de datos NO está ahí, está en .tmp/data.db

❌ Destination Path: /app/.tmp/data.db  (incorrecto)
   - Apunta al ARCHIVO, no al DIRECTORIO
   - Debe ser: /app/.tmp (directorio completo)
```

## ✅ Configuración Final Correcta:

```
Volume 1:
┌─────────────────────────────────────────┐
│ Volume Name:    simpletrade-database    │
│ Source Path:     /data/simpletrade-db   │
│ Destination:     /app/.tmp              │
└─────────────────────────────────────────┘

Volume 2:
┌─────────────────────────────────────────┐
│ Volume Name:    simpletrade-uploads     │
│ Source Path:     /data/simpletrade-up  │
│ Destination:     /app/public/uploads    │
└─────────────────────────────────────────┘
```

## 📝 Resumen de Archivos:

```
/app/
├── .tmp/
│   └── data.db              ← Persiste (Volume 1)
├── database/                 ← No necesita volume (vacío)
├── public/
│   └── uploads/             ← Persiste (Volume 2)
└── ...
```

## 🎯 Qué Persiste:

✅ **SÍ Persiste:**
- Base de datos: `/app/.tmp/data.db` (Volume 1)
- Archivos: `/app/public/uploads/*` (Volume 2)

❌ **NO Persiste (no importa):**
- `/app/database/` (no se usa)
- Resto de archivos (código fuente, node_modules, etc.)

