"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import {
  Menu,
  X,
  Home,
  ArrowUpCircle,
  TrendingUp,
  BarChart2,
  Users,
  Award,
  DollarSign,
  ArrowDownCircle,
  HelpCircle,
  Settings,
  FileText,
} from "lucide-react"
import Link from "next/link"

// Define os itens do menu com ícones
const menuItems = [
  { href: "/inicio", label: "Início", icon: Home },
  { href: "/fazer-deposito", label: "Fazer Depósito", icon: ArrowUpCircle },
  { href: "/investir", label: "Investir", icon: TrendingUp },
  { href: "/meus-investimentos", label: "Meus Investimentos", icon: BarChart2 },
  { href: "/minha-rede", label: "Minha Rede", icon: Users },
  { href: "/afiliados", label: "Programa de Afiliados", icon: Award },
  { href: "/meus-ganhos", label: "Meus Ganhos", icon: DollarSign },
  { href: "/saque", label: "Saque", icon: ArrowDownCircle },
  { href: "/suporte", label: "Suporte", icon: HelpCircle },
  { href: "/configuracao", label: "Configuração", icon: Settings },
  { href: "/material-marketing", label: "Material de Marketing", icon: FileText },
]

export default function MobileSidebarLayout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  // Fecha o menu quando a rota muda (útil para navegação em dispositivos móveis)
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  // Impede a rolagem do body quando o menu está aberto em dispositivos móveis
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }

    return () => {
      document.body.style.overflow = "auto"
    }
  }, [open])

  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-black text-white">
      {/* Botão de abrir menu no topo */}
      <header className="flex justify-between items-center p-4 md:hidden">
        <button
          onClick={() => setOpen(true)}
          className="text-white hover:text-[#66e0cc] transition-colors"
          aria-label="Abrir menu"
        >
          <Menu size={28} />
        </button>
        <h1 className="text-xl font-bold text-[#66e0cc]">HOOMOON</h1>
      </header>

      {/* Overlay para fechar o menu (visível apenas em dispositivos móveis quando o menu está aberto) */}
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Menu Lateral */}
      <aside
        className={`fixed top-0 left-0 h-full w-[80%] max-w-xs bg-[#0a0a0a] z-50 transition-transform duration-300 ease-in-out overflow-y-auto ${
          open ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:static md:w-64 md:block shadow-lg`}
      >
        <div className="flex justify-between items-center p-4 border-b border-zinc-800">
          <h2 className="text-2xl font-bold text-[#66e0cc]">HOOMOON</h2>
          <button
            onClick={() => setOpen(false)}
            className="md:hidden text-white hover:text-[#66e0cc] transition-colors"
            aria-label="Fechar menu"
          >
            <X size={24} />
          </button>
        </div>

        <nav className="space-y-1 px-2 py-4">
          {menuItems.map((item) => {
            const isActive = pathname === item.href
            const Icon = item.icon

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center px-2 py-2 rounded-md transition-colors ${
                  isActive
                    ? "bg-zinc-800 text-[#66e0cc] border-l-4 border-[#66e0cc]"
                    : "hover:bg-zinc-900 hover:text-[#66e0cc]"
                }`}
                aria-current={isActive ? "page" : undefined}
              >
                <Icon className="mr-3 h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            )
          })}
        </nav>

        {/* Perfil do usuário na parte inferior */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-zinc-800">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-[#66e0cc]">
              <span className="text-lg font-bold">U</span>
            </div>
            <div>
              <p className="text-sm font-medium">Usuário</p>
              <p className="text-xs text-zinc-400">usuario@hoomoon.com</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Conteúdo principal */}
      <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 md:ml-64 transition-all duration-300 overflow-x-hidden">
        {children}
      </div>
    </main>
  )
}
