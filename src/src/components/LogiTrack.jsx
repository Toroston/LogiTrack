import { useState } from "react";
import { tableStyleColumn, tableStyleHeader } from "../Helpers/formatHelpers";
import { MaterialReactTable } from "material-react-table";
import { MRT_Localization_ES } from 'material-react-table/locales/es';
import AltaEnvio from "./AltaEnvio/AltaEnvio";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

const LogiTrack = () => {
    const [envios, setEnvios] = useState([]);
    const navigate = useNavigate(); 

    const generarTrackingId = () => {
        return "TRK-" + Math.floor(Math.random() * 1000000);
    };

    const crearEnvio = (form) => {
        const nuevoEnvio = {
            nSolicitud: generarTrackingId(),
            producto: form.tipo,
            motivo: "-",
            fechaAlta: new Date().toISOString(),
            fechaAltaFormateada: new Date().toLocaleString(),
            diasFecha: 0,
            cliente: form.destinatario,
            rol: "Operador",
            nProducto: "-",
            permisionaria: form.origen,
            estado: "Creado",
            fechaEstimadaEntrega: "-",
            fechaEntrega: "-",
            remitente: form.remitente,
            destino: form.destino,
            tipo: form.tipo,
            distancia: form.distancia,
            volumen: form.volumen,
            ventanaHoraria: form.ventanaHoraria,
            restricciones: form.restricciones
        };

        setEnvios(prev => [nuevoEnvio, ...prev]);
    };

    const columnStyle = tableStyleColumn(
        { align: 'center' },
        { fontFamily: 'Arial', fontSize: '0.8rem' }
    );

    const headerStyle = tableStyleHeader(
        { align: 'center' },
        {
            fontFamily: 'Arial',
            backgroundColor: 'rgb(4, 170, 109)',
            fontSize: '0.9rem',
            color: 'white'
        }
    );

    const columns = [
        { accessorKey: "nSolicitud", header: "Tracking ID", ...columnStyle, ...headerStyle, size: 120 },
        { accessorKey: "cliente", header: "Destinatario", ...columnStyle, ...headerStyle },
        { accessorKey: "permisionaria", header: "Origen", ...columnStyle, ...headerStyle },
        { accessorKey: "estado", header: "Estado", ...columnStyle, ...headerStyle },
        {
            accessorKey: "fechaAltaFormateada",
            header: "Fecha Alta",
            ...columnStyle,
            ...headerStyle,
        },
        {
            id: 'acciones',
            header: "Acciones",
            ...columnStyle,
            ...headerStyle,
            Cell: ({ row }) => (
                <Button
                    variant="contained"
                    size="small"
                    sx={{ backgroundColor: "#1976d2" }}
                    onClick={() => {
                        const datosParaDetalle = {
                            trackingId: row.original.nSolicitud,
                            remitente: row.original.remitente,
                            destinatario: row.original.cliente,
                            origen: row.original.permisionaria,
                            destino: row.original.destino,
                            tipo: row.original.tipo,
                            estadoActual: row.original.estado,
                            fechaCreacion: row.original.fechaAlta,
                            distancia: row.original.distancia,
                            volumen: row.original.volumen,
                            ventanaHoraria: row.original.ventanaHoraria,
                            restricciones: row.original.restricciones
                        };
                        navigate(`/detalle/${row.original.nSolicitud}`, { state: { envio: datosParaDetalle } });
                    }}
                >
                    Ver Detalle
                </Button>
            ),
        }
    ];

    return (
        <>
            <AltaEnvio onCrear={crearEnvio} />
            <MaterialReactTable
                columns={columns}
                data={envios}
                enableDensityToggle={false}
                enableFullScreenToggle={false}
                enableColumnActions={false}
                enableColumnFilters={false}
                layoutMode="grid"
                enableColumnResizing={true}
                localization={MRT_Localization_ES}
                muiTableProps={{ sx: { border: '1px solid #ddd' } }}
                muiTableHeadCellProps={{ sx: { border: '1px solid #ddd' } }}
                muiTableBodyCellProps={{ sx: { border: '1px solid #ddd' } }}
                muiTableBodyProps={{
                    sx: {
                        fontFamily: 'sans-serif',
                        fontWeight: 400,
                        fontSize: '0.9rem',
                        color: 'rgba(0, 0, 0, 0.7)',
                    },
                }}
                initialState={{
                    density: 'compact',
                    pagination: { pageIndex: 0, pageSize: 5 },
                    sorting: [
                        {
                            id: 'fechaAltaFormateada',
                            desc: true,
                        }
                    ]
                }}
            />
        </>
    );
};

export default LogiTrack;