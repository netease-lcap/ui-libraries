export interface Request {
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE'
  query: Record<string, string>;
  data: Record<string, any>;
}

export interface APIRouterOptions {
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  handler: (req: Request) => Promise<any>;
}

export const createAPIMiddleware = (routes: APIRouterOptions[]) => {
  return (req: Request, res: Response, next) => {

  };
};
