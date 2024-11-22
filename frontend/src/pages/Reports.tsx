import {Button, Typography} from "@mui/material";
import EjemploInformesAlu from "../components/EjemploInformesAlu.tsx";
import {useState} from "react";
import * as React from "react";

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
            <Button onClick={handleClick} onSubmit={getData()}>INFORMES COLECCIÓN</Button>
        </>
    )
}
export default Reports