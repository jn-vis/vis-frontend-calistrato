import IconUser from '@/components/icon/icon-user';
import { useState } from 'react';
import { useAuth } from '../../infra/auth/authContext';
import { GenericModal } from './modal-generics';

type LoginFormProps = {
    onSubmit: (email: string) => void;
};

export const LoginForm = ({ onSubmit }:LoginFormProps) => {
    const [email, setEmail] = useState('');

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        onSubmit(email);
        setEmail('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="relative mb-4">
                <span className="absolute top-1/2 -translate-y-1/2 dark:text-white-dark ltr:left-3 rtl:right-3">
                    <IconUser className="h-5 w-5" />
                </span>
                <input value={email} onChange={(event) => setEmail(event.target.value)} type="email" placeholder="Email" className="form-input ltr:pl-10 rtl:pr-10" id="login_email" />
            </div>
            <button type="submit" className="btn btn-primary w-full">
                Login
            </button>
        </form>
    );
};

export const LoginModal = () => {
    const { handleLogin, setModal, modal } = useAuth();

    return (
        <GenericModal
        isOpen={modal === 'login'}
        onClose={() => setModal(null)}
        title="Login"
        infoModalLogin={"Informe o seu e-mail, mesmo que seja seu primeiro acesso"}>
            <LoginForm
            onSubmit={handleLogin}
             />
        </GenericModal>
    );
};
