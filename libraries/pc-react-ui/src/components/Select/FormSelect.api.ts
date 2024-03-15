/// <reference types="@nasl/types" />

namespace nasl.ui {
  @Component({
    title: '表单选择器',
    description: '表单选择器',
  })
  export class FormSelect<T, V, P extends boolean, M extends boolean, C extends string> extends ViewComponent {
    constructor(options?: Partial<FormSelectOptions<T, V, P, M, C>>) {
      super();
    }
  }

  export class FormSelectOptions<T, V, P extends boolean, M extends boolean, C extends string> extends ViewComponentOptions {
    @Prop({
      group: '主要属性',
      title: '标题',
      docDescription: '选择分组的标题，标题只有在没有文本插槽的时候生效',
    })
    title: nasl.core.String;

    @Prop({
      title: '字段名称',
      description: '表单项名称。',
    })
    name: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '占据数',
      description: '列跨越的格数',
      docDescription: '列跨越的格数。',
      setter: {
        concept: 'NumberInputSetter',
      },
    })
    span: nasl.core.Decimal = 24;

    @Prop({
      group: '主要属性',
      title: '必填标记',
      description: '是否必填。仅显示样式，如果要验证必填项，需要在`rules`中添加必填规则。',
      docDescription: '是否必填。仅显示样式，如果要验证必填项，需要在rules中添加必填规则。',
      setter: {
        concept: 'SwitchSetter',
      },
    })
    required: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '释义提示',
      description: '鼠标悬浮标签后的图标显示释义提示信息',
      docDescription: '默认提示消息。',
    })
    tooltip: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '验证规则',
      description: '验证规则。简写格式为字符串类型，完整格式或混合格式为数组类型',
      docDescription: '验证规则。简写格式为字符串类型，完整格式或混合格式为数组类型，详见[验证规则](#验证规则)。',
      bindHide: true,
    })
    rules: nasl.core.String;
  }
}
