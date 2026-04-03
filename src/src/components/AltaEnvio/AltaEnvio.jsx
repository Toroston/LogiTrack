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
        restricciones: "Ninguna"
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        const { remitente, destinatario, origen, destino, distancia, volumen, ventanaHoraria } = form;
        if (!remitente || !destinatario || !origen || !destino || !distancia || !volumen || !ventanaHoraria) {
            alert("Por favor, completa todos los campos del envío.");
            return;
        }
        onCrear(form);
        setForm({
            remitente: "",
            destinatario: "",
            origen: "",
            destino: "",
            tipo: "Normal",
            distancia: "",
            volumen: "",
            ventanaHoraria: "",
            restricciones: "Ninguna"
        });
    };

    return (
        <Paper elevation={3} sx={{ p: 3, mb: 3, borderRadius: 3 }}>
            <Typography variant="h5" mb={2} sx={{ fontWeight: 'bold', color: '#333' }}>
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
                    <TextField select fullWidth label="Restricciones" name="restricciones" value={form.restricciones} onChange={handleChange}>
                        <MenuItem value="Ninguna">Ninguna</MenuItem>
                        <MenuItem value="Fragil">Fragil</MenuItem>
                        <MenuItem value="Frio">Frio</MenuItem>
                        <MenuItem value="Peligroso">Peligroso</MenuItem>
                    </TextField>
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