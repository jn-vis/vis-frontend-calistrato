'use client';
import IconHome from '@/components/icon/icon-home';
import React, { useState } from 'react';
import { SobreMimComponente } from './sobre-mim-componente';


export const SobreMimTabs = () => {
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
                            onClick={() => toggleTabs('sobremim')}
                            className={`flex items-center gap-2 border-b border-transparent p-4 hover:border-primary hover:text-primary ${tabs === 'sobremim' ? '!border-primary text-primary' : ''}`}
                        >
                            <IconHome />
                            Meus Dados
                        </button>
                    </li>
                    <li className="inline-block">
                        <button
                            onClick={() => toggleTabs('viscurriculo')}
                            className={`flex gap-2 border-b border-transparent p-4 hover:border-primary hover:text-primary ${tabs === 'viscurriculo' ? '!border-primary text-primary' : ''}`}
                        >
                            Visualizar meu currículo
                        </button>
                    </li>
                </ul>
            </div>
            {tabs === 'sobremim' ? (
                <div>
                    <SobreMimComponente />
                </div>
            ) : (
                ''
            )}
             {tabs === 'viscurriculo' ? (
                <div>
                    <div className="mt-3 flex flex-row gap-6 pb-4 sm:col-span-2">
                    </div>
                    {/* <SobreMimComponente /> */}
                </div>
            ) : (
                ''
            )}
        </div>
    );
};
