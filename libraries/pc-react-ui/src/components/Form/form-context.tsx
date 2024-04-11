import { createContext } from 'react';

export interface IFormContext {
  colSpan?: number;
  isForm?: boolean
  width?: number | 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  labelText?: string
  form?: any;
}

const FormContext = createContext<IFormContext>({
  colSpan: undefined,
  isForm: false,
  width: 'md',
  labelText: undefined,
});

export default FormContext;

export interface IQueryFormContext {
  isQueryForm?: boolean
}

export const QueryFormContext = createContext<IQueryFormContext>({
  isQueryForm: false,
});
