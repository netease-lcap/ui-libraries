/* eslint-disable prefer-regex-literals */
/* eslint-disable global-require */
import pc from 'picocolors';
import { isFunction } from 'lodash';
import httpsConfig from './https';

const fs = require('fs');
const connect = require('connect');
const serveIndex = require('serve-index');
const WebSocket = require('faye-websocket');
const url = require('url');
const http = require('http');
const send = require('send');
const os = require('os');

const LiveServer: any = {
  server: null,
};

function escape(html) {
  return String(html)
    .replace(/&(?!\w+;)/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// Based on connect.static(), but streamlined and with added code injecter
function staticServer(root) {
  let isFile = false;
  try {
    // For supporting mounting files instead of just directories
    isFile = fs.statSync(root).isFile();
  } catch (e: any) {
    if (e.code !== 'ENOENT') throw e;
  }

  return (req, res, next) => {
    if (req.method !== 'GET' && req.method !== 'HEAD') return next();
    const reqpath = isFile ? '' : url.parse(req.url).pathname;
    // const hasNoOrigin = !req.headers.origin;

    function directory() {
      const { pathname } = url.parse(req.originalUrl);
      res.statusCode = 301;
      res.setHeader('Location', `${pathname}/`);
      res.end(`Redirecting to ${escape(pathname)}/`);
    }

    function handleError(err) {
      if (err.status === 404) {
        next();
        return;
      }
      next(err);
    }

    send(req, reqpath, { root })
      .on('error', handleError)
      .on('directory', directory)
      // .on('file', file)
      // .on('stream', inject)
      .pipe(res);

    return undefined;
  };
}

/**
 * Rewrite request URL and pass it back to the static handler.
 * @param staticHandler {function} Next handler
 * @param file {string} Path to the entry point file
 */
function entryPoint(staticHandler, file) {
  if (!file) {
    return (req, res, next) => {
      next();
    };
  }

  return function (req, res, next) {
    req.url = `/${file}`;
    staticHandler(req, res, next);
  };
}

/**
 * Start a live server with parameters given as an object
 * @param host {string} Address to bind to (default: 0.0.0.0)
 * @param port {number} Port number (default: 8080)
 * @param root {string} Path to root directory (default: cwd
 * @param file {string} Path to the entry point file
 * @param wait {number} Server will wait for all changes, before reloading
 * @param middlewares {array} Append middleware to stack, e.g. [function(req, res, next) { next(); }].
 */
LiveServer.start = function (options) {
  options = options || {};
  const host = options.host || '0.0.0.0';
  const port = options.port !== undefined ? options.port : 8080; // 0 means random
  const root = options.root || process.cwd();

  const { file } = options;
  const staticServerHandler = staticServer(root);
  const wait = options.wait === undefined ? 100 : options.wait;
  const cors = options.cors || false;
  const https = options.https || null;
  const middlewares = options.middlewares || [];

  // Setup a web server
  const app = connect();

  if (cors) {
    app.use(
      require('cors')({
        origin: true, // reflecting request origin
        credentials: true, // allowing requests with credentials
      }),
    );
  }

  middlewares.forEach((mw) => {
    if (!isFunction(mw)) {
      return;
    }

    app.use(mw);
  });

  app
    .use(staticServerHandler) // Custom static server
    .use(entryPoint(staticServerHandler, file))
    .use(serveIndex(root, { icons: true }));

  let server; let protocol;
  if (https !== null) {
    server = require('https').createServer(httpsConfig, app);
    protocol = 'https';
  } else {
    server = http.createServer(app);
    protocol = 'http';
  }

  // Handle server startup errors
  server.addListener('error', (e) => {
    if (e.code === 'EADDRINUSE') {
      const serveURL = `${protocol}://${host}:${port}`;
      console.log(pc.yellow(`${serveURL} is already in use. Trying another port.`));
      setTimeout(() => {
        server.listen(0, host);
      }, 1000);
    } else {
      console.log(pc.red(e.toString()));
      LiveServer.shutdown();
    }
  });

  // Handle successful server
  server.addListener('listening', (/* e */) => {
    LiveServer.server = server;

    const address = server.address();
    const serveHost = address.address === '0.0.0.0' ? '127.0.0.1' : address.address;
    const openHost = host === '0.0.0.0' ? '127.0.0.1' : host;

    const serveURL = `${protocol}://${serveHost}:${address.port}`;
    const openURL = `${protocol}://${openHost}:${address.port}`;

    let serveURLs = [serveURL];
    if (address.address === '0.0.0.0') {
      const ifaces = os.networkInterfaces();
      serveURLs = Object.keys(ifaces)
        .map((iface) => {
          return ifaces[iface];
        })
        // flatten address data, use only IPv4
        .reduce((data, addresses) => {
          addresses
            .filter((addr) => {
              return addr.family === 'IPv4';
            })
            .forEach((addr) => {
              data.push(addr);
            });
          return data;
        }, [])
        .map((addr) => {
          return `${protocol}://${addr.address}:${address.port}`;
        });
    }

    // Output
    if (serveURL === openURL) {
      if (serveURLs.length === 1) {
        console.log(pc.green(`Serving ${root} at ${pc.underline(serveURLs[0])}`));
      } else {
        console.log(pc.green(`Serving ${root} at\n\t${serveURLs.map((s) => pc.underline(s)).join('\n\t')}`));
      }
    } else {
      console.log(pc.green(`Serving ${root} at ${openURL} (${serveURL})`));
    }
  });

  // Setup server to listen at port
  server.listen(port, host);

  // WebSocket
  let clients: any[] = [];
  server.addListener('upgrade', (request, socket, head) => {
    const ws = new WebSocket(request, socket, head);
    ws.onopen = function () {
      ws.send('connected');
    };

    if (wait > 0) {
      (function () {
        const wssend = ws.send;
        let waitTimeout;
        ws.send = function (...args) {
          if (waitTimeout) clearTimeout(waitTimeout);
          waitTimeout = setTimeout(() => {
            wssend.apply(ws, args);
          }, wait);
        };
      }());
    }

    ws.onclose = () => {
      clients = clients.filter((x) => {
        return x !== ws;
      });
    };

    clients.push(ws);
  });

  return {
    server,
    send: (msg) => {
      clients.forEach((ws) => {
        if (!ws) {
          return;
        }
        ws.send(msg);
      });
    },
  };
};

LiveServer.shutdown = () => {
  const { server } = LiveServer;
  if (server) server.close();
};

export default LiveServer;
