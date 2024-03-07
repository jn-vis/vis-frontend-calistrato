import { SobreMimComponente } from '@/components/meus-dados/sobre-mim/sobre-mim-componente';
import { getTranslation } from '@/i18n';
import { Metadata } from 'next';
import Link from 'next/link';
import React from 'react';

export const metadata: Metadata = {
    title: 'Account Setting',
};

const SobreMim = () => {
    const { t } = getTranslation();
    return (
        <div>
            <ul className="flex space-x-2 rtl:space-x-reverse">
                <li>
                    <Link href="#" className="text-primary hover:underline">
                    {t('about_me')}
                    </Link>
                </li>
            </ul>
            <SobreMimComponente />
        </div>
    );
};

export default SobreMim;
