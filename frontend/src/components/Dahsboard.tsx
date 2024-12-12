//Creamos el tipo itemtype.Este tipo será un objeto con un id opcional de tipo number
//nombre, marca y tipo de tipo string y el precio de tipo number
import {
    Box,
    Button,
    Container,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow, TextField, Typography
} from "@mui/material";
import {useEffect, useState} from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Grid from "@mui/material/Grid2";
import {useSelector} from "react-redux";
import {RootState} from "../store";
import * as React from "react";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import AdbIcon from "@mui/icons-material/Adb";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";

interface itemtype {
    id?: number
    nombre: string
    marca: string
    tipo: string
    precio: number
}

//Inicializo los valores del item. Aquí no pongo el id porque no lo necesito
const itemInitialState: itemtype = {
    nombre: '',
    marca: '',
    tipo: '',
    precio: 0
}


function Dahsboard() {
    //Una variable en la que almacenmos los datos obtenidos del select
    const [tableData, setTableData] = useState<itemtype[]>([])
    const  [inicio, setInicio] = useState(true)
    const [item, setItem] = useState(itemInitialState) //Declaramos el useState del item de nuestro código
    const userData = useSelector((state: RootState) => state.authenticator)
    const [click, setClick] = useState(true)

    async function getData() {
        fetch(`http://localhost:3030/getData`)
            .then(response => response.json())
            .then(response => {
                setTableData(response.data)
            })
    }

    //Cada vez que entre a la página lo hace sin que tengamos que llamarlo
    useEffect(()=> {
        if(inicio){
            getData()
        }
        setInicio(false)
    }, [inicio])

    const handleSubmit = (e:any) => {
        e.preventDefault();
        fetch(`http://localhost:3030/insertData?nombre=${item.nombre}&marca=${item.marca}&tipo=${item.tipo}&precio=${item.precio})`)
        .then(response => response.json())
            .then(response => {
                console.log('Respuesta del servidor:', response)
                setInicio(true)
                alert("Fila insertada")
                setItem(itemInitialState)
            })
    }
//CUIDADO EN EL FETCH, COPIAR Y PEGAR PORQUE LAS COMILLAS SON UN ROLLO
    const handleDeleteItem = (row:itemtype) => {
        fetch(`http://localhost:3030/deleteData?id=${row.id}`)
            .then(response => response.json())
            .then(response => {setInicio(true)})
        alert("Fila eliminada")
    }

    const handleNombre = (e:any) => {
        setItem({
            ...item,
            nombre: e.target.value
        })
    }

    //Guardo en "e" todas mis variables que se insertan en el formulario, por eso luego en el insert solo llamamos a "e"
    const handleMarca = (e:any) =>{
        setItem({
            ...item,
            marca: e.target.value
        })
    }

    const handleTipo = (e:any) => {
        setItem({
            ...item,
            tipo: e.target.value
        })
    }

    const handlePrecio = (e:any) => {
        setItem({
            ...item,
            precio: e.target.value
        })
    }

    return (
        <>
            <Container role={'main'}
                       sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh'}}>
                <Box component='form'>
                    <Grid container spacing={2} sx={{justifyContent: 'center', alignItems: 'center'}}>
                        <Grid size = {{md:10, xs:12, lg:12}}>
                            <Typography variant='h2'>Insertar datos : </Typography>
                        </Grid>
                        <Grid size={{md: 6, xs: 4, lg: 6}}>
                            <TextField
                                required
                                label="Nombre"
                                variant='outlined'
                                fullWidth
                                value={item.nombre}
                                onChange={handleNombre}
                            />
                        </Grid>
                        <Grid size={{md: 6, xs: 4, lg: 6}}>
                            <TextField
                                required
                                label="Marca"
                                variant='outlined'
                                fullWidth
                                value={item.marca}
                                onChange={handleMarca}
                            />
                        </Grid>
                        <Grid size={{md: 4, xs: 6, lg: 8}}>
                            <TextField
                                required
                                label="Tipo"
                                variant='outlined'
                                fullWidth
                                value={item.tipo}
                                onChange={handleTipo}
                            />
                        </Grid>
                        <Grid size={{md: 4, xs: 6, lg: 4}}>
                            <TextField
                                required
                                label="Precio"
                                variant='outlined'
                                fullWidth
                                value={item.precio}
                                onChange={handlePrecio}
                            />
                        </Grid>

                        {userData.userRol == 'user' ? (<Grid size={{md:10, xs:12, lg:12}}>
                                <Button onClick={handleSubmit} variant='outlined' disabled={click}> Insertar </Button>
                        </Grid>) :
                                 (<Grid size={{md:10, xs:12, lg:12}}>
                                     <Button onClick={handleSubmit} variant='contained'> Insertar </Button>
                                 </Grid>)
                            }



                    <TableContainer component={Paper} sx={{ magin: 'auto', width: '80%' }}>
                        <Table sx={{ minWidth: 650 }} aria-label="tabla de objetos">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">Nombre</TableCell>
                                    <TableCell align="center">Marca</TableCell>
                                    <TableCell align="center">Tipo</TableCell>
                                    <TableCell align="center">Precio</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {tableData.map((row:itemtype)=>(
                                    <TableRow key={row.id}>
                                        <TableCell align={"center"}>
                                            {row.nombre}
                                        </TableCell>
                                        <TableCell align={"center"}>
                                            {row.marca}
                                        </TableCell>
                                        <TableCell align={"center"}>
                                            {row.tipo}
                                        </TableCell>
                                        <TableCell align={"center"}>
                                            {row.precio}
                                        </TableCell>
                                        <TableCell>
                                            {userData.userRol == 'admin' ? (<Button onClick={() => handleDeleteItem(row)}>
                                                <DeleteForeverIcon />
                                            </Button>) : <></>}
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

}

export default Dahsboard