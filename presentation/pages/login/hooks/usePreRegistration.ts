import { HttpStatusCode } from "@/data/protocols/http/http-client";
import { makeRemotePreRegistration } from "@/main/factories/usecases/remote-pre-registration-factory";
import { emailUsuarioState, modalState } from "@/presentation/pages/login/atom/atom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { useSendTokenLanguage } from "./useSendTokenLanguage";

export const usePreRegistration = () => {

    const setModal = useSetRecoilState(modalState);
    const [emailUsuario, setEmailUsuario] = useRecoilState(emailUsuarioState);
    const { handleTokenLanguageSubmission } = useSendTokenLanguage();


    const handleSavePreRegistrationSubmission = async (channel: string, goal: string) => {
        const preRegistrationRepository = makeRemotePreRegistration(emailUsuario);

        try {
            const result = await preRegistrationRepository.registration({ email: emailUsuario, channel, goal });
            if (result && result.status === HttpStatusCode.accepted) {
                handleTokenLanguageSubmission(emailUsuario, 'portuguese')
            } else {
                setModal(null);
            }
        } catch (error) {
            console.error('Failed to verify email:', error);
            throw error;
        }
    };

    return{
        handleSavePreRegistrationSubmission,
        setEmailUsuario
    }

}
