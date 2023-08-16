import React, { useEffect, useState, useContext } from 'react';
import { PlanetType } from '../type';
import TableContext from '../context/TableContext';

function Table() {
  const [planetss, setPlanets] = useState<PlanetType[]>([]);
  const [coluna, setColuna] = useState('population');
  const [operador, setOperador] = useState('maior que');
  const [numero, setNumero] = useState('0');
  const tablecontext = useContext(TableContext);

  useEffect(() => {
    setPlanets(tablecontext);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const planetsFiltred = planetss.filter((p) => p.name
      .includes(e.target.value));
    setPlanets(planetsFiltred);
    if (e.target.value.length === 0) {
      setPlanets(tablecontext);
    }
  };
  const handleClick = () => {
    if (operador === 'maior que') {
      const filtro = planetss.filter(
        (p) => Number(p[coluna as keyof PlanetType]) > Number(numero),
      );
      setPlanets(filtro);
    }
    if (operador === 'menor que') {
      const filtro = planetss.filter(
        (p) => Number(p[coluna as keyof PlanetType]) < Number(numero),
      );
      setPlanets(filtro);
    }
    if (operador === 'igual a') {
      const filtro = planetss.filter(
        (p) => Number(p[coluna as keyof PlanetType]) === Number(numero),
      );
      setPlanets(filtro);
    }
  };

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Nome do Planeta"
          className="input-text"
          data-testid="name-filter"
          onChange={ handleChange }
        />
        <select
          data-testid="column-filter"
          onChange={ (e) => setColuna(e.target.value) }
        >
          <option>population</option>
          <option>orbital_period</option>
          <option>diameter</option>
          <option>rotation_period</option>
          <option>surface_water</option>
        </select>
        <select
          data-testid="comparison-filter"
          onChange={ (event) => setOperador(event.target.value) }
        >
          <option>maior que</option>
          <option>menor que</option>
          <option>igual a</option>
        </select>
        <input
          type="number"
          value={ numero }
          data-testid="value-filter"
          onChange={ (event) => setNumero(event.target.value) }
        />
        <button
          data-testid="button-filter"
          onClick={ handleClick }
        >
          Adicionar filtro
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>Url</th>
          </tr>
        </thead>
        <tbody>
          { planetss.map((p) => (
            <tr key={ p.name }>
              <td>{ p.name }</td>
              <td>{ p.rotation_period }</td>
              <td>{ p.orbital_period }</td>
              <td>{ p.diameter }</td>
              <td>{ p.climate }</td>
              <td>{ p.gravity }</td>
              <td>{ p.terrain }</td>
              <td>{ p.surface_water }</td>
              <td>{ p.population }</td>
              <td>{ p.films }</td>
              <td>{ p.created }</td>
              <td>{ p.edited }</td>
              <td>{ p.url }</td>
            </tr>
          )) }
        </tbody>
      </table>
    </div>
  );
}

export default Table;
