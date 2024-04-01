import { createContext } from 'react';

export interface IRouterContext {
  router?: Record<string, string>,
}

export const RouterContext = createContext<IRouterContext>({
  router: undefined,
});
