import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles'

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import DescriptionIcon from '@material-ui/icons/Description';
import Avatar from '@material-ui/core/Avatar';
import Tooltip from '@material-ui/core/Tooltip';
import { Alert, AlertTitle } from '@material-ui/lab';

import moment from 'moment';
import axios from 'axios';

import DialogFactura from '../Factura/DialogFactura';

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
    
    moment().format();

    const [facturacionOK, setFacturacionOK] = useState('');
    const [facturaData, setFacturaData] = useState({});

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


    let facturar = async ()=>{

        //calculo el costo de facturacion
        let totalVenta = parseFloat(cantidad)*parseFloat(costoUnitario);
        let neto = Math.round((totalVenta/1.21) * 100) / 100;
        let iva = Math.round((neto * 0.21) * 100) / 100;
    
        //datos para facturar en ws_afip
        let data ={
            tipoComp:6,
            docTipo:99,
            docNum: parseInt(datosFactura.dni),
            importeTotal: neto + iva,
            importeNeto: neto,
            importeIva: iva
        }
    
        await axios.post('https://localhost:3000/api/facturar',data, {'content-type': 'application/x-www-form-urlencoded'}).then((res)=>{
            console.log("FACTURANDO...");

            let datos = {
                tipoFactura:'B', 
                nombreCliente: `${datosFactura.apellido} ${datosFactura.nombre}`, 
                dniCliente: datosFactura.dni,
                fecha: moment(new Date()).format('DD/MM/YYYY'),
                facturaNro: res.data.data.voucherNumber,
                cae: res.data.data.CAE,
                caeVto: res.data.data.CAEFchVto,
                item:[{
                    descripcion: titulo,
                    cantidad: cantidad,
                    precioUnitario: costoUnitario,
                    total: totalCompra
                }]
            }

            console.log(datos);

            setFacturaData(datos);
            setFacturacionOK(true);
        }).catch(err=>{
             console.log(err);
            setFacturaData(err.toString());
            setFacturacionOK(false);
        });
    }

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
                        <Tooltip title="Factura Rapida">
                            <Fab color='secondary' aria-label="Facturar" onClick={facturar}>
                                <DescriptionIcon/>
                            </Fab>
                        </Tooltip>

                        {
                            facturacionOK === true
                            ? <DialogFactura facturacionOK={facturacionOK} setFacturacionOK={setFacturacionOK} datos={facturaData}/>
                            : null
                        }
                    </Grid>

                    {
                        facturacionOK === false
                        ? <Alert severity="error">
                            <AlertTitle>Error</AlertTitle>
                                {facturaData}
                          </Alert>
                        :null
                    }
                </Grid>
            </Grid>
        </Paper>
    );
}

export default CardVenta;