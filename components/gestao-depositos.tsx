"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Search, ArrowUpCircle, DollarSign, Filter, CheckCircle, XCircle, Calendar, Hash } from "lucide-react"
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

// Sample data for deposits
const mockDeposits = [
  {
    id: "DEP001",
    user: "Lucas Martins",
    userId: "USR102",
    method: "Pix",
    amount: "R$ 1.000,00",
    status: "pendente",
    time: "15:38",
    date: "19/05/2025",
    details: {
      pixKey: "lucas@email.com",
      pixType: "Email",
      bank: "Nubank",
      transactionId: "E12345678901234567890123456789012345",
    },
  },
  {
    id: "DEP002",
    user: "Carla Souza",
    userId: "USR210",
    method: "Transferência Bancária",
    amount: "R$ 1.750,00",
    status: "aprovado",
    time: "12:50",
    date: "18/05/2025",
    details: {
      bank: "Banco do Brasil",
      agency: "1234",
      account: "56789-0",
      cpf: "123.456.789-00",
      transactionId: "00123456789",
    },
  },
  {
    id: "DEP003",
    user: "Roberto Almeida",
    userId: "USR045",
    method: "USDT",
    amount: "R$ 5.000,00",
    status: "pendente",
    time: "09:15",
    date: "19/05/2025",
    details: {
      walletAddress: "0x1a2b3c4d5e6f7g8h9i0j",
      network: "TRC20",
      transactionId: "0xabcdef1234567890abcdef1234567890",
    },
  },
  {
    id: "DEP004",
    user: "Amanda Costa",
    userId: "USR078",
    method: "Pix",
    amount: "R$ 2.500,00",
    status: "aprovado",
    time: "18:22",
    date: "17/05/2025",
    details: {
      pixKey: "11987654321",
      pixType: "Telefone",
      bank: "Itaú",
      transactionId: "D98765432109876543210987654321098",
    },
  },
  {
    id: "DEP005",
    user: "Fernando Silva",
    userId: "USR156",
    method: "Cartão de Crédito",
    amount: "R$ 1.200,00",
    status: "rejeitado",
    time: "14:05",
    date: "17/05/2025",
    details: {
      cardLastDigits: "****1234",
      cardBrand: "Mastercard",
      reason: "Pagamento não autorizado pelo emissor do cartão",
    },
  },
]

export default function GestaoDepositos() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [methodFilter, setMethodFilter] = useState("all")
  const [dateFilter, setDateFilter] = useState("")
  const [activeTab, setActiveTab] = useState("todos")

  // Calculate totals
  const totalDeposits = mockDeposits.reduce(
    (total, deposit) => {
      const amount = Number.parseFloat(deposit.amount.replace("R$ ", "").replace(".", "").replace(",", "."))

      if (deposit.status === "pendente") {
        total.pending += amount
      } else if (deposit.status === "aprovado") {
        total.approved += amount
      }

      return total
    },
    { approved: 0, pending: 0 },
  )

  // Filter deposits based on search term, status, method, and date
  const filteredDeposits = mockDeposits.filter((deposit) => {
    const searchLower = searchTerm.toLowerCase()
    const matchesSearch =
      deposit.user.toLowerCase().includes(searchLower) ||
      deposit.userId.toLowerCase().includes(searchLower) ||
      deposit.method.toLowerCase().includes(searchLower) ||
      deposit.amount.toLowerCase().includes(searchLower) ||
      deposit.id.toLowerCase().includes(searchLower)

    const matchesStatus = statusFilter === "all" ? true : deposit.status === statusFilter
    const matchesMethod = methodFilter === "all" ? true : deposit.method === methodFilter

    // Simple date filter - in a real app, you'd want to do proper date comparison
    const matchesDate = dateFilter ? deposit.date.includes(dateFilter) : true

    // Filter by tab
    if (activeTab === "pendentes" && deposit.status !== "pendente") return false
    if (activeTab === "aprovados" && deposit.status !== "aprovado") return false
    if (activeTab === "rejeitados" && deposit.status !== "rejeitado") return false

    return matchesSearch && matchesStatus && matchesMethod && matchesDate
  })

  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-gradient-to-b from-black to-zinc-900 text-white">
      <div className="flex flex-col md:flex-row">
        {/* Conteúdo Principal */}
        <main className="flex-1 min-h-screen w-full overflow-x-hidden pt-16 md:pt-0">
          <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
            <div className="flex justify-between items-center py-4 md:py-8">
              <h1 className="text-2xl font-bold">Gestão de Depósitos</h1>
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
                    <p className="text-sm text-white">Total de Depósitos</p>
                    <ArrowUpCircle className="h-5 w-5 text-green-400" />
                  </div>
                  <h2 className="text-2xl font-bold text-green-400">
                    R$ {(totalDeposits.approved + totalDeposits.pending).toFixed(2).replace(".", ",")}
                  </h2>
                  <p className="text-xs text-green-400 mt-1">Valor total de depósitos</p>
                </CardContent>
              </Card>

              <Card className="bg-transparent border border-[#66e0cc] hover:bg-zinc-900/30 transition-colors">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <p className="text-sm text-white">Depósitos Pendentes</p>
                    <DollarSign className="h-5 w-5 text-yellow-400" />
                  </div>
                  <h2 className="text-2xl font-bold text-yellow-400">
                    R$ {totalDeposits.pending.toFixed(2).replace(".", ",")}
                  </h2>
                  <p className="text-xs text-yellow-400 mt-1">Aguardando aprovação</p>
                </CardContent>
              </Card>

              <Card className="bg-transparent border border-[#66e0cc] hover:bg-zinc-900/30 transition-colors">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <p className="text-sm text-white">Depósitos Aprovados</p>
                    <CheckCircle className="h-5 w-5 text-green-400" />
                  </div>
                  <h2 className="text-2xl font-bold text-green-400">
                    R$ {totalDeposits.approved.toFixed(2).replace(".", ",")}
                  </h2>
                  <p className="text-xs text-green-400 mt-1">Processados com sucesso</p>
                </CardContent>
              </Card>

              <Card className="bg-transparent border border-[#66e0cc] hover:bg-zinc-900/30 transition-colors">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <p className="text-sm text-white">Depósito Médio</p>
                    <Calendar className="h-5 w-5 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">
                    R${" "}
                    {(
                      (totalDeposits.approved + totalDeposits.pending) /
                      (mockDeposits.length > 0 ? mockDeposits.length : 1)
                    )
                      .toFixed(2)
                      .replace(".", ",")}
                  </h2>
                  <p className="text-xs text-white mt-1">Valor médio por depósito</p>
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
                        placeholder="Buscar por usuário, ID, método..."
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
                    <Label>Método</Label>
                    <Select value={methodFilter} onValueChange={setMethodFilter}>
                      <SelectTrigger className="bg-transparent border border-[#66e0cc] text-white">
                        <SelectValue placeholder="Selecione o método" />
                      </SelectTrigger>
                      <SelectContent className="bg-zinc-800 border-zinc-700">
                        <SelectItem value="all">Todos</SelectItem>
                        <SelectItem value="Pix">Pix</SelectItem>
                        <SelectItem value="USDT">USDT</SelectItem>
                        <SelectItem value="Transferência Bancária">Transferência Bancária</SelectItem>
                        <SelectItem value="Cartão de Crédito">Cartão de Crédito</SelectItem>
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
                <TabsTrigger value="todos">Todos os Depósitos</TabsTrigger>
                <TabsTrigger value="pendentes">Pendentes</TabsTrigger>
                <TabsTrigger value="aprovados">Aprovados</TabsTrigger>
                <TabsTrigger value="rejeitados">Rejeitados</TabsTrigger>
              </TabsList>
            </Tabs>

            {/* Tabela de Depósitos */}
            {filteredDeposits.length > 0 ? (
              <div className="rounded-md border border-zinc-800 overflow-hidden overflow-x-auto">
                <Table>
                  <TableHeader className="bg-zinc-900">
                    <TableRow className="border-zinc-800 hover:bg-zinc-800/50">
                      <TableHead className="text-zinc-400">Usuário</TableHead>
                      <TableHead className="text-zinc-400">ID</TableHead>
                      <TableHead className="text-zinc-400">Método</TableHead>
                      <TableHead className="text-zinc-400">Valor</TableHead>
                      <TableHead className="text-zinc-400">Status</TableHead>
                      <TableHead className="text-zinc-400">Data/Hora</TableHead>
                      <TableHead className="text-zinc-400">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredDeposits.map((deposit) => (
                      <TableRow key={deposit.id} className="border-zinc-800 hover:bg-zinc-800/50">
                        <TableCell className="font-medium">{deposit.user}</TableCell>
                        <TableCell>{deposit.userId}</TableCell>
                        <TableCell>{deposit.method}</TableCell>
                        <TableCell>{deposit.amount}</TableCell>
                        <TableCell>
                          <Badge
                            className={
                              deposit.status === "aprovado"
                                ? "bg-green-500/20 text-green-400 hover:bg-green-500/20"
                                : deposit.status === "pendente"
                                  ? "bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/20"
                                  : "bg-red-500/20 text-red-400 hover:bg-red-500/20"
                            }
                          >
                            {deposit.status.charAt(0).toUpperCase() + deposit.status.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {deposit.date} às {deposit.time}
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
                                  <DialogTitle>Detalhes do Depósito</DialogTitle>
                                  <DialogDescription className="text-zinc-400">
                                    ID: {deposit.id} | Usuário: {deposit.user}
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4 py-4">
                                  <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                      <Text className="text-zinc-400">Método</Text>
                                      <Text className="text-white">{deposit.method}</Text>
                                    </div>
                                    <div className="space-y-1">
                                      <Text className="text-zinc-400">Valor</Text>
                                      <Text className="text-white">{deposit.amount}</Text>
                                    </div>
                                    <div className="space-y-1">
                                      <Text className="text-zinc-400">Status</Text>
                                      <Badge
                                        className={
                                          deposit.status === "aprovado"
                                            ? "bg-green-500/20 text-green-400 hover:bg-green-500/20"
                                            : deposit.status === "pendente"
                                              ? "bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/20"
                                              : "bg-red-500/20 text-red-400 hover:bg-red-500/20"
                                        }
                                      >
                                        {deposit.status.charAt(0).toUpperCase() + deposit.status.slice(1)}
                                      </Badge>
                                    </div>
                                    <div className="space-y-1">
                                      <Text className="text-zinc-400">Data/Hora</Text>
                                      <Text className="text-white">
                                        {deposit.date} às {deposit.time}
                                      </Text>
                                    </div>
                                  </div>

                                  <div className="pt-4 border-t border-zinc-800">
                                    <Text className="text-white font-medium mb-2">Informações de Pagamento</Text>
                                    {deposit.method === "Pix" && (
                                      <div className="space-y-2">
                                        <div className="flex justify-between">
                                          <Text className="text-zinc-400">Chave Pix</Text>
                                          <Text className="text-white">{deposit.details.pixKey}</Text>
                                        </div>
                                        <div className="flex justify-between">
                                          <Text className="text-zinc-400">Tipo</Text>
                                          <Text className="text-white">{deposit.details.pixType}</Text>
                                        </div>
                                        <div className="flex justify-between">
                                          <Text className="text-zinc-400">Banco</Text>
                                          <Text className="text-white">{deposit.details.bank}</Text>
                                        </div>
                                        <div className="flex justify-between">
                                          <Text className="text-zinc-400">ID da Transação</Text>
                                          <Text className="text-white">{deposit.details.transactionId}</Text>
                                        </div>
                                      </div>
                                    )}
                                    {deposit.method === "USDT" && (
                                      <div className="space-y-2">
                                        <div className="flex justify-between">
                                          <Text className="text-zinc-400">Endereço da Carteira</Text>
                                          <Text className="text-white">{deposit.details.walletAddress}</Text>
                                        </div>
                                        <div className="flex justify-between">
                                          <Text className="text-zinc-400">Rede</Text>
                                          <Text className="text-white">{deposit.details.network}</Text>
                                        </div>
                                        <div className="flex justify-between">
                                          <Text className="text-zinc-400">ID da Transação</Text>
                                          <Text className="text-white">{deposit.details.transactionId}</Text>
                                        </div>
                                      </div>
                                    )}
                                    {deposit.method === "Transferência Bancária" && (
                                      <div className="space-y-2">
                                        <div className="flex justify-between">
                                          <Text className="text-zinc-400">Banco</Text>
                                          <Text className="text-white">{deposit.details.bank}</Text>
                                        </div>
                                        <div className="flex justify-between">
                                          <Text className="text-zinc-400">Agência</Text>
                                          <Text className="text-white">{deposit.details.agency}</Text>
                                        </div>
                                        <div className="flex justify-between">
                                          <Text className="text-zinc-400">Conta</Text>
                                          <Text className="text-white">{deposit.details.account}</Text>
                                        </div>
                                        <div className="flex justify-between">
                                          <Text className="text-zinc-400">CPF</Text>
                                          <Text className="text-white">{deposit.details.cpf}</Text>
                                        </div>
                                        <div className="flex justify-between">
                                          <Text className="text-zinc-400">ID da Transação</Text>
                                          <Text className="text-white">{deposit.details.transactionId}</Text>
                                        </div>
                                      </div>
                                    )}
                                    {deposit.method === "Cartão de Crédito" && (
                                      <div className="space-y-2">
                                        <div className="flex justify-between">
                                          <Text className="text-zinc-400">Cartão</Text>
                                          <Text className="text-white">{deposit.details.cardLastDigits}</Text>
                                        </div>
                                        <div className="flex justify-between">
                                          <Text className="text-zinc-400">Bandeira</Text>
                                          <Text className="text-white">{deposit.details.cardBrand}</Text>
                                        </div>
                                      </div>
                                    )}
                                  </div>

                                  {deposit.status === "rejeitado" && (
                                    <div className="pt-4 border-t border-zinc-800">
                                      <Text className="text-white font-medium mb-2">Motivo da Rejeição</Text>
                                      <Text className="text-red-400">{deposit.details.reason}</Text>
                                    </div>
                                  )}
                                </div>
                                <DialogFooter className="flex gap-2">
                                  {deposit.status === "pendente" && (
                                    <>
                                      <Button className="bg-green-500 hover:bg-green-600">Aprovar</Button>
                                      <Button className="bg-red-500 hover:bg-red-600">Rejeitar</Button>
                                    </>
                                  )}
                                  {deposit.status === "aprovado" && (
                                    <Button className="bg-[#66e0cc] text-black hover:bg-[#55cebb]">
                                      Gerar Comprovante
                                    </Button>
                                  )}
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>

                            {deposit.status === "pendente" && (
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
                <ArrowUpCircle className="h-10 w-10 mx-auto text-zinc-500 mb-4" />
                <h3 className="text-lg font-medium">Nenhum depósito encontrado</h3>
                <p className="text-zinc-400 mt-1">Tente ajustar seus filtros de busca.</p>
              </div>
            )}

            {/* Ações em Lote */}
            {filteredDeposits.length > 0 && (
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

            {/* Área de Verificação de Depósito */}
            <Card className="bg-zinc-900/50 border border-zinc-800 mt-8">
              <CardContent className="p-4 md:p-6">
                <h2 className="text-xl font-semibold mb-4">Verificar Depósito</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Hash da Transação</Label>
                    <div className="relative">
                      <Hash className="absolute left-2 top-2.5 h-4 w-4 text-zinc-500" />
                      <Input
                        className="bg-transparent border border-[#66e0cc] text-white pl-8"
                        placeholder="Cole a hash da transação"
                      />
                    </div>
                  </div>
                  <div className="flex items-end">
                    <Button className="bg-[#66e0cc] text-black hover:bg-[#55cebb] w-full md:w-auto h-10">
                      <Search className="mr-2 h-4 w-4" /> Verificar Transação
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </main>
  )
}
