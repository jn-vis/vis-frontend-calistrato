import { Estados, ViewVagasModel } from "@/domain/models/view-vagas-model"


export interface AddCandidato {
  add: (params: AddCandidato.Params) => Promise<AddCandidato.Model>
}

export namespace AddCandidato {
  export type Params = {
    sobremim: string,
    remoto: boolean,
    presencial: boolean,
    hibrido: boolean,
    pj: boolean,
    clt: boolean,
    btc: boolean,
    estados: Estados[],
    pcd: boolean,
    pagamentopj: string,
    pagamentoclt: string,
    pagamentobtc: string
  }

  export type Model = ViewVagasModel
}
