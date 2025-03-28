/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    order: 8,
    ideusage: {
      idetype: 'element',
    },
  })
  @Component({
    title: '评分',
    icon: 'rate',
    description: '评分组件',
    group: 'Form',
  })
  export class ElRate extends ViewComponent {
    constructor(options?: Partial<ElRateOptions>) {
      super();
    }
  }

  export class ElRateOptions extends ViewComponentOptions {
    @Prop({
      group: '数据属性',
      title: '绑定值',
      sync: true,
      description: '评分的值',
      setter: { concept: 'NumberInputSetter' },
    })
    modelValue: nasl.core.Decimal;

    @Prop({
      group: '数据属性',
      title: '最大分值',
      description: '最大分值',
      setter: { concept: 'NumberInputSetter' },
    })
    max: nasl.core.Integer = 5;

    @Prop({
      group: '主要属性',
      title: '禁用',
      description: '是否为只读',
      setter: { concept: 'SwitchSetter' },
    })
    disabled: nasl.core.Boolean = false;

    @Prop({
      group: '数据属性',
      title: '允许半选',
      description: '是否允许半选',
      setter: { concept: 'SwitchSetter' },
    })
    allowHalf: nasl.core.Boolean = false;

    @Prop({
      group: '数据属性',
      title: '低分界限值',
      description: '低分和中等分数的界限值，值本身被划分在低分中',
      setter: { concept: 'NumberInputSetter' },
    })
    lowThreshold: nasl.core.Integer = 2;

    @Prop({
      group: '数据属性',
      title: '高分界限值',
      description: '高分和中等分数的界限值，值本身被划分在高分中',
      setter: { concept: 'NumberInputSetter' },
    })
    highThreshold: nasl.core.Integer = 4;

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
      title: '只读未选中颜色',
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
      group: '样式属性',
      title: '尺寸',
      description: '组件尺寸',
      setter: {
        concept: 'EnumSelectSetter',
        options: [
          { title: '大' },
          { title: '默认' },
          { title: '小' },
        ],
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
    constructor(options?: Partial<ElFormRateOptions & ElFormItemProOptions & Omit<ElRateOptions, keyof ElFormItemProOptions>>) {
      super();
    }
  }

  export class ElFormRateOptions extends ViewComponentOptions {}
}
