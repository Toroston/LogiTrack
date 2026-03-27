import { useRoutes, Navigate } from "react-router-dom";
import DetalleEnvio from "../components/DetalleEnvio/DetalleEnvio";
import MainAlta from "../components/AltaEnvio/MainAlta";
import BusquedaEnvio from "../components/BusquedaEnvio/BusquedaEnvio";
import Menu from "../components/Menu/Menu";
import HistorialEventos from "../components/HistorialEstados/HistorialEventos";

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
                    path: '/historial',
                    element: <HistorialEventos />
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