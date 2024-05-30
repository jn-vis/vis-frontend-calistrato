import { setCurrentAccountAdapter } from "@/main/adapters";
import { makeRemoteLogout } from "@/main/factories/usecases/remote-logout-factory";
import { accessTokenState, emailUsuarioState, modalState, userState } from "@/presentation/pages/login/atom/atom";
import { useRouter } from "next/navigation";
import { useRecoilValue, useSetRecoilState } from "recoil";

export const useLogout = () => {
    const setAccessToken = useSetRecoilState(accessTokenState);
    const setUser = useSetRecoilState(userState);
    const setModal = useSetRecoilState(modalState);
    const emailUsuario = useRecoilValue(emailUsuarioState);
    const router = useRouter();

    const handleLogoutSubmission = async (email: string) => {
        const logoutRepository = makeRemoteLogout(email);
        try {
            await logoutRepository.logout({email: emailUsuario});
        } catch (error) {
            console.error('Failed to logout:', error);
        } finally {
            setCurrentAccountAdapter(null);
            setAccessToken(undefined);
            setUser(null);
            router.push('/');
        }
    };

        function closeModal() {
            setModal(null);
        }


    return{
        handleLogoutSubmission,
        closeModal
    }
}
