// src/components/tests/Inicio.test.jsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';


import Inicio from '../components/Inicio.jsx';

describe('Componente Inicio', () => {
  it('debería renderizar el título principal y los links de navegación', () => {
    // Arrange: Renderiza el componente dentro de un Router
    render(
      <MemoryRouter>
        <Inicio />
      </MemoryRouter>
    );

    // Assert: Comprueba que el texto exista en el DOM
    expect(screen.getByText('Level Up Gamer')).toBeTruthy();
    expect(screen.getByText('Catálogo')).toBeTruthy();
    expect(screen.getByText('Iniciar sesión')).toBeTruthy();
  });
});