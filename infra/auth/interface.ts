export interface IAuthContextData {
    isAuthenticated: boolean;
    logout: any
    // login: (email: string, password: string) => Promise<string | void>;
    login:any
    openModal: (modalType: string) => void;
    closeModal: () => void;
    modal: any
    setModal: React.Dispatch<React.SetStateAction<'login' | 'confirmLogin' | 'register' | 'password' | 'registration' | null>>;
    handleLogin: (email: string) => Promise<void>;
    handleConfirmLogin: (email: string) => Promise<void>;
    // handleRegister: (token: string, password: string, confirmPassword: string) => Promise<void>;
    handleRegister: any;

    // handleRegistration: (option: string, option1: string) => Promise<void>;
    handleRegistration: any

    user: string | null;
}

export interface IAuthProviderProps {
    children: React.ReactNode;
}
