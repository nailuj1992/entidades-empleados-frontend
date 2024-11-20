import React, { useEffect, useState } from 'react';
import { getOneItem, updateItem } from '../../services/api';
import { useParams, useNavigate } from 'react-router-dom';

const CreateEmpleado = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    // Estado para manejar los datos del formulario
    const [name, setName] = useState('');
    const [position, setPosition] = useState('');
    const [salary, setSalary] = useState('');
    const [entidad, setEntidad] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchEmpleados = async () => {
            const response = await getOneItem(id);
            setEntidad(response.data);
        };

        fetchEmpleados();
    }, []);

    // Función para manejar el cambio en los campos del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();

        const empleados = entidad.empleados;
        empleados.push({ name, position, salary: "" + salary });

        // Crear el objeto con los datos del empleado
        const entidadData = {
            name: entidad.name,
            nit: entidad.nit,
            empleados: empleados,
        };

        try {
            // Hacer la solicitud POST para crear el empleado
            const response = await updateItem(entidad._id, entidadData);
            const id = response.data.entidad?._id;
            console.log(id);

            // Redirigir al listado de entidades después de crear el empleado
            navigate('/empleados/' + id);
        } catch (error) {
            if (error.response.status === 403) {
                navigate('/');
                localStorage.removeItem('token');
            } else {
                setError('Hubo un error al crear el empleado');
            }
        }
    };

    const back = () => {
        navigate('/empleados/' + entidad._id);
    };

    return (
        <div className="create-empleado-container">
            <h2>Crear Empleado</h2>
            <button type="button" onClick={back}>{`Volver`}</button>
            {error && <p className="error-message">{error}</p>}

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Nombre:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="position">Posición:</label>
                    <input
                        type="text"
                        id="position"
                        value={position}
                        onChange={(e) => setPosition(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="salary">Salario:</label>
                    <input
                        type="number"
                        id="salary"
                        value={salary}
                        onChange={(e) => setSalary(e.target.value)}
                        required
                    />
                </div>

                <button type="submit">Crear Empleado</button>
            </form>
        </div>
    );
};

export default CreateEmpleado;