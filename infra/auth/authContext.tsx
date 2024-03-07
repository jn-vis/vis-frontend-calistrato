import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { AuthService } from './authService';
import { IAuthContextData, IAuthProviderProps } from './interface';
import { callBacks } from './callbacks';

const LOCAL_STORAGE_KEY_ACCESS_TOKEN = 'sessionToken';

export const AuthContext = React.createContext({} as IAuthContextData);
export const AuthProvider: React.FC<IAuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<string | null>(null);
    // const [userMail, setUserMail] = useState<string | null>(null);
    const [accessToken, setAccessToken] = useState<string>();
    const [modal, setModal] =
        useState<'login' | 'confirmLogin' | 'register' | 'password' | 'registration' | null>(null);

    const openModal = (modalType) => {
        setModal(modalType);
    };

    useEffect(() => {
        const accessToken = localStorage.getItem(LOCAL_STORAGE_KEY_ACCESS_TOKEN);
        const user = localStorage.getItem('user'); // Recupere o e-mail do usuário do localStorage

        if (accessToken) {
            setAccessToken(JSON.parse(accessToken));
        } else {
            setAccessToken(undefined);
        }

        if (user) {
            setUser(user);
        }
    }, []);

    const handleLogin = async (email) => {
        const responseStatus = await AuthService.headEmail(email);
        const callback = (callBacks as { [key: number]: (setModal: any) => void })[responseStatus];
        if (callback) {
            callback(setModal);
        } else {
            setModal(null);
        }
        setUser(email)
        // setUserMail(email)
    };

    const handleConfirmLogin = async (email) => {
        try {
            const responseStatus = await AuthService.confirmEmail(email);
            const callback = (callBacks as { [key: number]: (setModal: any) => void })[responseStatus];
            if (callback) {
                callback(setModal);
            } else {
                setModal(null);
            }
        } catch (error) {
            console.error(`Ocorreu um erro ao confirmar o login: ${error}`);
        }
    };



    const handleRegister = async (email, token, password, confirmPassword) => {
        try {
            const responseStatus = await AuthService.authRegister(email, token, password, confirmPassword);
            const callback = (callBacks as { [key: number]: (setModal: any) => void })[responseStatus];
            if (callback) {
                callback(setModal);
            } else {
                setModal(null);
            }
        } catch (error) {
            console.error(`Ocorreu um erro ao registrar: ${error}`);
        }
    };


    const handleRegistration = async (email, option, option1) => {
        console.log('email aqui:', email)
        const responseStatus = await AuthService.registration(email, option, option1);
        const callback = (callBacks as { [key: number]: (setModal: any) => void })[responseStatus];
        if (callback) {
            callback(setModal);
        } else {
            setModal(null);
        }
    };

    const login = useCallback(async (email: any, password: string) => {
        console.log('login', email, password);
        const result = await AuthService.auth(email, password);
        if (result instanceof Error) {
            return result.message;
        } else {
            localStorage.setItem(LOCAL_STORAGE_KEY_ACCESS_TOKEN, JSON.stringify(result.sessionToken));
            setAccessToken(result.sessionToken);
            setModal(null);
            localStorage.setItem('user', email);
        }

        setUser(email);
    }, []);

    const logout = useCallback(async (email: string) => {
        await AuthService.logout(email);
        localStorage.removeItem(LOCAL_STORAGE_KEY_ACCESS_TOKEN);
        setAccessToken(undefined);
        setUser(null);
    }, []);


    function closeModal() {
        setModal(null);
    }

    const isAuthenticated = useMemo(() => !!accessToken, [accessToken]);

    return (
        <AuthContext.Provider
            value={{
                user,
                // userMail,
                login,
                logout,
                isAuthenticated,
                openModal,
                closeModal,
                modal,
                setModal,
                handleLogin,
                handleConfirmLogin,
                handleRegister,
                handleRegistration
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return React.useContext(AuthContext);
};
