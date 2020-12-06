import React from 'react';
import {
    Page,
    Text,
    Image,
    View,
    Document,
    StyleSheet,
    Font
} from '@react-pdf/renderer';

Font.register({family: 'Arial Black', src: './fonts/ArialBlack.ttf'});
Font.register({family: 'Arial', src: './fonts/Arial.ttf'});
Font.register({family: 'Arial Bold', src: './fonts/ArialBold.ttf'});

const Boleta = ({values}) => {

    console.log("Datos en boleta: ");
    console.log(values);

    var {tipoFactura, nombreCliente, dniCliente, fecha, facturaNro, cae, caeVto, item} = values;

    //var paginas = ['ORIGINAL'];
    var tipo = 'ORIGINAL';

    const colorPrincipal = '#AB5F5F';

    const styles = StyleSheet.create({
        page: {
            display: 'flex',
            flexDirection: 'colum',
            fontSize:11,
            //backgroundColor: 'red',
            flexWrap: 'wrap',
            padding: "1cm 1cm 1cm 2cm"
        },
        borde:{
            borderTop:3,
            borderBottom:3,
            borderColor: colorPrincipal,
            height:'100%'
        },
        tipo:{
            textAlign:'center',
            marginBottom: '20rem'
        },
        logo:{
         display:'flex',
         flexDirection:'row',
         justifyContent:'flex-end',
         //backgroundColor: 'grey',
        },
        ImgLogo:{
            width: '60%',
            marginTop: '20rem'
        },
        principal:{
            //backgroundColor: 'red',
            marginTop:20,
            display:'flex',
            flexDirection:'row',
            
        },
        lateral:{
            //backgroundColor: 'yellow',
            width:'25%',
            marginRight:5,
            paddingRight:10,
            borderRight: 1,
            lineHeight: 2,
        },
        cuerpo:{
            //backgroundColor: 'green',
            width:'75%',
        },
        table:{
            display:'flex',
            flexDirection:'column',
            marginTop: 15
        },
        row:{
            display:'flex',
            flexDirection:'row',
            justifyContent:'space-between',
            alignContent:'center',
            flexWrap:'wrap',
            textAlign:'center',
            borderBottom:1,
            marginBottom: 2,
            paddingBottom: 2,
            borderColor:'grey'
        },
        colDes:{
            padding: 2,
            width:'45%',
        },
        colCant:{
            padding: 2,
            width:'10%',
        },
        colPU:{
            padding: 2,
            width:'22%',
        },
        colImp:{
            padding: 2,
            width:'22%',
        },
        totales:{
            textAlign:'right',
            backgroundColor:colorPrincipal, 
            color:'white',
            fontSize:18,
            padding:5
        }

    });

    return(    
        <Document>
                    <Page key={tipo} size="A4" style={styles.page}>
                        <View style={styles.borde}>
                            <View style={styles.logo}>
                                <Image style={styles.ImgLogo} src="https://i.imgur.com/V6LtEZk.png"></Image>
                            </View>
                            <View style={styles.principal}>
                                <View style={styles.lateral}>
                                    <View>
                                    <Text style={{fontSize:20, backgroundColor: colorPrincipal, color:'white'}}>FACTURA {tipoFactura}</Text>
                                        <Text style={{fontFamily: 'Arial Bold'}}>Consumidor Final</Text>
                                        <Text style={{fontFamily: 'Arial Bold'}}>{tipo}</Text> 
                                    </View>
                                    <View style={{marginTop:20, fontSize:10}}>
                                        <Text>IVA Responsable Inscripto</Text>
                                        <Text>CUIT: 20394132064</Text>
                                        <Text>Inicio de actividades: 21/08/2019</Text>
                                    </View>
                                    <View style={{marginTop:20, fontSize:10}}>
                                        <Text>Polonia 448, Jose C. Paz, Buenos Aires</Text>
                                        <Text>info@todofibrofa.com.ar</Text>
                                        <Text>1168004443</Text>
                                        <Text>1122505330</Text>
                                    </View>
                                    
                                </View>

                                <View style={styles.cuerpo}>
                                    <View style={{paddingLeft:10, lineHeight: 1.5,}}>
                                        <Text>Nombre/Razon social:<Text style={{fontFamily: 'Arial Bold'}}> {nombreCliente} </Text></Text>
                                        <Text>DNI/CUIT:<Text style={{fontFamily: 'Arial Bold'}}> {dniCliente} </Text></Text>
                                        <Text>Fecha:<Text style={{fontFamily: 'Arial Bold'}}> {fecha} </Text></Text>
                                        <Text>Condicion de venta:<Text style={{fontFamily: 'Arial Bold'}}> MercadoPago </Text></Text>
                                        <Text>Factura Nro:<Text style={{fontFamily: 'Arial Bold'}}> {facturaNro} </Text></Text>
                                        <Text>Pto. Venta Nro:<Text style={{fontFamily: 'Arial Bold'}}> 00005 </Text></Text>
                                        <Text>CAE:<Text style={{fontFamily: 'Arial Bold'}}> {cae} </Text></Text>
                                        <Text>Vto:<Text style={{fontFamily: 'Arial Bold'}}> {caeVto} </Text></Text>
                                    </View>
                                    <View style={styles.table}>
                                        <View style={[styles.row, {backgroundColor:colorPrincipal, color:'white'}]}>
                                            <View style={styles.colDes}>
                                                <Text>Descripcion</Text>
                                            </View>
                                            <View style={styles.colCant}>
                                                <Text>Cant.</Text>
                                            </View>
                                            <View style={styles.colPU}>
                                                <Text>Precio Unitario</Text>
                                            </View>
                                            <View style={styles.colImp}>
                                                <Text>Importe</Text>
                                            </View>
                                        </View>

                                        {
                                            item.map((el,pos)=>(
                                                <View key={"row-"+pos} style={styles.row}>
                                                    <View style={styles.colDes}>
                                                        <Text>{el.descripcion}</Text>
                                                    </View>
                                                    <View style={styles.colCant}>
                                                        <Text>{el.cantidad}</Text>
                                                    </View>
                                                    <View style={styles.colPU}>
                                                        <Text>$ {el.precioUnitario}</Text>
                                                    </View>
                                                    <View style={styles.colImp}>
                                                        <Text>$ {el.total}</Text>
                                                    </View>
                                                </View>
                                            ))
                                        }
                                    </View>

                                    <View>
                                        <View style={styles.totales}>
                                            <Text>Total: $ {item[0].total}</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </Page>

        </Document>
    )
}
 
export default Boleta;

