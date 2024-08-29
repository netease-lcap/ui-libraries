import { ComputedRef } from '@vue/composition-api';

export type LayoutMode = 'linear' | 'grid';

export interface FormExtendsContext {
  labelEllipsis: ComputedRef<boolean>;
  labelWidth: ComputedRef<string>;
}

export interface FormItemExtendsContext {
  // state: ComputedRef
}
