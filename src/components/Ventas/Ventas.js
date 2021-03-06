import React, {Fragment, useState} from 'react';
import axios from 'axios';
import CardVenta from './CardVenta';

//material-ui
import Grid from '@material-ui/core/Grid';
import {makeStyles} from '@material-ui/core/styles';
import DateFnsUtils from '@date-io/date-fns';
import {MuiPickersUtilsProvider, KeyboardDatePicker} from '@material-ui/pickers';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';


const useStyles = makeStyles({
    list: {
        width: '85%',
        margin: '0 auto',
        backgroundColor:"blue"
    },
    button:{
        marginLeft:'1rem',
        marginRight:'1rem'
    },
    datesPicker:{
        marginLeft:'1rem',
        marginRight:'1rem'
    }

});

const Ventas = () => {
    const classes = useStyles();

    const [ventas, setVentas] = useState([]);

    const fechaAtrasada = new Date();
    fechaAtrasada.setDate(fechaAtrasada.getDate() - 1);
    const [fechaDesde, setFechaDesde] = useState(fechaAtrasada);
    const [fechaHasta, setFechaHasta] = useState(new Date());
    const handleFechaDesde = (date) => {
        setFechaDesde(date);
        console.log(date);
    };
    const handleFechaHasta = (date) => {
        setFechaHasta(date);
        console.log(date);
    };

    const handleSearch = async ()=>{
        let options = {
                method:'GET',
                params: {
                    fechaDesde: new Date(fechaDesde.getFullYear(),fechaDesde.getMonth(),fechaDesde.getDate()),
                    fechaHasta: fechaHasta
                },
                url:'https://localhost:3000/api/ventas'
            }

        await axios(options) //busco las ventas
        .then(async (data)=>{     

            //guardo los ids de las publicaciones para buscar las fotos
            let ids = [];
            data.data.map(value=>(
                ids = [ ...ids, value.items[0].item.id]
            ));

            let optionsImg = {
                method:'GET',
                params:{ids: ids.toString()},
                url:'https://localhost:3000/api/productos'
            }

            await axios(optionsImg)// busco las caracteristicas de las publicaciones
            .then((value)=>{
                //armo un json con id y url de la foto
                let img = value.data.map(prod=>({
                        id: prod.body.id, 
                        url: prod.body.secure_thumbnail
                    }
                ));
                //agrego al principal data.data la url de la foto coincidente con el id
                data.data.map((value, pos)=>(
                    data.data[pos].imgUrl = img.find(function(obj){
                        return obj.id === value.items[0].item.id;
                    }).url
                ));
                //cargo el state
                setVentas(data.data);
            }).catch(err=>{
                return new Error(err);
            })
        })
        .catch(err=>{ 
            setVentas(null);
            console.log(err);
        });
    }

    return (
        <Fragment>

            <Grid
                container
                alignItems='center'
            >

            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                    className={classes.datesPicker}
                    disableToolbar="disableToolbar"
                    variant="inline"
                    format="dd/MM/yyyy"
                    margin="normal"
                    id="fecha-desde"
                    label="Desde el dia"
                    value={fechaDesde}
                    onChange={handleFechaDesde}
                    KeyboardButtonProps={{
                        'aria-label' : 'change date'
                    }}/>

                <KeyboardDatePicker
                    className={classes.datesPicker}
                    disableToolbar="disableToolbar"
                    variant="inline"
                    format="dd/MM/yyyy"
                    margin="normal"
                    id="fecha-hasta"
                    label="Hasta el dia"
                    value={fechaHasta}
                    onChange={handleFechaHasta}
                    KeyboardButtonProps={{
                        'aria-label' : 'change date'
                    }}/>
            </MuiPickersUtilsProvider>

            <Button
                className={classes.button}
                variant="contained"
                color="secondary"
                startIcon={<SearchIcon />}
                onClick={handleSearch}
            >
                Buscar
            </Button>

            </Grid> 

            <Grid
                container
                direction="column"
                alignItems="center"
                justify="center"
            >
                {
                    ventas.map(data=>(
                        
                        <CardVenta key={data.compra_num} data={data} />
                    ))
                }
            </Grid>
        </Fragment>
    );
}

export default Ventas;