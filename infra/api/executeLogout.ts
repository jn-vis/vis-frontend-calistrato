import { request } from "./axios";

/**
 * Quando ocorre? Quando por qualquer razão, o usuário quis não mais ter acesso a informações onde ele precisava estar devidamente identificado (logado) neste sistema. Para que serve? Serve para o usuário previamente se desassociar das próximas ações que serão feitas por este front end.
 * @summary Executar logout no sistema
 */
export const executeLogout = (email: string) => {
    return request<void>({ url: `/login/${email}`, method: 'DELETE' });
};
