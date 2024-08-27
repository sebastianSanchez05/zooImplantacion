import { Routes, Route } from "react-router-dom";
// Rutas
import Inicio from "../pages/Inicio.jsx";
import Animales from "../pages/animales/Animales.jsx";
import RegistrarAnimal from "../pages/animales/FormRegistrar.jsx";
import EditarAnimal from "../pages/animales/FormEditar.jsx";

import Atribuciones from "../pages/Atribuciones.jsx";
import NoEncotrado from "../pages/NoEncontrado.jsx";

// Componentes
import Menu from "../components/Menu.jsx";

export const Enrutado = () => {
    return (
        <>
            <Menu />
            <Routes>
                <Route index element={<Inicio />} />
                <Route path="/animales" element={<Animales />} />
                <Route path="/animales/registrar" element={<RegistrarAnimal />} />
                <Route path="/animales/editar/:id" element={<EditarAnimal />} />
                <Route path="/atribuciones" element={<Atribuciones />} />
                <Route path="*" element={<NoEncotrado />} />
            </Routes>
        </>
    );
};

export default Enrutado;