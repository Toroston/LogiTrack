import { useState } from 'react';
import { Box, TextField, Button, Typography, Paper } from '@mui/material';
import DetalleEnvio from '../DetalleEnvio/DetalleEnvio';

const enviosMock = [
    {
        trackingId: "TRK-123456",
        remitente: "Carlos López",
        origen: "Sucursal Norte, CABA",
        tipo: "Normal",
        destinatario: "Ana Martínez",
        destino: "Mendoza Capital",
        estadoActual: "Creado",
        fechaCreacion: "2026-03-22T10:00:00Z"
    },
    {
        trackingId: "TRK-841328",
        remitente: "Juan Pérez",
        origen: "Sucursal Centro, CABA",
        tipo: "Express",
        destinatario: "María Gómez",
        destino: "Calle Falsa 123, Córdoba",
        estadoActual: "En tránsito",
        fechaCreacion: "2026-03-23T07:30:00Z"
    }
];

const BusquedaEnvio = () => {
    const [inputBusqueda, setInputBusqueda] = useState('');
    const [envioEncontrado, setEnvioEncontrado] = useState(null);
    const [error, setError] = useState('');

    const manejarBusqueda = () => {
        setError('');
        setEnvioEncontrado(null);
        if (!inputBusqueda.trim()) {
        setError('Por favor, ingresá un Tracking ID.');
        return;
        }
        const resultado = enviosMock.find(
            (envio) => envio.trackingId.toUpperCase() === inputBusqueda.trim().toUpperCase()
        );

        if (resultado) {
        setEnvioEncontrado(resultado);
        } else {
            setError('No se encontró ningún envío con ese Tracking ID.');
        }
    };

    return (
    <Box sx={{ maxWidth: 700, mx: 'auto', mt: 4, px: 2 }}>
        <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
                Rastrear Envío
            </Typography>
        
            <Box sx={{ display: 'flex', gap: 2 }}>
                <TextField
                    fullWidth
                    label="Ingresá el Tracking ID"
                    variant="outlined"
                    value={inputBusqueda}
                    onChange={(e) => setInputBusqueda(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') manejarBusqueda();
                    }}
                />
            <Button 
                variant="contained" 
                size="large"
                onClick={manejarBusqueda}
                sx={{ 
                    backgroundColor: "rgb(4, 170, 109)", 
                    "&:hover": { backgroundColor: "rgb(3, 140, 90)" },
                    px: 4
                }}
            >
                Buscar
            </Button>
            </Box>
            {error && (
                <Typography color="error" sx={{ mt: 2, fontWeight: 'medium' }}>
                    {error}
                </Typography>
            )}
        </Paper>
        {envioEncontrado && (
        <Box sx={{ mt: -4 }}>
            <DetalleEnvio envio={envioEncontrado} />
        </Box>
        )}

    </Box>
    );
};

export default BusquedaEnvio;