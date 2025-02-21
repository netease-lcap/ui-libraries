import type { IncomingMessage, ServerResponse } from 'http';
import { LcapBuildOptions } from 'src/build/types';
import * as URL from 'url';

type Method = 'GET' | 'OPTIONS' | 'POST' | 'PUT' | 'DELETE';
export interface Request {
  url: string;
  method: Method;
  query: Record<string, string>;
  data: any;
  context: LcapBuildOptions;
}

export interface APIRouterOptions {
  url: string;
  method: Method;
  handler: (req: Request) => Promise<any>;
}

async function getRequestData(req: IncomingMessage) {
  if (!req.method || ['GET', 'OPTIONS'].includes(req.method)) {
    return {};
  }

  const data = await new Promise((resolve, reject) => {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString(); // 累计接收到的数据块
    });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (e) {
        reject(e);
      }
    });

    req.on('error', (err) => {
      reject(err);
    });
  });

  return data;
}

export const createAPIHandler = (url: string, method: APIRouterOptions['method'], handler: APIRouterOptions['handler']) => {
  return {
    url,
    method,
    handler,
  };
};

export const createAPIMiddleware = (routes: APIRouterOptions[], context: LcapBuildOptions) => {
  // eslint-disable-next-line consistent-return
  return async (req: IncomingMessage, res: ServerResponse, next) => {
    if (!req.url?.startsWith('/api')) {
      return next();
    }

    const { pathname, query } = URL.parse(req.url, true);
    const route = routes.find((r) => r.url === pathname && r.method === req.method);
    if (!route) {
      return next();
    }

    res.setHeader('content-type', 'application/json;charset=UTF-8');

    try {
      const data = await getRequestData(req);

      const result = await route.handler({
        url: req.url,
        method: req.method as any,
        query: query as any,
        data,
        context,
      });

      res.write(
        JSON.stringify({
          code: 200,
          data: result,
        }),
      );
    } catch (e: any) {
      res.write(
        JSON.stringify({
          code: e.code || 500,
          message: e.message || 'unknow error',
        }),
      );
    }

    res.end();
  };
};
