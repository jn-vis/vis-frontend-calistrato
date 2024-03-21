
import EditarVagaExistente from '@/components/meu-recrutamento/minhas-vagas/edita-vaga/editar-vaga';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Edita vagaId',
};

const EditarVaga = ({params}:any) => {

    return <EditarVagaExistente id={params.editaId} />;
  };

  export default EditarVaga;

