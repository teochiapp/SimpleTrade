# 📈 SimpleTrade - Diario de Trading

Una aplicación moderna para registrar y analizar tus operaciones de trading, construida con React y Strapi.

## 🚀 Características

- **📊 Dashboard Intuitivo**: Vista general de tu rendimiento
- **📝 Registro de Trades**: Formulario completo para nuevas operaciones
- **📈 Estadísticas en Tiempo Real**: Métricas de rendimiento automáticas
- **📋 Historial Completo**: Lista filtrable de todas tus operaciones
- **🔐 Autenticación Segura**: Sistema de usuarios con Strapi
- **💾 Persistencia de Datos**: Base de datos SQLite integrada
- **📱 Diseño Responsivo**: Funciona en desktop y móvil

## 🛠️ Tecnologías

### Frontend
- **React 18** - Framework principal
- **React Router** - Navegación
- **Framer Motion** - Animaciones
- **Styled Components** - CSS-in-JS
- **Custom Hooks** - Lógica reutilizable

### Backend
- **Strapi 5** - CMS y API
- **SQLite** - Base de datos
- **JWT** - Autenticación
- **REST API** - Endpoints automáticos

### APIs Externas
- **Finnhub.io** - Datos de mercado (opcional)

## 📦 Instalación

### Prerrequisitos
- Node.js 18+ 
- npm o yarn

### 1. Clonar el Repositorio
```bash
git clone <repository-url>
cd simpletrade
```

### 2. Instalar Dependencias Frontend
```bash
npm install
```

### 3. Instalar Dependencias Backend
```bash
cd simpletrade-backend
npm install
cd ..
```

### 4. Configurar Variables de Entorno

#### Frontend (.env.local)
```bash
echo "REACT_APP_STRAPI_URL=http://localhost:1337" > .env.local
echo "REACT_APP_FINNHUB_API_KEY=tu-api-key-aqui" >> .env.local
```

#### Backend (.env en simpletrade-backend/)
```bash
cd simpletrade-backend
echo "HOST=0.0.0.0" > .env
echo "PORT=1337" >> .env
echo "APP_KEYS=simpletrade-app-key-1,simpletrade-app-key-2" >> .env
echo "API_TOKEN_SALT=simpletrade-api-token-salt" >> .env
echo "ADMIN_JWT_SECRET=simpletrade-admin-jwt-secret" >> .env
echo "TRANSFER_TOKEN_SALT=simpletrade-transfer-token-salt" >> .env
echo "JWT_SECRET=simpletrade-jwt-secret" >> .env
cd ..
```

## 🚀 Desarrollo

### Opción 1: Script Automático (Windows)
```bash
start-dev.bat
```

### Opción 2: Manual

#### Terminal 1 - Backend
```bash
cd simpletrade-backend
npm run develop
```

#### Terminal 2 - Frontend
```bash
npm start
```

## 🌐 URLs de Desarrollo

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:1337/api
- **Admin Strapi**: http://localhost:1337/admin

## 📱 Uso de la Aplicación

### 1. Configuración Inicial
1. Abrir http://localhost:1337/admin
2. Crear cuenta de administrador
3. Configurar permisos para "Trade" content type
4. Crear usuario de prueba

### 2. Registro de Usuario
1. Ir a http://localhost:3000
2. Hacer clic en "Login" en el header
3. Crear nueva cuenta o hacer login

### 3. Registrar Trades
1. Ir a Dashboard → "Nuevo Trade"
2. Completar formulario:
   - Símbolo (ej: AAPL)
   - Tipo (Compra/Venta)
   - Precio de entrada
   - % de cartera (opcional)
   - Stop Loss (opcional)
   - Take Profit (opcional)
   - Estrategia y notas
3. Guardar trade

### 4. Ver Estadísticas
1. Ir a Dashboard → "Resumen de Trades"
2. Ver métricas automáticas:
   - Total de trades
   - Win Rate
   - Profit Total
   - Profit Factor

### 5. Historial de Trades
1. Ir a Dashboard → "Resumen de Trades" → pestaña "Historial"
2. Filtrar por símbolo, tipo, fecha
3. Ver detalles completos de cada trade

## 🗂️ Estructura del Proyecto

```
simpletrade/
├── src/
│   ├── components/
│   │   ├── Dashboard/          # Componentes del dashboard
│   │   ├── LandingPage/        # Página de inicio
│   │   ├── Trades/            # Componentes de trades
│   │   └── common/            # Componentes compartidos
│   ├── containers/            # Contenedores de rutas
│   ├── hooks/                 # Custom hooks
│   ├── services/              # Servicios de API
│   ├── styles/                # Estilos globales
│   └── utils/                 # Utilidades
├── simpletrade-backend/       # Backend Strapi
│   ├── src/
│   │   └── api/
│   │       └── trade/         # Content Type Trade
│   └── config/                # Configuración Strapi
└── public/                    # Archivos estáticos
```

## 🔧 Configuración Avanzada

### Personalizar Campos de Trade
Editar `simpletrade-backend/src/api/trade/content-types/trade/schema.json`

### Modificar Permisos
1. Ir a http://localhost:1337/admin
2. Settings → Users & Permissions Plugin
3. Configurar permisos por rol

### Agregar Nuevas APIs
1. Crear content type en Strapi
2. Generar servicio en `src/services/`
3. Crear hook en `src/hooks/`

## 🐛 Troubleshooting

### Error de CORS
- Verificar `simpletrade-backend/config/middlewares.js`
- Asegurar que localhost:3000 esté en origins

### Error de Autenticación
- Verificar que el usuario tenga permisos en Strapi
- Comprobar que el token JWT sea válido

### Error de Base de Datos
- Verificar que SQLite esté instalado
- Comprobar permisos de escritura en `database/`

### Error de API Externa
- Verificar API key de Finnhub
- Comprobar límites de rate limiting

## 📈 Próximas Características

- [ ] Gráficos de rendimiento
- [ ] Exportar datos a Excel/PDF
- [ ] Notificaciones push
- [ ] App móvil con React Native
- [ ] Trading bots integrados
- [ ] Análisis técnico automático

## 🤝 Contribuir

1. Fork el proyecto
2. Crear branch para feature (`git checkout -b feature/AmazingFeature`)
3. Commit cambios (`git commit -m 'Add AmazingFeature'`)
4. Push al branch (`git push origin feature/AmazingFeature`)
5. Abrir Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más detalles.

## 👨‍💻 Autor

Desarrollado con ❤️ para la comunidad de trading.

---

**¡Happy Trading! 📈🚀**