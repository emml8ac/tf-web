import pool from './config/database.js'

const testLogin = async () => {
  try {
    console.log('🔍 Verificando empleados y claves...')
    
    // Verificar empleado ID 1
    const result = await pool.query(
      'SELECT idempleado, paterno, nombres, clave, length(clave) as clave_length FROM empleado WHERE idempleado = 1'
    )
    
    if (result.rows.length > 0) {
      const empleado = result.rows[0]
      console.log('👤 Empleado encontrado:')
      console.log('   ID:', empleado.idempleado)
      console.log('   Nombre:', empleado.nombres, empleado.paterno)
      console.log('   Clave:', empleado.clave)
      console.log('   Longitud de clave:', empleado.clave_length)
      console.log('   Tipo de clave:', typeof empleado.clave)
      
      // Probar comparación directa
      const claveTest = '123456'
      console.log('\n🔐 Prueba de comparación:')
      console.log('   Clave enviada:', claveTest)
      console.log('   Clave en DB:', empleado.clave)
      console.log('   Son iguales:', claveTest === empleado.clave)
      console.log('   Trim comparison:', claveTest === empleado.clave.trim())
      
    } else {
      console.log('❌ No se encontró empleado con ID 1')
    }
    
    // Verificar todos los empleados y sus claves
    console.log('\n📋 Todas las claves en la base de datos:')
    const allEmpleados = await pool.query(
      'SELECT idempleado, nombres, clave FROM empleado ORDER BY idempleado LIMIT 5'
    )
    
    allEmpleados.rows.forEach(emp => {
      console.log(`   ID ${emp.idempleado}: "${emp.clave}" (${emp.nombres})`)
    })
    
  } catch (error) {
    console.error('❌ Error:', error.message)
  } finally {
    process.exit(0)
  }
}

testLogin()
