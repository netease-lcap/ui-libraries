/// <reference types="@nasl/types" />

namespace nasl.ui {
  @Component({
    title: '弹出消息',
    icon: 'toast',
    description: '在页面中间弹出黑色半透明提示，用于消息通知、加载提示、操作结果提示等场景。',
    group: "Feedback"
  })
  export class VanToast extends ViewComponent {
    constructor(options?: Partial<VanToastOptions>) {
      super();
    }
    @Method({
      title: 'undefined',
      description: '打开弹出消息'
    })
    open(): any {}
    @Method({
      title: 'undefined',
      description: '关闭弹出消息'
    })
    close(): any {}
  }
  export class VanToastOptions extends ViewComponentOptions {
    @Prop({
      title: '是否展示',
      description: '是否展示弹出消息',
      sync: true,
      setter: {
        concept: "SwitchSetter"
      }
    })
    private value: nasl.core.Boolean = false;
    @Prop({
      title: '提示内容',
      description: '默认提示内容'
    })
    message: nasl.core.String = '弹出消息';
    @Prop({
      title: '消息类型',
      description: '提示的类型',
      setter: {
        concept: "EnumSelectSetter",
        options: [{
          title: '成功'
        }, {
          title: '警告'
        }, {
          title: '失败'
        }, {
          title: '加载中'
        }, {
          title: '自定义'
        }]
      }
    })
    type: 'success' | 'warning' | 'fail' | 'loading' | 'custom' = 'custom';
    @Prop<VanToastOptions, 'customIcon'>({
      title: '自定义图标',
      if: _ => _.type === 'custom',
      setter: {
        concept: "IconSetter"
      }
    })
    customIcon: nasl.core.String;
    @Prop({
      title: '停留时间',
      description: '自动关闭的延时，单位毫秒。设为 0 时不自动关闭',
      setter: {
        concept: "NumberInputSetter",
        precision: 0
      }
    })
    duration: nasl.core.Integer = 2000;
    @Prop({
      title: '位置',
      setter: {
        concept: "EnumSelectSetter",
        options: [{
          title: '顶部'
        }, {
          title: '中间'
        }, {
          title: '底部'
        }]
      }
    })
    private position: 'top' | 'middle' | 'bottom' = 'middle';
    @Event({
      title: '打开弹出消息后',
      description: '打开弹出消息时触发'
    })
    onOpen: (event: any) => any ;
    @Event({
      title: '关闭弹出消息后',
      description: '关闭弹出消息时触发'
    })
    onClose: (event: any) => any ;
  }
}
