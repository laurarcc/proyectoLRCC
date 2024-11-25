import {Container} from "@mui/material";
import Menuu from "../components/Menuu.tsx";
import Dashboard from "../components/Dahsboard.tsx";
import Toolbar from "@mui/material/Toolbar";

function Home() {

    return (
        <>
            <Container role={'main'}>
                <Menuu />
            < Toolbar />
                <Dashboard />
            </Container>
        </>
    )
}

export default Home