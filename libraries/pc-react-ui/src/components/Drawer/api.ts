/// <reference types="@nasl/types" />

namespace nasl.ui {
  @Component({
    title: '抽屉',
    icon: 'drawer',
    description: '抽屉',
    group: 'Feedback',
  })
  export class Drawer extends ViewComponent {
    @Method({
      title: 'undefined',
      description: '打开抽屉',
    })
    open(): void {}

    @Method({
      title: 'undefined',
      description: '关闭抽屉',
    })
    close(): void {}
    constructor(options?: Partial<DrawerOptions>) {
      super();
    }
  }

  export class DrawerOptions extends ViewComponentOptions {
    @Prop({
      group: '主要属性',
      title: '抽屉位置',
      description: '抽屉弹出的位置',
      docDescription: '支持选择抽屉的显示位置，支持上、下、左、右四个位置',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '上' }, { title: '下' }, { title: '左' }, { title: '右' }],
      },
    })
    placement: 'top' | 'bottom' | 'left' | 'right' = 'right';

    // @Prop({
    //   group: '主要属性',
    //   title: '显示顶部栏',
    //   docDescription: '控制抽屉顶部栏的开启和关闭',
    //   setter: {
    //     concept: 'SwitchSetter',
    //   },
    // })
    // showHead: nasl.core.Boolean = true;

    // @Prop({
    //   group: '主要属性',
    //   title: '显示底部栏',
    //   docDescription: '控制抽屉底部栏的开启和关闭',
    //   setter: {
    //     concept: 'SwitchSetter',
    //   },
    // })
    // showFoot: nasl.core.Boolean = true;
    @Prop({
      group: '主要属性',
      title: '是否展示遮罩',
      setter: {
        concept: 'SwitchSetter',
      },
    })
    mask: nasl.core.Boolean = true;

    @Prop<DrawerOptions, 'maskClosable'>({
      group: '交互属性',
      title: '点击遮罩关闭',
      description: '点击遮罩关闭抽屉',
      docDescription: `控制抽屉打开时，点击遮罩区域的作用，默认开启。
- 开启：点击遮罩区域则自动关闭抽屉。
- 关闭：点击遮罩区域无实际作用`,
      setter: {
        concept: 'SwitchSetter',
      },

      if: (_) => _.mask === true,
    })
    maskClosable: nasl.core.Boolean = true;

    // @Prop({
    //   group: '状态属性',
    //   title: '显示状态',
    //   description: '显示状态分为“True(打开)/False(关闭)”，默认为“打开”',
    //   sync: true,
    //   docDescription: '控制抽屉是否进入页面时自动显示。开启表示自动显示，关闭表示不自动显示',
    //   setter: {
    //     concept: 'SwitchSetter',
    //   },
    // })
    // open: nasl.core.Boolean;

    @Prop({
      group: '样式属性',
      title: '尺寸',
      description: '抽屉的尺寸',
      docDescription: '支持配置抽屉的宽度或者高度，支持小、正常、大、三个尺寸',
      // setter: {
      //   concept: 'EnumSelectSetter',
      //   options: [{ title: '小' }, { title: '正常' }, { title: '大' }],
      // },
    })
    width: nasl.core.Integer = 378;

    @Event({
      title: '切换时',
      description: '切换抽屉时动画结束后的回调',
    })
    afterOpenChange: (event: any) => any;

    @Event({
      title: '关闭时',
      description: '关闭抽屉时触发',
    })
    onClose: (event: { ok: nasl.core.Boolean }) => any;

    @Slot({
      title: '头部',
      description: '插入文本或 HTML。',
    })
    slotTitle: () => Array<ViewComponent>;

    @Slot({
      title: '内容区',
      description: '插入文本或 HTML。',
    })
    slotDefault: () => Array<ViewComponent>;

    @Slot({
      title: '底部',
      description: '插入文本或 HTML。',
    })
    slotFooter: () => Array<ViewComponent>;

    @Slot({
      title: '抽屉右上角的操作区域',
      description: '抽屉右上角的操作区域',
    })
    slotExtra: () => Array<ViewComponent>;
  }
}
