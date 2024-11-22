import {Button, Typography} from "@mui/material";
import EjemploInformesAlu from "../components/EjemploInformesAlu.tsx";
import {useState} from "react";
import * as React from "react";
import Menuu from "../components/Menuu.tsx";

function Reports(){
    const [click, setClick] = useState(false)
    async function getData() {
        fetch(`http://localhost:3030/getData`)
            .then(response => response.json())
            .then(response => {
                setTableData(response.data)
            })
    }

    const handleClick = () => {
        setClick(true)
    }
    return(
        <>
            <Menuu></Menuu>
            <EjemploInformesAlu></EjemploInformesAlu>
            <Button onClick={handleClick}>INFORMES COLECCIÓN</Button>
        </>
    )
}
export default Reports