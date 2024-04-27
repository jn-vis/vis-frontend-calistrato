'use client';
import { DataTable } from 'mantine-datatable';
import Link from 'next/link';
import IconTrashLines from '@/components/icon/icon-trash-lines';
import Tippy from '@tippyjs/react';
import IconNotesEdit from '@/components/icon/icon-notes-edit';
import IconPencil from '@/components/icon/icon-pencil';
import VerMaisGeneric from './ver-mais-generic';
import IconCircleCheck from '@/components/icon/icon-circle-check';
import formatDate from '@/presentation/utils/format-date';
import ExportTableComponent from '@/components/shared/export-table-component';
import { Vagas } from '../interfaces/vagas';
import useTableData, { FilterFunction } from '../../../hooks/useTableData';
import getVagas from '@/services/vagas-service';
import ModalConfirmarExclusao from '@/components/meus-dados/sobre-mim/modal-confirma-exclusao';
import { useRouter } from 'next/dist/client/components/navigation';
import { useState } from 'react';
import Loading from '@/components/layouts/loading';

const filterFunction: FilterFunction<Vagas> = (item, search) => {
    return (
        item.id.toString().includes(search.toLowerCase()) ||
        item.vagas.toLowerCase().includes(search.toLowerCase()) ||
        item.descricao.toLowerCase().includes(search.toLowerCase()) ||
        item.datelimite.toLowerCase().includes(search.toLowerCase())
    );
};
const MinhasVagasLista = () => {
    const {
        rowData,
        initialRecords,
        recordsData,
        search,
        sortStatus,
        page,
        pageSize,
        isOpen,
        content,
        PAGE_SIZES,
        modalConfirmacao,
        openModal,
        closeModal,
        setSearch,
        setSortStatus,
        updatePage,
        updatePageSize,
        handleExcluirVaga,
        setModalConfirmacao
    } = useTableData<Vagas>(getVagas, filterFunction);


    const router = useRouter();

    const handleEdit = (id: number) => {
        console.group('chamando')
        router.push(`/meu-recrutamento/minhas-vagas/editar/${id}`)
    }

    const [loading, setLoading] = useState(false);

    const handleClick = () => {
        setLoading(true);
    };


    return (
        <div className="panel mt-6">
            <div className="mb-4.5 flex flex-col justify-between gap-5 md:flex-row md:items-center">
            {loading ? (
                <Loading />
            ) : (
                <Link href="/meu-recrutamento/minhas-vagas/nova-vaga">
                    <button type="button" className="btn btn-primary btn-sm m-1" onClick={handleClick}>
                        <IconCircleCheck className="ltr:mr-2 rtl:ml-2" />
                        Cadastrar Nova Vaga
                    </button>
                </Link>
            )}
                <div className="flex flex-wrap items-center">
                    <ExportTableComponent rowData={rowData} />
                    <input type="text" className="form-input w-auto" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
                </div>
            </div>
            <div className="datatables">
                <DataTable
                    highlightOnHover
                    className="table-hover whitespace-nowrap"
                    records={recordsData}
                    columns={[
                        // { accessor: 'id', title: '#', sortable: true },
                        { accessor: 'vaga', sortable: true },
                        {
                            accessor: 'descricao',
                            title: 'Descrição',
                            sortable: true,
                            render: ({ descricao }) => (
                                <div className="flex flex-row">
                                    {descricao.substring(0, 80)}...
                                    <h3 className="cursor-pointer font-extrabold text-primary" onClick={() => openModal(descricao)}>
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
                                    <div onClick={() => handleEdit(id)}  className="flex hover:text-primary">
                                            <IconPencil />
                                        </div>
                                    </Tippy>
                                    <Tippy content="Excluir Vaga" delay={[1000, 0]}>
                                        <ModalConfirmarExclusao
                                            modalConfirmacao={modalConfirmacao}
                                            handleCloseModal={() => setModalConfirmacao(false)}
                                            handleOpenModal={() => setModalConfirmacao(true)}
                                            onClickDelete={() => handleExcluirVaga(id)}
                                        >
                                            <IconTrashLines />
                                        </ModalConfirmarExclusao>
                                    </Tippy>
                                </div>
                            ),
                        },
                    ]}
                    totalRecords={initialRecords.length}
                    recordsPerPage={pageSize}
                    page={page}
                    onPageChange={updatePage}
                    recordsPerPageOptions={PAGE_SIZES}
                    onRecordsPerPageChange={updatePageSize}
                    sortStatus={sortStatus}
                    onSortStatusChange={setSortStatus}
                    minHeight={200}
                    paginationText={({ from, to, totalRecords }) => `Showing  ${from} to ${to} of ${totalRecords} entries`}
                />
            </div>
            <VerMaisGeneric conteudoModal={content} modalOpen={isOpen} setModalOpen={closeModal} title={'Descrição da vaga'} />
        </div>
    );
};

export default MinhasVagasLista;
