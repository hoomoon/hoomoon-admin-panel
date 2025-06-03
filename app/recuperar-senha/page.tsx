"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function RecuperarSenhaPage() {
  const [email, setEmail] = useState("")
  const [enviado, setEnviado] = useState(false)
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) {
      alert("Por favor, digite seu e-mail.")
      return
    }

    // Simulação de envio de e-mail de recuperação
    setEnviado(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black flex items-center justify-center px-4">
      <div className="bg-zinc-950 shadow-lg rounded-2xl p-8 w-full max-w-md border border-[#66e0cc]">
        <div className="flex items-center mb-6">
          <Link href="/login" className="text-white hover:text-[#66e0cc] mr-4">
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-2xl font-bold text-white">Recuperar Senha</h1>
        </div>

        {!enviado ? (
          <>
            <p className="text-zinc-400 mb-6">
              Digite seu e-mail cadastrado para receber as instruções de recuperação de senha.
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block mb-1 text-sm text-white">E-mail</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Digite seu e-mail"
                  className="w-full px-4 py-2 bg-zinc-800 border border-white/20 rounded text-white focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="w-full mt-4 bg-[#66e0cc] hover:bg-[#57cdb9] text-black font-semibold py-2 rounded"
              >
                Enviar Instruções
              </button>
            </form>
          </>
        ) : (
          <div className="text-center">
            <div className="bg-green-900/30 p-4 rounded-lg mb-6">
              <p className="text-green-400 font-medium">E-mail enviado com sucesso!</p>
            </div>
            <p className="text-zinc-400 mb-6">
              Enviamos um e-mail para <span className="text-white font-medium">{email}</span> com as instruções para
              recuperar sua senha.
            </p>
            <p className="text-zinc-400 mb-6">Verifique sua caixa de entrada e também a pasta de spam.</p>
            <Link href="/login" className="text-[#66e0cc] hover:underline">
              Voltar para o login
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
