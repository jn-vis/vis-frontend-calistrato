import { HttpStatusCode } from "@/data/protocols/http/http-client";
import { makeRemoteConfirmEmail } from "@/main/factories/usecases/login/remote-confirm-email-factory";
import { emailUsuarioState, modalState } from "@/presentation/pages/login/atom/atom";
import {  useSetRecoilState } from "recoil";

export const useConfirmEmail = () => {
    const setModal = useSetRecoilState(modalState);
    const setEmailUsuario = useSetRecoilState(emailUsuarioState);

    const handleConfirmEmailSubmission = async (email: string | null) => {
        const confirmEmailRepository = makeRemoteConfirmEmail(email);
        try {
            const result = await confirmEmailRepository.confirmEmail({email});

            if (result && result.status === HttpStatusCode.accepted) {
                setModal('registration');
                setEmailUsuario(email);
            } else {
                setModal(null);
            }
        } catch (error) {
            console.error('Failed to verify email:', error);
            throw error;
        }
    };

    return {
        handleConfirmEmailSubmission,
        setModal
    }
}
