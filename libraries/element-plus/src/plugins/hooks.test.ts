import { describe, expect, it, vi, beforeEach } from 'vitest';
import { ref, onMounted, onUnmounted, getCurrentInstance } from 'vue';
import {
  fiberNode,
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
  useControllableValue,
  scheduler,
  createAccumulateTypes,
  createPluginAccumulateTypes,
} from './hooks';

// Mock Vue 相关函数
vi.mock('vue', () => ({
  ref: vi.fn((val) => ({ value: val })),
  onMounted: vi.fn((fn) => fn()),
  onUnmounted: vi.fn((fn) => fn()),
  getCurrentInstance: vi.fn(() => ({
    vnode: {
      props: {},
    },
  })),
}));

describe('hooks.ts', () => {
  beforeEach(() => {
    // 重置所有 mock
    vi.clearAllMocks();
    // 重置 fiberNode 状态
    fiberNode.setCurrentFiber(
      {
        workInProgressState: null,
        workInProgressEffect: null,
        updateQueen: new Set(),
        getState: () => ({ state: {} }),
        setValue: vi.fn(),
        storeKey: null,
        queen: [],
      },
      true,
    );
  });

  describe('useState', () => {
    it('应该在首次挂载时正确初始化状态', () => {
      const [state, setState] = useState('initial');
      expect(state).toBe('initial');
      expect(typeof setState).toBe('function');
    });

    it('应该正确处理状态更新', () => {
      const [, setState] = useState('initial');
      setState('updated');

      const fiber = fiberNode.getCurrentFiber();
      expect(fiber.updateQueen.size).toBe(1);
      // 由于使用了 _.defer，我们需要使用 flush-promises
      return new Promise((resolve) => {
        setTimeout(() => {
          expect(fiber.updateQueen.size).toBe(0);
          resolve(null);
        }, 0);
      });
    });

    it('应该支持函数式更新', () => {
      const [, setState] = useState({ count: 0 });
      setState((prev) => {
        return { count: prev.count + 1 };
      });

      const fiber = fiberNode.getCurrentFiber();
      expect(fiber.updateQueen.size).toBe(1);
      return new Promise((resolve) => {
        setTimeout(() => {
          expect(fiber.updateQueen.size).toBe(0);
          resolve(null);
        }, 0);
      });
    });

    it('应该正确处理对象状态', () => {
      const [state] = useState({ name: 'test', age: 25 });
      expect(state).toEqual({ name: 'test', age: 25 });
    });

    it('应该正确处理原始类型状态', () => {
      const [numberState] = useState(42);
      const [booleanState] = useState(true);
      const [nullState] = useState(null);
      const [undefinedState] = useState(undefined);

      expect(numberState).toBe(42);
      expect(booleanState).toBe(true);
      expect(nullState).toBe(null);
      expect(undefinedState).toBe(undefined);
    });

    it('应该在非挂载状态下正确获取已设置的值', () => {
      // 第一次挂载
      const [, setState1] = useState('initial');
      setState1('updated');

      // 模拟非挂载状态
      fiberNode.setCurrentFiber(fiberNode.getCurrentFiber(), false);
      // 模拟设置了状态
      const currentFiber = fiberNode.getCurrentFiber();
      const hook = currentFiber.workInProgressState.next;
      (hook as any).isSetValue = true;
      currentFiber.getState = () => ({ state: { [hook.storeKey]: 'retrieved' } });

      const [state2] = useState('fallback');
      expect(state2).toBe('retrieved');
    });

    it('应该在非挂载状态下未设置值时使用初始值', () => {
      // 先调用useState创建hook链表
      useState('initial');

      fiberNode.setCurrentFiber(fiberNode.getCurrentFiber(), false);
      const [state] = useState('fallback');
      expect(state).toBe('fallback');
    });
  });

  describe('useRef', () => {
    it('应该正确创建和维护 ref', () => {
      const testRef = useRef('test');
      expect(testRef.value).toBe('test');
      expect(ref).toHaveBeenCalledWith('test');
    });

    it('应该在重新渲染时保持相同的引用', () => {
      const firstRef = useRef('test');
      fiberNode.setCurrentFiber(fiberNode.getCurrentFiber(), false);
      const secondRef = useRef('test');
      expect(firstRef).toBe(secondRef);
    });

    it('应该正确处理有现有 workInProgressState 的链表插入', () => {
      // 先创建一个ref，建立workInProgressState链表
      const firstRef = useRef('first');

      // 再创建第二个ref，这将触发链表插入逻辑（132-134行）
      const secondRef = useRef('second');

      expect(firstRef.value).toBe('first');
      expect(secondRef.value).toBe('second');
      expect(ref).toHaveBeenCalledTimes(2);
    });
  });

  describe('useEffect', () => {
    it('应该在挂载时执行回调', () => {
      const callback = vi.fn();
      useEffect(callback, []);
      expect(onMounted).toHaveBeenCalled();
      expect(callback).toHaveBeenCalled();
    });

    it('应该在依赖项变化时执行回调', () => {
      const callback = vi.fn();
      const dep = ['dep1'];
      useEffect(callback, dep);

      // 模拟更新
      fiberNode.setCurrentFiber(fiberNode.getCurrentFiber(), false);
      const newDep = ['dep2'];
      useEffect(callback, newDep);

      expect(callback).toHaveBeenCalledTimes(2);
    });

    it('应该正确处理清理函数', () => {
      const cleanup = vi.fn();
      const callback = vi.fn(() => cleanup);
      useEffect(callback, []);

      expect(onUnmounted).toHaveBeenCalled();
      const unmountCallback = vi.mocked(onUnmounted).mock.calls[0][0];
      unmountCallback();
      expect(cleanup).toHaveBeenCalled();
    });

    it('应该清理函数返回非函数', () => {
      const callback = vi.fn(() => 1234);
      useEffect(callback, []);

      expect(onUnmounted).toHaveBeenCalled();
      const unmountCallback = vi.mocked(onUnmounted).mock.calls[0][0];
      unmountCallback();
      expect(true).toBeTruthy();
    });

    it('应该在依赖项相同时不重新执行', () => {
      const callback = vi.fn();
      const dep = ['same'];
      useEffect(callback, dep);

      // 模拟更新，但依赖项相同
      fiberNode.setCurrentFiber(fiberNode.getCurrentFiber(), false);
      useEffect(callback, dep);

      expect(callback).toHaveBeenCalledTimes(1);
    });

    it('应该正确处理空依赖项数组', () => {
      const callback = vi.fn();
      useEffect(callback, []);

      // 模拟更新
      fiberNode.setCurrentFiber(fiberNode.getCurrentFiber(), false);
      useEffect(callback, []);

      // 空依赖项应该只执行一次
      expect(callback).toHaveBeenCalledTimes(1);
    });

    it('应该正确处理非函数清理返回值', () => {
      const callback = vi.fn(() => 'not a function');
      useEffect(callback, []);

      expect(onUnmounted).toHaveBeenCalled();
      const unmountCallback = vi.mocked(onUnmounted).mock.calls[0][0];
      expect(() => unmountCallback()).not.toThrow();
    });

    it('应该正确处理复杂依赖项比较', () => {
      const callback = vi.fn();
      const complexDep = [{ id: 1 }, [1, 2, 3]];
      useEffect(callback, complexDep);

      // 模拟更新，依赖项内容相同但引用不同
      fiberNode.setCurrentFiber(fiberNode.getCurrentFiber(), false);
      const newComplexDep = [{ id: 1 }, [1, 2, 3]];
      useEffect(callback, newComplexDep);

      // 使用 Object.is 比较，引用不同应该重新执行
      expect(callback).toHaveBeenCalledTimes(2);
    });

    it('应该正确处理多个effect的链表结构', () => {
      const callback1 = vi.fn();
      const callback2 = vi.fn();

      // 创建第一个effect
      useEffect(callback1, ['dep1']);

      // 创建第二个effect，这将测试链表操作
      useEffect(callback2, ['dep2']);

      expect(callback1).toHaveBeenCalled();
      expect(callback2).toHaveBeenCalled();
    });

    it('应该正确处理依赖项变化时回调返回非函数值', () => {
      const callback = vi.fn(() => 'not a function');
      const dep = ['dep1'];
      useEffect(callback, dep);

      // 模拟更新，依赖项变化
      fiberNode.setCurrentFiber(fiberNode.getCurrentFiber(), false);
      const newDep = ['dep2'];
      useEffect(callback, newDep);

      expect(callback).toHaveBeenCalledTimes(2);
    });

    it('应该正确处理依赖项变化时回调返回非函数值的情况', () => {
      const callback = vi.fn(() => 123); // 返回数字而不是函数
      const dep = ['dep1'];
      useEffect(callback, dep);

      // 模拟更新，依赖项变化，确保触发172行的条件
      fiberNode.setCurrentFiber(fiberNode.getCurrentFiber(), false);
      const newDep = ['dep2'];
      useEffect(callback, newDep);

      expect(callback).toHaveBeenCalledTimes(2);
    });

    it('应该正确处理useEffect在非挂载状态下依赖项变化且回调返回非函数', () => {
      // 先创建一个effect
      const callback1 = vi.fn(() => 'cleanup');
      useEffect(callback1, ['dep1']);

      // 模拟非挂载状态
      fiberNode.setCurrentFiber(fiberNode.getCurrentFiber(), false);

      // 创建另一个effect，依赖项不同，且返回非函数值
      const callback2 = vi.fn(() => 456); // 返回数字
      useEffect(callback2, ['dep2']);

      expect(callback2).toHaveBeenCalledTimes(1);
    });

    it('应该覆盖useEffect中172行的非函数返回值处理', () => {
      // 创建一个effect，返回非函数值
      const callback = vi.fn(() => 999); // 返回数字
      useEffect(callback, ['dep1']);

      // 模拟非挂载状态，依赖项变化
      fiberNode.setCurrentFiber(fiberNode.getCurrentFiber(), false);
      useEffect(callback, ['dep2']); // 不同的依赖项

      expect(callback).toHaveBeenCalledTimes(2);
    });
  });

  describe('useMemo', () => {
    it('应该在首次渲染时计算值', () => {
      const callback = vi.fn(() => 'computed');
      const result = useMemo(callback, []);
      expect(result).toBe('computed');
      expect(callback).toHaveBeenCalledTimes(1);
    });

    it('应该在依赖项变化时重新计算', () => {
      const callback = vi.fn((dep) => dep);
      const dep = ['dep1'];
      const result1 = useMemo(() => callback(dep[0]), dep);

      // 模拟更新
      fiberNode.setCurrentFiber(fiberNode.getCurrentFiber(), false);
      const newDep = ['dep2'];
      const result2 = useMemo(() => callback(newDep[0]), newDep);

      expect(callback).toHaveBeenCalledTimes(2);
      expect(result1).toBe('dep1');
      expect(result2).toBe('dep2');
    });

    it('不应该在依赖项相同时重新计算', () => {
      const callback = vi.fn(() => 'computed');
      const dep = ['dep'];
      useMemo(callback, dep);

      // 模拟更新，但依赖项相同
      fiberNode.setCurrentFiber(fiberNode.getCurrentFiber(), false);
      useMemo(callback, dep);

      expect(callback).toHaveBeenCalledTimes(1);
    });

    it('应该正确处理多个memo的链表结构', () => {
      const callback1 = vi.fn(() => 'value1');
      const callback2 = vi.fn(() => 'value2');

      // 创建第一个memo
      const result1 = useMemo(callback1, ['dep1']);

      // 创建第二个memo，这将测试链表操作
      const result2 = useMemo(callback2, ['dep2']);

      expect(result1).toBe('value1');
      expect(result2).toBe('value2');
      expect(callback1).toHaveBeenCalled();
      expect(callback2).toHaveBeenCalled();
    });
  });

  describe('useCallback', () => {
    it('应该返回相同的函数引用当依赖项不变', () => {
      const callback = () => {};
      const dep = ['dep'];
      const result1 = useCallback(callback, dep);

      // 模拟更新
      fiberNode.setCurrentFiber(fiberNode.getCurrentFiber(), false);
      const result2 = useCallback(callback, dep);

      expect(result1).toBe(result2);
    });

    it('应该返回新的函数引用当依赖项变化', () => {
      const dep1 = ['dep1'];
      const result1 = useCallback(() => {}, dep1);
      // 模拟更新，改变依赖项
      fiberNode.setCurrentFiber(fiberNode.getCurrentFiber(), false);
      const dep2 = ['dep2'];
      const result2 = useCallback(() => {}, dep2);

      expect(result1).not.toBe(result2);
    });

    it('应该正确处理多个callback的链表结构', () => {
      const fn1 = () => 'fn1';
      const fn2 = () => 'fn2';

      // 创建第一个callback
      const result1 = useCallback(fn1, ['dep1']);

      // 创建第二个callback，这将测试链表操作
      const result2 = useCallback(fn2, ['dep2']);

      expect(result1).toBe(fn1);
      expect(result2).toBe(fn2);
    });
  });

  describe('useControllableValue', () => {
    it('应该处理非受控模式', () => {
      const props = new Map([
        ['defaultValue', 'uncontrolled'],
        ['emit', vi.fn()],
      ] as any);
      const [value, onChange] = useControllableValue(props);

      expect(value).toBe('uncontrolled');

      onChange('new value');
      expect(props.get('emit')).not.toHaveBeenCalled();
    });

    it('应该处理受控模式', () => {
      // 重新 mock getCurrentInstance 为这个测试用例返回特定的值
      const mockGetCurrentInstance = vi.fn(() => ({
        vnode: {
          props: {
            modelValue: 'controlled', // 这里可以修改返回值
          },
        },
      }));

      // 临时替换全局的 getCurrentInstance mock
      vi.mocked(getCurrentInstance).mockImplementation(mockGetCurrentInstance as any);
      const props = new Map([
        ['modelValue', 'controlled'],
        ['emit', vi.fn()],
      ] as any);
      const [value, onChange] = useControllableValue(props);

      expect(value).toBe('controlled');

      onChange('new value');
      expect(props.get('emit')).toHaveBeenCalled();

      // 验证 getCurrentInstance 被调用
      expect(mockGetCurrentInstance).toHaveBeenCalled();
    });
  });

  describe('scheduler', () => {
    it('应该正确调度插件钩子', () => {
      const pluginHook = vi.fn(() => ({ test: 'result' }));
      const immutableProps = { merge: vi.fn() };
      const fiberMap = new Map([
        ['updateQueen', new Set()],
        ['getState', () => ({ setValue: vi.fn() })],
      ] as any);

      scheduler([pluginHook], immutableProps, immutableProps, fiberMap);

      expect(pluginHook).toHaveBeenCalled();
      expect(immutableProps.merge).toHaveBeenCalledWith({ test: 'result' });
    });

    it('应该正确处理多个插件钩子', () => {
      const hook1 = vi.fn(() => ({ prop1: 'value1' }));
      const hook2 = vi.fn(() => ({ prop2: 'value2' }));
      const immutableProps = { merge: vi.fn((result) => ({ ...immutableProps, ...result })) };
      const fiberMap = new Map([
        ['updateQueen', new Set()],
        ['getState', () => ({ setValue: vi.fn() })],
      ] as any);

      scheduler([hook1, hook2], immutableProps, immutableProps, fiberMap);

      expect(hook1).toHaveBeenCalled();
      expect(hook2).toHaveBeenCalled();
      expect(immutableProps.merge).toHaveBeenCalledTimes(2);
    });

    it('应该正确处理已存在的fiber', () => {
      const pluginHook = vi.fn(() => ({ test: 'result' }));
      const immutableProps = { merge: vi.fn() };
      const existingFiber = {
        workInProgressState: null,
        workInProgressEffect: null,
        updateQueen: new Set(),
        getState: () => ({ setValue: vi.fn() }),
        setValue: vi.fn(),
        storeKey: 'existing',
      };
      const fiberMap = new Map([
        ['updateQueen', new Set()],
        ['getState', () => ({ setValue: vi.fn() })],
        [pluginHook, existingFiber],
      ] as any);

      scheduler([pluginHook], immutableProps, immutableProps, fiberMap);

      expect(pluginHook).toHaveBeenCalled();
      expect(fiberMap.get(pluginHook)).toBe(existingFiber);
    });

    it('应该正确处理空钩子数组', () => {
      const immutableProps = { merge: vi.fn() };
      const fiberMap = new Map([
        ['updateQueen', new Set()],
        ['getState', () => ({ setValue: vi.fn() })],
      ] as any);

      const result = scheduler([], immutableProps, immutableProps, fiberMap);

      expect(result).toBe(immutableProps);
      expect(immutableProps.merge).not.toHaveBeenCalled();
    });

    it('应该正确处理undefined钩子数组', () => {
      const immutableProps = { merge: vi.fn() };
      const fiberMap = new Map([
        ['updateQueen', new Set()],
        ['getState', () => ({ setValue: vi.fn() })],
      ] as any);

      const result = scheduler(undefined, immutableProps, immutableProps, fiberMap);

      expect(result).toBeUndefined();
      expect(immutableProps.merge).not.toHaveBeenCalled();
    });

    it('应该正确处理钩子执行错误', () => {
      const errorHook = vi.fn(() => {
        throw new Error('Hook error');
      });
      const immutableProps = { merge: vi.fn() };
      const fiberMap = new Map([
        ['updateQueen', new Set()],
        ['getState', () => ({ setValue: vi.fn() })],
      ] as any);

      // _.attempt 会捕获错误并返回错误对象，不会抛出
      scheduler([errorHook], immutableProps, immutableProps, fiberMap);

      expect(errorHook).toHaveBeenCalled();
      // 确保错误被 _.attempt 处理，immutableProps.merge 仍然被调用
      expect(immutableProps.merge).toHaveBeenCalled();
    });
  });

  describe('类型系统函数', () => {
    describe('createAccumulateTypes', () => {
      it('应该创建类型累积器', () => {
        const accumulator = createAccumulateTypes();
        expect(accumulator).toHaveProperty('add');
        expect(accumulator).toHaveProperty('getMapTypes');
        expect(accumulator).toHaveProperty('getTypes');
        expect(typeof accumulator.add).toBe('function');
        expect(typeof accumulator.getMapTypes).toBe('function');
        expect(typeof accumulator.getTypes).toBe('function');
      });

      it('应该支持链式调用添加类型', () => {
        const accumulator = createAccumulateTypes();
        const withType = accumulator.add();
        expect(withType).toHaveProperty('add');
        expect(withType).toHaveProperty('getMapTypes');
        expect(withType).toHaveProperty('getTypes');
      });

      it('getMapTypes应该返回null（类型系统）', () => {
        const accumulator = createAccumulateTypes();
        const mapTypes = accumulator.getMapTypes();
        expect(mapTypes).toBeNull();
      });

      it('getTypes应该返回null（类型系统）', () => {
        const accumulator = createAccumulateTypes();
        const types = accumulator.getTypes();
        expect(types).toBeNull();
      });
    });

    describe('createPluginAccumulateTypes', () => {
      it('应该创建插件类型累积器', () => {
        const accumulator = createPluginAccumulateTypes();
        expect(accumulator).toHaveProperty('add');
        expect(accumulator).toHaveProperty('getMapTypes');
        expect(accumulator).toHaveProperty('getTypes');
      });

      it('应该返回预配置的累积器', () => {
        const accumulator = createPluginAccumulateTypes();
        const mapTypes = accumulator.getMapTypes();
        const types = accumulator.getTypes();
        expect(mapTypes).toBeNull();
        expect(types).toBeNull();
      });
    });
  });

  describe('工具函数和边界情况', () => {
    describe('CreateFiberNode', () => {
      it('应该创建正确的fiber节点结构', () => {
        const node = fiberNode;
        expect(node).toHaveProperty('setCurrentFiber');
        expect(node).toHaveProperty('getCurrentFiber');
        expect(node).toHaveProperty('getIsMount');
      });

      it('应该正确设置和获取fiber状态', () => {
        const testFiber = {
          workInProgressState: null,
          workInProgressEffect: null,
          updateQueen: new Set(),
          getState: () => ({}),
          setValue: () => {},
          storeKey: 'test',
          queen: [],
        };

        fiberNode.setCurrentFiber(testFiber, true);
        expect(fiberNode.getCurrentFiber()).toBe(testFiber);
        expect(fiberNode.getIsMount()).toBe(true);

        fiberNode.setCurrentFiber(testFiber, false);
        expect(fiberNode.getIsMount()).toBe(false);
      });
    });

    describe('useControllableValue边界情况', () => {
      it('应该处理自定义属性名', () => {
        // 模拟vnode.props包含customValue使其成为受控组件
        const mockGetCurrentInstance = vi.fn(() => ({
          vnode: {
            props: {
              customValue: 'test',
            },
          },
        }));
        vi.mocked(getCurrentInstance).mockImplementation(mockGetCurrentInstance as any);

        const props = new Map([
          ['customValue', 'test'],
          ['customDefault', 'default'],
          ['emit', vi.fn()],
        ] as any);

        const options = {
          valuePropName: 'customValue',
          defaultValuePropName: 'customDefault',
          trigger: 'onCustomUpdate',
        };

        const [value, onChange] = useControllableValue(props, options);
        expect(value).toBe('test');

        onChange('new value');
        expect(props.get('emit')).toHaveBeenCalledWith('onCustomUpdate', 'new value');
      });

      it('应该处理数组形式的trigger props', () => {
        const trigger1 = vi.fn();
        const trigger2 = vi.fn();
        const props = new Map([
          ['modelValue', 'test'],
          ['onUpdate:modelValue', [trigger1, trigger2]],
          ['emit', vi.fn()],
        ] as any);

        const [, onChange] = useControllableValue(props);
        onChange('new value');

        expect(trigger1).toHaveBeenCalledWith('new value');
        expect(trigger2).toHaveBeenCalledWith('new value');
      });

      it('应该处理自定义onChange回调', () => {
        const customOnChange = vi.fn();
        const props = new Map([
          ['defaultValue', 'test'],
          ['emit', vi.fn()],
        ] as any);

        const options = { onChange: customOnChange };
        const [, onChange] = useControllableValue(props, options);
        onChange('new value');

        expect(customOnChange).toHaveBeenCalledWith('new value');
      });

      it('应该正确处理空options', () => {
        const props = new Map([
          ['defaultValue', 'test'],
          ['emit', vi.fn()],
        ] as any);

        expect(() => {
          useControllableValue(props, {});
        }).not.toThrow();
      });

      it('应该正确处理vnode.props为null的情况', () => {
        // 模拟vnode.props为null
        const mockGetCurrentInstance = vi.fn(() => ({
          vnode: {
            props: null,
          },
        }));
        vi.mocked(getCurrentInstance).mockImplementation(mockGetCurrentInstance as any);

        const props = new Map([
          ['defaultValue', 'test'],
          ['emit', vi.fn()],
        ] as any);

        const [value, , , isControlled] = useControllableValue(props);
        expect(isControlled).toBe(false);
        expect(value).toBe('test');
      });

      it('应该正确处理options为null的情况', () => {
        const props = new Map([
          ['defaultValue', 'test'],
          ['emit', vi.fn()],
        ] as any);

        expect(() => {
          useControllableValue(props, null as any);
        }).not.toThrow();
      });

      it('应该正确处理controlledInitialValue为null的情况', () => {
        // 模拟受控组件但propsValue为null
        const mockGetCurrentInstance = vi.fn(() => ({
          vnode: {
            props: {
              modelValue: null,
            },
          },
        }));
        vi.mocked(getCurrentInstance).mockImplementation(mockGetCurrentInstance as any);

        const props = new Map([
          ['modelValue', null],
          ['defaultValue', 'fallback'],
          ['emit', vi.fn()],
        ] as any);

        const [value, , , isControlled] = useControllableValue(props);
        expect(isControlled).toBe(true);
        expect(value).toBe(null);
      });

      it('应该正确处理propsValue为null但defaultValueProps有值的情况', () => {
        // 模拟受控组件，propsValue为null，但defaultValueProps有值
        const mockGetCurrentInstance = vi.fn(() => ({
          vnode: {
            props: {
              modelValue: null,
            },
          },
        }));
        vi.mocked(getCurrentInstance).mockImplementation(mockGetCurrentInstance as any);

        const props = new Map([
          ['modelValue', null],
          ['defaultValue', 'defaultValue'],
          ['emit', vi.fn()],
        ] as any);

        const options = {
          defaultValue: 'optionsDefault',
        };

        const [value, , , isControlled] = useControllableValue(props, options);
        expect(isControlled).toBe(true);
        expect(value).toBe(null); // 受控组件优先使用propsValue
      });

      it('应该正确处理propsValue为null但defaultValueProps有值的null合并操作', () => {
        // 模拟受控组件，propsValue为null，defaultValueProps有值，defaultValue也有值
        const mockGetCurrentInstance = vi.fn(() => ({
          vnode: {
            props: {
              modelValue: null,
            },
          },
        }));
        vi.mocked(getCurrentInstance).mockImplementation(mockGetCurrentInstance as any);

        const props = new Map([
          ['modelValue', null], // propsValue为null
          ['defaultValue', 'propsDefault'], // defaultValueProps有值
          ['emit', vi.fn()],
        ] as any);

        const options = {
          defaultValue: 'optionsDefault', // defaultValue也有值
        };

        const [value, , , isControlled] = useControllableValue(props, options);
        expect(isControlled).toBe(true);
        expect(value).toBe(null); // 受控组件优先使用propsValue，即使为null
      });

      it('应该覆盖useControllableValue中252行的null合并操作符', () => {
        // 模拟受控组件，确保触发252行的null合并操作
        const mockGetCurrentInstance = vi.fn(() => ({
          vnode: {
            props: {
              modelValue: null, // propsValue为null
            },
          },
        }));
        vi.mocked(getCurrentInstance).mockImplementation(mockGetCurrentInstance as any);

        const props = new Map([
          ['modelValue', null], // propsValue为null
          ['defaultValue', 'defaultValue'], // defaultValueProps有值
          ['emit', vi.fn()],
        ] as any);

        const options = {
          defaultValue: 'optionsDefault', // defaultValue也有值
        };

        const [value, , , isControlled] = useControllableValue(props, options);
        expect(isControlled).toBe(true);
        expect(value).toBe(null); // 受控组件优先使用propsValue
      });
    });

    describe('useMemo边界情况', () => {
      it('应该处理空依赖项数组的情况', () => {
        const callback = vi.fn(() => 'computed');
        // 首次渲染
        const result1 = useMemo(callback, []);
        expect(result1).toBe('computed');
        expect(callback).toHaveBeenCalledTimes(1);

        // 模拟更新，依赖项仍为空数组
        fiberNode.setCurrentFiber(fiberNode.getCurrentFiber(), false);
        const result2 = useMemo(callback, []);
        // 由于依赖项为空且相同，不应重新计算
        expect(result2).toBe('computed');
        expect(callback).toHaveBeenCalledTimes(1);
      });
    });

    describe('useCallback边界情况', () => {
      it('应该处理原始类型依赖项', () => {
        const callback = () => 'test';
        // 首次渲染
        const result1 = useCallback(callback, [1, 'string', true]);
        // 模拟更新，依赖项相同
        fiberNode.setCurrentFiber(fiberNode.getCurrentFiber(), false);
        const result2 = useCallback(callback, [1, 'string', true]);
        expect(result1).toBe(result2);
      });
    });
  });
});
