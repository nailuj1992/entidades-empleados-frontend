import React, { useEffect, useState } from 'react';
import { getOneItem } from '../../services/api';
import { Link, useParams, useNavigate } from 'react-router-dom';

const EmpleadosList = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [entidad, setEntidad] = useState([]);
    const [empleados, setEmpleados] = useState([]);

    useEffect(() => {
        const fetchEmpleados = async () => {
            const response = await getOneItem(id);
            setEmpleados(response.data.empleados);
            setEntidad(response.data);
        };

        fetchEmpleados();
    }, []);

    const redirectToCreate = () => {
        navigate('/empleados/crear/' + id);
    };

    const back = () => {
        navigate('/entidades');
    };

    return (
        <div>
            <h2>Listado de Empleados para la empresa {`${entidad.name}`}</h2>
            <button type="button" onClick={redirectToCreate}>{`Crear Empleado`}</button>
            <button type="button" onClick={back}>{`Volver`}</button>
            <ul>
                <table>
                    <thead>
                        <tr>
                            <td>Nombre</td>
                            <td>Posición</td>
                            <td>Salario</td>
                        </tr>
                    </thead>
                    {empleados.map((empleado) => (
                        <tbody key={empleado._id}>
                            <tr>
                                <td><Link to={`/empleados/${entidad._id}/${empleado._id}`}>{`${empleado.name}`}</Link></td>
                                <td>{empleado.position}</td>
                                <td>{empleado.salary}</td>
                            </tr>
                        </tbody>
                    ))}
                </table>
            </ul>
        </div>
    );
};

export default EmpleadosList;