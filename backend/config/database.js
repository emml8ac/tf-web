import pg from 'pg'
import dotenv from 'dotenv'

dotenv.config()

const { Pool } = pg

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT) || 5432,
  database: process.env.DB_NAME || 'tec-web-unp',
  user: process.env.DB_USER || 'postgres',
  password: String(process.env.DB_PASSWORD), // Asegurar que sea string
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
  // Configuraciones adicionales para mejor rendimiento
  max: 20, // máximo número de conexiones en el pool
  idleTimeoutMillis: 30000, // tiempo antes de cerrar conexión inactiva
  connectionTimeoutMillis: 2000, // tiempo máximo para conectar
})

// Función para probar la conexión
export const testConnection = async () => {
  try {
    const client = await pool.connect()
    console.log('✅ Conexión a PostgreSQL exitosa')
    console.log(`📊 Conectado a la base de datos: ${process.env.DB_NAME}`)
    console.log(`👤 Usuario: ${process.env.DB_USER}`)
    console.log(`🏠 Host: ${process.env.DB_HOST}:${process.env.DB_PORT}`)
    client.release()
  } catch (err) {
    console.error('❌ Error conectando a PostgreSQL:', err.message)
    console.error('💡 Verifica:')
    console.error('   - PostgreSQL está corriendo')
    console.error('   - La base de datos existe')
    console.error('   - Las credenciales son correctas')
    console.error('   - El usuario tiene permisos')
  }
}

export default pool
