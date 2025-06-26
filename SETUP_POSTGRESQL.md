# 🚀 Sistema de Login con React + PostgreSQL

Una aplicación completa de autenticación con React (Frontend) y Node.js + PostgreSQL (Backend).

## 📋 Prerequisitos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** (versión 18 o superior)
- **PostgreSQL** (versión 12 o superior)
- **npm** o **yarn**

## 🗄️ Configuración de la Base de Datos

### 1. Instalar PostgreSQL

Si no tienes PostgreSQL instalado en Windows:
```bash
# Descargar desde: https://www.postgresql.org/download/windows/
```

### 2. Crear la Base de Datos

```sql
-- Conectar como superusuario (postgres)
psql -U postgres

-- Crear la base de datos
CREATE DATABASE tf_web_db;

-- Crear usuario (opcional)
CREATE USER tu_usuario WITH PASSWORD 'tu_password';
GRANT ALL PRIVILEGES ON DATABASE tf_web_db TO tu_usuario;

-- Salir
\q
```

## ⚙️ Configuración del Backend

### 1. Instalar dependencias del backend

```bash
cd backend
npm install
```

### 2. Configurar variables de entorno

Copia el archivo `.env.example` a `.env` y configura:

```env
NODE_ENV=development
PORT=3001

# Tu configuración de PostgreSQL
DB_HOST=localhost
DB_PORT=5432
DB_NAME=tf_web_db
DB_USER=tu_usuario
DB_PASSWORD=tu_password

# Generar un JWT secret seguro
JWT_SECRET=mi_jwt_secret_super_seguro_123456789

FRONTEND_URL=http://localhost:5173
```

### 3. Crear las tablas de la base de datos

```bash
npm run db:migrate
```

### 4. Iniciar el servidor backend

```bash
npm run dev
```

El backend estará disponible en: `http://localhost:3001`

## 🎨 Configuración del Frontend

### 1. Iniciar el servidor de desarrollo

```bash
npm run dev
```

El frontend estará disponible en: `http://localhost:5173`

## 🔗 Endpoints de la API

### Base URL: `http://localhost:3001/api`

| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| POST | `/auth/register` | Registrar usuario | No |
| POST | `/auth/login` | Iniciar sesión | No |
| GET | `/auth/profile` | Obtener perfil | Sí |
| GET | `/health` | Health check | No |

### Ejemplos de uso:

**Registro:**
```json
POST /api/auth/register
{
  "email": "usuario@ejemplo.com",
  "password": "mi_password",
  "firstName": "Nombre",
  "lastName": "Apellido"
}
```

**Login:**
```json
POST /api/auth/login
{
  "email": "usuario@ejemplo.com",
  "password": "mi_password"
}
```

## 🛡️ Características de Seguridad

- **Encriptación de contraseñas** con bcryptjs
- **Autenticación JWT** con tokens seguros
- **Rate limiting** para prevenir ataques
- **CORS** configurado correctamente
- **Helmet** para headers de seguridad

## 🧪 Pasos para probar

1. **Configurar PostgreSQL** y crear la base de datos
2. **Backend**: `cd backend && npm install && npm run dev`
3. **Frontend**: `npm run dev`
4. **Registrar** un usuario en la interfaz
5. **Iniciar sesión** con las credenciales

## 🔧 Troubleshooting

### Error de conexión a PostgreSQL:
- Verificar que PostgreSQL esté corriendo
- Comprobar las credenciales en `.env`
- Verificar que la base de datos existe

### Error CORS:
- Verificar que ambos servidores estén corriendo
- Comprobar la configuración de puertos
