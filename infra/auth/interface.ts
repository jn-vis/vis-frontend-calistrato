import { EmailNaoConfirmadoError } from "@/components/shared/errors/email-nao-confirmado.error";
import { Either } from "@/core/either";
import { TFormData } from "@/domain/schemas/login-email";
import { UseFormSetError } from "react-hook-form";

export interface IAuthContextData {
    isAuthenticated: boolean;
    logout: (email: string) => Promise<void>;
    login:any
    openModal: (modalType: 'login' | 'confirmLogin' | 'register' | 'password' | 'registration') => void;
    closeModal: () => void;
    modal: 'login' | 'confirmLogin' | 'register' | 'password' | 'registration' | null;
    setModal: React.Dispatch<React.SetStateAction<'login' | 'confirmLogin' | 'register' | 'password' | 'registration' | null>>;
    handleEmail: any
    handleConfirmaEmail: (email: string) => Promise<Either<EmailNaoConfirmadoError, unknown> | undefined>;
    handleRegister: any
    handleRegistration: any
    user: string | null;
    emailUsuario: string

}

export interface IAuthProviderProps {
    children: React.ReactNode;
}
