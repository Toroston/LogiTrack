import { useState } from "react";
import {
    Box,
    TextField,
    Button,
    MenuItem,
    Typography,
    Paper,
    Grid,
    Snackbar,
    Alert,
    Collapse,
    Divider
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import PropTypes from "prop-types";

const AltaEnvio = ({ onCrear }) => {
    const [expandido, setExpandido] = useState(false);
    
    const [form, setForm] = useState({
        remitente: "", destinatario: "", origen: "", destino: "",
        tipo: "Normal", distancia: "", volumen: "", ventanaHoraria: "", restricciones: "Ninguna"
    });

    const [openSnack, setOpenSnack] = useState(false);
    const [error, setError] = useState(false);

    // Color verde principal para reutilizar
    const verdeLogitrack = "rgb(4, 170, 109)";
    const verdeHover = "rgb(3, 140, 90)";

    const formatVentanaHoraria = (value) => {
        let nums = value.replace(/\D/g, "");
        if (nums.length >= 2) {
            let h1 = parseInt(nums.slice(0, 2));
            if (h1 > 23) nums = "23" + nums.slice(2);
        }
        if (nums.length >= 4) {
            let m1 = parseInt(nums.slice(2, 4));
            if (m1 > 59) nums = nums.slice(0, 2) + "59" + nums.slice(4);
        }
        if (nums.length >= 6) {
            let h2 = parseInt(nums.slice(4, 6));
            if (h2 > 23) nums = nums.slice(0, 4) + "23" + nums.slice(6);
        }
        if (nums.length >= 8) {
            let m2 = parseInt(nums.slice(6, 8));
            if (m2 > 59) nums = nums.slice(0, 6) + "59";
        }
        const limited = nums.slice(0, 8);
        if (limited.length <= 2) return limited;
        if (limited.length <= 4) return `${limited.slice(0, 2)}:${limited.slice(2)}`;
        if (limited.length <= 6) return `${limited.slice(0, 2)}:${limited.slice(2, 4)} - ${limited.slice(4)}`;
        return `${limited.slice(0, 2)}:${limited.slice(2, 4)} - ${limited.slice(4, 6)}:${limited.slice(6, 8)}`;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (error) setError(false); 
        if (name === "ventanaHoraria") {
            setForm({ ...form, [name]: formatVentanaHoraria(value) });
        } else {
            setForm({ ...form, [name]: value });
        }
    };

    const handleSubmit = () => {
        const { remitente, destinatario, origen, destino, distancia, volumen, ventanaHoraria } = form;
        if (!remitente || !destinatario || !origen || !destino || !distancia || !volumen || ventanaHoraria.length < 13) {
            setError(true);
            setTimeout(() => setError(false), 3000);
            return;
        }
        onCrear(form);
        setOpenSnack(true);
        setError(false);
        setForm({
            remitente: "", destinatario: "", origen: "", destino: "",
            tipo: "Normal", distancia: "", volumen: "", ventanaHoraria: "", restricciones: "Ninguna"
        });
    };

    return (
        <Box sx={{ mb: 4 }}>
            {/* Cabecera con el botón de Toggle actualizado */}
            <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#333' }}>
                    Gestión de Envíos
                </Typography>
                <Button 
                    variant="contained" // Cambiado de 'outlined' a 'contained' para tener fondo sólido
                    startIcon={expandido ? <KeyboardArrowUpIcon /> : <AddIcon />}
                    onClick={() => setExpandido(!expandido)}
                    sx={{ 
                        borderRadius: 2, 
                        textTransform: 'none',
                        fontWeight: 'bold',
                        backgroundColor: expandido ? "#757575" : verdeLogitrack, // Gris si está expandido, verde si no
                        color: "#fff", // Letras blancas siempre
                        '&:hover': { 
                            backgroundColor: expandido ? "#616161" : verdeHover 
                        }
                    }}
                >
                    {expandido ? "Ocultar Formulario" : "Nuevo Envío"}
                </Button>
            </Box>

            <Collapse in={expandido} timeout="auto">
                <Paper elevation={3} sx={{ p: 3, borderRadius: 3, border: '1px solid #eee' }}>
                    
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
                            <TextField 
                                fullWidth label="Ventana Horaria" name="ventanaHoraria" 
                                placeholder="08:00 - 18:00" value={form.ventanaHoraria} 
                                onChange={handleChange} inputProps={{ maxLength: 13 }}
                            />
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
                            <Divider sx={{ my: 1 }} />
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 2 }}>
                                <Box sx={{ flex: 1 }} /> 
                                <Box sx={{ flex: 2, display: 'flex', justifyContent: 'center' }}>
                                    <Collapse in={error}>
                                        <Alert severity="error" variant="filled" sx={{ borderRadius: 2, py: 0 }}>
                                            Complete todos los campos correctamente
                                        </Alert>
                                    </Collapse>
                                </Box>
                                <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
                                    <Button
                                        variant="contained"
                                        size="large"
                                        onClick={handleSubmit}
                                        sx={{
                                            backgroundColor: verdeLogitrack,
                                            fontWeight: 'bold',
                                            color: '#fff',
                                            "&:hover": { backgroundColor: verdeHover }
                                        }}
                                    >
                                        Crear Envío
                                    </Button>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </Paper>
            </Collapse>

            <Snackbar 
                open={openSnack} 
                autoHideDuration={2000} 
                onClose={() => setOpenSnack(false)}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <Alert onClose={() => setOpenSnack(false)} severity="success" variant="filled" sx={{ width: '100%' }}>
                    ¡Envío creado con éxito!
                </Alert>
            </Snackbar>
        </Box>
    );
};

AltaEnvio.propTypes = {
    onCrear: PropTypes.func.isRequired
};

export default AltaEnvio;