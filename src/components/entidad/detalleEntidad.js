import React, { useState, useEffect } from 'react';
import { getOneItem, updateItem, deleteItem } from '../../services/api';
import { useParams, useNavigate } from 'react-router-dom';

const EntidadDetail = () => {
    const { id } = useParams();
    const [entidad, setEntidad] = useState(null);
    const [name, setName] = useState('');
    const [nit, setNit] = useState('');
    const [empleados, setEmpleados] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEntidad = async () => {
            const response = await getOneItem(id);
            setEntidad(response.data);
            setName(response.data.name);
            setNit(response.data.nit);
            setEmpleados(response.data.empleados);
        };
        fetchEntidad();
    }, [id]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await updateItem(id, { name, nit, empleados });
            navigate('/entidades');
        } catch (error) {
            if (error.response.status === 403) {
                navigate('/');
                localStorage.removeItem('token');
            }
        }
    };

    const handleDelete = async () => {
        try {
            await deleteItem(id);
            navigate('/entidades');
        } catch (error) {
            if (error.response.status === 403) {
                navigate('/');
                localStorage.removeItem('token');
            }
        }
    };

    const back = () => {
        navigate('/entidades');
    };

    return (
        <div>
            {entidad ? (
                <div>
                    <h2>Detalle de Entidad</h2>
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
                            <label htmlFor="nit">NIT:</label>
                            <input
                                type="text"
                                value={nit}
                                onChange={(e) => setNit(e.target.value)}
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

export default EntidadDetail;