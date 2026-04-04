import { useState, useEffect } from "react";
import { tableStyleColumn, tableStyleHeader } from "../../Helpers/formatHelpers";
import { MaterialReactTable } from "material-react-table";
import { MRT_Localization_ES } from 'material-react-table/locales/es';
import AltaEnvio from "./AltaEnvio";
import BackButton from "../BackButton/BackButton";
import { useNavigate } from "react-router-dom";
import {
    Button,
    Box,
    Typography,
    Paper,
    Chip,
    Grid,
    Tooltip,
    IconButton
} from "@mui/material";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import InventoryIcon from '@mui/icons-material/Inventory';
import StorefrontIcon from '@mui/icons-material/Storefront';
import RouteIcon from '@mui/icons-material/Route';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import PropTypes from "prop-types";

const obtenerSaturacionPonderada = () => {
    const probabilidad = Math.random();
    if (probabilidad < 0.50) return "Baja";
    if (probabilidad < 0.85) return "Media";
    return "Alta";
};

const calcularHorasVentana = (ventanaString) => {
    try {
        const partes = ventanaString.split('-');
        if (partes.length !== 2) return 6;
        const inicio = parseInt(partes[0].trim().split(':')[0], 10);
        const fin = parseInt(partes[1].trim().split(':')[0], 10);
        let horas = fin - inicio;
        if (horas < 0) horas += 24;
        return isNaN(horas) ? 6 : horas;
    } catch (e) { return 6; }
};

const MainAlta = () => {
    const [envios, setEnvios] = useState([]);
    const [filtroTipo, setFiltroTipo] = useState("Todos");
    const [valorFiltro, setValorFiltro] = useState("Todos");
    const [copySuccess, setCopySuccess] = useState("");
    const navigate = useNavigate();

    const cargarEnvios = async () => {
        const res = await fetch("http://localhost:3001/envios");
        const data = await res.json();
        setEnvios(data);
    };

    useEffect(() => {
        cargarEnvios();
    }, []);

    const enviosFiltrados = envios.filter(envio => {
        if (valorFiltro === "Todos") return true;
        if (filtroTipo === "Prioridad") return envio.prioridad === valorFiltro;
        if (filtroTipo === "Estado") return envio.estado === valorFiltro;
        return true;
    });

    const manejarFiltro = (tipo, valor) => {
        setFiltroTipo(tipo);
        setValorFiltro(valor);
    };

    const handleCopy = (text) => {
        navigator.clipboard.writeText(text);
        setCopySuccess(text);
        setTimeout(() => setCopySuccess(""), 2000);
    };

    const crearEnvio = async (form) => {
        const horasVentana = calcularHorasVentana(form.ventanaHoraria);
        const saturacionRandom = obtenerSaturacionPonderada();
        const datosParaIA = {
            tipoEnvio: form.tipo,
            distanciaKm: parseFloat(form.distancia),
            volumenM3: parseFloat(form.volumen),
            ventanaHorariaHs: horasVentana,
            restricciones: form.restricciones,
            saturacionRuta: saturacionRandom
        };

        let prioridadCalculada = "Media";
        try {
            const mlRes = await fetch("http://localhost:5000/predecir", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(datosParaIA)
            });
            if (mlRes.ok) {
                const mlData = await mlRes.json();
                prioridadCalculada = mlData.prioridad;
            }
        } catch (error) { console.error("Error IA:", error); }

        const trackingId = "TRK-" + Math.floor(Math.random() * 1000000);
        const nuevoEnvio = {
            id: trackingId,
            trackingId: trackingId,
            remitente: form.remitente,
            destinatario: form.destinatario,
            origen: form.origen,
            destino: form.destino,
            tipo: form.tipo,
            distancia: form.distancia,
            volumen: form.volumen,
            ventanaHoraria: form.ventanaHoraria,
            restricciones: form.restricciones,
            prioridad: prioridadCalculada,
            saturacionSimulada: saturacionRandom,
            estado: "Creado",
            fechaCreacion: new Date().toISOString(),
            historial: [{ estado: "Creado", timestamp: new Date().toISOString(), usuario: "Sistema" }]
        };

        await fetch("http://localhost:3001/envios", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(nuevoEnvio)
        });
        await cargarEnvios();
    };

    const columnStyle = tableStyleColumn({ align: 'center' }, { fontFamily: 'Arial', fontSize: '0.8rem' });
    const headerStyle = tableStyleHeader({ align: 'center' }, {
        fontFamily: 'Arial', backgroundColor: 'rgb(4, 170, 109)', fontSize: '0.9rem', color: 'white'
    });

    const columns = [
        {
            accessorKey: "trackingId",
            header: "Tracking ID",
            ...columnStyle,
            ...headerStyle,
            // eslint-disable-next-line react/prop-types
            Cell: ({ cell }) => {
                // eslint-disable-next-line react/prop-types
                const id = cell.getValue();
                return (
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 1,
                            '&:hover .copy-button': { opacity: 1 }
                        }}
                    >
                        <Typography variant="body2" sx={{ fontWeight: '500' }}>{id}</Typography>
                        <Tooltip title={copySuccess === id ? "¡Copiado!" : "Copiar ID"} arrow>
                            <IconButton
                                className="copy-button"
                                size="small"
                                onClick={() => handleCopy(id)}
                                sx={{
                                    opacity: 0,
                                    transition: 'opacity 0.2s',
                                    padding: '2px'
                                }}
                            >
                                <ContentCopyIcon sx={{ fontSize: '1rem', color: 'rgb(4, 170, 109)' }} />
                            </IconButton>
                        </Tooltip>
                    </Box>
                );
            }
        },
        { accessorKey: "destinatario", header: "Destinatario", ...columnStyle, ...headerStyle },
        { accessorKey: "origen", header: "Origen", ...columnStyle, ...headerStyle },
        {
            accessorKey: "prioridad", header: "Prioridad", ...columnStyle, ...headerStyle,
            Cell: (props) => {
                // eslint-disable-next-line react/prop-types
                const { cell } = props;
                // eslint-disable-next-line react/prop-types
                const value = cell.getValue();

                return (
                    <Chip
                        label={value}
                        color={
                            value === 'Alta'
                                ? 'error'
                                : value === 'Media'
                                    ? 'warning'
                                    : 'success'
                        }
                        size="small"
                        variant="outlined"
                        sx={{ fontWeight: 'bold', minWidth: '70px' }}
                    />
                );
            }
        },
        { accessorKey: "estado", header: "Estado", ...columnStyle, ...headerStyle },
        {
            accessorKey: "fechaCreacion", header: "Fecha Alta", ...columnStyle, ...headerStyle,
            Cell: ({ cell }) => new Date(cell.getValue()).toLocaleString('es-AR')
        },
        {
            id: 'acciones', header: "Acciones", ...columnStyle, ...headerStyle,
            // eslint-disable-next-line react/prop-types
            Cell: ({ row }) => (
                <Button
                    variant="contained" size="small" sx={{ backgroundColor: "#1976d2" }}
                    // eslint-disable-next-line react/prop-types
                    onClick={() => navigate(`/detalle/${row.original.trackingId}`, { state: { envio: row.original } })}
                > Ver Detalle </Button>
            )
        }
    ];

    const StatCard = ({ label, count, color, icon, type, value, active }) => (
        <Paper
            elevation={active ? 4 : 1}
            onClick={() => manejarFiltro(type, value)}
            sx={{
                p: '10px 12px', display: 'flex', alignItems: 'center', gap: 1.5, borderRadius: '12px',
                borderLeft: `5px solid ${color}`, bgcolor: active ? '#f0f0f0' : '#fff', cursor: 'pointer',
                transition: 'all 0.2s ease', width: '100%', boxSizing: 'border-box',
                border: active ? `1.5px solid ${color}` : '1px solid #eee',
                '&:hover': { boxShadow: 3, transform: 'translateY(-2px)' }
            }}
        >
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{icon}</Box>
            <Box sx={{ overflow: 'hidden' }}>
                <Typography variant="caption" sx={{ color: '#666', fontWeight: 'bold', fontSize: '0.65rem', textTransform: 'uppercase', display: 'block', whiteSpace: 'nowrap' }}>
                    {label}
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#333', lineHeight: 1.2 }}>{count}</Typography>
            </Box>
        </Paper>
    );
    StatCard.propTypes = {
        label: PropTypes.string,
        count: PropTypes.number,
        color: PropTypes.string,
        icon: PropTypes.node,
        type: PropTypes.string,
        value: PropTypes.string,
        active: PropTypes.bool
    };

    return (
        <Box sx={{ p: 2, bgcolor: '#f4f6f8', minHeight: '100vh' }}>
            <Box sx={{ mb: 2 }}>
                <BackButton />
            </Box>

            <AltaEnvio onCrear={crearEnvio} />
            <Grid container spacing={2} sx={{ mb: 3, width: '100%', ml: 0 }}>
                <Grid item xs={12} sm={6} md={3}><StatCard label="Todos los Envíos" count={envios.length} color="rgb(4, 170, 109)" icon={<LocalShippingIcon sx={{ color: 'rgb(4, 170, 109)', fontSize: 28 }} />} type="Todos" value="Todos" active={valorFiltro === "Todos"} /></Grid>
                <Grid item xs={12} sm={6} md={3}><StatCard label="Prioridad Alta" count={envios.filter(e => e.prioridad === "Alta").length} color="#d32f2f" icon={<ErrorOutlineIcon sx={{ color: '#d32f2f', fontSize: 28 }} />} type="Prioridad" value="Alta" active={filtroTipo === "Prioridad" && valorFiltro === "Alta"} /></Grid>
                <Grid item xs={12} sm={6} md={3}><StatCard label="Prioridad Media" count={envios.filter(e => e.prioridad === "Media").length} color="#ed6c02" icon={<WarningAmberIcon sx={{ color: '#ed6c02', fontSize: 28 }} />} type="Prioridad" value="Media" active={filtroTipo === "Prioridad" && valorFiltro === "Media"} /></Grid>
                <Grid item xs={12} sm={6} md={3}><StatCard label="Prioridad Baja" count={envios.filter(e => e.prioridad === "Baja").length} color="#2e7d32" icon={<CheckCircleOutlineIcon sx={{ color: '#2e7d32', fontSize: 28 }} />} type="Prioridad" value="Baja" active={filtroTipo === "Prioridad" && valorFiltro === "Baja"} /></Grid>
                <Grid item xs={12} sm={6} md={3}><StatCard label="Creados" count={envios.filter(e => e.estado === "Creado").length} color="#9c27b0" icon={<InventoryIcon sx={{ color: '#9c27b0', fontSize: 28 }} />} type="Estado" value="Creado" active={filtroTipo === "Estado" && valorFiltro === "Creado"} /></Grid>
                <Grid item xs={12} sm={6} md={3}><StatCard label="En Sucursal" count={envios.filter(e => e.estado === "En sucursal").length} color="#0288d1" icon={<StorefrontIcon sx={{ color: '#0288d1', fontSize: 28 }} />} type="Estado" value="En sucursal" active={filtroTipo === "Estado" && valorFiltro === "En sucursal"} /></Grid>
                <Grid item xs={12} sm={6} md={3}><StatCard label="En Camino" count={envios.filter(e => e.estado === "En camino").length} color="#fbc02d" icon={<RouteIcon sx={{ color: '#fbc02d', fontSize: 28 }} />} type="Estado" value="En camino" active={filtroTipo === "Estado" && valorFiltro === "En camino"} /></Grid>
                <Grid item xs={12} sm={6} md={3}><StatCard label="Entregados" count={envios.filter(e => e.estado === "Entregado").length} color="#4caf50" icon={<DoneAllIcon sx={{ color: '#4caf50', fontSize: 28 }} />} type="Estado" value="Entregado" active={filtroTipo === "Estado" && valorFiltro === "Entregado"} /></Grid>
            </Grid>
            <MaterialReactTable
                columns={columns}
                data={enviosFiltrados}
                enableDensityToggle={false}
                enableFullScreenToggle={false}
                enableColumnActions={false}
                enableColumnFilters={false}
                localization={MRT_Localization_ES}
                initialState={{
                    density: 'compact',
                    pagination: { pageIndex: 0, pageSize: 5 },
                    sorting: [{ id: 'fechaCreacion', desc: true }]
                }}
                muiTablePaperProps={{ sx: { borderRadius: '15px', overflow: 'hidden' } }}
            />
        </Box>
    );
};

export default MainAlta;