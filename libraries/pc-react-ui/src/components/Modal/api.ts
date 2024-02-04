/// <reference types="@nasl/types" />

namespace nasl.ui {
  @Component({
    title: '弹窗',
    icon: 'modal',
    description: '弹窗',
    group: 'Feedback',
  })
  export class UModal extends ViewComponent {
    @Method({
      title: 'undefined',
      description: '打开弹窗',
    })
    open(): void {}

    @Method({
      title: 'undefined',
      description: '关闭弹窗',
    })
    close(): void {}
    constructor(options?: Partial<UModalOptions>) {
      super();
    }
  }

  export class UModalOptions extends ViewComponentOptions {
    @Prop({
      title: '标题',
      description: '弹窗的标题',
    })
    private title: nasl.core.String = '提示';

    @Prop({
      title: '内容',
      description: '弹窗的内容',
    })
    private content: nasl.core.String = '提示内容';

    @Prop({
      title: '详情描述',
      description: '弹窗的详情描述',
    })
    private description: nasl.core.String = '详情描述';

    @Prop({
      title: '确定按钮',
      description: '确定按钮文本，如果为空则不显示',
    })
    private okButton: nasl.core.String = '确定';

    @Prop({
      title: '取消按钮',
      description: '取消按钮文本，如果为空则不显示',
    })
    private cancelButton: nasl.core.String = '取消';

    @Prop({
      title: '嵌入页面显示',
      description: '是否嵌入页面显示',
      setter: {
        concept: 'SwitchSetter',
      },
    })
    private static: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '显示头部栏',
      setter: {
        concept: 'SwitchSetter',
      },
    })
    showHead: nasl.core.Boolean = true;

    @Prop({
      group: '主要属性',
      title: '显示底部栏',
      setter: {
        concept: 'SwitchSetter',
      },
    })
    showFoot: nasl.core.Boolean = true;

    @Prop({
      group: '主要属性',
      title: '提示图标',
      docDescription: '可设置成功、警告、错误，弹窗中会自动添加图标',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '暂无' }, { title: '成功' }, { title: '警告' }, { title: '错误' }],
      },
    })
    icon: '' | 'success' | 'warning' | 'error' = '';

    @Prop({
      group: '交互属性',
      title: '点击遮罩关闭',
      description: '点击遮罩关闭弹窗',
      docDescription: '开启时，点击遮罩则自动关闭弹窗，若关闭，需要手动设置关闭事件，默认关闭',
      setter: {
        concept: 'SwitchSetter',
      },
    })
    maskClosable: nasl.core.Boolean = false;

    @Prop({
      group: '状态属性',
      title: '显示状态',
      description: '显示状态分为“True(打开)/False(关闭)”，默认为“打开”',
      sync: true,
      docDescription: '开启时进入页面即显示弹窗，默认关闭',
      setter: {
        concept: 'SwitchSetter',
      },
    })
    open: nasl.core.Boolean = false;

    @Prop({
      group: '样式属性',
      title: '尺寸',
      description: '弹窗的尺寸',
      // setter: {
      //   concept: 'EnumSelectSetter',
      //   options: [{ title: '小' }, { title: '正常' }, { title: '大' }, { title: '巨大' }, { title: '自适应' }],
      // },
    })
    width: nasl.core.Integer;

    @Event({
      title: '点击确定',
      description: '点击确定回调，参数为关闭函数，返回 promise 时 resolve 后自动关闭	',
    })
    onOk: (event: any) => any;

    @Event({
      title: '打开关闭后',
      description: '打开和关闭 Modal 时动画结束后的回调	',
    })
    afterOpenChange: (event: any) => any;

    @Event({
      title: '关闭时',
      description: '点击遮罩层或右上角叉或取消按钮的回调',
    })
    onCancel: (event: { ok: nasl.core.Boolean }) => any;

    @Slot({
      title: 'undefined',
      description: '弹窗标题自定义',
    })
    slotTitle: () => Array<ViewComponent>;

    // @Slot({
    //   title: 'undefined',
    //   description: '弹窗头部自定义',
    // })
    // slotHead: () => Array<ViewComponent>;

    @Slot({
      title: 'undefined',
      description: '弹窗中部自定义',
    })
    slotChildren: () => Array<ViewComponent>;

    @Slot({
      title: 'undefined',
      description: '弹窗尾部自定义',
    })
    slotFooter: () => Array<ViewComponent>;

    // @Slot({
    //   title: 'undefined',
    //   description: '弹框小标题自定义',
    // })
    // slotHeading: () => Array<ViewComponent>;

    // @Slot({
    //   title: '默认',
    //   description: '弹窗内容自定义',
    // })
    // slotDefault: () => Array<ViewComponent>;
  }
}
