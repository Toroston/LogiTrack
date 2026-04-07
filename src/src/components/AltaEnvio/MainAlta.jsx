import { useState, useEffect, useMemo } from "react";
import { tableStyleColumn, tableStyleHeader } from "../../Helpers/formatHelpers";
import { MaterialReactTable } from "material-react-table";
import { MRT_Localization_ES } from 'material-react-table/locales/es';
import AltaEnvio from "./AltaEnvio";
import BackButton from "../BackButton/BackButton";
import { useNavigate } from "react-router-dom";

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import 'dayjs/locale/es';
import dayjs from 'dayjs';

import {
    Button,
    Box,
    Typography,
    Paper,
    Chip,
    Grid,
    Tooltip,
    IconButton,
    Stack,
    createTheme,
    ThemeProvider
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
<<<<<<< Updated upstream
import PropTypes from "prop-types";
=======
<<<<<<< Updated upstream
=======
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PropTypes from "prop-types";
>>>>>>> Stashed changes

const logitrackTheme = createTheme({
    palette: {
        primary: { main: 'rgb(4, 170, 109)' },
    },
    components: {
        MuiPaper: { styleOverrides: { root: { borderRadius: '16px' } } },
    },
});
>>>>>>> Stashed changes

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
    const [filtroPrioridad, setFiltroPrioridad] = useState("Todos");
    const [filtroEstado, setFiltroEstado] = useState("Todos");
    
    const [fechaInicio, setFechaInicio] = useState(null);
    const [fechaFin, setFechaFin] = useState(null);
    const [copySuccess, setCopySuccess] = useState("");
    const navigate = useNavigate();

    const cargarEnvios = async () => {
        const res = await fetch("http://localhost:3001/envios");
        const data = await res.json();
        setEnvios(data);
    };

    useEffect(() => { cargarEnvios(); }, []);

<<<<<<< Updated upstream
    const porcentajes = useMemo(() => {
        const total = envios.length;
        if (total === 0) return { prioridad: {}, estado: {} };

        const calcularGrupo = (claves, propiedad) => {
            let conteos = claves.map(clave => envios.filter(e => e[propiedad] === clave).length);
            let redondeados = conteos.map(c => Math.round((c / total) * 100));

            let sumaRedondeada = redondeados.reduce((a, b) => a + b, 0);
            let diferencia = 100 - sumaRedondeada;

            if (diferencia !== 0) {
                const indiceMayor = conteos.indexOf(Math.max(...conteos));
                redondeados[indiceMayor] += diferencia;
            }

            return claves.reduce((obj, clave, i) => ({ ...obj, [clave]: redondeados[i] }), {});
        };

        return {
            prioridad: calcularGrupo(["Alta", "Media", "Baja"], "prioridad"),
            estado: calcularGrupo(["Creado", "En sucursal", "En tránsito", "Entregado"], "estado")
        };
    }, [envios]);

=======
    const enviosPorFecha = useMemo(() => {
        return envios.filter(envio => {
            const fechaEnvio = dayjs(envio.fechaCreacion);
            return (!fechaInicio || fechaEnvio.isAfter(fechaInicio.startOf('day').subtract(1, 'millisecond'))) && 
                   (!fechaFin || fechaEnvio.isBefore(fechaFin.endOf('day').add(1, 'millisecond')));
        });
    }, [envios, fechaInicio, fechaFin]);
    const enviosFiltrados = useMemo(() => {
        return enviosPorFecha.filter(envio => {
            const cumplePrioridad = filtroPrioridad === "Todos" || envio.prioridad === filtroPrioridad;
            const cumpleEstado = filtroEstado === "Todos" || envio.estado === filtroEstado;
            return cumplePrioridad && cumpleEstado;
        });
    }, [enviosPorFecha, filtroPrioridad, filtroEstado]);

<<<<<<< Updated upstream
>>>>>>> Stashed changes
    const enviosFiltrados = envios.filter(envio => {
        if (valorFiltro === "Todos") return true;
        if (filtroTipo === "Prioridad") return envio.prioridad === valorFiltro;
        if (filtroTipo === "Estado") return envio.estado === valorFiltro;
        return true;
    });
=======
    const porcentajes = useMemo(() => {
        const total = enviosPorFecha.length;
        if (total === 0) return { prioridad: {}, estado: {} };
        const calcularGrupo = (claves, propiedad) => {
            let conteos = claves.map(clave => enviosPorFecha.filter(e => e[propiedad] === clave).length);
            let redondeados = conteos.map(c => Math.round((c / total) * 100));
            let sumaRedondeada = redondeados.reduce((a, b) => a + b, 0);
            let diferencia = 100 - sumaRedondeada;
            if (diferencia !== 0) {
                const indiceMayor = conteos.indexOf(Math.max(...conteos));
                redondeados[indiceMayor] += diferencia;
            }
            return claves.reduce((obj, clave, i) => ({ ...obj, [clave]: redondeados[i] }), {});
        };
        return {
            prioridad: calcularGrupo(["Alta", "Media", "Baja"], "prioridad"),
            estado: calcularGrupo(["Creado", "En sucursal", "En tránsito", "Entregado"], "estado")
        };
    }, [enviosPorFecha]);
>>>>>>> Stashed changes

    const manejarFiltro = (tipo, valor) => {
        if (tipo === "Todos") {
            setFiltroPrioridad("Todos");
            setFiltroEstado("Todos");
        } else if (tipo === "Prioridad") {
            setFiltroPrioridad(valor);
        } else if (tipo === "Estado") {
            setFiltroEstado(valor);
        }
    };

    const limpiarFiltrosFecha = () => {
        setFechaInicio(null);
        setFechaFin(null);
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
            Cell: ({ cell }) => {
                const id = cell.getValue();
                return (
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, '&:hover .copy-button': { opacity: 1 } }}>
                        <Typography variant="body2" sx={{ fontWeight: '500' }}>{id}</Typography>
                        <Tooltip title={copySuccess === id ? "¡Copiado!" : "Copiar ID"} arrow>
<<<<<<< Updated upstream
                            <IconButton
=======
<<<<<<< Updated upstream
                            <IconButton 
>>>>>>> Stashed changes
                                className="copy-button"
                                size="small"
                                onClick={() => handleCopy(id)}
                                sx={{ opacity: 0, transition: 'opacity 0.2s', padding: '2px' }}
                            >
=======
                            <IconButton className="copy-button" size="small" onClick={() => handleCopy(id)} sx={{ opacity: 0, transition: 'opacity 0.2s', padding: '2px' }}>
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
            Cell: (props) => {
                const { cell } = props;
                const value = cell.getValue();
                return (
                    <Chip
                        label={value}
                        color={value === 'Alta' ? 'error' : value === 'Media' ? 'warning' : 'success'}
                        size="small"
                        variant="outlined"
                        sx={{ fontWeight: 'bold', minWidth: '70px' }}
                    />
                );
            }
=======
<<<<<<< Updated upstream
            Cell: ({ cell }) => (
                <Chip
                    label={cell.getValue()}
                    color={cell.getValue() === 'Alta' ? 'error' : cell.getValue() === 'Media' ? 'warning' : 'success'}
                    size="small" variant="outlined" sx={{ fontWeight: 'bold', minWidth: '70px' }}
                />
            )
=======
            Cell: (props) => {
                const { cell } = props;
                const value = cell.getValue();
                return <Chip label={value} color={value === 'Alta' ? 'error' : value === 'Media' ? 'warning' : 'success'} size="small" variant="outlined" sx={{ fontWeight: 'bold', minWidth: '70px' }} />;
            }
>>>>>>> Stashed changes
>>>>>>> Stashed changes
        },
        { accessorKey: "estado", header: "Estado", ...columnStyle, ...headerStyle },
        {
            accessorKey: "fechaCreacion", header: "Fecha Alta", ...columnStyle, ...headerStyle,
            Cell: ({ cell }) => dayjs(cell.getValue()).format('DD/MM/YYYY HH:mm')
        },
        {
            id: 'acciones', header: "Acciones", ...columnStyle, ...headerStyle,
            Cell: ({ row }) => (
<<<<<<< Updated upstream
                <Button
                    variant="contained" size="small" sx={{ backgroundColor: "#1976d2" }}
                    onClick={() => navigate(`/detalle/${row.original.trackingId}`, { 
                        state: { envio: row.original, from: 'envios' } 
                    })}
                > Ver Detalle </Button>
=======
                <Button variant="contained" size="small" sx={{ backgroundColor: "#1976d2" }} onClick={() => navigate(`/detalle/${row.original.trackingId}`, { state: { envio: row.original, from: 'envios' } })}> Ver Detalle </Button>
>>>>>>> Stashed changes
            )
        }
    ];

<<<<<<< Updated upstream
    const StatCard = ({ label, count, fixedPercentage, color, icon, type, value, active }) => {
        return (
            <Paper
                elevation={active ? 4 : 1}
                onClick={() => manejarFiltro(type, value)}
                sx={{
                    p: '20px 16px',
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 2, 
                    borderRadius: '16px',
                    borderLeft: `6px solid ${color}`, 
                    bgcolor: active ? '#f8f9fa' : '#fff', 
                    cursor: 'pointer',
                    transition: 'all 0.2s ease-in-out', 
                    width: '100%', 
                    boxSizing: 'border-box',
                    minHeight: '110px',
                    border: active ? `1.5px solid ${color}` : '1px solid #eee',
                    '&:hover': { boxShadow: 4, transform: 'translateY(-3px)' }
                }}
            >
                <Box sx={{ 
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    backgroundColor: `${color}15`, borderRadius: '12px', p: 1.5
                }}>
                    {icon}
                </Box>
                <Box sx={{ overflow: 'hidden', flexGrow: 1 }}>
                    <Typography variant="caption" sx={{ color: '#666', fontWeight: 'bold', fontSize: '0.75rem', textTransform: 'uppercase', display: 'block', mb: 0.5 }}>
                        {label}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                        <Typography variant="h4" sx={{ fontWeight: '800', color: '#333', lineHeight: 1 }}>
                            {count}
                        </Typography>
                        {type !== "Todos" && (
                            <Typography variant="h5" sx={{ color: color, fontWeight: '700', opacity: 0.9, lineHeight: 1 }}>
                                {fixedPercentage}%
                            </Typography>
                        )}
                    </Box>
                </Box>
            </Paper>
        );
    };

    StatCard.propTypes = {
        label: PropTypes.string,
        count: PropTypes.number,
        fixedPercentage: PropTypes.number,
        color: PropTypes.string,
        icon: PropTypes.node,
        type: PropTypes.string,
        value: PropTypes.string,
        active: PropTypes.bool
    };

    const totalEnvios = envios.length;
=======
<<<<<<< Updated upstream
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
=======
    const StatCard = ({ label, count, fixedPercentage, color, icon, type, value, active }) => (
        <Paper elevation={active ? 4 : 1} onClick={() => manejarFiltro(type, value)} sx={{ p: '20px 16px', display: 'flex', alignItems: 'center', gap: 2, borderRadius: '16px', borderLeft: `6px solid ${color}`, bgcolor: active ? '#f8f9fa' : '#fff', cursor: 'pointer', transition: 'all 0.2s ease-in-out', width: '100%', boxSizing: 'border-box', minHeight: '110px', border: active ? `1.5px solid ${color}` : '1px solid #eee', '&:hover': { boxShadow: 4, transform: 'translateY(-3px)' } }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: `${color}15`, borderRadius: '12px', p: 1.5 }}>{icon}</Box>
            <Box sx={{ overflow: 'hidden', flexGrow: 1 }}>
                <Typography variant="caption" sx={{ color: '#666', fontWeight: 'bold', fontSize: '0.75rem', textTransform: 'uppercase', display: 'block', mb: 0.5 }}>{label}</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                    <Typography variant="h4" sx={{ fontWeight: '800', color: '#333', lineHeight: 1 }}>{count}</Typography>
                    {type !== "Todos" && <Typography variant="h5" sx={{ color: color, fontWeight: '700', opacity: 0.9, lineHeight: 1 }}>{fixedPercentage || 0}%</Typography>}
                </Box>
>>>>>>> Stashed changes
            </Box>
        </Paper>
    );
>>>>>>> Stashed changes

<<<<<<< Updated upstream
    return (
        <Box sx={{ p: 3, bgcolor: '#f4f6f8', minHeight: '100vh' }}>
            <Box sx={{ mb: 3 }}>
                <BackButton />
            </Box>

            <AltaEnvio onCrear={crearEnvio} />
            
            <Grid container spacing={3} sx={{ mb: 4, width: '100%', ml: 0 }}>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard label="Total Envíos" count={totalEnvios} color="rgb(4, 170, 109)" icon={<LocalShippingIcon sx={{ color: 'rgb(4, 170, 109)', fontSize: 32 }} />} type="Todos" value="Todos" active={valorFiltro === "Todos"} />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard label="Prioridad Alta" count={envios.filter(e => e.prioridad === "Alta").length} fixedPercentage={porcentajes.prioridad["Alta"]} color="#d32f2f" icon={<ErrorOutlineIcon sx={{ color: '#d32f2f', fontSize: 32 }} />} type="Prioridad" value="Alta" active={filtroTipo === "Prioridad" && valorFiltro === "Alta"} />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard label="Prioridad Media" count={envios.filter(e => e.prioridad === "Media").length} fixedPercentage={porcentajes.prioridad["Media"]} color="#ed6c02" icon={<WarningAmberIcon sx={{ color: '#ed6c02', fontSize: 32 }} />} type="Prioridad" value="Media" active={filtroTipo === "Prioridad" && valorFiltro === "Media"} />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard label="Prioridad Baja" count={envios.filter(e => e.prioridad === "Baja").length} fixedPercentage={porcentajes.prioridad["Baja"]} color="#2e7d32" icon={<CheckCircleOutlineIcon sx={{ color: '#2e7d32', fontSize: 32 }} />} type="Prioridad" value="Baja" active={filtroTipo === "Prioridad" && valorFiltro === "Baja"} />
                </Grid>
                
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard label="Creados" count={envios.filter(e => e.estado === "Creado").length} fixedPercentage={porcentajes.estado["Creado"]} color="#9c27b0" icon={<InventoryIcon sx={{ color: '#9c27b0', fontSize: 32 }} />} type="Estado" value="Creado" active={filtroTipo === "Estado" && valorFiltro === "Creado"} />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard label="En Sucursal" count={envios.filter(e => e.estado === "En sucursal").length} fixedPercentage={porcentajes.estado["En sucursal"]} color="#0288d1" icon={<StorefrontIcon sx={{ color: '#0288d1', fontSize: 32 }} />} type="Estado" value="En sucursal" active={filtroTipo === "Estado" && valorFiltro === "En sucursal"} />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard label="En tránsito" count={envios.filter(e => e.estado === "En tránsito").length} fixedPercentage={porcentajes.estado["En tránsito"]} color="#fbc02d" icon={<RouteIcon sx={{ color: '#fbc02d', fontSize: 32 }} />} type="Estado" value="En tránsito" active={filtroTipo === "Estado" && valorFiltro === "En tránsito"} />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard label="Entregados" count={envios.filter(e => e.estado === "Entregado").length} fixedPercentage={porcentajes.estado["Entregado"]} color="#4caf50" icon={<DoneAllIcon sx={{ color: '#4caf50', fontSize: 32 }} />} type="Estado" value="Entregado" active={filtroTipo === "Estado" && valorFiltro === "Entregado"} />
                </Grid>
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
                muiTablePaperProps={{ sx: { borderRadius: '15px', overflow: 'hidden', boxShadow: 3 } }}
            />
        </Box>
=======
    StatCard.propTypes = { label: PropTypes.string, count: PropTypes.number, fixedPercentage: PropTypes.number, color: PropTypes.string, icon: PropTypes.node, type: PropTypes.string, value: PropTypes.string, active: PropTypes.bool };

    const DatePickerButton = ({ label, value, onChange }) => {
        const [open, setOpen] = useState(false);
        const [anchorEl, setAnchorEl] = useState(null);
        const handleClick = (event) => {
            setAnchorEl(event.currentTarget);
            setOpen(true);
        };
        return (
            <Box>
                <Button variant="outlined" onClick={handleClick} startIcon={<CalendarMonthIcon />} sx={{ borderRadius: '20px', textTransform: 'none', color: value ? 'rgb(4, 170, 109)' : '#666', borderColor: value ? 'rgb(4, 170, 109)' : '#ccc', bgcolor: '#fff', fontWeight: '600', minWidth: '140px', '&:hover': { borderColor: 'rgb(4, 170, 109)', bgcolor: '#f0fdf4' } }}>
                    {value ? dayjs(value).format('DD/MM/YYYY') : label}
                </Button>
                <DatePicker open={open} onClose={() => setOpen(false)} value={value} onChange={(val) => { onChange(val); setOpen(false); }} slotProps={{ textField: { sx: { display: 'none' } }, popper: { anchorEl: anchorEl, placement: 'bottom-start', sx: { '& .MuiPaper-root': { marginTop: '8px', boxShadow: '0px 10px 30px rgba(0,0,0,0.1)' } } } }} />
            </Box>
        );
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
            <ThemeProvider theme={logitrackTheme}>
                <Box sx={{ p: 3, bgcolor: '#f4f6f8', minHeight: '100vh' }}>
                    <Box sx={{ mb: 3 }}><BackButton /></Box>

                    <AltaEnvio onCrear={crearEnvio} />
                    
                    <Grid container spacing={3} sx={{ mb: 4, width: '100%', ml: 0 }}>
                        <Grid item xs={12} sm={6} md={3}>
                            <StatCard 
                                label="Total Envíos" 
                                count={enviosPorFecha.length} 
                                color="rgb(4, 170, 109)" 
                                icon={<LocalShippingIcon sx={{ color: 'rgb(4, 170, 109)', fontSize: 32 }} />} 
                                type="Todos" 
                                value="Todos" 
                                active={filtroPrioridad === "Todos" && filtroEstado === "Todos"} 
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <StatCard label="Prioridad Alta" count={enviosPorFecha.filter(e => e.prioridad === "Alta").length} fixedPercentage={porcentajes.prioridad["Alta"]} color="#d32f2f" icon={<ErrorOutlineIcon sx={{ color: '#d32f2f', fontSize: 32 }} />} type="Prioridad" value="Alta" active={filtroPrioridad === "Alta"} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <StatCard label="Prioridad Media" count={enviosPorFecha.filter(e => e.prioridad === "Media").length} fixedPercentage={porcentajes.prioridad["Media"]} color="#ed6c02" icon={<WarningAmberIcon sx={{ color: '#ed6c02', fontSize: 32 }} />} type="Prioridad" value="Media" active={filtroPrioridad === "Media"} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <StatCard label="Prioridad Baja" count={enviosPorFecha.filter(e => e.prioridad === "Baja").length} fixedPercentage={porcentajes.prioridad["Baja"]} color="#2e7d32" icon={<CheckCircleOutlineIcon sx={{ color: '#2e7d32', fontSize: 32 }} />} type="Prioridad" value="Baja" active={filtroPrioridad === "Baja"} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <StatCard label="Creados" count={enviosPorFecha.filter(e => e.estado === "Creado").length} fixedPercentage={porcentajes.estado["Creado"]} color="#9c27b0" icon={<InventoryIcon sx={{ color: '#9c27b0', fontSize: 32 }} />} type="Estado" value="Creado" active={filtroEstado === "Creado"} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <StatCard label="En Sucursal" count={enviosPorFecha.filter(e => e.estado === "En sucursal").length} fixedPercentage={porcentajes.estado["En sucursal"]} color="#0288d1" icon={<StorefrontIcon sx={{ color: '#0288d1', fontSize: 32 }} />} type="Estado" value="En sucursal" active={filtroEstado === "En sucursal"} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <StatCard label="En tránsito" count={enviosPorFecha.filter(e => e.estado === "En tránsito").length} fixedPercentage={porcentajes.estado["En tránsito"]} color="#fbc02d" icon={<RouteIcon sx={{ color: '#fbc02d', fontSize: 32 }} />} type="Estado" value="En tránsito" active={filtroEstado === "En tránsito"} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <StatCard label="Entregados" count={enviosPorFecha.filter(e => e.estado === "Entregado").length} fixedPercentage={porcentajes.estado["Entregado"]} color="#4caf50" icon={<DoneAllIcon sx={{ color: '#4caf50', fontSize: 32 }} />} type="Estado" value="Entregado" active={filtroEstado === "Entregado"} />
                        </Grid>
                    </Grid>

                    <MaterialReactTable
                        columns={columns}
                        data={enviosFiltrados}
                        enableDensityToggle={false}
                        enableFullScreenToggle={false}
                        enableColumnActions={false}
                        enableColumnFilters={false}
                        localization={MRT_Localization_ES}
                        renderTopToolbarCustomActions={() => (
                            <Stack direction="row" spacing={2} alignItems="center" sx={{ p: 0.5 }}>
                                <Typography variant="caption" sx={{ fontWeight: '800', color: '#888', letterSpacing: 1, display: { xs: 'none', md: 'block' } }}>
                                    RANGO DE FECHAS:
                                </Typography>
                                <DatePickerButton label="Desde" value={fechaInicio} onChange={setFechaInicio} />
                                <DatePickerButton label="Hasta" value={fechaFin} onChange={setFechaFin} />
                                {(fechaInicio || fechaFin) && (
                                    <Tooltip title="Limpiar Fechas">
                                        <IconButton onClick={limpiarFiltrosFecha} size="small" sx={{ bgcolor: '#ffebee', color: '#d32f2f', '&:hover': { bgcolor: '#ffcdd2' } }}>
                                            <RestartAltIcon fontSize="small" />
                                        </IconButton>
                                    </Tooltip>
                                )}
                                {(filtroPrioridad !== "Todos" || filtroEstado !== "Todos") && (
                                    <Chip 
                                        label={`Filtros: ${filtroPrioridad} + ${filtroEstado}`} 
                                        onDelete={() => manejarFiltro("Todos", "Todos")}
                                        color="primary"
                                        variant="outlined"
                                        size="small"
                                    />
                                )}
                            </Stack>
                        )}
                        initialState={{ density: 'compact', pagination: { pageIndex: 0, pageSize: 5 }, sorting: [{ id: 'fechaCreacion', desc: true }] }}
                        muiTablePaperProps={{ sx: { borderRadius: '15px', overflow: 'hidden', boxShadow: '0 4px 24px rgba(0,0,0,0.06)', border: '1px solid #eef0f2' } }}
                        muiTopToolbarProps={{ sx: { p: '12px', backgroundColor: '#fff', borderBottom: '1px solid #f0f0f0' } }}
                    />
                </Box>
            </ThemeProvider>
        </LocalizationProvider>
>>>>>>> Stashed changes
    );
};

export default MainAlta;