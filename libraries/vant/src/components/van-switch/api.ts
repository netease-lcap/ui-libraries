/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    order: 1,
    ideusage: {
      idetype: 'element',
      forceUpdateWhenAttributeChange: 'preview',
    },
  })
  @Component({
    title: '开关',
    icon: 'switch',
    description: '表示两种相互对立的状态间的切换，多用于触发「开/关」',
    group: 'Form',
  })
  export class VanSwitch extends ViewComponent {
    constructor(options?: Partial<VanSwitchOptions>) {
      super();
    }
  }

  export class VanSwitchOptions extends ViewComponentOptions {
    @Prop({
      group: '数据属性',
      title: '绑定值',
      sync: true,
      description: '开关绑定值',
    })
    modelValue: nasl.core.Boolean;

    @Prop({
      group: '主要属性',
      title: '禁用',
      description: '是否禁用开关',
      setter: { concept: 'SwitchSetter' },
    })
    disabled: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '加载状态',
      description: '是否显示加载中',
      setter: { concept: 'SwitchSetter' },
    })
    loading: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '尺寸',
      description: '开关尺寸',
      setter: { concept: 'NumberInputSetter' },
    })
    size: nasl.core.Integer;

    @Prop({
      group: '主要属性',
      title: '开启颜色',
      description: '开关开启时的颜色',
      setter: { concept: 'InputSetter' },
    })
    activeColor: nasl.core.String = '#1989fa';

    @Prop({
      group: '主要属性',
      title: '关闭颜色',
      description: '开关关闭时的颜色',
      setter: { concept: 'InputSetter' },
    })
    inactiveColor: nasl.core.String = '#dcdee0';

    @Event({
      title: '值改变时',
      description: '值改变时触发',
    })
    onChange: (value: nasl.core.Boolean | nasl.core.String | nasl.core.Integer) => void;

    @Event({
      title: '点击时',
      description: '点击时触发',
    })
    onClick: (event: {}) => void;
  }
} 