import { useNavigate } from 'react-router-dom';
import { IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const BackButton = () => {
    const navigate = useNavigate();

    return (
        <IconButton
            onClick={() => navigate(-1)}
            sx={{
                backgroundColor: 'red',
                color: 'white',
                '&:hover': {
                    backgroundColor: 'darkred'
                },
                width: 50,
                height: 50,
                borderRadius: '50%'
            }}
        >
            <ArrowBackIcon />
        </IconButton>
    );
};

export default BackButton;