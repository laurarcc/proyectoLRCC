import {Link, useNavigate} from 'react-router-dom';
import * as React from "react";

import {useSelector} from 'react-redux';
import {authActions} from '../store/authSlice.ts';
import {useDispatch} from "react-redux";
import {useEffect} from "react";

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Menu from '@mui/material/Menu';
import {Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import HelpIcon from '@mui/icons-material/Help';
import ReportIcon from '@mui/icons-material/Report';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import {RootState} from "../store";


function Menuu() {
    //variables
    const [auth] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const dispatch = useDispatch();
    const userData = useSelector((state: RootState) => state.authenticator)
    console.log(userData)
    const navigate = useNavigate();
    const isLoggedin = userData.isAutenticated
    useEffect(()=> {
        if (!isLoggedin) {
            navigate('/')
        }
    }, [isLoggedin, navigate])

    //metodos
    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const [open, setOpen] = React.useState(false);

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    dispatch(authActions.logout())

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
                {userData.userRol == 'administrador' ? (
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


                <Link to='/help' style={{textDecoration: 'none', color: 'black'}}>
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
                        {userData.userRol == 'administrador' ? (<AdminPanelSettingsIcon sx={{ml:1}}/>) : <PersonOutlineIcon sx={{ml:1}}/>}
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