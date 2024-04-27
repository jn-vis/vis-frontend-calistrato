import { AxiosResponse } from "axios";
import { request } from "./axios";

/**
 * Quando ocorre? Logo após o usuário se interessar em ter acesso a informações deste sistema que ele só pode ter se estiver devidamente identificado (logado) nele. Para que serve? Serve para verificar se o usuário existe no sistema, caso ele existir, verificar se há pendências cadastrais (senha, pré registro) para ele resolver e se não existir, fazê-lo preencher todos os dados que o sistema precisa.
 * @summary Verificação de existência deste usuário
 */
export const existsLoginToken = (email: string, signal?: AbortSignal): Promise<AxiosResponse<void>> => {
    return request<void>({ url: `/login/${email}/token`, method: 'HEAD', signal });
};
