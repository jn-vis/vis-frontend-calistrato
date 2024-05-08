export type Sortable = {
    id: number;
    text: string;
    chosen: boolean;
    selected: boolean;
};

export interface RowData {
    id: number;
    vaga: string;
    descricao: string;
    datelimite: string;
    sortable: Sortable[];
    obrigatorios: string[];
    desejaveis: string[];
    contato: string;
    homeoffice: boolean;
    pcd: boolean;
    pagamentopj: string;
    pagamentoclt: string;
    pagamentobtc: string;
    estado: null;
}
