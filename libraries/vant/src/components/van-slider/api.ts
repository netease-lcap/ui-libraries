/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    order: 1,
    ideusage: {
      idetype: 'element',
    },
  })
  @Component({
    title: '滑块',
    icon: 'slider',
    description: '通过拖动滑块在一个固定区间内进行选择',
    group: 'Form',
  })
  export class VanSlider<T, V, P extends nasl.core.Boolean, M extends nasl.core.Boolean, C> extends ViewComponent {
    constructor(options?: Partial<VanSliderOptions<T, V, P, M, C>>) {
      super();
    }
  }

  export class VanSliderOptions<
    T,
    V,
    P extends nasl.core.Boolean,
    M extends nasl.core.Boolean,
    C,
  > extends ViewComponentOptions {
    @Prop({
      group: '数据属性',
      title: '绑定值',
      sync: true,
      description: '滑块绑定值',
      setter: { concept: 'NumberInputSetter' },
    })
    modelValue: M extends true ? nasl.collection.List<nasl.core.Integer> : nasl.core.Integer;

    @Prop({
      group: '数据属性',
      title: '最小值',
      description: '滑块可设置的最小值',
      setter: { concept: 'NumberInputSetter' },
    })
    min: nasl.core.Integer = 0;

    @Prop({
      group: '数据属性',
      title: '最大值',
      description: '滑块可设置的最大值',
      setter: { concept: 'NumberInputSetter' },
    })
    max: nasl.core.Integer = 100;

    @Prop({
      group: '数据属性',
      title: '步长',
      description: '滑块步长',
      setter: { concept: 'NumberInputSetter' },
    })
    step: nasl.core.Integer = 1;

    @Prop({
      group: '主要属性',
      title: '禁用',
      description: '是否禁用滑块',
      setter: { concept: 'SwitchSetter' },
    })
    disabled: nasl.core.Boolean = false;

    @Prop<VanSliderOptions<T, V, P, M, C>, 'range'>({
      group: '主要属性',
      title: '范围选择',
      description: '是否为范围选择',
      setter: { concept: 'SwitchSetter' },
    })
    range: M;

    @Prop({
      group: '主要属性',
      title: '垂直模式',
      description: '是否为垂直模式',
      setter: { concept: 'SwitchSetter' },
    })
    vertical: nasl.core.Boolean = false;

    @Prop({
      group: '样式属性',
      title: '进度条高度',
      description: '进度条高度',
      setter: { concept: 'InputSetter' },
    })
    barHeight: nasl.core.String = '2px';

    @Prop({
      group: '样式属性',
      title: '进度条颜色',
      description: '滑块进度条颜色',
      setter: { concept: 'InputSetter' },
    })
    activeColor: nasl.core.String = '#1989fa';

    @Prop({
      group: '样式属性',
      title: '轨道颜色',
      description: '滑块轨道颜色',
      setter: { concept: 'InputSetter' },
    })
    inactiveColor: nasl.core.String = '#e5e5e5';

    @Prop({
      group: '样式属性',
      title: '滑块按钮大小',
      description: '滑块按钮大小',
      setter: { concept: 'NumberInputSetter' },
    })
    buttonSize: nasl.core.Integer = 24;

    @Prop({
      group: '主要属性',
      title: '只读',
      description: '只读状态下，滑块无法拖动',
      setter: { concept: 'SwitchSetter' },
    })
    readonly: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '反向',
      description: '是否反向',
      setter: { concept: 'SwitchSetter' },
    })
    reverse: nasl.core.Boolean = false;

    @Event({
      title: '值改变时',
      description: '值改变时触发（如果拖拽中，则只在松开鼠标后触发）',
    })
    onChange: (value: nasl.core.Integer | nasl.core.Integer[]) => void;

    @Event({
      title: '开始拖动时',
      description: '开始拖动时触发',
    })
    onDragStart: (event: TouchEvent) => void;

    @Event({
      title: '结束拖动时',
      description: '结束拖动时触发',
    })
    onDragEnd: (event: TouchEvent) => void;
  }

  @IDEExtraInfo({
    order: 2,
    ideusage: {
      idetype: 'container',
      displaySlotInline: {
        label: true,
      },
      extends: [
        {
          name: 'VanFormItem',
        },
        {
          name: 'VanSlider',
        },
      ],
    },
  })
  @Component({
    title: '表单滑块',
    icon: 'slider',
    description: '表单滑块，用于管理滑块',
  })
  export class VanFormSlider<T, V, P extends nasl.core.Boolean, M extends nasl.core.Boolean, C> extends ViewComponent {
    constructor(
      options?: Partial<
        VanFormSliderOptions<T, V, P, M, C> &
          VanFormItemOptions &
          Omit<VanSliderOptions<T, V, P, M, C>, keyof VanFormItemOptions>
      >,
    ) {
      super();
    }
  }

  export class VanFormSliderOptions<
    T,
    V,
    P extends nasl.core.Boolean,
    M extends nasl.core.Boolean,
    C,
  > extends VanSliderOptions<T, V, P, M, C> {}
}
