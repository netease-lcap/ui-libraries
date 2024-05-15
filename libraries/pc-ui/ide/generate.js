import { genCurdTableBlock } from './blocks/genCurdTable';
import { genCreateBlock } from './blocks/genCreateBlock';
import curdsvg from './blocks/assets/curd.svg';
import createsvg from './blocks/assets/create.svg';

export default [
  {
    title: '列表（全）',
    image: curdsvg,
    genBlock: (naslNode, refElement) => genCurdTableBlock(naslNode, refElement),
  },
  {
    title: '创建',
    image: createsvg,
    genBlock: (naslNode, refElement) => genCreateBlock(naslNode, refElement),
  },
];
