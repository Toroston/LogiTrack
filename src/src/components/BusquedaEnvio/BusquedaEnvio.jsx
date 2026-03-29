import { useState } from 'react';
import { Box, TextField, Button, Typography, Paper } from '@mui/material';
import DetalleEnvio from '../DetalleEnvio/DetalleEnvio';
import BackButton from '../BackButton/BackButton';
import PropTypes from "prop-types";

const BusquedaEnvio = ({user}) => {
    const [inputBusqueda, setInputBusqueda] = useState('');
    const [envioEncontrado, setEnvioEncontrado] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const manejarBusqueda = async () => {
        setError('');
        setEnvioEncontrado(null);

        if (!inputBusqueda.trim()) {
            setError('Por favor, ingresá un Tracking ID.');
            return;
        }

        setLoading(true);
        try {
            const url = `http://localhost:3001/envios?trackingId=${inputBusqueda.trim()}`;
            const response = await fetch(url);
            
            if (!response.ok) throw new Error('Error en la conexión con el servidor');

            const resultados = await response.json();

            if (resultados.length > 0) {
                setEnvioEncontrado(resultados[0]);
            } else {
                setError('No se encontró ningún envío con ese Tracking ID.');
            }
        } catch (err) {
            setError('Hubo un problema al conectar con el servidor.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{ maxWidth: 700, mx: 'auto', mt: 4, px: 2 }}>
            <Box sx={{ mb: 2 }}>
                <BackButton />
            </Box>

            <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
                <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
                    Rastrear Envío
                </Typography>

                <Box sx={{ display: 'flex', gap: 2 }}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        label="Ingresá el Tracking ID"
                        value={inputBusqueda}
                        disabled={loading}
                        onChange={(e) => setInputBusqueda(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') manejarBusqueda();
                        }}
                    />

                    <Button
                        variant="contained"
                        size="large"
                        onClick={manejarBusqueda}
                        disabled={loading}
                        sx={{
                            backgroundColor: "rgb(4, 170, 109)",
                            "&:hover": { backgroundColor: "rgb(3, 140, 90)" },
                            px: 4,
                            minWidth: '120px'
                        }}
                    >
                        {loading ? 'Buscando...' : 'Buscar'}
                    </Button>
                </Box>

                {error && (
                    <Typography color="error" sx={{ mt: 2 }}>
                        {error}
                    </Typography>
                )}
            </Paper>

            {envioEncontrado && (
                <Box sx={{ mt: -4 }}>
                    <DetalleEnvio
                        envio={envioEncontrado}
                        onClose={() => setEnvioEncontrado(null)}
                        user={user}
                    />
                </Box>
            )}
        </Box>
    );
};

BusquedaEnvio.propTypes = {
    user: PropTypes.object.isRequired
};

export default BusquedaEnvio;