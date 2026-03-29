import { useState, useEffect } from "react";
import { tableStyleColumn, tableStyleHeader } from "../../Helpers/formatHelpers";
import { MaterialReactTable } from "material-react-table";
import { MRT_Localization_ES } from 'material-react-table/locales/es';
import AltaEnvio from "./AltaEnvio";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

const MainAlta = () => {
    const [envios, setEnvios] = useState([]);
    const navigate = useNavigate();

    const cargarEnvios = async () => {
        const res = await fetch("http://localhost:3001/envios");
        const data = await res.json();
        setEnvios(data);
    };

    useEffect(() => {
        cargarEnvios();
    }, []);

    const crearEnvio = async (form) => {
        const trackingId = "TRK-" + Math.floor(Math.random() * 1000000);

        const nuevoEnvio = {
            id: trackingId,
            trackingId: trackingId,
            remitente: form.remitente,
            destinatario: form.destinatario,
            origen: form.origen,
            destino: form.destino,
            tipo: form.tipo,
            // --- CORRECCIÓN: AGREGADOS PARA QUE SE GUARDEN ---
            distancia: form.distancia,
            volumen: form.volumen,
            ventanaHoraria: form.ventanaHoraria,
            restricciones: form.restricciones,
            // ------------------------------------------------
            estado: "Creado",
            fechaCreacion: new Date().toISOString(),
            historial: [
                {
                    estado: "Creado",
                    timestamp: new Date().toISOString(),
                    usuario: "Sistema"
                }
            ]
        };

        await fetch("http://localhost:3001/envios", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(nuevoEnvio)
        });

        await cargarEnvios();
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
        { accessorKey: "trackingId", header: "Tracking ID", ...columnStyle, ...headerStyle },
        { accessorKey: "destinatario", header: "Destinatario", ...columnStyle, ...headerStyle },
        { accessorKey: "origen", header: "Origen", ...columnStyle, ...headerStyle },
        { accessorKey: "estado", header: "Estado", ...columnStyle, ...headerStyle },
        {
            accessorKey: "fechaCreacion",
            header: "Fecha Alta",
            ...columnStyle,
            ...headerStyle,
            Cell: ({ cell }) => new Date(cell.getValue()).toLocaleString('es-AR')
        },
        {
            id: 'acciones',
            header: "Acciones",
            ...columnStyle,
            ...headerStyle,
            Cell: (props) => {
                /* eslint-disable react/prop-types */
                const { row } = props;
                return (
                    <Button
                        variant="contained"
                        size="small"
                        sx={{ backgroundColor: "#1976d2" }}
                        onClick={() => {
                            navigate(`/detalle/${row.original.trackingId}`, {
                                state: { envio: row.original }
                            });
                        }}
                    >
                        Ver Detalle
                    </Button>
                );
            }
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
                    sorting: [{ id: 'fechaCreacion', desc: true }]
                }}
            />
        </>
    );
};

export default MainAlta;