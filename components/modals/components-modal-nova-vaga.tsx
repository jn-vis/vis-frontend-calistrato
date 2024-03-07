import IconX from '@/components/icon/icon-x';
import { Transition, Dialog, Tab } from '@headlessui/react';
import { Fragment, useState } from 'react';
import ComponentsTablesValorServico from '@/components/meu-recrutamento/minhas-vagas/nova-vaga/components-tables-valor-servico';

export const NovaVaga = ({ modal18, setModal18 }) => {
    const [left, setLeft] = useState(['Nest', 'Go', 'React']);
    const [right, setRight] = useState(['Node', 'Typescript', 'Vue']);
    const [checked, setChecked] = useState([]);
    const [leftChecked, setLeftChecked] = useState([]);
    const [rightChecked, setRightChecked] = useState([]);
    const [newItem, setNewItem] = useState('');
    // const [tabIndex, setTabIndex] = useState(0);
    const handleToggle = (value) => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);

        // Update leftChecked and rightChecked based on the new checked items
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
    const customList = (title, items, checkedItems, handleToggle) => (
        <div className="m-2 w-64 rounded border p-4" style={{ maxHeight: '7rem', overflow: 'auto' }}>
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

    const handleNewItemChange = (event) => {
        setNewItem(event.target.value);
    };

    const handleNewItemSubmit = () => {
        if (newItem) {
            setLeft([...left, newItem]);
            setNewItem('');
        }
    };

    // const handleNext = () => {
    //   setTabIndex((prevTabIndex) => prevTabIndex + 1);
    // };

    return (
        <>
            <div>
                <Transition appear show={modal18} as={Fragment}>
                    <Dialog as="div" open={modal18} onClose={() => setModal18(false)}>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0" />
                        </Transition.Child>
                        <div id="tabs_modal" className="fixed inset-0 z-[999] overflow-y-auto bg-[black]/60">
                            <div className="flex min-h-screen items-start justify-center px-4">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0 scale-95"
                                    enterTo="opacity-100 scale-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100 scale-100"
                                    leaveTo="opacity-0 scale-95"
                                >
                                    <Dialog.Panel className="panel my-8 w-full max-w-lg overflow-hidden rounded-lg border-0 p-0 text-black dark:text-white-dark">
                                        <div className="flex items-center justify-between bg-[#fbfbfb] px-5 py-3 dark:bg-[#121c2c]">
                                            <h5 className="text-lg font-bold">Tabs</h5>
                                            <button onClick={() => setModal18(false)} type="button" className="text-white-dark hover:text-dark">
                                                <IconX />
                                            </button>
                                        </div>
                                        <div className="p-5">
                                            <Tab.Group>
                                                <Tab.List className="mt-3 flex flex-wrap border-b border-white-light dark:border-[#191e3a]">
                                                    <Tab as={Fragment}>
                                                        {({ selected }) => (
                                                            <button
                                                                type="button"
                                                                className={`${
                                                                    selected ? '!border-white-light !border-b-white  text-primary !outline-none dark:!border-[#191e3a] dark:!border-b-black ' : ''
                                                                } -mb-[1px] block border border-transparent p-3.5 py-2 hover:text-primary dark:hover:border-b-black`}
                                                            >
                                                                Dados Básicos
                                                            </button>
                                                        )}
                                                    </Tab>
                                                    <Tab as={Fragment}>
                                                        {({ selected }) => (
                                                            <button
                                                                type="button"
                                                                className={`${
                                                                    selected ? '!border-white-light !border-b-white  text-primary !outline-none dark:!border-[#191e3a] dark:!border-b-black ' : ''
                                                                }-mb-[1px] block border border-transparent p-3.5 py-2 hover:text-primary dark:hover:border-b-black`}
                                                            >
                                                                Filtrar requisitos
                                                            </button>
                                                        )}
                                                    </Tab>
                                                    <Tab as={Fragment}>
                                                        {({ selected }) => (
                                                            <button
                                                                type="button"
                                                                className={`${
                                                                    selected ? '!border-white-light !border-b-white  text-primary !outline-none dark:!border-[#191e3a] dark:!border-b-black ' : ''
                                                                }-mb-[1px] block border border-transparent p-3.5 py-2 hover:text-primary dark:hover:border-b-black`}
                                                            >
                                                                Filtrar candidatos
                                                            </button>
                                                        )}
                                                    </Tab>
                                                    <Tab as={Fragment}>
                                                        {({ selected }) => (
                                                            <button
                                                                type="button"
                                                                className={`${
                                                                    selected ? '!border-white-light !border-b-white  text-primary !outline-none dark:!border-[#191e3a] dark:!border-b-black ' : ''
                                                                }-mb-[1px] block border border-transparent p-3.5 py-2 hover:text-primary dark:hover:border-b-black`}
                                                            >
                                                                Ordenar candidatos
                                                            </button>
                                                        )}
                                                    </Tab>
                                                    <Tab as={Fragment}>
                                                        {({ selected }) => (
                                                            <button
                                                                type="button"
                                                                className={`${
                                                                    selected ? '!border-white-light !border-b-white  text-primary !outline-none dark:!border-[#191e3a] dark:!border-b-black ' : ''
                                                                }-mb-[1px] block border border-transparent p-3.5 py-2 hover:text-primary dark:hover:border-b-black`}
                                                            >
                                                                Serviços Extras
                                                            </button>
                                                        )}
                                                    </Tab>
                                                </Tab.List>
                                                <Tab.Panels className="text-sm">
                                                    <Tab.Panel>
                                                        <div className="active pt-5">
                                                            <div>
                                                                <label htmlFor="address">Título da Vaga</label>
                                                                <input id="address" type="text" placeholder="New York" className="form-input" />
                                                            </div>
                                                            <div>
                                                                <label htmlFor="address">Descrição da vaga</label>
                                                                <input id="address" type="text" placeholder="New York" className="form-input" />
                                                            </div>
                                                            <div>
                                                                <label htmlFor="address">Contato</label>
                                                                <input id="address" type="text" placeholder="New York" className="form-input" />
                                                            </div>
                                                            <div>
                                                                <label htmlFor="address">Data limite da vaga</label>
                                                                <input id="address" type="date" placeholder="New York" className="form-input" />
                                                            </div>
                                                        </div>
                                                    </Tab.Panel>
                                                    <Tab.Panel>
                                                        <div className="flex flex-col items-center justify-center">
                                                            {customList('Obrigatórios', left, checked, handleToggle)}
                                                            <div className="mx-2 flex flex-row items-center">
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
                                                                    {/* <button onClick={handleNewItemSubmit}>Adicionar</button> */}
                                                                    <button className="btn btn-primary my-2 rounded border px-4 py-2" onClick={handleNewItemSubmit}>
                                                                        {'Adicionar'}
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Tab.Panel>
                                                    <Tab.Panel>
                                                        <div className="active pt-5">
                                                            <div className='flex flex-col mb-4'>
                                                                <div>
                                                                    <label className="inline-flex cursor-pointer">
                                                                        <input type="checkbox" className="form-checkbox" />
                                                                        <span className="relative text-white-dark checked:bg-none">Somente Home Office</span>
                                                                    </label>
                                                                </div>
                                                                <label htmlFor="country">Country</label>
                                                                <select id="country" className="form-select text-white-dark" name="country" defaultValue="United States">
                                                                    <option value="All Countries">All Countries</option>
                                                                    <option value="United States">Acre</option>
                                                                    <option value="India">Rio de Janeiro</option>
                                                                    <option value="Japan">São Paulo</option>
                                                                    <option value="China">Espirto Santo</option>
                                                                    <option value="Brazil">Brasilia</option>
                                                                </select>
                                                            </div>
                                                            <div>
                                                                <div>
                                                                    <label className="inline-flex cursor-pointer">
                                                                        <input type="checkbox" className="form-checkbox" />
                                                                        <span className="relative text-white-dark checked:bg-none">Tenho necessidades especiais (PCD)</span>
                                                                    </label>
                                                                </div>
                                                                <label htmlFor="country">Country</label>
                                                                <select id="country" className="form-select text-white-dark" name="country" defaultValue="United States">
                                                                    <option value="All Countries">All Countries</option>
                                                                    <option value="United States">Acre</option>
                                                                    <option value="India">Rio de Janeiro</option>
                                                                    <option value="Japan">São Paulo</option>
                                                                    <option value="China">Espirto Santo</option>
                                                                    <option value="Brazil">Brasilia</option>
                                                                </select>
                                                            </div>
                                                            <div>
                                                                <label htmlFor="address">Pretensão PJ</label>
                                                                <input id="address" type="text" placeholder="New York" className="form-input" />
                                                            </div>
                                                            <div>
                                                                <label htmlFor="address">Pretensão CLT</label>
                                                                <input id="address" type="text" placeholder="New York" className="form-input" />
                                                            </div>
                                                            <div>
                                                                <label htmlFor="address">Pretensão BTC</label>
                                                                <input id="address" type="text" placeholder="New York" className="form-input" />
                                                            </div>
                                                            <div>
                                                                <label htmlFor="address">Dias de disponibilidade</label>
                                                                <input id="address" type="number" placeholder="New York" className="form-input" />
                                                            </div>
                                                        </div>
                                                    </Tab.Panel>
                                                    <Tab.Panel>
                                                        <div className="flex flex-col items-center justify-center">
                                                            {customList('Obrigatórios', left, checked, handleToggle)}
                                                            <div className="mx-2 flex flex-row items-center">
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
                                                    </Tab.Panel>
                                                    <Tab.Panel>
                                                    <ComponentsTablesValorServico />
                                                         </Tab.Panel>
                                                </Tab.Panels>
                                            </Tab.Group>
                                            <div className="mt-8 flex items-center justify-end">
                                                <button onClick={() => setModal18(false)} type="button" className="btn btn-outline-danger">
                                                    Cancelar
                                                </button>
                                                <button type="button" className="btn btn-primary ltr:ml-4 rtl:mr-4">
                                                    Avançar
                                                </button>
                                            </div>
                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </Dialog>
                </Transition>
            </div>
        </>
    );
};
