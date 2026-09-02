// 定义一个函数类型

// 定义一个数组类型
/** 数据源数组类型，包含列表数据 */
export type DataSourceArrayType = any[] & {
  /** 数据列表 */
  list?: any[];
  /** 总条数 */
  total?: number;
};
/** 数据源函数类型，返回数据源数组 */
export type DataSourceFunctionType = (...args: any[]) => Promise<DataSourceArrayType>;

/** 值字段名称 */
type valueField = string;
/** 文本字段名称 */
type textField = string;
/** 子节点字段名称 */
type childrenField = string;
/** 父节点字段名称 */
type parentField = string;

// 定义一个包含函数类型和数组类型的对象类型

/**
 * 数据源类型定义
 * @description 用于描述数据源的类型，可以是数组或函数
 * @example
 * ```typescript
 * const dataSource: DataSourceType = [1, 2, 3];
 * ```
 */
export type DataSourceType = DataSourceArrayType | DataSourceFunctionType;

/** 数据源集合类型 */
export type DataSourceCollectionType = {
  /** 值字段名称 */
  valueField: valueField;
  /** 文本字段名称 */
  textField: textField;
  /** 数据源 */
  dataSource: DataSourceType;
};
/** 树形数据源集合类型 */
export type DataSourceTreeCollectionType = DataSourceType & {
  /** 值字段名称 */
  valueField: valueField;
  /** 文本字段名称 */
  textField: textField;
  /** 子节点字段名称 */
  childrenField: childrenField;
  /** 父节点字段名称 */
  parentField: parentField;
  /** 数据源 */
  dataSource: DataSourceType;
};
