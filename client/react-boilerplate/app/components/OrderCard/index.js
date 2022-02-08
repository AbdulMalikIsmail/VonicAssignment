import React, { useEffect, useState, counter } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles({
    root: {
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 10,
    },
    button: {
        backgroundColor: 'green',
        color: 'white',
        fontSize: 15,
        fontWeight: 'bold',
        '&:hover': {
            backgroundColor: '#00FF0040',
            color: 'green'
        }
    },
    counter: {
        color: 'green'
    }
});

export default function OrderCard({ order }) {
    const classes = useStyles();

    return (
        <Grid xs={12} sm={12} md={6} lg={4} className={classes.root}>
            <Card >
                <CardActionArea>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            Order No. : {order.id}
                        </Typography>
                        {order.orderDetails && order.orderDetails.length > 0 && order.orderDetails.map((details) =>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {details.name} x{details.quantity}
                            </Typography>
                        )}
                    </CardContent>
                </CardActionArea>
            </Card>
        </Grid>

    );
}
