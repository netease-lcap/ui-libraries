export interface ElFlexProps {
  mode?: 'block' | 'flex';
  direction?: 'horizontal' | 'vertical';
  justify?: 'start' | 'center' | 'end' | 'space-between' | 'space-around';
  alignment?: 'start' | 'center' | 'end' | 'baseline' | 'stretch';
  wrap?: boolean;
  gutter?: number;
  loading?: boolean;
  loadingText?: string;
  loadingIcon?: string;
  loadingIconRotate?: boolean;
}

export const ElFlexPropsDefine = {
  mode: {
    type: String,
    default: () => 'flex',
  },
  direction: {
    type: String,
    default: () => 'horizontal',
  },
  justify: {
    type: String,
    default: () => 'start',
  },
  alignment: {
    type: String,
    default: () => 'start',
  },
  wrap: {
    type: Boolean,
    default: true,
  },
  gutter: {
    type: Number,
    default: 12,
  },
  // loading: {
  //   type: Boolean,
  //   default: false,
  // },
  // loadingText: {
  //   type: String,
  //   default: '',
  // },
  // loadingIcon: {
  //   type: String,
  //   default: 'loading',
  // },
  // loadingIconRotate: {
  //   type: Boolean,
  //   default: true,
  // },
};
