
import { AxiosResponse } from "axios";
import { request } from "./axios";

/**
 * Quando ocorre? Logo após ser constatado que é primeiro acesso deste usuário e ele confirmar o e-mail. Para que serve? Serve para o usuário requisitar envio de token para o seu e-mail e ele poder usar esse token para cadastrar senha.  (nas próximas requisições) que o requisitante (frontend), merece ter leitura ou escrita de certos recursos deste bando de dados. Passo anterior: 'Verificação de e-mail'.
 * @summary Criar token para gerenciamento de senha
 */
export const createTokenLanguage = (email: string, language: string, signal?: AbortSignal): Promise<AxiosResponse<void>> => {
    return request<void>({ url: `/login/${email}/token/language/${language}`, method: 'POST', signal });
};
