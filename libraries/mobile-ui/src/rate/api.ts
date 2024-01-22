/// <reference types="@nasl/types" />

namespace nasl.ui {
  @Component({
    title: '评分',
    icon: 'rate',
    description: '用于对事物进行评级操作。',
    group: "Display"
  })
  export class VanRate extends ViewComponent {
    constructor(options?: Partial<VanRateOptions>) {
      super();
    }
  }
  export class VanRateOptions extends ViewComponentOptions {
    @Prop({
      group: '数据属性',
      title: '值',
      description: '用于标识评分的值',
      sync: true,
      setter: {
        concept: "NumberInputSetter",
        min: 0
      }
    })
    value: nasl.core.Decimal;
    @Prop({
      group: '数据属性',
      title: '图标总数',
      description: '设置评分图标的总数'
    })
    count: nasl.core.Integer = 5;
    @Prop({
      group: '主要属性',
      title: '选中时的图标名称或图片链接',
      setter: {
        concept: "IconSetter"
      }
    })
    icon: nasl.core.String;
    @Prop({
      group: '主要属性',
      title: '未选中时的图标名称或图片链接',
      setter: {
        concept: "IconSetter"
      }
    })
    voidIcon: nasl.core.String;
    @Prop({
      group: '交互属性',
      title: '半选',
      description: '是否支持半选',
      setter: {
        concept: "SwitchSetter"
      }
    })
    allowHalf: nasl.core.Boolean = false;
    @Prop({
      group: '状态属性',
      title: '只读',
      description: '正常显示，但禁止选择/输入',
      setter: {
        concept: "SwitchSetter"
      }
    })
    readonly: nasl.core.Boolean = false;
    @Prop({
      group: '状态属性',
      title: '禁用',
      description: '置灰显示，且禁止任何交互（焦点、点击、选择、输入等）',
      setter: {
        concept: "SwitchSetter"
      }
    })
    disabled: nasl.core.Boolean = false;
    @Prop({
      group: '样式属性',
      title: '图标大小',
      description: '设置图标大小，单位为px。',
      setter: {
        concept: "NumberInputSetter",
      }
    })
    size: nasl.core.Decimal = 20;
    @Prop({
      group: '样式属性',
      title: '图标间距',
      description: '设置图标间距，最小值为0。',
      setter: {
        concept: "NumberInputSetter",
      }
    })
    gutter: nasl.core.Decimal = 4;
    @Prop({
      group: '样式属性',
      title: '选中颜色'
    })
    color: nasl.core.String;
    @Prop({
      group: '样式属性',
      title: '未选中颜色'
    })
    voidColor: nasl.core.String;
    @Prop({
      group: '样式属性',
      title: '禁用颜色'
    })
    disabledColor: nasl.core.String;
    @Event({
      title: '分值变化时',
      description: '分值变化时'
    })
    onChange: (event: nasl.core.Decimal) => any ;
  }
}
