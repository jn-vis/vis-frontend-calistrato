export interface Sortable {
    id: number;
    text: string;
    chosen: boolean;
    selected: boolean;
}



export type ViewVagasModel = {
    id: number,
    vaga: string,
    descricao: string,
    homeoffice: boolean,
    sortable: Sortable[],
    datelimite: string,
    obrigatorios: string[],
    desejaveis: string[],
    estado_id: any,
    deficiencia_id: any,
    pcd: boolean,
    pagamentopj: string,
    pagamentoclt: string,
    pagamentobtc: string,
    contato: string,
}

