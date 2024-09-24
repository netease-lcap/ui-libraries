/// <reference types="@nasl/types" />

namespace nasl.ui {
  @Component({
    title: '查询表单',
    description:
      '具有数据收集、校验和提交功能的表单，包含输入框、选择框、复选框、单选框等元素。',
  })
  export class QueryForm extends ViewComponent {
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
    constructor(options?: Partial<QueryFormOptions>) {
      super();
    }
  }

  export class QueryFormOptions extends ViewComponentOptions {
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

    @Prop<QueryFormOptions, 'layout'>({
      group: '主要属性',
      title: '表单布局',
      docDescription:
        '更改表单的布局方式。行内展示，标签与表单项在一行展示。块级展示，宽度会充满父元素。栅格展示，可设置列数。',
      setter: {
        concept: 'EnumSelectSetter',
        // options: [{ title: '行内展示' }, { title: '块级展示，宽度会充满父元素' }, { title: '栅格展示，可设置列数' }],
        options: [
          { title: '水平展示' },
          { title: '竖向展示' },
        ],
      },
      onChange: [{ clear: ['repeat'] }],
    })
    layout:  'horizontal' | 'vertical' = 'horizontal';

 

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
      title: '显示的表单控件数量',
      description:
        '自定义折叠状态下默认显示的表单控件数量，没有设置或小于 0，则显示一行控件；数量大于等于控件数量则隐藏展开按钮	',
      docDescription:
        '自定义折叠状态下默认显示的表单控件数量，没有设置或小于 0，则显示一行控件；数量大于等于控件数量则隐藏展开按钮	',
      setter: {
        concept: 'NumberInputSetter',
      },
    })
    defaultColsNumber?: nasl.core.Decimal = undefined;

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

    @Prop({
      group: '交互属性',
      title: '超出是否折叠',
      description: '默认状态下是否折叠超出的表单项',
      docDescription: `默认状态下是否折叠超出的表单项`,
      setter: {
        concept: 'SwitchSetter',
      },
    })
    defaultCollapsed: nasl.core.Boolean = true;

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
      // emptyBackground: 'add-sub-large',
      snippets: [
        {
          title: '表单项',
          code: '<FormItem label={<Text children="表单项"></Text>}></FormItem>',
        },
      ],
    })
    slotDefault: () => Array<FormItem>;
  }
}
