/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    ideusage: {
      idetype: 'container',
      selector: {
        expression: "this.getElement(el => el.slotTarget === 'content')",
        cssSelector: "div[class='ant-popover-content']",
      },
      actions: {
        click: {
          status:
            "this.setCacheStatus('open', !(this.getCacheStatus('open') || false)) ",
          default: "this.setCacheStatus('open', false)",
        },
      },
    },
  })
  @Component({
    title: '弹出框',
    icon: 'popover',
    description: '',
    group: 'Feedback',
  })
  export class ElPopover extends ViewComponent {
    constructor(options?: Partial<ElPopoverOptions>) {
      super();
    }
  }

  export class ElPopoverOptions extends ViewComponentOptions {
    @Prop({
      group: '主要属性',
      title: '触发方式',
      description: '触发方式',
      setter: {
        concept: 'EnumSelectSetter',
        options: [
          { title: '点击' },
          { title: '聚焦' },
          { title: '悬浮' },
          { title: '手动' },
        ],
      },
    })
    trigger: 'click' | 'focus' | 'hover' | 'manual' = 'click';

    @Prop({
      group: '主要属性',
      title: '标题',
      description: '标题',
      setter: { concept: 'InputSetter' },
    })
    title: nasl.core.String;

    // @Prop({
    //   group: '主要属性',
    //   title: '显示的内容',
    //   description: '显示的内容，也可以通过 slot 传入 DOM',
    //   setter: { concept: 'InputSetter' },
    // })
    // content: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '宽度',
      description: '宽度',
      setter: { concept: 'InputSetter' },
    })
    width: nasl.core.String | nasl.core.Decimal = 150;

    @Prop({
      group: '主要属性',
      title: '出现位置',
      description: '出现位置',
      setter: { concept: 'InputSetter' },
    })
    placement: nasl.core.String = 'bottom';

    @Prop({
      group: '主要属性',
      title: 'Popover 是否可用',
      description: 'Popover 是否可用',
      setter: { concept: 'SwitchSetter' },
    })
    disabled: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      sync: true,
      title: '状态是否可见',
      description: '状态是否可见',
      setter: { concept: 'SwitchSetter' },
    })
    value: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '出现位置的偏移量',
      description: '出现位置的偏移量',
      setter: { concept: 'NumberInputSetter' },
    })
    offset: nasl.core.Decimal = 0;

    // @Prop({
    //   group: '主要属性',
    //   title: '定义渐变动画',
    //   description: '定义渐变动画',
    //   setter: { concept: 'InputSetter' },
    // })
    // transition: nasl.core.String = 'fade-in-linear';

    @Prop({
      group: '主要属性',
      title: '是否显示 Tooltip 箭头',
      description:
        '是否显示 Tooltip 箭头，更多参数可见[Vue-popper](https://github.com/element-component/vue-popper)',
      setter: { concept: 'SwitchSetter' },
    })
    visibleArrow: nasl.core.Boolean = true;

    // @Prop({
    //   group: '主要属性',
    //   title: 'Popper Options',
    //   description: '[popper.js](https://popper.js.org/docs/v2/) 的参数',
    //   setter: { concept: 'InputSetter' },
    // })
    // popperOptions: {
    //   boundariesElement: nasl.core.String;
    //   gpuAcceleration: nasl.core.Boolean;
    // };

    @Prop({
      group: '主要属性',
      title: '为 popper 添加类名',
      description: '为 popper 添加类名',
      setter: { concept: 'InputSetter' },
    })
    popperClass: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '触发方式为 hover 时的显示延迟',
      description: '触发方式为 hover 时的显示延迟，单位为毫秒',
      setter: { concept: 'NumberInputSetter' },
    })
    openDelay: nasl.core.Decimal;

    @Prop({
      group: '主要属性',
      title: '触发方式为 hover 时的隐藏延迟',
      description: '触发方式为 hover 时的隐藏延迟，单位为毫秒',
      setter: { concept: 'NumberInputSetter' },
    })
    closeDelay: nasl.core.Decimal = 200;

    @Prop({
      group: '主要属性',
      title: 'Popover 组件的 tabindex',
      description:
        'Popover 组件的 [tabindex](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex)',
      setter: { concept: 'NumberInputSetter' },
    })
    tabindex: nasl.core.Decimal = 0;

    @Event({
      title: '显示时触发',
      description: '显示时触发',
    })
    onShow: (event: any) => any;

    @Event({
      title: '显示动画播放完毕后触发',
      description: '显示动画播放完毕后触发',
    })
    onAfterEnter: (event: any) => any;

    @Event({
      title: '隐藏时触发',
      description: '隐藏时触发',
    })
    onHide: (event: any) => any;

    @Event({
      title: '隐藏动画播放完毕后触发',
      description: '隐藏动画播放完毕后触发',
    })
    onAfterLeave: (event: any) => any;

    @Slot({
      title: 'Popover 内嵌 HTML 文本',
      description: 'Popover 内嵌 HTML 文本',
    })
    slotDefault: () => Array<ViewComponent>;

    @Slot({
      title: '触发 Popover 显示的 HTML 元素',
      description: '触发 Popover 显示的 HTML 元素',
    })
    slotReference: () => Array<ViewComponent>;
  }
}
