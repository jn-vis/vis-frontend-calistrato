import React, { FormEvent, useCallback, useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { IAuthContextData, IAuthProviderProps, ModalType } from '../../infra/auth/interface';
import { useRouter } from 'next/navigation';
import { HttpStatusCode } from '@/data/protocols/http';
import { AxiosHttpClient } from '@/infra/http/axios-http-client/axios-http-client';
import { RemoteEmailExists } from '@/data/authentication/remote-email-exists';
import { EmailService } from '@/domain/service/email-service';
import { RemoteConfirmEmail } from '@/data/authentication/remote-confirm-email';
import { ConfirmEmailService } from '@/domain/service/confirmar-email-service';
import { RemoteTokenLanguage } from '@/data/authentication/remote-token-language';
import { TokenLanguageService } from '@/domain/service/token-language-service';
import { RemotePreRegistration } from '@/data/authentication/remote-pre-registration';
import { RemoteTokenPassword } from '@/data/authentication/remote-token-password';
import { TokenPasswordService } from '@/domain/service/token-password';
import { RemoteLogout } from '@/data/authentication/remote-logout';
import { LogoutService } from '@/domain/service/logout-service';
import { RemoteAuthentication} from '@/data/authentication/remote-authentication';
import { AuthService } from '@/domain/service/auth-service';


const LOCAL_STORAGE_KEY_ACCESS_TOKEN = 'sessionToken';



// Criação do cliente HTTP e do repositório
const httpClient = new AxiosHttpClient();
const emailExistsRepository = new RemoteEmailExists('http://localhost:8080', httpClient);
const confirmEmailRepository = new RemoteConfirmEmail('http://localhost:8080', httpClient);
const tokenServiceRepository = new RemoteTokenLanguage('http://localhost:8080', httpClient);
const preRegistrationRepository = new RemotePreRegistration('http://localhost:8080', httpClient);
const tokenPasswordRepository = new RemoteTokenPassword('http://localhost:8080', httpClient);
const logoutRepository = new RemoteLogout('http://localhost:8080', httpClient);
const authRepository = new RemoteAuthentication('http://localhost:8080', httpClient);


// Instância do serviço
const emailService = new EmailService(emailExistsRepository);
const confirmService = new ConfirmEmailService(confirmEmailRepository);
const tokenservice = new TokenLanguageService(tokenServiceRepository);
const tokenPasswordService = new TokenPasswordService(tokenPasswordRepository);
const logoutService = new LogoutService(logoutRepository)
const authService = new AuthService(authRepository);



export const AuthContext = React.createContext({} as IAuthContextData);
export const AuthProvider: React.FC<IAuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<string | null>(null);
    const [emailUsuario, setEmailUsuario] = useState<string>("");
    const [accessToken, setAccessToken] = useState<string | undefined>();
    const [modal, setModal] =useState<ModalType>(null);
    const openModal = (modalType: ModalType) => {
        setModal(modalType);
    };

    const router = useRouter();


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

    const handleEmailSubmission = async (email: string) => {
        try {
            const result = await emailService.verifyEmail(email);

            if (result && result.status) {
                switch (result.status) {
                    case HttpStatusCode.ok:
                        setModal('password');
                        setEmailUsuario(email);
                        break;
                    case HttpStatusCode.created:
                        setModal('registration');
                        break;
                    case HttpStatusCode.accepted:
                        setModal('register');
                        break;
                    default:
                        setModal(null);
                }
            } else {
                setModal(null);
            }
        } catch (error) {
            console.error('Failed to verify email:', error);
            if (axios.isAxiosError(error) && error.response && error.response.status === HttpStatusCode.notFound) {
                setModal('confirmLogin');
            } else {
                setModal(null);
            }
        }
    };


    const handleConfirmEmailSubmission = async (email: string) => {
        try {
            const result = await confirmService.verifyConfirmEmail(email);
            if (result && result.status === HttpStatusCode.accepted) {
                setModal('registration');
                setEmailUsuario(email);
            } else {
                setModal(null);
            }
        } catch (error) {
            console.error('Failed to verify email:', error);
            setModal(null);
        }
    };

    const handleTokenLanguageSubmission = async (email: string, language: string) => {
        try {
            const result = await tokenservice.token(email, language);

            if (result && result.status === HttpStatusCode.ok) {
                setModal('register');
            } else {
                setModal(null);
            }
        } catch (error) {
            console.error('Failed to verify email:', error);
            setModal(null);
        }
    };

    const handleSavePreRegistrationSubmission = async (channel: string, goal: string) => {
        try {
            const result = await preRegistrationRepository.registration({ email: emailUsuario,channel, goal });
            if (result && result.status === HttpStatusCode.accepted) {
                handleTokenLanguageSubmission(emailUsuario, 'portuguese')
            } else {
                setModal(null);
            }
        } catch (error) {
            console.error('Failed to verify email:', error);
            setModal(null);
        }
    };

    const handleTokenPasswordSubmission = async (token: string, password: string, confirmPassword: string) => {
        try {
            const response = await tokenPasswordService.token(emailUsuario, token, password, confirmPassword);
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
        } catch (error) {
            console.error('Failed to verify email:', error);
            setModal(null);
        }
    };

    const handleLoginSubmission = async (password: string) => {
        try {
            const response = await authService.auth(emailUsuario, password);
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
        } catch (error) {
            console.error('Failed to verify email:', error);
            setModal(null);
        }
    };



    const handleLogoutSubmission = async (email: string) => {
            await logoutService.verifyEmailDelete(email);
            localStorage.removeItem(LOCAL_STORAGE_KEY_ACCESS_TOKEN);
            localStorage.removeItem('user');
            setAccessToken(undefined);
            setUser(null);
            router.push('/');
    };

    function closeModal() {
        setModal(null);
    }

    const isAuthenticated = useMemo(() => !!accessToken, [accessToken]);

    const value = useMemo(() => ({
        user,
        emailUsuario,
        handleLoginSubmission,
        isAuthenticated,
        openModal,
        closeModal,
        modal,
        setModal,
        handleEmailSubmission,
        handleConfirmEmailSubmission,
        handleLogoutSubmission,
        handleSavePreRegistrationSubmission,
        handleTokenPasswordSubmission
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
