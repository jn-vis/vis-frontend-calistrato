import React, { useEffect, useMemo, useState } from 'react';
import { IAuthContextData, IAuthProviderProps, ModalType } from '../components/login/interface/interface';
import { useRouter } from 'next/navigation';
import { HttpStatusCode } from '@/data/protocols/http/http-client';
import { makeRemoteEmailExists } from '@/main/factories/usecases/remote-exists-login-factory';
import { makeRemoteConfirmEmail } from '@/main/factories/usecases/remote-confirm-email-factory';
import { makeRemotePreRegistration } from '@/main/factories/usecases/remote-pre-registration-factory';
import { makeRemoteTokenLanguage } from '@/main/factories/usecases/remote-token-language-factory';
import { makeRemoteTokenPassword } from '@/main/factories/usecases/remote-token-password';
import { makeRemoteAuthentication } from '@/main/factories/usecases/remote-authentication-factory';
import { makeRemoteLogout } from '@/main/factories/usecases/remote-logout-factory';
import { getCurrentAccountAdapter, setCurrentAccountAdapter } from '@/main/adapters';


const LOCAL_STORAGE_KEY_ACCESS_TOKEN = 'sessionToken';

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
    const account = getCurrentAccountAdapter();
    if (account && account.sessionToken) {
        setAccessToken(account.sessionToken);
        setUser(account.user);
    }
}, []);

    const handleEmailSubmission = async (email: string) => {
        const emailExistsRepository = makeRemoteEmailExists(email);

        try {
            const result = await emailExistsRepository.email({email});

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
                    case HttpStatusCode.notFound:
                        setModal('confirmLogin');
                        break;
                    default:
                        setModal(null);
                }
            } else {
                setModal(null);
            }
        } catch (error: any) {
            console.error('Failed to verify email:', error);
            throw error;
        }
    };


    const handleConfirmEmailSubmission = async (email: string) => {
        const confirmEmailRepository = makeRemoteConfirmEmail(email);
        try {
            const result = await confirmEmailRepository.confirmEmail({email});

            if (result && result.status === HttpStatusCode.accepted) {
                setModal('registration');
                setEmailUsuario(email);
            } else {
                setModal(null);
            }
        } catch (error) {
            console.error('Failed to verify email:', error);
            throw error;
        }
    };

    const handleTokenLanguageSubmission = async (email: string, language: string) => {
        const tokenLanguageRepository = makeRemoteTokenLanguage(email, language);

        try {
            const result = await tokenLanguageRepository.tokenLanguage({email: email, language: language});

            if (result && result.status === HttpStatusCode.ok) {
                setModal('register');
            } else {
                setModal(null);
            }
        } catch (error) {
            console.error('Failed to verify email:', error);
            throw error;
        }
    };

    const handleSavePreRegistrationSubmission = async (channel: string, goal: string) => {
        const preRegistrationRepository = makeRemotePreRegistration(emailUsuario);

        try {
            const result = await preRegistrationRepository.registration({ email: emailUsuario, channel, goal });
            if (result && result.status === HttpStatusCode.accepted) {
                handleTokenLanguageSubmission(emailUsuario, 'portuguese')
            } else {
                setModal(null);
            }
        } catch (error) {
            console.error('Failed to verify email:', error);
            throw error;
        }
    };

    const handleTokenPasswordSubmission = async (token: string, password: string, confirmPassword: string) => {
        const tokenPasswordRepository = makeRemoteTokenPassword(emailUsuario);

        try {
            const response = await tokenPasswordRepository.tokenPassword({email: emailUsuario, token, password, confirmPassword});
            if (response.data && typeof response.data === 'object') {
                const { sessionToken } = response.data;

                if (sessionToken) {
                    setCurrentAccountAdapter({ sessionToken: sessionToken, user: emailUsuario });
                    setAccessToken(sessionToken);
                    setUser(emailUsuario);
                    setModal(null);
                } else {
                    console.error('O token de acesso não foi retornado corretamente pela API.');
                }
            }
        } catch (error) {
            console.error('Failed to verify email:', error);
            throw error;
        }
    };

const handleLoginSubmission = async (password: string) => {
    const authRepository = makeRemoteAuthentication(emailUsuario);
    try {
        const response = await authRepository.login({email: emailUsuario, password: password});
        if (response.data && typeof response.data === 'object') {
            console.log(response)
            console.log(response.data)

            const { sessionToken } = response.data;
            if (sessionToken) {
                setCurrentAccountAdapter({ sessionToken: sessionToken, user: emailUsuario });
                setAccessToken(sessionToken);
                setUser(emailUsuario);
                setModal(null);
            } else {
                console.error('O token de acesso não foi retornado corretamente pela API.');
            }
        }
    } catch (error) {
        console.error('Failed to verify email:', error);
        throw error;
    }
};



    const handleLogoutSubmission = async (email: string) => {
        const logoutRepository = makeRemoteLogout(email);
            await logoutRepository.logout({email: emailUsuario});
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
        handleTokenPasswordSubmission,
        handleTokenLanguageSubmission
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
