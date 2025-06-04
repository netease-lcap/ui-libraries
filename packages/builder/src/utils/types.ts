export interface ComponentMetaInfo {
  name: string;
  title?: string;
  show?: boolean;
  group?: string;
  icon?: string;
  tsPath: string;
  type?: string;
  sourceName?: string;
  kebabName?: string;
  children?: ComponentMetaInfo[];
}
