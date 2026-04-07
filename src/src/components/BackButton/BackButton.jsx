import { useNavigate, useLocation } from 'react-router-dom';
import { IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const BackButton = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleBack = () => {
        const path = location.pathname;
        const from = location.state?.from;

        if (path.startsWith('/detalle')) {
            if (from === 'busqueda') {
                navigate('/busqueda');
            } else {
                navigate('/envios');
            }
        } 

        else if (path === '/envios' || path === '/busqueda' || path === '/historial') {
            navigate('/');
        } 
        else {
            navigate(-1);
        }
    };

    return (
        <IconButton
            onClick={handleBack}
            sx={{
                backgroundColor: '#f44336',
                color: 'white',
                '&:hover': { backgroundColor: '#d32f2f' },
                width: 45, height: 45,
                borderRadius: '50%', boxShadow: 2, mb: 2
            }}
        >
            <ArrowBackIcon />
        </IconButton>
    );
};

export default BackButton;