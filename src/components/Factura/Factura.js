import React from 'react';
import {
    PDFViewer,
} from '@react-pdf/renderer'

import Boleta from '../../Boleta';

const Factura = () => {


    var datos = {
        tipoFactura:'B', 
        nombreCliente:'Vanessa', 
        dniCliente: '40287264',
        fecha:'03/12/2020',
        facturaNro: '00003',
        cae: '3039494039',
        caeVto:'03/01/2021'
    }

    

    return ( 
        <React.Fragment>
            <PDFViewer width="100%" height="600px">
                <Boleta values={datos}></Boleta>
            </PDFViewer>
        </React.Fragment>
     );
}
 
export default Factura;