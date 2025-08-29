import { describe, expect, it, vi, beforeEach } from 'vitest';
import { ref, onMounted, onUnmounted, getCurrentInstance } from 'vue';
import { fiberNode, useState, useRef, useEffect, useMemo, useCallback, useControllableValue, scheduler } from './hooks';

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
      const [state, setState] = useState('initial');
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
      const [state, setState] = useState({ count: 0 });
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
      const callback = () => {};
      const dep1 = ['dep1'];
      const result1 = useCallback(callback, dep1);

      // 模拟更新，改变依赖项
      fiberNode.setCurrentFiber(fiberNode.getCurrentFiber(), false);
      const dep2 = ['dep2'];
      const result2 = useCallback(callback, dep2);

      expect(result1).not.toBe(result2);
    });
  });

  describe('useControllableValue', () => {
    it('应该处理受控模式', () => {
      const props = new Map([
        ['modelValue', 'controlled'],
        ['emit', vi.fn()],
      ]);
      const [value, onChange] = useControllableValue(props);

      expect(value).toBe('controlled');

      onChange('new value');
      expect(props.get('emit')).toHaveBeenCalled();
    });

    it('应该处理非受控模式', () => {
      const props = new Map([
        ['defaultValue', 'uncontrolled'],
        ['emit', vi.fn()],
      ]);
      const [value, onChange] = useControllableValue(props);

      expect(value).toBe('uncontrolled');

      onChange('new value');
      expect(props.get('emit')).not.toHaveBeenCalled();
    });
  });

  describe('scheduler', () => {
    it('应该正确调度插件钩子', () => {
      const pluginHook = vi.fn(() => ({ test: 'result' }));
      const immutableProps = { merge: vi.fn() };
      const fiberMap = new Map([
        ['updateQueen', new Set()],
        ['getState', () => ({ setValue: vi.fn() })],
      ]);

      scheduler([pluginHook], immutableProps, fiberMap);

      expect(pluginHook).toHaveBeenCalled();
      expect(immutableProps.merge).toHaveBeenCalledWith({ test: 'result' });
    });
  });
});
