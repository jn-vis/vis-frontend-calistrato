'use client';
import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { useEffect, useState } from 'react';
import sortBy from 'lodash/sortBy';
import IconFile from '@/components/icon/icon-file';
import IconPrinter from '@/components/icon/icon-printer';
import Link from 'next/link';
import IconTrashLines from '@/components/icon/icon-trash-lines';
import Tippy from '@tippyjs/react';
import IconNotesEdit from '@/components/icon/icon-notes-edit';
import IconPencil from '@/components/icon/icon-pencil';
import formatDate from '@/presentation/utils/format-date';
import Modal from '@/presentation/components/modal-composition';
import { useRouter } from 'next/navigation';
import IconCircleCheck from '@/components/icon/icon-circle-check';
import { exportTable } from '@/presentation/utils/export-table';
import getVagas from '@/services/vagas-service';
import IconEye from '@/components/icon/icon-eye';
import IconFacebook from '@/components/icon/icon-facebook';
import IconInstagram from '@/components/icon/icon-instagram';
import IconLinkedin from '@/components/icon/icon-linkedin';
import IconListCheck from '@/components/icon/icon-list-check';
import IconLayoutGrid from '@/components/icon/icon-layout-grid';
import { ReactSortable } from 'react-sortablejs';
import IconFolderPlus from '@/components/icon/icon-folder-plus';
import IconNotes from '@/components/icon/icon-notes';
import IconUsersGroup from '@/components/icon/icon-users-group';
import IconRestore from '@/components/icon/icon-restore';
import Dropdown from '@/components/utils/dropdown';
import { IRootState } from '@/store';
import { useSelector } from 'react-redux';

type Sortable = {
    id: number;
    text: string;
    chosen: boolean;
    selected: boolean;
};

interface RowData {
    id: number;
    vaga: string;
    descricao: string;
    datelimite: string;
    sortable: Sortable[];
    obrigatorios: string[];
    desejaveis: string[];
    contato: string;
    homeoffice: boolean;
    pcd: boolean;
    pagamentopj: string;
    pagamentoclt: string;
    pagamentobtc: string;
    estado: null;
}

const MinhasVagasLista = () => {
    const col = ['vaga', 'descricao', 'datelimite'];
    const [rowData, setRowData] = useState<RowData[]>([]);
    const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [initialRecords, setInitialRecords] = useState(sortBy(rowData, 'id'));
    const [recordsData, setRecordsData] = useState(initialRecords);

    const [value, setValue] = useState<any>('grid');
    const [search, setSearch] = useState('');

    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
        columnAccessor: 'id',
        direction: 'asc',
    });

    useEffect(() => {
        setPage(1);
    }, [pageSize]);

    useEffect(() => {
        const from = (page - 1) * pageSize;
        const to = from + pageSize;
        setRecordsData([...initialRecords.slice(from, to)]);
    }, [page, pageSize, initialRecords]);

    useEffect(() => {
        setInitialRecords(() => {
            return rowData.filter((item: any) => {
                return (
                    item.id.toString().includes(search.toLowerCase()) ||
                    item.vaga.toLowerCase().includes(search.toLowerCase()) ||
                    item.descricao.toLowerCase().includes(search.toLowerCase()) ||
                    item.datelimite.toLowerCase().includes(search.toLowerCase())
                );
            });
        });
    }, [search]);

    useEffect(() => {
        const data = sortBy(initialRecords, sortStatus.columnAccessor);
        setInitialRecords(sortStatus.direction === 'desc' ? data.reverse() : data);
        setPage(1);
    }, [sortStatus]);

    const [modalOpenDescricao, setModalOpenDescricao] = useState(false);
    const [descricaoVaga, setDescricaoVaga] = useState('');

    const abrirModalDescricaoVaga = (descricaoVaga: string) => {
        setDescricaoVaga(descricaoVaga);
        setModalOpenDescricao(true);
    };

    const [sortable, setSortable] = useState<Sortable[]>([]);
    const [modalOpenSortable, setModalOpenSortable] = useState(false);

    const abrirModalSortable = (sortable: Sortable[]) => {
        setSortable(sortable);
        setModalOpenSortable(true);
    };

    const [requisitos, setRequisitos] = useState<Sortable[]>([]);
    const [modalOpenRequisitos, setModalOpenRequisitos] = useState(false);

    const abrirModalRequisitos = (requisitos: Sortable[]) => {
        setRequisitos(requisitos);
        setModalOpenRequisitos(true);
    };

    const router = useRouter();
    const currentDate = new Date();

    const fetchData = async () => {
        try {
            const data = await getVagas();
            const vagasAtivas = data.filter((item: RowData) => new Date(item.datelimite) >= currentDate)
            setRowData(vagasAtivas);
            setInitialRecords(sortBy(data, 'id'));
            setRecordsData([...sortBy(data, 'id').slice(0, pageSize)]);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);


    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl';

    return (
        <div className="panel mt-6">
            <div className="mb-4.5 flex flex-col justify-between gap-5 md:flex-row md:items-center">
                <div className="flex w-full flex-wrap items-center">
                    <Link href="/meu-recrutamento/minhas-vagas/nova-vaga">
                        <button type="button" className="btn btn-primary btn-sm m-1">
                            <IconCircleCheck className="ltr:mr-2 rtl:ml-2" />
                            Nova Vaga
                        </button>
                    </Link>
                    <div className="inline-flex">
                        <button className="btn btn-primary ltr:rounded-r-none rtl:rounded-l-none">Exportar</button>
                        <div className="dropdown">
                            <Dropdown
                                placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                                btnClassName="btn dropdown-toggle btn-primary ltr:rounded-l-none rtl:rounded-r-none border-l-[#4468fd] before:border-[5px] before:border-l-transparent before:border-r-transparent before:border-t-inherit before:border-b-0 before:inline-block before:border-t-white-light h-full"
                                button={<span className="sr-only">Toggle dropdown</span>}
                            >
                                <ul className="!min-w-[170px]">
                                    <li>
                                        <button type="button" onClick={() => exportTable('csv', col, rowData)}>
                                            <IconFile className="h-5 w-5 ltr:mr-2 rtl:ml-2" />
                                            Exportar CSV
                                        </button>
                                    </li>
                                    <li>
                                        <button type="button" onClick={() => exportTable('print', col, rowData)}>
                                            <IconPrinter className="ltr:mr-2 rtl:ml-2" />
                                            Imprimir
                                        </button>
                                    </li>
                                </ul>
                            </Dropdown>
                        </div>
                    </div>
                </div>
                <div className="flex flex-row gap-4">
                    <div className="flex flex-row gap-1">
                        <button type="button" className={`btn btn-outline-primary p-2 ${value === 'grid' && 'bg-primary text-white'}`} onClick={() => setValue('grid')}>
                            <IconLayoutGrid />
                        </button>
                        <button type="button" className={`btn btn-outline-primary p-2 ${value === 'list' && 'bg-primary text-white'}`} onClick={() => setValue('list')}>
                            <IconListCheck />
                        </button>
                    </div>

                    <input type="text" className="form-input w-auto" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
                </div>
            </div>
            {value === 'list' && (
                <div className="datatables">
                    <DataTable
                        highlightOnHover
                        className="table-hover whitespace-nowrap"
                        records={recordsData}
                        columns={[
                            // {
                            //     accessor: 'id',
                            //     title: 'Preview',
                            //     sortable: true,
                            //     render: ({ id }) => (
                            //         <div className="mx-auto flex w-max items-center gap-4">
                            //             <Link href="/meu-recrutamento/minhas-vagas/preview" className="btn btn-primary">
                            //                 <span>
                            //                     <IconEye />
                            //                 </span>
                            //             </Link>
                            //         </div>
                            //     ),
                            // },
                            { accessor: 'vaga', sortable: true },
                            {
                                accessor: 'descricao',
                                title: 'Descrição',
                                sortable: true,
                                render: ({ descricao }) => (
                                    <div className="flex flex-row">
                                        {descricao.substring(0, 80)}...
                                        <h3 className="cursor-pointer font-extrabold text-primary" onClick={() => abrirModalDescricaoVaga(descricao)}>
                                            Ver Mais
                                        </h3>
                                    </div>
                                ),
                            },
                            {
                                accessor: 'datelimite',
                                title: 'Data Limite',
                                sortable: true,
                                render: ({ datelimite }) => <div>{formatDate(datelimite)}</div>,
                            },
                            {
                                accessor: 'action',
                                title: 'Ações',
                                sortable: false,
                                textAlignment: 'center',
                                render: ({ id }) => (
                                    <div className="mx-auto flex w-max items-center gap-4">
                                        <Tippy content="Ver currículos" delay={[1000, 0]}>
                                            <Link href="/meu-recrutamento/minhas-vagas/curriculo" className="flex hover:text-info">
                                                <IconNotesEdit className="h-4.5 w-4.5" />
                                            </Link>
                                        </Tippy>
                                        <Tippy content="Editar vaga" delay={[1000, 0]}>
                                            <Link href={`/meu-recrutamento/minhas-vagas/editar/${id}`} className="flex hover:text-primary">
                                                <IconPencil />
                                            </Link>
                                        </Tippy>
                                        <Tippy content="Excluir Vaga" delay={[1000, 0]}>
                                            <button type="button" className="flex hover:text-danger">
                                                <IconTrashLines />
                                            </button>
                                        </Tippy>
                                    </div>
                                ),
                            },
                        ]}
                        totalRecords={initialRecords.length}
                        recordsPerPage={pageSize}
                        page={page}
                        onPageChange={(p) => setPage(p)}
                        recordsPerPageOptions={PAGE_SIZES}
                        onRecordsPerPageChange={setPageSize}
                        sortStatus={sortStatus}
                        onSortStatusChange={setSortStatus}
                        minHeight={200}
                        paginationText={({ from, to, totalRecords }) => `Showing  ${from} to ${to} of ${totalRecords} entries`}
                    />
                </div>
            )}
            {value === 'grid' && (
                <div className="mt-5 grid w-full grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                    {rowData.map((item: RowData) => {
                        return (
                            <div className="relative overflow-hidden rounded-md bg-white text-center shadow dark:bg-[#1c232f]" key={item.contato}>
                                <div className="relative overflow-hidden rounded-md bg-white text-center shadow dark:bg-[#1c232f]">
                                    <div className="rounded-t-md bg-white/40 bg-[url('/assets/images/notification-bg.png')] bg-cover bg-center p-6 pb-0"></div>
                                    <div className="relative -mt-10 px-6 pb-24">
                                    <div className={`h-64 rounded-md bg-white px-2 py-6 md:py-4 shadow-md dark:bg-gray-900`}>
                                            <div className="h-12 text-xl">{item.vaga}</div>
                                            <div className={`mt-10 md:mt-4 flex-auto relative`}>
                                                <h3>Data Limite:</h3>
                                                <div className="relative flex items-center justify-center">
                                                    <div className={currentDate > new Date(item.datelimite) ? 'text-danger' : 'text-info'}>{formatDate(item.datelimite)}</div>
                                                    {currentDate > new Date(item.datelimite) && (
                                                        <div className="ml-2 cursor-pointer">
                                                            <span className="badge badge-outline-danger absolute -bottom-1 right-2 md:right-12">Renovar</span>
                                                            {/* <span className="badge badge-outline-danger absolute right-32 -bottom-6">Renovar</span> */}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="mt-6 flex flex-wrap items-center justify-around gap-3">
                                                <div className="flex-auto">
                                                    <div>Descrição</div>
                                                </div>
                                                <div className="flex-auto">
                                                    <div>Requisitos</div>
                                                </div>
                                                <div className="flex-auto">
                                                    <div>Ordenação</div>
                                                </div>
                                            </div>
                                            <div className="mt-4">
                                                <ul className="flex items-center justify-around space-x-4 rtl:space-x-reverse">
                                                    <li>
                                                        <button onClick={() => abrirModalDescricaoVaga(item.descricao)} type="button" className="btn btn-outline-primary h-7 w-7 rounded-full p-0">
                                                            <IconFolderPlus />
                                                        </button>
                                                    </li>
                                                    <li>
                                                        <button type="button" className="btn btn-outline-primary h-7 w-7 rounded-full p-0">
                                                            <IconNotes />
                                                        </button>
                                                    </li>
                                                    <li>
                                                        <button onClick={() => abrirModalSortable(item.sortable)} type="button" className="btn btn-outline-primary h-7 w-7 rounded-full p-0">
                                                            <IconListCheck />
                                                        </button>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="relative mb-2 mt-6 grid grid-cols-1 gap-4 ltr:text-left rtl:text-right">
                                            <div className="flex items-center">
                                                <h2 className="flex-none ltr:mr-2 rtl:ml-2">Sistema da Vaga:</h2>
                                                <div className="flex flex-row items-center justify-between">
                                                    <p className="truncate text-white-dark">{item.homeoffice ? 'Remoto' : 'Hibrido'}</p>
                                                    <span className="badge badge-outline-info absolute right-3">CLT</span>
                                                </div>
                                            </div>
                                            <div className="flex items-center">
                                                <h2 className="flex-none ltr:mr-2 rtl:ml-2">Contato:</h2>
                                                <p className="text-white-dark">{item.contato}</p>
                                            </div>
                                            <div className="flex items-center">
                                                <h2 className="flex-none ltr:mr-2 rtl:ml-2">Pretensão Salarial:</h2>
                                                <p className="text-white-dark">{item.pagamentoclt}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="absolute -bottom-4 flex w-full flex-col gap-2 p-6 ltr:left-0 rtl:right-0">
                                        <div className="flex flex-row gap-2">
                                            <div className="btn btn-outline-primary w-1/2">
                                                <Link href={`/meu-recrutamento/minhas-vagas/editar/${item.id}`} className="flex flex-row gap-2">
                                                    <IconNotesEdit className="h-4.5 w-4.5" />
                                                    Editar
                                                </Link>
                                            </div>
                                            <button type="button" className="btn btn-outline-danger flex w-1/2 gap-2">
                                                <IconTrashLines />
                                                Inativar
                                            </button>
                                        </div>
                                        <div>
                                            <Link href="/meu-recrutamento/minhas-vagas/curriculo" className="btn btn-outline-success flex w-full gap-2">
                                                <IconUsersGroup className="h-4.5 w-4.5" />
                                                candidatos
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            <Modal isOpen={modalOpenDescricao} onClose={() => setModalOpenDescricao(false)} title="Descrição da vaga">
                <div className="max-h-[400px] min-h-[100px] overflow-auto p-5">{descricaoVaga}</div>
                <div className="flex items-center justify-end border-t border-[#ebe9f1] p-5 dark:border-white/10">
                    <button onClick={() => setModalOpenDescricao(false)} type="button" className="btn btn-outline-danger">
                        Fechar
                    </button>
                </div>
            </Modal>

            <Modal isOpen={modalOpenSortable} onClose={() => setModalOpenSortable(false)} title="Ordenar critérios candidatos">
                <div className="max-h-[400px] min-h-[100px] overflow-auto p-5">
                    <div className="mb-5">
                        <div className="gap-x-12 sm:grid-cols-2">
                            {sortable.map((sortableItem) => (
                                <div key={sortableItem.id} className="mb-2.5">
                                    <div className="items-md-center flex flex-col rounded-md border border-white-light bg-white px-6 py-3.5 text-center dark:border-dark dark:bg-[#1b2e4b] md:flex-row ltr:md:text-left rtl:md:text-right">
                                        <div className="flex flex-1 flex-col items-center justify-between md:flex-row">
                                            <div className="my-3 font-semibold md:my-0">
                                                <div className="text-base text-dark dark:text-[#bfc9d4]">{sortableItem.text}</div>
                                            </div>
                                            <div></div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-end border-t border-[#ebe9f1] p-5 dark:border-white/10">
                    <button onClick={() => setModalOpenSortable(false)} type="button" className="btn btn-outline-danger">
                        Fechar
                    </button>
                </div>
            </Modal>
        </div>
    );
};

export default MinhasVagasLista;
