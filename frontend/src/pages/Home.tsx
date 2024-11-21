import {useSelector} from 'react-redux';
import {RootState} from '../store/index.tsx'
import {authActions} from '../store/authSlice.ts';
import {Container} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import Menuu from "../components/Menuu.tsx";
import Dashboard from "../components/Dahsboard.tsx";
import Toolbar from "@mui/material/Toolbar";

function Home() {
    const userData = useSelector((state: RootState) => state.authenticator)
    console.log(userData)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleNavigate = () => {
        navigate('/');
    };
    dispatch(authActions.logout())
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