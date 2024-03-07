
import { Api } from "..";
import { callBacks } from "./callbacks";


type IAuth = {
    sessionToken: string;
    user: any;
}


const auth = async (email: string,password: string): Promise<IAuth | Error> => {
  console.log(`Authenticado usando o email: ${email}`);
  try{
     console.log(`Sending request to API...`);
     const {data} = await Api.post(`/login/${email}`, { password });
     console.log(`Received data from API: ${JSON.stringify(data)}`);

     if(data) {
        return data
     }

     return new Error('Erro no Login')

  } catch(error) {
    console.log(error);
    return new Error((error as {message: string}).message || 'Erro no Login')
  }

}
// const headEmail = async (email: string): Promise<string | Error> => {
//     try {
//         const response = await Api.head(`/login/${email}/token`);
//         if (response.status === 200) {
//             return 'Status: Usuário sem pendências de cadastro';
//         } else if (response.status === 404) {
//             throw new Error('Status: Usuário novo no sistema');
//         } else {
//             return new Error('Erro ao obter o email');
//         }
//     } catch (error: any) {
//         if (error.message === 'Status: Usuário novo no sistema') {
//             return error;
//         }
//         return new Error((error as Error as {message: string}).message || 'Erro ao obter o email');
//     }
// };

const headEmail = async (email: string): Promise<number> => {
    try {
        const response = await Api.head(`/login/${email}/token`);
        return response.status;
    } catch (error: any) {
        if (error.response) {
            // Erro devido a uma resposta de erro da API
            return error.response.status;
        } else {
            // Outro tipo de erro (por exemplo, erro de rede)
            console.error(`Ocorreu um erro: ${error}`);
            return 500; // Retorne 500 ou qualquer outro código de status que represente um erro
        }
    }
};






const languagePort = 'portuguese'

const confirmEmail = async (email: string): Promise<number> => {
    try {
        const {data} = await Api.post(`/login/${email}/token/language/${languagePort}`);
        return data.status;
    } catch (error: any) {
        if (error.response) {
            return error.response.status;
        } else {
            console.error(`Ocorreu um erro: ${error}`);
            return 500;
        }
    }
};

const authRegister = async (password: string, confirmPassword: string, token: string, user:any ): Promise<number> => {
    try {
        const {data} = await Api.post(`/login/${user}/password`, {
            password,
            confirmPassword,
            token
        });
        return data.status;
    } catch (error: any) {
        if (error.response) {
            return error.response.status;
        } else {
            console.error(`Ocorreu um erro: ${error}`);
            return 500;
        }
    }
};

const registration = async (user: any, option: string, option1: string ): Promise<number> => {
    try {
        const {data} = await Api.post(`/login/${user}/pre-registration`, {
            option,
            option1,
        });
        return data.status;
    } catch (error: any) {
        if (error.response) {
            return error.response.status;
        } else {
            console.error(`Ocorreu um erro: ${error}`);
            return 500;
        }
    }
};

const logout = async (email: string): Promise<void> => {
    console.log(email)
    try {
        await Api.delete(`/login/${email}`);
    } catch (error) {
        console.error(`Ocorreu um erro: ${error}`);
    }
};





export const AuthService = {
    auth, headEmail,confirmEmail, authRegister, registration,logout
}
