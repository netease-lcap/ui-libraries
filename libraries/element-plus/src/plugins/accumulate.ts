import { Map as imMap } from 'immutable';
import { PluginBase } from '@/types';

import { $deletePropsList } from '@/plugins/constants';
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

// 辅助类型：将 slot 函数转换为 slots 对象，并将 Field 结尾的字段转换为 string
// 添加第二个泛型参数用于排除指定类型中的所有 key 值
type ConvertSlotsToObject<T, TExclude = never> = {
  slots: ExtractSlots<T>;
} & ConvertFieldsToString<T> &
  Omit<T, keyof ExtractSlots<T> | keyof ConvertFieldsToString<T> | keyof TExclude>;

/**
 * 插件累加器类型
 * 支持链式调用，自动推导props类型并累加返回值类型
 * 累加返回类型是 immutable.js 的 Map 类型
 * 始终包含 PluginBase 类型
 * 自动将 slot 开头的函数转换为 slots 对象
 *
 * @template TInitial 初始值类型，会与 PluginBase 合并
 * @template TSecond 第二个泛型参数，会与 TInitial 交叉，并自动转换 slot 函数和 Field 字段
 * @template TAccumulatedProps 当前累积的所有props类型
 */
export class PluginAccumulateTypes<
  TInitial = Record<string, never>,
  TSecond = Record<string, never>,
  TPluginContext = TInitial,
  TAccumulatedProps = TPluginContext & ConvertSlotsToObject<TSecond, TInitial> & TInitial & PluginBase,
> {
  Plugin: Plugin<any, any>[] = [];

  /**
   * 添加插件（函数或对象形式）
   * 自动应用 as const 类型推导，无需手动添加 as const
   * @param plugin 插件函数或对象
   * @returns 新的插件累加器实例，包含累加后的类型
   */
  addPlugin<const TReturn extends Record<string, any>>(
    plugin:
      | ((props: ImmutableMap<TAccumulatedProps>, context: ImmutableMap<TPluginContext>) => TReturn)
      | {
          handle: (props: ImmutableMap<TAccumulatedProps>, context: ImmutableMap<TPluginContext>) => TReturn;
          [key: string]: any;
        },
  ): PluginAccumulateTypes<
    TInitial,
    TSecond,
    TPluginContext,
    TPluginContext & ConvertSlotsToObject<TSecond, TInitial> & TInitial & TReturn & PluginBase
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
  addAccumulate<TOtherInitial, TOtherSecond, TOtherContext, TOtherAccumulated>(
    other: PluginAccumulateTypes<TOtherInitial, TOtherSecond, TOtherContext, TOtherAccumulated>,
  ): PluginAccumulateTypes<
    TInitial,
    TSecond,
    TOtherContext,
    PluginBase & TInitial & ConvertSlotsToObject<TSecond, TInitial> & TOtherAccumulated
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

  /**
   * 执行所有插件，返回最终的 Immutable Map
   * @param initialProps 初始props，必须包含 PluginBase 的所有属性
   * @returns 执行所有插件后的最终 Immutable Map
   */
  execute(initialProps: PluginBase & TInitial & ConvertSlotsToObject<TSecond>): ImmutableMap<TAccumulatedProps> {
    // 首先将初始值转换为 Immutable Map
    let result = imMap(initialProps as any) as any as ImmutableMap<TAccumulatedProps>;

    // 遍历所有插件，将每个插件的返回值 merge 到 Immutable Map 中
    this.Plugin.forEach((plugin) => {
      // 插件接收 ImmutableMap 作为参数
      const pluginResult = typeof plugin === 'function' ? plugin(result as any) : plugin.handle(result as any);

      // 将插件返回的普通对象 merge 到 Immutable Map 中
      // 使用 as const 确保插件返回值的类型精确性
      result = result.merge(pluginResult as any) as any as ImmutableMap<TAccumulatedProps>;
    });

    return result;
  }
}

// 使用示例
/* eslint-disable @typescript-eslint/no-unused-vars */
// 1. 使用默认类型（只包含 PluginBase）
const pluginAccumulateTypes = new PluginAccumulateTypes();
const a = pluginAccumulateTypes
  .addPlugin((props) => {
    // props 的类型是 ImmutableMap<PluginBase>，可以直接使用 get 方法访问 PluginBase 的属性
    const refValue = props.get('ref');
    const slotsValue = props.get('slots');
    const emitValue = props.get('emit');
    return {
      b: 1,
      computedValue: 'computed',
    };
  })
  .addPlugin((props) => {
    const b = props.get('b');
    return {
      c: 2,
      processedValue: `processed-${b}`,
    };
  });

// 2. 使用双泛型（第一个泛型不转换，第二个泛型会转换 slot 函数和 Field 字段）
type InitialProps = {
  customValue: string;
  customNumber: number;
  // 这些属性不会被转换
  normalFunction: () => void;
  normalField: string;
};

type SecondProps = {
  // slot 函数会自动转换为 slots 对象
  slotDefault: () => any[];
  slotContent: (data: any) => any[];
  slotHeader: () => any[];
  // Field 结尾的字段会自动转换为 string 类型
  hrefField: (item: any) => string;
  titleField: (item: any) => number;
  idField: (item: any) => boolean;
};

// 转换后的类型示例
type ConvertedSecondProps = ConvertSlotsToObject<SecondProps>;
// 结果：
// {
//   slots: {
//     default: () => any[];
//     content: (data: any) => any[];
//     header: () => any[];
//   };
//   hrefField: string;  // 从 (item: any) => string 转换为 string
//   titleField: string; // 从 (item: any) => number 转换为 string
//   idField: string;    // 从 (item: any) => boolean 转换为 string
// }

// 最终类型：PluginBase & InitialProps & ConvertedSecondProps
// 即：PluginBase & InitialProps & { slots: {...}, hrefField: string, ... }

const customPluginAccumulateTypes = new PluginAccumulateTypes<InitialProps, SecondProps>();
const customA = customPluginAccumulateTypes.addPlugin((props) => {
  // props 的类型是 ImmutableMap<PluginBase & InitialProps & ConvertSlotsToObject<SecondProps>>
  // 可以访问 PluginBase 的属性、第一个泛型的属性（不转换）以及第二个泛型转换后的属性
  const refValue = props.get('ref');
  const customValue = props.get('customValue'); // 来自 InitialProps，保持原类型
  const customNumber = props.get('customNumber'); // 来自 InitialProps，保持原类型
  const normalFunction = props.get('normalFunction'); // 来自 InitialProps，保持原类型 () => void
  const normalField = props.get('normalField'); // 来自 InitialProps，保持原类型 string
  // 访问转换后的 slots 对象（来自 SecondProps 转换）
  const slots = props.get('slots'); // 类型为 { default: () => any[]; content: (data: any) => any[]; header: () => any[]; }
  // 访问转换后的 Field 字段（来自 SecondProps 转换，现在是 string 类型）
  const hrefField = props.get('hrefField'); // 类型为 string，不再是函数
  const titleField = props.get('titleField'); // 类型为 string
  return {
    processedValue: `${customValue}-${customNumber}`,
  };
});

// 3. 使用 addAccumulate 方法合并两个插件累加器
type AnotherInitialProps = {
  anotherValue: string;
  anotherNumber: number;
};

type AnotherSecondProps = {
  slotAnother: () => any[];
  anotherField: (item: any) => string;
};

const anotherPluginAccumulate = new PluginAccumulateTypes<AnotherInitialProps, AnotherSecondProps>().addPlugin(
  (props) => {
    const anotherValue = props.get('anotherValue'); // 来自 AnotherInitialProps
    const anotherNumber = props.get('anotherNumber'); // 来自 AnotherInitialProps
    const anotherField = props.get('anotherField'); // 来自 AnotherSecondProps 转换，类型为 string
    return {
      processedAnother: `${anotherValue}-${anotherNumber}`,
      status: 'active',
    } as const;
  },
);

// 合并两个插件累加器
const combined = customPluginAccumulateTypes.addAccumulate(anotherPluginAccumulate).addPlugin((props) => {
  // props 现在包含所有之前插件的累加类型
  // 类型是 ImmutableMap<PluginBase & InitialProps & ConvertSlotsToObject<SecondProps> & { processedAnother: string; status: 'active' }>
  const customValue = props.get('customValue');
  const processedAnother = props.get('processedAnother');
  const status = props.get('status');
  return {
    final: 'combined',
    result: `${customValue}-${processedAnother}-${status}`,
  } as const;
});

// 执行插件，返回 Immutable Map
// 注意：execute 方法期望的是 PluginBase & InitialProps & ConvertSlotsToObject<SecondProps> 类型
// 第一个泛型保持原类型，第二个泛型会被转换
const result = customA.execute({
  // 必须提供 PluginBase 的所有属性
  ref: { ref: () => {} },
  emit: () => {},
  provide: {},
  inject: {},
  render: () => null as any,
  [$deletePropsList]: [],
  // InitialProps 的属性（保持原类型）
  customValue: 'test',
  customNumber: 42,
  normalFunction: () => {},
  normalField: 'normal',
  // SecondProps 转换后的属性
  slots: { default: () => [] },
  hrefField: 'href',
  titleField: 'title',
  idField: 'id',
} as any); // 使用 as any 来简化示例

// result 的类型是 ImmutableMap<PluginBase & InitialProps & ConvertSlotsToObject<SecondProps> & { processedValue: string }>
// 所有插件的返回值都通过 merge 方法合并到 Immutable Map 中
// 统一使用 get 方法获取值，不再混合使用对象和 ImmutableMap
// 可以访问 PluginBase 的所有属性、第一个泛型的属性（不转换）、第二个泛型转换后的属性以及插件的返回值
const processedValue = result.get('processedValue'); // 类型安全，值为 "test-42"
const refValue = result.get('ref'); // 类型安全，来自 PluginBase
const customValue = result.get('customValue'); // 类型安全，来自 InitialProps
const normalFunction = result.get('normalFunction'); // 类型安全，来自 InitialProps，保持原类型
const slots = result.get('slots'); // 类型安全，来自 SecondProps 转换
const hrefField = result.get('hrefField'); // 类型安全，来自 SecondProps 转换，类型为 string
const merged = result.merge({ customNumber: 100 }); // 返回新的 Immutable Map
/* eslint-enable @typescript-eslint/no-unused-vars */
