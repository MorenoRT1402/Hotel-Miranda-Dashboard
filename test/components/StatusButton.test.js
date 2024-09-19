import React from 'react';
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from '@testing-library/react';
import { StatusButton } from '../../src/components/table/StatusButton';
import { statusColors } from '../../src/app/table';

describe('StatusButton', () => {
  const statusOptions = statusColors.Users;

  test('should render the button with the correct initial color and text', () => {
    const initialStatus = 'Active';

    render(<StatusButton text={initialStatus} statusColors={statusOptions} />);

    const button = screen.getByRole('button', { name: initialStatus });
    expect(button).toHaveTextContent(initialStatus);
    expect(button).toHaveStyle(`background-color: ${statusOptions[initialStatus]}`);
  });

  test('should change to the next status and color when clicked', () => {
    const initialStatus = 'Active';
    const nextStatus = 'Inactive';

    render(<StatusButton text={initialStatus} statusColors={statusOptions} />);

    const button = screen.getByRole('button', { name: initialStatus });
    
    // Verifica el estado inicial
    expect(button).toHaveTextContent(initialStatus);
    expect(button).toHaveStyle(`background-color: ${statusOptions[initialStatus]}`);

    // Simula el clic
    fireEvent.click(button);

    // Verifica el siguiente estado
    expect(button).toHaveTextContent(nextStatus);
    expect(button).toHaveStyle(`background-color: ${statusOptions[nextStatus]}`);
  });
});
