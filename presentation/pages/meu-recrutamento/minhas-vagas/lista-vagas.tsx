'use client';
import Link from 'next/link';
import Tippy from '@tippyjs/react';
import { DataTable } from 'mantine-datatable';
import { ViewVagasModel } from '@/domain/models/view-vagas-model';
import Modal from '@/presentation/components/modal-composition';
import { exportTable } from '@/presentation/utils/export-table';
import Dropdown from '@/presentation/utils/dropdown';
import formatDate from '@/presentation/utils/format-date';
import usePagination from '../../../components/meu-recrutamento/minhas-vagas/hooks/usePagination';
import useSort from '../../../components/meu-recrutamento/minhas-vagas/hooks/useSort';
import useListVagas from '../../../components/meu-recrutamento/minhas-vagas/hooks/useListVagas';
import { IconLayoutGrid, IconListCheck, IconPencil, IconTrashLines, IconNotesEdit, IconFolderPlus, IconUsersGroup, IconNotes, IconFile, IconCircleCheck, IconPrinter } from '@/presentation/icons';
import { deleteVagas } from '@/services/vagas-service';
import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { makeRemoteDeleteVagas } from '@/main/factories/usecases/vagas/remote-delete-vagas-factory';

interface ListaVagasProps {
    vagas: ViewVagasModel[];
    tipo: 'ativas' | 'encerradas';
}

const ListaDeVagas: React.FC<ListaVagasProps> = ({ tipo }) => {
    const { page, setPage, pageSize, setPageSize, PAGE_SIZES } = usePagination();
    const { sortStatus, setSortStatus } = useSort();
    const {
        filtro,
        setFiltro,
        viewType,
        setViewType,
        col,
        isRtl,
        vagasFiltradasAtivas,
        vagasFiltradasEncerradas,
        modalOpenDescricao,
        setModalOpenDescricao,
        descricaoVaga,
        abrirModalDescricaoVaga,
        sortable,
        modalOpenSortable,
        setModalOpenSortable,
        abrirModalSortable,
        currentDate,
    } = useListVagas();
    const records = tipo === 'ativas' ? vagasFiltradasAtivas : vagasFiltradasEncerradas;

    const [modalOpenExcluirVaga, setModalOpenExcluirVaga] = useState(false);
    const [confirmExclusao, setConfirmExclusao] = useState<number | null>(null);

    const handleOpenModalExcluirVaga = (id: number) => {
        setModalOpenExcluirVaga(true);
        setConfirmExclusao(id);
    };

    const queryClient = useQueryClient();

    const excluirVaga = async (id: number | null) => {
        const excluirVaga = makeRemoteDeleteVagas(id);
            try {
                const response = await excluirVaga.deleteVaga({ id });
                if (response.success) {
                    setModalOpenExcluirVaga(false);
                    setConfirmExclusao(null);
                } else {
                    console.error('Erro ao excluir vaga:', response.error);
                }
                queryClient.invalidateQueries({ queryKey: ['vagas'] });
            } catch (error) {
                console.error('Erro na requisição:', error);
            }
    };

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
                                        <button type="button" onClick={() => exportTable('csv', col, records)}>
                                            <IconFile className="h-5 w-5 ltr:mr-2 rtl:ml-2" />
                                            Exportar CSV
                                        </button>
                                    </li>
                                    <li>
                                        <button type="button" onClick={() => exportTable('print', col, records)}>
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
                        <button type="button" className={`btn btn-outline-primary p-2 ${viewType === 'grid' && 'bg-primary text-white'}`} onClick={() => setViewType('grid')}>
                            <IconLayoutGrid />
                        </button>
                        <button type="button" className={`btn btn-outline-primary p-2 ${viewType === 'list' && 'bg-primary text-white'}`} onClick={() => setViewType('list')}>
                            <IconListCheck />
                        </button>
                    </div>

                    <input type="text" className="form-input w-auto" placeholder="Filtro..." value={filtro} onChange={(e) => setFiltro(e.target.value)} />
                </div>
            </div>

            {viewType === 'list' && (
                <div className="datatables">
                    <DataTable
                        highlightOnHover
                        className="table-hover whitespace-nowrap"
                        records={records}
                        columns={[
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
                                            <button onClick={() => handleOpenModalExcluirVaga(id)} type="button" className="flex hover:text-danger">
                                                <IconTrashLines />
                                            </button>
                                        </Tippy>
                                    </div>
                                ),
                            },
                        ]}
                        totalRecords={records.length}
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
            {viewType === 'grid' && (
                <div className="mt-5 grid w-full grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                    {records.map((item: ViewVagasModel) => {
                        return (
                            <div className="relative overflow-hidden rounded-md bg-white text-center shadow dark:bg-[#1c232f]" key={item.contato}>
                                <div className="relative overflow-hidden rounded-md bg-white text-center shadow dark:bg-[#1c232f]">
                                    <div className="rounded-t-md bg-white/40 bg-[url('/assets/images/notification-bg.png')] bg-cover bg-center p-6 pb-0"></div>
                                    <div className="relative -mt-10 px-6 pb-24">
                                        <div className={`h-64 rounded-md bg-white px-2 py-6 shadow-md dark:bg-gray-900 md:py-4`}>
                                            <div className="h-12 text-xl">{item.vaga}</div>
                                            <div className={`relative mt-10 flex-auto md:mt-4`}>
                                                <h3>Data Limite:</h3>
                                                <div className="relative flex items-center justify-center">
                                                    <div className={currentDate > new Date(item.datelimite) ? 'text-danger' : 'text-info'}>{formatDate(item.datelimite)}</div>
                                                    {currentDate > new Date(item.datelimite) && (
                                                        <div className="ml-2 cursor-pointer">
                                                            <span className="badge badge-outline-danger absolute -bottom-1 right-2 md:right-12">Renovar</span>
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
                            {sortable.map((item) => (
                                <div key={item.id} className="mb-2.5">
                                    <div className="items-md-center flex flex-col rounded-md border border-white-light bg-white px-6 py-3.5 text-center dark:border-dark dark:bg-[#1b2e4b] md:flex-row ltr:md:text-left rtl:md:text-right">
                                        <div className="flex flex-1 flex-col items-center justify-between md:flex-row">
                                            <div className="my-3 font-semibold md:my-0">
                                                <div className="text-base text-dark dark:text-[#bfc9d4]">{item.text}</div>
                                            </div>
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
            <Modal isOpen={modalOpenExcluirVaga} onClose={() => setModalOpenExcluirVaga(false)} title="Confirmar Exclusão de Vaga">
                <div className="max-h-[400px] min-h-[100px] overflow-auto p-5">Tem Certeza que deseja excluir esta vaga?</div>
                <div className="flex items-center justify-end gap-4 border-t border-[#ebe9f1] p-5 dark:border-white/10">
                    <button
                        onClick={() => {
                            excluirVaga(confirmExclusao);
                            setModalOpenExcluirVaga(false);
                        }}
                        type="button"
                        className="btn btn-outline-info"
                    >
                        Sim
                    </button>
                    <button onClick={() => setModalOpenExcluirVaga(false)} type="button" className="btn btn-outline-danger">
                        Não
                    </button>
                </div>
            </Modal>
        </div>
    );
};

export default ListaDeVagas;
