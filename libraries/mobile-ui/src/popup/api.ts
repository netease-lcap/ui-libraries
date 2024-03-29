/// <reference types="@nasl/types" />

namespace nasl.ui {
  @Component({
    title: '抽屉',
    icon: 'popuph5',
    description: '抽屉容器，用于展示弹窗、信息提示等内容，支持多个抽屉叠加展示。',
    group: "Feedback"
  })
  export class VanPopup extends ViewComponent {
    constructor(options?: Partial<VanPopupOptions>) {
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
  export class VanPopupOptions extends ViewComponentOptions {
    @Prop({
      group: '主要属性',
      title: '展示弹层',
      sync: true,
      setter: {
        concept: "SwitchSetter"
      }
    })
    value: nasl.core.Boolean = false;
    @Prop({
      group: '主要属性',
      title: '弹出位置',
      description: '设置弹出位置',
      setter: {
        concept: "EnumSelectSetter",
        options: [{
          title: '上'
        }, {
          title: '下'
        }, {
          title: '右'
        }, {
          title: '左'
        }]
      }
    })
    position: 'top' | 'bottom' | 'right' | 'left' = 'bottom';
    @Prop({
      group: '交互属性',
      title: '点击遮罩层后关闭',
      setter: {
        concept: "SwitchSetter"
      }
    })
    closeOnClickOverlay: nasl.core.Boolean = false;
    @Event({
      title: '点击抽屉',
      description: '点击抽屉时触发'
    })
    onClick: (event: any) => any ;
    @Event({
      title: '点击遮罩层',
      description: '点击遮罩层时触发'
    })
    onClickOverlay: (event: any) => any ;
    @Event({
      title: '打开抽屉后',
      description: '打开抽屉时触发'
    })
    onOpen: (event: any) => any ;
    @Event({
      title: '关闭抽屉后',
      description: '关闭抽屉时触发'
    })
    onClose: (event: any) => any ;
    @Slot({
      title: 'undefined',
      description: '内容自定义'
    })
    slotDefault: () => Array<ViewComponent>;
  }
}
