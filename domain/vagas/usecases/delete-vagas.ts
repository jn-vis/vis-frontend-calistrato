export interface DeleteVagas {
    deleteVaga: (params: DeleteVagas.Params) => Promise<DeleteVagas.Model>
}

export namespace DeleteVagas {
  export type Params = {
    id: number | null
  }

  export type Model = any
}
