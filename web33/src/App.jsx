import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// 1. Importa todos tus componentes (Asumiendo que están en src/components)
import Inicio from './components/Inicio';
import Catalogo from './components/Catalogo';
import Carrito from './components/Carrito';
import LoginRegister from './components/LoginRegister'; 
import Registro from './components/Registro'; 
import Header from './components/Header'; 
import Producto from './components/Producto'; 

// Importación de Bootstrap (AÑADIDO)
import 'bootstrap/dist/css/bootstrap.min.css';

// Importa tu CSS global (Asegúrate de que este cargue DESPUÉS de Bootstrap)
import './assets/styles.css'; 

function App() {
  return (
    <Router>
      <div className="App">
        <Header /> {/* Se incluye el componente Header en la parte superior */}
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/catalogo" element={<Catalogo />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/login" element={<LoginRegister />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/producto/:nombre" element={<Producto />} /> {/* Nueva ruta para productos */}
          <Route path="*" element={<h1>404 - Página no encontrada</h1>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
