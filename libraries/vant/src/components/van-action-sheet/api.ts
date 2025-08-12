/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    order: 3,
    ideusage: {
      idetype: 'drawer',
      cacheOpenKey: 'show',
      structured: true,
      selector: {
        expression: 'this',
        cssSelector: '.van-popup',
      },
      additionalAttribute: {
        ":dataSource": "\"[{},{}, {}]\"",
      },
      slotWrapperInlineStyle: {
        action: "display: block; width: 100%;",
      },
      style: [
        {
          selector: '.van-action-sheet__content .van-action-sheet__item:not(:first-child)',
          declaration: 'opacity: 0.4; pointer-events: none; cursor: not-allowed;',
        },
      ],
    },
  })
  @Component({
    title: '动作面板',
    icon: 'picker',
    description: '底部弹起的模态面板，包含与当前情境相关的多个选项。',
    group: "Feedback"
  })
  export class VanActionSheet<T, V, M extends nasl.core.Boolean, P extends nasl.core.Boolean, C> extends ViewComponent {
    constructor(options?: Partial<VanActionSheetOptions<T, V, M, P, C>>) {
      super();
    }
  }
  export class VanActionSheetOptions<T, V, M extends nasl.core.Boolean, P extends nasl.core.Boolean, C> extends ViewComponentOptions {
    // @Prop({
    //   group: '数据属性',
    //   title: '值',
    //   description: '用于标识动作面板的值',
    //   sync: true,
    //   settable: true,
    // })
    // value: M extends true ? (C extends '' ? nasl.collection.List<V> : nasl.core.String) : V;
    
    @Prop({
      group: '数据属性',
      title: '数据源',
      description: '展示数据的输入源，可设置为数据集对象或者返回数据集的逻辑',
      designerValue: [{}, {}, {}, {}, {}, {}],
      bindOpen: true,
    })
    dataSource: nasl.collection.List<T> | { total: nasl.core.Integer; list: nasl.collection.List<T> };
    
    @Prop({
      group: '数据属性',
      title: '数据类型',
      description: '集合类型每一元素的数据类型'
    })
    dataSchema: T;

    @Prop({
      group: '数据属性',
      title: '动作项标题字段名',
      description: '动作项标题的字段名',
      setter: {
        concept: "PropertySelectSetter"
      }
    })
    nameField: (item: T) => nasl.core.String = ((item: any)  => item.name) as any;

    @Prop({
      group: '数据属性',
      title: '动作项二级标题字段名',
      description: '动作项二级标题的字段名',
      setter: {
        concept: "PropertySelectSetter"
      }
    })
    subNameField: (item: T) => nasl.core.String = ((item: any)  => item.subName) as any;

    @Prop({
      group: '数据属性',
      title: '动作项文字颜色字段名',
      description: '动作项文字颜色的字段名',
      setter: {
        concept: "PropertySelectSetter"
      }
    })
    colorField: (item: T) => nasl.core.String = ((item: any)  => item.color) as any;

    @Prop({
      group: '数据属性',
      title: '动作项图标字段名',
      description: '动作项图标的字段名',
      setter: {
        concept: "PropertySelectSetter"
      }
    })
    iconField: (item: T) => nasl.core.String = ((item: any)  => item.icon) as any;

    @Prop({
      group: '数据属性',
      title: '动作项加载状态字段名',
      description: '动作项是否为加载状态',
      setter: {
        concept: "PropertySelectSetter"
      }
    })
    loadingField: (item: T) => nasl.core.Boolean = ((item: any)  => item.loading) as any;

    @Prop({
      group: '数据属性',
      title: '动作项是否禁用字段名',
      description: '动作项是否禁用',
      setter: {
        concept: "PropertySelectSetter"
      }
    })
    disabledField: (item: T) => nasl.core.Boolean = ((item: any)  => item.disabled) as any;

    @Prop({
      group: '主要属性',
      title: '是否显示',
      description: '是否显示动作面板',
      sync: true,
      setter: {
        concept: "SwitchSetter"
      },
      settable: true,
    })
    show: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '标题',
      description: '动作面板的标题',
      implicitToString: true,
    })
    title: nasl.core.String;

    @Prop<VanActionSheetOptions<T, V, M, P, C>, 'closeable'>({
      group: '主要属性',
      title: '是否显示关闭按钮',
      description: '是否显示关闭按钮',
      setter: {
        concept: "SwitchSetter"
      },
      if: (_) => !!_.title,
    })
    closeable: nasl.core.Boolean = true;

    // 这里源码里只接受 string 类型的值，不接受组件，不能用 cw 的图标组件
    @Prop<VanActionSheetOptions<T, V, M, P, C>, 'closeIcon'>({
      group: '主要属性',
      title: '关闭按钮图标',
      description: '关闭按钮的图标',
      implicitToString: true,
      setter: {
        concept: 'IconSetter',
        customIconFont: 'LCAP_VANT4_ICONS',
      },
      if: (_) => !!_.title && _.closeable,
    })
    closeIcon: nasl.core.String = 'cross';
    
    @Prop({
      group: '主要属性',
      title: '动画时长',
      description: '动画时长，单位秒，设置为 0 可以禁用动画',
      setter: {
        concept: "InputSetter"
      }
    })
    duration: nasl.core.String = '0.3';

    @Prop({
      group: '主要属性',
      title: '层级',
      description: '将面板的 z-index 层级设置为一个固定值',
      setter: {
        concept: "NumberInputSetter"
      }
    })  
    zIndex: nasl.core.Integer = 2000;

    @Prop({
      group: '主要属性',
      title: '圆角',
      description: '是否圆角格式',
      setter: {
        concept: "SwitchSetter"
      }
    })
    round: nasl.core.Boolean = true;

    @Prop({
      group: '主要属性',
      title: '显示遮罩层',
      description: '是否显示遮罩层',
      setter: {
        concept: "SwitchSetter"
      }
    })
    overlay: nasl.core.Boolean = true;

    @Prop({
      group: '主要属性',
      title: '锁定背景滚动',
      description: '是否锁定背景滚动',
      setter: {
        concept: "SwitchSetter"
      }
    })
    lockScroll: nasl.core.Boolean = true;

    @Prop({
      group: '主要属性',
      title: '懒渲染',
      description: '是否在显示弹层时才渲染节点',
      setter: {
        concept: "SwitchSetter"
      }
    })
    lazyRender: nasl.core.Boolean = true;

    @Prop({
      group: '主要属性',
      title: '页面回退时自动关闭',
      description: '是否在页面回退时自动关闭',
      setter: {
        concept: "SwitchSetter"
      }
    })
    closeOnPopstate: nasl.core.Boolean = true;

    @Prop({
      group: '主要属性',
      title: '点击选项后关闭',
      description: '是否在点击选项后关闭',
      setter: {
        concept: "SwitchSetter"
      }
    })
    closeOnClickAction: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '点击遮罩层后关闭',
      description: '是否在点击遮罩层后关闭',
      setter: {
        concept: "SwitchSetter"
      }
    })
    closeOnClickOverlay: nasl.core.Boolean = true;

    @Prop({
      group: '主要属性',
      title: '开启底部安全区适配',
      description: '是否开启底部安全区适配',
      setter: {
        concept: "SwitchSetter"
      }
    })
    safeArea: nasl.core.Boolean = true;

    @Event({
      title: '点击动作项时触发',
      description: '使用数据源时，点击动作项时触发的回调函数',
    })
    onCallBack: (action: T) => void;

    @Event({
      title: '关闭前触发',
      description: '关闭前触发',
    })
    onBeforeClose: (event: any) => any;

    @Event({
      title: '点击选项时触发',
      description: '点击选项时触发，禁用或加载状态下不会触发',
    })
    onSelect: (event: {
      action: any;
      index: number;
    }) => void;

    @Event({
      title: '点击取消按钮时触发',
      description: '点击取消按钮时触发',
    })
    onCancel: () => void;

    @Event({
      title: '打开面板时触发',
      description: '打开面板时触发',
    })
    onOpen: () => void;

    @Event({
      title: '关闭面板时触发',
      description: '关闭面板时触发',
    })
    onClose: () => void;

    @Event({
      title: '打开面板且动画结束后触发',
      description: '打开面板且动画结束后触发',
    })
    onOpened: () => void;

    @Event({
      title: '关闭面板且动画结束后触发',
      description: '关闭面板且动画结束后触发',
    })
    onClosed: () => void;

    @Event({
      title: '点击遮罩层时触发',
      description: '点击遮罩层时触发',
    })
    onClickOverlay: (event: {
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
    }) => void;
    
    @Slot({
      title: '自定义面板的展示内容',
      description: '自定义面板的展示内容',
    })
    slotDefault: () => Array<ViewComponent>;

    @Slot({
      title: '自定义描述文案',
      description: '自定义描述文案',
    })
    slotDescription: () => Array<ViewComponent>;

    @Slot({
      title: '自定义取消按钮内容',
      description: '自定义取消按钮内容',
    })
    slotCancel: () => Array<ViewComponent>;

    @Slot({
      title: '自定义选项内容',
      description: '自定义选项内容',
    })
    slotAction: (current: Current<T>) => Array<ViewComponent>;
  }
}
