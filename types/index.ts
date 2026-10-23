export type ClienteStatus = "Ativo"|"Inativo";

export interface Cliente {

    id:string;
    nomeCompleto:string;
    email:string;
    cidade:string;
    telefone:string;
    status: ClienteStatus;
    

}
