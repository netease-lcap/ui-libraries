/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    order: 8,
    ideusage: {
      idetype: 'element',
      forceUpdateWhenAttributeChange: 'preview',
    },
  })
  @Component({
    title: '评分',
    icon: 'rate',
    description: '评分组件',
    group: 'Form',
  })
  export class ElRate extends ViewComponent {
    @Prop({
      title: '预览',
      description: '是否预览',
    })
    preview: nasl.core.Boolean;
    @Prop({
      title: '禁用状态',
      description: '是否禁用评分功能',
    })
    disabled: nasl.core.Boolean;

    @Prop({
      group: '数据属性',
      title: '评分值',
      description: '当前的评分值',
    })
    modelValue: nasl.core.Decimal;

    constructor(options?: Partial<ElRateOptions>) {
      super();
    }
  }

  export class ElRateOptions extends ViewComponentOptions {
    // ========== 数据来源相关属性 ==========
    @Prop({
      group: '数据属性',
      title: '评分值',
      sync: true,
      description: '当前的评分值',
      docDescription: '绑定当前的评分值，支持双向绑定。可以获取或设置用户的评分。',
      setter: { concept: 'NumberInputSetter' },
    })
    modelValue: nasl.core.Decimal;

    @Prop({
      group: '数据属性',
      title: '最大分值',
      description: '评分的最大值',
      docDescription: '设置评分的最大分值，决定显示多少个星星。默认为5颗星。',
      setter: { concept: 'NumberInputSetter' },
    })
    max: nasl.core.Integer = 5;

    @Prop({
      group: '数据属性',
      title: '允许半选',
      description: '是否允许半星评分',
      docDescription: '开启后，允许选择半颗星，可以实现更精细的评分。例如：2.5分。',
      setter: { concept: 'SwitchSetter' },
    })
    allowHalf: nasl.core.Boolean = false;

    @Prop({
      group: '数据属性',
      title: '低分界限',
      description: '低分和中等分的界限值',
      docDescription: '设置低分和中等分的界限值，该值及以下被认定为低分。用于区分不同评分等级的颜色。',
      setter: { concept: 'NumberInputSetter' },
    })
    lowThreshold: nasl.core.Integer = 2;

    @Prop({
      group: '数据属性',
      title: '高分界限',
      description: '高分和中等分的界限值',
      docDescription: '设置高分和中等分的界限值，该值及以上被认定为高分。用于区分不同评分等级的颜色。',
      setter: { concept: 'NumberInputSetter' },
    })
    highThreshold: nasl.core.Integer = 4;

    // ========== 涉及组件的可用、不可用、加载等状态 ==========
    @Prop({
      group: '状态属性',
      title: '禁用状态',
      description: '是否禁用评分功能',
      docDescription: '开启后，评分组件将变为只读状态，用户无法进行评分操作，只能查看评分结果。',
      setter: { concept: 'SwitchSetter' },
    })
    disabled: nasl.core.Boolean = false;

    // ========== 关于尺寸大小、间距、边框、颜色的设置 ==========
    @Prop({
      group: '样式属性',
      title: '低分颜色',
      description: '低分星星的颜色',
      docDescription: '设置低分评级（低分界限及以下）时星星显示的颜色。',
      setter: { concept: 'InputSetter' },
    })
    lowColor: nasl.core.String = '#F7BA2A';

    @Prop({
      group: '样式属性',
      title: '中等颜色',
      description: '中等分星星的颜色',
      docDescription: '设置中等评级（介于低分界限和高分界限之间）时星星显示的颜色。',
      setter: { concept: 'InputSetter' },
    })
    mediumColor: nasl.core.String = '#F7BA2A';

    @Prop({
      group: '样式属性',
      title: '高分颜色',
      description: '高分星星的颜色',
      docDescription: '设置高分评级（高分界限及以上）时星星显示的颜色。',
      setter: { concept: 'InputSetter' },
    })
    highColor: nasl.core.String = '#F7BA2A';

    // @Prop({
    //   group: '主要属性',
    //   title: '颜色数组',
    //   description: 'icon 的颜色数组，共有 3 个元素，为 3 个分段所对应的颜色',
    //   setter: { concept: 'EnumSelectSetter', options: ['#F7BA2A', '#F7BA2A', '#F7BA2A'] },
    // })
    // colors: nasl.collection.List<nasl.core.String> = ['#F7BA2A', '#F7BA2A', '#F7BA2A'];

    @Prop({
      group: '样式属性',
      title: '未选中颜色',
      description: '未选中 icon 的颜色',
      setter: { concept: 'InputSetter' },
    })
    voidColor: nasl.core.String = '#C6D1DE';

    @Prop({
      group: '样式属性',
      title: '禁用未选中颜色',
      description: '只读时未选中 icon 的颜色',
      setter: { concept: 'InputSetter' },
    })
    disabledVoidColor: nasl.core.String = '#EFF2F7';

    // @Prop({
    //   group: '主要属性',
    //   title: '图标数组',
    //   description: 'icon 的类名数组，共有 3 个元素，为 3 个分段所对应的类名',
    //   setter: { concept: 'ArraySetter' },
    // })
    // icons: nasl.collection.List<nasl.core.String> = ['star-filled', 'star-filled', 'star-filled'];

    // @Prop({
    //   group: '主要属性',
    //   title: '未选中图标',
    //   description: '未选中 icon 的类名',
    //   setter: { concept: 'IconSetter' },
    // })
    // voidIcon: nasl.core.String = 'star';

    // @Prop({
    //   group: '主要属性',
    //   title: '只读未选中图标',
    //   description: '只读时未选中 icon 的类名',
    //   setter: { concept: 'IconSetter' },
    // })
    // disabledVoidIcon: nasl.core.String = 'star';

    // @Prop({
    //   group: '主要属性',
    //   title: '显示辅助文字',
    //   description: '是否显示辅助文字，若为真，则会从 texts 数组中选取当前分数对应的文字内容',
    //   setter: { concept: 'SwitchSetter' },
    // })
    // showText: nasl.core.Boolean = false;

    // @Prop({
    //   group: '主要属性',
    //   title: '辅助文字数组',
    //   description: '辅助文字数组',
    //   setter: { concept: 'EnumSelectSetter', options: ['极差', '失望', '一般', '满意', '惊喜'] },
    // })
    // texts: nasl.collection.List<nasl.core.String> = ['极差', '失望', '一般', '满意', '惊喜'];

    @Prop({
      group: '样式属性',
      title: '显示分数',
      description: '是否显示当前分数，show-score 和 show-text 不能同时为真',
      setter: { concept: 'SwitchSetter' },
    })
    showScore: nasl.core.Boolean = false;

    // @Prop({
    //   group: '主要属性',
    //   title: '辅助文字颜色',
    //   description: '辅助文字的颜色',
    //   setter: { concept: 'InputSetter' },
    // })
    // textColor: nasl.core.String = '#1F2D3D';

    // @Prop({
    //   group: '主要属性',
    //   title: '分数模板',
    //   description: '分数显示模板',
    //   setter: { concept: 'InputSetter' },
    // })
    // scoreTemplate: nasl.core.String = '{value}';

    @Prop({
      group: '状态属性',
      title: '预览',
      description: '是否预览',
      setter: { concept: 'SwitchSetter' },
    })
    preview: nasl.core.Boolean = false;

    @Prop({
      group: '样式属性',
      title: '尺寸',
      description: '组件尺寸',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '大' }, { title: '默认' }, { title: '小' }],
      },
    })
    size: 'large' | 'default' | 'small';

    @Event({
      title: '值改变时',
      description: '分值改变时触发',
    })
    onChange: (value: nasl.core.Decimal) => any;
  }

  @IDEExtraInfo({
    ideusage: {
      idetype: 'container',
      forceUpdateWhenAttributeChange: true,
      childAccept:false,
      additionalAttribute: {
        ':isRequired': {
          condition:
            "(!this.getAttribute('isRequired')?.value) && (this.getAttribute('rules')?.rules || []).find(r => r.calleeName === 'filled')",
          value: '"true"',
        },
      },
    },
    extends: [
      {
        name: 'ElRate',
      },
      {
        name: 'ElFormItemPro',
      },
    ],
  })
  @Component({
    title: '表单评分',
    description: '表单评分',
    group: 'Form',
  })
  export class ElFormRate extends ViewComponent {
    constructor(
      options?: Partial<ElFormRateOptions & ElFormItemProOptions & Omit<ElRateOptions, keyof ElFormItemProOptions>>,
    ) {
      super();
    }
  }

  export class ElFormRateOptions extends ViewComponentOptions {}
}
