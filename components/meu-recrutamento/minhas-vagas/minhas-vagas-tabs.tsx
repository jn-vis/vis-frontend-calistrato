'use client';
import IconHome from '@/components/icon/icon-home';
import React, { useState } from 'react';
import MinhasVagasLista from './minhas-vagas-lista';
import MinhasVagasEncerradas from './encerradas/minhas-vagas-encerradas';

export const MinhasVagasTabs = () => {
    const [tabs, setTabs] = useState<string>('home');
    const toggleTabs = (name: string) => {
        setTabs(name);
    };


    return (
        <div className="pt-5">
            <div>
                <ul className="mb-5 overflow-y-auto whitespace-nowrap border-b border-[#ebedf2] font-semibold dark:border-[#191e3a] sm:flex">
                    <li className="inline-block">
                        <button
                            onClick={() => toggleTabs('home')}
                            className={`flex items-center gap-2 border-b border-transparent p-4 hover:border-primary hover:text-primary ${tabs === 'home' ? '!border-primary text-primary' : ''}`}
                        >
                            <IconHome />
                            Em aberto
                        </button>
                    </li>
                    <li className="inline-block">
                        <button
                            onClick={() => toggleTabs('encerradas')}
                            className={`flex gap-2 border-b border-transparent p-4 hover:border-primary hover:text-primary ${tabs === 'encerradas' ? '!border-primary text-primary' : ''}`}
                        >
                            Encerradas
                        </button>
                    </li>
                </ul>
            </div>
            {tabs === 'home' ? (
                <div>
                    <MinhasVagasLista />
                </div>
            ) : (
                ''
            )}
             {tabs === 'encerradas' ? (
                <div>
                    <div className="mt-3 flex flex-row gap-6 pb-4 sm:col-span-2">
                    </div>
                    <MinhasVagasEncerradas />
                </div>
            ) : (
                ''
            )}
        </div>
    );
};
