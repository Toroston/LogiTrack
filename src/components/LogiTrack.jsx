import { tableStyleColumn, tableStyleHeader } from "../Helpers/formatHelpers";
import { MaterialReactTable } from "material-react-table";
import { MRT_Localization_ES } from 'material-react-table/locales/es';

const LogiTrack = () => {
    const columnStyle = tableStyleColumn({ align: 'center' }, { fontFamily: 'Arial', fontSize: '0.8rem' });
    const headerStyle = tableStyleHeader({ align: 'center' }, { fontFamily: 'Arial', backgroundColor: 'rgb(4, 170, 109)', fontSize: '0.9rem', color: 'white' });

    const columns = [
        { accessorKey: "nSolicitud", header: "Solicitud", ...columnStyle, ...headerStyle, size: 100, },
        { accessorKey: "producto", header: "Producto", ...columnStyle, ...headerStyle, },
        { accessorKey: "motivo", header: "Motivo", ...columnStyle, ...headerStyle, size: 100 },
        {
            accessorKey: "fechaAltaFormateada", header: "Fecha        de Alta", ...columnStyle, ...headerStyle, size: 100,
            sortingFn: (rowA, rowB) => {
                return rowA.original.fechaAlta.localeCompare(rowB.original.fechaAlta)
            }
        },
        { accessorKey: "diasFecha", header: "Dias        a la Fecha", ...columnStyle, ...headerStyle, size: 100, },
        { accessorKey: "cliente", header: "Cliente", ...columnStyle, ...headerStyle, },
        { accessorKey: "rol", header: "Rol", ...columnStyle, ...headerStyle, size: 100 },
        { accessorKey: "nProducto", header: "Número   de Producto", ...columnStyle, ...headerStyle, size: 120 },
        { accessorKey: "permisionaria", header: "Permisionaria", ...columnStyle, ...headerStyle, size: 120 },
        { accessorKey: "estado", header: "Estado", ...columnStyle, ...headerStyle, size: 160 },
        { accessorKey: "fechaEstimadaEntrega", header: "Fecha Estimada de Entrega", ...columnStyle, ...headerStyle, size: 100 },
        { accessorKey: "fechaEntrega", header: "Fecha     de Entrega", ...columnStyle, ...headerStyle, size: 100 },
    ];

    return (
        <>
            <MaterialReactTable
                muiTableBodyProps={{
                    sx: {
                        fontFamily: 'sans-serif',
                        fontWeight: 400,
                        fontSize: '1rem',
                        color: 'rgba(0, 0, 0, 0.6)',
                        letterSpacing: '0.00938em',
                        fontStyle: "italic"
                    },
                }}
                columns={columns}
                //data={buildData()}
                data={[]}
                enableDensityToggle={false}
                enableFullScreenToggle={false}
                enableColumnActions={false}
                enableColumnFilters={false}
                layoutMode="grid"
                enableColumnResizing={true}
                localization={MRT_Localization_ES}
                muiTableProps={{ sx: { border: '1px solid #ddd', }, }}
                muiTableHeadCellProps={{ sx: { border: '1px solid #ddd', }, }}
                muiTableBodyCellProps={{ sx: { border: '1px solid #ddd', }, }}
                initialState={{
                    density: 'compact',
                    isFullScreen: true,
                    pagination: { pageIndex: 0, pageSize: 20 },
                    sorting: [
                        {
                            id: 'fechaAltaFormateada',
                            desc: true,
                        }
                    ]
                }}
            />
        </>
    )
}

export default LogiTrack