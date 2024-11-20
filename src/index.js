import React from 'react';
import './index.css';  // Aquí puedes incluir tus estilos globales
import App from './App';  // El componente principal de la aplicación
import { createRoot } from 'react-dom/client';

// Crear el contenedor de la raíz de la aplicación
const root = createRoot(document.getElementById('root'));

// Renderiza la aplicación dentro del contenedor raíz
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);