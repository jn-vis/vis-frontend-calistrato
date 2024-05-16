import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@/presentation/contexts/authContext';
import { BlockedTokenError, InvalidEmailError, UserAlreadyLoggedError } from '@/domain/errors';
import { TFormDataPassword, passwordSchema } from '@/domain/schemas';
import { MissingEmailError } from '@/domain/errors/missing-email-error';
import { PasswordLockedRecentlyError } from '@/domain/errors/password-locked-recently-error';
import { WrongPasswordError } from '@/domain/errors/wrong-password-error';

export const useFormPassword = () => {
    const { handleLoginSubmission} = useAuth();
    const {
        register,
        handleSubmit,
        setValue,
        setError,
        watch,
        formState: { errors,isSubmitting },
      } = useForm<TFormDataPassword>({
        resolver: zodResolver(passwordSchema),
        criteriaMode: "all",
        mode: "all",
        defaultValues: {
          password: "",
        },
      });

      const handleSetData = useCallback((data: Partial<TFormDataPassword>) => {
        if (data.password !== undefined) {
            setValue("password", data.password);
        }
    }, []);

    const handleFormSubmit = async (data: TFormDataPassword) => {
        try {
            await handleLoginSubmission(data.password);
            handleSetData({ password: '' });
        } catch (error: any) {
            const errorMap = {
                [WrongPasswordError.name]: 'Ops! A senha digitada está errada. Tente novamente.',
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

