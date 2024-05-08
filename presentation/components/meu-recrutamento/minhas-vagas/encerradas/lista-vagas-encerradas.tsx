'use client'
import IconFile from '@/components/icon/icon-file';
import IconPrinter from '@/components/icon/icon-printer';
import Link from 'next/link';
import IconCircleCheck from '@/components/icon/icon-circle-check';
import { exportTable } from '@/presentation/utils/export-table';
import IconListCheck from '@/components/icon/icon-list-check';
import IconLayoutGrid from '@/components/icon/icon-layout-grid';
import Dropdown from '@/components/utils/dropdown';
import useListVagas from '../hooks/useListVagas';
import ListTableVagas from '../components/vaga/list-table-vagas';
import { ListGridVagas } from '../components/vaga/list-grid-vagas';

const ListaDeVagasEncerradas = () => {
    const {
        vagasEncerradas,
        encerradasRecords,
        value,
        setValue,
        isRtl,
        search,
        setSearch,
        col,
    } = useListVagas()

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
                                    <button type="button" onClick={() => exportTable('csv', col, vagasEncerradas)}>
                                        <IconFile className="h-5 w-5 ltr:mr-2 rtl:ml-2" />
                                        Exportar CSV
                                    </button>
                                </li>
                                <li>
                                    <button type="button" onClick={() => exportTable('print', col, vagasEncerradas)}>
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
          <ListTableVagas vagas={encerradasRecords} />
        )}
        {value === 'grid' && (
            <ListGridVagas vaga={vagasEncerradas} />
        )}
    </div>
    );
};

export default ListaDeVagasEncerradas;
