import React from 'react';
import {makeStyles, useTheme} from '@material-ui/core/styles'

import List from '@material-ui/core/List';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import DescriptionIcon from '@material-ui/icons/Description';
import Avatar from '@material-ui/core/Avatar';

import moment from 'moment';

const useStyles = makeStyles((theme)=>({
    img: {
        width: '100px'
    },
    paper:{
        width:'85%',
        padding:'1rem',
        margin:'1rem'
    },
    avatar:{
        width: theme.spacing(10),
        height: theme.spacing(10),
    }
}));

const CardVenta = ({data}) => {

    const theme = useTheme();
    moment().format();

    //console.log(data);
    const classes = useStyles();

    const titulo = data.items[0].item.title;
    const subtitulo = `Venta #${data.orden_id} | ${moment(data.fecha_creada).format('DD/MM/YYYY, h:mm:ss a')}.`;
    const totalCompra = data.total_compra;
    const costoDeEnvio = data.costo_envio;
    const cantidad = data.items[0].quantity;
    const costoUnitario = data.items[0].unit_price;
    const datosFactura = data.datos_factura;
    const imgUrl = data.imgUrl;

    return (
        <Paper className={classes.paper}>
            <Grid 
                container
                direction="column"
                alignItems="center"
            >
                <Grid 
                    item
                    container
                >
                    <Grid
                        item 
                        xs
                        container 
                        justify="center"
                    >
                        <Avatar alt='img producto' src={imgUrl} className={classes.avatar}/>
                    </Grid>

                    <Grid
                        item 
                        container
                        direction="column"
                        xs={7}
                    >
                        <Typography variant="h6">
                            {titulo}
                        </Typography>
                    
                        <Typography color='secondary'>
                            {subtitulo}
                        </Typography>
                    </Grid>

                    <Grid
                        item
                        container
                        md={3}
                        direction="column"
                        justify="center"
                        alignItems="flex-start"
                    >
                        <Typography>
                            {datosFactura.nombre} {datosFactura.apellido}
                        </Typography>
                
                        <Typography>
                            {datosFactura.userML}
                        </Typography>
                
                        <Typography>
                            {datosFactura.dniTipo}: {datosFactura.dni}
                        </Typography>
                    </Grid>

                </Grid>
                <Grid 
                    item 
                    container
                    justify="space-around"
                    alignItems="center"
                >
                    <Grid item xs={10}>
                        <Paper style={{backgroundColor:"#4D7EA8"}}>
                            <Grid
                                item
                                container
                                justify="space-between"
                                alignItems="center"
                                style={{color:"white", padding:'.5rem'}}
                            >
                                
                                <Typography>
                                    Subtotal: {cantidad} x ${costoUnitario} = ${parseFloat(cantidad)*parseFloat(costoUnitario)}
                                </Typography> 
                                <Typography>
                                    Envio: ${costoDeEnvio}
                                </Typography>
                                <Typography>
                                    Total: ${totalCompra}
                                </Typography>
                                
                            </Grid>
                        </Paper>
                    </Grid>

                    <Grid item >
                            <Fab color='secondary' aria-label="Facturar">
                                <DescriptionIcon />
                            </Fab>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    );
}

export default CardVenta;