/// <reference types="@nasl/types" />

namespace nasl.ui {
  @Component({
    title: '弹窗',
    icon: 'dialog',
    description: '弹窗，常用于消息提示、消息确认，或在当前页面内完成特定的交互操作。',
    group: "Feedback"
  })
  export class VanDialog extends ViewComponent {
    constructor(options?: Partial<VanDialogOptions>) {
      super();
    }
    @Method({
      title: 'undefined',
      description: '打开弹窗'
    })
    openModal(): any {}
    @Method({
      title: 'undefined',
      description: '关闭弹窗'
    })
    closeModal(): any {}
  }
  export class VanDialogOptions extends ViewComponentOptions {
    @Prop({
      title: '是否展示确认按钮',
      description: '是否展示确认按钮',
      setter: {
        concept: "SwitchSetter"
      }
    })
    private showConfirmButton: nasl.core.Boolean = true;
    @Prop({
      title: '是否展示取消按钮',
      description: '是否展示取消按钮',
      setter: {
        concept: "SwitchSetter"
      }
    })
    private showCancelButton: nasl.core.Boolean = true;
    @Prop({
      group: '主要属性',
      title: '展示弹框',
      sync: true,
      setter: {
        concept: "SwitchSetter"
      }
    })
    value: nasl.core.Boolean = false;
    @Prop({
      group: '交互属性',
      title: '点击遮罩层后关闭',
      setter: {
        concept: "SwitchSetter"
      }
    })
    closeOnClickOverlay: nasl.core.Boolean = false;
    @Event({
      title: '打开弹出层后',
      description: '打开弹出层时触发'
    })
    onOpen: (event: nasl.ui.BaseEvent) => void;
    @Event({
      title: '关闭弹出层后',
      description: '关闭弹出层时触发'
    })
    onClose: (event: nasl.ui.BaseEvent) => void;
    @Slot({
      title: 'undefined',
      description: '内容自定义'
    })
    slotDefault: () => Array<ViewComponent>;

    @Slot({
      title: 'undefined',
      description: '内容自定义'
    })
    slotFooter: () => Array<ViewComponent>;

  }
}
