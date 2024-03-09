import { DataTableSortStatus } from 'mantine-datatable';
import { useEffect, useState } from 'react';
import sortBy from 'lodash/sortBy';
import usePagination from '@/components/hooks/usePagination';
import useModalVerMais from '@/components/hooks/useModalVermais';

export type FilterFunction<T> = (item: T, search: string) => boolean;
const useTableData = <T,>(fetchDataFunction: () => Promise<T[]>, filterFunction: FilterFunction<T>) => {
    const [rowData, setRowData] = useState<T[]>([]);
    const [initialRecords, setInitialRecords] = useState(sortBy(rowData, 'id'));
    const [recordsData, setRecordsData] = useState(initialRecords);
    const [search, setSearch] = useState('');

    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const { page, pageSize, updatePage, updatePageSize } = usePagination(PAGE_SIZES[0]);
    const { isOpen, content, openModal, closeModal } = useModalVerMais(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchDataFunction();
                setRowData(data);
                setInitialRecords(sortBy(data, 'id'));
                setRecordsData([...sortBy(data, 'id').slice(0, pageSize)]);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
        columnAccessor: 'id',
        direction: 'asc',
    });

    useEffect(() => {
        updatePage(1);
    }, [pageSize]);

    useEffect(() => {
        const from = (page - 1) * pageSize;
        const to = from + pageSize;
        setRecordsData([...initialRecords.slice(from, to)]);
    }, [page, pageSize, initialRecords]);

    useEffect(() => {
        setInitialRecords(() => {
            return rowData.filter((item: T) => filterFunction(item, search));
        });
    }, [search, rowData]);

    useEffect(() => {
        const data = sortBy(initialRecords, sortStatus.columnAccessor);
        setInitialRecords(sortStatus.direction === 'desc' ? data.reverse() : data);
        updatePage(1);
    }, [sortStatus]);

    return {
        rowData,
        initialRecords,
        recordsData,
        search,
        sortStatus,
        page,
        pageSize,
        isOpen,
        content,
        openModal,
        closeModal,
        setRowData,
        setInitialRecords,
        setRecordsData,
        setSearch,
        setSortStatus,
        updatePage,
        updatePageSize,
        PAGE_SIZES
    };
};

export default useTableData;