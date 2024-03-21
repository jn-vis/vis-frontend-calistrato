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

import IconCircleCheck from '@/components/icon/icon-circle-check';
import VerMaisGeneric from '../ver-mais-generic';

const rowData = [
    {
        id: 1,
        vagas: 'Dev Senior Java',
        descricao: 'Trabalhar com desenvolvimento Java na empresa XYZ TECH, Trabalhar com desenvolvimento Java na empresa XYZ TECH',
        dataLimite: '2024-01-10',
    },
    {
        id: 2,
        vagas: 'Dev Junior Javascript',
        descricao: 'lorem ipsum dolor sit amet, consectetur adipisicing elit.',
        dataLimite: '2024-01-15',
    },
    {
        id: 3,
        vagas: 'Dev Pleno Node',
        descricao: 'Trabalhar com desenvolvimento Java na empresa XYZ TECH, Trabalhar com desenvolvimento Java na empresa XYZ TECH',
        dataLimite: '2024-01-22',
    },
    {
        id: 4,
        vagas: 'Estagiário',
        descricao: 'Trabalhar com desenvolvimento Javascript na empresa ABCD',
        dataLimite: '2024-01-30',
    },
    {
        id: 5,
        vagas: 'Dev Senior Java',
        descricao: 'Trabalhar com desenvolvimento Java na empresa XYZ TECH, Trabalhar com desenvolvimento Java na empresa XYZ TECH',
        dataLimite: '2024-01-10',
    },
    {
        id: 6,
        vagas: 'Dev Junior Javascript',
        descricao: 'lorem ipsum dolor sit amet, consectetur adipisicing elit.',
        dataLimite: '2024-01-15',
    },
    {
        id:7,
        vagas: 'Dev Pleno Node',
        descricao: 'Trabalhar com desenvolvimento Java na empresa XYZ TECH, Trabalhar com desenvolvimento Java na empresa XYZ TECH',
        dataLimite: '2024-01-22',
    },
    {
        id: 8,
        vagas: 'Estagiário',
        descricao: 'Trabalhar com desenvolvimento Javascript na empresa ABCD',
        dataLimite: '2024-01-30',
    },
    {
        id: 9,
        vagas: 'Dev Senior Java',
        descricao: 'Trabalhar com desenvolvimento Java na empresa XYZ TECH, Trabalhar com desenvolvimento Java na empresa XYZ TECH',
        dataLimite: '2024-01-10',
    },
    {
        id: 10,
        vagas: 'Dev Junior Javascript',
        descricao: 'lorem ipsum dolor sit amet, consectetur adipisicing elit.',
        dataLimite: '2024-01-15',
    },
    {
        id:11,
        vagas: 'Dev Pleno Node',
        descricao: 'Trabalhar com desenvolvimento Java na empresa XYZ TECH, Trabalhar com desenvolvimento Java na empresa XYZ TECH',
        dataLimite: '2024-01-22',
    },
    {
        id: 12,
        vagas: 'Estagiário',
        descricao: 'Trabalhar com desenvolvimento Javascript na empresa ABCD',
        dataLimite: '2024-01-30',
    },

];

const col = ['id', 'vagas', 'descricao', 'dataLimite'];

const MinhasVagasEncerradas = () => {
    const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [initialRecords, setInitialRecords] = useState(sortBy(rowData, 'id'));
    const [recordsData, setRecordsData] = useState(initialRecords);

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
                    item.vagas.toLowerCase().includes(search.toLowerCase()) ||
                    item.descricao.toLowerCase().includes(search.toLowerCase()) ||
                    item.dataLimite.toLowerCase().includes(search.toLowerCase())
                );
            });
        });
    }, [search]);

    useEffect(() => {
        const data = sortBy(initialRecords, sortStatus.columnAccessor);
        setInitialRecords(sortStatus.direction === 'desc' ? data.reverse() : data);
        setPage(1);
    }, [sortStatus]);

    const formatDate = (date: any) => {
        if (date) {
            const dt = new Date(date);
            const month = dt.getMonth() + 1 < 10 ? '0' + (dt.getMonth() + 1) : dt.getMonth() + 1;
            const day = dt.getDate() < 10 ? '0' + dt.getDate() : dt.getDate();
            return day + '/' + month + '/' + dt.getFullYear();
        }
        return '';
    };

    const exportTable = (type: any) => {
        let columns: any = col;
        let records = rowData;
        let filename = 'table';

        let newVariable: any;
        newVariable = window.navigator;

        if (type === 'csv') {
            let coldelimiter = ';';
            let linedelimiter = '\n';
            let result = columns
                .map((d: any) => {
                    return capitalize(d);
                })
                .join(coldelimiter);
            result += linedelimiter;
            records.map((item: any) => {
                columns.map((d: any, index: any) => {
                    if (index > 0) {
                        result += coldelimiter;
                    }
                    let val = item[d] ? item[d] : '';
                    result += val;
                });
                result += linedelimiter;
            });

            if (result == null) return;
            if (!result.match(/^data:text\/csv/i) && !newVariable.msSaveOrOpenBlob) {
                var data = 'data:application/csv;charset=utf-8,' + encodeURIComponent(result);
                var link = document.createElement('a');
                link.setAttribute('href', data);
                link.setAttribute('download', filename + '.csv');
                link.click();
            } else {
                var blob = new Blob([result]);
                if (newVariable.msSaveOrOpenBlob) {
                    newVariable.msSaveBlob(blob, filename + '.csv');
                }
            }
        } else if (type === 'print') {
            var rowhtml = '<p>' + filename + '</p>';
            rowhtml +=
                '<table style="width: 100%; " cellpadding="0" cellcpacing="0"><thead><tr style="color: #515365; background: #eff5ff; -webkit-print-color-adjust: exact; print-color-adjust: exact; "> ';
            columns.map((d: any) => {
                rowhtml += '<th>' + capitalize(d) + '</th>';
            });
            rowhtml += '</tr></thead>';
            rowhtml += '<tbody>';
            records.map((item: any) => {
                rowhtml += '<tr>';
                columns.map((d: any) => {
                    let val = item[d] ? item[d] : '';
                    rowhtml += '<td>' + val + '</td>';
                });
                rowhtml += '</tr>';
            });
            rowhtml +=
                '<style>body {font-family:Arial; color:#495057;}p{text-align:center;font-size:18px;font-weight:bold;margin:15px;}table{ border-collapse: collapse; border-spacing: 0; }th,td{font-size:12px;text-align:left;padding: 4px;}th{padding:8px 4px;}tr:nth-child(2n-1){background:#f7f7f7; }</style>';
            rowhtml += '</tbody></table>';
            var winPrint: any = window.open('', '', 'left=0,top=0,width=1000,height=600,toolbar=0,scrollbars=0,status=0');
            winPrint.document.write('<title>Print</title>' + rowhtml);
            winPrint.document.close();
            winPrint.focus();
            winPrint.print();
        } else if (type === 'txt') {
            let coldelimiter = ',';
            let linedelimiter = '\n';
            let result = columns
                .map((d: any) => {
                    return capitalize(d);
                })
                .join(coldelimiter);
            result += linedelimiter;
            records.map((item: any) => {
                columns.map((d: any, index: any) => {
                    if (index > 0) {
                        result += coldelimiter;
                    }
                    let val = item[d] ? item[d] : '';
                    result += val;
                });
                result += linedelimiter;
            });

            if (result == null) return;
            if (!result.match(/^data:text\/txt/i) && !newVariable.msSaveOrOpenBlob) {
                var data1 = 'data:application/txt;charset=utf-8,' + encodeURIComponent(result);
                var link1 = document.createElement('a');
                link1.setAttribute('href', data1);
                link1.setAttribute('download', filename + '.txt');
                link1.click();
            } else {
                var blob1 = new Blob([result]);
                if (newVariable.msSaveOrOpenBlob) {
                    newVariable.msSaveBlob(blob1, filename + '.txt');
                }
            }
        }
    };

    const capitalize = (text: any) => {
        return text
            .replace('_', ' ')
            .replace('-', ' ')
            .toLowerCase()
            .split(' ')
            .map((s: any) => s.charAt(0).toUpperCase() + s.substring(1))
            .join(' ');
    };

    const [modalOpen, setModalOpen] = useState(false);
    const [descricaoVaga, setDescricaoVaga] = useState('');

    const abrirModalDescricaoVaga = (descricaoVaga: string) => {
      setDescricaoVaga(descricaoVaga);
        setModalOpen(true);
    };


    return (
        <div className="panel mt-6">
            <div className="mb-4.5 flex flex-col justify-between gap-5 md:flex-row md:items-center">
                <div className="flex flex-wrap items-center">
                    <button type="button" onClick={() => exportTable('csv')} className="btn btn-primary btn-sm m-1 ">
                        <IconFile className="h-5 w-5 ltr:mr-2 rtl:ml-2" />
                        CSV
                    </button>
                    <button type="button" onClick={() => exportTable('txt')} className="btn btn-primary btn-sm m-1">
                        <IconFile className="h-5 w-5 ltr:mr-2 rtl:ml-2" />
                        TXT
                    </button>

                    <button type="button" onClick={() => exportTable('print')} className="btn btn-primary btn-sm m-1">
                        <IconPrinter className="ltr:mr-2 rtl:ml-2" />
                        PRINT
                    </button>
                    {/* <Link href="/meu-recrutamento/minhas-vagas/nova-vaga" type="button"  className="btn btn-primary btn-sm m-1">
                        <IconCircleCheck className="ltr:mr-2 rtl:ml-2" />
                        Cadastrar Nova Vaga
                    </Link> */}
                </div>

                <input type="text" className="form-input w-auto" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            <div className="datatables">
                <DataTable
                    highlightOnHover
                    className="table-hover whitespace-nowrap"
                    records={recordsData}
                    columns={[
                        { accessor: 'id', title: '#', sortable: true },
                        { accessor: 'vagas', sortable: true },
                        {
                            accessor: 'descricao',
                            title: 'Descrição',
                            sortable: true,
                            render: ({ descricao }) => (
                                <div className='flex flex-row'>
                                    {descricao.substring(0, 80)}...
                                    <h3  className="text-primary font-extrabold cursor-pointer" onClick={() => abrirModalDescricaoVaga(descricao)}>
                                        Ver Mais
                                    </h3>
                                </div>
                            ),
                        },
                        {
                            accessor: 'dataLimite',
                            title: 'Data Limite',
                            sortable: true,
                            render: ({ dataLimite }) => <div>{formatDate(dataLimite)}</div>,
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
                                    </Tippy >
                                    <Tippy content="Reativar vaga" delay={[1000, 0]}>
                                    <Link href="/meu-recrutamento/minhas-vagas/edita-vaga" className="flex hover:text-primary">
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
            <VerMaisGeneric conteudoModal={descricaoVaga} modalOpen={modalOpen} setModalOpen={setModalOpen} title={'Descrição da vaga'} />
        </div>
    );
};

export default MinhasVagasEncerradas;
