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
    Select
} from '@mui/material';
import BackButton from '../BackButton/BackButton';
import CloseIcon from '@mui/icons-material/Close';

const estados = ['Creado', 'En sucursal', 'En tránsito', 'Entregado'];

const DetalleEnvio = ({ envio, onClose, user }) => {

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

    const fechaFormateada = new Date(datosEnvio.fechaCreacion).toLocaleDateString('es-AR', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });

    const handleGuardar = () => {
        setEditando(false);
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

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        {!editando ? (
                            <Chip label={estadoActual} color={getEstadoColor(estadoActual)} />
                        ) : (
                            <Select
                                value={estadoActual}
                                onChange={(e) => setEstadoActual(e.target.value)}
                                size="small"
                            >
                                {estados.map((estado) => (
                                    <MenuItem key={estado} value={estado}>
                                        {estado}
                                    </MenuItem>
                                ))}
                            </Select>
                        )}

                        {esSupervisor && (
                            !editando ? (
                                <Button
                                    variant="outlined"
                                    size="small"
                                    onClick={() => setEditando(true)}
                                >
                                    Editar
                                </Button>
                            ) : (
                                <Button
                                    variant="contained"
                                    size="small"
                                    onClick={handleGuardar}
                                >
                                    Guardar
                                </Button>
                            )
                        )}
                    </Box>
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