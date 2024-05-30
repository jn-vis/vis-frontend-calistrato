import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@/presentation/contexts/authContext';
import { BlockedTokenError, InvalidEmailError, UserAlreadyLoggedError } from '@/domain/errors';
import { MissingEmailError } from '@/domain/errors/missing-email-error';
import { PasswordLockedRecentlyError } from '@/domain/errors/password-locked-recently-error';
import { WrongPasswordError } from '@/domain/errors/wrong-password-error';
import { TFormTokenPassword, tokenPasswordSchema } from '@/domain/schemas/token-password';
import { useSendTokenLanguage } from '../hooks/useSendTokenLanguage';
import { useSavePasswordToken } from '../hooks/useSavePasswordToken';
import { useRecoilValue } from 'recoil';
import { emailUsuarioState } from '@/presentation/pages/login/atom/atom';

export const useFormSavePasswordToken = () => {
    const emailUsuario = useRecoilValue(emailUsuarioState);
    const { handleTokenPasswordSubmission} = useSavePasswordToken()
    const {
        register,
        handleSubmit,
        setValue,
        setError,
        watch,
        formState: { errors,isSubmitting },
      } = useForm<TFormTokenPassword>({
        resolver: zodResolver(tokenPasswordSchema),
        criteriaMode: "all",
        mode: "all",
        defaultValues: {
          token: "",
          password: "",
          confirmPassword: "",
        },
      });

      const handleSetData = useCallback((data: Partial<TFormTokenPassword>) => {
        Object.keys(data).forEach(key => {
            setValue(key, data[key] ?? "");
        });
    }, [setValue]);

    const handleFormSubmit = async (data: TFormTokenPassword) => {
        try {
            const { token, password, confirmPassword } = data;
            await handleTokenPasswordSubmission(token, password, confirmPassword, emailUsuario);
            handleSetData({ token: '', password: '', confirmPassword: '' });
        } catch (error: any) {
            const errorMap = {
                [WrongPasswordError.name]: 'Senha incorreta',
                [BlockedTokenError.name]: 'Token bloqueado',
                [PasswordLockedRecentlyError.name]: 'Senha bloqueada recentemente, tente novamente mais tarde',
                [MissingEmailError.name]: 'Email não encontrado',
                [InvalidEmailError.name]: 'Email inválido',
                [UserAlreadyLoggedError.name]: 'Usuário já logado',
            };

            const errorMessage = errorMap[error.constructor.name] || 'Erro desconhecido, tente novamente';
            setError('password', { type: 'manual', message: errorMessage });
        }
    };

    return {
        register,
        handleSubmit,
        setValue,
        handleSetData,
        errors,
        isSubmitting,
        handleFormSubmit,
        watch,
    }
}

