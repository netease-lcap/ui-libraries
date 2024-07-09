import { genTableCurdBlock } from './genTableCurdBlock';
import { genTableBlock } from './genTableBlock';
import { genTableEditBlock } from './genTableEditBlock';
import { genGridViewCurdBlock } from './genGridViewCurdBlock';
import { genGridViewBlock } from './genGridViewBlock';
import { genGetBlock } from './genGetBlock';
import { genCreateBlock } from './genCreateBlock';
import { genUpdateBlock } from './genUpdateBlock';
import { genSelectBlock } from './genSelectBlock';
import curdsvg from './assets/curd.svg';
import tablesvg from './assets/table.svg';
import gridViewPng from './assets/grid-view.png';
import gridViewPng1 from './assets/grid-view1.png';
import detailsvg from './assets/detail.svg';
import createsvg from './assets/create.svg';
import selectsvg from './assets/select.svg';
import updatesvg from './assets/update.svg';
import edittablesvg from './assets/editTable.svg';

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
    title: '选择器',
    image: selectsvg,
    genBlock: (naslNode, refElement) => genSelectBlock(naslNode, refElement),
  },
  {
    title: '列表（双击编辑）',
    image: edittablesvg,
    genBlock: (naslNode, refElement) => genTableEditBlock(naslNode, refElement),
  },
];
