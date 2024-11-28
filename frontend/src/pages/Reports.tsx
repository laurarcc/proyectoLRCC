import {Box, Button, Container, Tooltip} from "@mui/material";
import {useState} from "react";
import * as React from "react";
import Menuu from "../components/Menuu.tsx";
import InformeColeccion from "../components/InformeColeccion.tsx";
import Toolbar from "@mui/material/Toolbar";

//lo que hacemos aquí es llamar InformeColeccion, primero tenemos que pulsar un botón,
//que cuando ha sido clickado pasa como true y se muestra una tabla en la que se ven los
//datos que tiene nuestra base de datos.
function Reports() {
    //en un inicio decimos que el click esté false, para que cuando se accede a la pagina de
    //reports no esté inciado desde un principio la tabla con los datos.
    const [click, setClick] = useState(false)

    //define los tipos de cada atributo, los llamamos para asignarselo a un objeto.
    interface itemtype {
        id?: number
        nombre: string
        marca: string
        tipo: string
        precio: number
    }

    //data es un array de itemtype porque informecoleccion lo es también, y lo necesita para funcionar
    const [data, setData] = useState<itemtype[]>([])

    //hacemos una función asyncrona que se llamada getData() con un fetch dentro, que a su vez llama
    //a la clase getData() que recoge los datos de la bbdd con un select, después de recoger dichos datos,
    //hace un setData(response.data)
    async function getData() {
        fetch(`http://localhost:3030/getData`)
            .then(response => response.json())
            .then(response => {
                setData(response.data)
                setClick(true)
            })
    }

    return (
        <>
            <Container role={'main'}
                       sx={{alignItems: 'center', minHeight: '80vh'}}>
                <Box component='form'>
                    <Menuu></Menuu>
                    <Toolbar/>
                    <Tooltip title={"Informes Coleccion"} arrow>
                    <Button onClick={getData} variant='contained' sx={{margin:5}}>INFORMES COLECCIÓN</Button>
                    </Tooltip>
                    {click ? <InformeColeccion data={data} /> : null }

                </Box>
            </Container>
        </>
    )
}

export default Reports