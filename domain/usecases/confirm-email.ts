
export interface ConfirmEmailRepository {
    confirmEmail: (params: ConfirmEmailRepository.Params) => Promise<ConfirmEmailRepository.Model>
}

export namespace ConfirmEmailRepository {
  export type Params = {
    email: string
    signal?: AbortSignal;
  }

  export type Model = any
}
