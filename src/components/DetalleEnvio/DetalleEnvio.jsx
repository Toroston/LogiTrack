import React from 'react';
import { useLocation } from 'react-router-dom';
import {
    Card,
    CardContent,
    Typography,
    Grid,
    Chip,
    Box,
    Divider,
    IconButton
} from '@mui/material';
import BackButton from '../BackButton/BackButton';
import CloseIcon from '@mui/icons-material/Close';

const DetalleEnvio = ({ envio, onClose }) => {

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
            case 'Creado': return 'default';
            case 'En sucursal': return 'warning';
            case 'En tránsito': return 'info';
            case 'Entregado': return 'success';
            default: return 'default';
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
                {onClose ? (
                    <IconButton
                        onClick={onClose}
                        sx={{
                            backgroundColor: '#f44336',
                            color: 'white',
                            '&:hover': {
                                backgroundColor: '#d32f2f'
                            },
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

            <Typography
                variant="h4"
                gutterBottom
                sx={{ fontWeight: 'bold', mb: 3 }}
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
                        <Typography variant="overline" sx={{ fontWeight: 'bold' }}>
                            Tracking ID
                        </Typography>
                        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                            {datosEnvio.trackingId}
                        </Typography>
                    </Box>

                    <Chip
                        label={datosEnvio.estadoActual}
                        color={getEstadoColor(datosEnvio.estadoActual)}
                    />
                </Box>

                <Divider />

                <CardContent>
                    <Grid container spacing={4}>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="subtitle2">Remitente</Typography>
                            <Typography>{datosEnvio.remitente}</Typography>

                            <Typography variant="subtitle2" mt={2}>Origen</Typography>
                            <Typography>{datosEnvio.origen}</Typography>

                            <Typography variant="subtitle2" mt={2}>Tipo</Typography>
                            <Typography>{datosEnvio.tipo}</Typography>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <Typography variant="subtitle2">Destinatario</Typography>
                            <Typography>{datosEnvio.destinatario}</Typography>

                            <Typography variant="subtitle2" mt={2}>Destino</Typography>
                            <Typography>{datosEnvio.destino}</Typography>
                        </Grid>
                    </Grid>
                </CardContent>

                <Divider />

                <Box sx={{ p: 2 }}>
                    <Typography variant="body2">
                        Fecha de creación: {fechaFormateada}
                    </Typography>
                </Box>
            </Card>
        </Box>
    );
};

export default DetalleEnvio;