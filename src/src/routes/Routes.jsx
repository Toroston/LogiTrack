import { useRoutes, Navigate } from "react-router-dom";
import AltaEnvio from "../components/AltaEnvio/AltaEnvio";
import DetalleEnvio from "../components/DetalleEnvio/DetalleEnvio";
import MainAlta from "../components/AltaEnvio/MainAlta";
import BusquedaEnvio from "../components/BusquedaEnvio/BusquedaEnvio";
import Menu from "../components/Menu/Menu";

export const Routes = ({ user, setUser }) => {

    const routes = [
        {
            children: [
                {
                    path: '/',
                    element: <Menu user={user} setUser={setUser}/>
                },
                {
                    path: '/envios',
                    element: <MainAlta/>
                },
                {
                    path: '/detalle',
                    element: <DetalleEnvio user={user}/>
                },
                {
                    path: '/detalle/:id',
                    element: <DetalleEnvio user={user}/>
                },
                {
                    path: '/busqueda',
                    element: <BusquedaEnvio user={user}/>
                },
                {
                    path: '*',
                    element: <Navigate to="/" />
                }
            ]
        }
    ];

    return useRoutes(routes);
};