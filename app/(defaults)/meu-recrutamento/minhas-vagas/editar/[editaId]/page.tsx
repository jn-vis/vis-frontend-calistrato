
import EditarVagaExistente from '@/presentation/components/meu-recrutamento/minhas-vagas/editar-vaga/editar-vaga';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Edita vagaId',
};

const EditarVaga = ({params}:any) => {

    return <EditarVagaExistente id={params.editaId} />;
  };

  export default EditarVaga;

