import React from 'react';
import { useLocation } from 'react-router-dom';
import { 
    Card, 
    CardContent, 
    Typography, 
    Grid, 
    Chip, 
    Box, 
    Divider 
} from '@mui/material';
import BackButton from '../BackButton/BackButton'; 

const DetalleEnvio = ({ envio }) => { 
    const location = useLocation();

    const envioDesdeTabla = location.state?.envio;

    const datosEnvio = envio || envioDesdeTabla || {
        trackingId: "TRK-841328",
        remitente: "Juan Pérez",
        origen: "Sucursal Centro, CABA",
        tipo: "Express",
        destinatario: "María Gómez",
        destino: "Calle Falsa 123, Córdoba",
        estadoActual: "En tránsito",
        fechaCreacion: "2026-03-23T07:30:00Z"
    };

    const getEstadoColor = (estado) => {
        switch (estado) {
            case 'Creado':
                return 'default';
            case 'En sucursal':
                return 'warning';
            case 'En tránsito':
                return 'info';
            case 'Entregado':
                return 'success';
            default:
                return 'default';
        }
    };

    const fechaFormateada = new Date(datosEnvio.fechaCreacion).toLocaleDateString('es-AR', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });

    return (
        <Box sx={{ maxWidth: 700, mx: 'auto', mt: 6, mb: 4, px: 2 }}>

            
            <Box sx={{ mb: 2 }}>
                <BackButton />
            </Box>

            {/* Título */}
            <Typography 
                variant="h4" 
                component="h1" 
                gutterBottom 
                sx={{ fontWeight: 'bold', color: 'text.primary', mb: 3 }}
            >
                Detalle de envío
            </Typography>

            <Card sx={{ boxShadow: 3 }}>
                <Box sx={{ 
                    p: 3, 
                    bgcolor: 'grey.50', 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center' 
                }}>
                    <Box>
                        <Typography variant="overline" color="text.secondary" sx={{ fontWeight: 'bold' }}>
                            Tracking ID
                        </Typography>
                        <Typography variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
                            {datosEnvio.trackingId}
                        </Typography>
                    </Box>
                    <Chip 
                        label={datosEnvio.estadoActual} 
                        color={getEstadoColor(datosEnvio.estadoActual)} 
                        sx={{ fontWeight: 'bold' }}
                    />
                </Box>

                <Divider />

                <CardContent sx={{ p: 3 }}>
                    <Grid container spacing={4}>
                        <Grid item xs={12} sm={6}>
                            <Box sx={{ mb: 2 }}>
                                <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 'bold', textTransform: 'uppercase' }}>
                                    Remitente
                                </Typography>
                                <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                                    {datosEnvio.remitente}
                                </Typography>
                            </Box>

                            <Box sx={{ mb: 2 }}> 
                                <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 'bold', textTransform: 'uppercase' }}>
                                    Origen
                                </Typography>
                                <Typography variant="body1" color="text.secondary">
                                    {datosEnvio.origen}
                                </Typography>
                            </Box>

                            <Box>
                                <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 'bold', textTransform: 'uppercase' }}>
                                    Tipo
                                </Typography>
                                <Typography 
                                    variant="body1" 
                                    color={datosEnvio.tipo === 'Express' ? 'blue' : 'text.secondary'}
                                >
                                    {datosEnvio.tipo}
                                </Typography>
                            </Box>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <Box sx={{ mb: 2 }}>
                                <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 'bold', textTransform: 'uppercase' }}>
                                    Destinatario
                                </Typography>
                                <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                                    {datosEnvio.destinatario}
                                </Typography>
                            </Box>

                            <Box sx={{ mb: 2 }}> 
                                <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 'bold', textTransform: 'uppercase' }}>
                                    Destino
                                </Typography>
                                <Typography variant="body1" color="text.secondary">
                                    {datosEnvio.destino}
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </CardContent>

                <Divider />

                <Box sx={{ 
                    p: 2, 
                    bgcolor: 'grey.50', 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center' 
                }}>
                    <Typography variant="body2" sx={{ fontWeight: 'medium', color: 'text.secondary' }}>
                        Fecha de creación: {fechaFormateada}
                    </Typography>
                </Box>
            </Card>
        </Box>
    );
};

export default DetalleEnvio;