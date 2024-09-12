import type { NaslComponentPluginOptions } from '@lcap/vue2-utils';
import styles from './index.module.css';

export const useFormFieldClass: NaslComponentPluginOptions = {
  setup(props) {
    return {
      class: props.useComputed(['class', 'range'], (className, range = false) => {
        const list = className ? className.split(' ') : [];
        list.push(range ? styles.formRangeFieldInput : styles.formFieldInput);
        return list.join(' ');
      }),
    };
  },
  order: 10,
};
