'use client';
import { useState } from 'react';
import Modal from '../../presentation/components/modal-composition';
import { useAuth } from '@/presentation/contexts/authContext';
import IconUser from '@/components/icon/icon-user';
import IconLockDots from '../icon/icon-lock-dots';

export const ModalSavePasswordToken = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [token, setToken] = useState('');
    const {handleRegister, setModal, modal} = useAuth();


    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        handleRegister(token, password, confirmPassword);
    };

    return (
        <>
            <Modal isOpen={modal === 'register'} onClose={() => setModal(null)} title="Informe o token enviado por e-mail e crie uma senha">
            <form onSubmit={handleSubmit}>
                <div className="relative mb-4">
                    <span className="absolute top-1/2 -translate-y-1/2 ltr:left-3 rtl:right-3 dark:text-white-dark">
                        <IconUser className="h-5 w-5" />
                    </span>
                    <input
                        value={token}
                        onChange={(event) => setToken(event.target.value)}
                        type="password"
                        placeholder="Token Enviado por E-mail"
                        className="form-input ltr:pl-10 rtl:pr-10"
                        id="token"
                    />
                </div>
                <div className="relative mb-4">
                    <span className="absolute top-1/2 -translate-y-1/2 ltr:left-3 rtl:right-3 dark:text-white-dark">
                    <IconLockDots fill={true} />
                    </span>
                    <input
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        type="password"
                        placeholder="Digite sua Senha"
                        className="form-input ltr:pl-10 rtl:pr-10"
                        id="password"
                    />
                </div>
                <div className="relative mb-4">
                    <span className="absolute top-1/2 -translate-y-1/2 ltr:left-3 rtl:right-3 dark:text-white-dark">
                    <IconLockDots fill={true} />
                    </span>
                    <input
                        value={confirmPassword}
                        onChange={(event) => setConfirmPassword(event.target.value)}
                        type="password"
                        placeholder="Confirmar Senha"
                        className="form-input ltr:pl-10 rtl:pr-10"
                        id="confirm_password"
                    />
                </div>
                <button type="submit" className="btn btn-primary w-full">
                    Validar
                </button>
            </form>
            <div className="border-t border-[#ebe9f1] p-5 dark:border-white/10">
                <p className="text-center text-sm text-white-dark dark:text-white-dark/70">
                    Não recebeu o Token?
                    <button type="button" className="text-[#515365] hover:underline ltr:ml-1 rtl:mr-1 dark:text-white-dark">
                        reenvie aqui
                    </button>
                </p>
            </div>
            </Modal>
        </>
    );
};