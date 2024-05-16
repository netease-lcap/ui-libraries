import { genCurdTableBlock } from './blocks/genCurdTable';
import { genCreateBlock } from './blocks/genCreateBlock';
import { genGetBlock } from './blocks/genGetBlock';
import { genTableBlock } from './blocks/genTableBlock';
import curdsvg from './blocks/assets/curd.svg';
import tablesvg from './blocks/assets/table.svg';
import createsvg from './blocks/assets/create.svg';
import detailsvg from './blocks/assets/detail.svg';

export default [
  {
    title: '列表（全）',
    image: curdsvg,
    genBlock: (naslNode, refElement) => genCurdTableBlock(naslNode, refElement),
  },
  {
    title: '列表（简）',
    image: tablesvg,
    genBlock: (naslNode, refElement) => genTableBlock(naslNode, refElement),
  },
  {
    title: '创建',
    image: createsvg,
    genBlock: (naslNode, refElement) => genCreateBlock(naslNode, refElement),
  },
  {
    title: '详情',
    image: detailsvg,
    genBlock: (naslNode, refElement) => genGetBlock(naslNode, refElement),
  },
];
