/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    order: 1,
    ideusage: {
      idetype: 'container',
      cacheOpenKey: 'show',
      selector: [
        {
          expression: "this.getElement(el => el.slotTarget === 'default')",
          cssSelector: '.van-popup',
        },
        {
          expression: "this.getElement(el => el.slotTarget === 'action')",
          cssSelector: '.van-popup',
        },
        {
          expression: "this",
          cssSelector: '.van-popup',
        },
        {
          expression: "this.getElement(el => el.slotTarget === 'reference')",
          cssSelector: '.van-popover__wrapper',
        },
      ],
      forceUpdateWhenAttributeChange: true,
      events: {
        click: true,
      },
      additionalAttribute: {
        ":dataSource": "\"[{},{}, {}]\"",
      },
      style: [
        {
          selector: '.van-popover__content .van-popover__action:not(:first-child)',
          declaration: 'opacity: 0.4; pointer-events: none; cursor: not-allowed;',
        },
      ]
    },
  })
  @Component({
    title: '气泡弹出框',
    icon: 'popover',
    description: '气泡弹窗',
    group: 'Feedback',
  })
  export class VanPopoverCombination<T, V> extends ViewComponent {
    constructor(options?: Partial<VanPopoverCombinationOptions<T, V>>) {
      super();
    }
  }

  export class VanPopoverCombinationOptions<T, V> extends ViewComponentOptions {
    @Prop({
      group: '主要属性',
      title: '是否显示',
      description: '是否显示',
      setter: { concept: 'SwitchSetter' },
      sync: true,
    })
    show: nasl.core.Boolean = false;

    @Prop({
      group: '数据属性',
      title: '数据源',
      description:
        '展示数据的输入源，可设置为集合类型变量（List<T>）或输出参数为集合类型的逻辑。',
      docDescription:
        '支持动态绑定集合类型变量（List<T>）或输出参数为集合类型的逻辑',
      designerValue: [{}, {}, {}],
      bindOpen: true,
    })
    dataSource:
      | { list: nasl.collection.List<T>; total: nasl.core.Integer }
      | nasl.collection.List<T>;

    @Prop({
      group: '数据属性',
      title: '数据类型',
      description: '数据源返回的数据结构的类型，自动识别类型进行展示说明',
      docDescription:
        '该属性为只读状态，当数据源动态绑定集合List<T>后，会自动识别T的类型并进行展示。',
    })
    dataSchema: T;

    @Prop({
      group: '数据属性',
      title: '选项文字字段',
      description: '集合的元素类型中，用于选项文字字段',
      setter: {
        concept: 'PropertySelectSetter',
      },
    })
    textField: (item: T) => nasl.core.String = ((item: any) => item.text) as any;

    @Prop({
      group: '数据属性',
      title: '选项图标字段',
      description: '集合的元素类型中，用于选项图标字段',
      setter: {
        concept: 'PropertySelectSetter',
      },
    })
    iconField: (item: T) => nasl.core.String = ((item: any) => item.icon) as any;

    @Prop({
      group: '数据属性',
      title: '选项文字颜色字段',
      description: '集合的元素类型中，用于选项文字颜色字段',
      setter: {
        concept: 'PropertySelectSetter',
      },
    })
    colorField: (item: T) => nasl.core.String = ((item: any) => item.color) as any;

    @Prop({
      group: '数据属性',
      title: '选项是否禁用字段',
      description: '集合的元素类型中，用于选项是否禁用字段',
      setter: {
        concept: 'PropertySelectSetter',
      },
    })
    disabledField: (item: T) => nasl.core.Boolean = ((item: any) => item.disabled) as any;

    @Prop({
      group: '主要属性',
      title: '选项列表的排列方向',
      description: '选项列表的排列方向',
      setter: { concept: 'EnumSelectSetter', options: [{ title: '垂直' }, { title: '水平' }] },
    })
    actionsDirection: 'vertical' | 'horizontal' = 'vertical';

    @Prop({
      group: '主要属性',
      title: '弹出位置',
      description: '弹出位置',
      setter: {
        concept: 'EnumSelectSetter',
        options: [
          { title: '顶部' },
          { title: '顶部左侧' },
          { title: '顶部右侧' },
          { title: '左侧' },
          { title: '左侧上方' },
          { title: '左侧下方' },
          { title: '右侧' },
          { title: '右侧上方' },
          { title: '右侧下方' },
          { title: '底部' },
          { title: '底部左侧' },
          { title: '底部右侧' },
        ],
      },
    })
    placement: 'top' | 'top-start' | 'top-end' | 'left' | 'left-start' | 'left-end' | 'right' | 'right-start' | 'right-end' | 'bottom' | 'bottom-start' | 'bottom-end' = 'bottom-start';

    @Prop({
      group: '主要属性',
      title: '主题风格',
      description: '主题风格',
      setter: { concept: 'EnumSelectSetter', options: [{ title: '浅色' }, { title: '深色' }] },
    })
    theme: 'light' | 'dark' = 'light';

    @Prop({
      group: '主要属性',
      title: '触发方式',
      description: '触发方式',
      setter: { concept: 'EnumSelectSetter', options: [{ title: '点击' }, { title: '手动' }] },
    })
    trigger: 'click' | 'manual' = 'click';

    @Prop({
      group: '主要属性',
      title: '动画时长',
      description: '动画时长，单位秒，设置为 0 可以禁用动画',
      setter: { concept: 'InputSetter' },
    })
    duration: nasl.core.String = '0.3';

    @Prop({
      group: '主要属性',
      title: '左右位置偏移量',
      description: '左右位置的偏移量',
      setter: { concept: 'NumberInputSetter' },
    })
    offsetX: nasl.core.Integer = 0;

    @Prop({
      group: '主要属性',
      title: '上下位置偏移量',
      description: '上下位置的偏移量',
      setter: { concept: 'NumberInputSetter' },
    })
    offsetY: nasl.core.Integer = 8;

    @Prop({
      group: '主要属性',
      title: '是否显示遮罩层',
      description: '是否显示遮罩层',
      setter: { concept: 'SwitchSetter' },
    })
    overlay: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '是否展示小箭头',
      description: '是否展示小箭头',
      setter: { concept: 'SwitchSetter' },
    })
    showArrow: nasl.core.Boolean = true;

    @Prop({
      group: '主要属性',
      title: '是否在点击选项后关闭',
      description: '是否在点击选项后关闭',
      setter: { concept: 'SwitchSetter' },
    })
    closeOnClickAction: nasl.core.Boolean = true;

    @Prop({
      group: '主要属性',
      title: '是否在点击外部元素后关闭菜单',
      description: '是否在点击外部元素后关闭菜单',
      setter: { concept: 'SwitchSetter' },
    })
    closeOnClickOutside: nasl.core.Boolean = true;

    @Prop({
      group: '主要属性',
      title: '是否在点击遮罩层后关闭菜单',
      description: '是否在点击遮罩层后关闭菜单',
      setter: { concept: 'SwitchSetter' },
    })
    closeOnClickOverlay: nasl.core.Boolean = true;

    @Prop({
      group: '主要属性',
      title: '是否自定义菜单内容',
      description: '自定义菜单内容，数据源中的数据将不生效',
      setter: { concept: 'SwitchSetter' },
    })
    isCustomContent: nasl.core.Boolean = false;

    @Event({
      title: '点击选项时触发',
      description: '点击选项时触发',
    })
    onSelect: (current: { action: any, index: number }) => void;

    @Event({
      title: '打开菜单时触发',
      description: '打开菜单时触发',
    })
    onOpen: () => void;

    @Event({
      title: '关闭菜单时触发',
      description: '关闭菜单时触发',
    })
    onClose: () => void;

    @Event({
      title: '打开菜单且动画结束后触发',
      description: '打开菜单且动画结束后触发',
    })
    onOpened: () => void;

    @Event({
      title: '关闭菜单且动画结束后触发',
      description: '关闭菜单且动画结束后触发',
    })
    onClosed: () => void;

    @Event({
      title: '点击遮罩层时触发',
      description: '点击遮罩层时触发',
    })
    onClickOverlay: (event: any) => void;

    @Slot({
      title: '自定义菜单内容',
      description: '自定义菜单内容',
    })
    slotDefault: () => Array<ViewComponent>;

    @Slot({
      title: '触发 Popover 显示的元素内容',
      description: '触发 Popover 显示的元素内容',
    })
    slotReference: () => Array<ViewComponent>;

    @Slot({
      title: '自定义选项内容',
      description: '自定义选项内容',
    })
    slotAction: (current: Current<T>, index: nasl.core.Integer) => Array<ViewComponent>;
  }
}
