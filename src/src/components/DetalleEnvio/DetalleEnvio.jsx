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
    MenuItem,
    Select,
    Paper
} from '@mui/material';
import BackButton from '../BackButton/BackButton';
import CloseIcon from '@mui/icons-material/Close';

const estados = ['Creado', 'En sucursal', 'En tránsito', 'Entregado'];

const DetalleEnvio = ({ envio, onClose, user }) => {
    const location = useLocation();
    
    const fuenteDatos = envio || location.state?.envio || {};

    const datosEnvio = {
        trackingId: fuenteDatos.trackingId || fuenteDatos.nSolicitud || "TRK-000000",
        remitente: fuenteDatos.remitente || "N/A",
        destinatario: fuenteDatos.destinatario || fuenteDatos.cliente || "N/A",
        origen: fuenteDatos.origen || "N/A",
        destino: fuenteDatos.destino || "N/A",
        tipo: fuenteDatos.tipo || "Normal",
        distancia: fuenteDatos.distancia || 0,
        volumen: fuenteDatos.volumen || 0,
        ventanaHoraria: fuenteDatos.ventanaHoraria || "No especificada",
        restricciones: fuenteDatos.restricciones || "Ninguna",
        estadoActual: fuenteDatos.estadoActual || fuenteDatos.estado || "Creado",
        fechaCreacion: fuenteDatos.fechaCreacion || fuenteDatos.fechaAlta || new Date().toISOString()
    };

    const [estadoActual, setEstadoActual] = useState(datosEnvio.estadoActual);
    const [editando, setEditando] = useState(false);
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

    const fechaFormateada = new Date(datosEnvio.fechaCreacion).toLocaleString('es-AR', {
        day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
    });

    const handleGuardar = () => setEditando(false);

    return (
        <Box sx={{ maxWidth: 800, mx: 'auto', mt: 4, mb: 4, px: 2 }}>
            <Box sx={{ mb: 2 }}>
                {onClose ? (
                    <IconButton onClick={onClose} sx={{ bgcolor: '#f44336', color: 'white', '&:hover': { bgcolor: '#d32f2f' } }}>
                        <CloseIcon />
                    </IconButton>
                ) : (
                    <BackButton />
                )}
            </Box>

            <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3 }}>Detalle de envío</Typography>

            <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
                <Box sx={{ p: 3, bgcolor: 'grey.50', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box>
                        <Typography variant="overline" sx={{ fontWeight: 'bold' }}>Tracking ID</Typography>
                        <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'primary.main' }}>{datosEnvio.trackingId}</Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        {!editando ? (
                            <Chip label={estadoActual} color={getEstadoColor(estadoActual)} sx={{ fontWeight: 'bold' }} />
                        ) : (
                            <Select value={estadoActual} onChange={(e) => setEstadoActual(e.target.value)} size="small">
                                {estados.map((e) => <MenuItem key={e} value={e}>{e}</MenuItem>)}
                            </Select>
                        )}
                        {esSupervisor && (
                            <Button variant={editando ? "contained" : "outlined"} size="small" onClick={() => editando ? handleGuardar() : setEditando(true)}>
                                {editando ? "Guardar" : "Editar"}
                            </Button>
                        )}
                    </Box>
                </Box>

                <Divider />

                <CardContent>
                    <Grid container spacing={4}>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="subtitle2" color="primary" gutterBottom>INFORMACIÓN DE CONTACTO</Typography>
                            <Box mt={2}>
                                <Typography variant="caption" color="text.secondary">Remitente</Typography>
                                <Typography><strong>{datosEnvio.remitente}</strong></Typography>
                                <Typography variant="body2" color="text.secondary">{datosEnvio.origen}</Typography>
                            </Box>
                            <Box mt={2}>
                                <Typography variant="caption" color="text.secondary">Destinatario</Typography>
                                <Typography><strong>{datosEnvio.destinatario}</strong></Typography>
                                <Typography variant="body2" color="text.secondary">{datosEnvio.destino}</Typography>
                            </Box>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <Paper variant="outlined" sx={{ p: 2, bgcolor: '#fafafa' }}>
                                <Typography variant="subtitle2" color="secondary" gutterBottom>DATOS LOGÍSTICOS</Typography>
                                <Grid container spacing={1} mt={1}>
                                    <Grid item xs={6}><Typography variant="caption">Tipo:</Typography><Typography variant="body2">{datosEnvio.tipo}</Typography></Grid>
                                    <Grid item xs={6}><Typography variant="caption">Distancia:</Typography><Typography variant="body2">{datosEnvio.distancia} km</Typography></Grid>
                                    <Grid item xs={6}><Typography variant="caption">Volumen:</Typography><Typography variant="body2">{datosEnvio.volumen} m³</Typography></Grid>
                                    <Grid item xs={6}><Typography variant="caption">Ventana:</Typography><Typography variant="body2">{datosEnvio.ventanaHoraria}</Typography></Grid>
                                    <Grid item xs={12} mt={1}>
                                        <Typography variant="caption">Restricciones:</Typography>
                                        <Typography variant="body2" sx={{ fontStyle: 'italic' }}>{datosEnvio.restricciones}</Typography>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>
                    </Grid>
                </CardContent>

                <Divider />
                <Box sx={{ p: 2, bgcolor: 'grey.50' }}>
                    <Typography variant="caption" color="text.secondary">Fecha de registro: {fechaFormateada}</Typography>
                </Box>
            </Card>
        </Box>
    );
};

export default DetalleEnvio;