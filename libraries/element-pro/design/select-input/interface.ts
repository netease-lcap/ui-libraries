import { ElSelectInputProps } from './type';

export interface SelectInputCommonProperties {
  status?: ElSelectInputProps['status'];
  tips?: ElSelectInputProps['tips'];
  clearable?: ElSelectInputProps['clearable'];
  disabled?: ElSelectInputProps['disabled'];
  label?: ElSelectInputProps['label'];
  placeholder?: ElSelectInputProps['placeholder'];
  readonly?: ElSelectInputProps['readonly'];
  suffix?: ElSelectInputProps['suffix'];
  suffixIcon?: ElSelectInputProps['suffixIcon'];
  onPaste?: ElSelectInputProps['onPaste'];
  onEnter?: ElSelectInputProps['onEnter'];
  onMouseenter?: ElSelectInputProps['onMouseenter'];
  onMouseleave?: ElSelectInputProps['onMouseleave'];
}
