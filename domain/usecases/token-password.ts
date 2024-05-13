import { AccountModel } from "../models/account-model"

export type TokenPasswordParams = {
    email: string
    token: string
    password: string
    confirmPassword: string
}


export interface TokenPasswordRepository {
    tokenPassword(params: TokenPasswordParams): Promise<AccountModel>
}

