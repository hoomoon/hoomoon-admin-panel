"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function CadastroPage() {
  const [nome, setNome] = useState("")
  const [email, setEmail] = useState("")
  const [telefone, setTelefone] = useState("")
  const [senha, setSenha] = useState("")
  const [confirmarSenha, setConfirmarSenha] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleCadastro = (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Validações básicas
      if (senha !== confirmarSenha) {
        alert("As senhas não coincidem")
        setLoading(false)
        return
      }

      if (senha.length < 6) {
        alert("A senha deve ter pelo menos 6 caracteres")
        setLoading(false)
        return
      }

      // Verificar se o email já está cadastrado
      const admins = JSON.parse(localStorage.getItem("admins") || "[]")
      const emailExistente = admins.some((admin) => admin.email === email)

      if (emailExistente) {
        alert("Este email já está cadastrado")
        setLoading(false)
        return
      }

      // Criar novo admin
      const novoAdmin = {
        nome,
        email,
        telefone,
        senha,
      }

      // Adicionar à lista de admins
      admins.push(novoAdmin)
      localStorage.setItem("admins", JSON.stringify(admins))

      // Redirecionar para login
      alert("Cadastro realizado com sucesso!")
      router.push("/login")
    } catch (error) {
      console.error("Erro ao cadastrar:", error)
      alert("Ocorreu um erro ao cadastrar. Tente novamente.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black flex items-center justify-center px-4 py-8">
      <div className="bg-zinc-950 shadow-lg rounded-2xl p-8 w-full max-w-md border border-[#66e0cc]">
        <h1 className="text-3xl font-bold text-white text-center mb-6">Cadastro</h1>
        <form onSubmit={handleCadastro} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm text-white">Nome Completo</label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Digite seu nome completo"
              className="w-full px-4 py-2 bg-zinc-800 border border-white/20 rounded text-white focus:outline-none"
              required
            />
          </div>
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
            <label className="block mb-1 text-sm text-white">Telefone</label>
            <input
              type="tel"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
              placeholder="(00) 00000-0000"
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
              minLength={6}
            />
          </div>
          <div>
            <label className="block mb-1 text-sm text-white">Confirmar Senha</label>
            <input
              type="password"
              value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
              placeholder="Confirme sua senha"
              className="w-full px-4 py-2 bg-zinc-800 border border-white/20 rounded text-white focus:outline-none"
              required
              minLength={6}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 bg-[#66e0cc] hover:bg-[#57cdb9] text-black font-semibold py-2 rounded disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? "Cadastrando..." : "Cadastrar"}
          </button>
          <p className="text-sm text-center text-white mt-4">
            Já tem uma conta?{" "}
            <Link href="/login" className="text-[#66e0cc] hover:underline">
              Faça login
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}
