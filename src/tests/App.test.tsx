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
})

test('Se o botão de reset funciona', async () => {
  global.fetch = vi.fn().mockResolvedValue({
    json: async () => MockPlanets,
  });
  render(<App/>);
  await waitFor(() => expect(screen.getByPlaceholderText(/Nome do Planeta/i)).toBeInTheDocument(), {
    timeout: 6000,
   });

   await userEvent.selectOptions(screen.getByTestId('column-filter'), 'rotation_period');
   await userEvent.selectOptions(screen.getByTestId('comparison-filter'), 'menor que');
   await userEvent.type(screen.getByTestId('value-filter'), '10');
   await userEvent.click(screen.getByTestId('button-filter'));
   const table = screen.getAllByRole('row');
   expect(table).toHaveLength(1);
})

test('se o filtro maior que funciona', async () => {
  global.fetch = vi.fn().mockResolvedValue({
    json: async () => MockPlanets,
  });
  render(<App/>);
  await waitFor(() => expect(screen.getByPlaceholderText(/Nome do Planeta/i)).toBeInTheDocument(), {
    timeout: 6000,
   });

   await userEvent.selectOptions(screen.getByTestId('column-filter'), 'rotation_period');
   await userEvent.selectOptions(screen.getByTestId('comparison-filter'), 'maior que');
   await userEvent.type(screen.getByTestId('value-filter'), '10');
   await userEvent.click(screen.getByRole('button', { name: /adicionar filtro/i }));
   const resultado = screen.getAllByRole('row');
   expect(resultado).toHaveLength(11);
  })

  test('se o filtro igual a funciona', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      json: async () => MockPlanets,
    });
    render(<App/>);
    await waitFor(() => expect(screen.getByPlaceholderText(/Nome do Planeta/i)).toBeInTheDocument(), {
      timeout: 6000,
     });
  
     await userEvent.selectOptions(screen.getByTestId('column-filter'), 'population');
     await userEvent.selectOptions(screen.getByTestId('comparison-filter'), 'igual a');
     await userEvent.type(screen.getByTestId('value-filter'), '15555');
     await userEvent.click(screen.getByRole('button', { name: /adicionar filtro/i }));
     const resultado = screen.getAllByRole('row');
     expect(resultado).toHaveLength(1);
    })

  test('se o filtro menor que funciona', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      json: async () => MockPlanets,
    });
    render(<App/>);
    await waitFor(() => expect(screen.getByPlaceholderText(/Nome do Planeta/i)).toBeInTheDocument(), {
      timeout: 6000,
     });
  
     await userEvent.selectOptions(screen.getByTestId('column-filter'), 'population');
     await userEvent.selectOptions(screen.getByTestId('comparison-filter'), 'menor que');
     await userEvent.type(screen.getByTestId('value-filter'), '15555');
     await userEvent.click(screen.getByRole('button', { name: /adicionar filtro/i }));
     const resultado = screen.getAllByRole('row');
     expect(resultado).toHaveLength(2);
    })

    test('se ao apagar o texto aparece todos os planetas', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        json: async () => MockPlanets,
      });
      render(<App/>);
      await waitFor(() => expect(screen.getByPlaceholderText(/Nome do Planeta/i)).toBeInTheDocument(), {
        timeout: 6000,
       });
    await userEvent.type(screen.getByPlaceholderText(/Nome do Planeta/i), 'e');
    await userEvent.clear(screen.getByPlaceholderText(/Nome do Planeta/i));
    const resultado = screen.getAllByRole('row')
    expect(resultado).toHaveLength(11);
      })
      test('botao funciona individualmente', async () => {
        global.fetch = vi.fn().mockResolvedValue({
          json: async () => MockPlanets,
        });
        render(<App/>);
        await waitFor(() => expect(screen.getByPlaceholderText(/Nome do Planeta/i)).toBeInTheDocument(), {
          timeout: 6000,
         });
        await userEvent.selectOptions(screen.getByTestId('column-filter'), 'population');
        await userEvent.selectOptions(screen.getByTestId('comparison-filter'), 'menor que');
        await userEvent.type(screen.getByTestId('value-filter'), '15555');
        await userEvent.click(screen.getByRole('button', { name: /Adicionar filtro/i}));
        const resultado = screen.getAllByRole('row')
        expect(resultado).toHaveLength(2)

        await userEvent.selectOptions(screen.getByTestId('column-filter'), 'rotation_period');
        await userEvent.selectOptions(screen.getByTestId('comparison-filter'), 'maior que');
        await userEvent.type(screen.getByTestId('value-filter'), '10');
        await userEvent.click(screen.getByRole('button', { name: /adicionar filtro/i }));
        const resultado2 = screen.getAllByRole('row');
        expect(resultado2).toHaveLength(1);


        await userEvent.selectOptions(screen.getByTestId('column-filter'), 'population');
        await userEvent.selectOptions(screen.getByTestId('comparison-filter'), 'igual a');
        await userEvent.type(screen.getByTestId('value-filter'), '15555');
        await userEvent.click(screen.getByRole('button', { name: /adicionar filtro/i }));
        const resultado3 = screen.getAllByRole('row');
        expect(resultado3).toHaveLength(1);


        const button = screen.getAllByRole('button', { name: /Remover/i });

        await userEvent.click(button[2])
        const resultado4 = screen.getAllByRole('row');
        expect(resultado4).toHaveLength(1);

        await userEvent.click(button[1])
        const resultado5 = screen.getAllByRole('row')
        expect(resultado5).toHaveLength(11)

        await userEvent.click(button[0])
        const resultado6 = screen.getAllByRole('row')
        expect(resultado6).toHaveLength(11)
        })

      