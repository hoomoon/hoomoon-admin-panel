"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  Users,
  Search,
  Edit,
  Trash2,
  Shield,
  CheckCircle,
  XCircle,
  ArrowDownCircle,
  Award,
  ChevronLeft,
  ChevronRight,
  Lock,
  Mail,
  KeyRound,
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"

// Sample data for users
const mockUsers = [
  {
    id: "USR001",
    name: "João Silva",
    email: "joao@example.com",
    phone: "(11) 98765-4321",
    status: "ativo",
    plan: "Premium",
    balance: "R$ 12.450,00",
  },
  {
    id: "USR002",
    name: "Maria Santos",
    email: "maria@example.com",
    phone: "(21) 99876-5432",
    status: "ativo",
    plan: "Standard",
    balance: "R$ 8.720,00",
  },
  {
    id: "USR003",
    name: "Pedro Oliveira",
    email: "pedro@example.com",
    phone: "(31) 97654-3210",
    status: "inativo",
    plan: "Basic",
    balance: "R$ 3.210,00",
  },
  {
    id: "USR004",
    name: "Ana Costa",
    email: "ana@example.com",
    phone: "(41) 96543-2109",
    status: "ativo",
    plan: "Premium",
    balance: "R$ 15.670,00",
  },
  {
    id: "USR005",
    name: "Carlos Ferreira",
    email: "carlos@example.com",
    phone: "(51) 95432-1098",
    status: "banido",
    plan: "Standard",
    balance: "R$ 0,00",
  },
  {
    id: "USR006",
    name: "Fernanda Lima",
    email: "fernanda@example.com",
    phone: "(61) 94321-0987",
    status: "ativo",
    plan: "Premium",
    balance: "R$ 22.350,00",
  },
  {
    id: "USR007",
    name: "Ricardo Souza",
    email: "ricardo@example.com",
    phone: "(71) 93210-9876",
    status: "inativo",
    plan: "Basic",
    balance: "R$ 1.890,00",
  },
  {
    id: "USR008",
    name: "Juliana Martins",
    email: "juliana@example.com",
    phone: "(81) 92109-8765",
    status: "ativo",
    plan: "Standard",
    balance: "R$ 7.430,00",
  },
]

export default function GestaoUsuarios() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("nome")
  const [currentPage, setCurrentPage] = useState(1)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const itemsPerPage = 5

  // Filter users based on search term and filter type
  const filteredUsers = mockUsers.filter((user) => {
    const searchLower = searchTerm.toLowerCase()

    switch (filterType) {
      case "nome":
        return user.name.toLowerCase().includes(searchLower)
      case "email":
        return user.email.toLowerCase().includes(searchLower)
      case "id":
        return user.id.toLowerCase().includes(searchLower)
      case "telefone":
        return user.phone.toLowerCase().includes(searchLower)
      default:
        return true
    }
  })

  // Calculate pagination
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage)
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentUsers = filteredUsers.slice(indexOfFirstItem, indexOfLastItem)

  // Handle page change
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-gradient-to-b from-black to-zinc-900 text-white">
      <div className="flex flex-col md:flex-row">
        {/* Conteúdo Principal */}
        <main className="flex-1 min-h-screen w-full overflow-x-hidden pt-16 md:pt-0">
          <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
            <div className="flex justify-between items-center py-4 md:py-8">
              <h1 className="text-2xl font-bold">Gestão de Usuários</h1>
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
                <div className="flex flex-col md:flex-row gap-4 items-start md:items-end">
                  <div className="flex-1 space-y-2 w-full">
                    <Label>Buscar Usuário</Label>
                    <div className="relative">
                      <Search className="absolute left-2 top-2.5 h-4 w-4 text-zinc-500" />
                      <Input
                        className="bg-transparent border border-[#66e0cc] text-white pl-8"
                        placeholder="Buscar usuário..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="w-full md:w-auto">
                    <Label>Filtrar por</Label>
                    <Select value={filterType} onValueChange={setFilterType}>
                      <SelectTrigger className="bg-transparent border border-[#66e0cc] text-white w-full md:w-[180px]">
                        <SelectValue placeholder="Filtrar por" />
                      </SelectTrigger>
                      <SelectContent className="bg-zinc-800 border-zinc-700">
                        <SelectItem value="nome">Nome</SelectItem>
                        <SelectItem value="email">E-mail</SelectItem>
                        <SelectItem value="id">ID</SelectItem>
                        <SelectItem value="telefone">Telefone</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button className="bg-[#66e0cc] text-black hover:bg-[#55cebb] w-full md:w-auto">
                    <Users className="mr-2 h-4 w-4" /> Novo Usuário
                  </Button>
                </div>
              </CardContent>
            </Card>

            {currentUsers.length > 0 ? (
              <div className="rounded-md border border-zinc-800 overflow-hidden overflow-x-auto">
                <Table>
                  <TableHeader className="bg-zinc-900">
                    <TableRow className="border-zinc-800 hover:bg-zinc-800/50">
                      <TableHead className="text-zinc-400">ID</TableHead>
                      <TableHead className="text-zinc-400">Nome</TableHead>
                      <TableHead className="text-zinc-400 hidden md:table-cell">E-mail</TableHead>
                      <TableHead className="text-zinc-400 hidden md:table-cell">Telefone</TableHead>
                      <TableHead className="text-zinc-400">Status</TableHead>
                      <TableHead className="text-zinc-400 hidden md:table-cell">Plano</TableHead>
                      <TableHead className="text-zinc-400 hidden md:table-cell">Saldo</TableHead>
                      <TableHead className="text-zinc-400">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentUsers.map((user) => (
                      <TableRow key={user.id} className="border-zinc-800 hover:bg-zinc-800/50">
                        <TableCell className="font-medium">{user.id}</TableCell>
                        <TableCell>{user.name}</TableCell>
                        <TableCell className="hidden md:table-cell">{user.email}</TableCell>
                        <TableCell className="hidden md:table-cell">{user.phone}</TableCell>
                        <TableCell>
                          <Badge
                            className={
                              user.status === "ativo"
                                ? "bg-green-500/20 text-green-400 hover:bg-green-500/20"
                                : user.status === "inativo"
                                  ? "bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/20"
                                  : "bg-red-500/20 text-red-400 hover:bg-red-500/20"
                            }
                          >
                            {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">{user.plan}</TableCell>
                        <TableCell className="hidden md:table-cell">{user.balance}</TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="h-8 w-8 bg-transparent border-zinc-700 hover:bg-zinc-800"
                                >
                                  <Edit className="h-4 w-4 text-blue-400" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="bg-zinc-900 border-zinc-700 text-white">
                                <DialogHeader>
                                  <DialogTitle>Editar Usuário</DialogTitle>
                                  <DialogDescription className="text-zinc-400">
                                    {user.name} ({user.id})
                                  </DialogDescription>
                                </DialogHeader>
                                <Tabs defaultValue="email" className="w-full">
                                  <TabsList className="bg-zinc-800 rounded-xl">
                                    <TabsTrigger value="email">Email</TabsTrigger>
                                    <TabsTrigger value="senha">Senha</TabsTrigger>
                                    <TabsTrigger value="pin">PIN</TabsTrigger>
                                  </TabsList>
                                  <TabsContent value="email" className="space-y-4 py-4">
                                    <div className="space-y-2">
                                      <Label>Email Atual</Label>
                                      <Input className="bg-zinc-800 border-zinc-700" value={user.email} disabled />
                                    </div>
                                    <div className="space-y-2">
                                      <Label>Novo Email</Label>
                                      <Input className="bg-zinc-800 border-zinc-700" type="email" />
                                    </div>
                                    <Button className="w-full bg-blue-500 hover:bg-blue-600">
                                      <Mail className="mr-2 h-4 w-4" /> Atualizar Email
                                    </Button>
                                  </TabsContent>
                                  <TabsContent value="senha" className="space-y-4 py-4">
                                    <div className="space-y-2">
                                      <Label>Nova Senha</Label>
                                      <Input className="bg-zinc-800 border-zinc-700" type="password" />
                                    </div>
                                    <div className="space-y-2">
                                      <Label>Confirmar Nova Senha</Label>
                                      <Input className="bg-zinc-800 border-zinc-700" type="password" />
                                    </div>
                                    <Button className="w-full bg-blue-500 hover:bg-blue-600">
                                      <Lock className="mr-2 h-4 w-4" /> Atualizar Senha
                                    </Button>
                                  </TabsContent>
                                  <TabsContent value="pin" className="space-y-4 py-4">
                                    <div className="space-y-2">
                                      <Label>Novo PIN (4 dígitos)</Label>
                                      <Input
                                        className="bg-zinc-800 border-zinc-700"
                                        type="text"
                                        maxLength={4}
                                        pattern="[0-9]*"
                                        inputMode="numeric"
                                      />
                                    </div>
                                    <Button className="w-full bg-blue-500 hover:bg-blue-600">
                                      <KeyRound className="mr-2 h-4 w-4" /> Atualizar PIN
                                    </Button>
                                  </TabsContent>
                                </Tabs>
                              </DialogContent>
                            </Dialog>

                            {user.status === "ativo" ? (
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8 bg-transparent border-zinc-700 hover:bg-zinc-800"
                                title="Desativar"
                              >
                                <XCircle className="h-4 w-4 text-yellow-400" />
                              </Button>
                            ) : (
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8 bg-transparent border-zinc-700 hover:bg-zinc-800"
                                title="Ativar"
                              >
                                <CheckCircle className="h-4 w-4 text-green-400" />
                              </Button>
                            )}

                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8 bg-transparent border-zinc-700 hover:bg-zinc-800"
                              title="Banir"
                            >
                              <Shield className="h-4 w-4 text-red-400" />
                            </Button>

                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8 bg-transparent border-zinc-700 hover:bg-zinc-800"
                              title="Excluir"
                            >
                              <Trash2 className="h-4 w-4 text-red-400" />
                            </Button>

                            <Dialog>
                              <DialogTrigger asChild>
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="h-8 w-8 bg-transparent border-zinc-700 hover:bg-zinc-800"
                                  title="Aprovar saque"
                                >
                                  <ArrowDownCircle className="h-4 w-4 text-green-400" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="bg-zinc-900 border-zinc-700 text-white">
                                <DialogHeader>
                                  <DialogTitle>Aprovar Saque</DialogTitle>
                                  <DialogDescription className="text-zinc-400">
                                    {user.name} ({user.id})
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4 py-4">
                                  <div className="space-y-2">
                                    <Label>Valor do Saque</Label>
                                    <Input className="bg-zinc-800 border-zinc-700" type="text" />
                                  </div>
                                  <div className="space-y-2">
                                    <Label>Método de Pagamento</Label>
                                    <Select>
                                      <SelectTrigger className="bg-zinc-800 border-zinc-700">
                                        <SelectValue placeholder="Selecione o método" />
                                      </SelectTrigger>
                                      <SelectContent className="bg-zinc-800 border-zinc-700">
                                        <SelectItem value="pix">PIX</SelectItem>
                                        <SelectItem value="bank">Transferência Bancária</SelectItem>
                                        <SelectItem value="crypto">Criptomoeda</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                  <Button className="w-full bg-green-500 hover:bg-green-600">
                                    <ArrowDownCircle className="mr-2 h-4 w-4" /> Aprovar Saque
                                  </Button>
                                </div>
                              </DialogContent>
                            </Dialog>

                            <Dialog>
                              <DialogTrigger asChild>
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="h-8 w-8 bg-transparent border-zinc-700 hover:bg-zinc-800"
                                  title="Liberar Patrocínio"
                                >
                                  <Award className="h-4 w-4 text-[#66e0cc]" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="bg-zinc-900 border-zinc-700 text-white">
                                <DialogHeader>
                                  <DialogTitle>Liberar Patrocínio</DialogTitle>
                                  <DialogDescription className="text-zinc-400">
                                    {user.name} ({user.id})
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4 py-4">
                                  <div className="space-y-2">
                                    <Label>Nível de Patrocínio</Label>
                                    <Select>
                                      <SelectTrigger className="bg-zinc-800 border-zinc-700">
                                        <SelectValue placeholder="Selecione o nível" />
                                      </SelectTrigger>
                                      <SelectContent className="bg-zinc-800 border-zinc-700">
                                        <SelectItem value="bronze">Bronze</SelectItem>
                                        <SelectItem value="silver">Prata</SelectItem>
                                        <SelectItem value="gold">Ouro</SelectItem>
                                        <SelectItem value="platinum">Platina</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                  <div className="space-y-2">
                                    <Label>Duração (meses)</Label>
                                    <Input
                                      className="bg-zinc-800 border-zinc-700"
                                      type="number"
                                      min="1"
                                      defaultValue="1"
                                    />
                                  </div>
                                  <Button className="w-full bg-[#66e0cc] text-black hover:bg-[#55cebb]">
                                    <Award className="mr-2 h-4 w-4" /> Liberar Patrocínio
                                  </Button>
                                </div>
                              </DialogContent>
                            </Dialog>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="text-center py-10 bg-zinc-900/50 rounded-lg border border-zinc-800">
                <Users className="h-10 w-10 mx-auto text-zinc-500 mb-4" />
                <h3 className="text-lg font-medium">Nenhum usuário encontrado</h3>
                <p className="text-zinc-400 mt-1">Tente ajustar sua busca ou adicione um novo usuário.</p>
              </div>
            )}

            {/* Pagination */}
            {filteredUsers.length > 0 && (
              <div className="flex flex-col md:flex-row justify-between items-center mt-4 gap-4">
                <Text className="text-zinc-400">
                  Mostrando {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredUsers.length)} de{" "}
                  {filteredUsers.length} usuários
                </Text>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="h-8 w-8 p-0 border-zinc-700"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      size="sm"
                      onClick={() => handlePageChange(page)}
                      className={`h-8 w-8 p-0 ${
                        currentPage === page ? "bg-[#66e0cc] text-black hover:bg-[#55cebb]" : "border-zinc-700"
                      }`}
                    >
                      {page}
                    </Button>
                  ))}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="h-8 w-8 p-0 border-zinc-700"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </main>
  )
}
