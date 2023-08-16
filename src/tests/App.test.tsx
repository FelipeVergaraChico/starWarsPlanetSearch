import React from 'react';
import { waitFor, render, screen } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';
import fetchPlanetsAPI from '../API/fetchPlanetsAPI';
test('Testa se é renderizado botão pra adicionar filtro', async () => {
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
   await userEvent.type((screen.getByDisplayValue(/0/i)), '4500000000')
   const planeta5 = screen.getByText(/Coruscant/i)
   expect(planeta5).toBeInTheDocument();
})