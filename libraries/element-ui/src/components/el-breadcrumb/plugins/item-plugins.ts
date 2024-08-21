import { NaslComponentPluginOptions } from '@lcap/vue2-utils/plugins';

export const useExtendsPlugins: NaslComponentPluginOptions = {
  props: ['link', 'destination', 'href'],
  setup({ useComputed }) {
    const toRef = useComputed(['link', 'destination', 'href', 'to'], (link, destination, href, to) => {
      return to || href || link || destination;
    });

    return {
      to: toRef,
    };
  },
};
