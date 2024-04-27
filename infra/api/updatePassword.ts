import { UpdatePasswordParams } from "../types/updatePassword.types";
import { request } from "./axios";

/**
 * Quando ocorre? Logo após o sistema constatar que o usuário está com senha bloqueada ou faltando, login já em uso ou se o usuário quer alterar senha. Para que serve? Serve para o usuário cadastrar senha de acesso no sistema. O parametro words hash é informado pelo front end (ou nao) por query parameter, se acaso ele for informado e estiver igual ao que o back end tem, o wordsHash não será devolvido na response desse método. Caso este parâmetro não for informado, ou se não for o mesmo que está no back end, então a lista do wordsHash é retornada juntamente com o novo wordsHash e o front deverá salvar no application storage (memória de longa duração do navegador)
 * @summary Salvamento de senha
 */
export const updatePassword = (email: string, updatePasswordBody: string, params?: UpdatePasswordParams) => {
    return request<string>({ url: `/login/${email}/password`, method: 'POST', headers: { 'Content-Type': 'application/json' }, data: updatePasswordBody, params });
};
