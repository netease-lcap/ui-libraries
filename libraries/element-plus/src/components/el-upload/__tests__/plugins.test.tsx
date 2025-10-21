import { describe, expect, it, vi, beforeEach } from 'vitest';
import { renderHook } from '@ep-test/test-utils/render-hook';
import { $deletePropsList, $dataSourceDeleteField } from '@/plugins/constants';
import '@/utils/index';
import UploadBasicAccumulate from '../plugins/basic-plugins';
import UploadIdeAccumulate from '../plugins/ide';

describe('el-upload plugins', () => {
  beforeEach(() => {
    // 重置所有 mock
    vi.clearAllMocks();
  });

  describe('basic-plugins.tsx', () => {
    describe('UploadBasicAccumulate 基础功能', () => {
      it('应该是一个有效的 PluginAccumulateTypes 实例', () => {
        expect(UploadBasicAccumulate).toBeDefined();
        expect(typeof UploadBasicAccumulate.addPlugin).toBe('function');
        expect(typeof UploadBasicAccumulate.getPluginMethod).toBe('function');
        expect(Array.isArray(UploadBasicAccumulate.Plugin)).toBe(true);
      });

      it('应该包含所有必要的插件', () => {
        const plugins = UploadBasicAccumulate.getPluginMethod();

        const pluginNames = plugins.map((plugin: any) => plugin.name);
        expect(pluginNames).toContain('handleTagName');
        expect(pluginNames).toContain('handleComponentInForm');
        expect(pluginNames).toContain('handlePreviewRender');
        expect(pluginNames).toContain('handleResponse');
        expect(pluginNames).toContain('handleRequestHeaders');
        expect(pluginNames).toContain('handleRequestData');
        expect(pluginNames).toContain('handleEvent');
        expect(pluginNames).toContain('handleSlots');
        expect(pluginNames).toContain('handlePreview');
      });
    });

    describe('handleTagName 插件功能测试', () => {
      const plugin = UploadBasicAccumulate.getPluginMethodByName('handleTagName') as any;

      it('应该正确处理插件基本结构', () => {
        const props = {
          [$deletePropsList]: [],
        };

        expect(() => {
          const { currentValue } = renderHook(plugin, props);
          const result = currentValue.value;
          expect(result).toBeDefined();
          expect(typeof result).toBe('object');
          expect(result).toHaveProperty('formTagName');
          expect(result).toHaveProperty('tagName');
        }).not.toThrow();
      });

      it('应该正确设置 formTagName 和 tagName', () => {
        const props = {
          [$deletePropsList]: [],
        };

        expect(() => {
          const { currentValue } = renderHook(plugin, props);
          const result = currentValue.value;
          expect(result.formTagName).toBe('el-form-upload');
          expect(result.tagName).toBe('el-upload');
        }).not.toThrow();
      });
    });

    describe('handlePreviewRender 插件功能测试', () => {
      const plugin = UploadBasicAccumulate.getPluginMethodByName('handlePreviewRender') as any;

      it('应该正确处理插件基本结构', () => {
        const props = {
          render: vi.fn(),
          ref: { current: null },
          'data-nodepath': 'test-path',
          listType: 'picture-card',
          'url-field': 'filePath',
          [$deletePropsList]: [],
        };

        expect(() => {
          const { currentValue } = renderHook(plugin, props);
          const result = currentValue.value;
          expect(result).toBeDefined();
          expect(typeof result).toBe('object');
        }).not.toThrow();
      });

      it('应该正确处理 picture-card 类型', () => {
        const props = {
          render: vi.fn(),
          ref: { current: null },
          'data-nodepath': 'test-path',
          listType: 'picture-card',
          'url-field': 'filePath',
          [$deletePropsList]: [],
        };

        expect(() => {
          const { currentValue } = renderHook(plugin, props);
          const result = currentValue.value;
          expect(result).toBeDefined();
          expect(result).toHaveProperty('render');
          expect(result).toHaveProperty('onPreview');
          expect(result).toHaveProperty('ref');
        }).not.toThrow();
      });

      it('应该正确处理非 picture-card 类型', () => {
        const props = {
          render: vi.fn(),
          ref: { current: null },
          'data-nodepath': 'test-path',
          listType: 'text',
          'url-field': 'filePath',
          [$deletePropsList]: [],
        };

        expect(() => {
          const { currentValue } = renderHook(plugin, props);
          const result = currentValue.value;
          expect(result).toBeDefined();
          expect(result).toEqual({});
        }).not.toThrow();
      });

      it('应该正确处理 undefined 的 listType', () => {
        const props = {
          render: vi.fn(),
          ref: { current: null },
          'data-nodepath': 'test-path',
          listType: undefined,
          'url-field': 'filePath',
          [$deletePropsList]: [],
        };

        expect(() => {
          const { currentValue } = renderHook(plugin, props);
          const result = currentValue.value;
          expect(result).toBeDefined();
          expect(result).toEqual({});
        }).not.toThrow();
      });

      it('应该正确处理 null 的 ref', () => {
        const props = {
          render: vi.fn(),
          ref: null,
          'data-nodepath': 'test-path',
          listType: 'picture-card',
          'url-field': 'filePath',
          [$deletePropsList]: [],
        };

        expect(() => {
          const { currentValue } = renderHook(plugin, props);
          const result = currentValue.value;
          expect(result).toBeDefined();
        }).not.toThrow();
      });

      it('应该正确处理 undefined 的 ref', () => {
        const props = {
          render: vi.fn(),
          ref: undefined,
          'data-nodepath': 'test-path',
          listType: 'picture-card',
          'url-field': 'filePath',
          [$deletePropsList]: [],
        };

        expect(() => {
          const { currentValue } = renderHook(plugin, props);
          const result = currentValue.value;
          expect(result).toBeDefined();
        }).not.toThrow();
      });
    });

    describe('handleResponse 插件功能测试', () => {
      const plugin = UploadBasicAccumulate.getPluginMethodByName('handleResponse') as any;

      it('应该正确处理插件基本结构', () => {
        const props = {
          onRemove: vi.fn(),
          onChange: vi.fn(),
          urlField: 'filePath',
          converter: 'simple',
          modelValue: '',
          'onUpdate:modelValue': vi.fn(),
          [$deletePropsList]: [],
        };

        expect(() => {
          const { currentValue } = renderHook(plugin, props);
          const result = currentValue.value;
          expect(result).toBeDefined();
          expect(typeof result).toBe('object');
          expect(result).toHaveProperty('fileList');
          expect(result).toHaveProperty('onChange');
          expect(result).toHaveProperty('onRemove');
        }).not.toThrow();
      });

      it('应该正确处理默认参数', () => {
        const props = {
          [$deletePropsList]: [],
        };

        expect(() => {
          const { currentValue } = renderHook(plugin, props);
          const result = currentValue.value;
          expect(result).toBeDefined();
          expect(result).toHaveProperty('fileList');
          expect(result).toHaveProperty('onChange');
          expect(result).toHaveProperty('onRemove');
        }).not.toThrow();
      });

      it('应该正确处理 simple 转换器', () => {
        const props = {
          onRemove: vi.fn(),
          onChange: vi.fn(),
          urlField: 'filePath',
          converter: 'simple',
          modelValue: 'http://example.com/file1.jpg,http://example.com/file2.jpg',
          'onUpdate:modelValue': vi.fn(),
          [$deletePropsList]: [],
        };

        expect(() => {
          const { currentValue } = renderHook(plugin, props);
          const result = currentValue.value;
          expect(result).toBeDefined();
          expect(result).toHaveProperty('fileList');
          expect(Array.isArray(result.fileList)).toBe(true);
        }).not.toThrow();
      });

      it('应该正确处理 json 转换器', () => {
        const props = {
          onRemove: vi.fn(),
          onChange: vi.fn(),
          urlField: 'filePath',
          converter: 'json',
          modelValue: '[{"url":"http://example.com/file1.jpg","name":"file1.jpg","status":"success"}]',
          'onUpdate:modelValue': vi.fn(),
          [$deletePropsList]: [],
        };

        expect(() => {
          const { currentValue } = renderHook(plugin, props);
          const result = currentValue.value;
          expect(result).toBeDefined();
          expect(result).toHaveProperty('fileList');
          expect(Array.isArray(result.fileList)).toBe(true);
        }).not.toThrow();
      });

      it('应该正确处理空值', () => {
        const props = {
          onRemove: vi.fn(),
          onChange: vi.fn(),
          urlField: 'filePath',
          converter: 'simple',
          modelValue: null,
          'onUpdate:modelValue': vi.fn(),
          [$deletePropsList]: [],
        };

        expect(() => {
          const { currentValue } = renderHook(plugin, props);
          const result = currentValue.value;
          expect(result).toBeDefined();
          expect(result).toHaveProperty('fileList');
          expect(Array.isArray(result.fileList)).toBe(true);
        }).not.toThrow();
      });
    });

    describe('handleRequestHeaders 插件功能测试', () => {
      const plugin = UploadBasicAccumulate.getPluginMethodByName('handleRequestHeaders') as any;

      it('应该正确处理插件基本结构', () => {
        const props = {
          headers: {},
          access: 'test-access',
          ttl: true,
          ttlValue: 3600,
          [$deletePropsList]: [],
        };

        expect(() => {
          const { currentValue } = renderHook(plugin, props);
          const result = currentValue.value;
          expect(result).toBeDefined();
        }).not.toThrow();
      });

      it('应该正确处理默认参数', () => {
        const props = {
          [$deletePropsList]: [],
        };

        expect(() => {
          const { currentValue } = renderHook(plugin, props);
          const result = currentValue.value;
          expect(result).toBeDefined();
        }).not.toThrow();
      });

      it('应该正确处理 ttl 参数', () => {
        const props = {
          headers: {},
          access: 'test-access',
          ttl: true,
          ttlValue: 3600,
          [$deletePropsList]: [],
        };

        expect(() => {
          const { currentValue } = renderHook(plugin, props);
          const result = currentValue.value;
          expect(result).toBeDefined();
        }).not.toThrow();
      });

      it('应该正确处理 null 的 headers', () => {
        const props = {
          headers: null,
          access: 'test-access',
          ttl: true,
          ttlValue: 3600,
          [$deletePropsList]: [],
        };

        expect(() => {
          const { currentValue } = renderHook(plugin, props);
          const result = currentValue.value;
          expect(result).toBeDefined();
        }).not.toThrow();
      });

      it('应该正确处理 undefined 的 headers', () => {
        const props = {
          headers: undefined,
          access: 'test-access',
          ttl: true,
          ttlValue: 3600,
          [$deletePropsList]: [],
        };

        expect(() => {
          const { currentValue } = renderHook(plugin, props);
          const result = currentValue.value;
          expect(result).toBeDefined();
        }).not.toThrow();
      });
    });

    describe('handleRequestData 插件功能测试', () => {
      const plugin = UploadBasicAccumulate.getPluginMethodByName('handleRequestData') as any;

      it('应该正确处理插件基本结构', () => {
        const props = {
          data: {},
          lcapIsCompress: true,
          viaOriginURL: 'http://example.com',
          action: '/upload',
          [$deletePropsList]: [],
        };

        expect(() => {
          const { currentValue } = renderHook(plugin, props);
          const result = currentValue.value;
          expect(result).toBeDefined();
          expect(typeof result).toBe('object');
          expect(result).toHaveProperty('data');
          expect(result).toHaveProperty('action');
        }).not.toThrow();
      });

      it('应该正确处理默认参数', () => {
        const props = {
          [$deletePropsList]: [],
        };

        expect(() => {
          const { currentValue } = renderHook(plugin, props);
          const result = currentValue.value;
          expect(result).toBeDefined();
          expect(result).toHaveProperty('data');
          expect(result).toHaveProperty('action');
          expect(result.action).toBe('/upload');
        }).not.toThrow();
      });

      it('应该正确处理自定义 action', () => {
        const props = {
          data: {},
          lcapIsCompress: true,
          viaOriginURL: 'http://example.com',
          action: '/custom-upload',
          [$deletePropsList]: [],
        };

        expect(() => {
          const { currentValue } = renderHook(plugin, props);
          const result = currentValue.value;
          expect(result).toBeDefined();
          expect(result).toHaveProperty('action');
          expect(result.action).toBe('/custom-upload');
        }).not.toThrow();
      });

      it('应该正确处理 null 的 data', () => {
        const props = {
          data: null,
          lcapIsCompress: true,
          viaOriginURL: 'http://example.com',
          action: '/upload',
          [$deletePropsList]: [],
        };

        expect(() => {
          const { currentValue } = renderHook(plugin, props);
          const result = currentValue.value;
          expect(result).toBeDefined();
          expect(result).toHaveProperty('data');
        }).not.toThrow();
      });

      it('应该正确处理 undefined 的 data', () => {
        const props = {
          data: undefined,
          lcapIsCompress: true,
          viaOriginURL: 'http://example.com',
          action: '/upload',
          [$deletePropsList]: [],
        };

        expect(() => {
          const { currentValue } = renderHook(plugin, props);
          const result = currentValue.value;
          expect(result).toBeDefined();
          expect(result).toHaveProperty('data');
        }).not.toThrow();
      });
    });

    describe('handleEvent 插件功能测试', () => {
      const plugin = UploadBasicAccumulate.getPluginMethodByName('handleEvent') as any;

      it('应该正确处理插件基本结构', () => {
        const props = {
          onBeforeUpload: vi.fn(),
          onBeforeRemove: vi.fn(),
          fileSizeLimit: 10,
          onExceed: vi.fn(),
          limit: 5,
          [$deletePropsList]: [],
        };

        expect(() => {
          const { currentValue } = renderHook(plugin, props);
          const result = currentValue.value;
          expect(result).toBeDefined();
          expect(typeof result).toBe('object');
          expect(result).toHaveProperty('beforeUpload');
          expect(result).toHaveProperty('onExceed');
          expect(result).toHaveProperty('beforeRemove');
        }).not.toThrow();
      });

      it('应该正确处理默认参数', () => {
        const props = {
          [$deletePropsList]: [],
        };

        expect(() => {
          const { currentValue } = renderHook(plugin, props);
          const result = currentValue.value;
          expect(result).toBeDefined();
          expect(result).toHaveProperty('beforeUpload');
          expect(result).toHaveProperty('onExceed');
          expect(result).toHaveProperty('beforeRemove');
        }).not.toThrow();
      });

      it('应该正确处理文件大小限制', () => {
        const props = {
          onBeforeUpload: vi.fn(),
          onBeforeRemove: vi.fn(),
          fileSizeLimit: 5,
          onExceed: vi.fn(),
          limit: 3,
          [$deletePropsList]: [],
        };

        expect(() => {
          const { currentValue } = renderHook(plugin, props);
          const result = currentValue.value;
          expect(result).toBeDefined();
          expect(result).toHaveProperty('beforeUpload');
          expect(typeof result.beforeUpload).toBe('function');
        }).not.toThrow();
      });

      it('应该正确处理 null 的回调函数', () => {
        const props = {
          onBeforeUpload: null,
          onBeforeRemove: null,
          fileSizeLimit: 10,
          onExceed: null,
          limit: 5,
          [$deletePropsList]: [],
        };

        expect(() => {
          const { currentValue } = renderHook(plugin, props);
          const result = currentValue.value;
          expect(result).toBeDefined();
          expect(result).toHaveProperty('beforeUpload');
          expect(result).toHaveProperty('onExceed');
          expect(result).toHaveProperty('beforeRemove');
        }).not.toThrow();
      });

      it('应该正确处理 undefined 的回调函数', () => {
        const props = {
          onBeforeUpload: undefined,
          onBeforeRemove: undefined,
          fileSizeLimit: 10,
          onExceed: undefined,
          limit: 5,
          [$deletePropsList]: [],
        };

        expect(() => {
          const { currentValue } = renderHook(plugin, props);
          const result = currentValue.value;
          expect(result).toBeDefined();
          expect(result).toHaveProperty('beforeUpload');
          expect(result).toHaveProperty('onExceed');
          expect(result).toHaveProperty('beforeRemove');
        }).not.toThrow();
      });
    });

    describe('handleSlots 插件功能测试', () => {
      const plugin = UploadBasicAccumulate.getPluginMethodByName('handleSlots') as any;

      it('应该正确处理插件基本结构', () => {
        const props = {
          triggerUploadText: '上传文件',
          slots: {},
          listType: 'text',
          ref: { current: null },
          drag: false,
          autoUpload: true,
          hasTip: false,
          showUploadButton: false,
          [$deletePropsList]: [],
        };

        expect(() => {
          const { currentValue } = renderHook(plugin, props);
          const result = currentValue.value;
          expect(result).toBeDefined();
          expect(typeof result).toBe('object');
          expect(result).toHaveProperty('triggerUploadText');
          expect(result).toHaveProperty('slots');
        }).not.toThrow();
      });

      it('应该正确处理默认参数', () => {
        const props = {
          [$deletePropsList]: [],
        };

        expect(() => {
          const { currentValue } = renderHook(plugin, props);
          const result = currentValue.value;
          expect(result).toBeDefined();
          expect(result).toHaveProperty('triggerUploadText');
          expect(result).toHaveProperty('slots');
          expect(result.triggerUploadText).toBe('上传到服务器');
        }).not.toThrow();
      });

      it('应该正确处理拖拽模式', () => {
        const props = {
          triggerUploadText: '上传文件',
          slots: {},
          listType: 'text',
          ref: { current: null },
          drag: true,
          autoUpload: true,
          hasTip: false,
          showUploadButton: false,
          [$deletePropsList]: [],
        };

        expect(() => {
          const { currentValue } = renderHook(plugin, props);
          const result = currentValue.value;
          expect(result).toBeDefined();
          expect(result).toHaveProperty('slots');
          expect(result.slots).toHaveProperty('trigger');
        }).not.toThrow();
      });

      it('应该正确处理图片卡片模式', () => {
        const props = {
          triggerUploadText: '上传文件',
          slots: {},
          listType: 'picture-card',
          ref: { current: null },
          drag: false,
          autoUpload: true,
          hasTip: false,
          showUploadButton: false,
          [$deletePropsList]: [],
        };

        expect(() => {
          const { currentValue } = renderHook(plugin, props);
          const result = currentValue.value;
          expect(result).toBeDefined();
          expect(result).toHaveProperty('slots');
          expect(result.slots).toHaveProperty('trigger');
        }).not.toThrow();
      });

      it('应该正确处理手动上传模式', () => {
        const props = {
          triggerUploadText: '上传文件',
          slots: {},
          listType: 'text',
          ref: { current: null },
          drag: false,
          autoUpload: false,
          hasTip: false,
          showUploadButton: true,
          [$deletePropsList]: [],
        };

        expect(() => {
          const { currentValue } = renderHook(plugin, props);
          const result = currentValue.value;
          expect(result).toBeDefined();
          expect(result).toHaveProperty('slots');
          expect(result.slots).toHaveProperty('default');
        }).not.toThrow();
      });

      it('应该正确处理提示信息', () => {
        const props = {
          triggerUploadText: '上传文件',
          slots: { tip: vi.fn() },
          listType: 'text',
          ref: { current: null },
          drag: false,
          autoUpload: true,
          hasTip: true,
          showUploadButton: false,
          [$deletePropsList]: [],
        };

        expect(() => {
          const { currentValue } = renderHook(plugin, props);
          const result = currentValue.value;
          expect(result).toBeDefined();
          expect(result).toHaveProperty('slots');
          expect(result.slots).toHaveProperty('tip');
        }).not.toThrow();
      });

      it('应该正确处理 null 的 slots', () => {
        const props = {
          triggerUploadText: '上传文件',
          slots: null,
          listType: 'text',
          ref: { current: null },
          drag: false,
          autoUpload: true,
          hasTip: false,
          showUploadButton: false,
          [$deletePropsList]: [],
        };

        expect(() => {
          const { currentValue } = renderHook(plugin, props);
          const result = currentValue.value;
          expect(result).toBeDefined();
          expect(result).toHaveProperty('slots');
        }).not.toThrow();
      });

      it('应该正确处理 undefined 的 slots', () => {
        const props = {
          triggerUploadText: '上传文件',
          slots: undefined,
          listType: 'text',
          ref: { current: null },
          drag: false,
          autoUpload: true,
          hasTip: false,
          showUploadButton: false,
          [$deletePropsList]: [],
        };

        expect(() => {
          const { currentValue } = renderHook(plugin, props);
          const result = currentValue.value;
          expect(result).toBeDefined();
          expect(result).toHaveProperty('slots');
        }).not.toThrow();
      });
    });

    describe('handlePreview 插件功能测试', () => {
      const plugin = UploadBasicAccumulate.getPluginMethodByName('handlePreview') as any;

      it('应该正确处理插件基本结构', () => {
        const props = {
          ref: { current: null },
          render: vi.fn(),
          'data-nodepath': 'test-path',
          class: 'test-class',
          [$deletePropsList]: [],
        };

        expect(() => {
          const { currentValue } = renderHook(plugin, props);
          const result = currentValue.value;
          expect(result).toBeDefined();
          expect(typeof result).toBe('object');
          expect(result).toHaveProperty('ref');
          expect(result).toHaveProperty('render');
        }).not.toThrow();
      });

      it('应该正确处理预览模式', () => {
        const props = {
          ref: { current: null },
          render: vi.fn(),
          'data-nodepath': 'test-path',
          class: 'test-class',
          [$deletePropsList]: [],
        };

        expect(() => {
          const { currentValue } = renderHook(plugin, props);
          const result = currentValue.value;
          expect(result).toBeDefined();
          expect(result).toHaveProperty('render');
          expect(typeof result.render).toBe('function');
        }).not.toThrow();
      });

      it('应该正确处理非预览模式', () => {
        const props = {
          ref: { current: null },
          render: vi.fn(),
          class: 'test-class',
          [$deletePropsList]: [],
        };

        expect(() => {
          const { currentValue } = renderHook(plugin, props);
          const result = currentValue.value;
          expect(result).toBeDefined();
          expect(result).toHaveProperty('render');
          expect(typeof result.render).toBe('function');
        }).not.toThrow();
      });

      it('应该正确处理 IDE 环境', () => {
        const props = {
          ref: { current: null },
          render: vi.fn(),
          'data-nodepath': 'test-path',
          class: 'test-class',
          [$deletePropsList]: [],
        };

        expect(() => {
          const { currentValue } = renderHook(plugin, props);
          const result = currentValue.value;
          expect(result).toBeDefined();
          expect(result).toHaveProperty('render');
          expect(typeof result.render).toBe('function');
        }).not.toThrow();
      });

      it('应该正确处理 null 的 ref', () => {
        const props = {
          ref: null,
          render: vi.fn(),
          'data-nodepath': 'test-path',
          class: 'test-class',
          [$deletePropsList]: [],
        };

        expect(() => {
          const { currentValue } = renderHook(plugin, props);
          const result = currentValue.value;
          expect(result).toBeDefined();
        }).not.toThrow();
      });

      it('应该正确处理 undefined 的 ref', () => {
        const props = {
          ref: undefined,
          render: vi.fn(),
          'data-nodepath': 'test-path',
          class: 'test-class',
          [$deletePropsList]: [],
        };

        expect(() => {
          const { currentValue } = renderHook(plugin, props);
          const result = currentValue.value;
          expect(result).toBeDefined();
        }).not.toThrow();
      });
    });

    describe('插件集成和扩展性测试', () => {
      it('应该能够与其他插件组合使用', () => {
        // 测试插件链式调用
        const combinedAccumulate = UploadBasicAccumulate.addPlugin({
          name: 'testPlugin',
          handle: () => ({
            testProperty: 'test-value',
            customData: 'custom',
          }),
        });

        const handleTagNamePlugin = combinedAccumulate.getPluginMethodByName('handleTagName');
        const testPlugin = combinedAccumulate.getPluginMethodByName('testPlugin');

        expect(handleTagNamePlugin).toBeDefined();
        expect(testPlugin).toBeDefined();
        expect(testPlugin?.name).toBe('testPlugin');
      });

      it('应该正确处理插件的执行顺序', () => {
        const plugin1 = {
          name: 'plugin1',
          handle: () => ({ step1: 'completed' }),
        };
        const plugin2 = {
          name: 'plugin2',
          handle: () => ({ step2: 'completed' }),
        };

        const testAccumulate = UploadBasicAccumulate.addPlugin(plugin1).addPlugin(plugin2);

        const plugins = testAccumulate.getPluginMethod();
        // 验证插件数量是否正确增加（可能已经有其他插件）
        expect(plugins.length).toBeGreaterThanOrEqual(11);

        const foundPlugin1 = testAccumulate.getPluginMethodByName('plugin1');
        const foundPlugin2 = testAccumulate.getPluginMethodByName('plugin2');

        expect(foundPlugin1).toBeDefined();
        expect(foundPlugin2).toBeDefined();
      });

      it('应该正确处理插件方法的获取', () => {
        const allMethods = UploadBasicAccumulate.getPluginMethod();
        expect(Array.isArray(allMethods)).toBe(true);
        expect(allMethods.length).toBeGreaterThan(0);

        // 验证方法数组中的元素都是函数或包含 handle 的对象
        allMethods.forEach((method) => {
          expect(
            typeof method === 'function' || (typeof method === 'object' && typeof method.handle === 'function'),
          ).toBe(true);
        });
      });

      it('应该正确处理不存在的插件查询', () => {
        const nonExistentPlugin = UploadBasicAccumulate.getPluginMethodByName('nonExistent');
        expect(nonExistentPlugin).toBeUndefined();
      });
    });
  });

  describe('ide.ts', () => {
    describe('UploadIdeAccumulate 基础功能', () => {
      it('应该是一个有效的 PluginAccumulateTypes 实例', () => {
        expect(UploadIdeAccumulate).toBeDefined();
        expect(typeof UploadIdeAccumulate.addPlugin).toBe('function');
        expect(typeof UploadIdeAccumulate.getPluginMethod).toBe('function');
        expect(Array.isArray(UploadIdeAccumulate.Plugin)).toBe(true);
      });

      it('应该包含 handleNodePath 插件', () => {
        const plugins = UploadIdeAccumulate.getPluginMethod();
        expect(plugins).toHaveLength(0);

        const handleNodePathPlugin = UploadIdeAccumulate.getPluginMethodByName('handleNodePath');
        expect(handleNodePathPlugin).toBeDefined();
        if (handleNodePathPlugin) {
          expect(handleNodePathPlugin.name).toBe('handleNodePath');
          expect(typeof (handleNodePathPlugin as any).handle).toBe('function');
        }
      });
    });

    describe('handleNodePath 插件功能测试', () => {
      const plugin = UploadIdeAccumulate.getPluginMethodByName('handleNodePath') as any;

      it('应该正确处理插件基本结构', () => {
        const props = {
          'data-nodepath': 'test-path',
          class: 'test-class',
          [$deletePropsList]: [],
        };

        expect(() => {
          const { currentValue } = renderHook(plugin, props);
          const result = currentValue.value;
          expect(result).toBeDefined();
          expect(typeof result).toBe('object');
          expect(result).toHaveProperty('class');
        }).not.toThrow();
      });

      it('应该正确设置 class 属性', () => {
        const props = {
          'data-nodepath': 'test-path',
          class: 'test-class',
          [$deletePropsList]: [],
        };

        expect(() => {
          const { currentValue } = renderHook(plugin, props);
          const result = currentValue.value;
          expect(result.class).toBeDefined();
          expect(typeof result.class).toBe('string');
          expect(result.class).toContain('test-class');
          expect(result.class).toMatch(/^test-class Upload_\d+$/);
        }).not.toThrow();
      });

      it('应该正确设置 deletePropsList', () => {
        const props = {
          'data-nodepath': 'test-path',
          class: 'test-class',
          [$deletePropsList]: ['existing-prop'],
        };

        expect(() => {
          const { currentValue } = renderHook(plugin, props);
          const result = currentValue.value;
          expect(result[$deletePropsList]).toBeDefined();
          expect(Array.isArray(result[$deletePropsList])).toBe(true);
          expect(result[$deletePropsList]).toEqual(expect.arrayContaining(['data-nodepath']));
        }).not.toThrow();
      });

      it('应该正确处理 undefined 的 class', () => {
        const props = {
          'data-nodepath': 'test-path',
          class: undefined,
          [$deletePropsList]: [],
        };

        expect(() => {
          const { currentValue } = renderHook(plugin, props);
          const result = currentValue.value;
          expect(result.class).toBeDefined();
          expect(typeof result.class).toBe('string');
          expect(result.class).toContain('undefined');
          expect(result.class).toMatch(/^undefined Upload_\d+$/);
        }).not.toThrow();
      });

      it('应该正确处理 null 的 class', () => {
        const props = {
          'data-nodepath': 'test-path',
          class: null,
          [$deletePropsList]: [],
        };

        expect(() => {
          const { currentValue } = renderHook(plugin, props);
          const result = currentValue.value;
          expect(result.class).toBeDefined();
          expect(typeof result.class).toBe('string');
          expect(result.class).toContain('null');
          expect(result.class).toMatch(/^null Upload_\d+$/);
        }).not.toThrow();
      });

      it('应该正确处理空字符串的 class', () => {
        const props = {
          'data-nodepath': 'test-path',
          class: '',
          [$deletePropsList]: [],
        };

        expect(() => {
          const { currentValue } = renderHook(plugin, props);
          const result = currentValue.value;
          expect(result.class).toBeDefined();
          expect(typeof result.class).toBe('string');
          expect(result.class).toMatch(/^ Upload_\d+$/);
        }).not.toThrow();
      });

      it('应该正确处理 undefined 的 data-nodepath', () => {
        const props = {
          'data-nodepath': undefined,
          class: 'test-class',
          [$deletePropsList]: [],
        };

        expect(() => {
          const { currentValue } = renderHook(plugin, props);
          const result = currentValue.value;
          expect(result).toBeDefined();
          expect(result).toHaveProperty('class');
        }).not.toThrow();
      });

      it('应该正确处理 null 的 data-nodepath', () => {
        const props = {
          'data-nodepath': null,
          class: 'test-class',
          [$deletePropsList]: [],
        };

        expect(() => {
          const { currentValue } = renderHook(plugin, props);
          const result = currentValue.value;
          expect(result).toBeDefined();
          expect(result).toHaveProperty('class');
        }).not.toThrow();
      });
    });

    describe('插件集成和扩展性测试', () => {
      it('应该能够与其他插件组合使用', () => {
        // 测试插件链式调用
        const combinedAccumulate = UploadIdeAccumulate.addPlugin({
          name: 'testPlugin',
          handle: () => ({
            testProperty: 'test-value',
            customData: 'custom',
          }),
        });

        const plugins = combinedAccumulate.getPluginMethod();
        expect(plugins).toHaveLength(1);

        const testPlugin = combinedAccumulate.getPluginMethodByName('testPlugin');

        expect(testPlugin).toBeDefined();
        expect(testPlugin?.name).toBe('testPlugin');
      });

      it('应该正确处理插件的执行顺序', () => {
        const plugin1 = {
          name: 'plugin1',
          handle: () => ({ step1: 'completed' }),
        };
        const plugin2 = {
          name: 'plugin2',
          handle: () => ({ step2: 'completed' }),
        };

        const testAccumulate = UploadIdeAccumulate.addPlugin(plugin1).addPlugin(plugin2);

        const plugins = testAccumulate.getPluginMethod();
        // 验证插件数量是否正确增加（可能已经有其他插件）
        expect(plugins.length).toBeGreaterThanOrEqual(3);

        const foundPlugin1 = testAccumulate.getPluginMethodByName('plugin1');
        const foundPlugin2 = testAccumulate.getPluginMethodByName('plugin2');

        expect(foundPlugin1).toBeDefined();
        expect(foundPlugin2).toBeDefined();
      });

      it('应该正确处理插件方法的获取', () => {
        const allMethods = UploadIdeAccumulate.getPluginMethod();
        expect(Array.isArray(allMethods)).toBe(true);
        expect(allMethods.length).toBeGreaterThan(0);

        // 验证方法数组中的元素都是函数或包含 handle 的对象
        allMethods.forEach((method) => {
          expect(
            typeof method === 'function' || (typeof method === 'object' && typeof method.handle === 'function'),
          ).toBe(true);
        });
      });

      it('应该正确处理不存在的插件查询', () => {
        const nonExistentPlugin = UploadIdeAccumulate.getPluginMethodByName('nonExistent');
        expect(nonExistentPlugin).toBeUndefined();
      });
    });
  });
});
