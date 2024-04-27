import { ExecuteLoginParams } from "../types/executeLogin.types";
import { request } from "./axios";

/**
 * Quando ocorre? Logo após o usuário digitar sua senha. Para que serve? Serve para o usuário executar login no sistema, gerando um token que será a prova  (nas próximas requisições) que o requisitante (frontend), merece ter leitura ou escrita de certos recursos deste bando de dados. O parametro words hash é informado pelo front end (ou nao) por query parameter, se acaso ele for informado e estiver igual ao que o back end tem, o wordsHash não será devolvido na response desse método. Caso este parâmetro não for informado, ou se não for o mesmo que está no back end, então a lista do wordsHash é retornada juntamente com o novo wordsHash e o front deverá salvar no application storage (memória de longa duração do navegador)<br/><br/>Passo anterior: 'Verificação de e-mail'
 * @summary Executar Login
 */
export const executeLogin = (email: string, executeLoginBody: string, params?: ExecuteLoginParams) => {
    return request<string>({ url: `/login/${email}`, method: 'POST', headers: { 'Content-Type': 'application/json' }, data: executeLoginBody, params });
};
