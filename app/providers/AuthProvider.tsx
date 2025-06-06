'use client'

import React, { useState, useEffect, createContext, useContext } from 'react'
import { useRouter, usePathname } from 'next/navigation'

// Rotas públicas que não requerem autenticação
const publicRoutes = ['/login']

type AdminUser = {
  id: number
  username: string
  name: string
  email: string
}

type AuthContextType = {
  user: AdminUser | null
  setUser: (u: AdminUser | null) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
  logout: () => {}
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  // Verifica se há um usuário logado ao carregar a aplicação
  useEffect(() => {
    const storedUser = localStorage.getItem('adminUser')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  // Função de logout
  const logout = () => {
    localStorage.removeItem('adminUser')
    setUser(null)
    router.push('/login')
  }

  // Redireciona baseado no estado do usuário e rota atual
  useEffect(() => {
    if (loading) return

    if (!user && !publicRoutes.includes(pathname || '')) {
      // Se não estiver autenticado e tentar acessar rota protegida
      router.replace('/login')
    } else if (user && publicRoutes.includes(pathname || '')) {
      // Se estiver autenticado e tentar acessar rota pública
      router.replace('/')
    }
  }, [loading, user, pathname, router])

  // Enquanto carrega, mostra loading
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-12 h-12 border-4 border-[#66e0cc] border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
} 