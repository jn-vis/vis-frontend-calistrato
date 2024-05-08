import { DataTable } from 'mantine-datatable';
import useListVagas from '../../hooks/useListVagas';
import formatDate from '@/presentation/utils/format-date';
import Tippy from '@tippyjs/react';
import Link from 'next/link';
import IconNotesEdit from '@/components/icon/icon-notes-edit';
import IconPencil from '@/components/icon/icon-pencil';
import IconTrashLines from '@/components/icon/icon-trash-lines';
import Modal from '@/presentation/components/modal-composition';
import { RowData } from '@/presentation/interfaces/vagas';

const ListTableVagas = ({vagas}: {vagas: RowData[]}) => {
    const {
        abrirModalDescricaoVaga,
        initialRecords,
        page,
        setPage,
        pageSize,
        setPageSize,
        sortStatus,
        setSortStatus,
        PAGE_SIZES,
        modalOpenDescricao,
        descricaoVaga,
        setModalOpenDescricao,
    } = useListVagas();
    return (
        <>
            <div className="datatables">
                <DataTable
                    highlightOnHover
                    className="table-hover whitespace-nowrap"
                    records={vagas}
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
            <Modal isOpen={modalOpenDescricao} onClose={() => setModalOpenDescricao(false)} title="Descrição da vaga">
                <div className="max-h-[400px] min-h-[100px] overflow-auto p-5">{descricaoVaga}</div>
                <div className="flex items-center justify-end border-t border-[#ebe9f1] p-5 dark:border-white/10">
                    <button onClick={() => setModalOpenDescricao(false)} type="button" className="btn btn-outline-danger">
                        Fechar
                    </button>
                </div>
            </Modal>
        </>
    );
};

export default ListTableVagas;
