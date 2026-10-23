import { Filter, ChevronDown } from "lucide-react";

interface FiltroStatusProps {
  filtroStatus: 'Todos' | 'Ativo' | 'Inativo';
  setFiltroStatus: (status: 'Todos' | 'Ativo' | 'Inativo') => void;
}

export function FiltroStatus({ filtroStatus, setFiltroStatus }: FiltroStatusProps) {
  return (
    <div className="relative w-full sm:w-46 flex items-center">
      <Filter className="absolute left-3 h-4 w-4 text-gray-500 z-10 pointer-events-none" />
      <select
        value={filtroStatus}
        onChange={(e) => setFiltroStatus(e.target.value as 'Todos' | 'Ativo' | 'Inativo')}
        aria-label="Filtrar por status"
        className="h-10 w-full rounded-md border border-gray-200 bg-white pl-10 pr-9 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 appearance-none cursor-pointer"
      >
        <option value="Todos">Todos os Status</option>
        <option value="Ativo">Somente Ativos</option>
        <option value="Inativo">Somente Inativos</option>
      </select>
      <ChevronDown className="absolute right-3 h-4 w-4 text-gray-500 pointer-events-none" />
    </div>
  );
}