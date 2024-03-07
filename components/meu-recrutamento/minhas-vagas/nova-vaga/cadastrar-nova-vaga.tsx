'use client';
import { estados } from '@/components/jsons-mock/estados';
import { pcd } from '@/components/jsons-mock/pcd';
import ComponentsTablesValorServico from '@/components/meu-recrutamento/minhas-vagas/nova-vaga/components-tables-valor-servico';
import { useState } from 'react';

const CadastrarNovaVaga = () => {
    const [step, setStep] = useState(0);
    const [checkHomeOffice, setCheckHomeOffice] = useState(true);
    const [checkPcd, setCheckPcd] = useState(false);
    const [left, setLeft] = useState(['Nest', 'Go', 'React']);
    const [right, setRight] = useState(['Node', 'Typescript', 'Vue']);
    const [checked, setChecked] = useState<string[]>([]);
    const [leftChecked, setLeftChecked] = useState<string[]>([]);
    const [rightChecked, setRightChecked] = useState<string[]>([]);
    const [newItem, setNewItem] = useState('');
    // const [tabIndex, setTabIndex] = useState(0);

    const nextStep = (event: React.FormEvent) => {
        event.preventDefault();
        setStep(step + 1);
    };

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
        <div className="p-5">
            <ol className="mb-5 grid w-full grid-cols-3 grid-rows-2 items-center gap-4 text-center text-sm font-medium text-gray-500 dark:text-gray-400 sm:grid-cols-5 sm:text-base">
                <li
                    className={`after:border-1 flex items-center after:mx-6 after:hidden after:h-1 after:w-full after:border-b after:border-gray-200 dark:after:border-gray-700 sm:after:inline-block sm:after:content-[''] md:w-full xl:after:mx-10 ${
                        step >= 0 ? 'text-blue-600 dark:text-blue-500' : ''
                    }`}
                >
                    <span className="flex items-center after:mx-2 after:text-gray-200 after:content-['/'] dark:after:text-gray-500 sm:after:hidden">
                        Dados Básicos <span className="hidden sm:ms-2 sm:inline-flex"></span>
                    </span>
                </li>
                <li
                    className={`after:border-1 flex items-center after:mx-6 after:hidden after:h-1 after:w-full after:border-b after:border-gray-200 dark:after:border-gray-700 sm:after:inline-block sm:after:content-[''] md:w-full xl:after:mx-10 ${
                        step >= 1 ? 'text-blue-600 dark:text-blue-500' : ''
                    }`}
                >
                    <span className="flex items-center after:mx-2 after:text-gray-200 after:content-['/'] dark:after:text-gray-500 sm:after:hidden">
                        Filtrar candidatos <span className="hidden sm:ms-2 sm:inline-flex"></span>
                    </span>
                </li>
                <li
                    className={`after:border-1 flex items-center after:mx-6 after:hidden after:h-1 after:w-full after:border-b after:border-gray-200 dark:after:border-gray-700 sm:after:inline-block sm:after:content-[''] md:w-full xl:after:mx-10 ${
                        step >= 2 ? 'text-blue-600 dark:text-blue-500' : ''
                    }`}
                >
                    <span className="flex items-center after:mx-2 after:text-gray-200 after:content-['/'] dark:after:text-gray-500 sm:after:hidden">
                        Filtrar requisitos <span className="hidden sm:ms-2 sm:inline-flex"></span>
                    </span>
                </li>
                <li
                    className={`after:border-1 flex items-center after:mx-6 after:hidden after:h-1 after:w-full after:border-b after:border-gray-200 dark:after:border-gray-700 sm:after:inline-block sm:after:content-[''] md:w-full xl:after:mx-10 ${
                        step >= 3 ? 'text-blue-600 dark:text-blue-500' : ''
                    }`}
                >
                    <span className="flex items-center after:mx-2 after:text-gray-200 after:content-['/'] dark:after:text-gray-500 sm:after:hidden">
                        Ordenar candidatos <span className="hidden sm:ms-2 sm:inline-flex"></span>
                    </span>
                </li>
                <li
                    className={` flex items-center after:mx-6 after:hidden after:h-1 after:w-full dark:after:border-gray-700 sm:after:inline-block sm:after:content-[''] md:w-full xl:after:mx-10 ${
                        step >= 4 ? 'text-blue-600 dark:text-blue-500' : ''
                    }`}
                >
                    Serviços Extras
                </li>
            </ol>

            <form onSubmit={nextStep}>
                <div className="mb-4 grid gap-4 sm:grid-cols-2">
                    {step === 0 && (
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

                <div className="mb-4 grid gap-4 sm:grid-cols-2">
                    {step === 1 && (
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

                <div className="mb-4 grid gap-4">
                    {step === 2 && (
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

                <div className="mb-4 grid gap-4">
                    {step === 3 && (
                        <>
                            <div className="flex flex-col sm:flex-row items-center justify-center">
                                {customList('Obrigatórios', left, checked, handleToggle)}
                                <div className="mx-2 flex sm:flex-col items-center">
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
                <div className="mb-4 grid gap-4">
                {step === 4 && (
                        <>
                        <ComponentsTablesValorServico />
                        </>
                     )}
                </div>
                <div className='flex justify-around'>
                <button
                    type="submit"
                    className="rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    Voltar
                </button>
                <button
                    type="submit"
                    className="rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    {step < 4 ? 'Avançar' : 'Salvar'}
                </button>
                </div>
            </form>
        </div>
    );
};

export default CadastrarNovaVaga;
