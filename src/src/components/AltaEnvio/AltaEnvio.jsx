import { useState } from "react";
import {
    Box,
    TextField,
    Button,
    MenuItem,
    Typography,
    Paper,
    Grid
} from "@mui/material";
import BackButton from '../BackButton/BackButton';
import PropTypes from "prop-types";

const AltaEnvio = ({ onCrear }) => {

    const [form, setForm] = useState({
        remitente: "",
        destinatario: "",
        origen: "",
        destino: "",
        tipo: "Normal",
        distancia: "",
        volumen: "",
        ventanaHoraria: "",
        restricciones: ""
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        const { remitente, destinatario, origen, destino, distancia, volumen } = form;

        if (!remitente || !destinatario || !origen || !destino || !distancia || !volumen) {
            alert("Por favor, completa los campos obligatorios (Contacto, Ubicación, Distancia y Volumen)");
            return;
        }

        onCrear({
            ...form,
            trackingId: `TRK-${Math.floor(Math.random() * 1000000)}`,
            fechaCreacion: new Date().toISOString(),
            estadoActual: "Creado"
        });

        setForm({
            remitente: "",
            destinatario: "",
            origen: "",
            destino: "",
            tipo: "Normal",
            distancia: "",
            volumen: "",
            ventanaHoraria: "",
            restricciones: ""
        });
    };

    return (
        <Paper elevation={3} sx={{ p: 3, mb: 3, borderRadius: 3 }}>
            <Box sx={{ mb: 2 }}>
                <BackButton />
            </Box>

            <Typography variant="h5" mb={2} sx={{ fontWeight: 'bold' }}>
                Alta de Envío
            </Typography>

            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <TextField fullWidth label="Remitente" name="remitente" value={form.remitente} onChange={handleChange} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField fullWidth label="Destinatario" name="destinatario" value={form.destinatario} onChange={handleChange} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField fullWidth label="Origen" name="origen" value={form.origen} onChange={handleChange} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField fullWidth label="Destino" name="destino" value={form.destino} onChange={handleChange} />
                </Grid>
                
                <Grid item xs={12} md={4}>
                    <TextField select fullWidth label="Tipo de Envío" name="tipo" value={form.tipo} onChange={handleChange}>
                        <MenuItem value="Normal">Normal</MenuItem>
                        <MenuItem value="Express">Express</MenuItem>
                    </TextField>
                </Grid>

                <Grid item xs={12} md={4}>
                    <TextField fullWidth type="number" label="Distancia (km)" name="distancia" value={form.distancia} onChange={handleChange} />
                </Grid>

                <Grid item xs={12} md={4}>
                    <TextField fullWidth type="number" label="Volumen (m³)" name="volumen" value={form.volumen} onChange={handleChange} />
                </Grid>

                <Grid item xs={12} md={6}>
                    <TextField fullWidth label="Ventana Horaria" name="ventanaHoraria" placeholder="Ej: 08:00 - 12:00" value={form.ventanaHoraria} onChange={handleChange} />
                </Grid>

                <Grid item xs={12} md={6}>
                    <TextField fullWidth label="Restricciones" name="restricciones" placeholder="Ej: Frágil, No apilar" value={form.restricciones} onChange={handleChange} />
                </Grid>

                <Grid item xs={12}>
                    <Box display="flex" justifyContent="flex-end">
                        <Button
                            variant="contained"
                            size="large"
                            onClick={handleSubmit}
                            sx={{
                                backgroundColor: "rgb(4, 170, 109)",
                                fontWeight: 'bold',
                                "&:hover": { backgroundColor: "rgb(3, 140, 90)" }
                            }}
                        >
                            Crear Envío
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </Paper>
    );
};

AltaEnvio.propTypes = {
    onCrear: PropTypes.func.isRequired
};

export default AltaEnvio;