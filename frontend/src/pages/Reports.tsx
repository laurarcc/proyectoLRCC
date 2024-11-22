import {Box, Button, Container, Typography} from "@mui/material";
import EjemploInformesAlu from "../components/EjemploInformesAlu.tsx";
import {useState} from "react";
import * as React from "react";
import Menuu from "../components/Menuu.tsx";
import InformeColeccion from "../components/InformeColeccion.tsx";

function Reports() {
    const [click, setClick] = useState(false)

    interface itemtype {
        id?: number
        nombre: string
        marca: string
        tipo: string
        precio: number
    }
    const [data, setData] = useState<itemtype[]>([])

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
                       sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh'}}>
                <Box component='form'>
                    <Menuu></Menuu>
                    <Button onClick={getData} variant='contained'>INFORMES COLECCIÓN</Button>
                    {click ? <InformeColeccion data={data} /> : null }

                </Box>
            </Container>
        </>
    )
}

export default Reports