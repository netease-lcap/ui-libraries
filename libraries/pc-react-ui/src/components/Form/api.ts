/// <reference types="@nasl/types" />

namespace nasl.ui {
  @Component({
    title: '表单',
    icon: 'form',
    description:
      '具有数据收集、校验和提交功能的表单，包含输入框、选择框、复选框、单选框等元素。',
    group: 'Form',
  })
  export class Form extends ViewComponent {
    @Method({
      title: 'undefined',
      description: '手动验证。',
    })
    validate(): any {}

    @Method({
      title: 'undefined',
      description: '获取表单值。',
    })
    getValues(): any {}

    @Method({
      title: '获取表单值',
      description: '获取表单值。',
    })
    getValue(
      @Param({
        title: 'undefined',
        description: '表单项的 name',
      })
      name: nasl.core.String,
    ): any {}
    @Method({
      title: 'undefined',
      description: '获取表单值。',
    })
    setValue(
      @Param({
        title: 'undefined',
        description: '表单项的 name',
      })
      name: nasl.core.String,
      @Param({
        title: 'undefined',
        description: '表单值',
      })
      value: any,
    ): any {}

    @Method({
      title: 'undefined',
      description: '设置表单值。',
    })
    setValues(
      @Param({
        title: 'undefined',
        description: '表单项的 name',
      })
      values: Record<string, string>,
    ): any {}
    // @Method({
    //   title: 'undefined',
    //   description: '验证表单中的某一项，已废弃。表单中的项是嵌套的，用 name 层级较深，而且可能有重名。',
    // })
    // validateItem(
    //   @Param({
    //     title: 'undefined',
    //     description: '表单项的 name',
    //   })
    //   name: nasl.core.String,
    //   @Param({
    //     title: 'undefined',
    //     description: '触发方式，可选值：`submit`、`blur`和`input`之一，或者它们的任意组合。',
    //   })
    //   trigger: nasl.core.String = 'submit',
    //   @Param({
    //     title: 'undefined',
    //     description: '是否验证后无提示',
    //   })
    //   muted: nasl.core.Boolean = false,
    // ): any {}
    constructor(options?: Partial<FormOptions>) {
      super();
    }
  }

  export class FormOptions extends ViewComponentOptions {
    @Prop({
      title: '数据模型',
      description: '表单数据模型',
    })
    private model: object;

    @Prop({
      title: '表单尺寸',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '小' }, { title: '正常' }],
      },
    })
    private size: 'small' | 'normal' = 'normal';

    @Prop({
      group: '主要属性',
      title: '验证规则',
      description:
        '验证规则。简写格式为字符串类型，完整格式或混合格式为数组类型',
      tooltipLink:
        'https://help.lcap.163yun.com/99.%E5%8F%82%E8%80%83/40.%E9%A1%B5%E9%9D%A2IDE/30.%E9%A1%B5%E9%9D%A2%E7%BB%84%E4%BB%B6/05.PC%E9%A1%B5%E9%9D%A2%E5%9F%BA%E7%A1%80%E7%BB%84%E4%BB%B6/06.%E8%A1%A8%E5%8D%95/121.%E8%A1%A8%E5%8D%95.html',
      docDescription:
        '验证规则。简写格式为字符串类型，完整格式或混合格式为数组类型，详见[验证规则](#验证规则)。',
      bindHide: true,
    })
    private rules: object;

    @Prop<FormOptions, 'layout'>({
      group: '主要属性',
      title: '表单布局',
      docDescription:
        '更改表单的布局方式。行内展示，标签与表单项在一行展示。块级展示，宽度会充满父元素。栅格展示，可设置列数。',
      setter: {
        concept: 'EnumSelectSetter',
        // options: [{ title: '行内展示' }, { title: '块级展示，宽度会充满父元素' }, { title: '栅格展示，可设置列数' }],
        options: [
          { title: '行内展示' },
          { title: '水平展示' },
          { title: '竖向展示' },
        ],
      },
      onChange: [{ clear: ['repeat'] }],
    })
    layout: 'inline' | 'horizontal' | 'vertical' = 'horizontal';

    @Prop({
      group: '样式属性',
      title: '栅格水平间隔',
      description: '栅格列之间的间隔',
      docDescription:
        '栅格列之间的间隔，支持无（0）、迷你（4）、小（8）、正常（16）、巨大（32）共6种间隔模式。',
      setter: {
        concept: 'NumberInputSetter',
      },
    })
    gutterJustify: nasl.core.Decimal = 0;

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

    // @Prop({
    //   group: '样式属性',
    //   title: '控件布局',
    //   description: '入控件设置布局样式',
    //   docDescription: '入控件设置布局样式',
    //   setter: {
    //     max: 24,
    //     min: 0,
    //     concept: 'NumberInputSetter',
    //   },
    // })
    // wrapperColSpan?: nasl.core.Decimal = undefined;

    @Prop({
      group: '样式属性',
      title: '栅格垂直间隔',
      description: '栅格列之间的间隔',
      docDescription:
        '栅格列之间的间隔，支持无（0）、迷你（4）、小（8）、正常（16）、巨大（32）共6种间隔模式。',
      setter: {
        concept: 'NumberInputSetter',
      },
    })
    gutterAlign: nasl.core.Decimal = 0;

    @Prop({
      group: '样式属性',
      title: '表单项栅格数',
      description: '表单项栅格数',
      docDescription: '表单项栅格数',
      setter: {
        min: 0,
        max: 24,
        concept: 'NumberInputSetter',
      },
    })
    span: nasl.core.Decimal = 0;

    // @Prop<FormOptions, 'justify'>({
    //   group: '主要属性',
    //   title: '主轴对齐',
    //   docDescription: `设置元素在主轴方向上的对齐方式	：支持左对齐、居中对齐、右对齐、平均分布（两端不留空）、平均分布，。 `,
    //   bindHide: true,
    //   setter: {
    //     concept: 'CapsulesSetter',
    //     options: [
    //       {
    //         title: '左对齐',
    //         icon: 'horizontal-justify-start',
    //         tooltip: '左对齐',
    //       },
    //       {
    //         title: '居中对齐',
    //         icon: 'horizontal-justify-center',
    //         tooltip: '居中对齐',
    //       },
    //       {
    //         title: '右对齐',
    //         icon: 'horizontal-justify-end',
    //         tooltip: '右对齐',
    //       },
    //       {
    //         title: '平均分布(两端不留空)',
    //         icon: 'horizontal-justify-space-between',
    //         tooltip: '平均分布(两端不留空)',
    //       },
    //       {
    //         title: '平均分布',
    //         icon: 'horizontal-justify-space-around',
    //         tooltip: '平均分布',
    //       },
    //     ],
    //   },
    //   tabKind: 'style',
    // })
    // justify: 'start' | 'center' | 'end' | 'space-between' | 'space-around' =
    //   'start';

    // @Prop<FormOptions, 'alignment'>({
    //   group: '主要属性',
    //   title: '交叉轴对齐',
    //   docDescription: `设置元素在交叉轴方向上的对齐方式：支持顶对齐、垂直居中、底对齐、行内文字基线对齐、占满容器高度。`,
    //   bindHide: true,
    //   setter: {
    //     concept: 'CapsulesSetter',
    //     options: [
    //       {
    //         title: '顶对齐',
    //         icon: 'horizontal-alignment-start',
    //         tooltip: '顶对齐',
    //       },
    //       {
    //         title: '垂直居中',
    //         icon: 'horizontal-alignment-center',
    //         tooltip: '垂直居中',
    //       },
    //       {
    //         title: '底对齐',
    //         icon: 'horizontal-alignment-end',
    //         tooltip: '底对齐',
    //       },
    //       {
    //         title: '行内文字基线对齐',
    //         icon: 'horizontal-alignment-baseline',
    //         tooltip: '行内文字基线对齐',
    //       },
    //       {
    //         title: '占满容器高度',
    //         icon: 'horizontal-alignment-stretch',
    //         tooltip: '占满容器高度',
    //       },
    //     ],
    //   },
    //   tabKind: 'style',
    // })
    // alignment: 'start' | 'center' | 'end' | 'baseline' | 'stretch' = 'stretch';

    // @Prop<FormOptions, 'wrap'>({
    //   group: '主要属性',
    //   title: '换行',
    //   description: '设置弹性布局下子元素总宽度超出父级时子元素是否换行展示',
    //   docDescription:
    //     '支持控制弹性布局模式下，子元素总宽度超过父级时是否换行展示，默认开启。',
    //   setter: {
    //     concept: 'EnumSelectSetter',
    //     options: [{ title: '换行' }, { title: '不换行' }],
    //   },
    //   tabKind: 'style',
    // })
    // wrap: 'wrap' | 'nowrap' = 'wrap';

    @Prop({
      group: '状态属性',
      title: '使用默认提交',
      description: '显示预览态',
      docDescription: '',
      setter: {
        concept: 'SwitchSetter',
      },
    })
    submitter: nasl.core.Boolean = true;
    // @Prop({
    //   group: '主要属性',
    //   title: '标签布局',
    //   docDescription: '设置标签布局方式。行内展示；块级展示，标签与单项分行展示- ',
    //   setter: {
    //     concept: 'EnumSelectSetter',
    //     options: [{ title: '行内展示' }, { title: '水平展示' }, { title: '竖向展示' }],
    //   },
    // })
    // labelLayout: 'inline' | 'horizontal' | 'vertical' = 'inline';

    // @Prop({
    //   group: '主要属性',
    //   title: '标签过长省略',
    //   description: '文字过长是否省略显示。默认文字超出时会换行。',
    //   docDescription: '文字过长是否省略显示，默认文字超出时会换行。',
    //   setter: {
    //     concept: 'SwitchSetter',
    //   },
    // })
    // labelEllipsis: nasl.core.Boolean = false;

    //     @Prop({
    //       group: '交互属性',
    //       title: '可折叠',
    //       description: '设置是否可以展开/折叠',
    //       docDescription: '分组是否可以折叠。',
    //       setter: {
    //         concept: 'SwitchSetter',
    //       },
    //     })
    //     collapsible: nasl.core.Boolean = false;

    //     @Prop({
    //       group: '交互属性',
    //       title: '手风琴模式',
    //       description: '设置是否每次只展开一个',
    //       docDescription: '是否每次只会展开一个分组。',
    //       setter: {
    //         concept: 'SwitchSetter',
    //       },
    //     })
    //     accordion: nasl.core.Boolean = false;

    //     @Prop({
    //       group: '交互属性',
    //       title: '展开触发方式',
    //       description: '展开/折叠操作的触发方式',
    //       docDescription: `展开/折叠的触发方式。
    // - 整行点击均可触发。
    // - 仅点击小箭头时触发。`,
    //       setter: {
    //         concept: 'EnumSelectSetter',
    //         options: [{ title: '整行点击均可触发' }, { title: '仅点击小箭头时触发' }],
    //       },
    //     })
    //     expandTrigger: 'click' | 'click-expander' = 'click';

    // @Prop<FormOptions, 'gapWidth'>({
    //   group: '样式属性',
    //   title: '列间隔',
    //   description: '设置表单列间隔大小',
    //   docDescription: '设置表单项间隔大小。支持无、小、正常、大四个级别，此项需要设置表单布局为“行内展示”。',
    //   setter: {
    //     concept: 'EnumSelectSetter',
    //     options: [{ title: '无' }, { title: '小' }, { title: '正常' }, { title: '大' }],
    //   },
    //   if: (_) => _.layout === 'inline',
    // })
    // gapWidth: 'none' | 'small' | 'normal' | 'large' = 'normal';

    // @Prop({
    //   group: '样式属性',
    //   title: '行间隔',
    //   description: '设置表单行间隔大小',
    //   docDescription: '设置表单行间隔大小。支持无、小、正常、大四个级别。',
    //   setter: {
    //     concept: 'EnumSelectSetter',
    //     options: [{ title: '无' }, { title: '小' }, { title: '正常' }, { title: '大' }],
    //   },
    // })
    // gapHeight: 'none' | 'small' | 'normal' | 'large' = 'normal';

    // @Prop<FormOptions, 'labelSize'>({
    //   group: '样式属性',
    //   title: '标签宽度',
    //   docDescription: '设置标签宽度。支持迷你、小、正常、大四个级别。',
    //   setter: {
    //     concept: 'EnumSelectSetter',
    //     options: [{ title: '迷你' }, { title: '小' }, { title: '正常' }, { title: '大' }],
    //   },
    //   if: (_) => _.labelLayout === 'inline',
    // })
    // labelSize: 'mini' | 'small' | 'normal' | 'large' = 'normal';

    @Event({
      title: '表单值改变',
      description: '表单值改变后',
    })
    onValuesChange: (changedValues: any, allValues: any) => any;

    @Event({
      title: '提交表单且数据验证成功后',
      description: '验证时触发',
    })
    onFinish: (value: any) => any;

    @Event({
      title: '提交表单且数据验证失败后',
      description: '验证时触发',
    })
    onFinishFailed: (value: any) => any;

    @Slot({
      title: 'undefined',
      description: '插入`<FormItem>`子组件。',
      emptyBackground: 'add-sub-large',
      snippets: [
        // {
        //   title: '表单分组',
        //   code: '<u-form-group><template #title><u-text text="分组"></u-text></template><u-form-item><template #label><u-text text="表单项"></u-text></template></u-form-item></u-form-group>',
        // },
        {
          title: '表单项',
          code: '<FormItem label={<Text children="表单项"></Text>}></FormItem>',
        },
      ],
    })
    slotDefault: () => Array<FormItem>;
  }

  //   @Event({
  //     title: '展开折叠后',
  //     description: '展开/折叠某分组时触发',
  //   })
  //   onToggle: (event: { expanded: nasl.core.Boolean }) => any;

  // @Component({
  //   title: '表单分组',
  //   description: '展开折叠前',
  // })
  // export class UFormGroup extends ViewComponent {
  //   constructor(options?: Partial<UFormGroupOptions>) {
  //     super();
  //   }
  // }

  // export class UFormGroupOptions extends ViewComponentOptions {
  //   @Prop({
  //     group: '主要属性',
  //     title: '标题',
  //     docDescription: '显示的标题。',
  //   })
  //   title: nasl.core.String;

  //   @Prop({
  //     group: '主要属性',
  //     title: '列数',
  //     description: '整个表单的划分列数',
  //     docDescription: '整个表单的划分列数。',
  //     setter: {
  //       concept: 'NumberInputSetter',
  //     },
  //   })
  //   repeat: nasl.core.Decimal = 1;

  //   @Prop({
  //     group: '主要属性',
  //     title: '标签布局',
  //     docDescription: '设置标签布局方式。行内展示、块级展示，标签与表单项分行展示。',
  //     setter: {
  //       concept: 'EnumSelectSetter',
  //       options: [{ title: '行内展示' }, { title: '块级展示，标签与表单项分行展示' }],
  //     },
  //   })
  //   labelLayout: 'inline' | 'block' = 'inline';

  //   @Prop({
  //     group: '主要属性',
  //     title: '标签过长省略',
  //     description: '文字过长是否省略显示。默认文字超出时会换行。',
  //     docDescription: '文字过长是否省略显示。默认文字超出时会换行。',
  //     setter: {
  //       concept: 'SwitchSetter',
  //     },
  //   })
  //   labelEllipsis: nasl.core.Boolean = false;

  //   @Prop({
  //     group: '交互属性',
  //     title: '可折叠',
  //     description: '设置是否可以展开/折叠',
  //     docDescription: '分组是否可以折叠。',
  //     setter: {
  //       concept: 'SwitchSetter',
  //     },
  //   })
  //   collapsible: nasl.core.Boolean = false;

  //   @Prop({
  //     group: '状态属性',
  //     title: '展开状态',
  //     description: '展开状态分为“True(展开)/False(折叠)”，默认为“展开”',
  //     sync: true,
  //     docDescription: '绑定展开/折叠状态的值',
  //     setter: {
  //       concept: 'SwitchSetter',
  //     },
  //   })
  //   expanded: nasl.core.Boolean = false;

  //   @Prop({
  //     group: '状态属性',
  //     title: '禁用',
  //     description: '置灰显示，且禁止展开/折叠操作',
  //     docDescription: '置灰显示，且禁止任何交互（焦点、点击、选择、输入等）',
  //     setter: {
  //       concept: 'SwitchSetter',
  //     },
  //   })
  //   disabled: nasl.core.Boolean = false;

  // @Event({
  //   title: '展开折叠前',
  //   description: '展开/折叠此分组前触发',
  // })
  // onBeforeToggle: (event: { expanded: nasl.core.Boolean }) => any;
  //   @Event({
  //     title: '展开折叠后',
  //     description: '展开/折叠某分组时触发',
  //   })
  //   onToggle: (event: { expanded: nasl.core.Boolean }) => any;

  //   @Slot({
  //     title: 'undefined',
  //     description: '插入`<u-form-item>`或`<u-form-divider>`子组件。',
  //     snippets: [
  //       {
  //         title: '表单项',
  //         code: '<u-form-item><template #label><u-text text="表单项"></u-text></template></u-form-item>',
  //       },
  //     ],
  //   })
  //   slotDefault: () => Array<FormItem>;

  //   @Slot({
  //     title: 'undefined',
  //     description: '自定义标题文本。',
  //   })
  //   slotTitle: () => Array<ViewComponent>;

  //   @Slot({
  //     title: 'undefined',
  //     description: '在右侧可以附加内容。',
  //   })
  //   slotExtra: () => Array<ViewComponent>;
  // }
}
