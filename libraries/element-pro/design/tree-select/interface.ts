import { ElTreeSelectProps } from './type';

export type TreeSelectProps = ElTreeSelectProps;

export * from './type';
export interface RemoveOptions<DataOption> {
  value: string | number;
  data: DataOption;
  e: MouseEvent;
}

export interface NodeOptions {
  label: string;
  value: string | number;
}
