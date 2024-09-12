/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    order: 8,
    ideusage: {
      idetype: 'container',
      forceUpdateWhenAttributeChange: true,
    },
  })
  @Component({
    title: '文字提示',
    icon: 'tooltip',
    description: '常用于展示鼠标 hover 时的提示信息。',
    group: 'Feedback',
  })
  export class ElTooltip extends ViewComponent {
    constructor(options?: Partial<ElTooltipOptions>) {
      super();
    }
  }

  export class ElTooltipOptions extends ViewComponentOptions {
    @Prop({
      group: '主要属性',
      title: '主题',
      description: '默认提供的主题',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '暗色' }, { title: '亮色' }],
      },
    })
    effect: 'dark' | 'light' = 'dark';

    @Prop({
      group: '主要属性',
      title: '内容',
      description: '显示的内容',
      setter: { concept: 'InputSetter' },
    })
    content: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '位置',
      description: '出现位置',
      setter: {
        concept: 'EnumSelectSetter',
        options: [
          { title: '上边' },
          { title: '上左' },
          { title: '上右' },
          { title: '下边' },
          { title: '下左' },
          { title: '下右' },
          { title: '左边' },
          { title: '左上' },
          { title: '左下' },
          { title: '右边' },
          { title: '右上' },
          { title: '右下' },
        ],
      },
    })
    placement:
      | 'top'
      | 'top-start'
      | 'top-end'
      | 'bottom'
      | 'bottom-start'
      | 'bottom-end'
      | 'left'
      | 'left-start'
      | 'left-end'
      | 'right'
      | 'right-start'
      | 'right-end' = 'bottom';

    @Prop({
      group: '状态属性',
      sync: true,
      title: '可见性',
      description: '状态是否可见',
      setter: { concept: 'SwitchSetter' },
    })
    value: nasl.core.Boolean = false;

    @Prop({
      group: '状态属性',
      title: '禁用',
      description: '是否可用',
      setter: { concept: 'SwitchSetter' },
    })
    disabled: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '偏移量',
      description: '出现位置的偏移量',
      setter: { concept: 'NumberInputSetter' },
    })
    offset: nasl.core.Decimal = 0;

    // @Prop({
    //   group: '主要属性',
    //   title: 'Transition',
    //   description: '定义渐变动画',
    //   setter: { concept: 'InputSetter' },
    // })
    // transition: nasl.core.String = 'el-fade-in-linear';

    @Prop({
      group: '主要属性',
      title: '显示箭头',
      description: '是否显示箭头',
      setter: { concept: 'SwitchSetter' },
    })
    visibleArrow: nasl.core.Boolean = true;

    // @Prop({
    //   group: '主要属性',
    //   title: 'Popper参数',
    //   description: '[popper.js](https://popper.js.org/docs/v2/) 的参数',
    //   setter: { concept: 'InputSetter' },
    // })
    // popperOptions: {
    //   boundariesElement: nasl.core.String;
    //   gpuAcceleration: nasl.core.Boolean;
    // };

    @Prop({
      group: '主要属性',
      title: '延迟出现',
      description: '延迟出现，单位毫秒',
      setter: { concept: 'NumberInputSetter' },
    })
    openDelay: nasl.core.Decimal = 0;

    // @Prop({
    //   group: '主要属性',
    //   title: '手动控制',
    //   description:
    //     '手动控制模式，设置为 true 后，mouseenter 和 mouseleave 事件将不会生效',
    //   setter: { concept: 'SwitchSetter' },
    // })
    // manual: nasl.core.Boolean = false;

    // @Prop({
    //   group: '样式属性',
    //   title: '额外类名',
    //   description: '为 Tooltip 的 popper 添加类名',
    //   setter: { concept: 'InputSetter' },
    // })
    // popperClass: nasl.core.String;

    // @Prop({
    //   group: '主要属性',
    //   title: '鼠标进入',
    //   description: '鼠标是否可进入到 tooltip 中',
    //   setter: { concept: 'SwitchSetter' },
    // })
    // enterable: nasl.core.Boolean = true;

    @Prop({
      group: '主要属性',
      title: '自动隐藏',
      description: 'Tooltip 出现后自动隐藏延时，单位毫秒，为 0 则不会自动隐藏',
      setter: { concept: 'NumberInputSetter' },
    })
    hideAfter: nasl.core.Decimal = 0;

    // @Prop({
    //   group: '主要属性',
    //   title: '聚焦导航',
    //   description:
    //     'Tooltip 组件的 [tabindex](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex)',
    //   setter: { concept: 'NumberInputSetter' },
    // })
    // tabindex: nasl.core.Decimal = 0;

    @Slot({
      title: 'Default',
      description: '默认插槽',
    })
    slotDefault: () => Array<ViewComponent>;

    // @Slot({
    //   title: '内容',
    //   description: '内容插槽',
    // })
    // slotContent: () => Array<ViewComponent>;
  }
}
