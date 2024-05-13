import { AccountModel } from "../models";

export interface AuthParams {
    email: string;
    password: string;
    signal?: AbortSignal;

}

export interface AuthRepository {
    login(params: AuthParams): Promise<AccountModel>
}
