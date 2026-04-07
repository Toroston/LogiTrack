import { useState } from "react";
import {
    Box,
    TextField,
    Button,
    Typography,
    Paper,
    InputAdornment,
    IconButton,
    Snackbar,
    Alert
} from "@mui/material";
import { 
    PersonOutline, 
    LockOutlined, 
    Visibility, 
    VisibilityOff 
} from "@mui/icons-material";
import logo from "../../assets/logo.png"; 
import PropTypes from "prop-types";

const usuariosMock = [
    { usuario: "admin", password: "1234", rol: "Supervisor" },
    { usuario: "operador", password: "1234", rol: "Operador" },
    { usuario: "cliente", password: "1234", rol: "Usuario" }
];

const Login = ({ onLogin }) => {
    const [form, setForm] = useState({ usuario: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);

    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [mensajeError, setMensajeError] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') return;
        setOpenSnackbar(false);
    };

    const handleSubmit = () => {
        if (!form.usuario || !form.password) {
            setMensajeError("Por favor, completa todos los campos");
            setOpenSnackbar(true);
            return;
        }

        const userEncontrado = usuariosMock.find(
            (u) => u.usuario === form.usuario && u.password === form.password
        );

        if (!userEncontrado) {
            setMensajeError("Usuario o contraseña incorrectos");
            setOpenSnackbar(true);
            return;
        }

        onLogin(userEncontrado);
    };

    return (
        <Box
            sx={{
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
                p: 2
            }}
        >
            <Paper
                elevation={10}
                sx={{
                    display: "flex",
                    borderRadius: 4,
                    overflow: "hidden",
                    width: 850,
                    minHeight: 500,
                    boxShadow: "0 20px 40px rgba(0,0,0,0.12)"
                }}
            >

                <Box
                    sx={{
                        flex: 1.2,
                        background: "linear-gradient(45deg, rgb(4, 170, 109), rgb(2, 120, 77))",
                        display: { xs: "none", md: "flex" },
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        color: "white",
                        p: 4,
                        textAlign: "center"
                    }}
                >
                    <img
                        src={logo}
                        alt="Logitrack Logo"
                        style={{
                            width: "220px",
                            marginBottom: "20px",
                            filter: "brightness(0) invert(1) drop-shadow(0px 4px 10px rgba(0,0,0,0.1))"
                        }}
                    />
                    <Typography variant="h4" fontWeight="700" gutterBottom>
                        Logitrack
                    </Typography>
                    <Typography variant="body1" sx={{ opacity: 0.9 }}>
                        Gestión inteligente de logística y trazabilidad de envíos.
                    </Typography>
                </Box>

                <Box
                    sx={{
                        flex: 1,
                        p: { xs: 4, md: 6 },
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        bgcolor: "white"
                    }}
                >
                    <Typography variant="h4" fontWeight="800" color="#333" mb={1}>
                        Bienvenido
                    </Typography>
                    <Typography variant="body2" color="textSecondary" mb={4}>
                        Ingresá tus credenciales para acceder al sistema
                    </Typography>

                    <TextField
                        fullWidth
                        label="Usuario"
                        name="usuario"
                        variant="outlined"
                        value={form.usuario}
                        onChange={handleChange}
                        sx={{ mb: 2.5 }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <PersonOutline color="action" />
                                </InputAdornment>
                            ),
                        }}
                    />

                    <TextField
                        fullWidth
                        label="Contraseña"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        variant="outlined"
                        value={form.password}
                        onChange={handleChange}
                        onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                        sx={{ mb: 4 }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <LockOutlined color="action" />
                                </InputAdornment>
                            ),
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={() => setShowPassword(!showPassword)}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                    />

                    <Button
                        fullWidth
                        variant="contained"
                        size="large"
                        onClick={handleSubmit}
                        sx={{
                            py: 1.5,
                            borderRadius: 2,
                            fontSize: "1rem",
                            fontWeight: "bold",
                            textTransform: "none",
                            backgroundColor: "rgb(4, 170, 109)",
                            boxShadow: "0 4px 12px rgba(4, 170, 109, 0.3)",
                            "&:hover": {
                                backgroundColor: "rgb(3, 140, 90)",
                                boxShadow: "0 6px 16px rgba(4, 170, 109, 0.4)"
                            }
                        }}
                    >
                        Ingresar al Sistema
                    </Button>

                    <Typography variant="caption" align="center" display="block" mt={4} color="textSecondary">
                        © {new Date().getFullYear()} Logitrack ERP - Todos los derechos reservados.
                    </Typography>
                </Box>
            </Paper>

            <Snackbar 
                open={openSnackbar} 
                autoHideDuration={4000} 
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert 
                    onClose={handleCloseSnackbar} 
                    severity="error" 
                    variant="filled" 
                    sx={{ width: '100%', borderRadius: '10px', fontWeight: '500' }}
                >
                    {mensajeError}
                </Alert>
            </Snackbar>
        </Box>
    );
};

Login.propTypes = {
    onLogin: PropTypes.func.isRequired,
};

export default Login;