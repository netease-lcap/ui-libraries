/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    order: 2,
    ideusage: {
      idetype: 'container',
      structured: true,
      containerDirection: 'row',
      childAccept: "target.tag === 'van-tab'",
      forceRefresh: true,
    },
  })
  @Component({
    title: '选项卡',
    icon: 'tabs',
    description: '选项卡',
    group: 'Display',
  })
  export class VanTabs extends ViewComponent {
    @Prop({
      title: '值',
    })
    active: VanTabsOptions['active'];

    @Method({
      title: 'resize',
      description: '外层元素大小或组件显示状态变化时，可以调用此方法来触发重绘'
    })
    resize(): any {}

    @Method({
      title: 'scrollTo',
      description: '滚动到指定位置'
    })
    scrollTo(
      @Param({
          title: '标签页',
          description: '要滚动到的标签页的选项值',
      })
      name?: nasl.core.Integer | nasl.core.String,
    ): void {}

    constructor(options?: Partial<VanTabsOptions>) {
      super();
    }
  }

  export class VanTabsOptions extends ViewComponentOptions {
    @Prop({
      group: '数据属性',
      title: '值',
      sync: true,
      description: '当前激活标签对应的索引值',
      setter: { concept: 'InputSetter' },
    })
    active: nasl.core.String | nasl.core.Integer;

    @Prop({
      group: '样式属性',
      title: '样式类型',
      description: '设置选项卡为线条类型或胶囊类型',
      setter: {
        concept: 'EnumSelectSetter',
        options: [
          {
            title: '线条',
          },
          {
            title: '胶囊',
          },
        ],
      },
    })
    type: 'line' | 'card' = 'line';

    @Prop({
      group: '样式属性',
      title: '外边框',
      description: '是否显示标签栏外边框，仅在样式类型为线条时有效',
      setter: {
        concept: 'SwitchSetter',
      },
      if: (_) => _.type === 'line',
    })
    border: nasl.core.Boolean = false;

    @Prop({
      group: '样式属性',
      title: '标题过长省略',
      description: '是否省略过长的标题文字（仅在收缩布局关闭时且标签页数量小于等于滚动阈值时生效）',
      setter: {
        concept: 'SwitchSetter',
      },
      if: (_) => !_.shrink,
    })
    ellipsis: nasl.core.Boolean = false;

    @Prop({
      group: '样式属性',
      title: '滚动阈值',
      description: '标签数量超过阈值且总宽度超过标签栏宽度时开始横向滚动（仅在收缩布局关闭且标题过长省略打开时生效）',
      setter: {
        concept: 'NumberInputSetter',
      },
      if: (_) => _.ellipsis && !_.shrink,
    })
    swipThreshold: nasl.core.Integer = 5;

    @Prop({
      group: '交互属性',
      title: '自动吸顶',
      setter: {
        concept: 'SwitchSetter',
      },
      onChange: [{ clear: ['offsetTop'] }],
    })
    sticky: nasl.core.Boolean = false;

    @Prop({
      group: '交互属性',
      title: '与顶部的距离',
      description: '粘性布局下吸顶时与顶部的距离，支持 px vw vh rem 单位，默认 px',
      setter: {
        concept: 'InputSetter',
      },
      if: (_) => _.sticky === true,
    })
    offsetTop: nasl.core.String | nasl.core.Integer;

    @Prop({
      group: '交互属性',
      title: '收缩布局',
      description: '是否开启左侧收缩布局',
      setter: {
        concept: 'SwitchSetter',
      },
    })
    shrink: nasl.core.Boolean = false;

    @Prop({
      group: '交互属性',
      title: '滑动切换',
      description: '是否开启手势左右滑动切换（开启该属性后，内容区如果有粘性布局将会不达预期）',
      setter: {
        concept: 'SwitchSetter',
      },
    })
    swipeable: nasl.core.Boolean = false;

    @Prop({
      group: '交互属性',
      title: '延迟渲染',
      description: '是否开启延迟渲染（首次切换到标签时才触发内容渲染）',
      setter: {
        concept: 'SwitchSetter',
      },
    })
    lazyRender: nasl.core.Boolean = false;

    @Prop({
      group: '交互属性',
      title: '滚动导航',
      description: '是否开启滚动导航',
      setter: {
        concept: 'SwitchSetter',
      },
    })
    scrollspy: nasl.core.Boolean = false;

    @Prop({
      group: '交互属性',
      title: '开启转场动画',
      setter: {
        concept: 'SwitchSetter',
      },
    })
    animated: nasl.core.Boolean = false;

    @Event({
      title: '点击标签',
      description: '点击标签时触发'
    })
    onClickTab: (event: {
      name: nasl.core.String | nasl.core.Integer;
      title: nasl.core.String;
      disabled: nasl.core.Boolean;
      event: {
        altKey: nasl.core.Boolean;
        button: nasl.core.Integer;
        clientX: nasl.core.Integer;
        clientY: nasl.core.Integer;
        ctrlKey: nasl.core.Boolean;
        metaKey: nasl.core.Boolean;
        movementX: nasl.core.Integer;
        movementY: nasl.core.Integer;
        offsetX: nasl.core.Integer;
        offsetY: nasl.core.Integer;
        pageX: nasl.core.Integer;
        pageY: nasl.core.Integer;
        screenX: nasl.core.Integer;
        screenY: nasl.core.Integer;
        which: nasl.core.Integer;
      }
    }) => void;

    @Event({
      title: '标签改变',
      description: '当前激活的标签改变时触发'
    })
    onChange: (event: nasl.core.String | nasl.core.Integer) => void;

    @Event({
      title: '标签首次渲染时',
      description: '标签内容首次渲染时触发（仅在开启延迟渲染后触发）'
    })
    onRendered: (event: nasl.core.String | nasl.core.Integer) => void;

    @Event({
      title: '滚动时',
      description: '滚动时触发，仅在 sticky 模式下生效'
    })
    onScroll: (event: {
      scrollTop: nasl.core.Integer;
      isFixed: nasl.core.Boolean;
    }) => void;

    @Slot({
      title: '标签页',
      description: '插入`<van-tab>`子组件。',
      emptyBackground: 'add-sub',
      snippets: [{
        title: '标签页',
        code: '<van-tab><template #title><van-text text="标签"></van-text></template><van-text text="内容"></van-text></van-tab>'
      }]
    })
    slotDefault: () => Array<ViewComponent>;
  }

  @IDEExtraInfo({
    ideusage: {
      idetype: 'container',
      parentAccept: "target.tag.endsWith('van-tabs')",
      selector: [
        {
          expression: "this.getElement(el => el.slotTarget === 'title')",
          cssSelector: '.van-tab',
        },
        {
          expression: 'this',
          cssSelector: '.van-tab__panel',
        },
      ],
      displaySlotInline: {
        title: true,
      },
      events: {
        click: true,
      },
      forceRefresh: true,
      namedSlotOmitWrapper: ['title'],
    },
  })
  @Component({
    title: '标签页',
    description: '标签页',
  })
  export class VanTab extends ViewComponent {
    @Prop({
      title: '禁用',
    })
    disabled: nasl.core.Boolean;

    constructor(options?: Partial<VanTabOptions>) {
      super();
    }
  }
  export class VanTabOptions extends ViewComponentOptions {
    @Prop({
      group: '数据属性',
      title: '选项值',
      description: '用于标识选项的值',
    })
    name: nasl.core.String | nasl.core.Integer;

    @Prop({
      group: '主要属性',
      title: '小红点',
      description: '是否在标题右上角显示小红点',
      setter: {
        concept: 'SwitchSetter',
      },
    })
    dot: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '徽标',
      description: '图标右上角徽标的内容（dot 为 fasle 时生效）',
      setter: {
        concept: 'NumberInputSetter',
      },
      if: (_) => _.dot === false,
    })
    badge: nasl.core.Boolean = false;

    @Prop({
      group: '交互属性',
      title: '链接地址'
    })
    hrefAndTo: nasl.core.String;

    @Prop({
      group: '交互属性',
      title: '替换路由',
      description:
        '在使用 to 进行路由跳转时，启用 replace 将不会向 history 添加新记录',
      setter: { concept: 'SwitchSetter' },
    })
    replace: nasl.core.Boolean = false;

    @Prop({
      group: '状态属性',
      title: '禁用',
      description: '置灰显示，且禁止任何交互（焦点、点击、选择、输入等）',
      setter: {
        concept: 'SwitchSetter',
      },
    })
    disabled: nasl.core.Boolean = false;

    @Slot({
      title: '默认',
      description: '显示的内容',
    })
    slotDefault: () => Array<ViewComponent>;

    @Slot({
      title: '自定义标题',
      description: '自定义标题',
    })
    slotTitle: () => Array<ViewComponent>;
  }
}
