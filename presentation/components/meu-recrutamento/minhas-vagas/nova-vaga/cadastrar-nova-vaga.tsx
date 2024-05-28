'use client';
import IconHome from '@/presentation/icons/icon-home';
import IconUser from '@/presentation/icons/icon-user';
import PanelCodeHighlight from '@/presentation/utils/panel-code-highlight';
import React, { useEffect, useMemo, useState } from 'react';
import ComponentsTablesValorServico from './components-tables-valor-servico';
import IconNotesEdit from '@/presentation/icons/icon-notes-edit';
import IconDollarSignCircle from '@/presentation/icons/icon-dollar-sign-circle';
import IconListCheck from '@/presentation/icons/icon-list-check';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ReactSortable } from 'react-sortablejs';
import { postVagas } from '@/services/vagas-service';
import { useRouter } from 'next/navigation';
import { getEstados } from '@/services/estados-service';
import { getDeficiencia } from '@/services/pcd-service';
import IconTrashLines from '@/presentation/icons/icon-trash-lines';
import IconInfoCircle from '@/presentation/icons/icon-info-circle';
import Tippy from '@tippyjs/react';
import { useVagas } from '@/presentation/contexts/vagasContex';
import { makeRemoteEditVagas } from '@/main/factories/usecases/vagas/remote-edit-vagas-factory';


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
    contato: z.string().nullable(),
});

interface CadastrarNovaVagaProps {
    vagaId?: string; // `vagaId` é opcional. Se presente, estamos editando uma vaga existente.
}

type FormData = z.infer<typeof schema>;
const CadastrarNovaVaga: React.FC<CadastrarNovaVagaProps> = ({ vagaId }) => {
    const [activeTab4, setActiveTab4] = useState<any>(1);
    const [checks, setChecks] = useState({
        clt: false,
        pj: false,
        btc: false,
        remoto: true,
        hibrido: false,
        presencial: false,
        pcd: false,
    });

    const handleChangeClt = () => {
        setChecks({
            ...checks,
            clt: !checks.clt,
        });
    };

    const handleChangePj = () => {
        setChecks({
            ...checks,
            pj: !checks.pj,
        });
    };

    const handleChangeBtc = () => {
        setChecks({
            ...checks,
            btc: !checks.btc,
        });
    };

    const handleChangeRemoto = () => {
        setChecks({
            ...checks,
            remoto: !checks.remoto,
        });
    };

    const handleChangeHibrido = () => {
        setChecks({
            ...checks,
            hibrido: !checks.hibrido,
        });
    };

    const handleChangePresencial = () => {
        setChecks({
            ...checks,
            presencial: !checks.presencial,
        });
    };

    const handleChangePcd = () => {
        setChecks({
            ...checks,
            pcd: !checks.pcd,
        });
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

    const techJobsnow = [
        'Node',
        'JavaScript',
        'React',
        'Java',
        'Spring',
        'Python',
        'Django',
        'Flask',
        'Ruby',
        'Rails',
        'PHP',
        'Laravel',
        'C#',
        'C++',
        '.NET',
        'Angular',
        'Vue',
        'TypeScript',
        'Swift',
        'Kotlin',
        'Docker',
    ];
    localStorage.setItem('techKeywords', JSON.stringify(techJobsnow));

    const [obrigatorios, setObrigatorios] = useState<any[]>([]);
    const [desejaveis, setDesejaveis] = useState<any[]>([]);

    const moverParaDesejaveis = (item:any) => {
        setObrigatorios((prev) => prev.filter((i) => i.id !== item.id));
        setDesejaveis((prev) => [...prev, item]);
    };

    const moverParaObrigatorios = (item:any) => {
        setDesejaveis((prev) => prev.filter((i) => i.id !== item.id));
        setObrigatorios((prev) => [...prev, item]);
    };

    const [newItem, setNewItem] = useState('');

    const handleNewItemChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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

    function removerDaListaObrigatorios(id:number) {
        setObrigatorios(obrigatorios.filter((item) => item.id !== id));
    }

    function removerDaListaDesejaveis(id:number) {
        setDesejaveis(desejaveis.filter((item) => item.id !== id));
    }

    const router = useRouter();

    const {
        register,
        handleSubmit,
        getValues,
        setValue,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(schema),
        mode: 'onChange',
    });

      const { findVagaById } = useVagas();

    useEffect(() => {
        if (vagaId) {
            const vagaData = findVagaById(Number(vagaId));
            if (vagaData) {
                // Use setValue do React Hook Form para preencher os dados do formulário
                Object.keys(vagaData).forEach(key => {
                    setValue(key, vagaData[key]);
                });
            }
        }
    }, [vagaId, setValue, findVagaById]);

    const onSubmit = async (data: FormData) => {
        const formData = {
            id: Number(vagaId), // Garantindo que o id é passado como número
            vaga: data.vaga,
            descricao: data.descricao,
            homeoffice: data.homeoffice,
            sortable: sortable,
            datelimite: data.datelimite,
            obrigatorios: obrigatorios,
            desejaveis: desejaveis,
            estado_id: data.estado_id || null,
            deficiencia_id: data.deficiencia_id || null,
            pcd: data.pcd,
            pagamentopj: data.pagamentopj || '',
            pagamentoclt: data.pagamentoclt || '',
            pagamentobtc: data.pagamentobtc || '',
            contato: data.contato || '',
        };

        let response;
        const editarVaga = makeRemoteEditVagas(Number(vagaId));
        if (vagaId) {
            // Atualizar a vaga existente
            response = await editarVaga.edit(formData);
        } else {
            // Criar uma nova vaga
            response = await postVagas(formData);
        }

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
    };

    const getDeficienciaTeste = async () => {
        try {
            const response = await getDeficiencia();
            setDeficiencia(response);
        } catch (error) {
            console.error('Erro ao buscar pcds:', error);
        }
    };

    useEffect(() => {
        getEstadosTeste();
        getDeficienciaTeste();
    }, []);

    const nextStep = async () => {
        if (activeTab4 === 1) {
            const obtemValorDaDescricao = getValues('descricao');
            const descricaoSemPontuacao = obtemValorDaDescricao.replace(/[.,]/g, '');
            const descricaoEmPalavrasIndividuais = descricaoSemPontuacao.split(' ');
            const palavrasDescricaoMinusculasESemAcentos = descricaoEmPalavrasIndividuais.map((word) =>
                word
                    .normalize('NFD')
                    .replace(/[\u0300-\u036f]/g, '')
                    .toLowerCase()
            );

            let obtemPalavrasChaveLocalStorage: string[] | null = JSON.parse(localStorage.getItem('techKeywords') || '[]');

            const palavrasChavesMinusculasESemAcentos = obtemPalavrasChaveLocalStorage?.map((keyword) =>
                keyword
                    .normalize('NFD')
                    .replace(/[\u0300-\u036f]/g, '')
                    .toLowerCase()
            );

            const filtraPalavrasChaves = palavrasDescricaoMinusculasESemAcentos.filter((word) => palavrasChavesMinusculasESemAcentos?.includes(word));
            const removeDuplicatasERetornaArray = Array.from(new Set(filtraPalavrasChaves));
            const desejaveisUpdated = removeDuplicatasERetornaArray.map((keyword, index) => ({ id: index + 1, text: keyword }));
            setDesejaveis(desejaveisUpdated);
        }

        setActiveTab4(activeTab4 + 1);
    };

    const today = new Date();
    const date = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

    const widthMap = {
        1: 'w-[10%]',
        2: 'w-[30%]',
        3: 'w-[50%]',
        4: 'w-[70%]',
        default: 'w-[90%]',
    };

    const width = widthMap[activeTab4 as keyof typeof widthMap] || widthMap.default;

    return (
        <PanelCodeHighlight title="Cadastro de vaga">
            <div className="mb-5">
                <div className="inline-block w-full">
                    <div className="relative z-[1] overflow-x-auto">
                        <div className={`${width} absolute top-[30px] -z-[1] m-auto h-1 w-[15%] bg-primary transition-[width] ltr:left-0 rtl:right-0`}></div>
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
                                    <div>
                                        <div className="mt-2">
                                            <label htmlFor="vaga" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                                                Título da Vaga
                                            </label>
                                            <input
                                                {...register('vaga')}
                                                type="text"
                                                name="vaga"
                                                id="vaga"
                                                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-600 focus:ring-blue-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                                                placeholder="Vaga para Desenvolvedor Full Stack"
                                                required
                                            />
                                            {errors.vaga && <p className="mt-1 text-red-500">{errors.vaga.message}</p>}
                                        </div>
                                        <div className="mt-2">
                                            <label htmlFor="datelimite" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                                                Data limite da vaga
                                            </label>
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
                                            <label htmlFor="contato" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                                                Contato
                                            </label>
                                            <input
                                                {...register('contato')}
                                                type="number"
                                                name="contato"
                                                id="contato"
                                                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-600 focus:ring-blue-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                                                placeholder="11999999999"
                                                required
                                            />
                                        </div>
                                        <div className="mt-2">
                                            <label htmlFor="descricao" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                                                Descrição da vaga
                                            </label>
                                            <textarea
                                                {...register('descricao')}
                                                name="descricao"
                                                id="descricao"
                                                className="block h-[250px] w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-600 focus:ring-blue-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                                                placeholder="Escreva as informações sobre a vaga...."
                                                required
                                            />
                                            {errors.descricao && <p className="mt-1 text-red-500">{errors.descricao.message}</p>}
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="mb-5">
                                {activeTab4 === 2 && (
                                    <div>
                                        <div className="mb-5">
                                            <label htmlFor="web" className="font-bold">
                                                Sistema da vaga
                                            </label>
                                            <div className="mb-5 flex flex-row gap-6">
                                                <div>
                                                    <span className="relative text-white-dark checked:bg-none">Remoto</span>
                                                    <div className="relative h-6 w-12">
                                                        <input
                                                            {...register('homeoffice')}
                                                            checked={checks.remoto}
                                                            onChange={handleChangeRemoto}
                                                            type="checkbox"
                                                            className="custom_switch peer absolute z-10 h-full w-full cursor-pointer opacity-0"
                                                            id="custom_switch_checkbox1"
                                                        />
                                                        <span className="block h-full rounded-full bg-[#ebedf2] before:absolute before:bottom-1 before:left-1 before:h-4 before:w-4 before:rounded-full before:bg-white before:transition-all before:duration-300 peer-checked:bg-primary peer-checked:before:left-7 dark:bg-dark dark:before:bg-white-dark dark:peer-checked:before:bg-white"></span>
                                                    </div>
                                                </div>

                                                <div>
                                                    <span className="relative text-white-dark checked:bg-none">Híbrido</span>
                                                    <div className="relative h-6 w-12">
                                                        <input
                                                            {...register('homeoffice')}
                                                            checked={checks.hibrido}
                                                            onChange={handleChangeHibrido}
                                                            type="checkbox"
                                                            className="custom_switch peer absolute z-10 h-full w-full cursor-pointer opacity-0"
                                                            id="custom_switch_checkbox1"
                                                        />
                                                        <span className="block h-full rounded-full bg-[#ebedf2] before:absolute before:bottom-1 before:left-1 before:h-4 before:w-4 before:rounded-full before:bg-white before:transition-all before:duration-300 peer-checked:bg-primary peer-checked:before:left-7 dark:bg-dark dark:before:bg-white-dark dark:peer-checked:before:bg-white"></span>
                                                    </div>
                                                </div>

                                                <div>
                                                    <span className="relative text-white-dark checked:bg-none">Presencial</span>
                                                    <div className="relative h-6 w-12">
                                                        <input
                                                            checked={checks.presencial}
                                                            onChange={handleChangePresencial}
                                                            type="checkbox"
                                                            className="custom_switch peer absolute z-10 h-full w-full cursor-pointer opacity-0"
                                                            id="custom_switch_checkbox1"
                                                        />
                                                        <span className="block h-full rounded-full bg-[#ebedf2] before:absolute before:bottom-1 before:left-1 before:h-4 before:w-4 before:rounded-full before:bg-white before:transition-all before:duration-300 peer-checked:bg-primary peer-checked:before:left-7 dark:bg-dark dark:before:bg-white-dark dark:peer-checked:before:bg-white"></span>
                                                    </div>
                                                </div>
                                            </div>
                                            {checks.presencial || checks.hibrido ? (
                                                <>
                                                    <label htmlFor="estado_id">Selecione a região da Vaga anunciada</label>
                                                    <select {...register('estado_id')} id="estado_id" className="form-select text-white-dark" name="estado_id">
                                                        {estados.map((estado) => {
                                                            return (
                                                                <option key={estado.id} value={estado.nome}>
                                                                    {estado.nome}
                                                                </option>
                                                            );
                                                        })}
                                                    </select>
                                                </>
                                            ) : (
                                                false
                                            )}
                                        </div>
                                        <div className="mb-5">
                                            <div className="mb-5">
                                                <label className="relative mb-2 font-bold checked:bg-none">Vaga exclusiva (PCD)</label>
                                                <div className="relative h-6 w-12">
                                                    <input
                                                        checked={checks.pcd}
                                                        onChange={handleChangePcd}
                                                        type="checkbox"
                                                        className="custom_switch peer absolute z-10 h-full w-full cursor-pointer opacity-0"
                                                        id="custom_switch_checkbox1"
                                                    />
                                                    <span className="block h-full rounded-full bg-[#ebedf2] before:absolute before:bottom-1 before:left-1 before:h-4 before:w-4 before:rounded-full before:bg-white before:transition-all before:duration-300 peer-checked:bg-primary peer-checked:before:left-7 dark:bg-dark dark:before:bg-white-dark dark:peer-checked:before:bg-white"></span>
                                                </div>
                                            </div>
                                            {checks.pcd && (
                                                <div>
                                                    <label htmlFor="deficiencia_id">Selecione a deficiência</label>
                                                    <select {...register('deficiencia_id')} id="deficiencia_id" className="form-select text-white-dark" name="deficiencia_id">
                                                        {deficiencia.map((pcd) => {
                                                            return (
                                                                <option key={pcd.id} value={pcd.nome}>
                                                                    {pcd.nome}
                                                                </option>
                                                            );
                                                        })}
                                                    </select>
                                                </div>
                                            )}
                                        </div>

                                        <div className="mb-5">
                                            <label className="relative mb-2 font-bold checked:bg-none">Tipo de Contrato</label>
                                            <div className="flex flex-row gap-8">
                                                <div className="mb-5 text-center">
                                                    <span className="relative text-center text-white-dark checked:bg-none">CLT</span>
                                                    <div className="relative h-6 w-12">
                                                        <input
                                                            checked={checks.clt}
                                                            onChange={handleChangeClt}
                                                            type="checkbox"
                                                            className="custom_switch peer absolute z-10 h-full w-full cursor-pointer opacity-0"
                                                            id="custom_switch_checkbox1"
                                                        />
                                                        <span className="block h-full rounded-full bg-[#ebedf2] before:absolute before:bottom-1 before:left-1 before:h-4 before:w-4 before:rounded-full before:bg-white before:transition-all before:duration-300 peer-checked:bg-primary peer-checked:before:left-7 dark:bg-dark dark:before:bg-white-dark dark:peer-checked:before:bg-white"></span>
                                                    </div>
                                                </div>
                                                <div className="mb-5 text-center">
                                                    <span className="relative text-white-dark checked:bg-none">PJ</span>
                                                    <div className="relative h-6 w-12">
                                                        <input
                                                            checked={checks.pj}
                                                            onChange={handleChangePj}
                                                            type="checkbox"
                                                            className="custom_switch peer absolute z-10 h-full w-full cursor-pointer opacity-0"
                                                            id="custom_switch_checkbox1"
                                                        />
                                                        <span className="block h-full rounded-full bg-[#ebedf2] before:absolute before:bottom-1 before:left-1 before:h-4 before:w-4 before:rounded-full before:bg-white before:transition-all before:duration-300 peer-checked:bg-primary peer-checked:before:left-7 dark:bg-dark dark:before:bg-white-dark dark:peer-checked:before:bg-white"></span>
                                                    </div>
                                                </div>
                                            </div>

                                            {checks.pj && (
                                                <div className="mb-5">
                                                    <div className="mb-2 flex flex-row items-center gap-2">
                                                        Pretensão PJ
                                                        <Tippy content="Esse campo é opcional, caso deixe em branco é entendido que o valor será à combinar." theme="primary">
                                                            <button>
                                                                <IconInfoCircle className="h-5 w-5" />
                                                            </button>
                                                        </Tippy>
                                                    </div>
                                                    <input {...register('pagamentopj')} id="web" type="number" placeholder="Ex. R$15.000,00" className="form-input" />
                                                    {errors.pagamentopj && <p>{errors.pagamentopj.message}</p>}
                                                </div>
                                            )}

                                            {checks.clt && (
                                                <div className="mb-5">
                                                    <div className="mb-2 flex flex-row items-center gap-2">
                                                        Pretensão CLT
                                                        <Tippy content="Esse campo é opcional, caso deixe em branco é entendido que o valor será à combinar." theme="primary">
                                                            <button>
                                                                <IconInfoCircle className="h-5 w-5" />
                                                            </button>
                                                        </Tippy>
                                                    </div>
                                                    <input {...register('pagamentoclt')} id="web" type="number" placeholder="Ex. R$10.000,00" className="form-input" />
                                                </div>
                                            )}
                                        </div>
                                        <div className="mb-5">
                                            <div className="flex flex-row items-center gap-2">
                                                <p className="font-bold">Deseja pagar em Bitcoin?</p>
                                                <Tippy
                                                    content={
                                                        <>
                                                            A Lightning Network é uma rede de pagamentos instantâneos construída sobre o Bitcoin, permitindo transações mais rápidas e baratas.
                                                            <a
                                                                href="https://lightning.network/lightning-network-summary.pdf"
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="ml-1 text-blue-500 hover:underline"
                                                            >
                                                                Saiba mais
                                                            </a>
                                                        </>
                                                    }
                                                    theme="primary"
                                                    interactive={true}
                                                >
                                                    <button>
                                                        <IconInfoCircle className="h-5 w-5" />
                                                    </button>
                                                </Tippy>
                                            </div>
                                            <div className="mb-5 flex flex-row gap-2">
                                                <div className="relative h-6 w-12">
                                                    <input
                                                        checked={checks.btc}
                                                        onChange={handleChangeBtc}
                                                        type="checkbox"
                                                        className="custom_switch peer absolute z-10 h-full w-full cursor-pointer opacity-0"
                                                        id="custom_switch_checkbox1"
                                                    />
                                                    <span className="block h-full rounded-full bg-[#ebedf2] before:absolute before:bottom-1 before:left-1 before:h-4 before:w-4 before:rounded-full before:bg-white before:transition-all before:duration-300 peer-checked:bg-primary peer-checked:before:left-7 dark:bg-dark dark:before:bg-white-dark dark:peer-checked:before:bg-white"></span>
                                                </div>
                                            </div>
                                            {checks.btc && (
                                                <div className="mb-5">
                                                    <input {...register('pagamentobtc')} id="web" type="number" placeholder="Ex. 0,039฿ " className="form-input" />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="mb-5">
                                {activeTab4 === 3 && (
                                    <>
                                        <div className="text-center">
                                            <label htmlFor="new-item">Insira uma Tecnologia que não está na lista e que gostaria que entrasse</label>
                                            <div className="mx-2 flex flex-row items-center">
                                                <input id="new-item" type="text" placeholder="+ java" className="form-input" value={newItem} onChange={handleNewItemChange} />
                                                <button type="button" className="btn btn-primary my-2 rounded border px-4 py-2" onClick={handleNewItemSubmit}>
                                                    {'Adicionar'}
                                                </button>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="panel" style={{ maxHeight: '1000px', overflow: 'auto' }}>
                                                <div>
                                                    <div className="mb-5 text-lg font-semibold">Obrigatórios</div>
                                                    <div className="panel mb-3" style={{ maxHeight: '400px', overflow: 'auto', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)' }}>
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
                                                                    {obrigatorios.length > 0 ? (
                                                                        obrigatorios.map((item) => {
                                                                            return (
                                                                                <li key={item.id} className="mb-2.5 cursor-grab">
                                                                                    <div className="items-md-center flex flex-col rounded-md border border-white-light bg-white px-6 py-3.5 text-center dark:border-dark dark:bg-[#1b2e4b] md:flex-row ltr:md:text-left rtl:md:text-right">
                                                                                        <div className="flex flex-1 flex-col items-center justify-between md:flex-row">
                                                                                            <div className="my-3 font-semibold md:my-0">
                                                                                                <div className="text-base text-dark dark:text-[#bfc9d4]">{item.text}</div>
                                                                                            </div>
                                                                                            <div>
                                                                                                <button onClick={() => removerDaListaObrigatorios(item.id)}>
                                                                                                    <IconTrashLines />
                                                                                                </button>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </li>
                                                                            );
                                                                        })
                                                                    ) : (
                                                                        <li className="mb-2.5 cursor-grab">
                                                                            <div className="flex items-center justify-center md:flex-row">
                                                                                <div className="my-3 font-semibold md:my-0">
                                                                                    <div className="text-base text-dark dark:text-[#bfc9d4] ">Arraste e solte aqui para adicionar.</div>
                                                                                </div>
                                                                                <div></div>
                                                                            </div>
                                                                        </li>
                                                                    )}
                                                                </ReactSortable>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="mb-5 text-lg font-semibold">Desejáveis</div>
                                                    <div className="panel" style={{ maxHeight: '400px', overflow: 'auto', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)' }}>
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
                                                                                        <div>
                                                                                            <button onClick={() => removerDaListaDesejaveis(item.id)}>
                                                                                                <IconTrashLines />
                                                                                            </button>
                                                                                        </div>
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
                                        </div>
                                    </>
                                )}
                            </div>
                            <div className="mb-5">
                                {activeTab4 === 4 && (
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
                                )}
                            </div>

                            <div className="mb-5">{activeTab4 === 5 && <ComponentsTablesValorServico />}</div>
                            <div className="flex justify-between">
                                <button type="button" className={`btn btn-primary ${activeTab4 === 1 ? 'hidden' : ''}`} onClick={() => setActiveTab4(activeTab4 > 1 ? activeTab4 - 1 : 1)}>
                                    Voltar
                                </button>
                                {activeTab4 < 5 ? (
                                    <button type="button" className="btn btn-primary ltr:ml-auto rtl:mr-auto" onClick={nextStep}>
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
