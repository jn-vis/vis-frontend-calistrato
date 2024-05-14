export interface PreRegistrationRepository {
    registration: (params: PreRegistrationRepository.Params) => Promise<PreRegistrationRepository.Model>
}

export namespace PreRegistrationRepository {
  export type Params = {
    email: string
    goal: string
    channel: string
  }

  export type Model = any
}
