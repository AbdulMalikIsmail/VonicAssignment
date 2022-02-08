import React, { useEffect, useState, counter } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

const useStyles = makeStyles({
    root: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        backgroundColor: 'white',
        height: 60
    },
    buttonGrid:{
        padding:10,
        
    },
    button:{
        backgroundColor:'green',
        color:'white',
        '&:hover':{
            backgroundColor:'#00FF0040',
            color:'green'
        }
    },
    containerGrid:{ 
        height: '100%', 
        alignSelf: 'center' 
    }
});

export default function PaymentFooter({ onPlaceOrder }) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid container justifyContent='flex-end' className={classes.containerGrid}>
                <Grid item className={classes.buttonGrid}>
                    <Button className={classes.button} onClick={() => onPlaceOrder()}> <ShoppingCartIcon /> Place Order</Button>
                </Grid>
            </Grid>

        </div>

    );
}
