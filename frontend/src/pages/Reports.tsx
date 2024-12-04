import {
    Box,
    Button,
    Container,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography
} from "@mui/material";
import {useState} from "react";
import * as React from "react";
import Menuu from "../components/Menuu.tsx";
import InformeColeccion from "../components/InformeColeccion.tsx";
import {Link} from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import ReportIcon from "@mui/icons-material/Report";
import HelpIcon from "@mui/icons-material/Help";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import {useSelector} from "react-redux";
import {RootState} from "../store";
import Toolbar from "@mui/material/Toolbar";

function Reports() {
    const [click, setClick] = useState(false)
    const [open, setOpen] = useState(false)
    const userData = useSelector((state: RootState) => state.authenticator)

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

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

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
            <Container role={'main'}
                       sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh'}}>
                <Box component='form'>
                    <Menuu></Menuu>
                    <Toolbar/>
                    <Button onClick={getData} variant='contained'>INFORMES COLECCIÓN</Button>
                    {click ? <InformeColeccion data={data} /> : null }

                </Box>
                <Drawer open={open} onClose={toggleDrawer(false)}>
                    {DrawerList}
                </Drawer>
            </Container>
        </>
    )
}

export default Reports