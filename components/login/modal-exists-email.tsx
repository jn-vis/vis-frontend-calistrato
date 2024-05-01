'use client';
import { useState } from 'react';
import Modal from '../../presentation/components/modal-composition';
import { useAuth } from '@/presentation/contexts/authContext';
import IconLoader from '../icon/icon-loader';
import IconUser from '@/components/icon/icon-user';
import { useFormAll } from './hook/useFormAll';
import { TFormData } from '@/domain/schemas/login';

export const ModalExistsEmail = () => {
    const { handleEmail, setModal, modal } = useAuth();
    const { register, handleSubmit, errors, isSubmitting, handleSetData } = useFormAll();

    const handleFormSubmit = async (data: TFormData) => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        handleEmail(data.email);
        handleSetData({ email: '' });
    };

    return (
        <Modal isOpen={modal === 'login'} onClose={() => setModal(null)} title="Informe o seu e-mail">
                <form onSubmit={handleSubmit(handleFormSubmit)}>
                    <div className="relative mb-4">
                        <div className="relative">
                            <span className="absolute top-1/2 -translate-y-1/2 dark:text-white-dark ltr:left-3 rtl:right-3">
                                <IconUser className="h-5 w-5" />
                            </span>
                            <input {...register('email')} type="email" placeholder="Email" className="form-input ltr:pl-10 rtl:pr-10" id="email" />
                        </div>
                        {errors.email && <p className="text-red-600">{errors.email.message}</p>}
                    </div>
                    <button type="submit" className="btn btn-primary w-full" disabled={isSubmitting}>
                        {isSubmitting ? <IconLoader className="inline-block shrink-0 animate-[spin_2s_linear_infinite] align-middle ltr:mr-2 rtl:ml-2" /> : null}
                        Avançar
                    </button>
                </form>
                <div className="border-t border-[#ebe9f1] p-5 dark:border-white/10">
                    <p className="cursor-pointer text-center text-sm text-white-dark dark:text-white-dark/70">Informe o seu e-mail, mesmo que seja seu primeiro acesso</p>
                </div>
            </Modal>
    );
};
