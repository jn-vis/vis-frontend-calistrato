import React from 'react';
import { useAuth } from '../../presentation/contexts/authContext';
import { LoginModal } from './modal-login';
import { ConfirmarLogin } from './modal-confirm-login';
import { RegisterUser } from './modal-register';
import { AuthPassword } from './modal-auth-password';
import { RegistrationModal } from './modal-pre-registration';


export const AuthenticationManager= () => {

    const {modal} = useAuth();
  return (
    <div>
      {modal === 'login' && <LoginModal  />}
      {modal === 'confirmLogin' && <ConfirmarLogin />}
      {modal === 'register' && <RegisterUser />}
      {modal === 'registration' && <RegistrationModal />}
      {modal === 'password' && <AuthPassword />}
    </div>
  );
}

