import React, { useState } from 'react';
import { createItem } from '../../services/api';
import { useNavigate } from 'react-router-dom';

const CreateEntidad = () => {
    const navigate = useNavigate();

    // Estado para manejar los datos del formulario
    const [name, setName] = useState('');
    const [nit, setNit] = useState('');
    const [error, setError] = useState('');

    // Función para manejar el cambio en los campos del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Crear el objeto con los datos de la entidad
        const entidadData = {
            name,
            nit,
            empleados: [],
        };

        try {
            // Hacer la solicitud POST para crear la entidad
            const response = await createItem(entidadData);
            const id = response.data.entidad?._id;
            console.log(id);

            // Redirigir al listado de entidades después de crear la entidad
            navigate('/entidades');
        } catch (error) {
            if (error.response.status === 403) {
                navigate('/');
                localStorage.removeItem('token');
            } else {
                setError('Hubo un error al crear la entidad');
            }
        }
    };

    const back = () => {
        navigate('/entidades');
    };

    return (
        <div className="create-entidad-container">
            <h2>Crear Entidad</h2>
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
                    <label htmlFor="nit">NIT:</label>
                    <input
                        type="text"
                        id="nit"
                        value={nit}
                        onChange={(e) => setNit(e.target.value)}
                        required
                    />
                </div>

                <button type="submit">Crear Entidad</button>
            </form>
        </div>
    );
}

export default CreateEntidad;
