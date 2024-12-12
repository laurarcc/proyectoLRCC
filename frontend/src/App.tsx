import './App.css'
import Login from './pages/Login.tsx'
import Home from './pages/Home.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Reports from './pages/Reports.tsx'
import ErrorPage from "./pages/ErrorPage.tsx";
import Gestion from "./pages/Gestion.tsx";
import GestionPres from "./pages/GestionPres.tsx";
import Ayuda from "./pages/Ayuda.tsx";

//Aquí cargamos la rutas con el createBrowserRouter, que igualamos a una variable llamada router,
//esta luego la llamamos con <RouterProvider router={}/>
//El errorElement es que si se pone una ruta que no tenemos comprendida salta el errorpage
function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      errorElement: <ErrorPage />,
      children: [
        {
          index:true,
          element:<Login />
        }, {
        path: 'home',
          element: <Home />
        }, {
        path: 'reports',
          element: <Reports/>
        }, {
        path: 'gestion',
          element: <Gestion />
        }, {
        path: 'prestamos',
          element: <GestionPres />
        }
      ]
    },
  ]);

    return (
      <>
      <RouterProvider router={router}/>
      </>
)
}

export default App
