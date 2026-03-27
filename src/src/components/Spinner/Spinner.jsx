import React from 'react'
import GridContainer from '../Grid/GridContainer';
import { CircularProgress } from '@mui/material';

export const Spinner = () => {
    return (
        <GridContainer
            justifyContent="center"
            alignItems="center">
            <CircularProgress color="primary" />
        </GridContainer>
    )
}