
import CadastrarNovaVaga from '@/presentation/pages/meu-recrutamento/minhas-vagas/crud-vagas/cadastrar-nova-vaga';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: 'Nova vaga',
};

const NovaVaga = () => {
    return <CadastrarNovaVaga />;
};

export default NovaVaga;
