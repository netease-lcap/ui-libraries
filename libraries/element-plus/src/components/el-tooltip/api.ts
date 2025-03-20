/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    order: 8,
    ideusage: {
      idetype: 'popover',
      forceUpdateWhenAttributeChange: true,
      events: {
        click: true,
      },
      forceRefresh: {slot: 'default'}
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

    // @Prop({
    //   group: '主要属性',
    //   title: '原始HTML',
    //   description: '内容是否为HTML字符串',
    //   setter: { concept: 'SwitchSetter' },
    // })
    // rawContent: nasl.core.Boolean = false;

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
    visible: nasl.core.Boolean = false;

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
    offset: nasl.core.Decimal = 12;

    // @Prop({
    //   group: '主要属性',
    //   title: '过渡动画',
    //   description: '定义渐变动画',
    //   setter: { concept: 'InputSetter' },
    // })
    // transition: nasl.core.String = 'el-fade-in-linear';
    
    @Prop({
      group: '主要属性',
      title: '延迟出现',
      description: '在触发后多久显示内容，单位毫秒',
      setter: { concept: 'NumberInputSetter' },
    })
    showAfter: nasl.core.Decimal = 0;

    @Prop({
      group: '主要属性',
      title: '延迟关闭',
      description: '延迟关闭，单位毫秒',
      setter: { concept: 'NumberInputSetter' },
    })
    hideAfter: nasl.core.Decimal = 200;

    @Prop({
      group: '主要属性',
      title: '显示箭头',
      description: '是否显示箭头',
      setter: { concept: 'SwitchSetter' },
    })
    showArrow: nasl.core.Boolean = true;

    @Prop({
      group: '主要属性',
      title: '鼠标进入',
      description: '鼠标是否可进入到 tooltip 中',
      setter: { concept: 'SwitchSetter' },
    })
    enterable: nasl.core.Boolean = true;
    
    @Prop({
      group: '主要属性',
      title: '自动隐藏',
      description: 'Tooltip 出现后自动隐藏延时，单位毫秒，为 0 则不会自动隐藏',
      setter: { concept: 'NumberInputSetter' },
    })
    autoClose: nasl.core.Decimal = 0;

    
    @Prop({
      group: '主要属性',
      title: '触发方式',
      description: '如何触发 Tooltip',
      setter: {
        concept: 'EnumSelectSetter',
        options: [
          { title: '悬停' },
          { title: '点击' },
          { title: '聚焦' },
          { title: '上下文菜单' },
        ],
      },
    })
    trigger: 
      | 'hover'
      | 'click'
      | 'focus'
      | 'contextmenu' = 'hover';

    // @Prop({
    //   group: '主要属性',
    //   title: '触发元素',
    //   description: '触发 Tooltip 显示的元素',
    //   docDescription: '触发 Tooltip 显示的元素，接受 HTML 元素或 Vue 组件',
    // })
    // triggerKeys: nasl.collection.List<nasl.core.String>;
    
    // @Prop({
    //   group: '主要属性',
    //   title: '虚拟触发元素',
    //   description: '虚拟触发元素',
    //   docDescription: '如果需要触发的元素是虚拟的（例如不存在的 HTML 元素或 Vue 组件），则为 true',
    //   setter: { concept: 'SwitchSetter' },
    // })
    // virtualTriggering: nasl.core.Boolean = false;
    
    // @Prop({
    //   group: '主要属性',
    //   title: '虚拟触发参考',
    //   description: '虚拟触发参考',
    //   docDescription: '虚拟触发参考元素，配合 virtualTriggering 使用',
    // })
    // virtualRef: Record<string, any>;
    
    @Prop({
      group: '主要属性',
      title: '总是显示',
      description: '是否总是显示 Tooltip',
      setter: { concept: 'SwitchSetter' },
    })
    persistent: nasl.core.Boolean = false;
    
    @Prop({
      group: '主要属性',
      title: 'aria-label',
      description: 'aria-label 属性',
      docDescription: '为 Tooltip 的触发元素添加 aria-label 属性，以提高可访问性',
      setter: { concept: 'InputSetter' },
    })
    ariaLabel: nasl.core.String;
    
    // @Prop({
    //   group: '主要属性',
    //   title: '可用于表单元素',
    //   description: '是否对表单元素触发 Tooltip',
    //   setter: { concept: 'SwitchSetter' },
    // })
    // teleported: nasl.core.Boolean = true;


    @Slot({
      title: '默认',
      description: '默认插槽，触发 Tooltip 显示的元素',
    })
    slotDefault: () => Array<ViewComponent>;
  }
}
