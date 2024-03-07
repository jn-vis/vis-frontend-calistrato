
import CadastrarNovaVaga from '@/components/meu-recrutamento/minhas-vagas/nova-vaga/cadastrar-nova-vaga';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: 'Nova vaga',
};

const NovaVaga = () => {
    return <CadastrarNovaVaga />;
};

export default NovaVaga;
