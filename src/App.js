import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [email, setEmail] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [usuarios, setUsuarios] = useState([]);

  const API_URL = 'https://lllqryh4gg.execute-api.us-east-2.amazonaws.com';

  // 👉 GUARDAR USUARIO (POST)
  const manejarEnvio = async (e) => {
    e.preventDefault();
    setMensaje('Enviando...');

    try {
      const respuesta = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (respuesta.ok) {
        setMensaje('¡Correo guardado exitosamente en AWS!');
        setEmail('');
        obtenerUsuarios(); // refrescar lista
      } else {
        setMensaje('Hubo un problema al guardar el correo.');
      }
    } catch (error) {
      console.error(error);
      setMensaje('Error de conexión con el servidor.');
    }
  };

  // 👉 OBTENER USUARIOS (GET)
  const obtenerUsuarios = async () => {
    try {
      const res = await fetch(`${API_URL}/usuarios`);
      const data = await res.json();
      setUsuarios(data);
    } catch (error) {
      console.error('Error cargando usuarios:', error);
    }
  };

  // 👉 cargar al iniciar
  useEffect(() => {
    obtenerUsuarios();
  }, []);

  return (
    <div className="App">
      <header className="App-header">

        <h2>Registro de Usuarios</h2>

        {/* FORMULARIO MEJORADO */}
        <form
          onSubmit={manejarEnvio}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            maxWidth: '300px',
            margin: '0 auto'
          }}
        >
          <input
            type="email"
            placeholder="ejemplo@correo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button type="submit">
            Registrar Correo
          </button>
        </form>

        {mensaje && <p>{mensaje}</p>}

        {/* LISTA DE USUARIOS */}
        <h3>Usuarios registrados:</h3>
        <ul>
          {usuarios.map((u, index) => (
            <li key={index}>
              {u.email?.S || u.email}
            </li>
          ))}
        </ul>

      </header>
    </div>
  );
}

export default App;