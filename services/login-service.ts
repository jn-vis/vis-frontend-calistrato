import { EmailNaoConfirmadoError } from '@/components/shared/errors/email-nao-confirmado.error';
import { EmailNaoExisteError } from '@/components/shared/errors/email-nao-existe-error';
import { Either, left, right } from '@/core/either';
import axios from 'axios';

export const postEmail = async (email: string): Promise<Either<Error, any>> => {
    try {
        const response = await axios.post(`http://localhost:3333/login/${email}/token`, { email });
        return right(response);
    } catch (error) {
        return left(new EmailNaoExisteError(error));
    }
};

export const postPassword = async (emailUsuario: string | null, password: string): Promise<Either<Error, any>> => {
    try {
        const response = await axios.post(`http://localhost:3333/login/${emailUsuario}`, { password });

        return right(response);
    } catch (error) {
        return left(new EmailNaoExisteError(error));
    }
};

const languagePort = 'portuguese'
export const postConfirmaEmail = async (email: string | null): Promise<Either<Error, any>> => {
    try {
        const response = await axios.post(`http://localhost:3333/login/${email}/token/language/${languagePort}`, { email });
        return right(response);
    } catch (error) {
        return left(new EmailNaoConfirmadoError(error));
    }
};

export const postCredencias = async (emailUsuario:string | null, password: string, confirmPassword: string, token: string): Promise<Either<Error, any>> => {
    try {
        const response = await axios.post(`http://localhost:3333/register/${emailUsuario}/password`, {
            token: token,
            password: password,
            confirmPassword: confirmPassword,
        });
        return right(response);
    } catch (error) {
        return left(new EmailNaoConfirmadoError(error));
    }
};

export const postQuestions = async (emailUsuario:string | null, option:any, option1:any): Promise<Either<Error, any>> => {
    try {
        const response = await axios.post(`http://localhost:3333/login/${emailUsuario}/pre-registration`, {
            option: option,
            option1: option1,
        });
        return right(response);
    } catch (error) {
        return left(new EmailNaoConfirmadoError(error));
    }
};

export const logoutEmail= async (email: string): Promise<Either<Error, any>> => {
    try {
        const response = await axios.get(`http://localhost:3333/logout/${email}`);
        return right(response);
    } catch (error) {
        return left(new EmailNaoExisteError(error));
    }
};
