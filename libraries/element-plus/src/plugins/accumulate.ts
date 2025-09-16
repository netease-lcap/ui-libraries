import { PluginBase, DataSourceType } from '@/types';
/**
 * 插件类型定义
 * 支持两种形式的插件：函数形式和对象形式
 */

// 定义 Immutable Map 类型
type ImmutableMap<T> = {
  get<K extends keyof T>(key: K): T[K];
  set<K extends keyof T>(key: K, value: T[K]): ImmutableMap<T>;
  merge(other: Partial<T>): ImmutableMap<T>;
  toJS(): T;
  [Symbol.iterator](): Iterator<[keyof T, T[keyof T]]>;
};

// 定义插件函数类型，接受ImmutableMap参数并返回普通对象（会被merge到ImmutableMap中）
// 使用 const 泛型参数自动推导字面量类型
type PluginFunction<TProps, TReturn> = (props: ImmutableMap<TProps>) => TReturn;

// 定义插件对象类型，包含处理函数和其他元数据
// 使用 const 泛型参数自动推导字面量类型
type PluginObject<TProps, TReturn> = {
  handle: (props: ImmutableMap<TProps>) => TReturn;
  [key: string]: any; // 允许添加其他属性，如 name, version, metadata 等
};

// 定义插件类型，可以是函数或对象
type Plugin<TProps, TReturn> = PluginFunction<TProps, TReturn> | PluginObject<TProps, TReturn>;

// 类型函数：将 slot 开头的函数转换为 slots 对象
type ExtractSlots<T> = {
  [K in keyof T as K extends `slot${infer U}` ? Uncapitalize<U> : never]: T[K];
};

// 类型函数：将 Field 结尾的字段转换为 string 类型
type ConvertFieldsToString<T> = {
  [K in keyof T as K extends `${string}Field` ? K : never]: string;
};

// 类型函数：将 dataSource 字段转换为 DataSourceType 类型
type ConvertDataSourceToType<T> = {
  [K in keyof T as K extends 'dataSource' ? K : never]: DataSourceType;
};

type ConvertHrefAndToToType<T> = {
  [K in keyof T as K extends 'hrefAndTo' ? never : K]: T[K];
} & (T extends { hrefAndTo: any }
  ? {
      href: string;
      link: string;
      destination: string;
    }
  : object);

// 辅助类型：转换插件相关的类型
// 1. 将 slot 开头的函数转换为 slots 对象
// 2. 将 Field 结尾的字段转换为 string 类型
// 3. 将 dataSource 字段转换为 DataSourceType 类型
// 4. 将 hrefAndTo 字段展开为 href、link、destination 三个独立字段
// 添加第二个泛型参数用于排除指定类型中的所有 key 值
type ConvertPluginTypes<T> = {
  slots: ExtractSlots<T>;
} & ConvertFieldsToString<T> &
  ConvertDataSourceToType<T> &
  ConvertHrefAndToToType<T> &
  Omit<
    T,
    | keyof ExtractSlots<T>
    | keyof ConvertFieldsToString<T>
    | keyof ConvertDataSourceToType<T>
  >;

/**
 * 插件累加器类型
 * 支持链式调用，自动推导props类型并累加返回值类型
 * 累加返回类型是 immutable.js 的 Map 类型
 * 始终包含 PluginBase 类型
 * 自动转换插件相关类型：
 *   - 将 slot 开头的函数转换为 slots 对象
 *   - 将 Field 结尾的字段转换为 string 类型
 *   - 将 dataSource 字段转换为 DataSourceType 类型
 *   - 将 hrefAndTo 字段展开为 href、link、destination 三个独立字段
 *
 * @template TPluginOptions 插件选项类型，会自动转换插件相关类型
 * @template TPluginContext 插件上下文类型
 * @template TAccumulatedProps 当前累积的所有props类型
 */
export class PluginAccumulateTypes<
  TPluginOptions = object,
  TPluginContext = object,
  TAccumulatedProps = TPluginContext & ConvertPluginTypes<TPluginOptions> & PluginBase,
> {
  Plugin: Plugin<any, any>[] = [];

  /**
   * 添加插件（函数或对象形式）
   * 自动应用 as const 类型推导，无需手动添加 as const
   * @param plugin 插件函数或对象
   * @returns 新的插件累加器实例，包含累加后的类型
   */
  addPlugin<const TReturn extends Record<string, any>>(plugin: {
    handle: (props: ImmutableMap<TAccumulatedProps>, context: ImmutableMap<TPluginContext>) => TReturn;
    name: string;
    [key: string]: any;
  }): PluginAccumulateTypes<
    TPluginOptions,
    TPluginContext,
    TPluginContext & ConvertPluginTypes<TPluginOptions> & PluginBase & TReturn
  > {
    // 存储插件，使用 const 泛型参数来自动推导字面量类型
    this.Plugin.push(plugin as any);
    return this as any;
  }

  /**
   * 添加另一个 PluginAccumulateTypes 实例
   * 将其插件的累加值合并到当前实例中
   * @param other 另一个 PluginAccumulateTypes 实例
   * @returns 新的插件累加器实例，包含合并后的类型
   */
  addAccumulate<TOtherPluginOptions, TOtherContext, TOtherAccumulated>(
    other: PluginAccumulateTypes<TOtherPluginOptions, TOtherContext, TOtherAccumulated>,
  ): PluginAccumulateTypes<
    TPluginOptions,
    TOtherContext,
    PluginBase & ConvertPluginTypes<TPluginOptions> & TOtherAccumulated
  > {
    // 将另一个实例的所有插件添加到当前实例中
    this.Plugin.push(...other.Plugin);
    return this as any;
  }

  getPluginMethod() {
    return this.Plugin;
  }

  getPluginMethodByName(name: string) {
    return this.Plugin.find((plugin) => plugin.name === name);
  }

  /**
   * 获取当前累积的所有类型
   * 主要用于类型推导，实际实现返回空对象
   */
  // eslint-disable-next-line class-methods-use-this
  getAccumulatedTypes(): ImmutableMap<TAccumulatedProps> {
    return {} as any as ImmutableMap<TAccumulatedProps>;
  }
}
