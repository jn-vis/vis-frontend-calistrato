'use client';

import React from 'react';
import { useVagas } from '@/presentation/contexts/vagasContex';
import IconAward from '@/presentation/icons/icon-award';

interface OptionsVagasProps {
    onSelect: (tipo: 'ativas' | 'encerradas') => void;
}

export const OptionsVagas: React.FC<OptionsVagasProps> = ({ onSelect }) => {

    const receiptOptions = [
        {
            iconName: 'truck',
            id: 'realizar-recebimento',
            name: 'Ativas',
            description: 'Vagas ativas',
            receiptMode: 'ativas' as const,
        },
        {
            iconName: 'fileSearchV2',
            id: 'visualizar-historico',
            name: 'Encerradas',
            description: 'Vagas encerradas',
            receiptMode: 'encerradas' as const,
        },
    ];

    return (
        <div>
            <div className="mb-[12px] flex flex-grow-0 flex-col items-stretch justify-start gap-[8px] self-stretch ">
                <span className="font-barlow flex-grow-0 self-stretch text-left text-[24px] font-bold leading-[30px] tracking-[-0.6px] text-gray-900 md:text-center md:text-[30px] lg:text-left">
                    Quais Vagas você deseja visualizar?
                </span>
                <p className="font-barlow flex-grow-0 self-stretch text-left text-[14px] tracking-[-0.6px] text-gray-500 md:text-center lg:text-left">
                    Selecione quais das listas de vagas que você deseja visualizar.
                </p>
            </div>
            <ul className="grid w-full grid-cols-2 gap-[8px] sm:grid-cols-2 sm:gap-[16px] lg:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-6">
                {receiptOptions.map((receiptOption) => (
                    <div key={receiptOption.id} className="cursor-pointer" onClick={() => onSelect(receiptOption.receiptMode)}>
                        <div className="mt-[8px] rounded-[12px] bg-white">
                            <div className="border-b-[1px] border-gray-400/20">
                                <div className="flex justify-between p-[16px]">
                                    <div className="flex gap-[16px] ">
                                        <div className="flex h-[40px] w-[40px] flex-row items-center justify-center gap-[13px] rounded-[6px] bg-green-50 p-[10px]">
                                            <IconAward className="h-[20px] w-[20px]" />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="font-barlow text-gray-7000 text-[16px] font-bold leading-normal">{receiptOption.name}</span>
                                            <span className="font-barlow text-gray-5000 h-10 flex-grow text-left text-sm font-normal leading-6">{receiptOption.description}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </ul>
        </div>
    );
};
