import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { IAuthContextData, IAuthProviderProps } from './interface';
import { logoutEmail, postConfirmaEmail, postCredencias, postEmail, postPassword, postQuestions } from '@/services/login-service';
import { EmailNaoExisteError } from '@/components/shared/errors/email-nao-existe-error';
import { EmailNaoConfirmadoError } from '@/components/shared/errors/email-nao-confirmado.error';
import { left } from '@/core/either';
import { useRouter } from 'next/navigation';

const LOCAL_STORAGE_KEY_ACCESS_TOKEN = 'sessionToken';

export const AuthContext = React.createContext({} as IAuthContextData);
export const AuthProvider: React.FC<IAuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<string | null>(null);
    const [emailUsuario, setEmailUsuario] = useState(null);
    const [accessToken, setAccessToken] = useState<string | undefined>();
    const [modal, setModal] =
        useState<'login' | 'password'  | 'register' | 'confirmLogin' | 'registration' | null>(null);


    const openModal = (modalType) => {
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
        const result = await postEmail(email);

        if (result.isLeft()) {
            const error = result.value as EmailNaoExisteError;
            if (error.statusCode === 404) {
                setModal('confirmLogin');
            } else {
                setModal(null);
            }
        } else {
            const response = result.value;
            if (response.status === 200) {
                setEmailUsuario(email);
                setModal('password');
            }
        }
    };

    const handleConfirmaEmail = async (email: string) => {
        const result = await postConfirmaEmail(email);

        if (result.isLeft()) {
            const error = result.value as EmailNaoConfirmadoError;
            if (error.statusCode === 409) {
                return left(new EmailNaoConfirmadoError(error.message));
            } else {
                setModal(null);
            }
        } else {
            const response = result.value;
            if (response.status === 200) {
                setEmailUsuario(email);
                setModal('register');
            }
        }
    };

    const handleRegister = async (token:string, password:string, confirmPassword:string)  => {

        const result = await postCredencias(emailUsuario, token, password, confirmPassword);

        if (result.isLeft()) {
            const error = result.value as EmailNaoConfirmadoError;
            if (error.statusCode === 409) {
                return left(new EmailNaoConfirmadoError(error.message));
            } else {
                setModal(null);
            }
        } else {
            const response = result.value;
            if (response.status === 200) {
                setModal('registration');
            }
        }
    };

    const handleRegistration = async (option: any, option1: any)  => {
        const result = await postQuestions(emailUsuario, option, option1);

        if (result.isLeft()) {
            const error = result.value as EmailNaoConfirmadoError;
            if (error.statusCode === 409) {
                return left(new EmailNaoConfirmadoError(error.message));
            } else {
                setModal(null);
            }
        } else {
            const response = result.value;
            if (response.status === 201) {

                localStorage.setItem(LOCAL_STORAGE_KEY_ACCESS_TOKEN, JSON.stringify(response.data.accessToken));
                if(!emailUsuario) {
                    return left(new EmailNaoConfirmadoError('Email não informado'));
                }
                localStorage.setItem('user', JSON.stringify(emailUsuario));

                setAccessToken(response.data.accessToken);
                setUser(emailUsuario);

                setModal(null);
                return result;
            }
        }
    };

    const login = useCallback(async (password: string) => {
        const result = await postPassword(emailUsuario, password);

        if (result.isLeft()) {
            const error = result.value as EmailNaoConfirmadoError;
            if (error.statusCode === 409) {
                return left(new EmailNaoConfirmadoError(error.message));
            } else {
                setModal(null);
            }
        } else {
            const response = result.value;
            if (response.status === 200) {

                localStorage.setItem(LOCAL_STORAGE_KEY_ACCESS_TOKEN, JSON.stringify(response.data.accessToken));
                if(!emailUsuario) {
                    return left(new EmailNaoConfirmadoError('Email não informado'));
                }
                localStorage.setItem('user', emailUsuario);
                setAccessToken(response.data.accessToken);
                setUser(emailUsuario);

                setModal(null);
                return result;
            }
        }
    }, [emailUsuario]);

    const router = useRouter();

    const logout = useCallback(async (email: string) => {
        const result = await logoutEmail(email);
        if (result.isRight()) {
            const response = result.value;
            if (response.status === 200) {
                localStorage.removeItem(LOCAL_STORAGE_KEY_ACCESS_TOKEN);
                localStorage.removeItem('user');
                setAccessToken(undefined);
                setUser(null);
                router.push('/')
            }
        } else {
            console.log('não foi removido')
        }
    }, []);



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
