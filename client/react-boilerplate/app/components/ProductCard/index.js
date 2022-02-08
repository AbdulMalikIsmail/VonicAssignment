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
        fontSize:15,
        fontWeight:'bold',
        '&:hover': {
            backgroundColor: '#00FF0040',
            color: 'green'
        }
    },
    counter:{
        color: 'green'
    }
});

export default function ProductCard({ product, onQuantityChange }) {
    const classes = useStyles();

    const [counter, setCounter] = useState(0);

    useEffect(() => {
        onQuantityChange({ [product.name]: counter })
    }, [counter])

    return (
        <Grid xs={12} sm={12} md={6} lg={4} className={classes.root}>
            <Card >
                <CardActionArea>
                    {/* <CardMedia
                        component="img"
                        alt="Contemplative Reptile"
                        height="140"
                        image="/static/images/cards/contemplative-reptile.jpg"
                        title="Contemplative Reptile"
                    /> */}
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {product.name}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {product.description}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <ButtonGroup size="small" aria-label="small outlined button group">
                        {<Button className={classes.button} disabled={counter <= 0} onClick={() => {
                            setCounter(counter - 1)
                        }}>-</Button>}
                        {<Button disabled style={{color: 'green'}}>{counter}</Button>}
                        <Button className={classes.button} onClick={() => { setCounter(counter + 1) }}>+</Button>
                    </ButtonGroup>
                </CardActions>
            </Card>
        </Grid>

    );
}
