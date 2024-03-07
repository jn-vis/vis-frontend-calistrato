import IconUser from '@/components/icon/icon-user';
import { useState } from 'react';
import { useAuth } from '../../infra/auth/authContext';
import { GenericModal } from './modal-generics';

export const AuthPassword = () => {
    const [password, setPassword] = useState('');
    const {login, setModal, modal, user} = useAuth();

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        login(user,password);
    };


    return (
        <GenericModal
            isOpen={modal === 'password'}
            onClose={() => setModal(null)}
            title="Password"
        >
            <form onSubmit={handleSubmit}>
                <div className="relative mb-4">
                    <span className="absolute top-1/2 -translate-y-1/2 ltr:left-3 rtl:right-3 dark:text-white-dark">
                        <IconUser className="h-5 w-5" />
                    </span>
                    <input value={password} onChange={(event) => setPassword(event.target.value)} type="password" placeholder="Password" className="form-input ltr:pl-10 rtl:pr-10" id="login_password" />
                </div>
                <button type="submit" className="btn btn-primary w-full">
                    Login
                </button>
            </form>
            <div className="border-t border-[#ebe9f1] p-5 dark:border-white/10">
                <p className="text-center text-sm text-white-dark dark:text-white-dark/70">
                    Esqueceu a senha?
                    <button type="button" className="text-[#515365] hover:underline ltr:ml-1 rtl:mr-1 dark:text-white-dark">
                        recupere aqui
                    </button>
                </p>
            </div>
        </GenericModal>
    );
};
