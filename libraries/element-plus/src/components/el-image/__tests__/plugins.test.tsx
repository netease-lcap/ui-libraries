import { describe, expect, it, vi, beforeEach } from 'vitest';
import { renderHook } from '@ep-test/test-utils/render-hook';
import { handleDateRange, handleSwitchChange } from '../plugins/basic-plugins';
import { handleDateRange as handlePreviewDateRange } from '../plugins/preview-plugins';

// Mock lodash
vi.mock('lodash', () => ({
  default: {
    match: vi.fn((value) => ({
      when: vi.fn((condition, fn) => {
        if (condition(value)) {
          return fn(value);
        }
        return {
          when: vi.fn(),
          otherwise: vi.fn((fn) => fn()),
        };
      }),
      otherwise: vi.fn((fn) => fn()),
    })),
    isString: vi.fn((value) => typeof value === 'string'),
    isArray: vi.fn((value) => Array.isArray(value)),
    isEmpty: vi.fn((value) => !value || (Array.isArray(value) && value.length === 0)),
    assign: vi.fn((target, ...sources) => Object.assign(target, ...sources)),
    cond: vi.fn(),
    conforms: vi.fn(),
    stubTrue: vi.fn(() => true),
    isObject: vi.fn((value) => typeof value === 'object' && value !== null),
    isNil: vi.fn((value) => value == null),
    forEach: vi.fn((collection, iteratee) => {
      if (Array.isArray(collection)) {
        collection.forEach(iteratee);
      }
    }),
    keys: vi.fn((object) => Object.keys(object)),
    omit: vi.fn((object, paths) => {
      const result = { ...object };
      paths.forEach(path => delete result[path]);
      return result;
    }),
    uniqueId: vi.fn((prefix) => `${prefix}123`),
    wrap: vi.fn((fn, wrapper) => (...args) => wrapper(fn, ...args)),
    attempt: vi.fn((fn, ...args) => {
      try {
        return fn(...args);
      } catch (error) {
        return error;
      }
    }),
    mixin: vi.fn((obj) => {
      const _ = {};
      Object.assign(_, obj);
      return _;
    }),
    bind: vi.fn((fn, context) => {
      if (typeof fn === 'function') {
        return fn.bind(context);
      }
      return fn;
    }),
  },
}));

describe('el-image plugins', () => {
  beforeEach(() => {
    // 重置所有 mock
    vi.clearAllMocks();
  });

  describe('basic-plugins.ts', () => {
    describe('handleDateRange 插件功能测试', () => {
      it('应该正确处理插件基本结构', () => {
        const props = {
          get: vi.fn((key) => {
            if (key === 'previewSrcList') return 'image1.jpg,image2.jpg,image3.jpg';
            return undefined;
          }),
        };

        expect(() => {
          const { currentValue } = renderHook(handleDateRange, props);
          expect(currentValue.value).toBeDefined();
        }).not.toThrow();
      });

      it('应该正确处理字符串类型的 previewSrcList', () => {
        const props = {
          get: vi.fn((key) => {
            if (key === 'previewSrcList') return 'image1.jpg,image2.jpg,image3.jpg';
            return undefined;
          }),
        };

        expect(() => {
          const { currentValue } = renderHook(handleDateRange, props);
          expect(currentValue.value).toBeDefined();
        }).not.toThrow();
      });

      it('应该正确处理数组类型的 previewSrcList', () => {
        const props = {
          get: vi.fn((key) => {
            if (key === 'previewSrcList') return ['image1.jpg', 'image2.jpg', 'image3.jpg'];
            return undefined;
          }),
        };

        expect(() => {
          const { currentValue } = renderHook(handleDateRange, props);
          expect(currentValue.value).toBeDefined();
        }).not.toThrow();
      });

      it('应该正确处理空字符串的 previewSrcList', () => {
        const props = {
          get: vi.fn((key) => {
            if (key === 'previewSrcList') return '';
            return undefined;
          }),
        };

        expect(() => {
          const { currentValue } = renderHook(handleDateRange, props);
          expect(currentValue.value).toBeDefined();
        }).not.toThrow();
      });

      it('应该正确处理 null 的 previewSrcList', () => {
        const props = {
          get: vi.fn((key) => {
            if (key === 'previewSrcList') return null;
            return undefined;
          }),
        };

        expect(() => {
          const { currentValue } = renderHook(handleDateRange, props);
          expect(currentValue.value).toBeDefined();
        }).not.toThrow();
      });

      it('应该正确处理 undefined 的 previewSrcList', () => {
        const props = {
          get: vi.fn((key) => {
            if (key === 'previewSrcList') return undefined;
            return undefined;
          }),
        };

        expect(() => {
          const { currentValue } = renderHook(handleDateRange, props);
          expect(currentValue.value).toBeDefined();
        }).not.toThrow();
      });

      it('应该正确处理空数组的 previewSrcList', () => {
        const props = {
          get: vi.fn((key) => {
            if (key === 'previewSrcList') return [];
            return undefined;
          }),
        };

        expect(() => {
          const { currentValue } = renderHook(handleDateRange, props);
          expect(currentValue.value).toBeDefined();
        }).not.toThrow();
      });

      it('应该正确处理复杂的数据结构', () => {
        const props = {
          get: vi.fn((key) => {
            if (key === 'previewSrcList') return 'https://example.com/image1.jpg,https://example.com/image2.jpg';
            return undefined;
          }),
        };

        expect(() => {
          const { currentValue } = renderHook(handleDateRange, props);
          expect(currentValue.value).toBeDefined();
        }).not.toThrow();
      });
    });

    describe('handleSwitchChange 插件功能测试', () => {
      it('应该正确处理插件基本结构', () => {
        const mockOnSwitch = vi.fn();
        const props = {
          get: vi.fn((key) => {
            if (key === 'onSwitchChange') return mockOnSwitch;
            return undefined;
          }),
        };

        expect(() => {
          const { currentValue } = renderHook(handleSwitchChange, props);
          expect(currentValue.value).toBeDefined();
        }).not.toThrow();
      });

      it('应该正确处理 undefined 的 onSwitchChange', () => {
        const props = {
          get: vi.fn((key) => {
            if (key === 'onSwitchChange') return undefined;
            return undefined;
          }),
        };

        expect(() => {
          const { currentValue } = renderHook(handleSwitchChange, props);
          expect(currentValue.value).toBeDefined();
        }).not.toThrow();
      });

      it('应该正确处理 null 的 onSwitchChange', () => {
        const props = {
          get: vi.fn((key) => {
            if (key === 'onSwitchChange') return null;
            return undefined;
          }),
        };

        expect(() => {
          const { currentValue } = renderHook(handleSwitchChange, props);
          expect(currentValue.value).toBeDefined();
        }).not.toThrow();
      });

      it('应该正确处理函数类型的 onSwitchChange', () => {
        const mockOnSwitch = vi.fn((value) => {
          console.log('Switch changed:', value);
        });

        const props = {
          get: vi.fn((key) => {
            if (key === 'onSwitchChange') return mockOnSwitch;
            return undefined;
          }),
        };

        expect(() => {
          const { currentValue } = renderHook(handleSwitchChange, props);
          expect(currentValue.value).toBeDefined();
        }).not.toThrow();
      });

      it('应该正确处理复杂 props 结构', () => {
        const mockOnSwitch = vi.fn();
        const props = {
          get: vi.fn((key) => {
            const mockData = {
              onSwitchChange: mockOnSwitch,
              otherProp: 'value',
              nestedProp: { key: 'value' },
            };
            return mockData[key];
          }),
        };

        expect(() => {
          const { currentValue } = renderHook(handleSwitchChange, props);
          expect(currentValue.value).toBeDefined();
        }).not.toThrow();
      });
    });
  });

  describe('preview-plugins.ts', () => {
    describe('handleDateRange 插件功能测试', () => {
      it('应该正确处理插件基本结构', () => {
        const props = {
          get: vi.fn((key) => {
            if (key === 'urlList') return 'image1.jpg,image2.jpg,image3.jpg';
            return undefined;
          }),
        };

        expect(() => {
          const { currentValue } = renderHook(handlePreviewDateRange, props);
          expect(currentValue.value).toBeDefined();
        }).not.toThrow();
      });

      it('应该正确处理字符串类型的 urlList', () => {
        const props = {
          get: vi.fn((key) => {
            if (key === 'urlList') return 'image1.jpg,image2.jpg,image3.jpg';
            return undefined;
          }),
        };

        expect(() => {
          const { currentValue } = renderHook(handlePreviewDateRange, props);
          expect(currentValue.value).toBeDefined();
        }).not.toThrow();
      });

      it('应该正确处理非字符串类型的 urlList', () => {
        const props = {
          get: vi.fn((key) => {
            if (key === 'urlList') return ['image1.jpg', 'image2.jpg'];
            return undefined;
          }),
        };

        expect(() => {
          const { currentValue } = renderHook(handlePreviewDateRange, props);
          expect(currentValue.value).toBeDefined();
        }).not.toThrow();
      });

      it('应该正确处理空字符串的 urlList', () => {
        const props = {
          get: vi.fn((key) => {
            if (key === 'urlList') return '';
            return undefined;
          }),
        };

        expect(() => {
          const { currentValue } = renderHook(handlePreviewDateRange, props);
          expect(currentValue.value).toBeDefined();
        }).not.toThrow();
      });

      it('应该正确处理 null 的 urlList', () => {
        const props = {
          get: vi.fn((key) => {
            if (key === 'urlList') return null;
            return undefined;
          }),
        };

        expect(() => {
          const { currentValue } = renderHook(handlePreviewDateRange, props);
          expect(currentValue.value).toBeDefined();
        }).not.toThrow();
      });

      it('应该正确处理 undefined 的 urlList', () => {
        const props = {
          get: vi.fn((key) => {
            if (key === 'urlList') return undefined;
            return undefined;
          }),
        };

        expect(() => {
          const { currentValue } = renderHook(handlePreviewDateRange, props);
          expect(currentValue.value).toBeDefined();
        }).not.toThrow();
      });

      it('应该正确处理复杂的数据结构', () => {
        const props = {
          get: vi.fn((key) => {
            if (key === 'urlList') return 'https://example.com/image1.jpg,https://example.com/image2.jpg';
            return undefined;
          }),
        };

        expect(() => {
          const { currentValue } = renderHook(handlePreviewDateRange, props);
          expect(currentValue.value).toBeDefined();
        }).not.toThrow();
      });

      it('应该正确处理包含空格的字符串', () => {
        const props = {
          get: vi.fn((key) => {
            if (key === 'urlList') return 'image1.jpg, image2.jpg , image3.jpg';
            return undefined;
          }),
        };

        expect(() => {
          const { currentValue } = renderHook(handlePreviewDateRange, props);
          expect(currentValue.value).toBeDefined();
        }).not.toThrow();
      });
    });
  });

  describe('边界情况和错误处理测试', () => {
    it('应该正确处理 props.get 抛出异常的情况', () => {
      const props = {
        get: vi.fn(() => {
          throw new Error('Mock error');
        }),
      };

      expect(() => {
        const { currentValue } = renderHook(handleDateRange, props);
        expect(currentValue.value).toBeDefined();
      }).not.toThrow();
    });

    it('应该正确处理各种数据类型的 props', () => {
      const testCases = [
        { previewSrcList: 'string' },
        { previewSrcList: ['array'] },
        { previewSrcList: null },
        { previewSrcList: undefined },
        { previewSrcList: 123 },
        { previewSrcList: {} },
      ];

      testCases.forEach((testCase) => {
        const props = {
          get: vi.fn((key) => testCase[key]),
        };

        expect(() => {
          const { currentValue } = renderHook(handleDateRange, props);
          expect(currentValue.value).toBeDefined();
        }).not.toThrow();
      });
    });

    it('应该正确处理 handleSwitchChange 的各种数据类型', () => {
      const testCases = [
        { onSwitchChange: vi.fn() },
        { onSwitchChange: null },
        { onSwitchChange: undefined },
        { onSwitchChange: 'string' },
        { onSwitchChange: 123 },
        { onSwitchChange: {} },
      ];

      testCases.forEach((testCase) => {
        const props = {
          get: vi.fn((key) => testCase[key]),
        };

        expect(() => {
          const { currentValue } = renderHook(handleSwitchChange, props);
          expect(currentValue.value).toBeDefined();
        }).not.toThrow();
      });
    });
  });
});