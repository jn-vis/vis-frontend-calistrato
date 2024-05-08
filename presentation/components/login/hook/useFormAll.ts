import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TFormData, schemaForm } from '@/domain/schemas/login';


export const useFormAll = () => {
    const {
        register,
        handleSubmit,
        setValue,
        setError,
        formState: { errors,isSubmitting },
      } = useForm<TFormData>({
        resolver: zodResolver(schemaForm),
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




    return {
        register,
        handleSubmit,
        setValue,
        handleSetData,
        errors,
        isSubmitting,
        setError
    }
}

