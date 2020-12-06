import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';

import {PDFViewer, pdf} from '@react-pdf/renderer';
import { saveAs } from 'file-saver';
import Boleta from '../../Boleta';

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});



export default function DialogFactura({facturacionOK, setFacturacionOK, datos}) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(facturacionOK);
  const [loadingPDF, setLoadingPDF] = React.useState({estado: false, blob:''});

  React.useEffect(()=>{
    
    //obtengo el blob del pdf y lo guardo en el state
    const blob = pdf(<Boleta values={datos}/>).toBlob();
    blob.then((data)=>{
        setLoadingPDF({estado: true, blob: data});
    }).catch(err=>{
        setLoadingPDF({estado: false, blob: ''});
        console.log(err);
    })

  },[datos]);
  
  //guardo el pdf
  const descargar = ()=>{
    saveAs(loadingPDF.blob, `factura_${datos.tipoFactura}_${datos.nombreCliente}.pdf`);
    handleClose();
  }

  //cierro la ventana
  const handleClose = () => {
    setOpen(false);
    setFacturacionOK("");
  };

  return (
    <div>
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Vista Previa
            </Typography>
                {
                    loadingPDF.estado === false
                    ? <Button autoFocus color="inherit"> 
                        Cargando...
                      </Button> 
                    : <Button autoFocus color="inherit" onClick={descargar}> 
                        Descargar
                      </Button>
                }
          </Toolbar>
        </AppBar>
            <PDFViewer width="100%" height="100%">
                <Boleta values={datos}></Boleta>
            </PDFViewer>
      </Dialog>
    </div>
  );
}
