import { useNavigate } from 'react-router-dom';
import { IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const BackButton = () => {
    const navigate = useNavigate();

    const handleBack = () => {
        if (window.history.length <= 2) {
            navigate('/');
        } else {
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
                width: 45,
                height: 45,
                borderRadius: '50%',
                boxShadow: 2
            }}
        >
            <ArrowBackIcon />
        </IconButton>
    );
};

export default BackButton;