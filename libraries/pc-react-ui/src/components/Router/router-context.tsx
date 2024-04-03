import { createContext } from 'react';

export interface IRouterContext {
  router?: Record<string, any>,
  useNavigate?:any;
  useLocation?:any;
}

export const RouterContext = createContext<IRouterContext>({
  router: undefined,

});
