import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../../services/api';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await register({ username, password, role });
            console.log(response);
            navigate('/'); // Redirige a la página de login
        } catch (err) {
            setError('Error al registrar el usuario: ' + err);
        }
    };

    const back = () => {
        navigate('/');
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        type="username"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <input
                        type="radio"
                        value="admin"
                        name="role"
                        checked={role === 'admin'}
                        onChange={(e) => setRole(e.target.value)}
                        required
                    />Admin
                </div>
                <div>
                    <input
                        type="radio"
                        value="user"
                        name="role"
                        checked={role === 'user'}
                        onChange={(e) => setRole(e.target.value)}
                        required
                    />User
                </div>
                <button type="submit">Registrarse</button>
                <button type="button" onClick={back}>{`Volver`}</button>
                {error && <p>{error}</p>}
            </form>
        </div>
    );
};

export default Register;