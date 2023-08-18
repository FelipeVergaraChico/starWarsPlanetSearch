import React, { useEffect, useState, useContext } from 'react';
import { PlanetType, FiltroAplicadoType } from '../type';
import TableContext from '../context/TableContext';

function Table() {
  const initialState = [
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ];

  const [planetss, setPlanets] = useState<PlanetType[]>([]);
  const [multipleFilter, setMultipleFilter] = useState(initialState);
  const [column, setColumn] = useState('population');
  const [operator, setOperator] = useState('maior que');
  const [number, setNumber] = useState('0');
  const [filtroAplicado, setFiltroAplicado] = useState<FiltroAplicadoType[]>([]);
  const tablecontext = useContext(TableContext);

  useEffect(() => {
    setPlanets(tablecontext);
  }, [tablecontext]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const planetsFiltred = planetss.filter((p) => p.name.includes(e.target.value));
    setPlanets(planetsFiltred);
    if (e.target.value.length === 0) {
      setPlanets(tablecontext);
    }
  };

  const applyFilters = () => {
    let filteredPlanets = planetss;

    if (operator === 'maior que') {
      filteredPlanets = filteredPlanets.filter(
        (p) => Number(p[column as keyof PlanetType]) > Number(number),
      );
    } else if (operator === 'menor que') {
      filteredPlanets = filteredPlanets.filter(
        (p) => Number(p[column as keyof PlanetType]) < Number(number),
      );
    } else if (operator === 'igual a') {
      filteredPlanets = filteredPlanets.filter(
        (p) => Number(p[column as keyof PlanetType]) === Number(number),
      );
    }

    setPlanets(filteredPlanets);
    setFiltroAplicado([...filtroAplicado, { column, operator, number }]);
  };

  const handleRemove = (filtro: FiltroAplicadoType) => {
    const updatedFilters = filtroAplicado.filter((fp) => fp.column !== filtro.column);
    const updatedPlanets = updatedFilters.reduce((result, af) => {
      if (af.operator === 'maior que') {
        return result
          .filter((planet: PlanetType) => Number(planet[af.column as keyof PlanetType])
           > Number(af.number));
      } if (af.operator === 'menor que') {
        return result
          .filter((planet: PlanetType) => Number(planet[af.column as keyof PlanetType])
           < Number(af.number));
      } if (af.operator === 'igual a') {
        return result
          .filter((planet: PlanetType) => Number(planet[af.column as keyof PlanetType])
           === Number(af.number));
      }
      return result;
    }, tablecontext);

    setFiltroAplicado(updatedFilters);
    setPlanets(updatedPlanets);
  };

  const handleRemoveAllFilters = () => {
    setPlanets(tablecontext);
    setMultipleFilter(initialState);
    setFiltroAplicado([]);
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
          onChange={ (e) => setColumn(e.target.value) }
        >
          {
            multipleFilter.map((fo, index) => (
              <option key={ index }>{ fo }</option>
            ))
          }
        </select>
        <select
          data-testid="comparison-filter"
          onChange={ (event) => setOperator(event.target.value) }
        >
          <option>maior que</option>
          <option>menor que</option>
          <option>igual a</option>
        </select>
        <input
          type="number"
          value={ number }
          data-testid="value-filter"
          onChange={ (event) => setNumber(event.target.value) }
        />
        <button
          data-testid="button-filter"
          onClick={ applyFilters }
        >
          Adicionar filtro
        </button>
        <button
          data-testid="button-remove-filters"
          onClick={ handleRemoveAllFilters }
        >
          Remover todos os filtros
        </button>
      </div>
      {
        filtroAplicado.map((fp, index) => (
          <span data-testid="filter" key={ index }>
            <p>
              {
                `${fp.column} ${fp.operator} ${fp.number}`
              }
            </p>
            <button onClick={ () => handleRemove(fp) }>
              Remover
            </button>
          </span>
        ))
      }
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
