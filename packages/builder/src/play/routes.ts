import * as controllers from './controllers';
import { type APIRouterOptions } from './middleware';

export const routes: APIRouterOptions[] = Object.values(controllers).filter((op) => typeof op === 'object' && op.url && typeof op.handler === 'function');
