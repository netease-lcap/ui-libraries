// 定义一个函数类型

// 定义一个数组类型
export type DataSourceArrayType = any[] & {
  list: any[];
};
export type DataSourceFunctionType = (...args: any[]) => DataSourceArrayType;

type valueField = string;
type textField = string;
type childrenField = string;
type parentField = string;

// 定义一个包含函数类型和数组类型的对象类型

export type DataSourceType = DataSourceArrayType | DataSourceFunctionType;

export type DataSourceCollectionType = {
  valueField: valueField;
  textField: textField;
  dataSource: DataSourceType;
};
export type DataSourceTreeCollectionType = DataSourceType & {
  valueField: valueField;
  textField: textField;
  childrenField: childrenField;
  parentField: parentField;
  dataSource: DataSourceType;
};
