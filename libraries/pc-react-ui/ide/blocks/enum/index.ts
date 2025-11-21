import { genSelectBlock } from './genSelectBlock';

export default [
  {
    concept: 'Enum',
    genBlock: (naslNode, refElement) => genSelectBlock(naslNode, refElement),
  },
];
