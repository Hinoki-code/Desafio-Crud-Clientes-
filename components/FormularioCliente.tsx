import { useCallback, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Cliente } from "../types";

interface FormularioProps {
  clienteEmEdicao?: Cliente | null;
  clientes: Cliente[]; // <-- Nova prop recebida do page.tsx
  onSalvar: (dados: Omit<Cliente, "id">) => void;
  onCancelarEdicao: () => void;
}

export function FormularioCliente({ clienteEmEdicao, clientes, onSalvar, onCancelarEdicao }: FormularioProps) {
  const isEdicao = !!clienteEmEdicao;

  const [nome, setNome] = useState(clienteEmEdicao?.nomeCompleto ?? "");
  const [email, setEmail] = useState(clienteEmEdicao?.email ?? "");
  const [telefone, setTelefone] = useState(clienteEmEdicao?.telefone ?? "");
  const [cidade, setCidade] = useState(clienteEmEdicao?.cidade ?? "");
  const [status, setStatus] = useState<"Ativo" | "Inativo">(
    clienteEmEdicao?.status ?? "Ativo"
  );
  const [erros, setErros] = useState<{ [key: string]: string }>({});

  const limpar = useCallback(() => {
    setNome("");
    setEmail("");
    setTelefone("");
    setCidade("");
    setStatus("Ativo");
    setErros({});
  }, []);

  const limparErro = (campo: string) => {
    setErros((prev) => {
      if (!prev[campo]) return prev;
      const copia = { ...prev };
      delete copia[campo];
      return copia;
    });
  };

  const handleTelefoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let valor = e.target.value.replace(/\D/g, "").slice(0, 11);
    if (valor.length > 2) valor = `(${valor.slice(0, 2)}) ${valor.slice(2)}`;
    if (valor.length > 9) valor = `${valor.slice(0, 10)}-${valor.slice(10)}`;
    setTelefone(valor);
    limparErro("telefone");
  };

  const validar = () => {
    const novosErros: { [key: string]: string } = {};
    if (!nome.trim()) novosErros.nome = "O nome é obrigatório.";
    else if (/\d/.test(nome)) novosErros.nome = "O nome não pode conter números.";

    if (!email.trim()) {
      novosErros.email = "O e-mail é obrigatório.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      novosErros.email = "Digite um e-mail válido.";
    } else {
      // Lógica de e-mail duplicado
      const emailJaExiste = clientes.some(
        (c) => c.email.toLowerCase() === email.trim().toLowerCase() && c.id !== clienteEmEdicao?.id
      );
      if (emailJaExiste) {
        novosErros.email = "Este e-mail já está cadastrado.";
      }
    }

    if (!cidade.trim()) novosErros.cidade = "A cidade é obrigatória.";
    else if (/\d/.test(cidade)) novosErros.cidade = "A cidade não pode conter números.";

    const apenasNumeros = telefone.replace(/\D/g, "");
    if (!telefone.trim()) novosErros.telefone = "O telefone é obrigatório.";
    else if (apenasNumeros.length < 10) novosErros.telefone = "Telefone inválido. Digite DDD + número.";

    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  const handleSubmit = () => {
    if (!validar()) return;

    onSalvar({
      nomeCompleto: nome.trim(),
      email: email.trim().toLowerCase(), // Boa prática: salvar e-mails sempre em minúsculo
      telefone,
      cidade: cidade.trim(),
      status,
    });

    if (!isEdicao) limpar();
  };

  const handleCancelar = () => {
    if (isEdicao) {
      onCancelarEdicao();
    } else {
      limpar();
    }
  };

  return (
    <div className="w-full xl:w-[30%] bg-white p-5 rounded-xl shadow-sm border border-gray-100 h-fit">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">
        {isEdicao ? "Editar Cliente" : "Novo Cliente"}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="col-span-1 sm:col-span-2">
          <Label htmlFor="nome">Nome</Label>
          <Input
            id="nome"
            value={nome}
            onChange={(e) => { setNome(e.target.value); limparErro("nome"); }}
            placeholder="Nome completo"
            className={erros.nome ? "border-red-500" : ""}
          />
          {erros.nome && <span className="text-sm text-red-500 mt-1 block">{erros.nome}</span>}
        </div>

        <div className="col-span-1 sm:col-span-2">
          <Label htmlFor="email">E-mail</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => { setEmail(e.target.value); limparErro("email"); }}
            placeholder="email@exemplo.com"
            className={erros.email ? "border-red-500" : ""}
          />
          {erros.email && <span className="text-sm text-red-500 mt-1 block">{erros.email}</span>}
        </div>

        <div>
          <Label htmlFor="telefone">Telefone</Label>
          <Input
            id="telefone"
            value={telefone}
            onChange={handleTelefoneChange}
            placeholder="(00) 00000-0000"
            maxLength={15}
            className={erros.telefone ? "border-red-500" : ""}
          />
          {erros.telefone && <span className="text-sm text-red-500 mt-1 block">{erros.telefone}</span>}
        </div>

        <div>
          <Label htmlFor="cidade">Cidade</Label>
          <Input
            id="cidade"
            value={cidade}
            onChange={(e) => { setCidade(e.target.value); limparErro("cidade"); }}
            placeholder="Cidade"
            className={erros.cidade ? "border-red-500" : ""}
          />
          {erros.cidade && <span className="text-sm text-red-500 mt-1 block">{erros.cidade}</span>}
        </div>

        <div className="col-span-1 sm:col-span-2">
          <Label htmlFor="status">Status</Label>
          <select
            id="status"
            className="flex h-10 w-full rounded-md border border-gray-200 px-3 py-2 text-sm cursor-pointer"
            value={status}
            onChange={(e) => setStatus(e.target.value as "Ativo" | "Inativo")}
          >
            <option value="Ativo">Ativo</option>
            <option value="Inativo">Inativo</option>
          </select>
        </div>
      </div>

      <div className="flex gap-2 mt-6">
        <Button onClick={handleSubmit} className="flex-1 bg-blue-600 hover:bg-blue-700">
          {isEdicao ? "Salvar Alterações" : "Enviar"}
        </Button>

        {isEdicao ? (
          <Button onClick={handleCancelar} variant="destructive" className="flex-1">
            Cancelar
          </Button>
        ) : (
          <Button onClick={handleCancelar} variant="outline" className="flex-1">
            Limpar
          </Button>
        )}
      </div>
    </div>
  );
}