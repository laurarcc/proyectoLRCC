import {Container} from "@mui/material";
import Menuu from "../components/Menuu.tsx";
import Dashboard from "../components/Dahsboard.tsx";

function Home() {

    return (
        <>
            <Container role={'main'}>
                <Menuu />
                <Dashboard />
            </Container>
        </>
    )
}

export default Home