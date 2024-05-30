import { useRecoilState, useSetRecoilState } from 'recoil';
import { emailUsuarioState, modalState } from '@/presentation/pages/login/atom/atom';
import { HttpStatusCode } from '@/data/protocols/http/http-client';
import { makeRemoteEmailExists } from '@/main/factories/usecases/remote-exists-login-factory';


export const useEmailExist = () => {
    const [emailUsuario, setEmailUsuario] = useRecoilState(emailUsuarioState);
    const setModal = useSetRecoilState(modalState);

    const handleEmailSubmission = async (email: string | null) => {
        const emailExistsRepository = makeRemoteEmailExists(email);
        try {
            const result = await emailExistsRepository.email({email: emailUsuario});

            if (result && result.status) {
                switch (result.status) {
                    case HttpStatusCode.ok:
                        setModal('password')
                        setEmailUsuario(email);
                        break;
                    case HttpStatusCode.created:
                        setModal('registration');
                        break;
                    case HttpStatusCode.accepted:
                        setModal('register');
                        break;
                    case HttpStatusCode.notFound:
                        setModal('confirmLogin');
                        break;
                    case HttpStatusCode.passwordError:
                        setModal('register');
                        break;
                    default:
                        setModal(null);
                }
            } else {
                setModal(null);
            }
        } catch (error: any) {
            console.error('Failed to verify email:', error);
            throw error;
        }
    };

    return {
        handleEmailSubmission,
        emailUsuario,
        setEmailUsuario
    }


}
