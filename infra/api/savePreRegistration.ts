import { request } from "./axios";

/**
 * Quando ocorre? Logo após o usuário tentar executar login e o sistema constatar ausência de dados de pré registro. Para que serve? Serve para o usuário cadadtrar dados de pré registro.
 * @summary Salvar pré registro
 */
export const savePreRegistration = (email: string, savePreRegistrationBody: string) => {
    return request<void | string>({ url: `/login/${email}/pre-registration`, method: 'POST', headers: { 'Content-Type': 'application/json' }, data: savePreRegistrationBody });
};
