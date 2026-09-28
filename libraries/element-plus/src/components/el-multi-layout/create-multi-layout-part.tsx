import { defineComponent } from 'vue';
import { ElFlex } from '../index';

export function createMultiLayoutPart(name: string) {
  return defineComponent({
    ...ElFlex,
    name,
  });
}
