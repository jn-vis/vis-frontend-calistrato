import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TFormData, emailSchema} from '@/domain/schemas/login-email';
import { useAuth } from '@/presentation/contexts/authContext';

export const useFormEmail = () => {
    const { handleEmailSubmission} = useAuth();
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors,isSubmitting },
      } = useForm<TFormData>({
        resolver: zodResolver(emailSchema),
        criteriaMode: "all",
        mode: "all",
        defaultValues: {
          email: "",
        },
      });

      const handleSetData = useCallback((data: Partial<TFormData>) => {
        if (data.email !== undefined) {
            setValue("email", data.email);
        }
    }, []);

    const handleFormSubmit = async (data: TFormData) => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        handleEmailSubmission(data.email);
        handleSetData({ email: '' });
    };

    return {
        register,
        handleSubmit,
        setValue,
        handleSetData,
        errors,
        isSubmitting,
        handleFormSubmit
    }
}
