'use client'

import { useAuth } from "@/app/providers/AuthProvider"
import { LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"

export function LogoutButton() {
  const { logout } = useAuth()

  return (
    <Button
      variant="ghost"
      onClick={logout}
      className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-red-400/10"
    >
      <LogOut className="mr-2 h-5 w-5" /> Sair
    </Button>
  )
} 