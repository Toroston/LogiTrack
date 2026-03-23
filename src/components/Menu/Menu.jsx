import React from 'react';
import { Box, Typography, Paper, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import SearchIcon from '@mui/icons-material/Search';
import AssignmentIcon from '@mui/icons-material/Assignment';
import Logo from '../../assets/logo.png';
const MenuPrincipal = () => {
    const navigate = useNavigate();
    const cardStyle = {
        p: 5,
        borderRadius: 3,
        minHeight: '190px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center', 
        transition: 'all 0.3s ease-in-out', 
        cursor: 'pointer',
        '&:hover': {
        transform: 'translateY(-8px)', 
        boxShadow: 8,
        bgcolor: 'action.hover',
        },
        '&:active': {
            transform: 'translateY(-2px)',
            boxShadow: 2,
        }
    };

    return (
        <Box sx={{ maxWidth: 800, mx: 'auto', mt: 8, px: 2, textAlign: 'center' }}>
            <Box 
                sx={{ 
                display: 'flex', 
                alignItems: 'center',
                justifyContent: 'center', 
                gap: 2,
                mb: 1 
            }}
        >
            <Box 
            component="img" 
            src={Logo} 
            alt="LogiTrack Logo" 
            sx={{ 
                height: 50, 
                width: 'auto',
            }} 
            />
            <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#2563eb' }}>
            LogiTrack
            </Typography>
        </Box>
        <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 6 }}>
            Paquete Base de Gestión de Envíos (MVP)
        </Typography>
        <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} sm={4}>
            <Paper 
                elevation={3} 
                sx={{ ...cardStyle }}
                onClick={() => navigate('/envios')}
            >
                <LocalShippingIcon sx={{ fontSize: 70, color: '#1976d2', mb: 3 }} />
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                Gestión de Envíos
                </Typography>
                <Typography variant="body2" color="text.secondary">
                Alta y Listado general
                </Typography>
            </Paper>
            </Grid>
            <Grid item xs={12} sm={4}>
            <Paper 
                elevation={3} 
                sx={{ ...cardStyle }}
                onClick={() => navigate('/busqueda')} 
            >
                <SearchIcon sx={{ fontSize: 70, color: 'rgb(4, 170, 109)', mb: 3 }} />
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                Rastrear Envío
                </Typography>
                <Typography variant="body2" color="text.secondary">
                Búsqueda por ID
                </Typography>
            </Paper>
            </Grid>
            <Grid item xs={12} sm={4}>
            <Paper 
                elevation={3} 
                sx={{ ...cardStyle }}
                onClick={() => navigate('/detalle')}
            >
                <AssignmentIcon sx={{ fontSize: 70, color: '#ed6c02', mb: 3 }} />
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                Ejemplo de Detalle
                </Typography>
                <Typography variant="body2" color="text.secondary">
                Ver diseño estático
                </Typography>
            </Paper>
            </Grid>
        </Grid>
        </Box>
    );
};

export default MenuPrincipal;