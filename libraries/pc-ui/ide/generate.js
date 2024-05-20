import { genTableCurdBlock } from './blocks/genTableCurdBlock';
import { genTableBlock } from './blocks/genTableBlock';
import { genTableEditBlock } from './blocks/genTableEditBlock';
import { genGridViewCurdBlock } from './blocks/genGridViewCurdBlock';
import { genGridViewBlock } from './blocks/genGridViewBlock';
import { genGetBlock } from './blocks/genGetBlock';
import { genCreateBlock } from './blocks/genCreateBlock';
import { genUpdateBlock } from './blocks/genUpdateBlock';
import { genSelectBlock } from './blocks/genSelectBlock';
import curdsvg from './blocks/assets/curd.svg';
import tablesvg from './blocks/assets/table.svg';
import gridViewPng from './blocks/assets/grid-view.png';
import gridViewPng1 from './blocks/assets/grid-view1.png';
import detailsvg from './blocks/assets/detail.svg';
import createsvg from './blocks/assets/create.svg';
import selectsvg from './blocks/assets/select.svg';
import updatesvg from './blocks/assets/update.svg';
import edittablesvg from './blocks/assets/editTable.svg';

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
    title: '数据网格（全）',
    image: gridViewPng,
    genBlock: (naslNode, refElement) => genGridViewCurdBlock(naslNode, refElement),
  },
  {
    title: '数据网格（简）',
    image: gridViewPng1,
    genBlock: (naslNode, refElement) => genGridViewBlock(naslNode, refElement),
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
    title: '选择框',
    image: selectsvg,
    genBlock: (naslNode, refElement) => genSelectBlock(naslNode, refElement),
  },
  {
    title: '列表（双击编辑）',
    image: edittablesvg,
    genBlock: (naslNode, refElement) => genTableEditBlock(naslNode, refElement),
  },
];
