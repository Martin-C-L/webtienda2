// src/components/tests/Registro.test.jsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';


import Registro from '../components/Registro.jsx';

describe('Componente Registro', () => {
  it('debería mostrar un mensaje de error si el usuario es menor de 18 años', () => {
    // Arrange
    render(
      <MemoryRouter>
        <Registro />
      </MemoryRouter>
    );

    // Act 1: Calcular una fecha de alguien de 17 años
    const today = new Date();
    const underageDate = new Date(today.getFullYear() - 17, today.getMonth(), today.getDate()).toISOString().split('T')[0];

    // Act 2: Simular el cambio en el input de fecha
    fireEvent.change(screen.getByLabelText(/Fecha de Nacimiento/i), {
      target: { value: underageDate },
    });

    // Act 3: Simular el clic en el botón
    fireEvent.click(screen.getByText('Registrarse'));

    // Assert: Verificamos que el mensaje de error aparezca
    expect(screen.getByText('Debes tener al menos 18 años para registrarte.')).toBeTruthy();
  });
});