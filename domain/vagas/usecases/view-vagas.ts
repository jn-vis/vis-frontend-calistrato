import { ViewVagasModel } from "@/domain/models/view-vagas-model"

export interface ViewVagas {
    findAll: () => Promise<ViewVagas.Model[]>
}

export namespace ViewVagas {
  export type Params = {
    id: number,
    vaga: string,
    descricao: string,
    homeoffice: boolean,
    sortable: any[],
    datelimite: string,
    obrigatorios: any[],
    desejaveis: any[],
    estado_id: any,
    deficiencia_id: any,
    pcd: boolean,
    pagamentopj: string,
    pagamentoclt: string,
    pagamentobtc: string,
    contato: string,
  }

  export type Model = ViewVagasModel
}
