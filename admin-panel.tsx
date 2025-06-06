"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { LogoutButton } from "@/components/logout-button"
import { useAuth } from "@/app/providers/AuthProvider"
import {
  Users,
  ArrowDownCircle,
  ArrowUpCircle,
  Menu,
  X,
  Search,
  DollarSign,
  Shield,
  FileText,
  Home,
  LogOut,
  UserPlus,
  UserMinus,
  User,
  TrendingUp,
  Activity,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Text } from "@/components/ui/text"
import Link from "next/link"

// Sample data for users
const users = [
  {
    id: "USR001",
    name: "João Silva",
    email: "joao@example.com",
    status: "ativo",
    balance: "R$ 12.450,00",
    date: "15/04/2025",
  },
  {
    id: "USR002",
    name: "Maria Santos",
    email: "maria@example.com",
    status: "ativo",
    balance: "R$ 8.720,00",
    date: "12/04/2025",
  },
  {
    id: "USR003",
    name: "Pedro Oliveira",
    email: "pedro@example.com",
    status: "inativo",
    balance: "R$ 3.210,00",
    date: "10/03/2025",
  },
  {
    id: "USR004",
    name: "Ana Costa",
    email: "ana@example.com",
    status: "ativo",
    balance: "R$ 15.670,00",
    date: "05/04/2025",
  },
  {
    id: "USR005",
    name: "Carlos Ferreira",
    email: "carlos@example.com",
    status: "banido",
    balance: "R$ 0,00",
    date: "01/02/2025",
  },
]

export default function PainelAdminCompleto() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const { user } = useAuth()

  const filteredUsers = users.filter(
    (user) =>
      user.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-gradient-to-b from-black to-zinc-900 text-white">
      <div className="flex flex-col md:flex-row">
        {/* Mobile Menu Button */}
        <button
          className="fixed top-4 left-4 z-50 md:hidden bg-zinc-800 p-2 rounded-md"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        {/* Mobile Menu Overlay */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-80 z-40 md:hidden" onClick={() => setMobileMenuOpen(false)}>
            <aside
              className="fixed md:static w-[80%] max-w-xs h-full bg-zinc-950 z-50 overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4">
                <h2 className="text-xl font-bold mb-6 mt-12">Admin HOOMOON</h2>
                <nav className="space-y-4">
                  <Button variant="ghost" className="w-full justify-start">
                    <Home className="mr-2 h-5 w-5" /> Visão Geral
                  </Button>
                  <Link href="/usuarios" passHref>
                    <Button variant="ghost" className="w-full justify-start">
                      <Users className="mr-2 h-5 w-5" /> Usuários
                    </Button>
                  </Link>
                  <Link href="/investimentos" passHref>
                    <Button variant="ghost" className="w-full justify-start">
                      <TrendingUp className="mr-2 h-5 w-5" /> Investimentos
                    </Button>
                  </Link>
                  <Link href="/saques" passHref>
                    <Button variant="ghost" className="w-full justify-start">
                      <ArrowDownCircle className="mr-2 h-5 w-5" /> Saques
                    </Button>
                  </Link>
                  <Link href="/depositos" passHref>
                    <Button variant="ghost" className="w-full justify-start">
                      <ArrowUpCircle className="mr-2 h-5 w-5" /> Depósitos
                    </Button>
                  </Link>
                  <Link href="/liberacoes" passHref>
                    <Button variant="ghost" className="w-full justify-start">
                      <Shield className="mr-2 h-5 w-5" /> Liberações
                    </Button>
                  </Link>
                  <Link href="/relatorios" passHref>
                    <Button variant="ghost" className="w-full justify-start">
                      <FileText className="mr-2 h-5 w-5" /> Relatórios
                    </Button>
                  </Link>
                  <Link href="/logs-admin" passHref>
                    <Button variant="ghost" className="w-full justify-start">
                      <Activity className="mr-2 h-5 w-5" /> Logs de Ações
                    </Button>
                  </Link>
                  <div className="pt-4 mt-4 border-t border-zinc-800">
                    <LogoutButton />
                  </div>
                </nav>
              </div>
            </aside>
          </div>
        )}

        {/* Menu Lateral Desktop */}
        <aside className="hidden md:block w-64 bg-zinc-950 border-r border-zinc-800 shrink-0 fixed h-screen overflow-y-auto">
          <div className="p-4 pb-20">
            <h2 className="text-xl font-bold mb-6">Admin HOOMOON</h2>
            <nav className="space-y-4">
              <Button variant="ghost" className="w-full justify-start">
                <Home className="mr-2 h-5 w-5" /> Visão Geral
              </Button>
              <Link href="/usuarios" passHref>
                <Button variant="ghost" className="w-full justify-start">
                  <Users className="mr-2 h-5 w-5" /> Usuários
                </Button>
              </Link>
              <Link href="/investimentos" passHref>
                <Button variant="ghost" className="w-full justify-start">
                  <TrendingUp className="mr-2 h-5 w-5" /> Investimentos
                </Button>
              </Link>
              <Link href="/saques" passHref>
                <Button variant="ghost" className="w-full justify-start">
                  <ArrowDownCircle className="mr-2 h-5 w-5" /> Saques
                </Button>
              </Link>
              <Link href="/depositos" passHref>
                <Button variant="ghost" className="w-full justify-start">
                  <ArrowUpCircle className="mr-2 h-5 w-5" /> Depósitos
                </Button>
              </Link>
              <Link href="/liberacoes" passHref>
                <Button variant="ghost" className="w-full justify-start">
                  <Shield className="mr-2 h-5 w-5" /> Liberações
                </Button>
              </Link>
              <Link href="/relatorios" passHref>
                <Button variant="ghost" className="w-full justify-start">
                  <FileText className="mr-2 h-5 w-5" /> Relatórios
                </Button>
              </Link>
              <Link href="/logs-admin" passHref>
                <Button variant="ghost" className="w-full justify-start">
                  <Activity className="mr-2 h-5 w-5" /> Logs de Ações
                </Button>
              </Link>
              <div className="pt-4 mt-4 border-t border-zinc-800">
                <LogoutButton />
              </div>
            </nav>

            <div className="absolute bottom-4 left-2 right-2">
              <div className="p-2 bg-zinc-900 rounded-lg border border-zinc-800">
                <div className="flex items-center gap-2">
                  <Avatar className="h-7 w-7">
                    <AvatarImage src="/admin-interface.png" />
                    <AvatarFallback>{user?.name?.charAt(0) || 'A'}</AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate">{user?.name || 'Admin'}</p>
                    <p className="text-xs text-zinc-400 truncate">{user?.email || 'admin@hoomoon.com'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Conteúdo Principal */}
        <main className="flex-1 md:ml-64">
          <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
            <div className="flex justify-between items-center py-4 md:py-8">
              <h1 className="text-2xl font-bold">Painel Administrativo</h1>
              <div className="flex items-center gap-2">
                <Badge className="bg-[#66e0cc] text-black">Admin</Badge>
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/admin-interface.png" />
                  <AvatarFallback>AD</AvatarFallback>
                </Avatar>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 overflow-x-hidden">
              <Card className="bg-transparent border border-[#66e0cc] hover:bg-zinc-900/30 transition-colors">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <p className="text-sm text-white">Saldo Total</p>
                    <DollarSign className="h-5 w-5 text-green-400" />
                  </div>
                  <h2 className="text-2xl font-bold text-green-400">R$ 0,00</h2>
                  <p className="text-xs text-green-400 mt-1">+0,0% este mês</p>
                </CardContent>
              </Card>

              <Card className="bg-transparent border border-[#66e0cc] hover:bg-zinc-900/30 transition-colors">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <p className="text-sm text-white">Total Investido</p>
                    <ArrowUpCircle className="h-5 w-5 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">R$ 0,00</h2>
                  <p className="text-xs text-white mt-1">+0,0% este mês</p>
                </CardContent>
              </Card>

              <Card className="bg-transparent border border-[#66e0cc] hover:bg-zinc-900/30 transition-colors">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <p className="text-sm text-white">Total de Saques</p>
                    <ArrowDownCircle className="h-5 w-5 text-red-400" />
                  </div>
                  <h2 className="text-2xl font-bold text-red-400">R$ 0,00</h2>
                  <p className="text-xs text-red-400 mt-1">+0,0% este mês</p>
                </CardContent>
              </Card>

              <Card className="bg-transparent border border-[#66e0cc] hover:bg-zinc-900/30 transition-colors">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <p className="text-sm text-white">Total de Comissões</p>
                    <DollarSign className="h-5 w-5 text-green-300" />
                  </div>
                  <h2 className="text-2xl font-bold text-green-300">R$ 0,00</h2>
                  <p className="text-xs text-green-300 mt-1">+0,0% este mês</p>
                </CardContent>
              </Card>

              <Card className="bg-transparent border border-[#66e0cc] hover:bg-zinc-900/30 transition-colors">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <p className="text-sm text-white">Total de Usuários</p>
                    <Users className="h-5 w-5 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">0</h2>
                  <p className="text-xs text-white mt-1">+0 este mês</p>
                </CardContent>
              </Card>

              <Card className="bg-transparent border border-[#66e0cc] hover:bg-zinc-900/30 transition-colors">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <p className="text-sm text-white">Usuários Ativos</p>
                    <User className="h-5 w-5 text-green-400" />
                  </div>
                  <h2 className="text-2xl font-bold text-green-400">0</h2>
                  <p className="text-xs text-green-400 mt-1">+0 este mês</p>
                </CardContent>
              </Card>

              <Card className="bg-transparent border border-[#66e0cc] hover:bg-zinc-900/30 transition-colors">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <p className="text-sm text-white">Usuários Inativos</p>
                    <UserMinus className="h-5 w-5 text-red-400" />
                  </div>
                  <h2 className="text-2xl font-bold text-red-400">0</h2>
                  <p className="text-xs text-red-400 mt-1">+0 este mês</p>
                </CardContent>
              </Card>

              <Card className="bg-transparent border border-[#66e0cc] hover:bg-zinc-900/30 transition-colors">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <p className="text-sm text-white">Usuários Patrocinados</p>
                    <UserPlus className="h-5 w-5 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">0</h2>
                  <p className="text-xs text-white mt-1">+0 este mês</p>
                </CardContent>
              </Card>

              <Card className="bg-transparent border border-[#66e0cc] hover:bg-zinc-900/30 transition-colors">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <p className="text-sm text-white">Saldo de Patrocínio</p>
                    <Shield className="h-5 w-5 text-green-400" />
                  </div>
                  <h2 className="text-2xl font-bold text-green-400">R$ 0,00</h2>
                  <p className="text-xs text-green-400 mt-1">+0,0% este mês</p>
                </CardContent>
              </Card>

              <Card className="bg-transparent border border-[#66e0cc] hover:bg-zinc-900/30 transition-colors">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <p className="text-sm text-white">Rendimentos de Patrocínio</p>
                    <DollarSign className="h-5 w-5 text-green-400" />
                  </div>
                  <h2 className="text-2xl font-bold text-green-400">R$ 0,00</h2>
                  <p className="text-xs text-green-400 mt-1">+0,0% este mês</p>
                </CardContent>
              </Card>
            </div>

            <Tabs defaultValue="usuarios" className="w-full overflow-x-hidden mt-6">
              <TabsList className="bg-zinc-800 rounded-xl">
                <TabsTrigger value="usuarios">Gestão de Usuários</TabsTrigger>
                <TabsTrigger value="liberacoes">Liberações</TabsTrigger>
                <TabsTrigger value="relatorios">Relatórios</TabsTrigger>
              </TabsList>

              <TabsContent value="usuarios" className="mt-4">
                <div className="space-y-4">
                  <div className="flex flex-col md:flex-row gap-4 items-start md:items-end">
                    <div className="flex-1 space-y-2">
                      <Label>ID, Nome ou Email do Usuário</Label>
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
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="bg-[#66e0cc] text-black hover:bg-[#55cebb]">
                          <UserPlus className="mr-2 h-4 w-4" /> Novo Usuário
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="bg-zinc-900 border-zinc-700 text-white">
                        <DialogHeader>
                          <DialogTitle>Adicionar Novo Usuário</DialogTitle>
                          <DialogDescription className="text-zinc-400">
                            Preencha os dados para criar um novo usuário no sistema.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          <div className="space-y-2">
                            <Label>Nome Completo</Label>
                            <Input className="bg-zinc-800 border-zinc-700" />
                          </div>
                          <div className="space-y-2">
                            <Label>Email</Label>
                            <Input className="bg-zinc-800 border-zinc-700" type="email" />
                          </div>
                          <div className="space-y-2">
                            <Label>Tipo de Conta</Label>
                            <Select>
                              <SelectTrigger className="bg-zinc-800 border-zinc-700">
                                <SelectValue placeholder="Selecione o tipo" />
                              </SelectTrigger>
                              <SelectContent className="bg-zinc-800 border-zinc-700">
                                <SelectItem value="normal">Normal</SelectItem>
                                <SelectItem value="patrocinado">Patrocinado</SelectItem>
                                <SelectItem value="admin">Administrador</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <DialogFooter>
                          <Button className="bg-[#66e0cc] text-black hover:bg-[#55cebb]">Criar Usuário</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>

                  {filteredUsers.length > 0 ? (
                    <div className="rounded-md border border-zinc-800 overflow-hidden overflow-x-auto">
                      <Table>
                        <TableHeader className="bg-zinc-900">
                          <TableRow className="border-zinc-800 hover:bg-zinc-800/50">
                            <TableHead className="text-zinc-400">ID</TableHead>
                            <TableHead className="text-zinc-400">Nome</TableHead>
                            <TableHead className="text-zinc-400">Email</TableHead>
                            <TableHead className="text-zinc-400">Status</TableHead>
                            <TableHead className="text-zinc-400">Saldo</TableHead>
                            <TableHead className="text-zinc-400">Data Cadastro</TableHead>
                            <TableHead className="text-zinc-400">Ações</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredUsers.map((user) => (
                            <TableRow key={user.id} className="border-zinc-800 hover:bg-zinc-800/50">
                              <TableCell className="font-medium">{user.id}</TableCell>
                              <TableCell>{user.name}</TableCell>
                              <TableCell>{user.email}</TableCell>
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
                              <TableCell>{user.balance}</TableCell>
                              <TableCell>{user.date}</TableCell>
                              <TableCell>
                                <div className="flex space-x-2">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="h-8 bg-[#66e0cc] text-black hover:bg-[#5bd7c0] border-transparent"
                                  >
                                    Editar
                                  </Button>
                                  <Dialog>
                                    <DialogTrigger asChild>
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        className="h-8 border-zinc-700 hover:bg-zinc-800"
                                      >
                                        Ações
                                      </Button>
                                    </DialogTrigger>
                                    <DialogContent className="bg-zinc-900 border-zinc-700 text-white">
                                      <DialogHeader>
                                        <DialogTitle>Ações para {user.name}</DialogTitle>
                                        <DialogDescription className="text-zinc-400">
                                          ID: {user.id} | Email: {user.email}
                                        </DialogDescription>
                                      </DialogHeader>
                                      <div className="grid grid-cols-2 gap-4 py-4">
                                        <Button className="bg-green-500 text-white hover:bg-green-600">
                                          Ativar Usuário
                                        </Button>
                                        <Button className="bg-yellow-500 text-black hover:bg-yellow-600">Banir</Button>
                                        <Button className="bg-red-500 text-white hover:bg-red-600">
                                          Excluir Conta
                                        </Button>
                                        <Button className="bg-[#66e0cc] text-black hover:bg-[#5bd7c0]">
                                          Adicionar Saldo
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

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Button className="bg-green-500 text-white hover:bg-green-600">Ativar Usuário</Button>
                    <Button className="bg-yellow-500 text-black hover:bg-yellow-600">Banir</Button>
                    <Button className="bg-red-500 text-white hover:bg-red-600">Excluir Conta</Button>
                    <Button className="bg-[#66e0cc] text-black hover:bg-[#5bd7c0]">Adicionar Saldo</Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="liberacoes" className="mt-4">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Text className="text-white">ID do Líder</Text>
                      <Input
                        className="text-white placeholder-white bg-transparent border border-white"
                        placeholder="ID do patrocinador..."
                      />
                    </div>
                    <div className="space-y-2">
                      <Text className="text-white">Tipo de Liberação</Text>
                      <Select>
                        <SelectTrigger className="text-white bg-transparent border border-white">
                          <SelectValue placeholder="Selecione o tipo" />
                        </SelectTrigger>
                        <SelectContent className="bg-zinc-800 border-zinc-700">
                          <SelectItem value="patrocinio">Patrocínio</SelectItem>
                          <SelectItem value="voucher">Conta Voucher</SelectItem>
                          <SelectItem value="saldo">Saldo Manual</SelectItem>
                          <SelectItem value="todos">Todos os Tipos</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Text className="text-white">Observações</Text>
                    <Input
                      className="text-white placeholder-white bg-transparent border border-white"
                      placeholder="Adicione observações sobre esta liberação..."
                    />
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <Button className="bg-[#66e0cc] text-black hover:bg-[#5bd7c0]">Liberar Patrocínio</Button>
                    <Button className="bg-[#66e0cc] text-black hover:bg-[#5bd7c0]">Liberar Conta Voucher</Button>
                    <Button className="bg-[#66e0cc] text-black hover:bg-[#5bd7c0]">Liberar Saldo Manual</Button>
                  </div>

                  <Card className="bg-zinc-900/50 border border-zinc-800 mt-6">
                    <CardContent className="p-4">
                      <h3 className="text-lg font-medium mb-4">Liberações Pendentes</h3>
                      <Table>
                        <TableHeader>
                          <TableRow className="border-zinc-800">
                            <TableHead className="text-zinc-400">ID</TableHead>
                            <TableHead className="text-zinc-400">Líder</TableHead>
                            <TableHead className="text-zinc-400">Tipo</TableHead>
                            <TableHead className="text-zinc-400">Data</TableHead>
                            <TableHead className="text-zinc-400">Status</TableHead>
                            <TableHead className="text-zinc-400">Ações</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow className="border-zinc-800">
                            <TableCell>LIB001</TableCell>
                            <TableCell>João Silva</TableCell>
                            <TableCell>Patrocínio</TableCell>
                            <TableCell>15/05/2025</TableCell>
                            <TableCell>
                              <Badge className="bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/20">
                                Pendente
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex space-x-2">
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
                              </div>
                            </TableCell>
                          </TableRow>
                          <TableRow className="border-zinc-800">
                            <TableCell>LIB002</TableCell>
                            <TableCell>Maria Santos</TableCell>
                            <TableCell>Voucher</TableCell>
                            <TableCell>14/05/2025</TableCell>
                            <TableCell>
                              <Badge className="bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/20">
                                Pendente
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex space-x-2">
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
                              </div>
                            </TableCell>
                          </TableRow>
                          <TableRow className="border-zinc-800">
                            <TableCell>LIB003</TableCell>
                            <TableCell>Pedro Oliveira</TableCell>
                            <TableCell>Patrocínio</TableCell>
                            <TableCell>12/05/2025</TableCell>
                            <TableCell>
                              <Badge className="bg-green-500/20 text-green-400 hover:bg-green-500/20">Aprovado</Badge>
                            </TableCell>
                            <TableCell>
                              <Button variant="outline" size="sm" className="h-8 border-zinc-700 hover:bg-zinc-800">
                                Detalhes
                              </Button>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="relatorios" className="mt-4">
                <div className="space-y-6 overflow-x-hidden">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="bg-black border border-zinc-800">
                      <CardContent className="p-6">
                        <Text className="text-white text-xl font-medium mb-4">Relatório de Usuários</Text>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Text className="text-white">Período</Text>
                            <Select>
                              <SelectTrigger className="text-white bg-transparent border border-white">
                                <SelectValue placeholder="Selecione o período" />
                              </SelectTrigger>
                              <SelectContent className="bg-zinc-800 border-zinc-700">
                                <SelectItem value="hoje">Hoje</SelectItem>
                                <SelectItem value="7d">Últimos 7 dias</SelectItem>
                                <SelectItem value="30d">Últimos 30 dias</SelectItem>
                                <SelectItem value="90d">Últimos 90 dias</SelectItem>
                                <SelectItem value="all">Todo o período</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Text className="text-white">Status do Usuário</Text>
                            <Select>
                              <SelectTrigger className="text-white bg-transparent border border-white">
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
                            <Text className="text-white">Formato</Text>
                            <Select defaultValue="csv">
                              <SelectTrigger className="text-white bg-transparent border border-white">
                                <SelectValue placeholder="Selecione o formato" />
                              </SelectTrigger>
                              <SelectContent className="bg-zinc-800 border-zinc-700">
                                <SelectItem value="csv">CSV</SelectItem>
                                <SelectItem value="excel">Excel</SelectItem>
                                <SelectItem value="pdf">PDF</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <Button className="w-full text-black bg-[#66e0cc] hover:bg-[#5bd7c0]">
                            <FileText className="mr-2 h-4 w-4" /> Exportar Usuários
                          </Button>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-black border border-zinc-800">
                      <CardContent className="p-6">
                        <Text className="text-white text-xl font-medium mb-4">Relatório de Saques</Text>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Text className="text-white">Período</Text>
                            <Select>
                              <SelectTrigger className="text-white bg-transparent border border-white">
                                <SelectValue placeholder="Selecione o período" />
                              </SelectTrigger>
                              <SelectContent className="bg-zinc-800 border-zinc-700">
                                <SelectItem value="hoje">Hoje</SelectItem>
                                <SelectItem value="7d">Últimos 7 dias</SelectItem>
                                <SelectItem value="30d">Últimos 30 dias</SelectItem>
                                <SelectItem value="90d">Últimos 90 dias</SelectItem>
                                <SelectItem value="all">Todo o período</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Text className="text-white">Status</Text>
                            <Select>
                              <SelectTrigger className="text-white bg-transparent border border-white">
                                <SelectValue placeholder="Selecione o status" />
                              </SelectTrigger>
                              <SelectContent className="bg-zinc-800 border-zinc-700">
                                <SelectItem value="all">Todos</SelectItem>
                                <SelectItem value="pending">Pendentes</SelectItem>
                                <SelectItem value="completed">Concluídos</SelectItem>
                                <SelectItem value="rejected">Rejeitados</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Text className="text-white">Formato</Text>
                            <Select defaultValue="csv">
                              <SelectTrigger className="text-white bg-transparent border border-white">
                                <SelectValue placeholder="Selecione o formato" />
                              </SelectTrigger>
                              <SelectContent className="bg-zinc-800 border-zinc-700">
                                <SelectItem value="csv">CSV</SelectItem>
                                <SelectItem value="excel">Excel</SelectItem>
                                <SelectItem value="pdf">PDF</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <Button className="w-full text-black bg-[#66e0cc] hover:bg-[#5bd7c0]">
                            <ArrowDownCircle className="mr-2 h-4 w-4" /> Exportar Saques
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="bg-black border border-zinc-800">
                      <CardContent className="p-6">
                        <Text className="text-white text-xl font-medium mb-4">Relatório de Depósitos</Text>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Text className="text-white">Período</Text>
                            <Select>
                              <SelectTrigger className="text-white bg-transparent border border-white">
                                <SelectValue placeholder="Selecione o período" />
                              </SelectTrigger>
                              <SelectContent className="bg-zinc-800 border-zinc-700">
                                <SelectItem value="hoje">Hoje</SelectItem>
                                <SelectItem value="7d">Últimos 7 dias</SelectItem>
                                <SelectItem value="30d">Últimos 30 dias</SelectItem>
                                <SelectItem value="90d">Últimos 90 dias</SelectItem>
                                <SelectItem value="all">Todo o período</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Text className="text-white">Método</Text>
                            <Select>
                              <SelectTrigger className="text-white bg-transparent border border-white">
                                <SelectValue placeholder="Selecione o método" />
                              </SelectTrigger>
                              <SelectContent className="bg-zinc-800 border-zinc-700">
                                <SelectItem value="all">Todos</SelectItem>
                                <SelectItem value="pix">PIX</SelectItem>
                                <SelectItem value="card">Cartão</SelectItem>
                                <SelectItem value="crypto">Criptomoeda</SelectItem>
                                <SelectItem value="bank">Transferência Bancária</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Text className="text-white">Formato</Text>
                            <Select defaultValue="csv">
                              <SelectTrigger className="text-white bg-transparent border border-white">
                                <SelectValue placeholder="Selecione o formato" />
                              </SelectTrigger>
                              <SelectContent className="bg-zinc-800 border-zinc-700">
                                <SelectItem value="csv">CSV</SelectItem>
                                <SelectItem value="excel">Excel</SelectItem>
                                <SelectItem value="pdf">PDF</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <Button className="w-full text-black bg-[#66e0cc] hover:bg-[#5bd7c0]">
                            <ArrowUpCircle className="mr-2 h-4 w-4" /> Exportar Depósitos
                          </Button>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-black border border-zinc-800">
                      <CardContent className="p-6">
                        <Text className="text-white text-xl font-medium mb-4">Relatório de Comissões</Text>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Text className="text-white">Período</Text>
                            <Select>
                              <SelectTrigger className="text-white bg-transparent border border-white">
                                <SelectValue placeholder="Selecione o período" />
                              </SelectTrigger>
                              <SelectContent className="bg-zinc-800 border-zinc-700">
                                <SelectItem value="hoje">Hoje</SelectItem>
                                <SelectItem value="7d">Últimos 7 dias</SelectItem>
                                <SelectItem value="30d">Últimos 30 dias</SelectItem>
                                <SelectItem value="90d">Últimos 90 dias</SelectItem>
                                <SelectItem value="all">Todo o período</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Text className="text-white">Tipo de Comissão</Text>
                            <Select>
                              <SelectTrigger className="text-white bg-transparent border border-white">
                                <SelectValue placeholder="Selecione o tipo" />
                              </SelectTrigger>
                              <SelectContent className="bg-zinc-800 border-zinc-700">
                                <SelectItem value="all">Todos</SelectItem>
                                <SelectItem value="referral">Indicação</SelectItem>
                                <SelectItem value="sponsor">Patrocínio</SelectItem>
                                <SelectItem value="bonus">Bônus</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Text className="text-white">Formato</Text>
                            <Select defaultValue="csv">
                              <SelectTrigger className="text-white bg-transparent border border-white">
                                <SelectValue placeholder="Selecione o formato" />
                              </SelectTrigger>
                              <SelectContent className="bg-zinc-800 border-zinc-700">
                                <SelectItem value="csv">CSV</SelectItem>
                                <SelectItem value="excel">Excel</SelectItem>
                                <SelectItem value="pdf">PDF</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <Button className="w-full text-black bg-[#66e0cc] hover:bg-[#5bd7c0]">
                            <DollarSign className="mr-2 h-4 w-4" /> Exportar Comissões
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <Card className="bg-black border border-zinc-800 mt-6">
                    <CardContent className="p-6">
                      <Text className="text-white text-xl font-medium mb-4">Relatório Personalizado</Text>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Text className="text-white">Tipo de Dados</Text>
                          <Select>
                            <SelectTrigger className="text-white bg-transparent border border-white">
                              <SelectValue placeholder="Selecione o tipo" />
                            </SelectTrigger>
                            <SelectContent className="bg-zinc-800 border-zinc-700">
                              <SelectItem value="users">Usuários</SelectItem>
                              <SelectItem value="withdrawals">Saques</SelectItem>
                              <SelectItem value="deposits">Depósitos</SelectItem>
                              <SelectItem value="transactions">Transações</SelectItem>
                              <SelectItem value="commissions">Comissões</SelectItem>
                              <SelectItem value="sponsors">Patrocínios</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Text className="text-white">Formato de Saída</Text>
                          <Select defaultValue="csv">
                            <SelectTrigger className="text-white bg-transparent border border-white">
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
                          <Text className="text-white">Data Inicial</Text>
                          <Input
                            type="date"
                            className="text-white bg-transparent border border-white placeholder-white"
                          />
                        </div>
                        <div className="space-y-2">
                          <Text className="text-white">Data Final</Text>
                          <Input
                            type="date"
                            className="text-white bg-transparent border border-white placeholder-white"
                          />
                        </div>
                      </div>

                      <div className="space-y-2 mt-4">
                        <Text className="text-white">Filtros Adicionais</Text>
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

                  <Card className="bg-black border border-zinc-800">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-center mb-4">
                        <Text className="text-white text-xl font-medium">Relatórios Recentes</Text>
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
                              <TableHead className="text-white">Formato</TableHead>
                              <TableHead className="text-white">Ações</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            <TableRow className="border-zinc-800">
                              <TableCell className="text-white">Usuários Ativos - Maio 2025</TableCell>
                              <TableCell className="text-white">Usuários</TableCell>
                              <TableCell className="text-white">15/05/2025</TableCell>
                              <TableCell className="text-white">CSV</TableCell>
                              <TableCell>
                                <Button variant="ghost" size="sm" className="h-8 px-2 text-white">
                                  <FileText className="h-4 w-4" />
                                </Button>
                              </TableCell>
                            </TableRow>
                            <TableRow className="border-zinc-800">
                              <TableCell className="text-white">Saques Pendentes - Maio 2025</TableCell>
                              <TableCell className="text-white">Saques</TableCell>
                              <TableCell className="text-white">14/05/2025</TableCell>
                              <TableCell className="text-white">Excel</TableCell>
                              <TableCell>
                                <Button variant="ghost" size="sm" className="h-8 px-2 text-white">
                                  <FileText className="h-4 w-4" />
                                </Button>
                              </TableCell>
                            </TableRow>
                            <TableRow className="border-zinc-800">
                              <TableCell className="text-white">Depósitos - Abril 2025</TableCell>
                              <TableCell className="text-white">Depósitos</TableCell>
                              <TableCell className="text-white">30/04/2025</TableCell>
                              <TableCell className="text-white">PDF</TableCell>
                              <TableCell>
                                <Button variant="ghost" size="sm" className="h-8 px-2 text-white">
                                  <FileText className="h-4 w-4" />
                                </Button>
                              </TableCell>
                            </TableRow>
                            <TableRow className="border-zinc-800">
                              <TableCell className="text-white">Comissões - Abril 2025</TableCell>
                              <TableCell className="text-white">Comissões</TableCell>
                              <TableCell className="text-white">28/04/2025</TableCell>
                              <TableCell className="text-white">CSV</TableCell>
                              <TableCell>
                                <Button variant="ghost" size="sm" className="h-8 px-2 text-white">
                                  <FileText className="h-4 w-4" />
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
