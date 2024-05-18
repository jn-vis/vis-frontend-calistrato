'use client';
import IconFile from '@/presentation/icons/icon-file';
import IconPrinter from '@/presentation/icons/icon-printer';
import IconListCheck from '@/presentation/icons/icon-list-check';
import IconLayoutGrid from '@/presentation/icons/icon-layout-grid';
import { ListGridCurriculo } from '../components/curriculo/list-grid-curriculos';
import ListTableCurriculo from '../components/curriculo/list-table-curriculos';
import useListCurriculo from '../hooks/useListCurriculo';

const ListaDeCurriculos = () => {

    const { exportTable, value, search, setSearch, recordsData, setValue, rowData } =useListCurriculo()

    return (
        <div className="panel mt-6">
            <div className="mb-4.5 flex flex-col justify-between gap-5 md:flex-row md:items-center">
                <div className="flex w-full flex-wrap items-center">
                   {value === 'list' && (
                    <div className="inline-flex">
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
                        </div>
                    </div>
            )}
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
            {value === 'list' && <ListTableCurriculo curriculos={recordsData} />}
            {value === 'grid' && <ListGridCurriculo curriculo={rowData} />}
        </div>
    );
};

export default ListaDeCurriculos;
