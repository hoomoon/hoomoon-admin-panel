'use client'

import { useAuth } from "@/app/providers/AuthProvider"

export function LogoutButton() {
  const { logout } = useAuth()

  return (
    <button
      onClick={logout}
      className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600 transition-colors"
    >
      Sair
    </button>
  )
} 