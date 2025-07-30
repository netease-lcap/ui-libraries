/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    order: 1,
    ideusage: {
      idetype: 'container',
      structured: true,
      childAccept: true,
      translateBindingProperty: ['leftWidth', 'rightWidth'],
      useSwipe: {
        prop: 'swipeState',
        left: '`left`',
        right: '`right`',
        init: '``',
      },
      namedSlotOmitWrapper: ['left', 'right'],
    },
  })
  @Component({
    title: '滑动单元格',
    icon: 'swipe',
    description: '可以左右滑动来展示操作按钮，通常用于列表项的操作。',
    group: 'Feedback',
  })
  export class VanSwipeCell extends ViewComponent {
    @Method({
      title: '打开左侧',
      description: '打开左侧滑动区域',
    })
    open(
      @Param({
        title: '位置',
        description: '位置',
      })
      position: 'left' | 'right',
    ): void {}

    @Method({
      title: '关闭',
      description: '关闭滑动区域',
    })
    close(): void {}

    constructor(options?: Partial<VanSwipeCellOptions>) {
      super();
    }
  }

  export class VanSwipeCellOptions extends ViewComponentOptions {
    @Prop({
      group: '主要属性',
      title: '标识符',
      description: '标识符，可以在事件参数中获取到',
      setter: { concept: 'InputSetter' },
    })
    name: nasl.core.String | nasl.core.Integer;

    @Prop({
      group: '主要属性',
      title: '左侧滑动区域宽度',
      description: '左侧滑动区域宽度',
      setter: { concept: 'NumberInputSetter' },
    })
    leftWidth: nasl.core.Decimal;

    @Prop({
      group: '主要属性',
      title: '右侧滑动区域宽度',
      description: '右侧滑动区域宽度',
      setter: { concept: 'NumberInputSetter' },
    })
    rightWidth: nasl.core.Decimal;

    @Prop({
      group: '主要属性',
      title: '是否禁用',
      description: '是否禁用滑动',
      setter: { concept: 'SwitchSetter' },
    })
    disabled: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '是否阻止点击事件',
      description: '是否阻止点击事件',
      setter: { concept: 'SwitchSetter' },
    })
    stopPropagation: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '是否阻止第五',
      description: '是否阻止第五',
      setter: { concept: 'SwitchSetter' },
    })
    stopPropagationIsFifth: nasl.core.Boolean = false;

    @Event({
      title: '点击时',
      description: '点击时触发',
    })
    onClick: (event: { position: 'left' | 'right' | 'cell' | 'outside' }) => void;

    @Event({
      title: '打开时',
      description: '打开时触发',
    })
    onOpen: (event: { position: 'left' | 'right'; name: nasl.core.String | nasl.core.Integer }) => void;

    @Event({
      title: '关闭时',
      description: '关闭时触发',
    })
    onClose: (event: { position: 'left' | 'right'; name: nasl.core.String | nasl.core.Integer }) => void;

    @Event({
      title: '关闭前',
      description: '关闭前的回调函数，返回 false 可阻止关闭',
    })
    onBeforeClose: (event: { position: 'left' | 'right'; name: nasl.core.String | nasl.core.Integer }) => void;

    @Slot({
      title: '默认',
      description: '默认插槽',
    })
    slotDefault: () => Array<ViewComponent>;

    @Slot({
      title: '左侧',
      description: '左侧滑动区域',
    })
    slotLeft: () => Array<ViewComponent>;

    @Slot({
      title: '右侧',
      description: '右侧滑动区域',
    })
    slotRight: () => Array<ViewComponent>;

  }
}
