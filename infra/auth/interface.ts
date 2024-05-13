export type ModalType = 'login' | 'password' | 'register' | 'confirmLogin' | 'registration' | null;

export interface IAuthContextData {
    user: string | null;
    emailUsuario: string;
    isAuthenticated: boolean;
    modal: ModalType;
    openModal: (modalType: ModalType) => void;
    closeModal: () => void;
    setModal: (modalType: ModalType | null) => void;
    handleLoginSubmission: (password: string) => Promise<void>;
    handleEmailSubmission: (email: string) => Promise<void>;
    handleConfirmEmailSubmission: (email: string) => Promise<void>;
    handleLogoutSubmission: (email: string) => Promise<void>;
    handleSavePreRegistrationSubmission: (channel: string, goal: string) => Promise<void>;
    handleTokenPasswordSubmission: (token: string, password: string, confirmPassword: string) => Promise<void>;
}

export interface IAuthProviderProps {
    children: React.ReactNode;
}
