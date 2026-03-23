import { useRoutes } from "react-router-dom";
import AltaEnvio from "../components/AltaEnvio/AltaEnvio";
import DetalleEnvio from "../components/DetalleEnvio/DetalleEnvio";
import LogiTrack from "../components/LogiTrack";

export const Routes = () => {

    const routes = [
        {
            children: [
                
                {
                    path: '/',
                    element: <LogiTrack/>
                },
                {
                    path: '/alta',
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

