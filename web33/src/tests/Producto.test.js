// src/components/tests/Producto.test.jsx 
// (Vi que ya tenías este archivo, puedes reemplazarlo)

import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';


import Producto from '../components/Producto.jsx';

describe('Componente Producto', () => {
  it('debería renderizar los detalles del producto pasados por "location.state"', () => {
    // Arrange: Creamos un producto falso
    const mockProducto = {
      nombre: "Producto de Prueba",
      descripcion: "Esta es una descripción de prueba.",
      precio: 12345,
      imagen: "test.jpg"
    };

    // Arrange: Simulamos la navegación con estado
    render(
      <MemoryRouter initialEntries={[{ pathname: '/producto/test', state: { producto: mockProducto } }]}>
        <Producto />
      </MemoryRouter>
    );

    // Assert: Verificamos que los detalles del mockProducto se muestren
    expect(screen.getByText('Producto de Prueba')).toBeTruthy();
    expect(screen.getByText('Esta es una descripción de prueba.')).toBeTruthy();
    expect(screen.getByText('Precio: $12345')).toBeTruthy();
  });
});