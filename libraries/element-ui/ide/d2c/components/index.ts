import { ComponentCodeGen } from '../common';
import { codeGen as breadcrumbCodeGen } from './breadcrumb';
import { codeGen as datePickerCodeGen } from './datePicker';
import { codeGen as listViewCodeGen } from './listView';
import { codeGen as radioCodeGen } from './radio';
import { codeGen as sliderCodeGen } from './slider';
import { codeGen as textAreaCodeGen } from './textArea';
import { codeGen as buttonCodeGen } from './button';
import { codeGen as dragUploadCodeGen } from './dragUpload';
import { codeGen as multiSelectCodeGen } from './multiSelect';
import { codeGen as ratingCodeGen } from './rating';
import { codeGen as cardUploadCodeGen } from './cardUpload';
import { codeGen as gridViewCodeGen } from './gridView';
import { codeGen as numberInputCodeGen } from './numberInput';
import { codeGen as searchInputCodeGen } from './searchInput';
import { codeGen as stepCodeGen } from './step';
import { codeGen as textInputCodeGen } from './textInput';
import { codeGen as carouselCodeGen } from './carousel';
import { codeGen as paginationCodeGen } from './pagination';
import { codeGen as switchCodeGen } from './switch';
import { codeGen as timePickerCodeGen } from './timePicker';
import { codeGen as checkboxCodeGen } from './checkbox';
import { codeGen as linkCodeGen } from './link';
import { codeGen as selectCodeGen } from './select';
import { codeGen as tableCodeGen } from './table';
import { codeGen as uploadButtonCodeGen } from './uploadButton';
import { codeGen as tabsCodeGen } from './tabs';
import {
  codeGen as passwordInputCodeGen,
} from './passwordInput';
import { codeGen as capsulesCodeGen } from './capsules';

export const compCodeGenList: ComponentCodeGen[] = [
  breadcrumbCodeGen,
  datePickerCodeGen,
  listViewCodeGen,
  radioCodeGen,
  sliderCodeGen,
  textAreaCodeGen,
  buttonCodeGen,
  dragUploadCodeGen,
  multiSelectCodeGen,
  ratingCodeGen,
  cardUploadCodeGen,
  gridViewCodeGen,
  numberInputCodeGen,
  searchInputCodeGen,
  stepCodeGen,
  textInputCodeGen,
  carouselCodeGen,
  paginationCodeGen,
  switchCodeGen,
  timePickerCodeGen,
  checkboxCodeGen,
  linkCodeGen,
  selectCodeGen,
  tableCodeGen,
  uploadButtonCodeGen,
  tabsCodeGen,
  capsulesCodeGen,
  passwordInputCodeGen,
];
