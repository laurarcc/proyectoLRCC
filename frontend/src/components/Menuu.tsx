import {Link, useNavigate} from 'react-router-dom';
import * as React from "react";

import {useSelector} from 'react-redux';
import {authActions} from '../store/authSlice.ts';
import {useDispatch} from "react-redux";
import {useEffect, useState} from "react";

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Menu from '@mui/material/Menu';
import {Alert, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import HelpIcon from '@mui/icons-material/Help';
import ReportIcon from '@mui/icons-material/Report';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AdbIcon from '@mui/icons-material/Adb';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import {RootState} from "../store";
import CheckIcon from "@mui/icons-material/Check";


function Menuu() {
    //uso de dispatch
    //1º Declararlo :
    const dispatch = useDispatch();
    //2º Plantear para que lo necesito :
    dispatch(authActions.logout()) //en este caso es hacer un logout del usuario
    //el logout es un método que tiene authActions en authSlice.ts que deja las variables de initialAuthState en 0 de nuevo


    //variables
    const [auth] = useState(false); //que el usuario está autenticado, en este caso, lo queremos en false para cerrar la sesión
    const [anchorEl, setAnchorEl] = useState(null); //es para el menu, viene predefinido de MUI

    const [open, setOpen] = useState(false); //para el drawer, cerrar y abrirlo

    const userData = useSelector((state: RootState) => state.authenticator) //es un hook que recoge el dato guardado en el hook de dispatch y coge el estado de autenticación
    console.log(userData) //pasa por consola el userData que a su vez será true o false segun el state.authenticator
    const navigate = useNavigate(); //para navegar a otra página
    const isLoggedin = userData.isAutenticated //está usando los datos que guardamos antes en el login, si el usuario se autentifica pasa a true, si no sigue siendo falso
    //Permite sincronizar un componente cuando cambie algo externo. Que se representa con las dependencias


    //en este caso el navigate
    useEffect(()=> {
        if (!isLoggedin) {
            navigate('/')
        }
    }, [isLoggedin, navigate])

    //Métodos para abrir y cerrar el menú y drawer
    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget); //viene predefinido de MUI (NO TOCAR)
    };

    const handleClose = () => {
        setAnchorEl(null); //asegura que cuando se le vuelva a dar click se cierre
    };

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    //Declaramos la DrawerList que es lo que irá dentro del menú donde las 3 rayas.
    //El link to es como un navigate pero portatil, sin tener que llamar a una clase o tener que importar nada
    //hay un renderizado condicional según si es admin o no, en caso de que lo sea ve el link informe de lo contrario no
    const DrawerList = (
        <Box sx={{width: 250}} role="presentation" onClick={toggleDrawer(false)}>
            <List>
                <Link to='/home' style={{textDecoration: 'none', color: 'black'}}>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <HomeIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Inicio"/>
                        </ListItemButton>
                    </ListItem>
                </Link>

                <Link to='/prestamos' style={{textDecoration: 'none', color: 'black'}}>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <HomeIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Gestión Préstamos"/>
                        </ListItemButton>
                    </ListItem>
                </Link>

                {userData.userRol == 'admin' ? (
                    <Link to='/reports' style={{textDecoration: 'none', color: 'black'}}>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <ReportIcon />
                            </ListItemIcon>
                            <ListItemText primary="Informes"/>
                        </ListItemButton>
                    </ListItem>
                </Link>)
                    : <></> }

                {userData.userRol == 'admin' ? (
                        <Link to='/gestion' style={{textDecoration: 'none', color: 'black'}}>
                            <ListItem disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <ReportIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Gestión usuarios"/>
                                </ListItemButton>
                            </ListItem>
                        </Link>)
                    : <></> }

                <Link to='Rodriguez_Castellano_Laura_EXUT4_Manual.pdf' style={{textDecoration: 'none', color: 'black'}}>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <HelpIcon />
                            </ListItemIcon>
                            <ListItemText primary="Ayuda"/>
                        </ListItemButton>
                    </ListItem>
                </Link>

                <Link to='/' style={{textDecoration: 'none', color: 'black'}}>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <ExitToAppIcon />
                            </ListItemIcon>
                            <ListItemText primary="Salir"/>
                        </ListItemButton>
                    </ListItem>
                </Link>
            </List>
        </Box>
    );

    return (
        <>
            <Box sx={{flexGrow: 1}}>
                <AppBar>
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{mr: 2}}
                            onClick={toggleDrawer(true)}
                        >
                            <MenuIcon/>

                        </IconButton>
                        <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                            {userData.userName}
                        </Typography>
                        {auth && (
                            <div>
                                <IconButton
                                    size="large"
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={handleMenu}
                                    color="inherit"
                                >
                                    <AccountCircle/>
                                </IconButton>
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={anchorEl}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(anchorEl)}
                                    onClose={handleClose}
                                >
                                </Menu>
                            </div>
                        )}

                        {userData.userRol == 'admin' ? (<AdminPanelSettingsIcon sx={{ml:1}}/>) :
                            userData.userRol == 'user' ? (<AdbIcon sx={{ml:1}}/>) : (<InsertEmoticonIcon sx={{ml:1}}/>)
                            }
                    </Toolbar>
                </AppBar>
                <Drawer open={open} onClose={toggleDrawer(false)}>
                    {DrawerList}
                </Drawer>
            </Box>
        </>
    )
}

export default Menuu