export const registrarAcaoAdmin = ({ acao, usuarioAfetado }: { acao: string; usuarioAfetado?: string }) => {
  // Verificar se estamos no ambiente do navegador
  if (typeof window === "undefined") return

  const admin = JSON.parse(localStorage.getItem("adminLogado") || "{}")

  if (!admin?.email) return

  const log = {
    nome: admin.nome,
    email: admin.email,
    telefone: admin.telefone,
    acao: acao, // Ex: "Aprovou saque de $500"
    usuarioAfetado: usuarioAfetado || "—",
    horario: new Date().toLocaleString("pt-BR"),
  }

  const logsExistentes = JSON.parse(localStorage.getItem("logsAdmin") || "[]")
  logsExistentes.unshift(log)
  localStorage.setItem("logsAdmin", JSON.stringify(logsExistentes))
}

export const obterLogsAdmin = () => {
  // Verificar se estamos no ambiente do navegador
  if (typeof window === "undefined") return []

  return JSON.parse(localStorage.getItem("logsAdmin") || "[]")
}

export const limparLogsAdmin = () => {
  // Verificar se estamos no ambiente do navegador
  if (typeof window === "undefined") return

  localStorage.setItem("logsAdmin", JSON.stringify([]))
}

export const obterAdminLogado = () => {
  // Verificar se estamos no ambiente do navegador
  if (typeof window === "undefined") return null

  return JSON.parse(localStorage.getItem("adminLogado") || "null")
}

export const simularLoginAdmin = (admin: { nome: string; email: string; telefone: string }) => {
  // Verificar se estamos no ambiente do navegador
  if (typeof window === "undefined") return

  localStorage.setItem("adminLogado", JSON.stringify(admin))

  // Registrar a ação de login
  registrarAcaoAdmin({
    acao: "Realizou login no sistema",
    usuarioAfetado: undefined,
  })
}

export const simularLogoutAdmin = () => {
  // Verificar se estamos no ambiente do navegador
  if (typeof window === "undefined") return

  const admin = obterAdminLogado()

  if (admin) {
    // Registrar a ação de logout
    registrarAcaoAdmin({
      acao: "Realizou logout do sistema",
      usuarioAfetado: undefined,
    })
  }

  localStorage.removeItem("adminLogado")
}
