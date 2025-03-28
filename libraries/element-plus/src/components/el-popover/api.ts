/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    order: 7,
    ideusage: {
      idetype: 'container',
      bindStyleAttr: 'popperStyle',
      displaySlotInline: {
        reference: true,
      },
      selector: [
        {
          expression: "this.getElement(el => el.slotTarget === 'reference')",
          cssSelector: '.el-tooltip__trigger',
          placement: 'tail',
        },
        {
          expression: 'this',
          cssSelector: '.el-popover',
          placement: 'tail',
        },
      ],
      eventsEffect: 'reference',
      forceRefresh: { slot: 'reference' },
      events: {
        click: true,
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

    // @Method({
    //   title: '显示弹出框',
    //   description: '显示弹出框',
    // })
    // show(): void {}

    @Method({
      title: '关闭弹出框',
      description: '关闭弹出框',
    })
    hide(): void {}
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
          { title: '右键点击' },
        ],
      },
    })
    trigger: 'click' | 'focus' | 'hover' | 'contextmenu' = 'hover';

    @Prop({
      group: '主要属性',
      sync: true,
      title: 'Popover 是否显示',
      description: 'Popover 是否显示',
      setter: { concept: 'SwitchSetter' },
    })
    visible: nasl.core.Boolean | null = null;

    @Prop({
      group: '主要属性',
      title: '标题',
      description: '标题',
      setter: { concept: 'InputSetter' },
    })
    title: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '主题',
      description: 'Tooltip主题',
      setter: {
        concept: 'EnumSelectSetter',
        options: [
          { title: '暗主题' },
          { title: '亮主题' },
        ],
      },
    })
    effect: 'dark' | 'light' = 'light';

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
      group: '主要属性',
      title: '是否禁用',
      description: 'Popover 是否可用',
      setter: { concept: 'SwitchSetter' },
    })
    disabled: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '出现位置的偏移量',
      description: '出现位置的偏移量',
      setter: { concept: 'NumberInputSetter' },
    })
    offset: nasl.core.Decimal = 0;

    @Prop({
      group: '主要属性',
      title: '定义渐变动画',
      description: '定义渐变动画',
      setter: { concept: 'InputSetter' },
    })
    transition: nasl.core.String = 'fade-in-linear';

    @Prop({
      group: '主要属性',
      title: '是否显示 Tooltip 箭头',
      description:
        '是否显示 Tooltip 箭头，更多参数可见[Vue-popper](https://github.com/element-component/vue-popper)',
      setter: { concept: 'SwitchSetter' },
    })
    showArrow: nasl.core.Boolean = true;

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

    // @Prop({
    //   group: '主要属性',
    //   title: '为 popper 添加类名',
    //   description: '为 popper 添加类名',
    //   setter: { concept: 'InputSetter' },
    // })
    // popperClass: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '延迟显示',
      description: '在触发后多久显示内容，单位毫秒',
      setter: { concept: 'NumberInputSetter' },
    })
    showAfter: nasl.core.Integer = 0;

    @Prop({
      group: '主要属性',
      title: '延迟关闭',
      description: '延迟关闭，单位毫秒',
      setter: { concept: 'NumberInputSetter' },
    })
    hideAfter: nasl.core.Integer = 200;

    @Prop({
      group: '主要属性',
      title: '自动隐藏延时',
      description: '弹出框出现后多久进行自动隐藏，单位毫秒',
      setter: { concept: 'NumberInputSetter' },
    })
    autoClose: nasl.core.Integer = 0;

    // @Prop({
    //   group: '主要属性',
    //   title: 'Popover 组件的 tabindex',
    //   description: 'Popover 组件的 tabindex',
    //   setter: { concept: 'NumberInputSetter' },
    // })
    // tabindex: nasl.core.Integer | nasl.core.String = 0;

    @Prop({
      group: '主要属性',
      title: '将下拉列表插入body元素中',
      description: '是否将 popover 的下拉列表插入至 body 元素',
      setter: { concept: 'SwitchSetter' },
    })
    teleported: nasl.core.Boolean = true;

    @Prop({
      group: '主要属性',
      title: '是否保持弹出框不被销毁',
      description: '当 popover 组件长时间不触发且 persistent 属性设置为 false 时, popover 将会被销毁',
      setter: { concept: 'SwitchSetter' },
    })
    persistent: nasl.core.Boolean = true;

    // @Prop({
    //   group: '主要属性',
    //   title: '是否启用虚拟触发器',
    //   description: '是否启用虚拟触发器',
    //   setter: { concept: 'SwitchSetter' },
    // })
    // virtualTriggering: nasl.core.Boolean;

    @Event({
      title: '显示时触发',
      description: '显示时触发',
    })
    onShow: (event: any) => any;

    @Event({
      title: '显示动画播放前触发',
      description: '显示动画播放前触发',
    })
    onBeforeEnter: (event: any) => any;

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
      title: '隐藏动画播放前触发',
      description: '隐藏动画播放前触发',
    })
    onBeforeLeave: (event: any) => any;

    @Event({
      title: '隐藏动画播放完毕后触发',
      description: '隐藏动画播放完毕后触发',
    })
    onAfterLeave: (event: any) => any;

    @Slot({
      title: 'Default',
      description: '默认插槽',
    })
    slotDefault: () => Array<ViewComponent>;

    @Slot({
      title: '触发 Popover 显示的 HTML 元素',
      description: '触发 Popover 显示的 HTML 元素',
    })
    slotReference: () => Array<ViewComponent>;
  }
}
