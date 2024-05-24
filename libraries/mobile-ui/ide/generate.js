import { genListViewBlock } from './blocks/genListViewBlock';
import { genGridViewBlock } from './blocks/genGridViewBlock';
import { genGetBlock } from './blocks/genGetBlock';
import { genCreateBlock } from './blocks/genCreateBlock';
import { genUpdateBlock } from './blocks/genUpdateBlock';
import { genSelectBlock } from './blocks/genSelectBlock';
import gridViewPng from './blocks/assets/grid.png';
import detailpng from './blocks/assets/detail.png';
import createpng from './blocks/assets/create.png';
import selectpng from './blocks/assets/select.png';
import updatepng from './blocks/assets/update.png';
import listpng from './blocks/assets/list.png';

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
