import { ColorObject, ColorPickerChangeTrigger } from './type';

// color modes
export type ElColorModes = 'monochrome' | 'linear-gradient';

// color context
export interface ElColorContext {
  color: ColorObject;
  trigger: ColorPickerChangeTrigger;
}

export type ElColorHandler = (...args: any) => void;
