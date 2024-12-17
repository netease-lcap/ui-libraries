export interface ComponentMetaInfo {
  name: string;
  title?: string;
  show?: boolean;
  group?: string;
  icon?: string;
  tsPath: string;
  children?: ComponentMetaInfo[];
}
