import { genListViewBlock } from './genListViewBlock';
import { genGridViewBlock } from './genGridViewBlock';
import { genGetBlock } from './genGetBlock';
import { genCreateBlock } from './genCreateBlock';
import { genUpdateBlock } from './genUpdateBlock';
import { genSelectBlock } from './genSelectBlock';
import gridViewPng from './assets/grid.png';
import detailpng from './assets/detail.png';
import createpng from './assets/create.png';
import selectpng from './assets/select.png';
import updatepng from './assets/update.png';
import listpng from './assets/list.png';

export default [
  {
    title: '列表',
    image: listpng,
    genBlock: (naslNode, refElement) => genListViewBlock(naslNode, refElement),
  },
  {
    title: '网格',
    image: gridViewPng,
    genBlock: (naslNode, refElement) => genGridViewBlock(naslNode, refElement),
  },
  {
    title: '详情',
    image: detailpng,
    genBlock: (naslNode, refElement) => genGetBlock(naslNode, refElement),
  },
  {
    title: '创建',
    image: createpng,
    genBlock: (naslNode, refElement) => genCreateBlock(naslNode, refElement),
  },
  {
    title: '修改',
    image: updatepng,
    genBlock: (naslNode, refElement) => genUpdateBlock(naslNode, refElement),
  },
  {
    title: '选择框',
    image: selectpng,
    genBlock: (naslNode, refElement) => genSelectBlock(naslNode, refElement),
  },
];
