import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@mui/material';

const styles = {
  grid: {
    margin: "0 -.75rem",
    width: "calc(100% + 1.5rem)",
    '&:before,&:after': {
      display: 'table',
      content: '" "',
    },
    '&:after': {
      clear: 'both',
    },
  },
};

const useStyles = makeStyles(styles);

const GridContainer = (props) => {
  const classes = useStyles();
  const { children, className, ...rest } = props;
  return (
    <>
      <Grid container {...rest} className={`${classes.grid} ${className}`}>
        {children}
      </Grid>
    </>
  );
}

export default GridContainer;