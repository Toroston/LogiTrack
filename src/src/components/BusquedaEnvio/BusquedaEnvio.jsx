import { useState, useEffect } from 'react';
import { Box, TextField, Button, Typography, Paper } from '@mui/material';
import { useSearchParams } from 'react-router-dom'; 
import DetalleEnvio from '../DetalleEnvio/DetalleEnvio';
import BackButton from '../BackButton/BackButton';
import PropTypes from "prop-types";

const BusquedaEnvio = ({ user }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const trackingIdParam = searchParams.get('id'); 

    const [inputBusqueda, setInputBusqueda] = useState(trackingIdParam || '');
    const [envioEncontrado, setEnvioEncontrado] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // Función para buscar en la API
    const ejecutarBusqueda = async (idParaBuscar) => {
        if (!idParaBuscar) return;
        setLoading(true);
        setError('');
        try {
            // Buscamos por trackingId exacto
            const url = `http://localhost:3001/envios?trackingId=${idParaBuscar.trim()}`;
            const response = await fetch(url);
            const resultados = await response.json();

            if (resultados.length > 0) {
                setEnvioEncontrado(resultados[0]);
            } else {
                setError('No se encontró ningún envío con ese Tracking ID.');
                setEnvioEncontrado(null);
            }
        } catch (err) {
            setError('Hubo un problema al conectar con el servidor.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // Efecto para reaccionar a cambios en la URL (parámetro ?id=...)
    useEffect(() => {
        if (trackingIdParam) {
            ejecutarBusqueda(trackingIdParam);
        } else {
            setEnvioEncontrado(null); 
        }
    }, [trackingIdParam]);

    const manejarBusquedaManual = () => {
        const idLimpio = inputBusqueda.trim();
        if (!idLimpio) {
            setError('Por favor, ingresá un Tracking ID.');
            return;
        }
        // Actualizamos la URL, lo que dispara el useEffect
        setSearchParams({ id: idLimpio }, { replace: true });
    };

    const limpiarBusqueda = () => {
        setInputBusqueda('');
        setError('');
        setSearchParams({}, { replace: true });
        setEnvioEncontrado(null);
    };

    return (
        <Box sx={{ maxWidth: 700, mx: 'auto', mt: 4, px: 2, pb: 5 }}>
            {/* Solo mostramos el BackButton general si NO hay un envío desplegado */}
            {!envioEncontrado && (
                <Box sx={{ mb: 2 }}>
                    <BackButton />
                </Box>
            )}

            <Paper 
                elevation={3} 
                sx={{ 
                    p: 3, 
                    mb: 4, 
                    borderRadius: '16px',
                    display: envioEncontrado ? 'none' : 'block' // Ocultamos el buscador si ya hay resultado
                }}
            >
                <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
                    Rastrear Envío
                </Typography>

                <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        label="Ingresá el Tracking ID (ej: TRK-123456)"
                        value={inputBusqueda}
                        disabled={loading}
                        onChange={(e) => setInputBusqueda(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') manejarBusquedaManual();
                        }}
                    />

                    <Button
                        variant="contained"
                        size="large"
                        onClick={manejarBusquedaManual}
                        disabled={loading}
                        sx={{
                            backgroundColor: "rgb(4, 170, 109)",
                            "&:hover": { backgroundColor: "rgb(3, 140, 90)" },
                            px: 4,
                            minWidth: '120px',
                            fontWeight: 'bold'
                        }}
                    >
                        {loading ? 'Buscando...' : 'Buscar'}
                    </Button>
                </Box>

                {error && (
                    <Typography color="error" sx={{ mt: 2, fontWeight: '500' }}>
                        {error}
                    </Typography>
                )}
            </Paper>

            {/* Resultado de la búsqueda */}
            {envioEncontrado && (
                <Box sx={{ mt: -2 }}>
                    <DetalleEnvio
                        envio={envioEncontrado}
                        onClose={limpiarBusqueda} // Esto habilita la "X" para volver a buscar
                        user={user}
                    />
                </Box>
            )}
        </Box>
    );
};

BusquedaEnvio.propTypes = {
    user: PropTypes.shape({
        nombre: PropTypes.string,
        rol: PropTypes.string
    }).isRequired
};

export default BusquedaEnvio;