import {Alert, Box, Button, Container, Typography} from "@mui/material";
import {useState} from "react";
import Grid from "@mui/material/Grid2";
import {TextField} from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';
import LockIcon from '@mui/icons-material/Lock';
import {useNavigate} from 'react-router-dom';
import * as React from "react";

import {useDispatch} from 'react-redux'
import {authActions} from "../store/authSlice.ts";

function Login() {
    const dispatch = useDispatch() //Carga los datos en nuestro "store" y poder acceder a esta información desde otras páginas en nuestra aplicación
    const [data, setData] = useState({user: '', password: '', open: ''}); //variables para guardar los datos que se recogen con el formulario
    const navigate = useNavigate(); //para navegar a otra página

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`http://localhost:3030/login?user=${data.user}&password=${data.password}`)
            .then(response => response.json())
            .then(response => {
                console.log('Información que llega a consola') //Hace un print de que entra al fetch
                console.log(response.data) //nos imprime la data (datos) que llegan con el response

                dispatch(authActions.login({
                    name: response.data.nombre, //desde el response guardamos el data.user
                    rol: response.data.rol //desde el response guardamos el data.rol, que es el rol que tiene dicho usuario que ingresa
                }))

                //Aquí cambiariamos el data.open = 'success' para que saliera el mensaje del condicional de que está bien registrado
                //pero como va directamente a la otra página no hace falta, solo cuando falla.

                //Si la información que entra desde el response y data es mayor que 0 puede ir a Home
                if (response.data.length !== 0) {
                    navigate('/Home');}
            })
    }

    //Para el guardar contraseña y usuario desde el formulario en el data y que luego lo pueda recoger el data
    const handleUser = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData({
            ...data,
            user: e.target.value
        })
    }

    const handlePass = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData({
            ...data,
            password: e.target.value
        })
    }

// Creamos un formulario para que recoja los datos del usuario, que son el usuario y contraseña,
// en la primera práctica son dos parámetros fijos "const user = 'laura'" y const pass = "1234", pero con las siguientes prácticas (CRUD)
// recoge los datos desde la base de datos que iniciamos con Xampp y para poder usarlo desde React tenemos que hacer un fetch,
// en nuestro caso llamamos a un botón que comprueba que está bien, es decir, comprueba lo que mete el usuario y lo que tenemos en la bbdd.

    //Al final tenemos un renderizado condicional que abre un alert en función de si ha metido bien los datos o no el usuario, caso de que esté mal
    //sale un alert de error con el mensaje que tenemos junto el alert, si está bien simplemente va directamente a la página home.
    return (
        <>
            <Container role={'main'}
                       sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh'}}>
                <Box component='form' onSubmit={handleSubmit} sx={{width: '100%', maxWidth: '100%'}}>
                    <Grid container spacing={2} sx={{justifyContent: 'center', alignItems: 'center'}}>

                        <Grid size={{md: 8, xs: 12, lg: 8}}>
                            <Typography variant='h4'>Sistema de acceso</Typography>
                            <LockIcon></LockIcon>
                        </Grid>

                        <Grid size={{md: 8, xs: 8, lg: 8}}>
                            <TextField
                                required
                                label="Usuario"
                                variant='outlined'
                                fullWidth
                                value={data.user}
                                onChange={handleUser}
                            />
                        </Grid>

                        <Grid size={{md: 8, xs: 8, lg: 8}}>
                            <TextField
                                required
                                label="Contraseña"
                                variant='outlined'
                                fullWidth
                                value={data.password}
                                onChange={handlePass}
                                type={'password'}
                            />
                        </Grid>

                        <Grid size={{md: 8, xs: 8, lg: 8}}>
                            <Button type='submit' variant='contained'>Acceder</Button>
                        </Grid>

                    </Grid>

                </Box>
                {data.open == '' ? <></> : data.open == 'success' ?
                    <Alert icon={<CheckIcon fontSize="inherit"/>} severity='success'>Acceso concedido</Alert>
                    :
                    <Alert icon={<CheckIcon fontSize="inherit"/>} severity='error'>Acceso denegado. Usuario / contraseña
                        incorrecto</Alert>}
                <footer>
                </footer>

            </Container>
        </>
    )
}

export default Login