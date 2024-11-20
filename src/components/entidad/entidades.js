import React, { useEffect, useState } from 'react';
import { getAllItems } from '../../services/api';
import { Link, useNavigate } from 'react-router-dom';

const EntidadList = () => {
    const navigate = useNavigate();

    const [entidades, setEntidades] = useState([]);

    useEffect(() => {
        const fetchEntidades = async () => {
            const response = await getAllItems();
            setEntidades(response.data);
        };

        fetchEntidades();
    }, []);

    const redirectToCreate = () => {
        navigate('/entidades/crear');
    };

    const logout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    return (
        <div>
            <h2>Listado de Entidades</h2>
            <button type="button" onClick={redirectToCreate}>{`Crear Entidad`}</button>
            <button type="button" onClick={logout}>{`Cerrar sesión`}</button>
            <ul>
                <table>
                    <thead>
                        <tr>
                            <td>Nombre</td>
                            <td>NIT</td>
                            <td># empleados</td>
                            <td></td>
                        </tr>
                    </thead>
                    {entidades.map((entidad) => (
                        <tbody key={entidad._id}>
                            <tr>
                                <td><Link to={`/entidades/${entidad._id}`}>{`${entidad.name}`}</Link></td>
                                <td>{entidad.nit}</td>
                                <td>{entidad.empleados.length}</td>
                                <td><Link to={`/empleados/${entidad._id}`}>{`Ver Empleados`}</Link></td>
                            </tr>
                        </tbody>
                    ))}
                </table>
            </ul>
        </div>
    );
};

export default EntidadList;