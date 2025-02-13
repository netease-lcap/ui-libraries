/* eslint-disable no-underscore-dangle */
import { RenderBaseComponent, RENDER_COMPONENT_KEY } from '@lcap/vue2-utils';

export const INJECT_BASE_COMPONENT_KEY = RENDER_COMPONENT_KEY;
export const BaseComponent = RenderBaseComponent;

export const extendComponent = (component: any, ec: any) => {
  if (component && typeof component.__extend === 'function') {
    return component.__extend(ec);
  }

  return component;
};
