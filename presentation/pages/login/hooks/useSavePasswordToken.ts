import { setCurrentAccountAdapter } from "@/main/adapters";
import { makeRemoteTokenPassword } from "@/main/factories/usecases/remote-token-password";
import { accessTokenState, emailUsuarioState, modalState, userState } from "@/presentation/pages/login/atom/atom";
import {  useRecoilValue, useSetRecoilState } from "recoil";

export const useSavePasswordToken = () => {

    const setModal = useSetRecoilState(modalState);
    const emailUsuario = useRecoilValue(emailUsuarioState);
    const setAccessToken = useSetRecoilState(accessTokenState);
    const setUser = useSetRecoilState(userState);

    console.log(emailUsuario)

    const handleTokenPasswordSubmission = async (token: string, password: string, confirmPassword: string, emailUsuario: string) => {
        const tokenPasswordRepository = makeRemoteTokenPassword(emailUsuario);

        try {
            const response = await tokenPasswordRepository.tokenPassword({email: emailUsuario, token, password, confirmPassword});
            if (response.data && typeof response.data === 'object') {
                const { sessionToken } = response.data;

                if (sessionToken) {
                    setCurrentAccountAdapter({ sessionToken: sessionToken, user: emailUsuario });
                    setAccessToken(sessionToken);
                    setUser(emailUsuario);
                    setModal(null);
                } else {
                    console.error('O token de acesso não foi retornado corretamente pela API.');
                }
            }
        } catch (error) {
            console.error('Failed to verify email:', error);
            throw error;
        }
    };



    return{
        handleTokenPasswordSubmission,
    }
}
