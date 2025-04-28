/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    order: 8,
    sourceDocURL: 'https://tdesign.tencent.com/vue/components/rate',
    ideusage: {
      idetype: 'element',
      additionalAttribute: {
        ':showText': '"false"',
      },
      forceUpdateWhenAttributeChange: true,
    }
  })
  @Component({
    title: '评分',
    icon: 'rate',
    description: '',
    group: 'Form',
  })
  export class ElRatePro extends ViewComponent {
    constructor(options?: Partial<ElRateProOptions>) {
      super();
    }
  }

  export class ElRateProOptions extends ViewComponentOptions {
    @Prop({
      group: '数据属性',
      title: '评分值',
      description: '选择评分的值',
      setter: { concept: 'NumberInputSetter' },
      sync: true,
    })
    value: nasl.core.Decimal = 0;

    @Prop({
      group: '数据属性',
      title: '最大分数',
      description: '评分的数量',
      setter: { concept: 'NumberInputSetter' },
    })
    count: nasl.core.Decimal = 5;

    @Prop({
      group: '交互属性',
      title: '可半选',
      description: '是否允许半选',
      setter: { concept: 'SwitchSetter' },
    })
    allowHalf: nasl.core.Boolean = false;

    @Prop({
      group: '交互属性',
      title: '可清除',
      description: '是否允许清除',
      setter: {
        concept: 'SwitchSetter',
      },
    })
    clearable: nasl.core.Boolean = false;

    @Prop({
      group: '状态属性',
      title: '禁用',
      description: '是否禁用评分',
      setter: { concept: 'SwitchSetter' },
    })
    disabled: nasl.core.Boolean;

    @Prop({
      group: '样式属性',
      title: '间距',
      description: '评分图标的间距',
      setter: { concept: 'NumberInputSetter' },
    })
    gap: nasl.core.Decimal = 4;

    @Prop({
      group: '主要属性',
      title: '展示辅助文本',
      description: '是否显示对应的辅助文字',
      setter: { concept: 'SwitchSetter' },
      onChange: [
        {
          update: {
            showScore: false,
          },
          if: (_) => _,
        },
      ],
    })
    showText: nasl.core.Boolean = false;

    @Prop<ElRateProOptions, 'showScore'>({
      group: '主要属性',
      title: '展示分数',
      description: '是否显示分数, 与 展示辅助文本 互斥',
      setter: { concept: 'SwitchSetter' },
      onChange: [
        {
          update: {
            showText: false,
          },
          if: (_) => _,
        },
      ],
    })
    showScore: nasl.core.Boolean = false;

    @Prop<ElRateProOptions, 'scoreTemplate'>({
      group: '主要属性',
      title: '分数模板',
      description: '分数模板',
      setter: { concept: 'InputSetter' },
      if: _ => _.showScore,
    })
    scoreTemplate: nasl.core.String = '{value}';

    @Prop<ElRateProOptions, 'texts'>({
      group: '主要属性',
      title: '辅助文本',
      description:
        '评分等级对应的辅助文字。组件内置默认值为：["极差", "失望", "一般", "满意", "惊喜"]。自定义值示例：["1分", "2分", "3分", "4分", "5分"]。',
      setter: { concept: 'InputSetter' },
      if: _ => _.showText,
    })
    texts: nasl.collection.List<nasl.core.String> = ['极差','失望','一般','满意','惊喜'];

    @Prop({
      group: '主要属性',
      title: '图标',
      description: '自定义评分图标',
      setter: {
        concept: 'IconSetter',
        customIconFont: 'LCAP_ELEMENTUI_ICONS',
      },
    })
    iconname: nasl.core.String;

    @Prop({
      group: '样式属性',
      title: '尺寸',
      description: '评分图标的大小，示例：`20px`',
      setter: { concept: 'InputSetter' },
    })
    size: nasl.core.String = '24px';

    // 是否区分颜色
    @Prop<ElRateProOptions, 'distinguishColor'>({
      group: '主要属性',
      title: '是否区分颜色',
      description: '是否区分颜色',
      setter: { concept: 'SwitchSetter' },
    })
    distinguishColor: nasl.core.Boolean = false;

    @Prop<ElRateProOptions, 'color'>({
      group: '主要属性',
      title: '图标颜色',
      description: '评分图标的颜色，样式中默认为 #ED7B2F。一个值表示设置选中高亮的五角星颜色，示例：[选中颜色]。数组则表示分别设置 选中高亮的五角星颜色 和 未选中暗灰的五角星颜色，[选中颜色，未选中颜色]。示例：["#ED7B2F", "#E3E6EB"]。',
      setter: { concept: 'InputSetter' },
      if: _ => !_.distinguishColor,
    })
    color: nasl.core.String | nasl.collection.List<nasl.core.String> = '#ED7B2F';


    @Prop<ElRateProOptions, 'colors'>({
      group: '主要属性',
      title: '图标颜色',
      description: 'icon的颜色。传入数组，共有 3 个元素，为 3 个分段所对应的颜色',
      setter: { concept: 'InputSetter' },
      if: _ => _.distinguishColor,
    })
    colors: nasl.collection.List<nasl.core.String> = ['#99A9BF', '#F7BA2A', '#FF9900'];

    @Prop<ElRateProOptions, 'lowThreshold'>({
      group: '主要属性',
      title: '低分界限值',
      description: '低分界限值',
      setter: { concept: 'NumberInputSetter' },
      if: _ => _.distinguishColor,
    })
    lowThreshold: nasl.core.Decimal = 2;

    @Prop<ElRateProOptions, 'highThreshold'>({
      group: '主要属性',
      title: '高分界限值',
      description: '高分界限值',
      setter: { concept: 'NumberInputSetter' },
      if: _ => _.distinguishColor,
    })
    highThreshold: nasl.core.Decimal = 4;

    @Prop<ElRateProOptions, 'voidColor'>({
      group: '主要属性',
      title: '未选中颜色',
      description: '未选中颜色',
      setter: { concept: 'InputSetter' },
      if: _ => _.distinguishColor,
    })
    voidColor: nasl.core.String = '#99A9BF';

    @Event({
      title: '改变后',
      description: '评分数改变时触发',
    })
    onChange: (event: nasl.core.Decimal) => any;
  }

  @IDEExtraInfo({
    ideusage: {
      idetype: 'container',
      bindStyleAttr: 'inputStyle',
      bindStyleSelector: '.__cw-form-compose-input',
      ignoreProperty: ['rules'],
      slotWrapperInlineStyle: {
        label: 'display: inline-block;',
      },
      forceRefresh: 'parent',
      namedSlotOmitWrapper: ['label'],
      additionalAttribute: {
        ':showText': '"false"',
      },
    },
    extends: [{
      name: 'ElFormItemPro',
      excludes: [
        'slotDefault', 'useRangeValue',
        'startFieldName', 'endFieldName',
        'startInitialValue', 'endInitialValue',
      ],
    }, {
      name: 'ElRatePro',
    }],
  })
  @Component({
    title: '表单评分',
    description: '表单评分',
    group: 'Form',
  })
  export class ElFormRatePro extends ViewComponent {
    constructor(options?: Partial<ElFormRateProOptions & ElFormItemProOptions & Omit<ElRateProOptions, keyof ElFormItemProOptions>>) {
      super();
    }
  }

  export class ElFormRateProOptions extends ViewComponentOptions {

  }
}
