import pool from '../config/database.js'

// Script para verificar que las tablas necesarias existan
// Como ya tienes la tabla EMPLEADO, solo verificamos que existe
const verifyTables = async () => {
  try {
    // Verificar que existe la tabla EMPLEADO
    const empleadoTable = await pool.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'empleado'
      );
    `)

    if (empleadoTable.rows[0].exists) {
      console.log('✅ Tabla EMPLEADO encontrada')
      
      // Verificar algunos empleados de ejemplo
      const empleados = await pool.query('SELECT idempleado, paterno, nombres FROM empleado LIMIT 3')
      console.log('👥 Empleados disponibles:', empleados.rows)
      
    } else {
      console.log('❌ Tabla EMPLEADO no encontrada. Asegúrate de haber ejecutado el script SQL de tu base de datos.')
      return
    }

    // Crear tabla de sesiones si no existe (opcional para manejo de tokens)
    await pool.query(`
      CREATE TABLE IF NOT EXISTS user_sessions (
        id SERIAL PRIMARY KEY,
        empleado_id INTEGER REFERENCES empleado(idempleado) ON DELETE CASCADE,
        token_hash VARCHAR(255) NOT NULL,
        expires_at TIMESTAMP NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `)

    console.log('✅ Verificación completada. Sistema listo para usar con tabla EMPLEADO')
    
  } catch (error) {
    console.error('❌ Error verificando tablas:', error.message)
    console.error('💡 Asegúrate de que:')
    console.error('   1. PostgreSQL esté corriendo')
    console.error('   2. La base de datos "tec-web-unp" exista')
    console.error('   3. Hayas ejecutado el script SQL para crear las tablas')
  }
}

verifyTables()
