"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Search, Shield, DollarSign, Filter, CheckCircle, XCircle, User, Award } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { Text } from "@/components/ui/text"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"

// Sample data for releases/approvals
const mockLiberacoes = [
  {
    id: "LIB001",
    user: "Ana Souza",
    userId: "USR048",
    type: "Patrocínio",
    amount: "R$ 1.000,00",
    status: "pendente",
    time: "14:22",
    date: "19/05/2025",
    details: {
      level: "Ouro",
      duration: "3 meses",
      requestedBy: "João Silva (USR001)",
    },
  },
  {
    id: "LIB002",
    user: "Carlos Lima",
    userId: "USR036",
    type: "Voucher",
    amount: "R$ 750,00",
    status: "aprovado",
    time: "10:10",
    date: "18/05/2025",
    details: {
      voucherCode: "HOOM-VCH-123456",
      expirationDate: "18/08/2025",
      requestedBy: "Maria Santos (USR002)",
    },
  },
  {
    id: "LIB003",
    user: "Roberto Alves",
    userId: "USR072",
    type: "Saldo Manual",
    amount: "R$ 2.500,00",
    status: "pendente",
    time: "16:45",
    date: "19/05/2025",
    details: {
      reason: "Correção de erro no sistema",
      requestedBy: "Admin (ADM001)",
    },
  },
  {
    id: "LIB004",
    user: "Fernanda Costa",
    userId: "USR089",
    type: "Patrocínio",
    amount: "R$ 1.500,00",
    status: "aprovado",
    time: "09:30",
    date: "17/05/2025",
    details: {
      level: "Platina",
      duration: "6 meses",
      requestedBy: "Pedro Oliveira (USR003)",
    },
  },
  {
    id: "LIB005",
    user: "Marcelo Santos",
    userId: "USR054",
    type: "Voucher",
    amount: "R$ 500,00",
    status: "rejeitado",
    time: "11:15",
    date: "16/05/2025",
    details: {
      reason: "Usuário já possui voucher ativo",
      requestedBy: "Ana Costa (USR004)",
    },
  },
]

export default function GestaoLiberacoes() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [dateFilter, setDateFilter] = useState("")
  const [activeTab, setActiveTab] = useState("todos")

  // Calculate totals
  const totalLiberacoes = mockLiberacoes.reduce(
    (total, liberacao) => {
      const amount = Number.parseFloat(liberacao.amount.replace("R$ ", "").replace(".", "").replace(",", "."))

      if (liberacao.status === "pendente") {
        total.pending += amount
      } else if (liberacao.status === "aprovado") {
        total.approved += amount
      }

      return total
    },
    { approved: 0, pending: 0 },
  )

  // Filter liberacoes based on search term, status, type, and date
  const filteredLiberacoes = mockLiberacoes.filter((liberacao) => {
    const searchLower = searchTerm.toLowerCase()
    const matchesSearch =
      liberacao.user.toLowerCase().includes(searchLower) ||
      liberacao.userId.toLowerCase().includes(searchLower) ||
      liberacao.type.toLowerCase().includes(searchLower) ||
      liberacao.amount.toLowerCase().includes(searchLower) ||
      liberacao.id.toLowerCase().includes(searchLower)

    const matchesStatus = statusFilter === "all" ? true : liberacao.status === statusFilter
    const matchesType = typeFilter === "all" ? true : liberacao.type === typeFilter

    // Simple date filter - in a real app, you'd want to do proper date comparison
    const matchesDate = dateFilter ? liberacao.date.includes(dateFilter) : true

    // Filter by tab
    if (activeTab === "pendentes" && liberacao.status !== "pendente") return false
    if (activeTab === "aprovados" && liberacao.status !== "aprovado") return false
    if (activeTab === "rejeitados" && liberacao.status !== "rejeitado") return false

    return matchesSearch && matchesStatus && matchesType && matchesDate
  })

  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-gradient-to-b from-black to-zinc-900 text-white">
      <div className="flex flex-col md:flex-row">
        {/* Conteúdo Principal */}
        <main className="flex-1 min-h-screen w-full overflow-x-hidden pt-16 md:pt-0">
          <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
            <div className="flex justify-between items-center py-4 md:py-8">
              <h1 className="text-2xl font-bold">Gestão de Liberações</h1>
              <div className="flex items-center gap-2">
                <Link href="/">
                  <button className="bg-[#66e0cc] text-black px-4 py-2 rounded hover:bg-[#57cdb9] mr-2">
                    Voltar para o Início
                  </button>
                </Link>
                <Badge className="bg-[#66e0cc] text-black">Admin</Badge>
              </div>
            </div>

            {/* Cards de Totais */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <Card className="bg-transparent border border-[#66e0cc] hover:bg-zinc-900/30 transition-colors">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <p className="text-sm text-white">Total de Liberações</p>
                    <Shield className="h-5 w-5 text-green-400" />
                  </div>
                  <h2 className="text-2xl font-bold text-green-400">
                    R$ {(totalLiberacoes.approved + totalLiberacoes.pending).toFixed(2).replace(".", ",")}
                  </h2>
                  <p className="text-xs text-green-400 mt-1">Valor total de liberações</p>
                </CardContent>
              </Card>

              <Card className="bg-transparent border border-[#66e0cc] hover:bg-zinc-900/30 transition-colors">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <p className="text-sm text-white">Liberações Pendentes</p>
                    <DollarSign className="h-5 w-5 text-yellow-400" />
                  </div>
                  <h2 className="text-2xl font-bold text-yellow-400">
                    R$ {totalLiberacoes.pending.toFixed(2).replace(".", ",")}
                  </h2>
                  <p className="text-xs text-yellow-400 mt-1">Aguardando aprovação</p>
                </CardContent>
              </Card>

              <Card className="bg-transparent border border-[#66e0cc] hover:bg-zinc-900/30 transition-colors">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <p className="text-sm text-white">Liberações Aprovadas</p>
                    <CheckCircle className="h-5 w-5 text-green-400" />
                  </div>
                  <h2 className="text-2xl font-bold text-green-400">
                    R$ {totalLiberacoes.approved.toFixed(2).replace(".", ",")}
                  </h2>
                  <p className="text-xs text-green-400 mt-1">Processadas com sucesso</p>
                </CardContent>
              </Card>

              <Card className="bg-transparent border border-[#66e0cc] hover:bg-zinc-900/30 transition-colors">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <p className="text-sm text-white">Patrocínios Ativos</p>
                    <Award className="h-5 w-5 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">42</h2>
                  <p className="text-xs text-white mt-1">Patrocínios em andamento</p>
                </CardContent>
              </Card>
            </div>

            {/* Nova Liberação */}
            <Card className="bg-zinc-900/50 border border-zinc-800 mb-6">
              <CardContent className="p-4 md:p-6">
                <h2 className="text-xl font-semibold mb-4">Nova Liberação</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>ID do Usuário</Label>
                    <div className="relative">
                      <User className="absolute left-2 top-2.5 h-4 w-4 text-zinc-500" />
                      <Input
                        className="bg-transparent border border-[#66e0cc] text-white pl-8"
                        placeholder="Digite o ID do usuário"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Tipo de Liberação</Label>
                    <Select>
                      <SelectTrigger className="bg-transparent border border-[#66e0cc] text-white">
                        <SelectValue placeholder="Selecione o tipo" />
                      </SelectTrigger>
                      <SelectContent className="bg-zinc-800 border-zinc-700">
                        <SelectItem value="patrocinio">Patrocínio</SelectItem>
                        <SelectItem value="voucher">Voucher</SelectItem>
                        <SelectItem value="saldo">Saldo Manual</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Valor</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-2 top-2.5 h-4 w-4 text-zinc-500" />
                      <Input
                        className="bg-transparent border border-[#66e0cc] text-white pl-8"
                        placeholder="Digite o valor"
                      />
                    </div>
                  </div>
                </div>
                <div className="space-y-2 mt-4">
                  <Label>Observações</Label>
                  <Input
                    className="bg-transparent border border-[#66e0cc] text-white"
                    placeholder="Adicione observações sobre esta liberação..."
                  />
                </div>
                <Button className="bg-[#66e0cc] text-black hover:bg-[#55cebb] mt-4">
                  <Shield className="mr-2 h-4 w-4" /> Criar Liberação
                </Button>
              </CardContent>
            </Card>

            {/* Filtros */}
            <Card className="bg-zinc-900/50 border border-zinc-800 mb-6">
              <CardContent className="p-4 md:p-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Label>Buscar</Label>
                    <div className="relative">
                      <Search className="absolute left-2 top-2.5 h-4 w-4 text-zinc-500" />
                      <Input
                        className="bg-transparent border border-[#66e0cc] text-white pl-8"
                        placeholder="Buscar por usuário, ID, tipo..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Status</Label>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="bg-transparent border border-[#66e0cc] text-white">
                        <SelectValue placeholder="Selecione o status" />
                      </SelectTrigger>
                      <SelectContent className="bg-zinc-800 border-zinc-700">
                        <SelectItem value="all">Todos</SelectItem>
                        <SelectItem value="pendente">Pendente</SelectItem>
                        <SelectItem value="aprovado">Aprovado</SelectItem>
                        <SelectItem value="rejeitado">Rejeitado</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Tipo</Label>
                    <Select value={typeFilter} onValueChange={setTypeFilter}>
                      <SelectTrigger className="bg-transparent border border-[#66e0cc] text-white">
                        <SelectValue placeholder="Selecione o tipo" />
                      </SelectTrigger>
                      <SelectContent className="bg-zinc-800 border-zinc-700">
                        <SelectItem value="all">Todos</SelectItem>
                        <SelectItem value="Patrocínio">Patrocínio</SelectItem>
                        <SelectItem value="Voucher">Voucher</SelectItem>
                        <SelectItem value="Saldo Manual">Saldo Manual</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Data</Label>
                    <Input
                      type="date"
                      className="bg-transparent border border-[#66e0cc] text-white"
                      value={dateFilter}
                      onChange={(e) => setDateFilter(e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tabs */}
            <Tabs defaultValue="todos" className="w-full mb-6" onValueChange={setActiveTab} value={activeTab}>
              <TabsList className="bg-zinc-800 rounded-xl">
                <TabsTrigger value="todos">Todas as Liberações</TabsTrigger>
                <TabsTrigger value="pendentes">Pendentes</TabsTrigger>
                <TabsTrigger value="aprovados">Aprovadas</TabsTrigger>
                <TabsTrigger value="rejeitados">Rejeitadas</TabsTrigger>
              </TabsList>
            </Tabs>

            {/* Tabela de Liberações */}
            {filteredLiberacoes.length > 0 ? (
              <div className="rounded-md border border-zinc-800 overflow-hidden overflow-x-auto">
                <Table>
                  <TableHeader className="bg-zinc-900">
                    <TableRow className="border-zinc-800 hover:bg-zinc-800/50">
                      <TableHead className="text-zinc-400">Usuário</TableHead>
                      <TableHead className="text-zinc-400">ID</TableHead>
                      <TableHead className="text-zinc-400">Tipo</TableHead>
                      <TableHead className="text-zinc-400">Valor</TableHead>
                      <TableHead className="text-zinc-400">Status</TableHead>
                      <TableHead className="text-zinc-400">Data/Hora</TableHead>
                      <TableHead className="text-zinc-400">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredLiberacoes.map((liberacao) => (
                      <TableRow key={liberacao.id} className="border-zinc-800 hover:bg-zinc-800/50">
                        <TableCell className="font-medium">{liberacao.user}</TableCell>
                        <TableCell>{liberacao.userId}</TableCell>
                        <TableCell>{liberacao.type}</TableCell>
                        <TableCell>{liberacao.amount}</TableCell>
                        <TableCell>
                          <Badge
                            className={
                              liberacao.status === "aprovado"
                                ? "bg-green-500/20 text-green-400 hover:bg-green-500/20"
                                : liberacao.status === "pendente"
                                  ? "bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/20"
                                  : "bg-red-500/20 text-red-400 hover:bg-red-500/20"
                            }
                          >
                            {liberacao.status.charAt(0).toUpperCase() + liberacao.status.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {liberacao.date} às {liberacao.time}
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="outline" size="sm" className="h-8 border-zinc-700 hover:bg-zinc-800">
                                  Detalhes
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="bg-zinc-900 border-zinc-700 text-white">
                                <DialogHeader>
                                  <DialogTitle>Detalhes da Liberação</DialogTitle>
                                  <DialogDescription className="text-zinc-400">
                                    ID: {liberacao.id} | Usuário: {liberacao.user}
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4 py-4">
                                  <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                      <Text className="text-zinc-400">Tipo</Text>
                                      <Text className="text-white">{liberacao.type}</Text>
                                    </div>
                                    <div className="space-y-1">
                                      <Text className="text-zinc-400">Valor</Text>
                                      <Text className="text-white">{liberacao.amount}</Text>
                                    </div>
                                    <div className="space-y-1">
                                      <Text className="text-zinc-400">Status</Text>
                                      <Badge
                                        className={
                                          liberacao.status === "aprovado"
                                            ? "bg-green-500/20 text-green-400 hover:bg-green-500/20"
                                            : liberacao.status === "pendente"
                                              ? "bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/20"
                                              : "bg-red-500/20 text-red-400 hover:bg-red-500/20"
                                        }
                                      >
                                        {liberacao.status.charAt(0).toUpperCase() + liberacao.status.slice(1)}
                                      </Badge>
                                    </div>
                                    <div className="space-y-1">
                                      <Text className="text-zinc-400">Data/Hora</Text>
                                      <Text className="text-white">
                                        {liberacao.date} às {liberacao.time}
                                      </Text>
                                    </div>
                                  </div>

                                  <div className="pt-4 border-t border-zinc-800">
                                    <Text className="text-white font-medium mb-2">Informações Adicionais</Text>
                                    {liberacao.type === "Patrocínio" && (
                                      <div className="space-y-2">
                                        <div className="flex justify-between">
                                          <Text className="text-zinc-400">Nível</Text>
                                          <Text className="text-white">{liberacao.details.level}</Text>
                                        </div>
                                        <div className="flex justify-between">
                                          <Text className="text-zinc-400">Duração</Text>
                                          <Text className="text-white">{liberacao.details.duration}</Text>
                                        </div>
                                        <div className="flex justify-between">
                                          <Text className="text-zinc-400">Solicitado por</Text>
                                          <Text className="text-white">{liberacao.details.requestedBy}</Text>
                                        </div>
                                      </div>
                                    )}
                                    {liberacao.type === "Voucher" && (
                                      <div className="space-y-2">
                                        {liberacao.status === "aprovado" && (
                                          <div className="flex justify-between">
                                            <Text className="text-zinc-400">Código do Voucher</Text>
                                            <Text className="text-white">{liberacao.details.voucherCode}</Text>
                                          </div>
                                        )}
                                        <div className="flex justify-between">
                                          <Text className="text-zinc-400">Data de Expiração</Text>
                                          <Text className="text-white">{liberacao.details.expirationDate}</Text>
                                        </div>
                                        <div className="flex justify-between">
                                          <Text className="text-zinc-400">Solicitado por</Text>
                                          <Text className="text-white">{liberacao.details.requestedBy}</Text>
                                        </div>
                                      </div>
                                    )}
                                    {liberacao.type === "Saldo Manual" && (
                                      <div className="space-y-2">
                                        <div className="flex justify-between">
                                          <Text className="text-zinc-400">Motivo</Text>
                                          <Text className="text-white">{liberacao.details.reason}</Text>
                                        </div>
                                        <div className="flex justify-between">
                                          <Text className="text-zinc-400">Solicitado por</Text>
                                          <Text className="text-white">{liberacao.details.requestedBy}</Text>
                                        </div>
                                      </div>
                                    )}
                                  </div>

                                  {liberacao.status === "rejeitado" && (
                                    <div className="pt-4 border-t border-zinc-800">
                                      <Text className="text-white font-medium mb-2">Motivo da Rejeição</Text>
                                      <Text className="text-red-400">{liberacao.details.reason}</Text>
                                    </div>
                                  )}
                                </div>
                                <DialogFooter className="flex gap-2">
                                  {liberacao.status === "pendente" && (
                                    <>
                                      <Button className="bg-green-500 hover:bg-green-600">Aprovar</Button>
                                      <Button className="bg-red-500 hover:bg-red-600">Rejeitar</Button>
                                    </>
                                  )}
                                  {liberacao.status === "aprovado" && (
                                    <Button className="bg-[#66e0cc] text-black hover:bg-[#55cebb]">
                                      Gerar Comprovante
                                    </Button>
                                  )}
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>

                            {liberacao.status === "pendente" && (
                              <>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="h-8 border-green-600 text-green-500 hover:bg-green-900/20"
                                >
                                  Aprovar
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="h-8 border-red-600 text-red-500 hover:bg-red-900/20"
                                >
                                  Rejeitar
                                </Button>
                              </>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="text-center py-10 bg-zinc-900/50 rounded-lg border border-zinc-800">
                <Shield className="h-10 w-10 mx-auto text-zinc-500 mb-4" />
                <h3 className="text-lg font-medium">Nenhuma liberação encontrada</h3>
                <p className="text-zinc-400 mt-1">Tente ajustar seus filtros de busca.</p>
              </div>
            )}

            {/* Ações em Lote */}
            {filteredLiberacoes.length > 0 && (
              <div className="mt-6 flex flex-col md:flex-row gap-4">
                <Button className="bg-green-500 hover:bg-green-600">
                  <CheckCircle className="mr-2 h-4 w-4" /> Aprovar Selecionados
                </Button>
                <Button className="bg-red-500 hover:bg-red-600">
                  <XCircle className="mr-2 h-4 w-4" /> Rejeitar Selecionados
                </Button>
                <Button className="bg-[#66e0cc] text-black hover:bg-[#55cebb]">
                  <Filter className="mr-2 h-4 w-4" /> Exportar Relatório
                </Button>
              </div>
            )}
          </div>
        </main>
      </div>
    </main>
  )
}
