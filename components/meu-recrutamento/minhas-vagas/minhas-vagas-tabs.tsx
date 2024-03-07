'use client';
// import ModalNovaVaga from '@/app/(defaults)/meu-recrutamento/minhas-vagas/nova-vaga/nova-vaga-modal';
// import { NovaVaga } from '@/components/modals/components-modal-nova-vaga';
import IconHome from '@/components/icon/icon-home';
import React, { useState } from 'react';
import CadastrarNovaVaga from './nova-vaga/cadastrar-nova-vaga';
import IconCircleCheck from '@/components/icon/icon-circle-check';
import MinhasVagasLista from './minhas-vagas-lista';

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
                            onClick={() => toggleTabs('payment-details')}
                            className={`flex gap-2 border-b border-transparent p-4 hover:border-primary hover:text-primary ${tabs === 'payment-details' ? '!border-primary text-primary' : ''}`}
                        >
                            Encerradas
                        </button>
                    </li>
                    <li className="inline-block">
                        <button
                            onClick={() => toggleTabs('nova-vaga')}
                            className={`flex items-center gap-2 border-b border-transparent p-4 hover:border-primary hover:text-primary ${tabs === 'nova-vaga' ? '!border-primary text-primary' : ''}`}
                        >
                            <IconCircleCheck />
                            Cadastrar nova vaga
                        </button>
                    </li>
                </ul>
            </div>
            {tabs === 'home' ? (
                <div>
                    {/* <div className="mt-3 flex flex-row gap-6 pb-4 sm:col-span-2">
                        <button type="button" className="btn btn-primary" onClick={handleClick}>
                            Nova Vaga
                        </button>
                    </div> */}
                    <MinhasVagasLista />
                    {/* <NovaVaga modal18={modal18} setModal18={setModal18} /> */}
                </div>
            ) : (
                ''
            )}
             {tabs === 'nova-vaga' ? (
                <div>
                    <div className="mt-3 flex flex-row gap-6 pb-4 sm:col-span-2">
                    </div>
                    <CadastrarNovaVaga />
                </div>
            ) : (
                ''
            )}
        </div>
    );
};
