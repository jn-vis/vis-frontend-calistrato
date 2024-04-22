import React, { FormEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { IAuthContextData, IAuthProviderProps } from './interface';
import { logoutEmail, postConfirmaEmail, postCredencias, postEmail, postPassword, postQuestions } from '@/services/login-service';
import { EmailNaoExisteError } from '@/components/shared/errors/email-nao-existe-error';
import { EmailNaoConfirmadoError } from '@/components/shared/errors/email-nao-confirmado.error';
import { Either, left } from '@/core/either';
import { useRouter } from 'next/navigation';
import { createLoginToken, existsLoginToken, updatePassword, useExecuteLogin, useExecuteLogout, useSavePreRegistration, useUpdatePassword } from '../query-login';
import axios, { AxiosError, AxiosResponse } from 'axios';

const LOCAL_STORAGE_KEY_ACCESS_TOKEN = 'sessionToken';

interface SessionTokenResponse {
    sessionToken: string;
  }


export const AuthContext = React.createContext({} as IAuthContextData);
export const AuthProvider: React.FC<IAuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<string | null>(null);
    const [emailUsuario, setEmailUsuario] = useState<string>("");
    const [accessToken, setAccessToken] = useState<string | undefined>();
    const [modal, setModal] =
        useState<'login' | 'password'  | 'register' | 'confirmLogin' | 'registration' | null>(null);


    const openModal = (modalType: 'login' | 'password'  | 'register' | 'confirmLogin' | 'registration' | null) => {
        setModal(modalType);
    };

    useEffect(() => {
        const accessToken = localStorage.getItem(LOCAL_STORAGE_KEY_ACCESS_TOKEN);
        const user = localStorage.getItem('user');

        if (accessToken) {
            try {
                setAccessToken(JSON.parse(accessToken));
            } catch (error) {
                console.error('Error parsing access token:', error);
            }
        } else {
            setAccessToken(undefined);
        }

        if (user) {
            try {
                setUser(JSON.parse(user));
            } catch (error) {
                console.error('Error parsing user:', error);
            }
        }
    }, []);


    const handleEmail = async (email: string) => {
    try {
        const response: AxiosResponse<void> = await existsLoginToken(email);

        if (response.status === 200) {
            setEmailUsuario(email);
            setModal('password');
        } else {
            setModal(null);
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError;
            if (axiosError.response?.status === 404) {
                setModal('confirmLogin');
            } else {
                console.error('Erro na requisição:', error);
                setModal(null);
            }
        } else {
            console.error('Erro desconhecido:', error);
            setModal(null);
        }
    }
};

const handleConfirmaEmail = async (email: string) => {
    try {
        const language = 'portuguese';
        const response: AxiosResponse<void> = await createLoginToken(email, language);

        if (response.status === 202) {
            setEmailUsuario(email);
            setModal('registration');

        } else {
            setModal(null);
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError;
            if (axiosError.response?.status === 409) {
                const data = axiosError.response.data;
                const message = typeof data === 'object' && data !== null && 'message' in data ? data.message : undefined;
                return left(new EmailNaoConfirmadoError(message));
            } else {
                console.error('Erro na requisição:', error);
                setModal(null);
            }
        } else {
            console.error('Erro desconhecido:', error);
            setModal(null);
        }
    }
};

const { mutate: savePreRegistration } = useSavePreRegistration({
    mutation: {
        onSuccess: (data) => {
            console.log('Response:', data.data);
            console.log('Response Status:', data?.status);
            if (data?.status === 202) {
                setModal('register');
            } else {
                setModal(null);
            }
        },
        onError: (error) => {
            setModal(null);
            return left(new EmailNaoConfirmadoError(error));
        },
    },
});

const handleRegistration = async (option1: any, option2: any): Promise<void> => {
    const saveAnswers = JSON.stringify({ option1, option2 });
    savePreRegistration({ email: emailUsuario, data: saveAnswers });
    console.log('Chamada de savePreRegistration realizada com sucesso');
};


const { mutate: updatePassword, isError, error } = useUpdatePassword<AxiosResponse<SessionTokenResponse, any>>({
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
            } else {
                console.error('A resposta da API não é um objeto válido.');
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
    console.log('Chamada de updatePassword realizada com sucesso');
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
            } else {
                console.error('A resposta da API não é um objeto válido.');
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
