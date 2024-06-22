import { MinhasVagasTabs } from '@/presentation/pages/meu-recrutamento/minhas-vagas/components/minhas-vagas-tabs';
import { Metadata } from 'next';
import Link from 'next/link';
import React from 'react';

export const metadata: Metadata = {
    title: 'Minhas vagas',
};

const MinhasVagas = () => {
    return (
        <div>
            <ul className="flex space-x-2 rtl:space-x-reverse">
                <li>
                    <Link href="#" className="text-primary hover:underline">
                    Minhas Vagas
                    </Link>
                </li>
            </ul>
            <MinhasVagasTabs />
        </div>
    );
};

export default MinhasVagas;
