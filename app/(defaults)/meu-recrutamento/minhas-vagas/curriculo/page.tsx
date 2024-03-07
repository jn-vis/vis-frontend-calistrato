
import MeusCurriculosLista from '@/components/meu-recrutamento/minhas-vagas/curriculos/meus-curriculos-lista';
import { Metadata } from 'next';
import Link from 'next/link';
import React from 'react';

export const metadata: Metadata = {
    title: 'Account Setting',
};

const Curriculos = () => {
    return (
        <div>
            <ul className="flex space-x-2 rtl:space-x-reverse mb-12">
                <li>
                    <Link href="#" className="text-primary hover:underline">
                       Meus curriculos
                    </Link>
                </li>
            </ul>
            <MeusCurriculosLista />
        </div>
    );
};

export default Curriculos;
