'use client'

import { useState } from "react";
import Modal from "../modal-composition";
import { useAuth } from "@/presentation/contexts/authContext";
import IconLockDots from "../../../components/icon/icon-lock-dots";
import IconLoader from "../../../components/icon/icon-loader";


export const ModalPassword = () => {
    const [password, setPassword] = useState('');
    const {handleLoginSubmission, setModal, modal} = useAuth();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        setIsSubmitting(true);
        setTimeout(() => {
            handleLoginSubmission(password);
            setIsSubmitting(false);
        }, 1000);
    };

  return (
    <>
      <Modal isOpen={modal === 'password'} onClose={() => setModal(null)} title="Password">
      <form onSubmit={handleSubmit}>
                <div className="relative mb-4">

                    <input value={password} onChange={(event) => setPassword(event.target.value)} type="password" placeholder="Password" className="form-input ltr:pl-10 rtl:pr-10" id="login_password" />
                    <span className="absolute start-4 top-1/2 -translate-y-1/2">
                        <IconLockDots fill={true} />
                    </span>
                </div>
                <button type="submit" className="btn btn-primary w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                    <IconLoader className="inline-block shrink-0 animate-[spin_2s_linear_infinite] align-middle ltr:mr-2 rtl:ml-2" />
                ) : null}
                Login
            </button>
            </form>
            <div className="border-t border-[#ebe9f1] p-5 dark:border-white/10">
                <p className="text-center text-sm text-white-dark dark:text-white-dark/70">
                    Esqueceu a senha?
                    <button onClick={() => setModal('register')} type="button" className="text-[#515365] hover:underline ltr:ml-1 rtl:mr-1 dark:text-white-dark">
                        recupere aqui
                    </button>
                </p>
            </div>
      </Modal>
    </>
  )
}
