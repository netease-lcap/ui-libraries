import VueCompositionAPI from '@vue/composition-api';
import _ColorPickerPanel from './color-picker-panel';
import _ColorPicker from './color-picker';
import { withInstall } from '../utils/withInstall';
import { ElColorPickerProps } from './type';
import './style';

export * from './type';
export type ColorPickerProps = ElColorPickerProps;

export const ColorPickerPanel = withInstall(_ColorPickerPanel, VueCompositionAPI);
export const ColorPicker = withInstall(_ColorPicker, VueCompositionAPI);
