const API_BASE_URL = 'http://localhost:3001/api'

// Configuración por defecto para fetch
const defaultOptions = {
  headers: {
    'Content-Type': 'application/json',
  },
}

// Función helper para hacer solicitudes
const apiRequest = async (endpoint: string, options: RequestInit = {}) => {
  const url = `${API_BASE_URL}${endpoint}`
  
  const config = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  }

  // Agregar token si está disponible
  const token = localStorage.getItem('authToken')
  if (token) {
    ;(config.headers as any).Authorization = `Bearer ${token}`
  }

  try {
    const response = await fetch(url, config)
    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Error en la solicitud')
    }

    return data
  } catch (error) {
    console.error('API Error:', error)
    throw error
  }
}

// Tipos para TypeScript
export interface LoginCredentials {
  empleadoId: number
  clave: string
}

export interface RegisterData {
  paterno: string
  materno?: string
  nombres: string
  direccion?: string
  telefono?: string
  clave: string
}

export interface User {
  id: number
  paterno: string
  materno?: string
  nombres: string
  direccion?: string
  telefono?: string
}

export interface AuthResponse {
  success: boolean
  message: string
  token?: string
  user?: User
}

// Servicios de autenticación
export const authService = {
  // Iniciar sesión
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    })

    // Guardar token en localStorage
    if (response.success && response.token) {
      localStorage.setItem('authToken', response.token)
      localStorage.setItem('user', JSON.stringify(response.user))
    }

    return response
  },

  // Registrar empleado
  register: async (userData: RegisterData): Promise<AuthResponse> => {
    const response = await apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    })

    // Guardar token en localStorage
    if (response.success && response.token) {
      localStorage.setItem('authToken', response.token)
      localStorage.setItem('user', JSON.stringify(response.user))
    }

    return response
  },

  // Obtener perfil
  getProfile: async (): Promise<AuthResponse> => {
    return await apiRequest('/auth/profile')
  },

  // Obtener lista de empleados
  getEmpleados: async () => {
    return await apiRequest('/auth/empleados')
  },

  // Cerrar sesión
  logout: () => {
    localStorage.removeItem('authToken')
    localStorage.removeItem('user')
  },

  // Verificar si está autenticado
  isAuthenticated: (): boolean => {
    return !!localStorage.getItem('authToken')
  },

  // Obtener usuario actual
  getCurrentUser: (): User | null => {
    const userStr = localStorage.getItem('user')
    return userStr ? JSON.parse(userStr) : null
  },

  // Verificar health del servidor
  healthCheck: async () => {
    return await apiRequest('/health')
  }
}

export default authService
