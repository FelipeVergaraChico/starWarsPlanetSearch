export type PlanetType = {
  climate: string,
  created: string,
  diameter: string,
  edited: string,
  films: string[],
  gravity: string,
  name: string,
  orbital_period: string,
  population: string,
  residents?: string[],
  rotation_period: string,
  surface_water: string,
  terrain: string,
  url: string,
};
export type ArrayPlanets = PlanetType[];

export type FiltroAplicadoType = {
  column: string,
  operator: string,
  number: string,
};
