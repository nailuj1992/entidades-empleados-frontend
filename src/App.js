import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/auth/login';
import Register from './components/auth/register';
import EntidadList from './components/entidad/entidades';
import EntidadCreate from './components/entidad/crearEntidad';
import EntidadDetail from './components/entidad/detalleEntidad';
import EmpleadoList from './components/empleado/empleados';
import EmpleadoCreate from './components/empleado/crearEmpleado';
import EmpleadoDetail from './components/empleado/detalleEmpleado';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<Login />} />
                <Route exact path="/register" element={<Register />} />
                <Route exact path="/entidades" element={<EntidadList />} />
                <Route exact path="/entidades/crear" element={<EntidadCreate />} />
                <Route exact path="/entidades/:id" element={<EntidadDetail />} />
                <Route exact path="/empleados/:id" element={<EmpleadoList />} />
                <Route exact path="/empleados/crear/:id" element={<EmpleadoCreate />} />
                <Route exact path="/empleados/:idEntidad/:idEmpleado" element={<EmpleadoDetail />} />
            </Routes>
        </Router>
    );
};

export default App;