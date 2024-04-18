import { EmailNaoConfirmadoError } from "@/components/shared/errors/email-nao-confirmado.error";
import { Either } from "@/core/either";

export interface IAuthContextData {
    isAuthenticated: boolean;
    logout: (email: string) => Promise<void>;
    login:any
    openModal: (modalType: 'login' | 'confirmLogin' | 'register' | 'password' | 'registration') => void;
    closeModal: () => void;
    modal: 'login' | 'confirmLogin' | 'register' | 'password' | 'registration' | null;
    setModal: React.Dispatch<React.SetStateAction<'login' | 'confirmLogin' | 'register' | 'password' | 'registration' | null>>;
    handleEmail: (email: string) => Promise<void>;
    handleConfirmaEmail: (email: string) => Promise<Either<EmailNaoConfirmadoError, unknown> | undefined>;
    handleRegister: (token: string, password: string, confirmPassword: string) => Promise<Either<EmailNaoConfirmadoError, unknown> | undefined>
    handleRegistration: any
    user: string | null;
    emailUsuario: string | null;

}

export interface IAuthProviderProps {
    children: React.ReactNode;
}
