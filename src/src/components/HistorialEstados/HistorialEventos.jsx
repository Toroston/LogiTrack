import React from 'react';
import { useLocation } from 'react-router-dom';
import {
    Box,
    Typography,
    Card,
    CardContent,
    Chip,
    Stack
} from '@mui/material';
import BackButton from '../BackButton/BackButton';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import StoreIcon from '@mui/icons-material/Store';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

const getEstadoIcon = (estado) => {
    switch (estado) {
        case 'En sucursal':
            return <StoreIcon color="warning" />;
        case 'En tránsito':
            return <LocalShippingIcon color="info" />;
        case 'Entregado':
            return <CheckCircleIcon color="success" />;
        default:
            return <FiberManualRecordIcon color="disabled" />;
    }
};

const getEstadoColor = (estado) => {
    switch (estado) {
        case 'En sucursal': return 'warning';
        case 'En tránsito': return 'info';
        case 'Entregado': return 'success';
        default: return 'default';
    }
};

const HistorialEventos = () => {
    const location = useLocation();
    const historial = location.state?.historial || [];

    return (
        <Box sx={{ maxWidth: 700, mx: 'auto', mt: 6, px: 2 }}>
            <BackButton />

            <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold' }}>
                Historial de Envío
            </Typography>

            {historial.length === 0 ? (
                <Typography>No hay eventos registrados</Typography>
            ) : (
                <Stack spacing={3}>
                    {historial.map((evento, index) => (
                        <Box key={index} sx={{ display: 'flex', alignItems: 'flex-start' }}>
                            
                            {/* Línea + icono */}
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mr: 2 }}>
                                {getEstadoIcon(evento.estado)}

                                {index !== historial.length - 1 && (
                                    <Box
                                        sx={{
                                            width: '2px',
                                            height: 60,
                                            bgcolor: 'grey.300',
                                            mt: 1
                                        }}
                                    />
                                )}
                            </Box>

                            {/* Card */}
                            <Card sx={{ flex: 1, borderRadius: 3, boxShadow: 2 }}>
                                <CardContent>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                                            {evento.estado}
                                        </Typography>

                                        <Chip
                                            label={evento.usuario}
                                            size="small"
                                            variant="outlined"
                                        />
                                    </Box>

                                    <Typography variant="body2" color="text.secondary">
                                        {new Date(evento.timestamp).toLocaleDateString()}
                                    </Typography>
                                </CardContent>
                            </Card>

                        </Box>
                    ))}
                </Stack>
            )}
        </Box>
    );
};

export default HistorialEventos;