import { P as PresetProperty, S as StorybookConfig } from './index-41f47ef3.js';
import 'file-system-cache';
import '@babel/core';
import 'http';
import '@storybook/builder-vite';

declare const core: PresetProperty<'core', StorybookConfig>;
declare const viteFinal: StorybookConfig['viteFinal'];

export { core, viteFinal };
