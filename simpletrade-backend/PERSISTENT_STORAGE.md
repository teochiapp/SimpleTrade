# 💾 Persistent Storage Configuration para SimpleTrade

## 📋 Volumes Persistentes Necesarios

Para que Strapi funcione correctamente en producción, necesitas crear **2 volumes persistentes**:

### 1️⃣ Database Volume (SQLite)
**Importante:** Mantener los datos de la base de datos entre deployments.

```
Volume Name: simpletrade-database
Source Path: /data/simpletrade-database
Destination Path: /app/.tmp
```

**¿Por qué?**
- `/app/.tmp/data.db` contiene toda la base de datos
- Sin este volume, los datos se pierden en cada redeploy

### 2️⃣ Uploads Volume (Imágenes/Archivos)
**Importante:** Mantener los archivos subidos entre deployments.

```
Volume Name: simpletrade-uploads
Source Path: /data/simpletrade-uploads
Destination Path: /app/public/uploads
```

**¿Por qué?**
- `/app/public/uploads/` contiene las imágenes y archivos
- Sin este volume, los archivos se pierden en cada redeploy

## 🎯 Cómo Crearlos en Coolify

### Opción 1: Desde la UI de Coolify
1. Ve a tu aplicación **Backend** en Coolify
2. Busca la sección **"Persistent Storage"** o **"Volumes"**
3. Click en **"Add Volume"**

#### Volume 1 - Database:
```
- Volume Name: simpletrade-database
- Source Path: /data/simpletrade-database
- Destination Path: /app/.tmp
- Click "Add"
```

#### Volume 2 - Uploads:
```
- Volume Name: simpletrade-uploads
- Source Path: /data/simpletrade-uploads
- Destination Path: /app/public/uploads
- Click "Add"
```

### Opción 2: Desde Terminal (avanzado)
Si Coolify tiene API o configuración manual:

```yaml
volumes:
  - name: simpletrade-database
    source: /data/simpletrade-database
    destination: /app/.tmp
  - name: simpletrade-uploads
    source: /data/simpletrade-uploads
    destination: /app/public/uploads
```

## ✅ Verificación

Después de crear los volumes y hacer deploy:

1. **Verifica que los directorios existen:**
   ```bash
   # En el contenedor
   ls -la /app/.tmp
   ls -la /app/public/uploads
   ```

2. **Verifica que la base de datos persiste:**
   - Sube un dato en Strapi
   - Haz redeploy
   - Verifica que el dato sigue ahí ✅

3. **Verifica que los uploads persisten:**
   - Sube una imagen en Strapi
   - Haz redeploy
   - Verifica que la imagen sigue disponible ✅

## 🔄 Comparación: Maquifit vs SimpleTrade

### Maquifit (lo que tienes):
```
1. Volume: swsws80cw4skc4wwckckcksc-uploads
   - Source: /data/strapi-uploads
   - Destination: /app/public/uploads ✅

2. Volume: swsws80cw4skc4wwckckcksc-database
   - Source: /data/strapi-database
   - Destination: /app/.tmp ✅
```

### SimpleTrade (lo que necesitas crear):
```
1. Volume: simpletrade-uploads
   - Source: /data/simpletrade-uploads
   - Destination: /app/public/uploads ✅

2. Volume: simpletrade-database
   - Source: /data/simpletrade-database
   - Destination: /app/.tmp ✅
```

## ⚠️ NOTA IMPORTANTE

El Dockerfile que creamos **ya incluye** la creación de estos directorios:

```dockerfile
RUN mkdir -p database .tmp public/uploads && \
    chmod -R 755 database .tmp public/uploads
```

Y el `docker-entrypoint.sh` los asegura al iniciar:

```bash
mkdir -p ./database
mkdir -p ./.tmp
mkdir -p ./public/uploads
```

**¡Los volumes persistentes se conectarán automáticamente a estos directorios!**

## 📝 Resumen

Después de crear los 2 volumes:
- ✅ Datos persistirán entre deployments
- ✅ Imágenes persistirán entre deployments
- ✅ No perderás información al hacer redeploy

