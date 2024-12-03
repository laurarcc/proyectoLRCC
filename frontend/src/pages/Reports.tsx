import {Box, Button, Container} from "@mui/material";
import {useState} from "react";
import * as React from "react";
import Menuu from "../components/Menuu.tsx";
import InformeColeccion from "../components/InformeColeccion.tsx";
import Toolbar from "@mui/material/Toolbar";
import InformesUsuarios from "../components/InformesUsuarios.tsx";

//lo que hacemos aquí es llamar InformeColeccion, primero tenemos que pulsar un botón,
//que cuando ha sido clickado pasa como true y se muestra una tabla en la que se ven los
//datos que tiene nuestra base de datos.
function Reports() {
    //en un inicio decimos que el click esté false, para que cuando se accede a la pagina de
    //reports no esté inciado desde un principio la tabla con los datos.
    const [click, setClick] = useState(false)
    const [clickU, setClickU] = useState(false)

    //define los tipos de cada atributo, los llamamos para asignarselo a un objeto.
    interface itemtype {
        id?: number
        nombre: string
        marca: string
        tipo: string
        precio: number
    }

    interface itemtypeUser {
        nombre: string
        login: string
        password: string
        rol: string
    }


    //data es un array de itemtype porque informecoleccion lo es también, y lo necesita para funcionar
    const [data, setData] = useState<itemtype[]>([]) //este es para productos
    //array de itemtypeUser porque son cosas distintas
    const [dataUser, setDataUser] = useState<itemtypeUser[]>([]) //este es para los usuarios

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

    //función que recoge los usuarios desde la base de datos y luego las añade a un array del tipo itemtypeUser
    async function getUser(){
        fetch(`http://localhost:3030/getUser`)
            .then(response => response.json())
            .then(response=>{
                setDataUser(response.data)
                setClickU(true)})
    }

    //InformeColeccion es un fichero tsx nuestro, que hemos creado nosotros donde mostraremos el informe y que le pasamos
    //los datos para que aparezcan por pantalla, data = {/*(data/dataUser)*/}
    return (
        <>
            <Container role={'main'}
                       sx={{alignItems: 'center', minHeight: '80vh'}}>
                <Box component='form'>
                    <Menuu></Menuu>
                    <Toolbar/>
                    <Button onClick={getData} variant='contained' sx={{margin:5}}>Informes Colección</Button>
                    {click ? <InformeColeccion data={data} /> : null }
                    <Button onClick={getUser} variant='contained' sx={{margin:5}}>Informes Usuarios</Button>
                    {clickU ? <InformesUsuarios data={dataUser}/>: null}

                </Box>
            </Container>
        </>
    )
}

export default Reports