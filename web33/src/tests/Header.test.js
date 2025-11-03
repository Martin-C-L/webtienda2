// src/components/tests/Header.test.jsx
import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import Header from '../components/Header.jsx';

describe('Componente Header', () => {

  it('debería mostrar la cantidad correcta de items (ej: 3)', () => {
    // Arrange: Simulamos un carrito con 3 items
    const mockCarrito = [{ id: 1, cantidad: 2 }, { id: 2, cantidad: 1 }];
    spyOn(localStorage, 'getItem').and.callFake(() => JSON.stringify(mockCarrito));

    // Act: Renderizamos el componente
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    
    // Assert: Verificamos que el "badge" (contador) muestre "3"
    expect(screen.getByText('3')).toBeTruthy();
  });

  it('no debería mostrar el contador si el carrito está vacío', () => {
    // Arrange: Simulamos un carrito vacío
    spyOn(localStorage, 'getItem').and.callFake(() => JSON.stringify([]));

    // Act
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    
    // Assert: El badge (un número) no debe existir.
    // Usamos queryByText porque esperamos que NO esté.
    const badge = screen.queryByText(/\d+/); // Busca cualquier número
    expect(badge).toBeNull();
  });
});