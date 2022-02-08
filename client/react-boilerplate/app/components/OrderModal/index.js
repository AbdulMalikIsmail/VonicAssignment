import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});

const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);

export default function OrderModal({ open, setOpen, orderDetails, createOrder }) {

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const placeOrder = () => {
        let payload = {
            products:[]
        }

        orderDetails && Object.keys(orderDetails).map((key, index) => {
            if (orderDetails[key] != 0){
                payload.products.push({name : key, quantity: orderDetails[key]})
            }
            
        })

        createOrder(payload)
    }

    return (
        <div>
            <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open} fullWidth maxWidth='sm'>
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Order Preview
                </DialogTitle>
                <DialogContent dividers>
                    {
                        orderDetails && Object.keys(orderDetails).map((key, index) => {
                            if (orderDetails[key] == 0) return
                            return (
                                <Grid container>
                                    <Grid item xs={12} sm={12} md={6} lg={6}>
                                        <Typography gutterBottom>
                                            {key}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={6} lg={6}>
                                        <Typography gutterBottom align='right'>
                                            x{orderDetails[key]}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            )
                        })
                    }
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={() => placeOrder()} color="primary">
                        Place Order
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}