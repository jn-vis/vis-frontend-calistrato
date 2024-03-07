export const callBacks = {
    200: (setModal:any) => {
        setModal('password'); // Redirecionamento para a tela que pede senha para executar login.
    },
    201: (setModal:any) => {
        setModal('registration'); // Redirecionamento para a tela de cadastro do pré registro.
    },
    202: (setModal:any) => {
        setModal('register'); // Redirecionamento para a tela de cadastro da senha.
    },
    400: () => {
        alert('Email inválido'); // Apresentar erro genérico de sistema para o usuário.
    },
    401: (setModal:any) => {
        setModal('changePassword'); // Redirecionar o usuário para a tela de alteração de senha.
    },
    403: (setModal:any) => {
        setModal('unlockToken'); // Redirecionar o usuário para a tela de requisição de desbloqueio de token.
    },
    404: (setModal:any) => {
        setModal('confirmLogin'); // Redirecionar o usuário para a tela de confirmação de e-mail.
    },
    409: (setModal:any) => {
        setModal('changePassword'); // Redirecionar o usuário para a tela de alteração de senha.
    },
    420: () => {
        alert('Token pendente de desbloqueio'); // Exibir uma mensagem de que em breve o suporte do JobsNow entrará em contato com ele por meio dos contatos informados e redirecioná-lo para a tela de desbloqueio de token.
    },
    421: (setModal:any) => {
        setModal('login'); // Informar ao usuário que ele está temporariamente bloqueado no acesso ao sistema e redirecioná-lo para a primeira tela do fluxo de login, para o caso de ele querer tentar com outro e-mail.
    },
    500: () => {
        alert('Internal Server Error'); // Tratar erro interno do servidor.
    }
};


