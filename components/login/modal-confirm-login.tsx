import IconUser from '@/components/icon/icon-user';
import { useState } from 'react';
import { useAuth } from '../../infra/auth/authContext';
import { GenericModal } from './modal-generics';

type ConfirmLoginFormProps = {
    onSubmit: (email: string) => void;
};

export const ConfirmLoginForm = ({ onSubmit }: ConfirmLoginFormProps) => {
    const [confirmarEmail, setConfirmarEmail] = useState("");

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        onSubmit(confirmarEmail);
        setConfirmarEmail("");
    };


    return (
      <form onSubmit={handleSubmit}>
        <div className="relative mb-4">
          <span className="absolute top-1/2 -translate-y-1/2 ltr:left-3 rtl:right-3 dark:text-white-dark">
            <IconUser className="h-5 w-5" />
          </span>
          <input value={confirmarEmail} onChange={(event) => setConfirmarEmail(event.target.value)} type="email" placeholder="Email" className="form-input ltr:pl-10 rtl:pr-10" id="login_email" />
        </div>
        <button type="submit" className="btn btn-primary w-full">
          Confirmar
        </button>
      </form>
    );
  };

  export const ConfirmarLogin = () => {
    const {handleConfirmLogin, setModal, modal} = useAuth();

    return (
      <GenericModal isOpen={modal === 'confirmLogin'} onClose={() => setModal(null)} title="Confirmar Login" infoModalLogin={"Trocar o e-mail"}>
        <ConfirmLoginForm onSubmit={handleConfirmLogin} />
      </GenericModal>
    );
  };

