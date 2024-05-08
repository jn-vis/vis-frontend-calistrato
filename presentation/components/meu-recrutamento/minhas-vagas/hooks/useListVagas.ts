import { useCallback, useEffect, useState } from "react";
import { RowData, Sortable } from "../../../../interfaces/vagas";
import { useSelector } from "react-redux";
import { IRootState } from "@/store";
import sortBy from 'lodash/sortBy';
import getVagas from "@/services/vagas-service";
import { DataTableSortStatus } from "mantine-datatable";
import { useQuery } from "@tanstack/react-query";

type QueryResult = {
    rowData: RowData[];
    encerradasData: RowData[];
    initialRecords: RowData[];
    recordsData: RowData[];
  };

const useListVagas = () => {


    const col = ['vaga', 'descricao', 'datelimite'];
    const [rowData, setRowData] = useState<RowData[]>([]);
    const [vagasEncerradas, setVagasEncerradas] = useState<RowData[]>([]);
    const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [initialRecords, setInitialRecords] = useState(sortBy(rowData, 'id'));
    const [recordsData, setRecordsData] = useState(initialRecords);
    const [encerradasRecords, setEncerradasRecords] = useState<RowData[]>([]);

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
        const filteredAtivas = rowData.filter((item: RowData) => {
            return (
                item.id.toString().includes(search.toLowerCase()) ||
                item.vaga.toLowerCase().includes(search.toLowerCase()) ||
                item.descricao.toLowerCase().includes(search.toLowerCase()) ||
                item.datelimite.toLowerCase().includes(search.toLowerCase())
            );
        });
        const filteredEncerradas = vagasEncerradas.filter((item: RowData) => {
            return (
                item.id.toString().includes(search.toLowerCase()) ||
                item.vaga.toLowerCase().includes(search.toLowerCase()) ||
                item.descricao.toLowerCase().includes(search.toLowerCase()) ||
                item.datelimite.toLowerCase().includes(search.toLowerCase())
            );
        });

        setInitialRecords(sortBy(filteredAtivas, sortStatus.columnAccessor));
        setEncerradasRecords(sortBy(filteredEncerradas, sortStatus.columnAccessor));
    }, [search, rowData, vagasEncerradas, sortStatus]);

    useEffect(() => {
        const from = (page - 1) * pageSize;
        const to = from + pageSize;
        const newRecordsData = initialRecords.slice(from, to);
        const newEncerradasRecords = encerradasRecords.slice(from, to);

        if (JSON.stringify(recordsData) !== JSON.stringify(newRecordsData)) {
            setRecordsData(newRecordsData);
        }
        if (JSON.stringify(encerradasRecords) !== JSON.stringify(newEncerradasRecords)) {
            setEncerradasRecords(newEncerradasRecords);
        }
    }, [page, pageSize, initialRecords, encerradasRecords]);

    useEffect(() => {
        const sortData = () => {
            const sortedAtivas = sortBy(rowData, sortStatus.columnAccessor);
            const sortedEncerradas = sortBy(vagasEncerradas, sortStatus.columnAccessor);
            return {
                ativas: sortStatus.direction === 'desc' ? sortedAtivas.reverse() : sortedAtivas,
                encerradas: sortStatus.direction === 'desc' ? sortedEncerradas.reverse() : sortedEncerradas
            };
        };

        const { ativas, encerradas } = sortData();

        if (JSON.stringify(initialRecords) !== JSON.stringify(ativas)) {
            setInitialRecords(ativas);
        }
        if (JSON.stringify(encerradasRecords) !== JSON.stringify(encerradas)) {
            setEncerradasRecords(encerradas);
        }
    }, [sortStatus, rowData, vagasEncerradas]);

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

    const currentDate = new Date();

    const fetchData = async () => {
        try {
            const data = await getVagas();
            const vagasAtivas = data.filter((item: RowData) => new Date(item.datelimite) >= currentDate)
            const vagasEncerradas = data.filter((item: RowData) => new Date(item.datelimite) < currentDate);
            setRowData(sortBy(vagasAtivas, 'id'));
            setVagasEncerradas(sortBy(vagasEncerradas, 'id'));
            setInitialRecords(sortBy(data, 'id'));
            setRecordsData([...sortBy(data, 'id').slice(0, pageSize)]);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // const fetchVagas = async (): Promise<RowData[]> => {
    //     const data = await getVagas();
    //     return data;
    //   };

    //   const { data, isLoading, isError } = useQuery<RowData[], Error, QueryResult>({
    //     queryKey: ['vagas'],
    //     queryFn: fetchVagas,
    //     select: (data) => {
    //       const vagasAtivas = data.filter((item: RowData) => new Date(item.datelimite) >= currentDate);
    //       const vagasEncerradas = data.filter((item: RowData) => new Date(item.datelimite) < currentDate);
    //       const rowData = sortBy(vagasAtivas, 'id');
    //       const encerradasData = sortBy(vagasEncerradas, 'id');
    //       const initialRecords = sortBy(data, 'id');
    //       const recordsData = [...sortBy(data, 'id').slice(0, pageSize)];

    //       return {
    //         rowData,
    //         encerradasData,
    //         initialRecords,
    //         recordsData,
    //       };
    //     },
    //   });

    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl';

    return {
        rowData,
        setRowData,
        // data,
        page,
        setPage,
        pageSize,
        setPageSize,
        initialRecords,
        recordsData,
        value,
        setValue,
        search,
        setSearch,
        sortStatus,
        setSortStatus,
        modalOpenDescricao,
        setModalOpenDescricao,
        descricaoVaga,
        setDescricaoVaga,
        abrirModalDescricaoVaga,
        modalOpenSortable,
        setModalOpenSortable,
        sortable,
        abrirModalSortable,
        modalOpenRequisitos,
        setModalOpenRequisitos,
        requisitos,
        abrirModalRequisitos,
        currentDate,
        isRtl,
        col,
        PAGE_SIZES,
        vagasEncerradas,
        encerradasRecords
    }
}

export default useListVagas;

