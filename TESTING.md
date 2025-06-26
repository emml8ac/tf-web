# 🧪 Pruebas del Sistema de Login

## 🔐 Credenciales de Prueba

Basándose en tu base de datos EMPLEADO, puedes usar estas credenciales para probar:

### Empleados disponibles:
| ID | Nombre Completo | Clave |
|----|-----------------|-------|
| 1 | CARLOS ALBERTO BARRETO MORALES | 123456 |
| 2 | OSCAR PABLO BAZAN CABANILLAS | 123456 |
| 3 | OSCAR PABLO CALDERON VICENTE | 123456 |
| 4 | JOSE ANTONIO CORIMANYA MAURICIO | 123456 |
| 5 | ROBERT NICOLAY GABINO NU-EZ | 123456 |
| 6 | MIGUEL HARO RUIZ | 123456 |
| 7 | LEONARDO LLAJARUNA AGUADO | 123456 |
| 8 | CESAR AUGUSTO LOAYZA GALDOS | 123456 |
| 9 | MIGUEL ANGEL LUNA PIZANGO | 123456 |
| 10 | LAURA MENDOZA VILLENA | 123456 |
| 11 | ALBERTO RAUL MIRANDA MONTOYA | 123456 |

## 🚀 Pasos para probar

### 1. Iniciar el Backend
```bash
cd backend
npm install
npm run db:migrate
npm run dev
```

### 2. Iniciar el Frontend
```bash
npm run dev
```

### 3. Probar el Login
1. Ve a `http://localhost:5173`
2. Ingresa un **ID de Empleado** (ejemplo: `1`)
3. Ingresa la **Clave** (`123456`)
4. Haz clic en "Iniciar Sesión"

### 4. Verificar funcionamiento
- ✅ Deberías ver el mensaje de bienvenida
- ✅ El nombre completo del empleado debe aparecer
- ✅ El botón "Cerrar Sesión" debe funcionar

## 🔧 Endpoints de Testing

### Verificar conexión:
```bash
curl http://localhost:3001/api/health
```

### Login manual:
```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "empleadoId": 1,
    "clave": "123456"
  }'
```

### Listar empleados:
```bash
curl http://localhost:3001/api/auth/empleados
```

## 📝 Notas importantes

1. **Base de datos**: Asegúrate de que tu base de datos `tec-web-unp` esté corriendo
2. **Credenciales**: Las claves actuales no están encriptadas (`123456` directo)
3. **ID numérico**: El login usa ID de empleado (1-11) no email
4. **Nombres**: Se muestra el nombre completo del empleado tras login exitoso

## 🛠️ Troubleshooting

### ❌ Error de conexión:
- Verificar que PostgreSQL esté corriendo
- Confirmar que la base de datos `tec-web-unp` existe
- Revisar credenciales en `.env`

### ❌ "Credenciales inválidas":
- Verificar que el ID de empleado existe (1-11)
- Usar la clave `123456`
- Verificar que la tabla EMPLEADO tiene datos

### ❌ Error CORS:
- Asegurar que el backend esté en puerto 3001
- Confirmar que el frontend esté en puerto 5173
