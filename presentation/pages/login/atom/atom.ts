import { atom } from 'recoil';


type ModalType = 'login' | 'password' | 'register' | 'confirmLogin' | 'registration' | null;

export const modalState = atom<ModalType | null>({
key: 'modalState',
default: null,
});

export const emailUsuarioState = atom({
    key: 'emailUsuarioState',
    default: "" || null
});

export const accessTokenState = atom({
    key: 'accessTokenState',
    default: '' || undefined
});

export const userState = atom<string | null>({
    key: 'userState',
    default: null
});

