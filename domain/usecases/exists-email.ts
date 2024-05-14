
export interface EmailExistsRepository {
    email: (params: EmailExistsRepository.Params) => Promise<EmailExistsRepository.Model>
}

export namespace EmailExistsRepository {
  export type Params = {
    email: string
    signal?: AbortSignal;
  }

  export type Model = any
}
