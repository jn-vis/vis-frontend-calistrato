'use client';
import IconHome from '@/presentation/icons/icon-home';
import React, { useState } from 'react';

import ListaDeVagas from './lista-vagas/lista-vagas-ativas';
import { Tabs } from '@mantine/core';
import { useVagas } from '@/presentation/contexts/vagasContex';


export const MinhasVagasTabs = () => {
    const [activeTab, setActiveTab] = useState<string | null>('ativas');
    const { recordsData } = useVagas();

    return (
        <div className="pt-5">
            <Tabs value={activeTab} onTabChange={setActiveTab}>
                <Tabs.List>
                    <Tabs.Tab value="ativas" icon={<IconHome />}>
                        Em aberto
                    </Tabs.Tab>
                    <Tabs.Tab value="encerradas">Encerradas</Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel value="ativas">
                    <ListaDeVagas vagas={recordsData.ativas} tipo="ativas" />
                </Tabs.Panel>

                <Tabs.Panel value="encerradas">
                    <div className=" flex flex-row gap-6 sm:col-span-2"></div>
                    <ListaDeVagas vagas={recordsData.encerradas} tipo="encerradas" />
                </Tabs.Panel>
            </Tabs>
        </div>
    );
};
