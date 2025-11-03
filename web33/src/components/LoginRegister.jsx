import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

function LoginRegister() {
  const navigate = useNavigate();


  const handleCrearUsuario = () => {
    navigate('/registro');
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    // Obtener usuarios guardados en localStorage
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const usuario = usuarios.find(u => u.email === email && u.password === password);
    if (usuario) {
      // Login exitoso, redirigir al catálogo
      navigate('/catalogo');
    } else {
      alert('Correo o contraseña incorrectos');
    }
  };

  return (
    <div className="container mt-5">
      <div className="text-center mb-4">
        <Link to="/" className="btn btn-dark">Inicio</Link>
      </div>

      <div className="card mx-auto" style={{ maxWidth: '400px' }}>
        <h2 className="text-center mb-4">Iniciar Sesión</h2>
  <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Correo electrónico</label>
            <input type="email" className="form-control" id="email" placeholder="Ingresa tu correo" />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Contraseña</label>
            <input type="password" className="form-control" id="password" placeholder="Ingresa tu contraseña" />
          </div>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <a href="#" className="text-white">¿Olvidaste tu contraseña?</a>
            <div className="extra-options">
              <input type="checkbox" id="recordarme" />
              <label htmlFor="recordarme" className="ms-2">Recordarme</label>
            </div>
          </div>
          <div className="d-flex gap-2">
            <button type="submit" className="btn btn-primary w-100">Ingresar</button>
            <button type="button" className="btn btn-secondary w-100" onClick={handleCrearUsuario}>Crear Usuario</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginRegister;
