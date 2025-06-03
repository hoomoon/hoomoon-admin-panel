"use client"

import { useState } from "react"
import Link from "next/link"
import { DollarSign, TrendingUp, CreditCard, Clock, User, LogOut } from "lucide-react"

export default function DashboardUsuario() {
  const [saldo, setSaldo] = useState(5000)
  const [investimentos, setInvestimentos] = useState([
    { id: 1, nome: "Plano Básico", valor: 1000, rendimento: "5% ao mês", status: "Ativo" },
    { id: 2, nome: "Plano Premium", valor: 2500, rendimento: "8% ao mês", status: "Ativo" },
  ])

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="bg-zinc-900 p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-[#66e0cc]">HOOMOON</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm hidden md:inline">Olá, João Silva</span>
          <Link href="/login" className="p-2 rounded-full bg-zinc-800 hover:bg-zinc-700">
            <LogOut size={18} />
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-4 max-w-6xl mx-auto">
        {/* Saldo Card */}
        <div className="bg-zinc-900 rounded-xl p-6 mb-6 border border-zinc-800">
          <h2 className="text-lg font-medium mb-2">Seu Saldo</h2>
          <p className="text-3xl font-bold text-[#66e0cc]">R$ {saldo.toLocaleString("pt-BR")}</p>
          <div className="flex gap-2 mt-4">
            <Link
              href="/depositar"
              className="bg-[#66e0cc] text-black px-4 py-2 rounded text-sm font-medium hover:bg-[#57cdb9]"
            >
              Depositar
            </Link>
            <Link
              href="/sacar"
              className="bg-zinc-800 text-white px-4 py-2 rounded text-sm font-medium hover:bg-zinc-700"
            >
              Sacar
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-zinc-900 rounded-xl p-4 border border-zinc-800">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp size={20} className="text-[#66e0cc]" />
              <h3 className="font-medium">Rendimentos</h3>
            </div>
            <p className="text-2xl font-bold">R$ 280,00</p>
            <p className="text-xs text-zinc-400">Este mês</p>
          </div>

          <div className="bg-zinc-900 rounded-xl p-4 border border-zinc-800">
            <div className="flex items-center gap-2 mb-2">
              <CreditCard size={20} className="text-[#66e0cc]" />
              <h3 className="font-medium">Investido</h3>
            </div>
            <p className="text-2xl font-bold">R$ 3.500,00</p>
            <p className="text-xs text-zinc-400">Total</p>
          </div>

          <div className="bg-zinc-900 rounded-xl p-4 border border-zinc-800">
            <div className="flex items-center gap-2 mb-2">
              <Clock size={20} className="text-[#66e0cc]" />
              <h3 className="font-medium">Próximo Rendimento</h3>
            </div>
            <p className="text-2xl font-bold">15/05/2023</p>
            <p className="text-xs text-zinc-400">Em 7 dias</p>
          </div>
        </div>

        {/* Investimentos */}
        <div className="bg-zinc-900 rounded-xl p-6 mb-6 border border-zinc-800">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium">Seus Investimentos</h2>
            <Link href="/investir" className="text-sm text-[#66e0cc] hover:underline">
              Ver todos
            </Link>
          </div>

          <div className="space-y-4">
            {investimentos.map((inv) => (
              <div key={inv.id} className="bg-zinc-800 p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">{inv.nome}</h3>
                  <span className="text-xs px-2 py-1 bg-green-900/30 text-green-400 rounded-full">{inv.status}</span>
                </div>
                <p className="text-xl font-bold mt-2">R$ {inv.valor.toLocaleString("pt-BR")}</p>
                <div className="flex justify-between items-center mt-2 text-sm">
                  <span className="text-zinc-400">
                    Rendimento: <span className="text-[#66e0cc]">{inv.rendimento}</span>
                  </span>
                  <Link href={`/investimento/${inv.id}`} className="text-[#66e0cc] hover:underline">
                    Detalhes
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <Link
            href="/investir"
            className="block w-full text-center bg-[#66e0cc] text-black px-4 py-2 rounded text-sm font-medium hover:bg-[#57cdb9] mt-4"
          >
            Fazer Novo Investimento
          </Link>
        </div>

        {/* Histórico Recente */}
        <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium">Histórico Recente</h2>
            <Link href="/historico" className="text-sm text-[#66e0cc] hover:underline">
              Ver tudo
            </Link>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b border-zinc-800">
              <div className="flex items-center gap-3">
                <div className="bg-green-900/30 p-2 rounded-full">
                  <TrendingUp size={16} className="text-green-400" />
                </div>
                <div>
                  <p className="font-medium">Rendimento</p>
                  <p className="text-xs text-zinc-400">10 Mai 2023</p>
                </div>
              </div>
              <p className="text-green-400">+R$ 80,00</p>
            </div>

            <div className="flex justify-between items-center py-2 border-b border-zinc-800">
              <div className="flex items-center gap-3">
                <div className="bg-blue-900/30 p-2 rounded-full">
                  <CreditCard size={16} className="text-blue-400" />
                </div>
                <div>
                  <p className="font-medium">Depósito</p>
                  <p className="text-xs text-zinc-400">05 Mai 2023</p>
                </div>
              </div>
              <p className="text-blue-400">+R$ 1.000,00</p>
            </div>

            <div className="flex justify-between items-center py-2">
              <div className="flex items-center gap-3">
                <div className="bg-red-900/30 p-2 rounded-full">
                  <CreditCard size={16} className="text-red-400" />
                </div>
                <div>
                  <p className="font-medium">Saque</p>
                  <p className="text-xs text-zinc-400">01 Mai 2023</p>
                </div>
              </div>
              <p className="text-red-400">-R$ 500,00</p>
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-zinc-900 border-t border-zinc-800 p-2 md:hidden">
        <div className="flex justify-around">
          <Link href="/dashboard-usuario" className="flex flex-col items-center p-2 text-[#66e0cc]">
            <User size={20} />
            <span className="text-xs mt-1">Início</span>
          </Link>
          <Link href="/investir" className="flex flex-col items-center p-2 text-zinc-400 hover:text-[#66e0cc]">
            <TrendingUp size={20} />
            <span className="text-xs mt-1">Investir</span>
          </Link>
          <Link href="/depositar" className="flex flex-col items-center p-2 text-zinc-400 hover:text-[#66e0cc]">
            <DollarSign size={20} />
            <span className="text-xs mt-1">Depositar</span>
          </Link>
          <Link href="/historico" className="flex flex-col items-center p-2 text-zinc-400 hover:text-[#66e0cc]">
            <Clock size={20} />
            <span className="text-xs mt-1">Histórico</span>
          </Link>
        </div>
      </nav>
    </div>
  )
}
