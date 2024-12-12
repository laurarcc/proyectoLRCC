import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../store";
import {Link, useNavigate} from "react-router-dom";
import {
    Box,
    Button, Container, ListItem, ListItemButton, ListItemIcon, ListItemText,
    Paper,
    Table, TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import * as React from "react";
import ReportIcon from "@mui/icons-material/Report";

interface itemtype {
    id?: number
    articulo: string
    persona: string
    fecha: string
}

const itemInitialState: itemtype = {
    articulo: '',
    persona: '',
    fecha: ''
}

function GestionPrestamos() {
    const [item, setItem] = useState(itemInitialState)
    const userData = useSelector((state: RootState) => state.authenticator)
    const  [inicio, setInicio] = useState(true)
    const [tableData, setTableData] = useState<itemtype[]>([])

    const isLoggedin = userData.isAutenticated
    const navigate = useNavigate();

    useEffect(()=> {
        if (!isLoggedin) {
            navigate('/')
        }
    }, [isLoggedin, navigate])

    const handleArtc = (e:any) => {
        setItem({
            ...item,
            articulo : e.target.value
        })
    }

    const handlePersona = (e:any) => {
        setItem({
            ...item,
            persona: e.target.value
        })
    }

    const handleFecha = (e:any) => {
        setItem({
            ...item,
            fecha:e.target.value
        })
    }

    const handleSubmit = (e:any) => {
        e.preventDefault();
        fetch(`http://localhost:3030/insertPres?articulo=${item.articulo}&persona=${item.persona}&fecha=${item.fecha}`)
            .then(response => response.json())
            .then(response => {
                setInicio(true)
                alert("Fila insertada")
                setItem(itemInitialState)
            })
    }

    async function getPrest() {
        fetch(`http://localhost:3030/getPres`)
            .then(response => response.json())
            .then(response => {
                setTableData(response.data)
            })
    }


    useEffect(()=> {
        if(inicio){
            getPrest()
        }
        setInicio(false)
    }, [inicio])


    return(
        <>
            <Container role={'main'}
                       sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh'}}>
                <Box component='form'>
                    <Grid container spacing={2} sx={{justifyContent: 'center', alignItems: 'center'}}>
                        <Grid size = {{md:10, xs:12, lg:12}}>
                            <Typography variant='h5'>Insertar nuevos préstamos : </Typography>
                        </Grid>
                        {userData.userRol == 'admin' ? (
                            <Grid container spacing={2} sx={{justifyContent: 'center', alignItems: 'center'}}>
                                <Grid size={{md: 4, xs: 2, lg: 4}}>
                                    <TextField
                                        required
                                        label="Articulo"
                                        variant='outlined'
                                        fullWidth
                                        value={item.articulo}
                                        onChange={handleArtc}
                                    />
                                </Grid>
                            <Grid size={{md: 4, xs: 2, lg: 4}}>
                                <TextField
                                    required
                                    label="Persona"
                                    variant='outlined'
                                    fullWidth
                                    value={item.persona}
                                    onChange={handlePersona}
                                />
                            </Grid>
                            <Grid size={{md: 4, xs: 2, lg: 4}}>
                        <TextField
                            required
                            variant='outlined'
                            fullWidth
                            value={item.fecha}
                            onChange={handleFecha}
                            type='date'
                        />
                    </Grid>
                    <Grid size={{md:10, xs:12, lg:12}}>
                        <Button onClick={handleSubmit} variant='contained'> Insertar
                        </Button>
                    </Grid> </Grid>
                                )
                            : <></> }







                        <TableContainer component={Paper} sx={{ magin: 'auto', width: '80%' }}>
                            <Table sx={{ minWidth: 650 }} aria-label="tabla de objetos">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center">Articulo</TableCell>
                                        <TableCell align="center">Persona</TableCell>
                                        <TableCell align="center">Fecha</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {tableData.map((row:itemtype)=>(
                                        <TableRow key={row.id}>
                                            <TableCell align={"center"}>
                                                {row.articulo}
                                            </TableCell>
                                            <TableCell align={"center"}>
                                                {row.persona}
                                            </TableCell>
                                            <TableCell align={"center"}>
                                                {row.fecha}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                </Box>

            </Container>
        </>
    )
} export default GestionPrestamos