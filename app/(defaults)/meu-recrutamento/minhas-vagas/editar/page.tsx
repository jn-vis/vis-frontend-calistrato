
import EditarVagaExistente from '@/components/meu-recrutamento/minhas-vagas/edita-vaga/editar-vaga';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Edita vaga',
};

const EditarVaga = () => {

    return <EditarVagaExistente  />;
  };

  export default EditarVaga;
