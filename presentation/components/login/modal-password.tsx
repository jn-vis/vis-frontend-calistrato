'use client'

import Modal from "../modal-composition";
import { useAuth } from "@/presentation/contexts/authContext";
import IconLockDots from "../../../components/icon/icon-lock-dots";
import IconLoader from "../../../components/icon/icon-loader";
import { useFormPassword } from "./hook";
import IconEye from "@/components/icon/icon-eye";
import { useTogglePassword } from "./hook/useTogglePassword";


export const ModalPassword = () => {
    const {setModal, modal, handleTokenLanguageSubmission, emailUsuario} = useAuth();
    const { register, handleSubmit,errors, isSubmitting,handleFormSubmit } = useFormPassword();
    const { showPassword, togglePasswordVisibility } = useTogglePassword();

    return (
      <Modal isOpen={modal === 'password'} onClose={() => setModal(null)} title="Password">
      <form onSubmit={handleSubmit(handleFormSubmit)}>
                <div className="relative mb-2">

                    <input {...register('password')} type={showPassword ? "text" : "password"} placeholder="Password" className="form-input ltr:pl-10 rtl:pr-10" id="login_password" />
                    <span className="absolute start-4 top-1/2 -translate-y-1/2">
                        <IconLockDots fill={true} />
                    </span>
                    <span className="absolute end-4 top-1/2 -translate-y-1/2 cursor-pointer" onClick={togglePasswordVisibility}>
                        {showPassword ? <IconEye /> : <IconEye />}
                    </span>
                </div>
                {errors.password && <p className="text-red-500">{errors.password.message}</p>}
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
                    <button   onClick={() => handleTokenLanguageSubmission(emailUsuario, 'portuguese')}  type="button" className="text-[#515365] hover:underline ltr:ml-1 rtl:mr-1 dark:text-white-dark">
                        Cadastre uma nova aqui
                    </button>
                </p>
            </div>
      </Modal>
  )
}
