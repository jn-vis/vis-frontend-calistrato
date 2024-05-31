
import EditarVagaExistente from '@/presentation/components/meu-recrutamento/minhas-vagas/editar-vaga/editar-vaga';
import CadastrarNovaVaga from '@/presentation/pages/meu-recrutamento/minhas-vagas/crud-vagas/formulario-vaga';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Edita vaga',
};

const EditarVaga = () => {

    return <CadastrarNovaVaga />;
  };

  export default EditarVaga;
