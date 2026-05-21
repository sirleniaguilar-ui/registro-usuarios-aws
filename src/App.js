import React, { useState } from 'react';
import './App.css';

function App() {
  const [email, setEmail] = useState('');
  const [mensaje, setMensaje] = useState('');
  
const API_URL = 'https://amazonaws.com';
  const manejarEnvio = async (e) => {
    e.preventDefault();
    setMensaje('Enviando...');

    try {
      const respuesta = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email }),
      });

      if (respuesta.ok) {
        setMensaje('¡Correo guardado exitosamente en AWS!');
        setEmail('');
      } else {
        setMensaje('Hubo un problema al guardar el correo.');
      }
    } catch (error) {
      console.error('Error:', error);
      setMensaje('Error de conexión con el servidor.');
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h2>Registro de Usuarios</h2>
        <p>Introduce tu correo para guardarlo en la base de datos de AWS:</p>
        
        <form onSubmit={manejarEnvio} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <input
            type="email"
            placeholder="ejemplo@correo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ padding: '10px', borderRadius: '5px', border: 'none', width: '250px', fontSize: '16px' }}
          />
          <button 
            type="submit" 
            style={{ padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '16px' }}
          >
            Registrar Correo
          </button>
        </form>

        {mensaje && <p style={{ marginTop: '20px', fontSize: '16px', color: '#ffc107' }}>{mensaje}</p>}
      </header>
    </div>
  );
}

export default App;


