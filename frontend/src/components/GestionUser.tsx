import {
    Box,
    Button,
    Container,
    Paper,
    Table, TableBody,
    TableCell, TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import * as React from "react";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../store";
import {useNavigate} from "react-router-dom";
import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";

interface itemtype {
    id?: number
    nombre: string
    login: string
    password: string
    rol: string
}

//Inicializo los valores del item. Aquí no pongo el id porque no lo necesito
const itemInitialState: itemtype = {
    nombre: '',
    login: '',
    password: '',
    rol: ''
}

function GestionUser() {
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

    const handleName = (e:any) => {
        setItem({
            ...item,
            nombre: e.target.value
        })
    }

    //Guardo en "e" todas mis variables que se insertan en el formulario, por eso luego en el insert solo llamamos a "e"
    const handleLogin = (e:any) =>{
        setItem({
            ...item,
            login: e.target.value
        })
    }

    const handlePassword = (e:any) => {
        setItem({
            ...item,
            password: e.target.value
        })
    }

    const handleRol = (e:any) => {
        setItem({
            ...item,
            rol: e.target.value
        })
    }

    const handleSubmit = (e:any) => {
        e.preventDefault();
        fetch(`http://localhost:3030/insertUser?nombre=${item.nombre}&login=${item.login}&password=${item.password}&rol=${item.rol}`)
            .then(response => response.json())
            .then(response => {
                console.log('Respuesta del servidor:', response)
                setInicio(true)
                alert("Fila insertada")
                setItem(itemInitialState)
            })
    }

    async function getData() {
        fetch(`http://localhost:3030/getUser`)
            .then(response => response.json())
            .then(response => {
                setTableData(response.data)
            })
    }


    useEffect(()=> {
        if(inicio){
            getData()
        }
        setInicio(false)
    }, [inicio])


    return (
        <>
            <Container role={'main'}
                       sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh'}}>
                <Box component='form'>
                    <Grid container spacing={2} sx={{justifyContent: 'center', alignItems: 'center'}}>
                        <Grid size = {{md:10, xs:12, lg:12}}>
                            <Typography variant='h2'>Insertar nuevos usuarios : </Typography>
                        </Grid>
                        <Grid size={{md: 6, xs: 4, lg: 6}}>
                            <TextField
                                required
                                label="Nombre"
                                variant='outlined'
                                fullWidth
                                value={item.nombre}
                                onChange={handleName}
                            />
                        </Grid>
                        <Grid size={{md: 6, xs: 4, lg: 6}}>
                            <TextField
                                required
                                label="Login"
                                variant='outlined'
                                fullWidth
                                value={item.login}
                                onChange={handleLogin}
                            />
                        </Grid>
                        <Grid size={{md: 4, xs: 6, lg: 8}}>
                            <TextField
                                required
                                label="Contraseña"
                                variant='outlined'
                                fullWidth
                                value={item.password}
                                onChange={handlePassword}
                            />
                        </Grid>
                        <Grid size={{md: 4, xs: 6, lg: 4}}>
                            <TextField
                                required
                                label="Rol usuario"
                                variant='outlined'
                                fullWidth
                                value={item.rol}
                                onChange={handleRol}
                            />
                        </Grid>
                        <Grid size={{md:10, xs:12, lg:12}}>
                            <Button onClick={handleSubmit} variant='contained'> Insertar
                            </Button>
                        </Grid>
                    </Grid>

                    <TableContainer component={Paper} sx={{ magin: 'auto', width: '80%' }}>
                        <Table sx={{ minWidth: 650 }} aria-label="tabla de objetos">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">Nombre</TableCell>
                                    <TableCell align="center">Login</TableCell>
                                    <TableCell align="center">Contraseña</TableCell>
                                    <TableCell align="center">Rol</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {tableData.map((row:itemtype)=>(
                                    <TableRow key={row.id}>
                                        <TableCell align={"center"}>
                                            {row.nombre}
                                        </TableCell>
                                        <TableCell align={"center"}>
                                            {row.login}
                                        </TableCell>
                                        <TableCell align={"center"}>
                                            {row.password}
                                        </TableCell>
                                        <TableCell align={"center"}>
                                            {row.rol}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                </Box>

            </Container>
        </>
    )
}

export default GestionUser