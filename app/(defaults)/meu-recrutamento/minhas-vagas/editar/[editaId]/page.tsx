import FormularioVaga from '@/presentation/pages/meu-recrutamento/minhas-vagas/formulario/formulario-vaga';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Edita vagaId',
};

const EditarVaga = ({params}:any) => {

    return <FormularioVaga vagaId={params.editaId} />;
  };

  export default EditarVaga;

