
import EditarVagaExiste from '@/components/meu-recrutamento/minhas-vagas/edita-vaga/editar-vaga';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: 'Edita vaga',
};

const EditarVaga = () => {
    return <EditarVagaExiste />;
};

export default EditarVaga;
