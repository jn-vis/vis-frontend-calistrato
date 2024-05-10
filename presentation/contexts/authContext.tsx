import React, { FormEvent, useCallback, useEffect, useMemo, useState } from 'react';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { IAuthContextData, IAuthProviderProps } from '../../infra/auth/interface';
import { EmailNaoConfirmadoError } from '@/components/shared/errors/email-nao-confirmado.error';
import { Either, left } from '@/core/either';
import { useRouter } from 'next/navigation';
import { createLoginToken} from '@/infra/api';
import { useUpdatePassword, useSavePreRegistration,useExecuteLogin, useExecuteLogout, useExistsLoginToken } from '@/infra/hooks';
import { UseFormSetError } from 'react-hook-form';

import { useCreateTokenLanguage } from '@/infra/hooks/useCreateTokenLanguage';
import { TFormData } from '@/domain/schemas/login-email';
import { HttpStatusCode } from '@/data/protocols/http';


const LOCAL_STORAGE_KEY_ACCESS_TOKEN = 'sessionToken';

interface SessionTokenResponse {
    sessionToken: string;
  }

type ModalType = 'login' | 'password' | 'register' | 'confirmLogin' | 'registration' | null;


export const AuthContext = React.createContext({} as IAuthContextData);
export const AuthProvider: React.FC<IAuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<string | null>(null);
    const [emailUsuario, setEmailUsuario] = useState<string>("");
    const [accessToken, setAccessToken] = useState<string | undefined>();
    const [modal, setModal] =useState<ModalType>(null);
    const openModal = (modalType: ModalType) => {
        setModal(modalType);
    };


    useEffect(() => {
        const accessToken = localStorage.getItem(LOCAL_STORAGE_KEY_ACCESS_TOKEN);
        const user = localStorage.getItem('user');

        setAccessToken(accessToken ?? undefined);

        if (user) {
            try {
                setUser(JSON.parse(user));
            } catch (error) {
                console.error('Error parsing user:', error);
            }
        }
    }, []);



    const { mutate: existsLoginToken } = useExistsLoginToken({
        mutation: {
            onSuccess: (response) => {
                setModal(response.status === HttpStatusCode.ok ? 'password' : null);
            },
            onError: (error, variables) => {
                const { setError } = variables;
                if (!axios.isAxiosError(error)) {
                    console.error('Erro desconhecido:', error);
                    setModal(null);
                    return;
                }

                const axiosError = error as AxiosError;
                const status = axiosError.response?.status;

                if (status === HttpStatusCode.notFound) {
                    setModal('confirmLogin');
                    return;
                }

                if (status === HttpStatusCode.created) {
                    setModal('registration');
                    return;
                }

                if (status === undefined) {
                    console.error('Erro na requisição com status desconhecido:', error);
                    setModal(null);
                    return;
                }

                const errorMessages: { [key: number]: string } = {
                    [HttpStatusCode.badRequest]: 'E-mail inválido',
                    [HttpStatusCode.unauthorized]: 'Senha bloqueada',
                    [HttpStatusCode.forbidden]: 'Token bloqueado',
                    [HttpStatusCode.conflict]: 'Usuário já logado no sistema',
                    [HttpStatusCode.accepted]: 'Senha ausente',
                    [HttpStatusCode.created]: 'Respostas ausentes'
                };

                const message = errorMessages[status];
                if (message && setError) {
                    setError('email', { type: 'manual', message });
                } else {
                    console.error('Erro na requisição:', error);
                    setModal(null);
                }
            },
        },
    });

const handleEmail = (email: string, setError: UseFormSetError<TFormData>) => {
    setEmailUsuario(email);

    existsLoginToken({
        email,
        setError: (field, error) => setError(field as "email" | "setError", error),
    });
};

const handleConfirmaEmail = async (email: string) => {
    try {
        const response: AxiosResponse<void> = await createLoginToken(email);

        response.status === 202 && setEmailUsuario(email);
        setModal(response.status === 202 ? 'registration' : null);

    } catch (error) {
        if (!axios.isAxiosError(error)) {
            console.error('Erro desconhecido:', error);
            setModal(null);
            return;
        }

        const axiosError = error as AxiosError;
        axiosError.response?.status === 409 && axiosError.response.data && typeof axiosError.response.data === 'object' && 'message' in axiosError.response.data
            ? left(new EmailNaoConfirmadoError(axiosError.response.data.message))
            : console.error('Erro na requisição:', error);
        setModal(null);
    }
};

const { mutate: tokenLanguage } = useCreateTokenLanguage({
    mutation: {
        onSuccess: (data) => {
            console.log('Dados recebidos:', data);
            setModal('register');
        },
        onError: (error) => {
            console.error('Erro ao buscar dados adicionais:', error);
            setModal(null);
        },
    },
});


const { mutate: savePreRegistration } = useSavePreRegistration({
    mutation: {
        onSuccess: (data) => {
            data?.status === 202
            ? tokenLanguage({ email: emailUsuario, language: 'portuguese' })
            : setModal(null);
        },
        onError: (error) => {
            console.error('Erro ao salvar pré-registro:', error);
            setModal(null);
            return left(new EmailNaoConfirmadoError(error));
        },
    },
});


const handleRegistration = async (channel: string, goal: string, ): Promise<void> => {
    const saveAnswers = JSON.stringify({ channel, goal });
    savePreRegistration({ email: emailUsuario, data: saveAnswers });
};

const { mutate: updatePassword} = useUpdatePassword<AxiosResponse<SessionTokenResponse, any>>({
    mutation: {
        onSuccess: (response) => {
            if (response.data && typeof response.data === 'object') {
                const { sessionToken } = response.data;
                if (sessionToken) {
                    localStorage.setItem(LOCAL_STORAGE_KEY_ACCESS_TOKEN, sessionToken);
                    localStorage.setItem('user', JSON.stringify(emailUsuario));
                    setAccessToken(sessionToken);
                    setUser(emailUsuario);
                    setModal(null);
                } else {
                    console.error('O token de acesso não foi retornado corretamente pela API.');
                }
            }
        },
        onError: (error) => {
            console.error('Erro na requisição de atualização de senha:', error);
            setModal(null);
        },
    },
});


const handleRegister = async (token: string, password: string, confirmPassword: string): Promise<void> => {
    const updatePasswordBody = JSON.stringify({ password, confirmPassword, token });
    const params = {
        wordsHash: token
    };
    updatePassword({ email: emailUsuario, data: updatePasswordBody, params });
};

const { mutate: executeLogin } = useExecuteLogin<AxiosResponse<SessionTokenResponse, any>>({
    mutation: {
        onSuccess: (response) => {
            if (typeof response.data === 'object' && response.data !== null) {
                const data = response.data as SessionTokenResponse;
                if ('sessionToken' in data) {
                    const token = data.sessionToken;
                    localStorage.setItem(LOCAL_STORAGE_KEY_ACCESS_TOKEN, token);
                    localStorage.setItem('user', JSON.stringify(emailUsuario));
                    setAccessToken(token);
                    setUser(emailUsuario);
                    setModal(null);
                } else {
                    console.error('O token de acesso não foi retornado corretamente pela API.');
                }
            }
        },
        onError: (error) => {
            console.error('Erro ao executar o login:', error);
            setModal(null);
        },
    },
});

const login = useCallback((password: string) => {
    const loginData = { password: password };
    executeLogin({ email: emailUsuario, data: JSON.stringify(loginData) });
}, [emailUsuario, executeLogin]);

   const router = useRouter();

const { mutate: executeLogout } = useExecuteLogout<AxiosResponse<void, any>>({
    mutation: {
        onSuccess: () => {
            localStorage.removeItem(LOCAL_STORAGE_KEY_ACCESS_TOKEN);
            localStorage.removeItem('user');
            setAccessToken(undefined);
            setUser(null);
            router.push('/');
        },
        onError: (error) => {
            console.error('Erro ao executar o logout:', error);
        },
    },
});

const logout = useCallback(async (email: string) => {
    executeLogout({ email });
}, [executeLogout]);


    function closeModal() {
        setModal(null);
    }

    const isAuthenticated = useMemo(() => !!accessToken, [accessToken]);

    const value = useMemo(() => ({
        user,
        emailUsuario,
        login,
        logout,
        isAuthenticated,
        openModal,
        closeModal,
        modal,
        setModal,
        handleEmail,
        handleConfirmaEmail,
        handleRegister,
        handleRegistration
    }), [user, isAuthenticated, modal]);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return React.useContext(AuthContext);
};
