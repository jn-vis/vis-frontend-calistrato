
import EditarVagaExistente from '@/presentation/components/meu-recrutamento/minhas-vagas/editar-vaga/editar-vaga';
import CadastrarNovaVaga from '@/presentation/components/meu-recrutamento/minhas-vagas/nova-vaga/cadastrar-nova-vaga';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Edita vagaId',
};

const EditarVaga = ({params}:any) => {

    return <CadastrarNovaVaga vagaId={params.editaId} />;
  };

  export default EditarVaga;

