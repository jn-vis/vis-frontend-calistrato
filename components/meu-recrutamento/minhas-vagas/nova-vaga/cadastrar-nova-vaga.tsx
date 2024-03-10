'use client';
import IconHome from '@/components/icon/icon-home';
import IconUser from '@/components/icon/icon-user';
import { estados } from '@/components/jsons-mock/estados';
import { pcd } from '@/components/jsons-mock/pcd';
import PanelCodeHighlight from '@/components/utils/panel-code-highlight';
import React, { useState } from 'react';
import ComponentsTablesValorServico from './components-tables-valor-servico';
import IconNotesEdit from '@/components/icon/icon-notes-edit';
import IconDollarSignCircle from '@/components/icon/icon-dollar-sign-circle';
import IconListCheck from '@/components/icon/icon-list-check';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ReactSortable } from 'react-sortablejs';
import { postVagas } from '@/infra/service/vagas-service';

const schema = z.object({
    vaga: z.string(),
    datalimite: z.string(),
    contato: z.string(),
    descricao: z.string(),
    pagamentopj: z.string(),
    pagamentoclt: z.string(),
    pagamentobtc: z.string(),
    // homeOffice: z.boolean().default(true),
    // pcd: z.boolean().default(false),
    // country: z.string(),
    // deficiencia: z.string(),
    // obrigatorios: z.array(
    //     z.object({
    //         id: z.number(),
    //         text: z.string(),
    //     }
    // )),
    // desejaveis: z.array(
    //     z.object({
    //         id: z.number(),
    //         text: z.string(),
    //     }
    // )),
});

const CadastrarNovaVaga = () => {
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

    const { register, handleSubmit } = useForm({
        resolver: zodResolver(schema),
    });

    // const { fields, append, remove } = useFieldArray({
    //     control,
    //     name: 'obrigatorios',
    // });

    const onSubmit = async (data: any) => {
        const response = await postVagas(data);
    };

    const items1 = [
        {
            id: 1,
            text: 'Senioridade',
        },
        {
            id: 2,
            text: 'Pretensão Pj',
        },
        {
            id: 3,
            text: 'Pretensão Clt',
        },
        {
            id: 4,
            text: 'Pretensao Btc',
        },
        {
            id: 5,
            text: 'Dias de disponibilidade',
        },
        {
            id: 6,
            text: 'Requisitos desejaveis',
        },
        {
            id: 7,
            text: 'Reputação geral',
        },
    ];
    const [sortable1, setSortable1] = useState(items1);

    return (
        <PanelCodeHighlight title="Cadastro de vaga">
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
                                    <IconListCheck className="h-5 w-5" />
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
                                    <IconNotesEdit className="h-5 w-5" />
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
                                    <IconDollarSignCircle className="h-5 w-5" />
                                </button>
                                <span className={`${activeTab4 === 5 ? 'text-primary ' : ''}text-center mt-2 block`}>Serviços Extras</span>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="mb-5">
                                {activeTab4 === 1 && (
                                    <>
                                        <div>
                                            <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Título da Vaga</label>
                                            <input
                                                {...register('vaga')}
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
                                                {...register('datalimite')}
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
                                                {...register('contato')}
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
                                                {...register('descricao')}
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
                                    <div>
                                        <div>
                                            <div>
                                                <label className="inline-flex cursor-pointer">
                                                    <input {...register('homeOffice')} type="checkbox" className="form-checkbox" onChange={handleChangeHome} checked={checkHomeOffice} />
                                                    <span className="relative text-white-dark checked:bg-none">Somente Home Office</span>
                                                </label>
                                            </div>
                                            <label htmlFor="country">Selecione a região da Vaga anunciada</label>
                                            <select
                                                {...register('country')}
                                                disabled={checkHomeOffice}
                                                id="country"
                                                className="form-select text-white-dark"
                                                name="country"
                                                defaultValue="United States"
                                            >
                                                {estados.map((estado) => {
                                                    return <option value={estado.id}>{estado.nome}</option>;
                                                })}
                                            </select>
                                        </div>
                                        <div>
                                            <div>
                                                <label className="inline-flex cursor-pointer">
                                                    <input {...register('pcd')} checked={checkPcd} onChange={handleChangePcd} type="checkbox" className="form-checkbox" />
                                                    <span className="relative text-white-dark checked:bg-none">Vaga exclusiva (PCD)</span>
                                                </label>
                                            </div>
                                            <label htmlFor="deficiencia">Selecione a deficiência</label>
                                            <select {...register('deficiencia')} disabled={!checkPcd} id="deficiencia" className="form-select text-white-dark" name="deficiencia" defaultValue="United States">
                                                {pcd.map((pcd) => {
                                                    return <option value={pcd.id}>{pcd.nome}</option>;
                                                })}
                                            </select>
                                        </div>
                                        <div>
                                            <label htmlFor="web">Pagamento Mensal Pessoa Jurídica</label>
                                            <input {...register('pagamentopj')} id="web" type="text" placeholder="Ex. R$15.000,00" className="form-input" />
                                        </div>
                                        <div>
                                            <label htmlFor="web">Pagamento Mensal Carteira Assinada</label>
                                            <input {...register('pagamentoclt')} id="web" type="text" placeholder="Ex. R$10.000,00" className="form-input" />
                                        </div>
                                        <div>
                                            <label htmlFor="web">Pagamento Mensal BTC</label>
                                            <input {...register('pagamentobtc')} id="web" type="text" placeholder="Ex. 0,039฿ " className="form-input" />
                                        </div>
                                    </div>
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
                                        <div className="panel">
                                            <div className="mb-5 text-lg font-semibold">Ordenar critérios candidatos</div>
                                            <div className="gap-x-12 sm:grid-cols-2">
                                                    <ul id="example1">
                                                        <ReactSortable list={sortable1} setList={setSortable1} animation={200} delay={2} ghostClass="gu-transit" group="shared">
                                                            {sortable1.map((item) => {
                                                                return (
                                                                    <li key={item.id} className="mb-2.5 cursor-grab">
                                                                        <div className="items-md-center flex flex-col rounded-md border border-white-light bg-white px-6 py-3.5 text-center dark:border-dark dark:bg-[#1b2e4b] md:flex-row ltr:md:text-left rtl:md:text-right">
                                                                            <div className="flex flex-1 flex-col items-center justify-between md:flex-row">
                                                                                <div className="my-3 font-semibold md:my-0">
                                                                                    <div className="text-base text-dark dark:text-[#bfc9d4]">{item.text}</div>
                                                                                </div>
                                                                                <div></div>
                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                );
                                                            })}
                                                        </ReactSortable>
                                                    </ul>
                                            </div>
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
                            <div className="flex justify-between">
                                <button type="button" className={`btn btn-primary ${activeTab4 === 1 ? 'hidden' : ''}`} onClick={() => setActiveTab4(activeTab4 > 1 ? activeTab4 - 1 : 1)}>
                                    Voltar
                                </button>
                                {activeTab4 < 5 ? (
                                    <button type="button" className="btn btn-primary ltr:ml-auto rtl:mr-auto" onClick={() => setActiveTab4(activeTab4 + 1)}>
                                        Avançar
                                    </button>
                                ) : (
                                    <button type="submit" className="btn btn-primary ltr:ml-auto rtl:mr-auto">
                                        Salvar
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </PanelCodeHighlight>
    );
};

export default CadastrarNovaVaga;
