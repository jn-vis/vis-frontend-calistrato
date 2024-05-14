import { AccountModel } from "../models";

export interface Authentication {
    login: (params: Authentication.Params) => Promise<Authentication.Model>
}

export namespace Authentication {
  export type Params = {
    email: string
    password: string
    signal?: AbortSignal;
  }

  export type Model = any
}
