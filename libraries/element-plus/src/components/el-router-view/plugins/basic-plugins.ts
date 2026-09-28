import { PluginAccumulateTypes } from '@/plugins/accumulate';

const RouterViewBasicAccumulate = new PluginAccumulateTypes<
  nasl.ui.ElRouterViewOptions,
  Record<string, any>
>();

export default RouterViewBasicAccumulate;
