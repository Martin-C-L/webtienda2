// src/components/tests/Catalogo.test.jsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';


import Catalogo from '../components/Catalogo.jsx';

describe('Componente Catalogo', () => {
  it('debería filtrar los productos cuando se cambia la categoría', () => {
    // Arrange
    render(
      <MemoryRouter>
        <Catalogo />
      </MemoryRouter>
    );

    // Assert (Antes): Ambos productos están visibles (o al menos el de "juegos")
    expect(screen.getByText('Ajedrez Nación')).toBeTruthy();
    expect(screen.getByText('Silla Gamer Cougar')).toBeTruthy();

    // Act: Simulamos seleccionar la categoría "sillas"
    fireEvent.change(screen.getByRole('combobox'), { 
      target: { value: 'sillas' } 
    });

    // Assert (Después): El producto de "juegos" ya NO está,
    // pero el de "sillas" SÍ está.
    expect(screen.queryByText('Ajedrez Nación')).not.toBeTruthy();
    expect(screen.getByText('Silla Gamer Cougar')).toBeTruthy();
  });
});