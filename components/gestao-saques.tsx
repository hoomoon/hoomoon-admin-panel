"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Search, ArrowDownCircle, DollarSign, Filter, CheckCircle, XCircle } from "lucide-react"
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

// Sample data for withdrawals
const mockWithdrawals = [
  {
    id: "WD001",
    user: "João Dias",
    userId: "USR001",
    method: "Pix",
    amount: "R$ 2.500,00",
    status: "pendente",
    time: "14:32",
    date: "15/05/2025",
    details: {
      pixKey: "joao@email.com",
      pixType: "Email",
      bank: "Nubank",
    },
  },
  {
    id: "WD002",
    user: "Maria Lima",
    userId: "USR002",
    method: "USDT",
    amount: "R$ 1.500,00",
    status: "aprovado",
    time: "10:45",
    date: "15/05/2025",
    details: {
      walletAddress: "0x1a2b3c4d5e6f7g8h9i0j",
      network: "TRC20",
    },
  },
  {
    id: "WD003",
    user: "Pedro Oliveira",
    userId: "USR003",
    method: "Transferência Bancária",
    amount: "R$ 5.000,00",
    status: "pendente",
    time: "16:20",
    date: "15/05/2025",
    details: {
      bank: "Banco do Brasil",
      agency: "1234",
      account: "56789-0",
      cpf: "123.456.789-00",
    },
  },
  {
    id: "WD004",
    user: "Ana Costa",
    userId: "USR004",
    method: "Pix",
    amount: "R$ 3.200,00",
    status: "aprovado",
    time: "09:15",
    date: "14/05/2025",
    details: {
      pixKey: "11987654321",
      pixType: "Telefone",
      bank: "Itaú",
    },
  },
  {
    id: "WD005",
    user: "Carlos Ferreira",
    userId: "USR005",
    method: "USDT",
    amount: "R$ 10.000,00",
    status: "rejeitado",
    time: "11:30",
    date: "14/05/2025",
    details: {
      walletAddress: "0xa1b2c3d4e5f6g7h8i9j0",
      network: "ERC20",
      reason: "Endereço de carteira inválido",
    },
  },
]

export default function GestaoSaques() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [methodFilter, setMethodFilter] = useState("all")
  const [dateFilter, setDateFilter] = useState("")
  const [activeTab, setActiveTab] = useState("todos")

  // Calculate totals
  const totalWithdrawals = mockWithdrawals.reduce(
    (total, withdrawal) => {
      const amount = Number.parseFloat(withdrawal.amount.replace("R$ ", "").replace(".", "").replace(",", "."))

      if (withdrawal.status === "pendente") {
        total.pending += amount
      } else {
        total.completed += amount
      }

      return total
    },
    { completed: 0, pending: 0 },
  )

  // Filter withdrawals based on search term, status, method, and date
  const filteredWithdrawals = mockWithdrawals.filter((withdrawal) => {
    const searchLower = searchTerm.toLowerCase()
    const matchesSearch =
      withdrawal.user.toLowerCase().includes(searchLower) ||
      withdrawal.userId.toLowerCase().includes(searchLower) ||
      withdrawal.method.toLowerCase().includes(searchLower) ||
      withdrawal.amount.toLowerCase().includes(searchLower)

    const matchesStatus = statusFilter === "all" ? true : withdrawal.status === statusFilter
    const matchesMethod = methodFilter === "all" ? true : withdrawal.method === methodFilter

    // Simple date filter - in a real app, you'd want to do proper date comparison
    const matchesDate = dateFilter ? withdrawal.date.includes(dateFilter) : true

    // Filter by tab
    if (activeTab === "pendentes" && withdrawal.status !== "pendente") return false
    if (activeTab === "aprovados" && withdrawal.status !== "aprovado") return false
    if (activeTab === "rejeitados" && withdrawal.status !== "rejeitado") return false

    return matchesSearch && matchesStatus && matchesMethod && matchesDate
  })

  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-gradient-to-b from-black to-zinc-900 text-white">
      <div className="flex flex-col md:flex-row">
        {/* Conteúdo Principal */}
        <main className="flex-1 min-h-screen w-full overflow-x-hidden pt-16 md:pt-0">
          <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
            <div className="flex justify-between items-center py-4 md:py-8">
              <h1 className="text-2xl font-bold">Gestão de Saques</h1>
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
                    <p className="text-sm text-white">Total de Saques</p>
                    <ArrowDownCircle className="h-5 w-5 text-green-400" />
                  </div>
                  <h2 className="text-2xl font-bold text-green-400">
                    R$ {(totalWithdrawals.completed + totalWithdrawals.pending).toFixed(2).replace(".", ",")}
                  </h2>
                  <p className="text-xs text-green-400 mt-1">Valor total de saques</p>
                </CardContent>
              </Card>

              <Card className="bg-transparent border border-[#66e0cc] hover:bg-zinc-900/30 transition-colors">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <p className="text-sm text-white">Saques Pendentes</p>
                    <DollarSign className="h-5 w-5 text-yellow-400" />
                  </div>
                  <h2 className="text-2xl font-bold text-yellow-400">
                    R$ {totalWithdrawals.pending.toFixed(2).replace(".", ",")}
                  </h2>
                  <p className="text-xs text-yellow-400 mt-1">Aguardando aprovação</p>
                </CardContent>
              </Card>

              <Card className="bg-transparent border border-[#66e0cc] hover:bg-zinc-900/30 transition-colors">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <p className="text-sm text-white">Saques Aprovados</p>
                    <CheckCircle className="h-5 w-5 text-green-400" />
                  </div>
                  <h2 className="text-2xl font-bold text-green-400">
                    R$ {totalWithdrawals.completed.toFixed(2).replace(".", ",")}
                  </h2>
                  <p className="text-xs text-green-400 mt-1">Processados com sucesso</p>
                </CardContent>
              </Card>

              <Card className="bg-transparent border border-[#66e0cc] hover:bg-zinc-900/30 transition-colors">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <p className="text-sm text-white">Taxa Média</p>
                    <XCircle className="h-5 w-5 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">2,5%</h2>
                  <p className="text-xs text-white mt-1">Taxa de processamento</p>
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
                <TabsTrigger value="todos">Todos os Saques</TabsTrigger>
                <TabsTrigger value="pendentes">Pendentes</TabsTrigger>
                <TabsTrigger value="aprovados">Aprovados</TabsTrigger>
                <TabsTrigger value="rejeitados">Rejeitados</TabsTrigger>
              </TabsList>
            </Tabs>

            {/* Tabela de Saques */}
            {filteredWithdrawals.length > 0 ? (
              <div className="rounded-md border border-zinc-800 overflow-hidden overflow-x-auto">
                <Table>
                  <TableHeader className="bg-zinc-900">
                    <TableRow className="border-zinc-800 hover:bg-zinc-800/50">
                      <TableHead className="text-zinc-400">Usuário</TableHead>
                      <TableHead className="text-zinc-400">Método</TableHead>
                      <TableHead className="text-zinc-400">Valor</TableHead>
                      <TableHead className="text-zinc-400">Status</TableHead>
                      <TableHead className="text-zinc-400">Data/Hora</TableHead>
                      <TableHead className="text-zinc-400">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredWithdrawals.map((withdrawal) => (
                      <TableRow key={withdrawal.id} className="border-zinc-800 hover:bg-zinc-800/50">
                        <TableCell className="font-medium">{withdrawal.user}</TableCell>
                        <TableCell>{withdrawal.method}</TableCell>
                        <TableCell>{withdrawal.amount}</TableCell>
                        <TableCell>
                          <Badge
                            className={
                              withdrawal.status === "aprovado"
                                ? "bg-green-500/20 text-green-400 hover:bg-green-500/20"
                                : withdrawal.status === "pendente"
                                  ? "bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/20"
                                  : "bg-red-500/20 text-red-400 hover:bg-red-500/20"
                            }
                          >
                            {withdrawal.status.charAt(0).toUpperCase() + withdrawal.status.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {withdrawal.date} às {withdrawal.time}
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
                                  <DialogTitle>Detalhes do Saque</DialogTitle>
                                  <DialogDescription className="text-zinc-400">
                                    ID: {withdrawal.id} | Usuário: {withdrawal.user}
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4 py-4">
                                  <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                      <Text className="text-zinc-400">Método</Text>
                                      <Text className="text-white">{withdrawal.method}</Text>
                                    </div>
                                    <div className="space-y-1">
                                      <Text className="text-zinc-400">Valor</Text>
                                      <Text className="text-white">{withdrawal.amount}</Text>
                                    </div>
                                    <div className="space-y-1">
                                      <Text className="text-zinc-400">Status</Text>
                                      <Badge
                                        className={
                                          withdrawal.status === "aprovado"
                                            ? "bg-green-500/20 text-green-400 hover:bg-green-500/20"
                                            : withdrawal.status === "pendente"
                                              ? "bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/20"
                                              : "bg-red-500/20 text-red-400 hover:bg-red-500/20"
                                        }
                                      >
                                        {withdrawal.status.charAt(0).toUpperCase() + withdrawal.status.slice(1)}
                                      </Badge>
                                    </div>
                                    <div className="space-y-1">
                                      <Text className="text-zinc-400">Data/Hora</Text>
                                      <Text className="text-white">
                                        {withdrawal.date} às {withdrawal.time}
                                      </Text>
                                    </div>
                                  </div>

                                  <div className="pt-4 border-t border-zinc-800">
                                    <Text className="text-white font-medium mb-2">Informações de Pagamento</Text>
                                    {withdrawal.method === "Pix" && (
                                      <div className="space-y-2">
                                        <div className="flex justify-between">
                                          <Text className="text-zinc-400">Chave Pix</Text>
                                          <Text className="text-white">{withdrawal.details.pixKey}</Text>
                                        </div>
                                        <div className="flex justify-between">
                                          <Text className="text-zinc-400">Tipo</Text>
                                          <Text className="text-white">{withdrawal.details.pixType}</Text>
                                        </div>
                                        <div className="flex justify-between">
                                          <Text className="text-zinc-400">Banco</Text>
                                          <Text className="text-white">{withdrawal.details.bank}</Text>
                                        </div>
                                      </div>
                                    )}
                                    {withdrawal.method === "USDT" && (
                                      <div className="space-y-2">
                                        <div className="flex justify-between">
                                          <Text className="text-zinc-400">Endereço da Carteira</Text>
                                          <Text className="text-white">{withdrawal.details.walletAddress}</Text>
                                        </div>
                                        <div className="flex justify-between">
                                          <Text className="text-zinc-400">Rede</Text>
                                          <Text className="text-white">{withdrawal.details.network}</Text>
                                        </div>
                                      </div>
                                    )}
                                    {withdrawal.method === "Transferência Bancária" && (
                                      <div className="space-y-2">
                                        <div className="flex justify-between">
                                          <Text className="text-zinc-400">Banco</Text>
                                          <Text className="text-white">{withdrawal.details.bank}</Text>
                                        </div>
                                        <div className="flex justify-between">
                                          <Text className="text-zinc-400">Agência</Text>
                                          <Text className="text-white">{withdrawal.details.agency}</Text>
                                        </div>
                                        <div className="flex justify-between">
                                          <Text className="text-zinc-400">Conta</Text>
                                          <Text className="text-white">{withdrawal.details.account}</Text>
                                        </div>
                                        <div className="flex justify-between">
                                          <Text className="text-zinc-400">CPF</Text>
                                          <Text className="text-white">{withdrawal.details.cpf}</Text>
                                        </div>
                                      </div>
                                    )}
                                  </div>

                                  {withdrawal.status === "rejeitado" && (
                                    <div className="pt-4 border-t border-zinc-800">
                                      <Text className="text-white font-medium mb-2">Motivo da Rejeição</Text>
                                      <Text className="text-red-400">{withdrawal.details.reason}</Text>
                                    </div>
                                  )}
                                </div>
                                <DialogFooter className="flex gap-2">
                                  {withdrawal.status === "pendente" && (
                                    <>
                                      <Button className="bg-green-500 hover:bg-green-600">Aprovar</Button>
                                      <Button className="bg-red-500 hover:bg-red-600">Rejeitar</Button>
                                    </>
                                  )}
                                  {withdrawal.status === "aprovado" && (
                                    <Button className="bg-[#66e0cc] text-black hover:bg-[#55cebb]">
                                      Gerar Comprovante
                                    </Button>
                                  )}
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>

                            {withdrawal.status === "pendente" && (
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
                <ArrowDownCircle className="h-10 w-10 mx-auto text-zinc-500 mb-4" />
                <h3 className="text-lg font-medium">Nenhum saque encontrado</h3>
                <p className="text-zinc-400 mt-1">Tente ajustar seus filtros de busca.</p>
              </div>
            )}

            {/* Ações em Lote */}
            {filteredWithdrawals.length > 0 && (
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
