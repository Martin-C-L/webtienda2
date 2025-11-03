import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Tus datos de productos
const productos = [
  { nombre: "Ajedrez Nación", categoria: "juegos", precio: 29990, imagen: "https://nacionajedrez.cl/cdn/shop/files/DSC016357_5000x.jpg?v=1702304297", descripcion: "Juego de ajedrez de alta calidad." },
  { nombre: "Mouse Logitech G203", categoria: "mouse", precio: 15990, imagen: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQwP2AEHOs4GsuUT50WrRrwru940WJqRerBIy-Iq0hHz7-Pd_iUFqwNq6w96u_1uYzj2NUFkTMLPWezkCdGy2pwG3Lb8hv9jbbv5DLb6Wg1Hm1rMxHsP7DoSg", descripcion: "Mouse gamer con iluminación RGB." },
  { nombre: "Silla Gamer Cougar", categoria: "sillas", precio: 89990, imagen: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTi5eNOilyfzNVmsxMqbdClMluvDVBzB3XpUTEyTlfTH-bIdmfMkwisrQpaAJk17UWc_tCfKU3WmLWD5grW9yPk4qm4BWKWgoLrvax_R4O_GTZyGlSP_p5KxQ", descripcion: "Silla ergonómica para gamers." },
  { nombre: "Polera personalizada", categoria: "poleras", precio: 12990, imagen: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRLvt4kNzmCE4zAmJJ13pilIVsF-MaTRVMgHYmXo5nQD-JP90IX_Ay7YHS-6cyngVMXPYv5iCNADjHql48LkGCHet4MdfrQL7VEY0u4b47ok7afIFGO5XiC" },
  { nombre: "Servicio técnico PC", categoria: "servicio", precio: 24990, imagen: "https://cdn-icons-png.flaticon.com/512/2921/2921222.png" },
  { nombre: "PS5", categoria: "consolas", precio: 500990, imagen: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcSn4yUVa6SfDCMN_XTpTBBWzGZLAdEGASk3Qag1OxZF_gP7uzZj-L-MM75Ir6kX0G-BsM8TbQ1vCPkgyAVm8ez177Z2vErrwj9oqnAT5X5pT8pbGJV49jWk" },
  { nombre: "Servicio técnico PC (Limpieza)", categoria: "servicio", precio: 10000, imagen: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcS7xdepzKjTDFI4mPjrdUg3uuPnvnVoIT0aXYADFIC-rBr-6CJKDECWdqXGt91B4tpunCsulkXOnWmhcZdHjHn9CmkAT9bSeOiUbuBJ0XY" },
  // Añadir más productos aquí si es necesario para llenar la grilla
  { nombre: "Teclado Mecánico", categoria: "accesorios", precio: 45000, imagen: "https://placehold.co/120x120/222/FFF?text=Teclado" },
  { nombre: "Webcam HD", categoria: "accesorios", precio: 20000, imagen: "https://placehold.co/120x120/222/FFF?text=Webcam" },
  { nombre: "Monitor Curvo", categoria: "computadores", precio: 250000, imagen: "https://placehold.co/120x120/222/FFF?text=Monitor" },
  { nombre: "Mousepad XL", categoria: "mousepad", precio: 10000, imagen: "https://placehold.co/120x120/222/FFF?text=Mousepad" },
  { nombre: "Polerón personalizado", categoria: "polerones", precio: 25000, imagen: "https://placehold.co/120x120/222/FFF?text=Poleron" },
];

// Lógica para agregar al carrito (sin alert)
function agregarAlCarrito(nombreProducto) {
  const producto = productos.find(p => p.nombre === nombreProducto);
  if (!producto) return;
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const index = carrito.findIndex(item => item.nombre === producto.nombre);
  if (index >= 0) {
    carrito[index].cantidad += 1;
  } else {
    carrito.push({ ...producto, cantidad: 1 });
  }
  localStorage.setItem("carrito", JSON.stringify(carrito));
  console.log("Producto agregado al carrito: " + producto.nombre); 
}

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

function Catalogo() {
  const [filtroCategoria, setFiltroCategoria] = useState('todos');
  const [productosFiltrados, setProductosFiltrados] = useState(productos);
  const navigate = useNavigate();

  useEffect(() => {
    if (filtroCategoria === 'todos') {
      setProductosFiltrados(productos);
    } else {
      const filtrados = productos.filter(p => p.categoria === filtroCategoria);
      setProductosFiltrados(filtrados);
    }
  }, [filtroCategoria]);

  const handleVerProducto = (producto) => {
    navigate(`/producto/${producto.nombre}`, { state: { producto } });
  };

  return (
    <div className="container mt-5">
      


      <h1 className="mb-4">Catálogo de Productos</h1>
      
      {/* Filtros centrado con Bootstrap */}
      <div className="filtros d-flex justify-content-center mb-4">
        <select 
          id="categoriaFiltro" 
          className="form-select w-auto" // form-select y w-auto de Bootstrap
          value={filtroCategoria}
          onChange={(e) => setFiltroCategoria(e.target.value)}
        >
          <option value="todos">Todas las categorías</option>
          <option value="juegos">Juegos de mesa</option>
          <option value="accesorios">Accesorios</option>
          <option value="consolas">Consolas</option>
          <option value="computadores">Computadores gamers</option>
          <option value="sillas">Sillas gamers</option>
          <option value="mouse">Mouse</option>
          <option value="mousepad">Mousepad</option>
          <option value="poleras">Poleras personalizadas</option>
          <option value="polerones">Polerones gamers personalizados</option>
          <option value="servicio">Servicio técnico</option>
        </select>
      </div>

      {/* Grilla de productos responsiva usando CSS Grid */}
      {productosFiltrados.length === 0 ? (
        <p className="text-center">No hay productos en esta categoría.</p>
      ) : (
        <div className="productos">
          {productosFiltrados.map((producto, index) => (
            <div key={index} className="producto" onClick={() => handleVerProducto(producto)} style={{ cursor: 'pointer' }}>
              <img src={producto.imagen} alt={producto.nombre} className="img-fluid" />
              <h3 className="mt-2">{producto.nombre}</h3>
              <p style={{ color: '#fff', fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '8px' }}>${producto.precio.toLocaleString()}</p>
              <button className="btn btn-dark w-100" onClick={(e) => { e.stopPropagation(); agregarAlCarrito(producto.nombre); }}>
                <i className="bi bi-cart" style={{ marginRight: '5px' }}></i>
                Agregar al carrito
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Catalogo;
