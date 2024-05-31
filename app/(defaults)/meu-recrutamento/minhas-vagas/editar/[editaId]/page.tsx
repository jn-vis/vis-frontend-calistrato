
import EditarVagaExistente from '@/presentation/components/meu-recrutamento/minhas-vagas/editar-vaga/editar-vaga';
import CadastrarNovaVaga from '@/presentation/pages/meu-recrutamento/minhas-vagas/crud-vagas/formulario-vaga';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Edita vagaId',
};

const EditarVaga = ({params}:any) => {

    return <CadastrarNovaVaga vagaId={params.editaId} />;
  };

  export default EditarVaga;

