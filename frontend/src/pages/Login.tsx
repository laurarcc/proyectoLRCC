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
    const dispatch = useDispatch()
    const [data, setData] = useState({user: '', password: '', open: ''});
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        //Para que funcione el fetch hay que iniciar tanto xampp como el backend
        //y el usuario dentro de la base de datos
        fetch(`http://localhost:3030/login?user=${data.user}&password=${data.password}`)
            .then(response => response.json())
            .then(response => {
                console.log('Información que llega a consola')
                console.log(response.data)
                if (response.data.length !== 0) {
                    navigate('/Home');

                    dispatch(authActions.login({
                        name: response.data.user,
                        rol: response.data.rol

                    }))

                }
            })
    }

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