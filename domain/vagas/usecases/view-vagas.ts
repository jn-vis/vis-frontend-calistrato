import { Estados, Sortable, ViewVagasModel } from "@/domain/models/view-vagas-model"


export interface ViewVagas {
    findAll: () => Promise<ViewVagas.Model[]>
}

export namespace ViewVagas {
  export type Params = {
    id: string,
    vaga: string,
    descricao: string,
    remoto: boolean,
    presencial: boolean,
    hibrido: boolean,
    pj: boolean,
    clt: boolean,
    btc: boolean,
    sortable: Sortable[],
    datelimite: string,
    obrigatorios: string[],
    desejaveis: string[],
    estados: Estados[],
    pcd: boolean,
    pagamentopj: string,
    pagamentoclt: string,
    pagamentobtc: string
  }

  export type Model = ViewVagasModel
}
