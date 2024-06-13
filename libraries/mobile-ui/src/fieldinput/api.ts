/// <reference types="@nasl/types" />

namespace nasl.ui {
  @Component({
    title: '单行输入',
    icon: 'input',
    description: '基本的表单输入组件',
    group: "Form"
  })
  export class VanFieldinput extends ViewComponent {
    constructor(options?: Partial<VanFieldinputOptions>) {
      super();
    }
    @Prop({
      title: '值',
    })
    value: VanFieldinputOptions['value'];

    @Prop({
      title: '禁用',
    })
    disabled: nasl.core.Boolean;

    @Prop({
      title: '只读',
    })
    readonly: nasl.core.Boolean;

    @Prop({
      title: '预览',
    })
    preview: nasl.core.Boolean;

    @Method({
      title: 'undefined',
      description: '让输入框获取焦点。'
    })
    focus(): any {}
    @Method({
      title: 'undefined',
      description: '让输入框失去焦点。'
    })
    blur(): any {}
    @Method({
      title: 'undefined',
      description: '清空输入框。'
    })
    clear(): any {}
  }
  export class VanFieldinputOptions extends ViewComponentOptions {
    @Prop({
      title: '前缀图标',
      description: '前缀图标',
      setter: {
        concept: "EnumSelectSetter",
        options: [{
          title: '搜索'
        }, {
          title: '暂无'
        }]
      }
    })
    private prefix: 'search' | '' = '';
    @Prop({
      title: '后缀图标',
      description: '后缀图标',
      setter: {
        concept: "EnumSelectSetter",
        options: [{
          title: '搜索'
        }, {
          title: '暂无'
        }]
      }
    })
    private suffix: 'search' | '' = '';
    @Prop({
      group: '数据属性',
      title: '值',
      description: '用于标识输入框的值',
      sync: true
    })
    value: nasl.core.String;
    @Prop({
      group: '主要属性',
      title: '类型',
      description: '设置输入框的类型',
      setter: {
        concept: "EnumSelectSetter",
        options: [{
          title: '文本'
        }, {
          title: '密码'
        }, {
          title: '整数'
        }, {
          title: '随机整数'
        }, {
          title: '小数'
        }, {
          title: '身份证'
        }]
      }
    })
    type: 'text' | 'password' | 'integer' | 'rndinteger' | 'point' | 'card' = 'text';
    @Prop<VanFieldinputOptions, 'placeholder'>({
      group: '主要属性',
      title: '占位符',
      description: '输入框为空的展示文字',
      if: _ => _.inputstyle === 'input',
      implicitToString: true,
    })
    placeholder: nasl.core.String;
    @Prop<VanFieldinputOptions, 'maxlength'>({
      group: '主要属性',
      title: '最大输入长度',
      setter: {
        concept: "NumberInputSetter",
        precision: 0,
        min: 1,
        max: 6
      },
      if: _ => _.inputstyle === 'password'
    })
    maxlength: nasl.core.Integer = 6;
    @Prop<VanFieldinputOptions, 'keyboardTitle'>({
      group: '主要属性',
      title: '键盘标题',
      if: _ => _.keytheme === 'custom',
      implicitToString: true,
    })
    keyboardTitle: nasl.core.String;
    @Prop<VanFieldinputOptions, 'confirmText'>({
      group: '主要属性',
      title: '按钮内容',
      description: '设置完成按钮文字内容',
      if: _ => _.keytheme === 'custom',
      implicitToString: true,
    })
    confirmText: nasl.core.String = '完成';
    @Prop<VanFieldinputOptions, 'confirmSize'>({
      group: '主要属性',
      title: '按钮尺寸',
      description: '设置完成按钮大小',
      setter: {
        concept: "EnumSelectSetter",
        options: [{
          title: '默认'
        }, {
          title: '大号'
        }]
      },
      if: _ => _.keytheme === 'custom' && _.keyboardTheme === 'custom'
    })
    confirmSize: 'default' | 'large' = 'default';
    @Prop<VanFieldinputOptions, 'clearable'>({
      group: '交互属性',
      title: '可清除',
      description: '是否在输入框内展示清除按钮',
      setter: {
        concept: "SwitchSetter"
      },
      if: _ => _.inputstyle === 'input'
    })
    clearable: nasl.core.Boolean;
    @Prop({
      group: '状态属性',
      title: '只读',
      description: '正常显示，但禁止选择/输入。',
      setter: {
        concept: "SwitchSetter"
      }
    })
    readonly: nasl.core.Boolean = false;
    @Prop({
      group: '状态属性',
      title: '禁用',
      description: '置灰显示，且禁止任何交互（焦点、点击、选择、输入等）',
      setter: {
        concept: "SwitchSetter"
      }
    })
    disabled: nasl.core.Boolean = false;
    @Prop<VanFieldinputOptions, 'inputstyle'>({
      group: '样式属性',
      title: '输入框样式',
      description: '设置输入框样式',
      setter: {
        concept: "EnumSelectSetter",
        options: [{
          title: '默认'
        }, {
          title: '格子'
        }]
      },
      onChange: [{
        update: {
          maxlength: 10000
        },
        if: _ => _ === 'input'
      }, {
        update: {
          clearable: false,
          maxlength: 6
        },
        if: _ => _ === 'password'
      }]
    })
    inputstyle: 'input' | 'password' = 'input';
    @Prop({
      group: '样式属性',
      title: '键盘样式',
      description: '设置键盘样式',
      setter: {
        concept: "EnumSelectSetter",
        options: [{
          title: '默认键盘'
        }, {
          title: '定制键盘'
        }]
      }
    })
    keytheme: 'native' | 'custom' = 'native';
    @Prop<VanFieldinputOptions, 'keyboardTheme'>({
      group: '样式属性',
      title: '定制键盘布局',
      setter: {
        concept: "EnumSelectSetter",
        options: [{
          title: '默认'
        }, {
          title: '右侧栏'
        }]
      },
      if: _ => _.keytheme === 'custom'
    })
    keyboardTheme: 'default' | 'custom' = 'default';
    @Prop({
      group: '状态属性',
      title: '预览',
      description: '显示预览态',
      docDescription: '',
      setter: {
        concept: 'SwitchSetter',
      },
    })
    preview: nasl.core.Boolean = false;
    @Event({
      title: '输入时',
      description: '输入时触发。'
    })
    onInput: (event: nasl.ui.BaseEvent) => void;
    @Event({
      title: '改变后',
      description: '值变化时触发。（注意：与原生事件不同）'
    })
    onChange: (event: nasl.core.String) => void;
    @Event({
      title: '获得焦点',
      description: '获得焦点时触发。'
    })
    onFocus: (event: nasl.ui.BaseEvent) => void;
    @Event({
      title: '失去焦点',
      description: '失去焦点时触发。'
    })
    onBlur: (event: nasl.ui.BaseEvent) => void;
    @Event({
      title: '清空后',
      description: '清空后触发。'
    })
    onClear: (event: nasl.ui.BaseEvent) => void;
    @Event({
      title: '输入完成时',
      description: '输入完成时后触发。'
    })
    onEnoughkey: (event: nasl.core.String) => void;
    @Event({
      title: '点击完成按钮时',
      description: '点击定制键盘完成按钮时触发。'
    })
    onClickConfirm: (event: nasl.core.String) => void;
  }
}
