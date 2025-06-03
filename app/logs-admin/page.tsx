"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Download, Filter, Home, Trash2 } from "lucide-react"
import { obterLogsAdmin, obterAdminLogado, limparLogsAdmin, simularLoginAdmin } from "@/utils/admin-logs"

// Tipo para os logs
type LogAdmin = {
  nome: string
  email: string
  telefone: string
  acao: string
  horario: string
  usuarioAfetado: string
}

// Admin mockado para testes iniciais
const mockAdmin = {
  nome: "João Silva",
  email: "joao@email.com",
  telefone: "(11) 99999-0000",
}

export default function LogsAdminPage() {
  const [admin, setAdmin] = useState<any>(null)
  const [logs, setLogs] = useState<LogAdmin[]>([])
  const [filteredLogs, setFilteredLogs] = useState<LogAdmin[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  // Carregar admin e logs do localStorage
  useEffect(() => {
    // Simular login se não houver admin logado
    const adminLogado = obterAdminLogado()
    if (!adminLogado) {
      simularLoginAdmin(mockAdmin)
    }

    setAdmin(obterAdminLogado())
    setLogs(obterLogsAdmin())
    setFilteredLogs(obterLogsAdmin())
    setIsLoading(false)
  }, [])

  // Filtrar logs com base no termo de busca
  useEffect(() => {
    if (searchTerm) {
      const filtered = logs.filter(
        (log) =>
          log.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
          log.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          log.acao.toLowerCase().includes(searchTerm.toLowerCase()) ||
          log.usuarioAfetado.toLowerCase().includes(searchTerm.toLowerCase()),
      )
      setFilteredLogs(filtered)
    } else {
      setFilteredLogs(logs)
    }
  }, [searchTerm, logs])

  // Limpar todos os logs
  const handleClearLogs = () => {
    if (confirm("Tem certeza que deseja limpar todos os logs? Esta ação não pode ser desfeita.")) {
      limparLogsAdmin()
      setLogs([])
      setFilteredLogs([])
    }
  }

  // Exportar logs como CSV
  const handleExportLogs = () => {
    const headers = ["Nome", "E-mail", "Telefone", "Ação", "Data/Hora", "Usuário Afetado"]
    const csvContent = [
      headers.join(","),
      ...logs.map((log) =>
        [
          `"${log.nome}"`,
          `"${log.email}"`,
          `"${log.telefone}"`,
          `"${log.acao}"`,
          `"${log.horario}"`,
          `"${log.usuarioAfetado}"`,
        ].join(","),
      ),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.setAttribute("href", url)
    link.setAttribute("download", `logs_admin_${new Date().toISOString().split("T")[0]}.csv`)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="p-4 w-full min-h-screen bg-gradient-to-b from-black to-zinc-900 text-white">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <Link href="/">
            <Button variant="outline" size="sm" className="border-[#66e0cc] text-[#66e0cc] hover:bg-[#66e0cc]/10">
              <Home className="mr-2 h-4 w-4" /> Voltar para o Início
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Logs de Ações Administrativas</h1>
        </div>
        {admin && (
          <div className="text-sm text-white text-right bg-zinc-800/50 p-3 rounded-lg border border-zinc-700">
            <p>
              <strong>Logado como:</strong>
            </p>
            <p>{admin.nome}</p>
            <p>{admin.email}</p>
            <p>{admin.telefone}</p>
          </div>
        )}
      </div>

      <div className="mb-6 flex gap-4">
        <input
          type="text"
          placeholder="Buscar por nome, email, ação ou usuário afetado..."
          className="flex-1 p-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button variant="destructive" onClick={handleClearLogs} disabled={logs.length === 0}>
          <Trash2 className="mr-2 h-4 w-4" /> Limpar Logs
        </Button>
      </div>

      <div className="bg-zinc-900/50 rounded-xl p-4 shadow overflow-x-auto border border-zinc-800">
        {isLoading ? (
          <div className="py-8 text-center">Carregando logs...</div>
        ) : (
          <table className="w-full text-sm text-left">
            <thead className="border-b border-zinc-800">
              <tr>
                <th className="py-3 px-4">Nome</th>
                <th className="py-3 px-4">E-mail</th>
                <th className="py-3 px-4">Telefone</th>
                <th className="py-3 px-4">Ação</th>
                <th className="py-3 px-4">Data/Hora</th>
                <th className="py-3 px-4">Usuário Afetado</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.length > 0 ? (
                filteredLogs.map((log, index) => (
                  <tr key={index} className="border-b border-zinc-800 hover:bg-zinc-800/30">
                    <td className="py-3 px-4">{log.nome}</td>
                    <td className="py-3 px-4">{log.email}</td>
                    <td className="py-3 px-4">{log.telefone}</td>
                    <td className="py-3 px-4">{log.acao}</td>
                    <td className="py-3 px-4">{log.horario}</td>
                    <td className="py-3 px-4">{log.usuarioAfetado}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-8 px-4 text-center">
                    {logs.length === 0 ? (
                      <div className="flex flex-col items-center gap-2">
                        <p>Nenhum log de ação administrativa registrado.</p>
                        <p className="text-zinc-400 text-xs">
                          As ações administrativas serão registradas automaticamente quando realizadas.
                        </p>
                      </div>
                    ) : (
                      "Nenhum log encontrado com os critérios de busca."
                    )}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      <div className="mt-6 flex flex-wrap gap-4">
        <Button
          className="bg-[#66e0cc] text-black hover:bg-[#55cebb]"
          onClick={handleExportLogs}
          disabled={logs.length === 0}
        >
          <Download className="mr-2 h-4 w-4" /> Exportar Logs
        </Button>
        <Button variant="outline" className="border-zinc-700 text-white hover:bg-zinc-800">
          <Filter className="mr-2 h-4 w-4" /> Filtrar por Data
        </Button>
        <Button variant="outline" className="border-zinc-700 text-white hover:bg-zinc-800">
          <Filter className="mr-2 h-4 w-4" /> Filtrar por Administrador
        </Button>
        <Button variant="outline" className="border-zinc-700 text-white hover:bg-zinc-800">
          <Filter className="mr-2 h-4 w-4" /> Filtrar por Tipo de Ação
        </Button>
      </div>
    </div>
  )
}
