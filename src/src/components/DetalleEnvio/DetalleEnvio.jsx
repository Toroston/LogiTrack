import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
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
import { updateEstadoEnvio } from "..//../services/UpdateEstadoEnvio"
import { useNavigate } from 'react-router-dom';

const estados = ['Creado', 'En sucursal', 'En tránsito', 'Entregado'];

const DetalleEnvio = ({ envio, onClose, user }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const envioDesdeTabla = location.state?.envio;

    // --- MOCK ACTUALIZADO CON DATOS LOGÍSTICOS ---
    const [datosEnvio, setDatosEnvio] = useState(envio || envioDesdeTabla || {
        id: 1, 
        trackingId: "TRK-841328",
        remitente: "Juan Pérez",
        origen: "Sucursal Centro, CABA",
        tipo: "Express",
        destinatario: "María Gómez",
        destino: "Calle Falsa 123, Córdoba",
        distancia: 750,
        volumen: 2.5,
        ventanaHoraria: "09:00 - 18:00",
        restricciones: "Frágil - Mantener vertical",
        estado: "En tránsito",
        fechaCreacion: new Date().toISOString(),
        historial: []
    });

    const [nuevoEstado, setNuevoEstado] = useState('');

    const handleActualizarEstado = async () => {
        if (!nuevoEstado) return;
        try {
            const res = await updateEstadoEnvio(datosEnvio.id, nuevoEstado, "Supervisor_01");
            const dataActualizada = await res.json();
            setDatosEnvio(dataActualizada);
            setNuevoEstado('');
        } catch (error) {
            console.error("Error al actualizar:", error);
        }
    };

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

    return (
        <Box sx={{ maxWidth: 700, mx: 'auto', mt: 6, mb: 4, px: 2 }}>
            <Box sx={{ mb: 2 }}>
                {onClose ? (
                    <IconButton
                        onClick={onClose}
                        sx={{
                            backgroundColor: '#f44336',
                            color: 'white',
                            '&:hover': { backgroundColor: '#d32f2f' },
                            width: 40,
                            height: 40
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
                    <Chip label={datosEnvio.estado} color={getEstadoColor(datosEnvio.estado)} />
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
                        <Grid item xs={6}>
                            <Typography variant="subtitle2" color="textSecondary">Distancia</Typography>
                            <Typography>{datosEnvio.distancia ? `${datosEnvio.distancia} km` : 'No especificada'}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="subtitle2" color="textSecondary">Volumen</Typography>
                            <Typography>{datosEnvio.volumen ? `${datosEnvio.volumen} m³` : 'No especificado'}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="subtitle2" color="textSecondary">Ventana Horaria</Typography>
                            <Typography>{datosEnvio.ventanaHoraria || 'Sin asignar'}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="subtitle2" color="textSecondary">Restricciones</Typography>
                            <Typography>{datosEnvio.restricciones || 'Ninguna'}</Typography>
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
                        </Box>
                    )}
                </CardContent>

                <Divider />
                <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="caption" color="textSecondary">
                        Creado el: {new Date(datosEnvio.fechaCreacion).toLocaleDateString()}
                    </Typography>
                    {/* Muestra cuántos movimientos tiene el historial para verificar la auditoría */}
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

export default DetalleEnvio;