import React, { useState, useEffect } from 'react';
import { updateEmployee, getOneEmployee, deleteEmployee } from '../../services/api';
import { useParams, useNavigate } from 'react-router-dom';

const EmpleadoDetail = () => {
    const { idEntidad, idEmpleado } = useParams();
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [position, setPosition] = useState('');
    const [salary, setSalary] = useState('');
    const [empleado, setEmpleado] = useState(null);

    useEffect(() => {
        const fetchEmpleados = async () => {
            const empleado = await getOneEmployee(idEmpleado);
            setName(empleado.data.name);
            setPosition(empleado.data.position);
            setSalary(empleado.data.salary);
            setEmpleado(empleado);
        };

        fetchEmpleados();
    }, []);

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await updateEmployee(idEmpleado, { name, position, salary });
            navigate('/empleados/' + idEntidad);
        } catch (error) {
            if (error.response.status === 403) {
                navigate('/');
                localStorage.removeItem('token');
            }
        }
    };

    const handleDelete = async () => {
        try {
            await deleteEmployee(idEmpleado);
            navigate('/empleados/' + idEntidad);
        } catch (error) {
            if (error.response.status === 403) {
                navigate('/');
                localStorage.removeItem('token');
            }
        }
    };

    const back = () => {
        navigate('/empleados/' + idEntidad);
    };

    return (
        <div>
            {empleado ? (
                <div>
                    <h2>Detalle del Empleado</h2>
                    <button type="button" onClick={back}>{`Volver`}</button>
                    <form onSubmit={handleUpdate}>
                        <div>
                            <label htmlFor="name">Nombre:</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="position">Posición:</label>
                            <input
                                type="text"
                                id="position"
                                value={position}
                                onChange={(e) => setPosition(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="salary">Salario:</label>
                            <input
                                type="number"
                                id="salary"
                                value={salary}
                                onChange={(e) => setSalary(e.target.value)}
                            />
                        </div>
                        <button type="submit">Actualizar</button>
                    </form>
                    <button onClick={handleDelete}>Eliminar</button>
                </div>
            ) : (
                <p>Cargando...</p>
            )}
        </div>
    );
};

export default EmpleadoDetail;