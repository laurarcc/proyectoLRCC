import './App.css'
import Login from './pages/Login.tsx'
import Home from './pages/Home.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Reports from './pages/Reports.tsx'
import ErrorPage from "./pages/ErrorPage.tsx";

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
