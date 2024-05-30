import { HttpStatusCode } from "@/data/protocols/http/http-client";
import { setCurrentAccountAdapter } from "@/main/adapters";
import { makeRemoteAuthentication } from "@/main/factories/usecases/remote-authentication-factory";
import { accessTokenState, emailUsuarioState, modalState, userState } from "@/presentation/pages/login/atom/atom";
import { useRecoilValue, useSetRecoilState } from "recoil";

export const usePassword = () => {

    const setModal = useSetRecoilState(modalState);
    const emailUsuario = useRecoilValue(emailUsuarioState);
    const setAccessToken = useSetRecoilState(accessTokenState);
    const setUser = useSetRecoilState(userState);

    const handlePasswordSubmission = async (password: string) => {
        const authRepository = makeRemoteAuthentication(emailUsuario);
        try {
            const response = await authRepository.login({password: password});
            if (response.data && typeof response.data === 'object') {

                if(response.status === HttpStatusCode.lockedPassword) {
                    setModal('register');
                }

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

    return {
        handlePasswordSubmission,
        setModal
     }
}
