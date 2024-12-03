import CssBaseline from '@mui/material/CssBaseline'
import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import App from './App';
import "./App.css";

import {createTheme} from "@mui/material";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import {Provider} from "react-redux";
import {store} from "./store";

const customTheme = createTheme ({
    palette: {
        mode: 'light',
        primary: {
            main: '#210706',
        },
        secondary: {
            main: '#e47a7a',
        },
        error: {
            main: '#c72f2f',
        },
        warning: {
            main: '#f38230',
        },
        info: {
            main: '#39a5e0',
        },
        success: {
            main: '#3e7741',
        },
        divider: '#ff8a80',
        background: {
            default: '#faded2',
            paper: '#f6cbb6',
        },
    },
});


createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ThemeProvider theme={customTheme}>
        <CssBaseline/>
            <Provider store={store}>
                <App/>
            </Provider>
        </ThemeProvider>
    </StrictMode>
)
