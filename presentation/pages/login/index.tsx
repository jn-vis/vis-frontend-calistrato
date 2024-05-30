import React from 'react';
import { ModalExistsEmail } from '@/presentation/pages/login/modal-exists-email';
import { useRecoilValue } from 'recoil';
import { modalState } from './atom/atom';
import { ModalConfirmEmail } from '@/presentation/pages/login/modal-confirm-email';
import { ModalSavePasswordToken } from '@/presentation/pages/login/modal-save-password-token';
import { ModalQuestionsAndAnswers } from '@/presentation/pages/login/modal-questions-and-answers';
import { ModalPassword } from '@/presentation/pages/login/modal-password';


export const AuthenticationManager= () => {

    const modal = useRecoilValue(modalState);
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

