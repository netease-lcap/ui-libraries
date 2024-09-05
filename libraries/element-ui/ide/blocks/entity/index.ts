import { genTableCurdBlock } from './genTableCurdBlock';
import { genTableBlock } from './genTableBlock';
import { genGetBlock } from './genGetBlock';
import { genCreateBlock } from './genCreateBlock';
import { genUpdateBlock } from './genUpdateBlock';
import { genSelectBlock } from './genSelectBlock';
import curdsvg from './assets/curd.svg';
import tablesvg from './assets/table.svg';
import detailsvg from './assets/detail.svg';
import createsvg from './assets/create.svg';
import selectsvg from './assets/select.svg';
import updatesvg from './assets/update.svg';

export default [
  {
    title: '列表（全）',
    image: curdsvg,
    genBlock: (naslNode, refElement) => genTableCurdBlock(naslNode, refElement),
  },
  {
    title: '列表（简）',
    image: tablesvg,
    genBlock: (naslNode, refElement) => genTableBlock(naslNode, refElement),
  },
  {
    title: '详情',
    image: detailsvg,
    genBlock: (naslNode, refElement) => genGetBlock(naslNode, refElement),
  },
  {
    title: '创建',
    image: createsvg,
    genBlock: (naslNode, refElement) => genCreateBlock(naslNode, refElement),
  },
  {
    title: '修改',
    image: updatesvg,
    genBlock: (naslNode, refElement) => genUpdateBlock(naslNode, refElement),
  },
  {
    title: '选择器',
    image: selectsvg,
    genBlock: (naslNode, refElement) => genSelectBlock(naslNode, refElement),
  },
];
