# 🚀 Sistema de Login con React, Node.js & PostgreSQL

Este proyecto es una aplicación completa de autenticación con un frontend desarrollado en React y Vite, y un backend construido con Node.js, Express, y PostgreSQL.

## 📋 Prerrequisitos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** (versión 18 o superior)
- **PostgreSQL** (versión 12 o superior)
- **npm** o **yarn**

## 🛠️ Configuración del Proyecto

### 1. 🗄️ Configuración de la Base de Datos (PostgreSQL)

**a. Instalar PostgreSQL:**
   - Si aún no lo tienes, descarga e instala PostgreSQL desde [postgresql.org/download](https://www.postgresql.org/download/).

**b. Crear la Base de Datos:**
   Conéctate a PostgreSQL como superusuario (generalmente `postgres`) y ejecuta los siguientes comandos SQL:
   ```sql
   -- Conectar como superusuario (postgres)
   -- psql -U postgres

   -- Crear la base de datos
   CREATE DATABASE tf_web_db;

   -- Crear un usuario (opcional pero recomendado)
   CREATE USER placeholder_user WITH PASSWORD 'placeholder_password';
   GRANT ALL PRIVILEGES ON DATABASE tf_web_db TO placeholder_user;

   -- Salir
   -- \q
   ```
   *Nota: Reemplaza `placeholder_user` y `placeholder_password` con tus credenciales reales. **No uses estas credenciales de ejemplo en producción.**_

### 2. ⚙️ Configuración del Backend

**a. Navegar a la carpeta del backend:**
   ```bash
   cd backend
   ```

**b. Instalar dependencias:**
   ```bash
   npm install
   # o
   # yarn install
   ```

**c. Configurar variables de entorno:**
   Copia el archivo `.env.example` a un nuevo archivo llamado `.env` dentro de la carpeta `backend/`.
   ```bash
   cp .env.example .env
   ```
   Actualiza el archivo `.env` con tu configuración:
   ```env
   NODE_ENV=development
   PORT=3001 # Puerto para el servidor backend

   # Configuración de PostgreSQL
   DB_HOST=localhost
   DB_PORT=5432                     # Puerto estándar de PostgreSQL
   DB_NAME=tf_web_db                # El nombre de la base de datos que creaste
   DB_USER=placeholder_user         # Tu usuario de PostgreSQL (reemplazar)
   DB_PASSWORD=placeholder_password # Tu contraseña de PostgreSQL (reemplazar)

   # Generar un JWT secret seguro y único - ¡NO USAR ESTE VALOR DE EJEMPLO!
   JWT_SECRET=CAMBIAR_ESTO_POR_UN_SECRETO_REAL_LARGO_Y_ALEATORIO

   # URL donde correrá el frontend (para CORS)
   FRONTEND_URL=http://localhost:5173
   ```
   **Importante:** Reemplaza `placeholder_user`, `placeholder_password` y especialmente `JWT_SECRET` con valores seguros y únicos para tu entorno. El `JWT_SECRET` debe ser una cadena aleatoria compleja y mantenerse confidencial.

**d. Ejecutar las migraciones de la base de datos:**
   Este comando creará las tablas necesarias en tu base de datos.
   ```bash
   npm run db:migrate
   ```

**e. Iniciar el servidor backend:**
   ```bash
   npm run dev
   ```
   El backend estará disponible en `http://localhost:3001` (o el puerto que hayas configurado en `.env`).

### 3. 🎨 Configuración del Frontend

**a. Navegar a la raíz del proyecto (si estabas en `backend/`):**
   ```bash
   cd ..
   ```

**b. Instalar dependencias del frontend:**
   ```bash
   npm install
   # o
   # yarn install
   ```

**c. Iniciar el servidor de desarrollo del frontend:**
   ```bash
   npm run dev
   ```
   El frontend estará disponible en `http://localhost:5173` (o el puerto que Vite indique si el 5173 está ocupado).

## ✨ Características Principales

- **Frontend:** Construido con React, Vite y TypeScript.
- **Backend:** API RESTful con Node.js, Express.
- **Base de Datos:** PostgreSQL para persistencia de datos.
- **Autenticación:**
    - Registro de usuarios.
    - Inicio de sesión con credenciales de empleado (ID y clave).
    - Uso de JSON Web Tokens (JWT) para sesiones seguras.
- **Seguridad:**
    - Encriptación de contraseñas (usando bcryptjs donde sea aplicable, aunque `TESTING.md` indica claves no encriptadas para datos de prueba).
    - Protección contra ataques comunes con Helmet.
    - Rate limiting para prevenir abuso de la API.
    - Configuración de CORS.

## 🔗 Endpoints de la API

**URL Base:** `http://localhost:3001/api`

| Método | Endpoint        | Descripción                     | Autenticación Requerida |
|--------|-----------------|---------------------------------|-------------------------|
| POST   | `/auth/register`| Registrar un nuevo usuario      | No                      |
| POST   | `/auth/login`   | Iniciar sesión (empleado)       | No                      |
| GET    | `/auth/profile` | Obtener perfil del usuario (WIP)| Sí (JWT)                |
| GET    | `/auth/empleados`| Listar empleados (para testing) | No                      |
| GET    | `/health`       | Health check del backend        | No                      |

### Ejemplos de Uso con cURL:

**Registro (si se implementa registro general):**
```bash
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "usuario@ejemplo.com",
    "password": "mi_password",
    "firstName": "Nombre",
    "lastName": "Apellido"
  }'
```

**Login de Empleado:**
```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "empleadoId": 1,
    "clave": "123456"
  }'
```

**Verificar Conexión del Backend:**
```bash
curl http://localhost:3001/api/health
```

**Listar Empleados (datos de prueba):**
```bash
curl http://localhost:3001/api/auth/empleados
```

## 🧪 Pruebas del Sistema

### 1. Iniciar los Servidores
   - Asegúrate de que tanto el **servidor backend** (`cd backend && npm run dev`) como el **servidor frontend** (`npm run dev` en la raíz) estén en ejecución.

### 2. Credenciales de Prueba (Empleados)
   La base de datos (`EMPLEADO`) contiene los siguientes datos de prueba. La clave para todos es `123456`.

   | ID | Nombre Completo                 | Clave  |
   |----|---------------------------------|--------|
   | 1  | CARLOS ALBERTO BARRETO MORALES  | 123456 |
   | 2  | OSCAR PABLO BAZAN CABANILLAS    | 123456 |
   | 3  | OSCAR PABLO CALDERON VICENTE    | 123456 |
   | 4  | JOSE ANTONIO CORIMANYA MAURICIO | 123456 |
   | 5  | ROBERT NICOLAY GABINO NU-EZ     | 123456 |
   | 6  | MIGUEL HARO RUIZ                | 123456 |
   | 7  | LEONARDO LLAJARUNA AGUADO       | 123456 |
   | 8  | CESAR AUGUSTO LOAYZA GALDOS     | 123456 |
   | 9  | MIGUEL ANGEL LUNA PIZANGO       | 123456 |
   | 10 | LAURA MENDOZA VILLENA           | 123456 |
   | 11 | ALBERTO RAUL MIRANDA MONTOYA    | 123456 |

   *Nota Importante sobre Datos de Prueba: Los nombres de empleado listados son ficticios para demostración. La contraseña `123456` es extremadamente insegura y se usa aquí solo para facilitar las pruebas iniciales con los datos de ejemplo proporcionados en `TESTING.md`. **Nunca utilice estas credenciales ni este patrón de contraseñas débiles en un entorno de producción o con datos reales.** Asegúrese de que los datos reales de empleado y sus métodos de autenticación sigan las mejores prácticas de seguridad.*

### 3. Probar el Login desde la Interfaz
   1. Abre tu navegador y ve a `http://localhost:5173`.
   2. Ingresa un **ID de Empleado** de la tabla anterior (ej., `1`).
   3. Ingresa la **Clave** (`123456`).
   4. Haz clic en "Iniciar Sesión".

### 4. Verificar Funcionamiento
   - ✅ Deberías ver un mensaje de bienvenida.
   - ✅ El nombre completo del empleado debería mostrarse.
   - ✅ El botón "Cerrar Sesión" debería estar visible y funcionar correctamente.

## 🔧 Troubleshooting Común

### Errores de Conexión a PostgreSQL:
- **Verificar Servicio:** Asegúrate de que el servicio de PostgreSQL esté corriendo en tu sistema.
- **Credenciales:** Comprueba que las credenciales (`DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASSWORD`) en el archivo `backend/.env` son correctas y coinciden con tu configuración de PostgreSQL.
- **Base de Datos Existente:** Confirma que la base de datos (ej., `tf_web_db` o `tec-web-unp` según la configuración final) existe. Si no, créala (ver paso 1b).
- **Migraciones:** Asegúrate de haber ejecutado `npm run db:migrate` en la carpeta `backend/` después de configurar `.env`.

### Error "Credenciales Inválidas" al Iniciar Sesión:
- **ID de Empleado:** Verifica que el ID de empleado que estás usando existe en la tabla `EMPLEADO` (IDs 1-11 para datos de prueba).
- **Clave:** Asegúrate de estar usando la clave correcta (`123456` para los datos de prueba).
- **Datos en la Tabla:** Confirma que la tabla `EMPLEADO` en tu base de datos (`tf_web_db` o `tec-web-unp`) tiene los datos de prueba cargados.

### Errores de CORS (Cross-Origin Resource Sharing):
- **Servidores Corriendo:** Asegúrate de que tanto el servidor backend (en `http://localhost:3001`) como el frontend (en `http://localhost:5173`) estén activos.
- **`FRONTEND_URL` en `.env`:** Verifica que la variable `FRONTEND_URL` en `backend/.env` esté correctamente configurada como `http://localhost:5173` (o el puerto donde se esté ejecutando tu frontend).

### Problemas con Dependencias:
- Si encuentras errores relacionados con módulos no encontrados, intenta eliminar la carpeta `node_modules` (tanto en la raíz como en `backend/`) y el archivo `package-lock.json` (o `yarn.lock`), y luego reinstala las dependencias con `npm install` (o `yarn install`).

## 📄 Licencia

Este proyecto utiliza el template base de Vite que es distribuido bajo una licencia permisiva (generalmente MIT o similar). El código específico del proyecto podría estar bajo otra licencia si se define. Por defecto, considerar ISC según `package.json`.
```
