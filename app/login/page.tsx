"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { registrarAcaoAdmin } from "@/utils/admin-logs"
import { adminLogin } from "@/utils/api"
import { useAuth } from "../providers/AuthProvider"

export default function LoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { setUser } = useAuth()
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const response = await adminLogin(username, password)
      
      // Armazenar dados do usuário no localStorage e no contexto
      localStorage.setItem("adminUser", JSON.stringify(response.user))
      setUser(response.user)

      // Registrar a ação de login
      registrarAcaoAdmin({
        acao: "Realizou login no sistema",
        usuarioAfetado: undefined,
      })

      router.push("/") // Redirecionar para a dashboard
    } catch (error: any) {
      console.error("Erro ao fazer login:", error)
      if (error.non_field_errors) {
        setError(error.non_field_errors[0])
      } else if (error.detail) {
        setError(error.detail)
      } else {
        setError("Ocorreu um erro ao fazer login. Tente novamente.")
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black flex items-center justify-center px-4">
      <div className="bg-zinc-950 shadow-lg rounded-2xl p-8 w-full max-w-md border border-[#66e0cc]">
        <h1 className="text-3xl font-bold text-white text-center mb-6">Login Administrativo</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          {error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded text-sm">
              {error}
            </div>
          )}
          <div>
            <label className="block mb-1 text-sm text-white">Usuário</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Digite seu usuário"
              className="w-full px-4 py-2 bg-zinc-800 border border-white/20 rounded text-white focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-sm text-white">Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
          <div className="flex justify-center text-sm text-white mt-4">
            <Link href="/recuperar-senha" className="text-[#66e0cc] hover:underline">
              Esqueceu a senha?
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
