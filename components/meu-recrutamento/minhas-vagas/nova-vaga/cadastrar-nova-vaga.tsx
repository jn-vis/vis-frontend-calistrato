'use client';
import IconHome from '@/components/icon/icon-home';
import IconUser from '@/components/icon/icon-user';
import PanelCodeHighlight from '@/components/utils/panel-code-highlight';
import React, { useEffect, useState } from 'react';
import ComponentsTablesValorServico from './components-tables-valor-servico';
import IconNotesEdit from '@/components/icon/icon-notes-edit';
import IconDollarSignCircle from '@/components/icon/icon-dollar-sign-circle';
import IconListCheck from '@/components/icon/icon-list-check';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ReactSortable } from 'react-sortablejs';
import { postVagas } from '@/services/vagas-service';
import { useRouter } from 'next/navigation';
import { getEstados } from '@/services/estados-service';
import { getDeficiencia } from '@/services/pcd-service';

interface Estados {
    id: string;
    nome: string;
}

interface Deficiencia {
    id: string;
    nome: string;
}


const schema = z.object({
    vaga: z.string().min(5, 'Vaga deve ter no mínimo 5 caracteres'),
    datelimite: z.string(),
    descricao: z.string().min(100, 'Descrição deve ter no mínimo 100 caracteres'),
    pagamentopj: z.string().nullable(),
    pagamentoclt: z.string().nullable(),
    pagamentobtc: z.string().nullable(),
    homeoffice: z.boolean(),
    estado_id: z.string().nullable().optional(),
    pcd: z.boolean(),
    deficiencia_id: z.string().nullable().optional(),
    contato: z.string().nullable()
});

type FormData = z.infer<typeof schema>;
const CadastrarNovaVaga = () => {
    const [activeTab4, setActiveTab4] = useState<any>(1);
    const [checkHomeOffice, setCheckHomeOffice] = useState(true);
    const [checkPcd, setCheckPcd] = useState(false);

    const handleChangeHome = () => {
        setCheckHomeOffice(!checkHomeOffice);
    };

    const handleChangePcd = () => {
        setCheckPcd(!checkPcd);
    };



    const items = [
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

    const [sortable, setSortable] = useState(items);

    const itemsObrigatorios = [
        {
            id: 1,
            text: 'Node',
        },
    ];

    const itemsDesejaveis = [
        {
            id: 4,
            text: 'Java',
        },
        {
            id: 5,
            text: 'Spring',
        },
    ];

    const [obrigatorios, setObrigatorios] = useState(itemsObrigatorios);
    const [desejaveis, setDesejaveis] = useState(itemsDesejaveis);

    const moverParaDesejaveis = (item) => {
        setObrigatorios((prev) => prev.filter((i) => i.id !== item.id));
        setDesejaveis((prev) => [...prev, item]);
    };

    const moverParaObrigatorios = (item) => {
        setDesejaveis((prev) => prev.filter((i) => i.id !== item.id));
        setObrigatorios((prev) => [...prev, item]);
    };

    const [newItem, setNewItem] = useState('');

    const handleNewItemChange = (event) => {
        setNewItem(event.target.value);
    };

    const handleNewItemSubmit = () => {
        const item = {
            id: Math.random(),
            text: newItem,
        };

        setObrigatorios((prev) => [...prev, item]);
        setNewItem('');
    };

    const router = useRouter()

    const {
        register,
        handleSubmit,
        formState:{
            errors
        },
    } = useForm<FormData>({
        resolver: zodResolver(schema),
        mode: 'onChange'
    });

    const onSubmit = async (data: FormData) => {
        const formData = {
            ...data,
            estado_id: data.estado_id || null,
            deficiencia_id: data.deficiencia_id || null,
            sortable: sortable,
            obrigatorios: obrigatorios,
            desejaveis: desejaveis,
        };

        const response = await postVagas(formData);
        router.push('/meu-recrutamento/minhas-vagas');
        return response;
    };

    const [estados, setEstados] = useState<Estados[]>([]);

    const [deficiencia, setDeficiencia] = useState<Deficiencia[]>([]);

      const getEstadosTeste = async () => {
        try {
          const response = await getEstados();
          setEstados(response);
        } catch (error) {
          console.error('Erro ao buscar estados:', error);
        }
      }

      const getDeficienciaTeste = async () => {
        try {
          const response = await getDeficiencia();
          setDeficiencia(response);
        } catch (error) {
          console.error('Erro ao buscar pcds:', error);
        }
      }

      useEffect(() => {
        getEstadosTeste()
        getDeficienciaTeste()
      }, []);


      const nextStep = async () => {
            setActiveTab4(activeTab4 + 1);
    };

    const today = new Date();
    const date = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;


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
                                    onClick={nextStep}
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
                                    onClick={nextStep}
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
                                    onClick={nextStep}
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
                                    onClick={nextStep}
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
                                    onClick={nextStep}
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
                                          <div className="mt-2">
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
                                            {errors.vaga && <p className='text-red-500 mt-1'>{errors.vaga.message}</p>}
                                        </div>
                                        <div className="mt-2">
                                            <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Data limite da vaga</label>
                                            <input
                                                {...register('datelimite')}
                                                type="date"
                                                name="datelimite"
                                                id="datelimite"
                                                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-600 focus:ring-blue-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                                                placeholder="name@company.com"
                                                defaultValue={date}
                                                required
                                            />
                                        </div>
                                        <div className="mt-2">
                                            <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Contato</label>
                                            <input
                                                {...register('contato')}
                                                type="number"
                                                name="contato"
                                                id="contato"
                                                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-600 focus:ring-blue-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                                                placeholder="name@company.com"
                                                required
                                            />
                                        </div>
                                        <div className="mt-2">
                                            <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Descrição da vaga</label>
                                            <textarea
                                                {...register('descricao')}
                                                name="descricao"
                                                id="descricao"
                                                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-600 focus:ring-blue-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                                                placeholder="name@company.com"
                                                required
                                            />
                                             {errors.descricao && <p className='text-red-500 mt-1'>{errors.descricao.message}</p>}
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
                                                    <input {...register('homeoffice')} type="checkbox" className="form-checkbox" onChange={handleChangeHome} checked={checkHomeOffice} />
                                                    <span className="relative text-white-dark checked:bg-none">Somente Home Office</span>
                                                </label>
                                            </div>
                                            <label htmlFor="estado_id">Selecione a região da Vaga anunciada</label>
                                            <select
                                                {...register('estado_id')}
                                                disabled={checkHomeOffice}
                                                id="estado_id"
                                                className="form-select text-white-dark"
                                                name="estado_id"
                                            >
                                                {estados.map((estado) => {
                                                    return <option key={estado.id} value={estado.nome}>{estado.nome}</option>;
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
                                            <label htmlFor="deficiencia_id">Selecione a deficiência</label>
                                            <select
                                                {...register('deficiencia_id')}
                                                disabled={!checkPcd}
                                                id="deficiencia_id"
                                                className="form-select text-white-dark"
                                                name="deficiencia_id"
                                            >
                                                {deficiencia.map((pcd) => {
                                                    return <option key={pcd.id} value={pcd.nome}>{pcd.nome}</option>;
                                                })}
                                            </select>
                                        </div>
                                        <div>
                                            <label htmlFor="web">Pagamento Mensal Pessoa Jurídica</label>
                                            <input {...register('pagamentopj')} id="web" type="number" placeholder="Ex. R$15.000,00" className="form-input" />
                                            {errors.pagamentopj && <p>{errors.pagamentopj.message}</p>}

                                        </div>
                                        <div>
                                            <label htmlFor="web">Pagamento Mensal Carteira Assinada</label>
                                            <input {...register('pagamentoclt')} id="web" type="number" placeholder="Ex. R$10.000,00" className="form-input" />
                                        </div>
                                        <div>
                                            <label htmlFor="web">Pagamento Mensal BTC</label>
                                            <input {...register('pagamentobtc')} id="web" type="number" placeholder="Ex. 0,039฿ " className="form-input" />
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="mb-5">
                                {activeTab4 === 3 && (
                                    <>
                                        <div className="text-center">
                                            <label htmlFor="new-item">Adicionar Itens</label>
                                            <div className="mx-2 flex flex-row items-center">
                                                <input id="new-item" type="text" placeholder="+ java" className="form-input" value={newItem} onChange={handleNewItemChange} />
                                                <button type="button" className="btn btn-primary my-2 rounded border px-4 py-2" onClick={handleNewItemSubmit}>
                                                    {'Adicionar'}
                                                </button>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="panel" style={{ maxHeight: '400px', overflow: 'auto' }}>
                                                <div className="mb-5 text-lg font-semibold">Obrigatórios</div>
                                                <div className="gap-x-12 sm:grid-cols-2">
                                                    <ul id="obrigatorios-list">
                                                        <ReactSortable
                                                            list={obrigatorios}
                                                            setList={setObrigatorios}
                                                            animation={200}
                                                            delay={1}
                                                            ghostClass="gu-transit"
                                                            group="shared"
                                                            onAdd={(evt) => moverParaDesejaveis(evt.item)}
                                                        >
                                                            {obrigatorios.map((item) => {
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
                                                <div className="panel">
                                                    <div className="mb-5 text-lg font-semibold">Desejáveis</div>
                                                    <div className="gap-x-12 sm:grid-cols-2">
                                                        <ul id="desejaveis-list">
                                                            <ReactSortable
                                                                list={desejaveis}
                                                                setList={setDesejaveis}
                                                                animation={200}
                                                                delay={1}
                                                                ghostClass="gu-transit"
                                                                group="shared"
                                                                onAdd={(evt) => moverParaObrigatorios(evt.item)}
                                                            >
                                                                {desejaveis.map((item) => {
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
                                                    <ReactSortable list={sortable} setList={setSortable} animation={200} delay={2} ghostClass="gu-transit" group="shared">
                                                        {sortable.map((item) => {
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
                                    <button type="button"  className="btn btn-primary ltr:ml-auto rtl:mr-auto" onClick={nextStep}>
                                        Avançar
                                    </button>
                                ) : null}
                                {activeTab4 === 5 ? (
                                    <button type="submit" className="btn btn-primary">
                                        Salvar Vaga
                                    </button>
                                ) : null}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </PanelCodeHighlight>
    );
};

export default CadastrarNovaVaga;
