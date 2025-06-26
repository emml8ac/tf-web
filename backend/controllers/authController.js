import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import pool from '../config/database.js'

// Registrar nuevo empleado (opcional - solo si necesitas registrar nuevos empleados)
export const register = async (req, res) => {
  try {
    const { paterno, materno, nombres, direccion, telefono, clave } = req.body

    // Validar datos requeridos
    if (!paterno || !nombres || !clave) {
      return res.status(400).json({ 
        success: false, 
        message: 'Apellido paterno, nombres y clave son requeridos' 
      })
    }

    // Obtener el próximo ID de empleado desde la tabla CONTROL
    const controlResult = await pool.query(
      "SELECT valor FROM control WHERE parametro = 'Empleado'"
    )
    
    const nextId = parseInt(controlResult.rows[0]?.valor) || 1

    // Encriptar contraseña
    const saltRounds = 12
    const hashedPassword = await bcrypt.hash(clave, saltRounds)

    // Crear empleado
    const result = await pool.query(
      'INSERT INTO empleado (idempleado, paterno, materno, nombres, direccion, telefono, clave) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING idempleado, paterno, materno, nombres',
      [nextId, paterno, materno || '', nombres, direccion || '', telefono || '', hashedPassword]
    )

    // Actualizar contador en CONTROL
    await pool.query(
      "UPDATE control SET valor = $1 WHERE parametro = 'Empleado'",
      [(nextId + 1).toString()]
    )

    const empleado = result.rows[0]

    // Generar JWT
    const token = jwt.sign(
      { 
        empleadoId: empleado.idempleado, 
        nombres: empleado.nombres,
        paterno: empleado.paterno 
      },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    )

    res.status(201).json({
      success: true,
      message: 'Empleado registrado exitosamente',
      token,
      user: {
        id: empleado.idempleado,
        paterno: empleado.paterno,
        materno: empleado.materno,
        nombres: empleado.nombres
      }
    })

  } catch (error) {
    console.error('Error en registro:', error)
    if (error.code === '23505') { // Duplicate key error
      res.status(400).json({ 
        success: false, 
        message: 'El empleado ya existe' 
      })
    } else {
      res.status(500).json({ 
        success: false, 
        message: 'Error interno del servidor' 
      })
    }
  }
}

// Iniciar sesión usando ID de empleado y clave
export const login = async (req, res) => {
  try {
    const { empleadoId, clave } = req.body

    // DEBUG: Log de datos recibidos
    console.log('🔍 Login attempt:')
    console.log('   Empleado ID:', empleadoId, typeof empleadoId)
    console.log('   Clave enviada:', clave, typeof clave)

    // Validar datos requeridos
    if (!empleadoId || !clave) {
      return res.status(400).json({ 
        success: false, 
        message: 'ID de empleado y clave son requeridos' 
      })
    }

    // Buscar empleado por ID
    const result = await pool.query(
      'SELECT idempleado, paterno, materno, nombres, direccion, telefono, clave FROM empleado WHERE idempleado = $1',
      [empleadoId]
    )

    if (result.rows.length === 0) {
      console.log('❌ Empleado no encontrado con ID:', empleadoId)
      return res.status(401).json({ 
        success: false, 
        message: 'Credenciales inválidas' 
      })
    }

    const empleado = result.rows[0]
    
    // DEBUG: Log de datos del empleado
    console.log('👤 Empleado encontrado:')
    console.log('   Nombre:', empleado.nombres, empleado.paterno)
    console.log('   Clave en DB:', empleado.clave, typeof empleado.clave)
    console.log('   Longitud clave DB:', empleado.clave.length)

    // Verificar contraseña
    let isValidPassword = false
    
    // Primero verificar si la clave está encriptada con bcrypt
    // Las claves bcrypt siempre empiezan con $2a$, $2b$, $2x$, o $2y$
    if (empleado.clave.startsWith('$2')) {
      console.log('🔒 Clave encriptada detectada, usando bcrypt')
      try {
        isValidPassword = await bcrypt.compare(clave, empleado.clave)
        console.log('🔐 Bcrypt comparison:', isValidPassword)
      } catch (bcryptError) {
        console.log('❌ Error en bcrypt:', bcryptError.message)
        isValidPassword = false
      }
    } else {
      console.log('� Clave sin encriptar detectada, comparación directa')
      // Para claves sin encriptar (como las actuales en tu DB)
      isValidPassword = (clave === empleado.clave.trim())
      console.log('🔐 Direct comparison:', isValidPassword)
    }

    if (!isValidPassword) {
      console.log('❌ Contraseña inválida')
      return res.status(401).json({ 
        success: false, 
        message: 'Credenciales inválidas' 
      })
    }

    console.log('✅ Login exitoso para:', empleado.nombres)

    // Generar JWT
    const token = jwt.sign(
      { 
        empleadoId: empleado.idempleado, 
        nombres: empleado.nombres,
        paterno: empleado.paterno 
      },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    )

    res.json({
      success: true,
      message: 'Inicio de sesión exitoso',
      token,
      user: {
        id: empleado.idempleado,
        paterno: empleado.paterno,
        materno: empleado.materno,
        nombres: empleado.nombres,
        direccion: empleado.direccion,
        telefono: empleado.telefono
      }
    })

  } catch (error) {
    console.error('Error en login:', error)
    res.status(500).json({ 
      success: false, 
      message: 'Error interno del servidor' 
    })
  }
}

// Obtener perfil del empleado
export const getProfile = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT idempleado, paterno, materno, nombres, direccion, telefono FROM empleado WHERE idempleado = $1',
      [req.user.empleadoId]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({ 
        success: false, 
        message: 'Empleado no encontrado' 
      })
    }

    const empleado = result.rows[0]

    res.json({
      success: true,
      user: {
        id: empleado.idempleado,
        paterno: empleado.paterno,
        materno: empleado.materno,
        nombres: empleado.nombres,
        direccion: empleado.direccion,
        telefono: empleado.telefono
      }
    })

  } catch (error) {
    console.error('Error obteniendo perfil:', error)
    res.status(500).json({ 
      success: false, 
      message: 'Error interno del servidor' 
    })
  }
}

// Listar empleados (endpoint adicional para testing)
export const listEmpleados = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT idempleado, paterno, materno, nombres FROM empleado ORDER BY idempleado'
    )

    res.json({
      success: true,
      empleados: result.rows
    })

  } catch (error) {
    console.error('Error listando empleados:', error)
    res.status(500).json({ 
      success: false, 
      message: 'Error interno del servidor' 
    })
  }
}
