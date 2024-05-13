// import { AccountModel } from "../models";

export interface TokenLanguageParams {
    email: string;
    language: string;
    signal?: AbortSignal;
}

export interface TokenLanguageRepository {
    tokenLanguage(params: TokenLanguageParams): Promise<any>;
}
