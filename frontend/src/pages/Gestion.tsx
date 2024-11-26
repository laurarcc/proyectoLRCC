import GestionUser from "../components/GestionUser.tsx";
import MenuGestion from "../components/MenuGestion.tsx";
import Toolbar from "@mui/material/Toolbar";

function Gestion() {

    return (
        <>
            <MenuGestion />
            <Toolbar />
            <GestionUser/>
        </>
    )
}

export default Gestion