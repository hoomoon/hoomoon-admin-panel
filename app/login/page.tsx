"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { registrarAcaoAdmin } from "@/utils/admin-logs"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const admins = JSON.parse(localStorage.getItem("admins") || "[]")

      // Se não houver admins cadastrados, criar um admin padrão para testes
      if (admins.length === 0) {
        const adminPadrao = {
          nome: "Administrador",
          email: "admin@hoomoon.com",
          telefone: "(11) 99999-9999",
          senha: "admin123",
        }
        localStorage.setItem("admins", JSON.stringify([adminPadrao]))

        // Se as credenciais corresponderem ao admin padrão, fazer login
        if (email === adminPadrao.email && senha === adminPadrao.senha) {
          localStorage.setItem("adminLogado", JSON.stringify(adminPadrao))

          // Registrar a ação de login
          registrarAcaoAdmin({
            acao: "Realizou login no sistema",
            usuarioAfetado: undefined,
          })

          router.push("/") // Redirecionar para a dashboard
          return
        }
      }

      const adminLogado = admins.find((admin) => admin.email === email && admin.senha === senha)

      if (adminLogado) {
        localStorage.setItem("adminLogado", JSON.stringify(adminLogado))

        // Registrar a ação de login
        registrarAcaoAdmin({
          acao: "Realizou login no sistema",
          usuarioAfetado: undefined,
        })

        router.push("/") // Redirecionar para a dashboard
      } else {
        alert("E-mail ou senha incorretos")
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error)
      alert("Ocorreu um erro ao fazer login. Tente novamente.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black flex items-center justify-center px-4">
      <div className="bg-zinc-950 shadow-lg rounded-2xl p-8 w-full max-w-md border border-[#66e0cc]">
        <h1 className="text-3xl font-bold text-white text-center mb-6">Login</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm text-white">E-mail</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Digite seu e-mail"
              className="w-full px-4 py-2 bg-zinc-800 border border-white/20 rounded text-white focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-sm text-white">Senha</label>
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="Digite sua senha"
              className="w-full px-4 py-2 bg-zinc-800 border border-white/20 rounded text-white focus:outline-none"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 bg-[#66e0cc] hover:bg-[#57cdb9] text-black font-semibold py-2 rounded disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
          <div className="flex justify-between text-sm text-white mt-4">
            <Link href="/recuperar-senha" className="text-[#66e0cc] hover:underline">
              Esqueceu a senha?
            </Link>
            <Link href="/cadastro" className="text-[#66e0cc] hover:underline">
              Criar conta
            </Link>
          </div>
        </form>

        {/* Informações de teste */}
        <div className="mt-8 p-3 bg-zinc-900 rounded-lg border border-zinc-800">
          <p className="text-xs text-zinc-400 mb-2">Para testes, use:</p>
          <p className="text-xs text-zinc-400">Email: admin@hoomoon.com</p>
          <p className="text-xs text-zinc-400">Senha: admin123</p>
        </div>
      </div>
    </div>
  )
}
