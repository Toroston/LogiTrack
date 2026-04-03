import { useState, useEffect, useCallback } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import {
    Card,
    CardContent,
    Typography,
    Grid,
    Chip,
    Box,
    Divider,
    IconButton,
    Button,
    Select,
    MenuItem,
    FormControl,
    InputLabel
} from '@mui/material';
import BackButton from '../BackButton/BackButton';
import CloseIcon from '@mui/icons-material/Close';
import { updateEstadoEnvio } from "../../services/UpdateEstadoEnvio";
import { deleteEnvio } from "../../services/DeleteEnvio";
import PropTypes from "prop-types";

const DetalleEnvio = ({ envio, onClose, user }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { id } = useParams();

    const [datosEnvio, setDatosEnvio] = useState(envio || location.state?.envio || null);
    const [nuevoEstado, setNuevoEstado] = useState('');

    const cargarDatosFrescos = useCallback(async () => {
        const targetId = id || datosEnvio?.id;
        if (!targetId) return;

        try {
            const res = await fetch(`http://localhost:3001/envios/${targetId}`);
            if (res.ok) {
                const data = await res.json();
                setDatosEnvio(data);
            }
        } catch (error) {
            console.error("Error al refrescar datos:", error);
        }
    }, [id, datosEnvio?.id]);

    useEffect(() => {
        cargarDatosFrescos();
    }, [cargarDatosFrescos]);

    const handleActualizarEstado = async () => {
        if (!nuevoEstado) return;
        try {
            const res = await updateEstadoEnvio(datosEnvio.id, nuevoEstado, user?.nombre || "Usuario");
            const dataActualizada = await res.json();
            setDatosEnvio(dataActualizada);
            setNuevoEstado('');
        } catch (error) {
            console.error("Error al actualizar:", error);
        }
    };

    const handleEliminar = async () => {
        const confirmar = window.confirm("¿Seguro que querés eliminar este envío?");
        if (!confirmar) return;
        try {
            await deleteEnvio(datosEnvio.id);
            navigate('/envios'); 
        } catch (error) {
            console.error("Error al eliminar:", error);
        }
    };

    if (!datosEnvio) return <Typography sx={{ p: 4 }}>Cargando datos del envío...</Typography>;

    const esSupervisor = user?.rol === "Supervisor";

    const getEstadoColor = (estado) => {
        switch (estado) {
            case 'Creado': return 'default';
            case 'En sucursal': return 'warning';
            case 'En tránsito': return 'info';
            case 'Entregado': return 'success';
            default: return 'default';
        }
    };

    const getPrioridadColor = (prioridad) => {
        switch (prioridad) {
            case 'Alta': return 'error';
            case 'Media': return 'warning';
            case 'Baja': return 'success';
            default: return 'default';
        }
    };

    return (
        <Box sx={{ maxWidth: 700, mx: 'auto', mt: 6, mb: 4, px: 2 }}>
            <Box sx={{ mb: 2 }}>
                {onClose ? (
                    <IconButton
                        onClick={onClose}
                        sx={{
                            backgroundColor: '#f44336', color: 'white',
                            '&:hover': { backgroundColor: '#d32f2f' },
                            width: 40, height: 40
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                ) : (
                    <BackButton />
                )}
            </Box>

            <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3 }}>
                Detalle de envío
            </Typography>

            <Card sx={{ boxShadow: 3 }}>
                <Box sx={{ p: 3, bgcolor: 'grey.50', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box>
                        <Typography variant="overline" sx={{ fontWeight: 'bold' }}>Tracking ID</Typography>
                        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>{datosEnvio.trackingId}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        {datosEnvio.prioridad && (
                            <Chip 
                                label={`Prioridad: ${datosEnvio.prioridad}`} 
                                color={getPrioridadColor(datosEnvio.prioridad)} 
                                variant="outlined"
                            />
                        )}
                        <Chip label={datosEnvio.estado} color={getEstadoColor(datosEnvio.estado)} />
                    </Box>
                </Box>

                <Divider />

                <CardContent>
                    <Grid container spacing={4}>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="subtitle2" color="textSecondary">Remitente</Typography>
                            <Typography>{datosEnvio.remitente}</Typography>
                            <Typography variant="subtitle2" mt={2} color="textSecondary">Origen</Typography>
                            <Typography>{datosEnvio.origen}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="subtitle2" color="textSecondary">Destinatario</Typography>
                            <Typography>{datosEnvio.destinatario}</Typography>
                            <Typography variant="subtitle2" mt={2} color="textSecondary">Destino</Typography>
                            <Typography>{datosEnvio.destino}</Typography>
                        </Grid>
                    </Grid>

                    <Divider sx={{ my: 3 }} />

                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 2 }}>
                        Información de Carga
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={6} md={4}>
                            <Typography variant="subtitle2" color="textSecondary">Distancia</Typography>
                            <Typography>{datosEnvio.distancia ? `${datosEnvio.distancia} km` : 'No especificada'}</Typography>
                        </Grid>
                        <Grid item xs={6} md={4}>
                            <Typography variant="subtitle2" color="textSecondary">Volumen</Typography>
                            <Typography>{datosEnvio.volumen ? `${datosEnvio.volumen} m³` : 'No especificado'}</Typography>
                        </Grid>
                        <Grid item xs={6} md={4}>
                            <Typography variant="subtitle2" color="textSecondary">Ventana Horaria</Typography>
                            <Typography>{datosEnvio.ventanaHoraria || 'Sin asignar'}</Typography>
                        </Grid>
                        <Grid item xs={6} md={4}>
                            <Typography variant="subtitle2" color="textSecondary">Restricciones</Typography>
                            <Typography>{datosEnvio.restricciones || 'Ninguna'}</Typography>
                        </Grid>
                        <Grid item xs={6} md={4}>
                            <Typography variant="subtitle2" color="textSecondary">Saturación de Ruta</Typography>
                            <Typography>{datosEnvio.saturacionSimulada || 'Media'}</Typography>
                        </Grid>
                    </Grid>

                    {esSupervisor && (
                        <Box sx={{ mt: 4, p: 2, border: '1px dashed #ccc', borderRadius: 2 }}>
                            <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 'bold' }}>
                                Panel de Control (Supervisor)
                            </Typography>
                            <Grid container spacing={2} alignItems="center">
                                <Grid item xs={8}>
                                    <FormControl fullWidth size="small">
                                        <InputLabel>Cambiar Estado</InputLabel>
                                        <Select
                                            value={nuevoEstado}
                                            label="Cambiar Estado"
                                            onChange={(e) => setNuevoEstado(e.target.value)}
                                        >
                                            <MenuItem value="En sucursal">En sucursal</MenuItem>
                                            <MenuItem value="En tránsito">En tránsito</MenuItem>
                                            <MenuItem value="Entregado">Entregado</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={4}>
                                    <Button
                                        fullWidth
                                        variant="contained"
                                        onClick={handleActualizarEstado}
                                        disabled={!nuevoEstado}
                                    >
                                        Actualizar
                                    </Button>
                                </Grid>
                            </Grid>

                            <Box sx={{ mt: 3 }}>
                                <Button
                                    variant="contained"
                                    color="error"
                                    fullWidth
                                    onClick={handleEliminar}
                                >
                                    Eliminar Envío
                                </Button>
                            </Box>
                        </Box>
                    )}
                </CardContent>

                <Divider />
                <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="caption" color="textSecondary">
                        Creado el: {new Date(datosEnvio.fechaCreacion).toLocaleDateString()}
                    </Typography>
                    <Typography
                        variant="caption"
                        color="primary"
                        sx={{ cursor: 'pointer', textDecoration: 'underline' }}
                        onClick={() => navigate('/historial', { state: { historial: datosEnvio.historial } })}
                    >
                        Eventos de Cambio de Estado: {datosEnvio.historial?.length || 0}
                    </Typography>
                </Box>
            </Card>
        </Box>
    );
};

DetalleEnvio.propTypes = {
    envio: PropTypes.object,
    onClose: PropTypes.func,
    user: PropTypes.object.isRequired,
};

export default DetalleEnvio;