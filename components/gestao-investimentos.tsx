"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Search, Eye, DollarSign, Calendar, Hash } from "lucide-react"
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
import Link from "next/link"

// Sample data for investments
const mockInvestments = [
  {
    id: "INV001",
    code: "DB-66U-XYZ",
    user: "João Silva",
    userId: "USR001",
    status: "ativo",
    amount: "R$ 5.000,00",
    profit: "R$ 5.750,00",
    date: "05/02/2025",
  },
  {
    id: "INV002",
    code: "DB-77V-ABC",
    user: "Maria Santos",
    userId: "USR002",
    status: "pendente",
    amount: "R$ 10.000,00",
    profit: "R$ 11.500,00",
    date: "10/02/2025",
  },
  {
    id: "INV003",
    code: "DB-88W-DEF",
    user: "Pedro Oliveira",
    userId: "USR003",
    status: "expirado",
    amount: "R$ 2.500,00",
    profit: "R$ 2.875,00",
    date: "15/01/2025",
  },
  {
    id: "INV004",
    code: "DB-99X-GHI",
    user: "Ana Costa",
    userId: "USR004",
    status: "ativo",
    amount: "R$ 7.500,00",
    profit: "R$ 8.625,00",
    date: "20/02/2025",
  },
  {
    id: "INV005",
    code: "DB-10Y-JKL",
    user: "Carlos Ferreira",
    userId: "USR005",
    status: "pendente",
    amount: "R$ 15.000,00",
    profit: "R$ 17.250,00",
    date: "25/02/2025",
  },
]

export default function GestaoInvestimentos() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [dateFilter, setDateFilter] = useState("")
  const [paymentHash, setPaymentHash] = useState("")

  // Filter investments based on search term, status, and date
  const filteredInvestments = mockInvestments.filter((investment) => {
    const searchLower = searchTerm.toLowerCase()
    const matchesSearch =
      investment.code.toLowerCase().includes(searchLower) ||
      investment.user.toLowerCase().includes(searchLower) ||
      investment.userId.toLowerCase().includes(searchLower) ||
      investment.amount.toLowerCase().includes(searchLower)

    const matchesStatus = statusFilter === "all" ? true : investment.status === statusFilter

    // Simple date filter - in a real app, you'd want to do proper date comparison
    const matchesDate = dateFilter ? investment.date.includes(dateFilter) : true

    return matchesSearch && matchesStatus && matchesDate
  })

  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-gradient-to-b from-black to-zinc-900 text-white">
      <div className="flex flex-col md:flex-row">
        {/* Conteúdo Principal */}
        <main className="flex-1 min-h-screen w-full overflow-x-hidden pt-16 md:pt-0">
          <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
            <div className="flex justify-between items-center py-4 md:py-8">
              <h1 className="text-2xl font-bold">Gestão de Investimentos</h1>
              <div className="flex items-center gap-2">
                <Link href="/">
                  <button className="bg-[#66e0cc] text-black px-4 py-2 rounded hover:bg-[#57cdb9] mr-2">
                    Voltar para o Início
                  </button>
                </Link>
                <Badge className="bg-[#66e0cc] text-black">Admin</Badge>
              </div>
            </div>

            <Card className="bg-zinc-900/50 border border-zinc-800 mb-6">
              <CardContent className="p-4 md:p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Buscar</Label>
                    <div className="relative">
                      <Search className="absolute left-2 top-2.5 h-4 w-4 text-zinc-500" />
                      <Input
                        className="bg-transparent border border-[#66e0cc] text-white pl-8"
                        placeholder="Buscar por código, usuário, ID, valor..."
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
                        <SelectItem value="ativo">Ativo</SelectItem>
                        <SelectItem value="pendente">Pendente</SelectItem>
                        <SelectItem value="expirado">Expirado</SelectItem>
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

            {filteredInvestments.length > 0 ? (
              <div className="rounded-md border border-zinc-800 overflow-hidden overflow-x-auto">
                <Table>
                  <TableHeader className="bg-zinc-900">
                    <TableRow className="border-zinc-800 hover:bg-zinc-800/50">
                      <TableHead className="text-zinc-400">Código</TableHead>
                      <TableHead className="text-zinc-400">Usuário</TableHead>
                      <TableHead className="text-zinc-400">Status</TableHead>
                      <TableHead className="text-zinc-400">Valor</TableHead>
                      <TableHead className="text-zinc-400">Lucro</TableHead>
                      <TableHead className="text-zinc-400">Data</TableHead>
                      <TableHead className="text-zinc-400">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredInvestments.map((investment) => (
                      <TableRow key={investment.id} className="border-zinc-800 hover:bg-zinc-800/50">
                        <TableCell className="font-medium">{investment.code}</TableCell>
                        <TableCell>{investment.user}</TableCell>
                        <TableCell>
                          <Badge
                            className={
                              investment.status === "ativo"
                                ? "bg-green-500/20 text-green-400 hover:bg-green-500/20"
                                : investment.status === "pendente"
                                  ? "bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/20"
                                  : "bg-red-500/20 text-red-400 hover:bg-red-500/20"
                            }
                          >
                            {investment.status.charAt(0).toUpperCase() + investment.status.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell>{investment.amount}</TableCell>
                        <TableCell>{investment.profit}</TableCell>
                        <TableCell>{investment.date}</TableCell>
                        <TableCell>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 text-[#66e0cc] hover:text-[#55cebb] hover:bg-transparent"
                              >
                                <Eye className="h-4 w-4 mr-1" /> Ver
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="bg-zinc-900 border-zinc-700 text-white">
                              <DialogHeader>
                                <DialogTitle>Detalhes do Investimento</DialogTitle>
                                <DialogDescription className="text-zinc-400">
                                  Código: {investment.code}
                                </DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4 py-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div className="space-y-1">
                                    <Text className="text-zinc-400">Usuário</Text>
                                    <Text className="text-white">{investment.user}</Text>
                                  </div>
                                  <div className="space-y-1">
                                    <Text className="text-zinc-400">ID do Usuário</Text>
                                    <Text className="text-white">{investment.userId}</Text>
                                  </div>
                                  <div className="space-y-1">
                                    <Text className="text-zinc-400">Status</Text>
                                    <Badge
                                      className={
                                        investment.status === "ativo"
                                          ? "bg-green-500/20 text-green-400 hover:bg-green-500/20"
                                          : investment.status === "pendente"
                                            ? "bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/20"
                                            : "bg-red-500/20 text-red-400 hover:bg-red-500/20"
                                      }
                                    >
                                      {investment.status.charAt(0).toUpperCase() + investment.status.slice(1)}
                                    </Badge>
                                  </div>
                                  <div className="space-y-1">
                                    <Text className="text-zinc-400">Data</Text>
                                    <Text className="text-white">{investment.date}</Text>
                                  </div>
                                  <div className="space-y-1">
                                    <Text className="text-zinc-400">Valor Investido</Text>
                                    <Text className="text-white">{investment.amount}</Text>
                                  </div>
                                  <div className="space-y-1">
                                    <Text className="text-zinc-400">Lucro Esperado</Text>
                                    <Text className="text-white">{investment.profit}</Text>
                                  </div>
                                </div>

                                <div className="pt-4 border-t border-zinc-800">
                                  <div className="flex gap-2">
                                    {investment.status === "pendente" && (
                                      <Button className="bg-green-500 hover:bg-green-600">Aprovar</Button>
                                    )}
                                    {investment.status === "ativo" && (
                                      <Button className="bg-yellow-500 text-black hover:bg-yellow-600">
                                        Marcar como Expirado
                                      </Button>
                                    )}
                                    <Button variant="outline" className="border-zinc-700">
                                      Gerar Relatório
                                    </Button>
                                  </div>
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
                <Calendar className="h-10 w-10 mx-auto text-zinc-500 mb-4" />
                <h3 className="text-lg font-medium">Nenhum investimento encontrado</h3>
                <p className="text-zinc-400 mt-1">Tente ajustar seus filtros de busca.</p>
              </div>
            )}

            {/* Área de Pagamento de Fatura */}
            <Card className="bg-zinc-900/50 border border-zinc-800 mt-8">
              <CardContent className="p-4 md:p-6">
                <h2 className="text-xl font-semibold mb-4">Pagamento de Fatura</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Hash do Pagamento</Label>
                    <div className="relative">
                      <Hash className="absolute left-2 top-2.5 h-4 w-4 text-zinc-500" />
                      <Input
                        className="bg-transparent border border-[#66e0cc] text-white pl-8"
                        placeholder="Cole a hash do pagamento"
                        value={paymentHash}
                        onChange={(e) => setPaymentHash(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="flex items-end">
                    <Button className="bg-[#66e0cc] text-black hover:bg-[#55cebb] w-full md:w-auto h-10">
                      <DollarSign className="mr-2 h-4 w-4" /> Confirmar Pagamento
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
