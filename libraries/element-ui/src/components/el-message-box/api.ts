/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    order: 2,
    ideusage: {
      "idetype": "messager",
      "elementSutando": {
        "condition": true,
        "component": "ElMessageBoxDesigner",
        "selector": {
          "slot": "default",
          "cssSelector": ".el-message-box",
        },
        "useSlot": true,
      },
      "cacheOpenKey": "visible"
    }
  })
  @Component({
    title: '弹框',
    icon: 'dialog',
    description: '模拟系统的消息提示框而实现的一套模态对话框组件，用于消息提示、确认消息和提交内容。',
    group: 'Feedback',
  })
  export class ElMessageBox extends ViewComponent {
    @Method({
      title: '显示弹框',
      description: '显示弹框',
    })
    open(): void {}

    @Method({
      title: '关闭弹框',
      description: '关闭弹框',
    })
    close(): void {}

    constructor(options?: Partial<ElMessageBoxOptions>) {
      super();
    }
  }

  export class ElMessageBoxOptions extends ViewComponentOptions {
    @Prop({
      title: '显示',
      description: '是否显示',
      group: '主要属性',
      setter: {
        concept: 'SwitchSetter',
      },
      sync: true,
    })
    visible: nasl.core.Boolean = false;

    @Prop<ElMessageBoxOptions, 'type'>({
      title: '弹框类型',
      description: '消息提示、确认消息、提交内容',
      group: "主要属性",
      setter: {
        concept: "EnumSelectSetter",
        options: [{ title: '消息提示' }, { title: '确认消息' }, { title: '提交内容' }],
      },
      onChange: [{
        update: {
          showCancelButton: true,
        },
        if: (_) => _ === 'confirm' || _ === 'prompt',
      }, {
        update: {
          showCancelButton: false,
        },
        if: (_) => _ === 'alert',
      }],
    })
    type: 'alert' | 'confirm' | 'prompt' = 'alert';

    @Prop({
      title: '图标类型',
      description: '图标类型',
      group: "主要属性",
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '信息' }, { title: '成功' }, { title: '警告' }, { title: '错误' }, { title: '默认' }]
      }
    })
    iconType: 'info' | 'success' | 'warning' | 'error' | '' = '';

    @Prop({
      title: '标题',
      description: '通知标题',
      group: '主要属性',
      setter: {
        concept: 'InputSetter',
      },
    })
    title: nasl.core.String = '';

    @Prop({
      title: '关闭按钮',
      description: '是否显示关闭按钮',
      group: '主要属性',
      setter: {
        concept: 'SwitchSetter',
      },
    })
    showClose: nasl.core.Boolean = false;

    @Prop({
      title: '居中',
      description: '文字是否居中',
      group: '主要属性',
      setter: {
        concept: 'SwitchSetter',
      },
    })
    center: nasl.core.Boolean = false;

    @Prop({
      title: '圆角按钮',
      description: '是否使用圆角按钮',
      group: '主要属性',
      setter: {
        concept: 'SwitchSetter',
      },
    })
    roundButton: nasl.core.Boolean = false;

    @Prop({
      title: '滚动锁定',
      description: '是否在 MessageBox 出现时将 body 滚动锁定',
      group: '主要属性',
      setter: {
        concept: 'SwitchSetter',
      },
    })
    lockScroll: nasl.core.Boolean = true;

    @Prop({
      title: '取消按钮',
      description: '是否显示取消按钮',
      group: '主要属性',
      setter: {
        concept: 'SwitchSetter',
      },
    })
    showCancelButton: nasl.core.Boolean = false;

    @Prop<ElMessageBoxOptions, 'cancelButtonText'>({
      title: '取消按钮文本',
      description: '取消按钮的文本内容',
      group: '主要属性',
      setter: {
        concept: 'InputSetter',
      },
      if: (_) => _.showCancelButton,
    })
    cancelButtonText: nasl.core.String = '取消';

    @Prop({
      title: '确认按钮',
      description: '是否显示确定按钮',
      group: '主要属性',
      setter: {
        concept: 'SwitchSetter',
      },
    })
    showConfirmButton: nasl.core.Boolean = true;

    @Prop<ElMessageBoxOptions, 'confirmButtonText'>({
      title: '确定按钮文本',
      description: '确定按钮的文本内容',
      group: '主要属性',
      setter: {
        concept: 'InputSetter',
      },
      if: (_) => _.showConfirmButton,
    })
    confirmButtonText: nasl.core.String = '确定';

    @Prop<ElMessageBoxOptions, 'inputPlaceholder'>({
      title: '输入框的占位符',
      description: '输入框的占位符',
      group: '主要属性',
      setter: {
        concept: 'InputSetter',
      },
      if: (_) => _.type === 'prompt',
    })
    inputPlaceholder: nasl.core.String;

    @Prop<ElMessageBoxOptions, 'inputType'>({
      title: '输入框的类型',
      description: '输入框的类型',
      group: '主要属性',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '文本' }, { title: '密码' }],
      },
      if: (_) => _.type === 'prompt',
    })
    inputType: 'text' | 'password' = 'text';

    @Prop<ElMessageBoxOptions, 'inputValue'>({
      title: '输入框的初始值',
      description: '输入框的类型',
      group: '主要属性',
      setter: {
        concept: 'InputSetter',
      },
      if: (_) => _.type === 'prompt',
    })
    inputValue: nasl.core.String = '';

    @Prop<ElMessageBoxOptions, 'inputPattern'>({
      title: '输入验证正则表达式',
      description: '输入框的校验表达式',
      group: '主要属性',
      setter: {
        concept: 'InputSetter',
      },
      if: (_) => _.type === 'prompt',
    })
    inputPattern: nasl.core.String;

    // @Prop<ElMessageBoxOptions, 'inputValidator'>({
    //   title: '输入验证函数',
    //   description: '可以返回布尔值或字符串，若返回一个字符串, 则返回结果会被赋值给校验未通过时的提示文本',
    //   group: '主要属性',
    //   setter: {
    //     concept: 'AnonymousFunctionSetter',
    //   },
    //   if: (_) => _.type === 'prompt',
    // })
    // inputValidator: (value: nasl.core.String) => (nasl.core.Boolean | nasl.core.String);

    @Prop<ElMessageBoxOptions, 'inputErrorMessage'>({
      title: '校验未通过时的提示文本',
      description: '校验未通过时的提示文本',
      group: '主要属性',
      setter: {
        concept: 'InputSetter',
      },
      if: (_) => _.type === 'prompt',
    })
    inputErrorMessage: nasl.core.String = '输入的数据不合法';

    @Event({
      title: '确认按钮点击后',
      description: '确认按钮点击后触发',
    })
    onConfirm: (event: nasl.core.String) => any;

    @Event({
      title: '取消按钮点击后',
      description: '取消按钮点击后触发',
    })
    onCancel: (event: {}) => any;

    @Event({
      title: '关闭后',
      description: '关闭提示时触发',
    })
    onClose: (event: {}) => any;

    @Slot({
      title: '消息内容',
      description: '消息内容',
    })
    slotDefault: () => Array<ViewComponent>;
  }
}
