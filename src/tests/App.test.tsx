import React from 'react';
import { waitFor, render, screen } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';
import fetchPlanetsAPI from '../API/fetchPlanetsAPI';
import { MockPlanets } from './mock/MockPlanets';
import { vi } from 'vitest';
test('Testa se é renderizado botão pra adicionar filtro', async () => {
  global.fetch = vi.fn().mockResolvedValue({
    json: async () => MockPlanets,
  });
  render(<App />);
 await waitFor(() => expect(screen.getByPlaceholderText(/Nome do Planeta/i)).toBeInTheDocument(), {
  timeout: 6000,
 });
 const button = screen.getByRole('button', { name: /adicionar filtro/i })
 expect(button).not.toBeDisabled();
 expect(button).toBeInTheDocument();
 expect(screen.getByDisplayValue(/0/i)).toBeInTheDocument();
 expect(screen.getByDisplayValue(/maior que/i)).toBeInTheDocument();
 expect(screen.getByText(/Films/i)).toBeInTheDocument()
 expect(screen.getByDisplayValue(/population/i)).toBeInTheDocument();
 expect(screen.getByPlaceholderText(/Nome do Planeta/i)).toBeInTheDocument();
});

test('filtros funcionam', async () => {
  global.fetch = vi.fn().mockResolvedValue({
    json: async () => MockPlanets,
  });
  render(<App/>);
  await waitFor(() => expect(screen.getByPlaceholderText(/Nome do Planeta/i)).toBeInTheDocument(), {
    timeout: 6000,
   });
   await userEvent.type(screen.getByPlaceholderText(/Nome do Planeta/i), 'e');
   const planeta = screen.getByText(/Tatooine/i)
   const planeta2 = screen.getByText(/Alderaan/i)
   const planeta3 = screen.getByText(/Bespin/i)
   expect(planeta).toBeInTheDocument();
   expect(planeta2).toBeInTheDocument();
   expect(planeta3).toBeInTheDocument();
   await userEvent.type((screen.getByDisplayValue(/0/i)), '1000000000')
   expect(planeta2).toBeInTheDocument();
   expect(planeta3).toBeInTheDocument();
   expect(screen.getByText(/Endor/i)).toBeInTheDocument()
})