/// <reference types="@nasl/types" />

namespace nasl.ui {
  @Component({
    title: '表单项',
    description: '表单项',
  })
  export class FormItemProps extends ViewComponent {
    constructor(options?: Partial<FormItemOptions>) {
      super();
    }
  }

  export class FormItemPropsOptions extends ViewComponentOptions {
    @Prop({
      group: '基础信息',
      title: '标题自定义',
      description: '开启标题自定义后,标题去会变成插槽,可以自由拖入组件定义标题',
      docDescription:
        '开启标题自定义后,标题去会变成插槽,可以自由拖入组件定义标题',
      setter: {
        concept: 'SwitchSetter',
      },
    })
    labelIsSlot: nasl.core.Boolean = false;

    @Prop<FormItemPropsOptions, 'labelText'>({
      group: '基础信息',
      title: '标题',
      docDescription: '选择分组的标题，标题只有在没有文本插槽的时候生效',
      if: (_) => _.labelIsSlot === false,
    })
    labelText: nasl.core.String = '表单项名称';

    @Prop({
      group: '基础信息',
      title: '字段名称',
      description: '表单项名称。',
    })
    name: nasl.core.String;

    @Prop({
      title: '验证是否静默',
      description: '验证是否静默',
      setter: {
        concept: 'EnumSelectSetter',
        options: [
          { title: '只静默消息提示' },
          { title: '同时静默消息提示和红框提示' },
          { title: '不作处理' },
        ],
      },
    })
    private muted: 'message' | 'all' | 'none' = 'none';

    @Prop({
      title: '验证前预处理',
      description: '验证前对值进行预处理',
    })
    private validatingProcess: Function;

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
      description:
        '是否必填。仅显示样式，如果要验证必填项，需要在`rules`中添加必填规则。',
      docDescription:
        '是否必填。仅显示样式，如果要验证必填项，需要在rules中添加必填规则。',
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
      description:
        '验证规则。简写格式为字符串类型，完整格式或混合格式为数组类型',
      docDescription:
        '验证规则。简写格式为字符串类型，完整格式或混合格式为数组类型，详见[验证规则](#验证规则)。',
      bindHide: true,
    })
    rules: nasl.core.String;

    @Prop({
      group: '样式属性',
      title: '尺寸',
      description: '设置表单项大小',
      docDescription: '设置表单项大小',
      setter: {
        concept: 'EnumSelectSetter',
        options: [
          { title: '超小' },
          { title: '小' },
          { title: '正常' },
          { title: '大' },
          { title: '超大' },
          { title: '充满' },
        ],
      },
    })
    width: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '100%';

    @Prop({
      group: '样式属性',
      title: '标签宽度',
      description: '标签宽度',
      docDescription: '标签宽度',
      setter: {
        concept: 'NumberInputSetter',
      },
    })
    labelWidth?: nasl.core.Decimal = undefined;

    @Prop({
      group: '样式属性',
      title: '标签布局',
      description: '标签布局',
      docDescription: '标签布局',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '左对齐' }, { title: '右对齐' }],
      },
    })
    labelAlign?: 'left' | 'right' = 'right';
    @Prop({
      group: '样式属性',
      title: '是否显示冒号',
      description:
        '是否显示冒号',
      setter: {
        concept: 'SwitchSetter',
      },
    })
    colon: nasl.core.Boolean = true;

    @Slot({
      title: '标签自定义',
      description: '插入自定义标签，代替`label`属性。',
    })
    slotLabel: () => Array<ViewComponent>;

    @Slot({
      title: '描述自定义',
      description: '插入自定义描述内容，代替`description`属性。',
    })
    slotDescription: () => Array<ViewComponent>;

    @Slot({
      title: '附加内容',
      description: '自定义标签右侧额外内容。',
    })
    slotExtra: () => Array<ViewComponent>;
  }
}
