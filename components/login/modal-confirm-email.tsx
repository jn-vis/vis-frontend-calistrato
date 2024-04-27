'use client';
import { useState } from 'react';
import Modal from '../../presentation/components/modal-composition';
import { useAuth } from '@/presentation/contexts/authContext';
import IconUser from '@/components/icon/icon-user';

export const ModalConfirmEmail = () => {
    const { handleConfirmaEmail, setModal, modal } = useAuth();
    const [confirmarEmail, setConfirmarEmail] = useState('');

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        handleConfirmaEmail(confirmarEmail);
        setConfirmarEmail('');
    };

    return (
        <>
            <Modal isOpen={modal === 'confirmLogin'} onClose={() => setModal(null)} title="Confirme o seu email">
                <form onSubmit={handleSubmit}>
                    <div className="relative mb-4">
                        <span className="absolute top-1/2 -translate-y-1/2 dark:text-white-dark ltr:left-3 rtl:right-3">
                            <IconUser className="h-5 w-5" />
                        </span>
                        <input
                            value={confirmarEmail}
                            onChange={(event) => setConfirmarEmail(event.target.value)}
                            type="email"
                            placeholder="Email"
                            className="form-input ltr:pl-10 rtl:pr-10"
                            id="login_email"
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-full">
                        Confirmar
                    </button>
                </form>
                <div className="border-t border-[#ebe9f1] p-5 dark:border-white/10">
                <p className="text-center text-sm text-white-dark dark:text-white-dark/70">
                    <button onClick={() => setModal('login')} type="button" className="text-[#515365] hover:underline ltr:ml-1 rtl:mr-1 dark:text-white-dark">
                        Trocar de e-mail
                    </button>
                </p>
            </div>
            </Modal>
        </>
    );
};
