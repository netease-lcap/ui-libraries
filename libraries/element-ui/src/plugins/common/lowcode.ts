import { camelCase } from 'lodash';
import { NaslComponentPluginOptions } from '../plugin';
import styles from './index.module.css';
import { getSlotKey } from '../utils';

export const SEmpty = {
  name: 's-empty',
  functional: true,
  render(h) {
    return h('div', {
      class: styles.empty,
      attrs: {
        's-empty': 'true',
      },
    });
  },
};

export const createSlotEmpty = (slotNames: string[] = ['default'], disableVusionSlot = true) => {
  const useSlotEmpty: NaslComponentPluginOptions = {
    setup: (props, { h, isDesigner }) => {
      if (!isDesigner) {
        return;
      }

      const resultSlots = {};
      slotNames.forEach((name) => {
        const key = camelCase(`slot-${name}`);
        resultSlots[getSlotKey(name)] = (scope) => {
          const slot = props.get(key);
          const vnodes = typeof slot === 'function' ? slot(scope) : null;
          const sempty = !vnodes || vnodes.length === 0 ? [h(SEmpty)] : vnodes;

          if (disableVusionSlot) {
            return sempty;
          }

          return h('div', {
            attrs: {
              'vusion-slot-name': name,
            },
          }, sempty);
        };
      });

      // eslint-disable-next-line consistent-return
      return resultSlots;
    },
    order: 11,
    onlyUseIDE: true,
  };

  return useSlotEmpty;
};
