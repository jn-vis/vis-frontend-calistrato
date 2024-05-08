
import EditarVagaExistente from '@/presentation/components/meu-recrutamento/minhas-vagas/editar-vaga/editar-vaga';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Edita vaga',
};

const EditarVaga = () => {

    return <EditarVagaExistente  />;
  };

  export default EditarVaga;
