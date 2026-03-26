import { useRoutes } from "react-router-dom";
import AltaEnvio from "../components/AltaEnvio/AltaEnvio";
import DetalleEnvio from "../components/DetalleEnvio/DetalleEnvio";
import LogiTrack from "../components/LogiTrack";
import BusquedaEnvio from "../components/BusquedaEnvio/BusquedaEnvio";
import Menu from "../components/Menu/Menu";
export const Routes = () => {

    const routes = [
        {
            children: [
                
                {
                    path: '/',
                    element: <Menu/>
                },
                {
                    path: '/envios',
                    element: <LogiTrack/>
                },
                {
                    path: '/detalle',
                    element: <DetalleEnvio/>
                },
                {
                    path: '/detalle/:id',
                    element: <DetalleEnvio/>
                },
                {
                    path: '/busqueda',
                    element: <BusquedaEnvio/>
                },
            ],
        },
/*         
{
            path: '/login',
            element: <Login/>
        },
        {
            path: '/registro',
            element: <Register/>
        }, 
*/
    ]

    return useRoutes(routes);
}

