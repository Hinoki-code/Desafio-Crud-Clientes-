import { useState } from "react";
import { Cliente } from "../types";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, UserX } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface TabelaProps {
  clientes: Cliente[];
  onEditar: (cliente: Cliente) => void;
  onDeletar: (cliente: Cliente) => void;
}

export function TabelaClientes({ clientes, onEditar, onDeletar }: TabelaProps) {
  const [clienteParaDeletar, setClienteParaDeletar] = useState<Cliente | null>(null);

  const confirmarDelecao = () => {
    if (!clienteParaDeletar) return;
    onDeletar(clienteParaDeletar);
    setClienteParaDeletar(null);
  };

  return (
    <>
      <div className="w-full bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto overflow-y-auto max-h-150">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b border-gray-100 sticky top-0 z-10">
              <tr>
                <th scope="col" className="px-3 py-3 font-semibold">Nome</th>
                <th scope="col" className="px-3 py-3 font-semibold">E-mail</th>
                <th scope="col" className="px-3 py-3 font-semibold">Telefone</th>
                <th scope="col" className="px-3 py-3 font-semibold">Cidade</th>
                <th scope="col" className="px-3 py-3 font-semibold">Status</th>
                <th scope="col" className="px-3 py-3 font-semibold text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {clientes.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-3 py-12 text-center">
                    <UserX className="h-8 w-8 mx-auto text-gray-300 mb-2" />
                    <p className="font-medium text-gray-700">Nenhum cliente encontrado</p>
                    <p className="text-xs text-gray-500 mt-1">
                      Tente ajustar a busca ou o filtro por status.
                    </p>
                  </td>
                </tr>
              ) : (
                clientes.map((cliente) => (
                  <tr key={cliente.id} className="hover:bg-gray-50/80 transition-colors">
                    <td className="px-3 py-3 font-medium text-gray-900 truncate max-w-37.5">
                      {cliente.nomeCompleto}
                    </td>
                    <td className="px-3 py-3 text-gray-600 truncate max-w-37.5">
                      {cliente.email}
                    </td>
                    <td className="px-3 py-3 text-gray-600">{cliente.telefone}</td>
                    <td className="px-3 py-3 text-gray-600">{cliente.cidade}</td>
                    <td className="px-3 py-3">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${
                        cliente.status === "Ativo"
                          ? "bg-green-50 text-green-700 border-green-200"
                          : "bg-red-50 text-red-700 border-red-200"
                      }`}>
                        {cliente.status}
                      </span>
                    </td>
                    <td className="px-3 py-3 text-right space-x-1 whitespace-nowrap">
                      <Button
                        onClick={() => onEditar(cliente)}
                        variant="outline"
                        size="sm"
                        className="h-7 px-2 text-xs text-blue-600 border-blue-200 hover:bg-blue-50"
                      >
                        <Edit className="h-3 w-3 mr-1" /> Editar
                      </Button>
                      <Button
                        onClick={() => setClienteParaDeletar(cliente)}
                        variant="outline"
                        size="sm"
                        className="h-7 px-2 text-xs text-red-600 border-red-200 hover:bg-red-50"
                      >
                        <Trash2 className="h-3 w-3 mr-1" /> Deletar
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <AlertDialog
        open={!!clienteParaDeletar}
        onOpenChange={(aberto) => !aberto && setClienteParaDeletar(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
            <AlertDialogDescription>
              Essa ação não pode ser desfeita. Isso vai deletar permanentemente o cliente
              <strong className="text-gray-900"> {clienteParaDeletar?.nomeCompleto}</strong>.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setClienteParaDeletar(null)}>
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmarDelecao}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Sim, deletar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}