import { HttpStatusCode } from "@/data/protocols/http/http-client";
import { makeRemoteTokenLanguage } from "@/main/factories/usecases/login/remote-token-language-factory";
import { emailUsuarioState, modalState } from "@/presentation/pages/login/atom/atom";
import { useRecoilState, useSetRecoilState } from "recoil";


export const useSendTokenLanguage = () => {

    const setModal = useSetRecoilState(modalState);
    const [emailUsuario, setEmailUsuario] = useRecoilState(emailUsuarioState);

    const handleTokenLanguageSubmission = async (email: string | null, language: string) => {
        const tokenLanguageRepository = makeRemoteTokenLanguage(email, language);

        try {
            const result = await tokenLanguageRepository.tokenLanguage({email: emailUsuario, language: language});

            if (result && result.status === HttpStatusCode.ok) {
                setModal('register');
                setEmailUsuario(email);
            } else {
                setModal(null);
            }
        } catch (error) {
            console.error('Failed to verify email:', error);
            throw error;
        }
    };



    return{
        handleTokenLanguageSubmission,
    }
}
