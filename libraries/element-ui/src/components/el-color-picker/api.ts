/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
  })
  @Component({
    title: '颜色选择器',
    icon: 'color-picker',
    description: '用于颜色选择，支持多种格式。',
    group: 'Selector',
  })
  export class ElColorPicker extends ViewComponent {
    constructor(options?: Partial<ElColorPickerOptions>) {
      super();
    }
  }

  export class ElColorPickerOptions extends ViewComponentOptions {
    @Prop({
      group: '数据属性',
      sync: true,
      title: '绑定值',
      description: '绑定值',
      setter: { concept: 'InputSetter' },
    })
    value: nasl.core.String;

    @Prop({
      group: '状态属性',
      title: '是否禁用',
      description: '是否禁用',
      setter: { concept: 'SwitchSetter' },
    })
    disabled: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '尺寸',
      description: '尺寸',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '中等' }, { title: '小型' }, { title: '迷你' }],
      },
    })
    size: 'medium' | 'small' | 'mini';

    @Prop({
      group: '状态属性',
      title: '是否支持透明度选择',
      description: '是否支持透明度选择',
      setter: { concept: 'SwitchSetter' },
    })
    showAlpha: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '颜色的格式',
      description: '写入 v-model 的颜色的格式',
      setter: {
        concept: 'EnumSelectSetter',
        options: [
          { title: 'hsl' },
          { title: 'hsv' },
          { title: 'hex' },
          { title: 'rgb' },
        ],
      },
    })
    colorFormat: 'hsl' | 'hsv' | 'hex' | 'rgb';

    @Prop({
      group: '样式属性',
      title: '下拉框的类名',
      description: 'ColorPicker 下拉框的类名',
      setter: { concept: 'InputSetter' },
    })
    popperClass: nasl.core.String;

    @Prop({
      group: '样式属性',
      title: '预定义颜色',
      description: '预定义颜色',
      setter: { concept: 'InputSetter' },
    })
    predefine: nasl.collection.List<nasl.core.String>;

    @Event({
      title: '值变化时',
      description: '当绑定值变化时触发',
    })
    onChange: (event: any) => any;

    @Event({
      title: '颜色变化时',
      description: '面板中当前显示的颜色发生改变时触发',
    })
    onActiveChange: (event: any) => any;
  }
}
