import { createContext } from 'react';

export interface IFormContext {
  colSpan?: number;
  isForm?: boolean
}

const FormContext = createContext<IFormContext>({
  colSpan: undefined,
  isForm: false,
});

export default FormContext;

export interface IQueryFormContext {
  isQueryForm?: boolean
}

export const QueryFormContext = createContext<IQueryFormContext>({
  isQueryForm: false,
});
