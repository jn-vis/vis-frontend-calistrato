import { exportTable } from "@/utils/export-table"
import IconFile from "../icon/icon-file"
import IconPrinter from "../icon/icon-printer"

const ExportTableComponent = <T,>({ rowData }: { rowData: T[] }) => {
    return (
        <div className="flex flex-wrap">
        <button type="button" onClick={() => exportTable('csv', rowData)} className="btn btn-primary btn-sm m-1 ">
            <IconFile className="h-5 w-5 ltr:mr-2 rtl:ml-2" />
            CSV
        </button>
        <button type="button" onClick={() => exportTable('txt', rowData)} className="btn btn-primary btn-sm m-1">
            <IconFile className="h-5 w-5 ltr:mr-2 rtl:ml-2" />
            TXT
        </button>

        <button type="button" onClick={() => exportTable('print', rowData)} className="btn btn-primary btn-sm m-1">
            <IconPrinter className="ltr:mr-2 rtl:ml-2" />
            PRINT
        </button>
    </div>
    )
}

export default ExportTableComponent
