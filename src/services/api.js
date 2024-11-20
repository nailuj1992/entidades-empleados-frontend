import axios from 'axios';

// Configura la URL base para tu API
const API_URL = "https://entidades-empleados-backend.vercel.app/api/";

// Instancia de Axios para la configuración de la API
const api = () => {
    return axios.create({
        baseURL: API_URL,
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem('token')}`,
        },
    });
};

// Función para obtener todas las entidades
export const getAllItems = () => {
    return api().get('/entidades');
};

// Función para obtener una entidad por su id
export const getOneItem = (id) => {
    return api().get(`/entidades/${id}`);
};

// Función para crear una nueva entidad
export const createItem = (data) => {
    return api().post('/entidades', data);
};

// Función para actualizar una entidad
export const updateItem = (id, data) => {
    return api().put(`/entidades/${id}`, data);
};

// Función para eliminar una entidad
export const deleteItem = (id) => {
    return api().delete(`/entidades/${id}`);
};

// Función para obtener un empleado por su id
export const getOneEmployee = (id) => {
    return api().get(`/empleados/${id}`);
};

// Función para actualizar una entidad
export const updateEmployee = (id, data) => {
    return api().put(`/empleados/${id}`, data);
};

// Función para eliminar un empleado
export const deleteEmployee = (id) => {
    return api().delete(`/empleados/${id}`);
};

// Función para hacer login y obtener el token
export const login = (credentials) => {
    return api().post('/auth/login', credentials);
};

// Función para registrar usuario
export const register = (credentials) => {
    return api().post('/auth/register', credentials);
};