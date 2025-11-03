import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Estilo para el botón de navegación (usando Bootstrap para clases visuales)
const linkStyle = {
  background: '#222',
  color: '#fff',
  fontFamily: 'Roboto, Arial, sans-serif',
  padding: '10px 22px',
  borderRadius: '8px',
  textDecoration: 'none',
  fontWeight: 'bold',
  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
};

function Carrito() {
  // --- Estados de React ---
  const [carrito, setCarrito] = useState([]);
  const [resumenCompra, setResumenCompra] = useState(null);

  // --- Carga Inicial ---
  useEffect(() => {
    const carritoGuardado = JSON.parse(localStorage.getItem("carrito")) || [];
    setCarrito(carritoGuardado);
  }, []);

  // --- Lógica de carrito.js traducida a React ---
  const calcularTotal = () => {
    return carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
  };

  const actualizarCarrito = (nuevoCarrito) => {
    setCarrito(nuevoCarrito);
    localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
    setResumenCompra(null); 
  };

  const cambiarCantidad = (index, cambio) => {
    const nuevoCarrito = [...carrito];
    nuevoCarrito[index].cantidad += cambio;
    
    if (nuevoCarrito[index].cantidad < 1) {
      nuevoCarrito[index].cantidad = 1;
    }
    
    actualizarCarrito(nuevoCarrito);
  };

  const eliminarProducto = (index) => {
    const nuevoCarrito = [...carrito];
    nuevoCarrito.splice(index, 1);
    actualizarCarrito(nuevoCarrito);
  };

  const vaciarCarrito = () => {
    // IMPORTANTE: Sustituido 'confirm' por window.confirm, aunque console.log es mejor en iframes
    if (window.confirm("¿Seguro que quieres vaciar el carrito?")) {
      actualizarCarrito([]);
    }
  };

  const finalizarCompra = () => {
    if (carrito.length === 0) {
      setResumenCompra(
        <div className="resumen-card"><p>El carrito está vacío.</p></div>
      );
      return;
    }

    const total = calcularTotal();

    // Creamos el JSX para el resumen
    const resumenJSX = (
      <div className="resumen-card bg-dark text-white"> {/* Clases de Bootstrap */}
        <h2 className="text-center mb-3">Resumen de tu compra</h2>
        <div className="table-responsive"> {/* Hace la tabla desplazable en móvil */}
          <table className="table table-dark table-striped">
            <thead>
              <tr>
                <th>Imagen</th>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Precio unitario</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {carrito.map((item, i) => {
                const subtotal = item.precio * item.cantidad;
                return (
                  <tr key={i}>
                    <td><img src={item.imagen} alt={item.nombre} style={{ width: '40px' }} /></td>
                    <td>{item.nombre}</td>
                    <td>{item.cantidad}</td>
                    <td>${item.precio.toLocaleString()}</td>
                    <td>${subtotal.toLocaleString()}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="resumen-total">
          <strong className="h4">Total: ${total.toLocaleString()}</strong>
        </div>
        <p className="text-center text-success fw-bold mt-3">
          ¡Gracias por tu compra!
        </p>
      </div>
    );

    setResumenCompra(resumenJSX);
    actualizarCarrito([]); // Vaciamos el carrito
    // Aquí puedes añadir la lógica de envío de datos al servidor
    console.log("Compra finalizada. Resumen generado.");
  };

  // --- Renderizado (HTML) ---
  const total = calcularTotal();

  return (
    <div className="container mt-5">
      
      {/* Botón de navegación (usando d-flex para responsividad) */}
      <div className="d-flex justify-content-center justify-content-md-end mb-4">
        <Link to="/catalogo" className="btn" style={linkStyle}>Atras
        </Link>
      </div>

      <h1 className="mb-4">Carrito de Compras</h1>

      {/* Si el carrito está vacío y no hay resumen */}
      {carrito.length === 0 && !resumenCompra && (
        <center><p className="text-white">El carrito está vacío.</p></center>
      )}

      {/* Si el carrito TIENE productos */}
      {carrito.length > 0 && (
        <div id="carritoContainer" className="table-responsive"> {/* Se añade table-responsive */}
          <table className="table table-dark table-striped">
            <thead>
              <tr>
                <th>Imagen</th>
                <th>Producto</th>
                <th>Categoría</th>
                <th>Precio</th>
                <th>Cantidad</th>
                <th>Subtotal</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {carrito.map((item, i) => {
                const subtotal = item.precio * item.cantidad;
                return (
                  <tr key={i}>
                    <td><img src={item.imagen} alt={item.nombre} style={{ width: '60px' }} /></td>
                    <td>{item.nombre}</td>
                    <td>{item.categoria}</td>
                    <td>${item.precio.toLocaleString()}</td>
                    <td>{item.cantidad}</td>
                    <td>${subtotal.toLocaleString()}</td>
                    <td className="acciones">
                      <button className="btn btn-sm btn-info me-1" onClick={() => cambiarCantidad(i, 1)}>+</button>
                      <button className="btn btn-sm btn-info me-1" onClick={() => cambiarCantidad(i, -1)}>-</button>
                      <button className="btn btn-sm btn-danger" onClick={() => eliminarProducto(i)}>Eliminar</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="total text-end text-white p-3">
            Total: <strong className="h5">${total.toLocaleString()}</strong>
          </div>
        </div>
      )}

      {/* Contenedor para el resumen */}
      <div id="resumenCompra">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8">
            {resumenCompra}
          </div>
        </div>
      </div>

      {/* Botones de acción */}
      {carrito.length > 0 && (
        <div className="text-center mt-4">
          <button className="vaciar btn btn-danger me-2" onClick={vaciarCarrito}>Vaciar carrito</button>
          <button className="finalizar btn btn-success" onClick={finalizarCompra}>Finalizar compra</button>
        </div>
      )}
    </div>
  );
}

export default Carrito;
