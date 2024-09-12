/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    order: 9,
  })
  @Component({
    title: '滑块',
    icon: 'slider',
    description: '',
    group: 'Form',
  })
  export class ElSliderPro extends ViewComponent {
    @Prop({
      title: '值',
    })
    value: nasl.core.Decimal | nasl.collection.List<nasl.core.Decimal>;

    constructor(options?: Partial<ElSliderProOptions>) {
      super();
    }
  }

  export class ElSliderProOptions extends ViewComponentOptions {
    @Prop({
      group: '数据属性',
      title: '值',
      description: '滑块值',
      setter: { concept: 'InputSetter' },
      sync: true,
    })
    value: nasl.core.Decimal | nasl.collection.List<nasl.core.Decimal>;

    @Prop({
      group: '数据属性',
      title: '最大值',
      description: '滑块范围最大值',
      setter: { concept: 'NumberInputSetter' },
    })
    max: nasl.core.Decimal = 100;

    @Prop({
      group: '数据属性',
      title: '最小值',
      description: '滑块范围最小值',
      setter: { concept: 'NumberInputSetter' },
    })
    min: nasl.core.Decimal = 0;

    @Prop({
      group: '数据属性',
      title: '步长',
      description: '步长',
      setter: { concept: 'NumberInputSetter' },
    })
    step: nasl.core.Decimal = 1;

    @Prop({
      group: '数据属性',
      title: '双游标滑块',
      description: '双游标滑块',
      setter: { concept: 'SwitchSetter' },
    })
    range: nasl.core.Boolean = false;

    @Prop({
      group: '状态属性',
      title: '禁用',
      description: '是否禁用组件',
      setter: { concept: 'SwitchSetter' },
    })
    disabled: nasl.core.Boolean = false;

    // @Prop({
    //   group: '主要属性',
    //   title: 'Label',
    //   description:
    //     '滑块当前值文本。<br />值为 true 显示默认文案；值为 false 不显示滑块当前值文本；<br />值为 `${value}%` 则表示组件会根据占位符渲染文案；<br />值类型为函数时，参数 `value` 标识滑块值，参数 `position=start` 表示范围滑块的起始值，参数 `position=end` 表示范围滑块的终点值。',
    //   setter: { concept: 'InputSetter' },
    // })
    // label: any = true;

    @Prop({
      group: '主要属性',
      title: '布局方向',
      description: '滑块布局方向。可选项：vertical/horizontal',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '横向' }, { title: '纵向' }],
      },
    })
    layout: 'horizontal' | 'vertical' = 'horizontal';

    @Prop({
      group: '主要属性',
      title: '展示输入框',
      description:
        '用于控制数字输入框组件，值为 false 表示不显示数字输入框；值为 true 表示呈现默认数字输入框；值类型为 Object 表示透传属性到数字输入框组件。',
      setter: { concept: 'SwitchSetter' },
    })
    inputNumberProps: nasl.core.Boolean;

    @Prop({
      group: '主要属性',
      title: '展示提示信息',
      description:'鼠标悬浮时展示Tooltip提示信息',
      setter: { concept: 'SwitchSetter' },
    })
    showLabelTooltip: nasl.core.Boolean = true;

    @Prop({
      group: '主要属性',
      title: '单位',
      docDescription: '数值右侧展示的文字',
      implicitToString: true,
    })
    unit: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '刻度标记',
      description:
        '刻度标记，示例：[0, 10, 40, 200]',
      setter: { concept: 'InputSetter' },
    })
    marks: nasl.collection.List<nasl.core.Decimal>;

    // @Prop({
    //   group: '主要属性',
    //   title: '提示信息属性',
    //   description: '透传提示组件属性。',
    //   setter: { concept: 'AnonymousFunctionSetter' },
    // })
    // tooltipProps: () => {
    //   /**
    //    * @title 延迟出现提示
    //    */
    //   delay?: nasl.core.Decimal;
    //   /**
    //    * @title 是否在关闭浮层时销毁浮层
    //    */
    //   destroyOnClose?: nasl.core.Boolean;
    //   /**
    //    * @title 默认显示多长时间之后消失
    //    */
    //   duration?: nasl.core.Decimal;
    //   /**
    //    * @title 浮层出现位置
    //    */
    //   placement?: nasl.core.String;
    //   /**
    //    * @title 是否显示浮层箭头
    //    */
    //   showArrow?: nasl.core.Boolean;
    //   /**
    //    * @title 文字提示风格
    //    */
    //   theme?: nasl.core.String;
    // };

    @Event({
      title: '改变后',
      description: '滑块值变化时触发',
    })
    onChange: (event: nasl.core.Decimal | nasl.collection.List<nasl.core.Decimal>) => any;

    @Event({
      title: '改变完成后',
      description:
        '松开拖动 `mouseup` 或点击滑块条时触发，适合不希望在拖动滑块过程频繁触发回调的场景实用',
    })
    onChangeEnd: (event: nasl.core.Decimal | nasl.collection.List<nasl.core.Decimal>) => any;
  }
}
