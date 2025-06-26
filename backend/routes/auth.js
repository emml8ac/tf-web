import express from 'express'
import { register, login, getProfile, listEmpleados } from '../controllers/authController.js'
import { authenticateToken } from '../middleware/auth.js'

const router = express.Router()

// Rutas públicas
router.post('/register', register)
router.post('/login', login)

// Rutas protegidas
router.get('/profile', authenticateToken, getProfile)

// Ruta para listar empleados (útil para testing)
router.get('/empleados', listEmpleados)

export default router
