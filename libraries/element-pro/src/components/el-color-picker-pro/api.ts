/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    show: false,
  })
  @Component({
    title: '颜色选择器',
    icon: 'color-picker',
    description: '',
    group: 'Selector',
  })
  export class ElColorPickerPro extends ViewComponent {
    constructor(options?: Partial<ElColorPickerProOptions>) {
      super();
    }
  }

  export class ElColorPickerProOptions extends ViewComponentOptions {
    @Prop({
      group: '主要属性',
      title: 'Borderless',
      description: '无边框模式',
      setter: { concept: 'SwitchSetter' },
    })
    borderless: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: 'Clearable',
      description: '是否可清空',
      setter: { concept: 'SwitchSetter' },
    })
    clearable: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: 'Close Btn',
      description:
        '关闭按钮，值为 `true` 显示默认关闭按钮；值为 `false` 或 `undefined` 则不显示关闭按钮；值类型为函数，则表示自定义关闭按钮。',
      setter: { concept: 'InputSetter' },
    })
    closeBtn: any = true;

    @Prop({
      group: '主要属性',
      title: 'Color Modes',
      description:
        '颜色模式选择。同时支持单色和渐变两种模式，可仅使用单色或者渐变其中一种模式，也可以同时使用。`monochrome` 表示单色，`linear-gradient` 表示渐变色。',
      setter: { concept: 'InputSetter' },
    })
    colorModes: any[] = ['monochrome', 'linear-gradient'];

    @Prop({
      group: '主要属性',
      title: 'Disabled',
      description: '是否禁用组件',
      setter: { concept: 'SwitchSetter' },
    })
    disabled: nasl.core.Boolean;

    @Prop({
      group: '主要属性',
      title: 'Enable Alpha',
      description: '是否开启透明通道',
      setter: { concept: 'SwitchSetter' },
    })
    enableAlpha: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: 'Enable Multiple Gradient',
      description:
        '是否允许开启通过点击渐变轴增加渐变梯度，默认开启，关闭时只会存在起始和结束两个颜色',
      setter: { concept: 'SwitchSetter' },
    })
    enableMultipleGradient: nasl.core.Boolean = true;

    @Prop({
      group: '主要属性',
      title: 'Format',
      description:
        '格式化色值。`enableAlpha` 为真时，`RGBA/HSLA/HSVA` 等值有效。可选项：RGB/RGBA/HSL/HSLA/HSB/HSV/HSVA/HEX/CMYK/CSS',
      setter: {
        concept: 'EnumSelectSetter',
        options: [
          { title: 'RGB' },
          { title: 'RGBA' },
          { title: 'HSL' },
          { title: 'HSLA' },
          { title: 'HSB' },
          { title: 'HSV' },
          { title: 'HSVA' },
          { title: 'HEX' },
          { title: 'CMYK' },
          { title: 'CSS' },
        ],
      },
    })
    format:
      | 'RGB'
      | 'RGBA'
      | 'HSL'
      | 'HSLA'
      | 'HSB'
      | 'HSV'
      | 'HSVA'
      | 'HEX'
      | 'CMYK'
      | 'CSS' = 'RGB';

    @Prop({
      group: '主要属性',
      title: 'Input Props',
      description: '透传 Input 输入框组件全部属性。',
      setter: { concept: 'InputSetter' },
    })
    inputProps: object;

    @Prop({
      group: '主要属性',
      title: 'Multiple',
      description: '【开发中】是否允许选中多个颜色',
      setter: { concept: 'SwitchSetter' },
    })
    multiple: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: 'Popup Props',
      description:
        '透传 Popup 组件全部属性，如 `placement` `overlayStyle` `overlayClassName` `trigger`等。',
      setter: { concept: 'InputSetter' },
    })
    popupProps: object;

    @Prop({
      group: '主要属性',
      sync: true,
      title: 'Recent Colors',
      description:
        '最近使用的颜色。值为 [] 表示以组件内部的“最近使用颜色”为准，值长度大于 0 则以该值为准显示“最近使用颜色”。值为 null 则完全不显示“最近使用颜色”。支持语法糖 `.sync`。',
      setter: { concept: 'InputSetter' },
    })
    recentColors: any[] = [];

    @Prop({
      group: '主要属性',
      title: 'Default Recent Colors',
      description:
        '最近使用的颜色。值为 [] 表示以组件内部的“最近使用颜色”为准，值长度大于 0 则以该值为准显示“最近使用颜色”。值为 null 则完全不显示“最近使用颜色”。非受控属性。',
      setter: { concept: 'InputSetter' },
    })
    defaultRecentColors: any[] = [];

    @Prop({
      group: '主要属性',
      title: 'Select Input Props',
      description: '透传 SelectInputProps 筛选器输入框组件全部属性。',
      setter: { concept: 'InputSetter' },
    })
    selectInputProps: object;

    @Prop({
      group: '主要属性',
      title: 'Show Primary Color Preview',
      description: '是否展示颜色选择条右侧的颜色预览区域',
      setter: { concept: 'SwitchSetter' },
    })
    showPrimaryColorPreview: nasl.core.Boolean = true;

    @Prop({
      group: '主要属性',
      title: 'Size',
      description: '组件尺寸。可选项：small/medium/large。',
      setter: {
        concept: 'EnumSelectSetter',
        options: [
          { title: 'small' },
          { title: 'medium' },
          { title: 'large。TS 类型：`SizeEnum`。[通用类型定义](https:' },
          { title: '' },
          { title: 'github.com' },
          { title: 'Tencent' },
          { title: 'tdesign-vue' },
          { title: 'blob' },
          { title: 'develop' },
          { title: 'src' },
          { title: 'common.ts)' },
        ],
      },
    })
    size:
      | 'small'
      | 'medium'
      | 'large。TS 类型：`SizeEnum`。[通用类型定义](https:'
      | ''
      | 'github.com'
      | 'Tencent'
      | 'tdesign-vue'
      | 'blob'
      | 'develop'
      | 'src'
      | 'common.ts)' = 'medium';

    @Prop({
      group: '主要属性',
      title: 'Swatch Colors',
      description:
        '系统预设的颜色样例，值为 `null` 或 `[]` 则不显示系统色，值为 `undefined` 会显示组件内置的系统默认色。',
      setter: { concept: 'InputSetter' },
    })
    swatchColors: any[];

    @Prop({
      group: '主要属性',
      title: 'Value',
      description: '色值。支持语法糖 `v-model`',
      setter: { concept: 'InputSetter' },
    })
    value: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: 'Default Value',
      description: '色值。非受控属性',
      setter: { concept: 'InputSetter' },
    })
    defaultValue: nasl.core.String;

    @Event({
      title: 'On Change',
      description:
        '选中的色值发生变化时触发，第一个参数 `value` 表示新色值，`context.color` 表示当前调色板控制器的色值，`context.trigger` 表示触发颜色变化的来源。',
    })
    onChange: (event: any) => any;

    @Event({
      title: 'On Palette Bar Change',
      description:
        '调色板控制器的值变化时触发，`context.color` 指调色板控制器的值。',
    })
    onPaletteBarChange: (event: any) => any;

    @Event({
      title: 'On Recent Colors Change',
      description: '最近使用颜色发生变化时触发',
    })
    onRecentColorsChange: (event: any) => any;

    @Slot({
      title: 'Close Btn',
      description:
        '关闭按钮，值为 `true` 显示默认关闭按钮；值为 `false` 或 `undefined` 则不显示关闭按钮；值类型为函数，则表示自定义关闭按钮。',
    })
    slotCloseBtn: () => Array<ViewComponent>;
  }
}
