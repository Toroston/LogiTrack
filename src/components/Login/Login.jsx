import { useState } from "react";
import {
    Box,
    TextField,
    Button,
    Typography,
    Paper
} from "@mui/material";
import logo from "../../assets/logo.png"; 

const usuariosMock = [
    { usuario: "admin", password: "1234", rol: "Supervisor" },
    { usuario: "operador", password: "1234", rol: "Operador" },
    { usuario: "cliente", password: "1234", rol: "Usuario" }
];

const Login = ({ onLogin }) => {

    const [form, setForm] = useState({
        usuario: "",
        password: ""
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        const userEncontrado = usuariosMock.find(
            (u) =>
                u.usuario === form.usuario &&
                u.password === form.password
        );

        if (!userEncontrado) {
            alert("Usuario o contraseña incorrectos");
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
                backgroundColor: "#f5f5f5"
            }}
        >
            <Paper
                elevation={4}
                sx={{
                    display: "flex",
                    borderRadius: 3,
                    overflow: "hidden",
                    width: 700
                }}
            >
                <Box
                    sx={{
                        flex: 1,
                        backgroundColor: "#e0e0e0",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                >
                    <img
                        src={logo}
                        alt="Logo"
                        style={{
                            width: 180,
                            filter: "drop-shadow(0px 4px 10px rgba(0,0,0,0.2))"
                        }}
                    />
                </Box>

                <Box
                    sx={{
                        flex: 1,
                        p: 4,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center"
                    }}
                >
                    <Typography variant="h5" mb={3}>
                        Iniciar sesión
                    </Typography>

                    <TextField
                        label="Usuario"
                        name="usuario"
                        value={form.usuario}
                        onChange={handleChange}
                        fullWidth
                        sx={{ mb: 2 }}
                    />

                    <TextField
                        type="password"
                        label="Contraseña"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        fullWidth
                        sx={{ mb: 3 }}
                    />

                    <Button
                        variant="contained"
                        onClick={handleSubmit}
                        sx={{
                            backgroundColor: "rgb(4, 170, 109)",
                            "&:hover": {
                                backgroundColor: "rgb(3, 140, 90)"
                            }
                        }}
                    >
                        Ingresar
                    </Button>
                </Box>
            </Paper>
        </Box>
    );
};

export default Login;