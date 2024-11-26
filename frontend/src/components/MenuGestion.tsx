import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import {Typography} from "@mui/material";
import * as React from "react";
import {useSelector} from "react-redux";
import {RootState} from "../store";
function MenuGestion() {
    const userData = useSelector((state: RootState) => state.authenticator)

    return(
        <>
            <AppBar>
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        {userData.userName}
                    </Typography>
                </Toolbar>
            </AppBar>
        </>
        )


} export default MenuGestion
