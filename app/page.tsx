"use client";

import { useState } from "react";
import { Users } from "lucide-react";
import { Cliente } from "../types";
import { FormularioCliente } from "@/components/FormularioCliente";
import { TabelaClientes } from "@/components/TabelaClientes";
import { BarraPesquisa } from "@/components/BarraPesquisa";
import { FiltroStatus } from "@/components/FiltroStatus";

const clientesIniciais: Cliente[] = [
  
  {
    id: crypto.randomUUID(),
    nomeCompleto: "Ana Carolina Souza",
    email: "ana.souza@email.com",
    telefone: "(21) 99812-4477",
    cidade: "Rio de Janeiro",
    status: "Ativo",
  },
  {
    id: crypto.randomUUID(),
    nomeCompleto: "Bruno Tavares Lima",
    email: "bruno.tavares@email.com",
    telefone: "(21) 98745-3321",
    cidade: "Rio de Janeiro",
    status: "Ativo",
  },
  {
    id: crypto.randomUUID(),
    nomeCompleto: "Camila Ferreira Nunes",
    email: "camila.nunes@email.com",
    telefone: "(21) 99654-1188",
    cidade: "Rio de Janeiro",
    status: "Inativo",
  },
  {
    id: crypto.randomUUID(),
    nomeCompleto: "Diego Ramos Barros",
    email: "diego.barros@email.com",
    telefone: "(21) 97533-9022",
    cidade: "Rio de Janeiro",
    status: "Ativo",
  },


  {
    id: crypto.randomUUID(),
    nomeCompleto: "Eduarda Martins Pires",
    email: "eduarda.pires@email.com",
    telefone: "(11) 98877-6543",
    cidade: "São Paulo",
    status: "Ativo",
  },
  {
    id: crypto.randomUUID(),
    nomeCompleto: "Felipe Andrade Costa",
    email: "felipe.costa@email.com",
    telefone: "(11) 97654-2210",
    cidade: "São Paulo",
    status: "Inativo",
  },
  {
    id: crypto.randomUUID(),
    nomeCompleto: "Gabriela Rocha Almeida",
    email: "gabriela.almeida@email.com",
    telefone: "(11) 99122-3388",
    cidade: "São Paulo",
    status: "Ativo",
  },

 
  {
    id: crypto.randomUUID(),
    nomeCompleto: "Henrique Oliveira Dias",
    email: "henrique.dias@email.com",
    telefone: "(31) 98456-7712",
    cidade: "Belo Horizonte",
    status: "Ativo",
  },
  {
    id: crypto.randomUUID(),
    nomeCompleto: "Isabela Carvalho Freitas",
    email: "isabela.freitas@email.com",
    telefone: "(31) 99344-5501",
    cidade: "Belo Horizonte",
    status: "Inativo",
  },


  {
    id: crypto.randomUUID(),
    nomeCompleto: "João Pedro Mendes",
    email: "joao.mendes@email.com",
    telefone: "(41) 98765-4321",
    cidade: "Curitiba",
    status: "Ativo",
  },
  {
    id: crypto.randomUUID(),
    nomeCompleto: "Karina Lopes Ribeiro",
    email: "karina.ribeiro@email.com",
    telefone: "(41) 99521-8890",
    cidade: "Curitiba",
    status: "Ativo",
  },

  {
    id: crypto.randomUUID(),
    nomeCompleto: "Lucas Fernandes Gomes",
    email: "lucas.gomes@email.com",
    telefone: "(51) 98123-7744",
    cidade: "Porto Alegre",
    status: "Inativo",
  },
  {
    id: crypto.randomUUID(),
    nomeCompleto: "Mariana Teixeira Rocha",
    email: "mariana.rocha@email.com",
    telefone: "(51) 99677-2135",
    cidade: "Porto Alegre",
    status: "Ativo",
  },

  {
    id: crypto.randomUUID(),
    nomeCompleto: "Natália Barbosa Correia",
    email: "natalia.correia@email.com",
    telefone: "(71) 98890-5522",
    cidade: "Salvador",
    status: "Ativo",
  },

  {
    id: crypto.randomUUID(),
    nomeCompleto: "Otávio Henrique Silva",
    email: "otavio.silva@email.com",
    telefone: "(81) 97445-6610",
    cidade: "Recife",
    status: "Inativo",
  },
];

export default function Home() {
  const [clientes, setClientes] = useState<Cliente[]>(clientesIniciais);
  const [clienteEmEdicao, setClienteEmEdicao] = useState<Cliente | null>(null);
  const [termoBusca, setTermoBusca] = useState("");
  const [filtroStatus, setFiltroStatus] = useState<'Todos' | 'Ativo' | 'Inativo'>('Todos');

  const handleSalvar = (dados: Omit<Cliente, "id">) => {
    if (clienteEmEdicao) {
      setClientes((prev) =>
        prev.map((c) =>
          c.id === clienteEmEdicao.id ? { ...c, ...dados } : c
        )
      );
      setClienteEmEdicao(null);
    } else {
      setClientes((prev) => [...prev, { id: crypto.randomUUID(), ...dados }]);
    }
  };

  const handleEditar = (cliente: Cliente) => setClienteEmEdicao(cliente);
  const handleCancelarEdicao = () => setClienteEmEdicao(null);

  const handleDeletar = (cliente: Cliente) => {
    setClientes((prev) => prev.filter((c) => c.id !== cliente.id));
    if (clienteEmEdicao?.id === cliente.id) setClienteEmEdicao(null);
  };

  const clientesFiltrados = clientes.filter((cliente) => {
    const busca = termoBusca.toLowerCase().trim();

    const correspondeABusca =
      cliente.nomeCompleto.toLowerCase().includes(busca) ||
      cliente.email.toLowerCase().includes(busca) ||
      cliente.cidade.toLowerCase().includes(busca);

    const correspondeAoStatus =
      filtroStatus === "Todos" || cliente.status === filtroStatus;

    return correspondeABusca && correspondeAoStatus;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center">
              <Users className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-base font-bold text-gray-900">Gestão de Clientes</h1>
              <p className="text-xs text-gray-500">Painel administrativo</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6">
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Lista de Clientes</h2>
          <p className="text-sm text-gray-500 mt-0.5">
            {clientesFiltrados.length} de {clientes.length} cliente{clientes.length !== 1 ? "s" : ""}
          </p>
        </div>

        <div className="flex flex-col xl:flex-row gap-6">
          <FormularioCliente
            key={clienteEmEdicao?.id ?? "novo"}
            clienteEmEdicao={clienteEmEdicao}
            clientes={clientes} 
            onSalvar={handleSalvar}
            onCancelarEdicao={handleCancelarEdicao}
          />

          <div className="w-full xl:w-[70%] flex flex-col gap-6">
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col sm:flex-row gap-3 items-center justify-between">
              <BarraPesquisa
                termoBusca={termoBusca}
                setTermoBusca={setTermoBusca}
              />
              <FiltroStatus
                filtroStatus={filtroStatus}
                setFiltroStatus={setFiltroStatus}
              />
            </div>

            <TabelaClientes
              clientes={clientesFiltrados}
              onEditar={handleEditar}
              onDeletar={handleDeletar}
            />
          </div>
        </div>
      </main>
    </div>
  );
}