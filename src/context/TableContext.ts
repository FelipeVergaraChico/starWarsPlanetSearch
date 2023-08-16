import { createContext } from 'react';
import { ArrayPlanets } from '../type';

const TableContext = createContext([] as ArrayPlanets);

export default TableContext;
