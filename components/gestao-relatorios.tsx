"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  FileText,
  DollarSign,
  ArrowDownCircle,
  ArrowUpCircle,
  Users,
  TrendingUp,
  Calendar,
  Download,
  Filter,
  BarChart2,
  PieChart,
  Search,
} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Text } from "@/components/ui/text"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import Link from "next/link"

// Sample data for historical records
const mockHistorico = [
  {
    id: "TRX001",
    date: "19/05/2025",
    time: "14:32",
    event: "Depósito",
    amount: "R$ 2.000,00",
    user: "João Dias",
    userId: "USR001",
    status: "aprovado",
    details: {
      method: "Pix",
      transactionId: "E12345678901234567890123456789012345",
    },
  },
  {
    id: "TRX002",
    date: "18/05/2025",
    time: "10:45",
    event: "Saque",
    amount: "R$ 1.000,00",
    user: "Maria Lima",
    userId: "USR002",
    status: "pendente",
    details: {
      method: "Pix",
      pixKey: "maria@email.com",
    },
  },
  {
    id: "TRX003",
    date: "17/05/2025",
    time: "16:20",
    event: "Investimento",
    amount: "R$ 5.000,00",
    user: "Carlos Souza",
    userId: "USR003",
    status: "concluído",
    details: {
      plan: "Premium",
      duration: "3 meses",
    },
  },
  {
    id: "TRX004",
    date: "16/05/2025",
    time: "09:15",
    event: "Comissão",
    amount: "R$ 350,00",
    user: "Ana Costa",
    userId: "USR004",
    status: "aprovado",
    details: {
      type: "Indicação",
      referredUser: "Pedro Silva (USR010)",
    },
  },
  {
    id: "TRX005",
    date: "15/05/2025",
    time: "11:30",
    event: "Liberação",
    amount: "R$ 1.500,00",
    user: "Fernando Oliveira",
    userId: "USR005",
    status: "aprovado",
    details: {
      type: "Patrocínio",
      level: "Ouro",
    },
  },
]

// Sample data for platform statistics
const platformStats = {
  depositos: {
    total: "R$ 102.430,00",
    count: 487,
    growth: "+12,5%",
  },
  saques: {
    total: "R$ 78.120,00",
    count: 356,
    growth: "+8,3%",
  },
  comissoes: {
    total: "R$ 14.750,00",
    count: 215,
    growth: "+15,2%",
  },
  investimentos: {
    total: "R$ 245.890,00",
    count: 356,
    growth: "+5,7%",
  },
  usuarios: {
    total: 1102,
    active: 876,
    inactive: 226,
    growth: "+3,4%",
  },
  faturas: {
    total: 1872,
    paid: 1654,
    pending: 218,
    growth: "+7,8%",
  },
}

export default function GestaoRelatorios() {
  const [searchTerm, setSearchTerm] = useState("")
  const [eventFilter, setEventFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [dateFilter, setDateFilter] = useState("")
  const [activeTab, setActiveTab] = useState("geral")

  // Filter historical records based on search term, event, status, and date
  const filteredHistorico = mockHistorico.filter((record) => {
    const searchLower = searchTerm.toLowerCase()
    const matchesSearch =
      record.user.toLowerCase().includes(searchLower) ||
      record.userId.toLowerCase().includes(searchLower) ||
      record.event.toLowerCase().includes(searchLower) ||
      record.amount.toLowerCase().includes(searchLower) ||
      record.id.toLowerCase().includes(searchLower)

    const matchesEvent = eventFilter === "all" ? true : record.event === eventFilter
    const matchesStatus = statusFilter === "all" ? true : record.status === statusFilter

    // Simple date filter - in a real app, you'd want to do proper date comparison
    const matchesDate = dateFilter ? record.date.includes(dateFilter) : true

    return matchesSearch && matchesEvent && matchesStatus && matchesDate
  })

  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-gradient-to-b from-black to-zinc-900 text-white">
      <div className="flex flex-col md:flex-row">
        {/* Conteúdo Principal */}
        <main className="flex-1 min-h-screen w-full overflow-x-hidden pt-16 md:pt-0">
          <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
            <div className="flex justify-between items-center py-4 md:py-8">
              <h1 className="text-2xl font-bold">Relatórios Gerais da Plataforma</h1>
              <div className="flex items-center gap-2">
                <Link href="/">
                  <button className="bg-[#66e0cc] text-black px-4 py-2 rounded hover:bg-[#57cdb9] mr-2">
                    Voltar para o Início
                  </button>
                </Link>
                <Badge className="bg-[#66e0cc] text-black">Admin</Badge>
              </div>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="geral" className="w-full mb-6" onValueChange={setActiveTab} value={activeTab}>
              <TabsList className="bg-zinc-800 rounded-xl">
                <TabsTrigger value="geral">Visão Geral</TabsTrigger>
                <TabsTrigger value="financeiro">Financeiro</TabsTrigger>
                <TabsTrigger value="usuarios">Usuários</TabsTrigger>
                <TabsTrigger value="exportar">Exportar Relatórios</TabsTrigger>
              </TabsList>

              <TabsContent value="geral" className="mt-4">
                {/* Cards de Resumo */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                  <Card className="bg-transparent border border-[#66e0cc] hover:bg-zinc-900/30 transition-colors">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <p className="text-sm text-white">Total de Depósitos</p>
                        <ArrowUpCircle className="h-5 w-5 text-green-400" />
                      </div>
                      <h2 className="text-2xl font-bold text-green-400">{platformStats.depositos.total}</h2>
                      <p className="text-xs text-green-400 mt-1">{platformStats.depositos.growth} este mês</p>
                    </CardContent>
                  </Card>

                  <Card className="bg-transparent border border-[#66e0cc] hover:bg-zinc-900/30 transition-colors">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <p className="text-sm text-white">Total de Saques</p>
                        <ArrowDownCircle className="h-5 w-5 text-red-400" />
                      </div>
                      <h2 className="text-2xl font-bold text-red-400">{platformStats.saques.total}</h2>
                      <p className="text-xs text-red-400 mt-1">{platformStats.saques.growth} este mês</p>
                    </CardContent>
                  </Card>

                  <Card className="bg-transparent border border-[#66e0cc] hover:bg-zinc-900/30 transition-colors">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <p className="text-sm text-white">Comissões Pagas</p>
                        <DollarSign className="h-5 w-5 text-green-400" />
                      </div>
                      <h2 className="text-2xl font-bold text-green-400">{platformStats.comissoes.total}</h2>
                      <p className="text-xs text-green-400 mt-1">{platformStats.comissoes.growth} este mês</p>
                    </CardContent>
                  </Card>

                  <Card className="bg-transparent border border-[#66e0cc] hover:bg-zinc-900/30 transition-colors">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <p className="text-sm text-white">Investimentos Ativos</p>
                        <TrendingUp className="h-5 w-5 text-white" />
                      </div>
                      <h2 className="text-2xl font-bold text-white">{platformStats.investimentos.count}</h2>
                      <p className="text-xs text-white mt-1">{platformStats.investimentos.growth} este mês</p>
                    </CardContent>
                  </Card>

                  <Card className="bg-transparent border border-[#66e0cc] hover:bg-zinc-900/30 transition-colors">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <p className="text-sm text-white">Usuários Ativos</p>
                        <Users className="h-5 w-5 text-white" />
                      </div>
                      <h2 className="text-2xl font-bold text-white">{platformStats.usuarios.active}</h2>
                      <p className="text-xs text-white mt-1">{platformStats.usuarios.growth} este mês</p>
                    </CardContent>
                  </Card>

                  <Card className="bg-transparent border border-[#66e0cc] hover:bg-zinc-900/30 transition-colors">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <p className="text-sm text-white">Faturas Geradas</p>
                        <FileText className="h-5 w-5 text-white" />
                      </div>
                      <h2 className="text-2xl font-bold text-white">{platformStats.faturas.total}</h2>
                      <p className="text-xs text-white mt-1">{platformStats.faturas.growth} este mês</p>
                    </CardContent>
                  </Card>
                </div>

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
                            placeholder="Buscar por usuário, ID, evento..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Evento</Label>
                        <Select value={eventFilter} onValueChange={setEventFilter}>
                          <SelectTrigger className="bg-transparent border border-[#66e0cc] text-white">
                            <SelectValue placeholder="Selecione o evento" />
                          </SelectTrigger>
                          <SelectContent className="bg-zinc-800 border-zinc-700">
                            <SelectItem value="all">Todos</SelectItem>
                            <SelectItem value="Depósito">Depósito</SelectItem>
                            <SelectItem value="Saque">Saque</SelectItem>
                            <SelectItem value="Investimento">Investimento</SelectItem>
                            <SelectItem value="Comissão">Comissão</SelectItem>
                            <SelectItem value="Liberação">Liberação</SelectItem>
                          </SelectContent>
                        </Select>
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
                            <SelectItem value="concluído">Concluído</SelectItem>
                            <SelectItem value="rejeitado">Rejeitado</SelectItem>
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

                {/* Tabela Histórica */}
                {filteredHistorico.length > 0 ? (
                  <div className="rounded-md border border-zinc-800 overflow-hidden overflow-x-auto">
                    <Table>
                      <TableHeader className="bg-zinc-900">
                        <TableRow className="border-zinc-800 hover:bg-zinc-800/50">
                          <TableHead className="text-zinc-400">Data/Hora</TableHead>
                          <TableHead className="text-zinc-400">Evento</TableHead>
                          <TableHead className="text-zinc-400">Valor</TableHead>
                          <TableHead className="text-zinc-400">Usuário</TableHead>
                          <TableHead className="text-zinc-400">Status</TableHead>
                          <TableHead className="text-zinc-400">Ações</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredHistorico.map((record) => (
                          <TableRow key={record.id} className="border-zinc-800 hover:bg-zinc-800/50">
                            <TableCell>
                              {record.date} às {record.time}
                            </TableCell>
                            <TableCell>{record.event}</TableCell>
                            <TableCell
                              className={
                                record.event === "Saque"
                                  ? "text-red-400"
                                  : record.event === "Depósito" || record.event === "Comissão"
                                    ? "text-green-400"
                                    : ""
                              }
                            >
                              {record.amount}
                            </TableCell>
                            <TableCell>
                              {record.user} ({record.userId})
                            </TableCell>
                            <TableCell>
                              <Badge
                                className={
                                  record.status === "aprovado" || record.status === "concluído"
                                    ? "bg-green-500/20 text-green-400 hover:bg-green-500/20"
                                    : record.status === "pendente"
                                      ? "bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/20"
                                      : "bg-red-500/20 text-red-400 hover:bg-red-500/20"
                                }
                              >
                                {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button variant="outline" size="sm" className="h-8 border-zinc-700 hover:bg-zinc-800">
                                    Detalhes
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="bg-zinc-900 border-zinc-700 text-white">
                                  <DialogHeader>
                                    <DialogTitle>Detalhes da Transação</DialogTitle>
                                    <DialogDescription className="text-zinc-400">
                                      ID: {record.id} | {record.date} às {record.time}
                                    </DialogDescription>
                                  </DialogHeader>
                                  <div className="space-y-4 py-4">
                                    <div className="grid grid-cols-2 gap-4">
                                      <div className="space-y-1">
                                        <Text className="text-zinc-400">Evento</Text>
                                        <Text className="text-white">{record.event}</Text>
                                      </div>
                                      <div className="space-y-1">
                                        <Text className="text-zinc-400">Valor</Text>
                                        <Text
                                          className={
                                            record.event === "Saque"
                                              ? "text-red-400"
                                              : record.event === "Depósito" || record.event === "Comissão"
                                                ? "text-green-400"
                                                : "text-white"
                                          }
                                        >
                                          {record.amount}
                                        </Text>
                                      </div>
                                      <div className="space-y-1">
                                        <Text className="text-zinc-400">Usuário</Text>
                                        <Text className="text-white">
                                          {record.user} ({record.userId})
                                        </Text>
                                      </div>
                                      <div className="space-y-1">
                                        <Text className="text-zinc-400">Status</Text>
                                        <Badge
                                          className={
                                            record.status === "aprovado" || record.status === "concluído"
                                              ? "bg-green-500/20 text-green-400 hover:bg-green-500/20"
                                              : record.status === "pendente"
                                                ? "bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/20"
                                                : "bg-red-500/20 text-red-400 hover:bg-red-500/20"
                                          }
                                        >
                                          {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                                        </Badge>
                                      </div>
                                    </div>

                                    <div className="pt-4 border-t border-zinc-800">
                                      <Text className="text-white font-medium mb-2">Informações Adicionais</Text>
                                      {record.event === "Depósito" && (
                                        <div className="space-y-2">
                                          <div className="flex justify-between">
                                            <Text className="text-zinc-400">Método</Text>
                                            <Text className="text-white">{record.details.method}</Text>
                                          </div>
                                          <div className="flex justify-between">
                                            <Text className="text-zinc-400">ID da Transação</Text>
                                            <Text className="text-white">{record.details.transactionId}</Text>
                                          </div>
                                        </div>
                                      )}
                                      {record.event === "Saque" && (
                                        <div className="space-y-2">
                                          <div className="flex justify-between">
                                            <Text className="text-zinc-400">Método</Text>
                                            <Text className="text-white">{record.details.method}</Text>
                                          </div>
                                          <div className="flex justify-between">
                                            <Text className="text-zinc-400">Chave Pix</Text>
                                            <Text className="text-white">{record.details.pixKey}</Text>
                                          </div>
                                        </div>
                                      )}
                                      {record.event === "Investimento" && (
                                        <div className="space-y-2">
                                          <div className="flex justify-between">
                                            <Text className="text-zinc-400">Plano</Text>
                                            <Text className="text-white">{record.details.plan}</Text>
                                          </div>
                                          <div className="flex justify-between">
                                            <Text className="text-zinc-400">Duração</Text>
                                            <Text className="text-white">{record.details.duration}</Text>
                                          </div>
                                        </div>
                                      )}
                                      {record.event === "Comissão" && (
                                        <div className="space-y-2">
                                          <div className="flex justify-between">
                                            <Text className="text-zinc-400">Tipo</Text>
                                            <Text className="text-white">{record.details.type}</Text>
                                          </div>
                                          <div className="flex justify-between">
                                            <Text className="text-zinc-400">Usuário Indicado</Text>
                                            <Text className="text-white">{record.details.referredUser}</Text>
                                          </div>
                                        </div>
                                      )}
                                      {record.event === "Liberação" && (
                                        <div className="space-y-2">
                                          <div className="flex justify-between">
                                            <Text className="text-zinc-400">Tipo</Text>
                                            <Text className="text-white">{record.details.type}</Text>
                                          </div>
                                          <div className="flex justify-between">
                                            <Text className="text-zinc-400">Nível</Text>
                                            <Text className="text-white">{record.details.level}</Text>
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </DialogContent>
                              </Dialog>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <div className="text-center py-10 bg-zinc-900/50 rounded-lg border border-zinc-800">
                    <FileText className="h-10 w-10 mx-auto text-zinc-500 mb-4" />
                    <h3 className="text-lg font-medium">Nenhum registro encontrado</h3>
                    <p className="text-zinc-400 mt-1">Tente ajustar seus filtros de busca.</p>
                  </div>
                )}

                {/* Ações */}
                {filteredHistorico.length > 0 && (
                  <div className="mt-6 flex flex-col md:flex-row gap-4">
                    <Button className="bg-[#66e0cc] text-black hover:bg-[#55cebb]">
                      <Download className="mr-2 h-4 w-4" /> Exportar Histórico
                    </Button>
                    <Button className="bg-[#66e0cc] text-black hover:bg-[#55cebb]">
                      <Filter className="mr-2 h-4 w-4" /> Filtros Avançados
                    </Button>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="financeiro" className="mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="bg-zinc-900/50 border border-zinc-800">
                    <CardContent className="p-4 md:p-6">
                      <h2 className="text-xl font-semibold mb-4">Resumo Financeiro</h2>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <Text>Total de Depósitos</Text>
                          <Text className="text-green-400 font-bold">{platformStats.depositos.total}</Text>
                        </div>
                        <div className="flex justify-between items-center">
                          <Text>Total de Saques</Text>
                          <Text className="text-red-400 font-bold">{platformStats.saques.total}</Text>
                        </div>
                        <div className="flex justify-between items-center">
                          <Text>Total de Investimentos</Text>
                          <Text className="font-bold">{platformStats.investimentos.total}</Text>
                        </div>
                        <div className="flex justify-between items-center">
                          <Text>Total de Comissões</Text>
                          <Text className="text-green-400 font-bold">{platformStats.comissoes.total}</Text>
                        </div>
                        <div className="flex justify-between items-center pt-4 border-t border-zinc-800">
                          <Text className="font-bold">Balanço Geral</Text>
                          <Text className="text-green-400 font-bold">R$ 284.950,00</Text>
                        </div>
                      </div>
                      <Button className="w-full mt-4 bg-[#66e0cc] text-black hover:bg-[#55cebb]">
                        <BarChart2 className="mr-2 h-4 w-4" /> Gerar Gráficos Financeiros
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="bg-zinc-900/50 border border-zinc-800">
                    <CardContent className="p-4 md:p-6">
                      <h2 className="text-xl font-semibold mb-4">Relatório de Transações</h2>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label>Período</Label>
                          <Select defaultValue="30d">
                            <SelectTrigger className="bg-transparent border border-[#66e0cc] text-white">
                              <SelectValue placeholder="Selecione o período" />
                            </SelectTrigger>
                            <SelectContent className="bg-zinc-800 border-zinc-700">
                              <SelectItem value="7d">Últimos 7 dias</SelectItem>
                              <SelectItem value="30d">Últimos 30 dias</SelectItem>
                              <SelectItem value="90d">Últimos 90 dias</SelectItem>
                              <SelectItem value="year">Este ano</SelectItem>
                              <SelectItem value="all">Todo o período</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Tipo de Transação</Label>
                          <Select defaultValue="all">
                            <SelectTrigger className="bg-transparent border border-[#66e0cc] text-white">
                              <SelectValue placeholder="Selecione o tipo" />
                            </SelectTrigger>
                            <SelectContent className="bg-zinc-800 border-zinc-700">
                              <SelectItem value="all">Todas</SelectItem>
                              <SelectItem value="deposit">Depósitos</SelectItem>
                              <SelectItem value="withdrawal">Saques</SelectItem>
                              <SelectItem value="investment">Investimentos</SelectItem>
                              <SelectItem value="commission">Comissões</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Formato</Label>
                          <Select defaultValue="csv">
                            <SelectTrigger className="bg-transparent border border-[#66e0cc] text-white">
                              <SelectValue placeholder="Selecione o formato" />
                            </SelectTrigger>
                            <SelectContent className="bg-zinc-800 border-zinc-700">
                              <SelectItem value="csv">CSV</SelectItem>
                              <SelectItem value="excel">Excel</SelectItem>
                              <SelectItem value="pdf">PDF</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <Button className="w-full mt-4 bg-[#66e0cc] text-black hover:bg-[#55cebb]">
                        <Download className="mr-2 h-4 w-4" /> Exportar Relatório
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="bg-zinc-900/50 border border-zinc-800">
                    <CardContent className="p-4 md:p-6">
                      <h2 className="text-xl font-semibold mb-4">Relatório de Comissões</h2>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label>Período</Label>
                          <Select defaultValue="30d">
                            <SelectTrigger className="bg-transparent border border-[#66e0cc] text-white">
                              <SelectValue placeholder="Selecione o período" />
                            </SelectTrigger>
                            <SelectContent className="bg-zinc-800 border-zinc-700">
                              <SelectItem value="7d">Últimos 7 dias</SelectItem>
                              <SelectItem value="30d">Últimos 30 dias</SelectItem>
                              <SelectItem value="90d">Últimos 90 dias</SelectItem>
                              <SelectItem value="year">Este ano</SelectItem>
                              <SelectItem value="all">Todo o período</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Tipo de Comissão</Label>
                          <Select defaultValue="all">
                            <SelectTrigger className="bg-transparent border border-[#66e0cc] text-white">
                              <SelectValue placeholder="Selecione o tipo" />
                            </SelectTrigger>
                            <SelectContent className="bg-zinc-800 border-zinc-700">
                              <SelectItem value="all">Todas</SelectItem>
                              <SelectItem value="referral">Indicação</SelectItem>
                              <SelectItem value="sponsor">Patrocínio</SelectItem>
                              <SelectItem value="bonus">Bônus</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Formato</Label>
                          <Select defaultValue="csv">
                            <SelectTrigger className="bg-transparent border border-[#66e0cc] text-white">
                              <SelectValue placeholder="Selecione o formato" />
                            </SelectTrigger>
                            <SelectContent className="bg-zinc-800 border-zinc-700">
                              <SelectItem value="csv">CSV</SelectItem>
                              <SelectItem value="excel">Excel</SelectItem>
                              <SelectItem value="pdf">PDF</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <Button className="w-full mt-4 bg-[#66e0cc] text-black hover:bg-[#55cebb]">
                        <Download className="mr-2 h-4 w-4" /> Exportar Relatório
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="bg-zinc-900/50 border border-zinc-800">
                    <CardContent className="p-4 md:p-6">
                      <h2 className="text-xl font-semibold mb-4">Relatório de Investimentos</h2>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label>Período</Label>
                          <Select defaultValue="30d">
                            <SelectTrigger className="bg-transparent border border-[#66e0cc] text-white">
                              <SelectValue placeholder="Selecione o período" />
                            </SelectTrigger>
                            <SelectContent className="bg-zinc-800 border-zinc-700">
                              <SelectItem value="7d">Últimos 7 dias</SelectItem>
                              <SelectItem value="30d">Últimos 30 dias</SelectItem>
                              <SelectItem value="90d">Últimos 90 dias</SelectItem>
                              <SelectItem value="year">Este ano</SelectItem>
                              <SelectItem value="all">Todo o período</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Status</Label>
                          <Select defaultValue="all">
                            <SelectTrigger className="bg-transparent border border-[#66e0cc] text-white">
                              <SelectValue placeholder="Selecione o status" />
                            </SelectTrigger>
                            <SelectContent className="bg-zinc-800 border-zinc-700">
                              <SelectItem value="all">Todos</SelectItem>
                              <SelectItem value="active">Ativos</SelectItem>
                              <SelectItem value="completed">Concluídos</SelectItem>
                              <SelectItem value="expired">Expirados</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Formato</Label>
                          <Select defaultValue="csv">
                            <SelectTrigger className="bg-transparent border border-[#66e0cc] text-white">
                              <SelectValue placeholder="Selecione o formato" />
                            </SelectTrigger>
                            <SelectContent className="bg-zinc-800 border-zinc-700">
                              <SelectItem value="csv">CSV</SelectItem>
                              <SelectItem value="excel">Excel</SelectItem>
                              <SelectItem value="pdf">PDF</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <Button className="w-full mt-4 bg-[#66e0cc] text-black hover:bg-[#55cebb]">
                        <Download className="mr-2 h-4 w-4" /> Exportar Relatório
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="usuarios" className="mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="bg-zinc-900/50 border border-zinc-800">
                    <CardContent className="p-4 md:p-6">
                      <h2 className="text-xl font-semibold mb-4">Estatísticas de Usuários</h2>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <Text>Total de Usuários</Text>
                          <Text className="font-bold">{platformStats.usuarios.total}</Text>
                        </div>
                        <div className="flex justify-between items-center">
                          <Text>Usuários Ativos</Text>
                          <Text className="text-green-400 font-bold">{platformStats.usuarios.active}</Text>
                        </div>
                        <div className="flex justify-between items-center">
                          <Text>Usuários Inativos</Text>
                          <Text className="text-red-400 font-bold">{platformStats.usuarios.inactive}</Text>
                        </div>
                        <div className="flex justify-between items-center">
                          <Text>Taxa de Atividade</Text>
                          <Text className="font-bold">
                            {Math.round((platformStats.usuarios.active / platformStats.usuarios.total) * 100)}%
                          </Text>
                        </div>
                        <div className="flex justify-between items-center">
                          <Text>Crescimento</Text>
                          <Text className="text-green-400 font-bold">{platformStats.usuarios.growth}</Text>
                        </div>
                      </div>
                      <Button className="w-full mt-4 bg-[#66e0cc] text-black hover:bg-[#55cebb]">
                        <PieChart className="mr-2 h-4 w-4" /> Gerar Gráficos de Usuários
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="bg-zinc-900/50 border border-zinc-800">
                    <CardContent className="p-4 md:p-6">
                      <h2 className="text-xl font-semibold mb-4">Relatório de Usuários</h2>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label>Período de Cadastro</Label>
                          <Select defaultValue="all">
                            <SelectTrigger className="bg-transparent border border-[#66e0cc] text-white">
                              <SelectValue placeholder="Selecione o período" />
                            </SelectTrigger>
                            <SelectContent className="bg-zinc-800 border-zinc-700">
                              <SelectItem value="7d">Últimos 7 dias</SelectItem>
                              <SelectItem value="30d">Últimos 30 dias</SelectItem>
                              <SelectItem value="90d">Últimos 90 dias</SelectItem>
                              <SelectItem value="year">Este ano</SelectItem>
                              <SelectItem value="all">Todo o período</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Status</Label>
                          <Select defaultValue="all">
                            <SelectTrigger className="bg-transparent border border-[#66e0cc] text-white">
                              <SelectValue placeholder="Selecione o status" />
                            </SelectTrigger>
                            <SelectContent className="bg-zinc-800 border-zinc-700">
                              <SelectItem value="all">Todos</SelectItem>
                              <SelectItem value="active">Ativos</SelectItem>
                              <SelectItem value="inactive">Inativos</SelectItem>
                              <SelectItem value="banned">Banidos</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Formato</Label>
                          <Select defaultValue="csv">
                            <SelectTrigger className="bg-transparent border border-[#66e0cc] text-white">
                              <SelectValue placeholder="Selecione o formato" />
                            </SelectTrigger>
                            <SelectContent className="bg-zinc-800 border-zinc-700">
                              <SelectItem value="csv">CSV</SelectItem>
                              <SelectItem value="excel">Excel</SelectItem>
                              <SelectItem value="pdf">PDF</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <Button className="w-full mt-4 bg-[#66e0cc] text-black hover:bg-[#55cebb]">
                        <Download className="mr-2 h-4 w-4" /> Exportar Relatório
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="bg-zinc-900/50 border border-zinc-800">
                    <CardContent className="p-4 md:p-6">
                      <h2 className="text-xl font-semibold mb-4">Relatório de Atividade</h2>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label>Período</Label>
                          <Select defaultValue="30d">
                            <SelectTrigger className="bg-transparent border border-[#66e0cc] text-white">
                              <SelectValue placeholder="Selecione o período" />
                            </SelectTrigger>
                            <SelectContent className="bg-zinc-800 border-zinc-700">
                              <SelectItem value="7d">Últimos 7 dias</SelectItem>
                              <SelectItem value="30d">Últimos 30 dias</SelectItem>
                              <SelectItem value="90d">Últimos 90 dias</SelectItem>
                              <SelectItem value="year">Este ano</SelectItem>
                              <SelectItem value="all">Todo o período</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Tipo de Atividade</Label>
                          <Select defaultValue="all">
                            <SelectTrigger className="bg-transparent border border-[#66e0cc] text-white">
                              <SelectValue placeholder="Selecione o tipo" />
                            </SelectTrigger>
                            <SelectContent className="bg-zinc-800 border-zinc-700">
                              <SelectItem value="all">Todas</SelectItem>
                              <SelectItem value="login">Logins</SelectItem>
                              <SelectItem value="transaction">Transações</SelectItem>
                              <SelectItem value="profile">Atualizações de Perfil</SelectItem>
                              <SelectItem value="referral">Indicações</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Formato</Label>
                          <Select defaultValue="csv">
                            <SelectTrigger className="bg-transparent border border-[#66e0cc] text-white">
                              <SelectValue placeholder="Selecione o formato" />
                            </SelectTrigger>
                            <SelectContent className="bg-zinc-800 border-zinc-700">
                              <SelectItem value="csv">CSV</SelectItem>
                              <SelectItem value="excel">Excel</SelectItem>
                              <SelectItem value="pdf">PDF</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <Button className="w-full mt-4 bg-[#66e0cc] text-black hover:bg-[#55cebb]">
                        <Download className="mr-2 h-4 w-4" /> Exportar Relatório
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="bg-zinc-900/50 border border-zinc-800">
                    <CardContent className="p-4 md:p-6">
                      <h2 className="text-xl font-semibold mb-4">Relatório de Patrocínios</h2>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label>Período</Label>
                          <Select defaultValue="30d">
                            <SelectTrigger className="bg-transparent border border-[#66e0cc] text-white">
                              <SelectValue placeholder="Selecione o período" />
                            </SelectTrigger>
                            <SelectContent className="bg-zinc-800 border-zinc-700">
                              <SelectItem value="7d">Últimos 7 dias</SelectItem>
                              <SelectItem value="30d">Últimos 30 dias</SelectItem>
                              <SelectItem value="90d">Últimos 90 dias</SelectItem>
                              <SelectItem value="year">Este ano</SelectItem>
                              <SelectItem value="all">Todo o período</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Nível de Patrocínio</Label>
                          <Select defaultValue="all">
                            <SelectTrigger className="bg-transparent border border-[#66e0cc] text-white">
                              <SelectValue placeholder="Selecione o nível" />
                            </SelectTrigger>
                            <SelectContent className="bg-zinc-800 border-zinc-700">
                              <SelectItem value="all">Todos</SelectItem>
                              <SelectItem value="bronze">Bronze</SelectItem>
                              <SelectItem value="silver">Prata</SelectItem>
                              <SelectItem value="gold">Ouro</SelectItem>
                              <SelectItem value="platinum">Platina</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Formato</Label>
                          <Select defaultValue="csv">
                            <SelectTrigger className="bg-transparent border border-[#66e0cc] text-white">
                              <SelectValue placeholder="Selecione o formato" />
                            </SelectTrigger>
                            <SelectContent className="bg-zinc-800 border-zinc-700">
                              <SelectItem value="csv">CSV</SelectItem>
                              <SelectItem value="excel">Excel</SelectItem>
                              <SelectItem value="pdf">PDF</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <Button className="w-full mt-4 bg-[#66e0cc] text-black hover:bg-[#55cebb]">
                        <Download className="mr-2 h-4 w-4" /> Exportar Relatório
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="exportar" className="mt-4">
                <Card className="bg-zinc-900/50 border border-zinc-800">
                  <CardContent className="p-4 md:p-6">
                    <h2 className="text-xl font-semibold mb-4">Relatório Personalizado</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Tipo de Dados</Label>
                        <Select>
                          <SelectTrigger className="bg-transparent border border-[#66e0cc] text-white">
                            <SelectValue placeholder="Selecione o tipo" />
                          </SelectTrigger>
                          <SelectContent className="bg-zinc-800 border-zinc-700">
                            <SelectItem value="users">Usuários</SelectItem>
                            <SelectItem value="withdrawals">Saques</SelectItem>
                            <SelectItem value="deposits">Depósitos</SelectItem>
                            <SelectItem value="transactions">Transações</SelectItem>
                            <SelectItem value="commissions">Comissões</SelectItem>
                            <SelectItem value="sponsors">Patrocínios</SelectItem>
                            <SelectItem value="investments">Investimentos</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Formato de Saída</Label>
                        <Select defaultValue="csv">
                          <SelectTrigger className="bg-transparent border border-[#66e0cc] text-white">
                            <SelectValue placeholder="Selecione o formato" />
                          </SelectTrigger>
                          <SelectContent className="bg-zinc-800 border-zinc-700">
                            <SelectItem value="csv">CSV</SelectItem>
                            <SelectItem value="excel">Excel</SelectItem>
                            <SelectItem value="pdf">PDF</SelectItem>
                            <SelectItem value="json">JSON</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <div className="space-y-2">
                        <Label>Data Inicial</Label>
                        <Input type="date" className="bg-transparent border border-[#66e0cc] text-white" />
                      </div>
                      <div className="space-y-2">
                        <Label>Data Final</Label>
                        <Input type="date" className="bg-transparent border border-[#66e0cc] text-white" />
                      </div>
                    </div>

                    <div className="space-y-2 mt-4">
                      <Label>Filtros Adicionais</Label>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id="filter-status"
                            className="rounded border-zinc-700 bg-zinc-900 text-[#66e0cc]"
                          />
                          <label htmlFor="filter-status" className="text-sm text-white">
                            Status
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id="filter-amount"
                            className="rounded border-zinc-700 bg-zinc-900 text-[#66e0cc]"
                          />
                          <label htmlFor="filter-amount" className="text-sm text-white">
                            Valor
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id="filter-user"
                            className="rounded border-zinc-700 bg-zinc-900 text-[#66e0cc]"
                          />
                          <label htmlFor="filter-user" className="text-sm text-white">
                            Usuário
                          </label>
                        </div>
                      </div>
                    </div>

                    <Button className="w-full text-black bg-[#66e0cc] hover:bg-[#5bd7c0] mt-6">
                      <FileText className="mr-2 h-4 w-4" /> Gerar Relatório Personalizado
                    </Button>
                  </CardContent>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <Card className="bg-zinc-900/50 border border-zinc-800">
                    <CardContent className="p-4 md:p-6">
                      <h2 className="text-xl font-semibold mb-4">Relatórios Programados</h2>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label>Tipo de Relatório</Label>
                          <Select>
                            <SelectTrigger className="bg-transparent border border-[#66e0cc] text-white">
                              <SelectValue placeholder="Selecione o tipo" />
                            </SelectTrigger>
                            <SelectContent className="bg-zinc-800 border-zinc-700">
                              <SelectItem value="financial">Financeiro</SelectItem>
                              <SelectItem value="users">Usuários</SelectItem>
                              <SelectItem value="transactions">Transações</SelectItem>
                              <SelectItem value="investments">Investimentos</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Frequência</Label>
                          <Select>
                            <SelectTrigger className="bg-transparent border border-[#66e0cc] text-white">
                              <SelectValue placeholder="Selecione a frequência" />
                            </SelectTrigger>
                            <SelectContent className="bg-zinc-800 border-zinc-700">
                              <SelectItem value="daily">Diário</SelectItem>
                              <SelectItem value="weekly">Semanal</SelectItem>
                              <SelectItem value="monthly">Mensal</SelectItem>
                              <SelectItem value="quarterly">Trimestral</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Formato</Label>
                          <Select defaultValue="csv">
                            <SelectTrigger className="bg-transparent border border-[#66e0cc] text-white">
                              <SelectValue placeholder="Selecione o formato" />
                            </SelectTrigger>
                            <SelectContent className="bg-zinc-800 border-zinc-700">
                              <SelectItem value="csv">CSV</SelectItem>
                              <SelectItem value="excel">Excel</SelectItem>
                              <SelectItem value="pdf">PDF</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Email para Envio</Label>
                          <Input
                            className="bg-transparent border border-[#66e0cc] text-white"
                            placeholder="email@exemplo.com"
                          />
                        </div>
                      </div>
                      <Button className="w-full mt-4 bg-[#66e0cc] text-black hover:bg-[#55cebb]">
                        <Calendar className="mr-2 h-4 w-4" /> Programar Relatório
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="bg-zinc-900/50 border border-zinc-800">
                    <CardContent className="p-4 md:p-6">
                      <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold">Relatórios Recentes</h2>
                        <Button variant="outline" size="sm" className="border-zinc-700 text-white">
                          Ver Todos
                        </Button>
                      </div>
                      <div className="overflow-x-auto">
                        <Table>
                          <TableHeader>
                            <TableRow className="border-zinc-800">
                              <TableHead className="text-white">Nome</TableHead>
                              <TableHead className="text-white">Tipo</TableHead>
                              <TableHead className="text-white">Data</TableHead>
                              <TableHead className="text-white">Ações</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            <TableRow className="border-zinc-800">
                              <TableCell className="text-white">Usuários Ativos - Maio 2025</TableCell>
                              <TableCell className="text-white">Usuários</TableCell>
                              <TableCell className="text-white">19/05/2025</TableCell>
                              <TableCell>
                                <Button variant="ghost" size="sm" className="h-8 px-2 text-white">
                                  <Download className="h-4 w-4" />
                                </Button>
                              </TableCell>
                            </TableRow>
                            <TableRow className="border-zinc-800">
                              <TableCell className="text-white">Transações - Maio 2025</TableCell>
                              <TableCell className="text-white">Financeiro</TableCell>
                              <TableCell className="text-white">18/05/2025</TableCell>
                              <TableCell>
                                <Button variant="ghost" size="sm" className="h-8 px-2 text-white">
                                  <Download className="h-4 w-4" />
                                </Button>
                              </TableCell>
                            </TableRow>
                            <TableRow className="border-zinc-800">
                              <TableCell className="text-white">Investimentos - Abril 2025</TableCell>
                              <TableCell className="text-white">Investimentos</TableCell>
                              <TableCell className="text-white">30/04/2025</TableCell>
                              <TableCell>
                                <Button variant="ghost" size="sm" className="h-8 px-2 text-white">
                                  <Download className="h-4 w-4" />
                                </Button>
                              </TableCell>
                            </TableRow>
                            <TableRow className="border-zinc-800">
                              <TableCell className="text-white">Comissões - Abril 2025</TableCell>
                              <TableCell className="text-white">Financeiro</TableCell>
                              <TableCell className="text-white">28/04/2025</TableCell>
                              <TableCell>
                                <Button variant="ghost" size="sm" className="h-8 px-2 text-white">
                                  <Download className="h-4 w-4" />
                                </Button>
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </main>
  )
}
