'use client';
import IconHome from '@/components/icon/icon-home';
import IconThumbUp from '@/components/icon/icon-thumb-up';
import IconUser from '@/components/icon/icon-user';
import { estados } from '@/components/jsons-mock/estados';
import { pcd } from '@/components/jsons-mock/pcd';
import PanelCodeHighlight from '@/components/utils/panel-code-highlight';
import React, { useState } from 'react';
import ComponentsTablesValorServico from '../nova-vaga/components-tables-valor-servico';


const EditarVagaExiste = () => {
    const [activeTab4, setActiveTab4] = useState<any>(1);
    const [checkHomeOffice, setCheckHomeOffice] = useState(true);
    const [checkPcd, setCheckPcd] = useState(false);
    const [left, setLeft] = useState(['Nest', 'Go', 'React']);
    const [right, setRight] = useState(['Node', 'Typescript', 'Vue']);
    const [checked, setChecked] = useState<string[]>([]);
    const [leftChecked, setLeftChecked] = useState<string[]>([]);
    const [rightChecked, setRightChecked] = useState<string[]>([]);
    const [newItem, setNewItem] = useState('');

    const handleChangeHome = () => {
        setCheckHomeOffice(!checkHomeOffice);
    };

    const handleChangePcd = () => {
        setCheckPcd(!checkPcd);
    };

    const handleToggle = (value: string) => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);

        setLeftChecked(left.filter((item) => newChecked.includes(item)));
        setRightChecked(right.filter((item) => newChecked.includes(item)));
    };

    const handleCheckedRight = () => {
        setRight(right.concat(checked));
        setLeft(left.filter((value) => !checked.includes(value)));
        setChecked([]);
    };

    const handleCheckedLeft = () => {
        setLeft(left.concat(checked));
        setRight(right.filter((value) => !checked.includes(value)));
        setChecked([]);
    };

    const handleDelete = () => {
        setLeft(left.filter((item) => !checked.includes(item)));
        setRight(right.filter((item) => !checked.includes(item)));
        setChecked([]);
    };

    const customList = (title: string, items: string[], checkedItems: string[], handleToggle: (value: string) => void) => (
        <div className="m-2 w-64 rounded border p-4" style={{ maxHeight: '9rem', overflow: 'auto' }}>
            <h1 className="mb-2 font-bold">{title}</h1>
            <ul>
                {items.map((item, index) => (
                    <li key={index} className="my-1 flex items-center">
                        <input type="checkbox" checked={checkedItems.includes(item)} onChange={() => handleToggle(item)} />
                        <span className="ml-2">{item}</span>
                    </li>
                ))}
            </ul>
        </div>
    );

    const handleNewItemChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewItem(event.target.value);
    };

    const handleNewItemSubmit = () => {
        if (newItem) {
            setLeft([...left, newItem]);
            setNewItem('');
        }
    };

    return (
        <PanelCodeHighlight title="Editar Vaga">
            <div className="mb-5">
                <div className="inline-block w-full">
                    <div className="relative z-[1] overflow-x-auto">
                        <div
                            className={`${activeTab4 === 1 ? 'w-[10%]' : activeTab4 === 2 ? 'w-[30%]' : activeTab4 === 3 ? 'w-[50%]' : activeTab4 === 4 ? 'w-[70%]' : 'w-[90%]'}

                                        absolute top-[30px] -z-[1] m-auto h-1 w-[15%] bg-primary transition-[width] ltr:left-0 rtl:right-0`}
                        ></div>
                        <ul className="mb-5 grid min-w-[500px] grid-cols-5">
                            <li className="mx-auto flex flex-col items-center">
                                <button
                                    type="button"
                                    className={`${activeTab4 === 1 ? '!border-primary !bg-primary text-white' : ''}
                    flex h-16 w-16 items-center justify-center rounded-full border-[3px] border-[#f3f2ee] bg-white dark:border-[#1b2e4b] dark:bg-[#253b5c]`}
                                    onClick={() => setActiveTab4(1)}
                                >
                                    <IconHome />
                                </button>
                                <span className={`${activeTab4 === 1 ? 'text-primary ' : ''}text-center mt-2 block`}>Dados Básicos</span>
                            </li>
                            <li className="mx-auto flex flex-col items-center">
                                <button
                                    type="button"
                                    className={`${activeTab4 === 2 ? '!border-primary !bg-primary text-white' : ''}
                                                flex h-16 w-16 items-center justify-center rounded-full border-[3px] border-[#f3f2ee] bg-white dark:border-[#1b2e4b] dark:bg-[#253b5c]`}
                                    onClick={() => setActiveTab4(2)}
                                >
                                    <IconUser className="h-5 w-5" />
                                </button>
                                <span className={`${activeTab4 === 2 ? 'text-primary ' : ''}text-center mt-2 block`}>Filtrar candidatos</span>
                            </li>
                            <li className="mx-auto flex flex-col items-center">
                                <button
                                    type="button"
                                    className={`${activeTab4 === 3 ? '!border-primary !bg-primary text-white' : ''}
                                                flex h-16 w-16 items-center justify-center rounded-full border-[3px] border-[#f3f2ee] bg-white dark:border-[#1b2e4b] dark:bg-[#253b5c]`}
                                    onClick={() => setActiveTab4(3)}
                                >
                                    <IconThumbUp className="h-5 w-5" />
                                </button>
                                <span className={`${activeTab4 === 3 ? 'text-primary ' : ''}text-center mt-2 block`}>Filtrar requisitos</span>
                            </li>
                            <li className="mx-auto flex flex-col items-center">
                                <button
                                    type="button"
                                    className={`${activeTab4 === 4 ? '!border-primary !bg-primary text-white' : ''}
                            flex h-16 w-16 items-center justify-center rounded-full border-[3px] border-[#f3f2ee] bg-white dark:border-[#1b2e4b] dark:bg-[#253b5c]`}
                                    onClick={() => setActiveTab4(4)}
                                >
                                    <IconThumbUp className="h-5 w-5" />
                                </button>
                                <span className={`${activeTab4 === 4 ? 'text-primary ' : ''}text-center mt-2 block`}>Ordenar candidatos</span>
                            </li>
                            <li className="mx-auto flex flex-col items-center">
                                <button
                                    type="button"
                                    className={`${activeTab4 === 5 ? '!border-primary !bg-primary text-white' : ''}
                            flex h-16 w-16 items-center justify-center rounded-full border-[3px] border-[#f3f2ee] bg-white dark:border-[#1b2e4b] dark:bg-[#253b5c]`}
                                    onClick={() => setActiveTab4(5)}
                                >
                                    <IconThumbUp className="h-5 w-5" />
                                </button>
                                <span className={`${activeTab4 === 5 ? 'text-primary ' : ''}text-center mt-2 block`}>Serviços Extras</span>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <div className="mb-5">
                            {activeTab4 === 1 && (
                                <>
                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Título da Vaga</label>
                                        <input
                                            type="text"
                                            name="vaga"
                                            id="vaga"
                                            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-600 focus:ring-blue-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                                            placeholder="vaga.example"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Data limite da vaga</label>
                                        <input
                                            type="date"
                                            name="data"
                                            id="data"
                                            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-600 focus:ring-blue-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                                            placeholder="name@company.com"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Contato</label>
                                        <input
                                            type="text"
                                            name="contato"
                                            id="contato"
                                            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-600 focus:ring-blue-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                                            placeholder="name@company.com"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Descrição da vaga</label>
                                        <textarea
                                            name="descricao"
                                            id="descricao"
                                            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-600 focus:ring-blue-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                                            placeholder="name@company.com"
                                            required
                                        />
                                    </div>
                                </>
                            )}
                        </div>

                        <div className="mb-5">
                            {activeTab4 === 2 && (
                                <>
                                    <div>
                                        <div>
                                            <label className="inline-flex cursor-pointer">
                                                <input type="checkbox" className="form-checkbox" onChange={handleChangeHome} checked={checkHomeOffice} />
                                                <span className="relative text-white-dark checked:bg-none">Somente Home Office</span>
                                            </label>
                                        </div>
                                        <label htmlFor="country">Selecione a região da Vaga anunciada</label>
                                        <select disabled={checkHomeOffice} id="country" className="form-select text-white-dark" name="country" defaultValue="United States">
                                            {estados.map((estado) => {
                                                return <option value={estado.id}>{estado.nome}</option>;
                                            })}
                                        </select>
                                    </div>
                                    <div>
                                        <div>
                                            <label className="inline-flex cursor-pointer">
                                                <input checked={checkPcd} onChange={handleChangePcd} type="checkbox" className="form-checkbox" />
                                                <span className="relative text-white-dark checked:bg-none">Vaga exclusiva (PCD)</span>
                                            </label>
                                        </div>
                                        <label htmlFor="country">Selecione a deficiência</label>
                                        <select disabled={!checkPcd} id="country" className="form-select text-white-dark" name="country" defaultValue="United States">
                                            {pcd.map((pcd) => {
                                                return <option value={pcd.id}>{pcd.nome}</option>;
                                            })}
                                        </select>
                                    </div>
                                    <div>
                                        <label htmlFor="web">Pagamento Mensal Pessoa Jurídica</label>
                                        <input id="web" type="text" placeholder="Ex. R$15.000,00" className="form-input" />
                                    </div>
                                    <div>
                                        <label htmlFor="web">Pagamento Mensal Carteira Assinada</label>
                                        <input id="web" type="text" placeholder="Ex. R$10.000,00" className="form-input" />
                                    </div>
                                    <div>
                                        <label htmlFor="web">Pagamento Mensal BTC</label>
                                        <input id="web" type="text" placeholder="Ex. 0,039฿ " className="form-input" />
                                    </div>
                                </>
                            )}
                        </div>

                        <div className="mb-5">
                            {activeTab4 === 3 && (
                                <>
                                    <div className="flex flex-col items-center justify-center sm:flex-row">
                                        {customList('Obrigatórios', left, checked, handleToggle)}
                                        <div className="mx-2 flex items-center sm:flex-col">
                                            <button className="my-2 rounded border border-gray-300 px-4 py-2" onClick={handleCheckedRight} disabled={leftChecked.length === 0}>
                                                {'>>'}
                                            </button>
                                            <button className="my-2 rounded border border-gray-300 px-4 py-2" onClick={handleCheckedLeft} disabled={rightChecked.length === 0}>
                                                {'<<'}
                                            </button>
                                            <button className="btn btn-outline-danger my-2 rounded border px-4 py-2" onClick={handleDelete} disabled={checked.length === 0}>
                                                {'Excluir'}
                                            </button>
                                        </div>
                                        {customList('Desejáveis', right, checked, handleToggle)}
                                        <div className="text-center">
                                            <label htmlFor="new-item">Adicionar Itens</label>
                                            <div className="mx-2 flex flex-row items-center">
                                                <input id="new-item" type="text" placeholder="+ java" className="form-input" value={newItem} onChange={handleNewItemChange} />
                                                <button className="btn btn-primary my-2 rounded border px-4 py-2" onClick={handleNewItemSubmit}>
                                                    {'Adicionar'}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                        <div className="mb-5">
                            {activeTab4 === 4 && (
                                <>
                                    <div className="flex flex-col items-center justify-center sm:flex-row">
                                        {customList('Obrigatórios', left, checked, handleToggle)}
                                        <div className="mx-2 flex items-center sm:flex-col">
                                            <button className="my-2 rounded border border-gray-300 px-4 py-2" onClick={handleCheckedRight} disabled={leftChecked.length === 0}>
                                                {'>>'}
                                            </button>
                                            <button className="my-2 rounded border border-gray-300 px-4 py-2" onClick={handleCheckedLeft} disabled={rightChecked.length === 0}>
                                                {'<<'}
                                            </button>
                                            <button className="btn btn-outline-danger my-2 rounded border px-4 py-2" onClick={handleDelete} disabled={checked.length === 0}>
                                                {'Excluir'}
                                            </button>
                                        </div>
                                        {customList('Desejáveis', right, checked, handleToggle)}
                                    </div>
                                </>
                            )}
                        </div>

                        <div className="mb-5">
                            {activeTab4 === 5 && (
                                <>
                                    <ComponentsTablesValorServico />
                                </>
                            )}
                        </div>
                    </div>
                    <div className="flex justify-between">
                        <button type="button" className={`btn btn-primary ${activeTab4 === 1 ? 'hidden' : ''}`} onClick={() => setActiveTab4(activeTab4 > 1 ? activeTab4 - 1 : 1)}>
                            Back
                        </button>
                        <button type="button" className="btn btn-primary ltr:ml-auto rtl:mr-auto" onClick={() => setActiveTab4(activeTab4 < 5 ? activeTab4 + 1 : 5)}>
                            {activeTab4 === 5 ? 'Finish' : 'Next'}
                        </button>
                    </div>
                </div>
            </div>
        </PanelCodeHighlight>
    );
};

export default EditarVagaExiste;
