import React, { useState, useEffect } from 'react';
import './App.css';
import Table from './components/Table';
import TableContext from './context/TableContext';
import fetchPlanetsAPI from './API/fetchPlanetsAPI';
import { PlanetType } from './type';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [planetss, setPlanetss] = useState<PlanetType[]>([]);

  const getPlanets = async () => {
    const data = await fetchPlanetsAPI();
    setPlanetss(data.results);
    setIsLoading(false);
  };
  const planetasSemMoradores = planetss.map((p: PlanetType) => {
    delete p.residents;
    return p;
  });
  useEffect(() => {
    getPlanets();
    setPlanetss(planetasSemMoradores);
  }, []);

  if (isLoading) {
    return <h1>Carregando...</h1>;
  }
  return (
    <div>
      <TableContext.Provider value={ planetss }>
        <Table />
      </TableContext.Provider>
    </div>
  );
}

export default App;
