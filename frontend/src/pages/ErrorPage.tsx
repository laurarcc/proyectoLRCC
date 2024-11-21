import {Typography} from "@mui/material";
import { useRouteError } from "react-router-dom";

function ErrorPage() {
    const error = useRouteError();
    console.log(error)
    return(
        <>
            <Typography variant="h3" color="primary">
                Página no encontrada
            </Typography>
            <Typography variant="caption" color="error">
                {JSON.stringify(error, null, 2)}
            </Typography>
        </>
    )
} export default ErrorPage