import React from 'react';
import { useAuth } from '../../contexts/authContext';
import { ModalPassword } from './modal-password';
import { ModalExistsEmail } from './modal-exists-email';
import { ModalConfirmEmail } from './modal-confirm-email';
import { ModalSavePasswordToken } from './modal-save-password-token';
import { ModalQuestionsAndAnswers } from './modal-questions-and-answers';


export const AuthenticationManager= () => {

    const {modal} = useAuth();
  return (
    <div>
      {modal === 'login' && <ModalExistsEmail  />}
      {modal === 'confirmLogin' && <ModalConfirmEmail />}
      {modal === 'register' && <ModalSavePasswordToken />}
      {modal === 'registration' && <ModalQuestionsAndAnswers />}
      {modal === 'password' && <ModalPassword />}

    </div>
  );
}

