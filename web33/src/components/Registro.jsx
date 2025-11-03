import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Registro() {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [mensajeError, setMensajeError] = useState('');

  const calcularEdad = (fecha) => {
    const hoy = new Date();
    const nacimiento = new Date(fecha);
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const mes = hoy.getMonth() - nacimiento.getMonth();
    if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
      edad--;
    }
    return edad;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const edad = calcularEdad(fechaNacimiento);
    if (edad < 18) {
      setMensajeError('Debes tener al menos 18 años para registrarte.');
      return;
    }
    setMensajeError('');
    // Guardar usuario en localStorage
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    // Verificar si el correo ya existe
    if (usuarios.some(u => u.email === correo)) {
      setMensajeError('El correo ya está registrado.');
      return;
    }
    usuarios.push({
      nombre,
      apellido,
      email: correo,
      password,
      fechaNacimiento
    });
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    alert('Registro exitoso');
    navigate('/login');
  };

  return (
    <div className="container mt-5">
      <div className="text-center mb-4">
        <Link to="/" className="btn btn-dark">Inicio</Link>
      </div>

      <div className="card mx-auto" style={{ maxWidth: '400px' }}>
        <h2 className="text-center mb-4">Registro de Usuario</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="nombre" className="form-label">Nombre</label>
            <input type="text" className="form-control" id="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Ingresa tu nombre" />
          </div>
          <div className="mb-3">
            <label htmlFor="apellido" className="form-label">Apellido</label>
            <input type="text" className="form-control" id="apellido" value={apellido} onChange={(e) => setApellido(e.target.value)} placeholder="Ingresa tu apellido" />
          </div>
          <div className="mb-3">
            <label htmlFor="correo" className="form-label">Correo electrónico</label>
            <input type="email" className="form-control" id="correo" value={correo} onChange={(e) => setCorreo(e.target.value)} placeholder="Ingresa tu correo" />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Contraseña</label>
            <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Crea una contraseña" />
          </div>
          <div className="mb-3">
            <label htmlFor="fechaNacimiento" className="form-label">Fecha de Nacimiento</label>
            <input type="date" className="form-control" id="fechaNacimiento" value={fechaNacimiento} onChange={(e) => setFechaNacimiento(e.target.value)} />
          </div>
          {mensajeError && <p className="text-danger">{mensajeError}</p>}
          <button type="submit" className="btn btn-primary w-100">Registrarse</button>
        </form>
      </div>
    </div>
  );
}

export default Registro;