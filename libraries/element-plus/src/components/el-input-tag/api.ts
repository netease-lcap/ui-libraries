/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    ideusage: {
      idetype: 'element',
    },
  })
  @Component({
    title: '标签输入框',
    icon: 'input',
    description: '允许用户以标签形式添加内容的输入框',
    group: 'Form',
  })
  export class ElInputTag extends ViewComponent {
    constructor(options?: Partial<ElInputTagOptions>) {
      super();
    }
  }

  export class ElInputTagOptions extends ViewComponentOptions {
    @Prop({
      group: '主要属性',
      title: '值',
      description: '绑定值',
      setter: { concept: 'InputSetter' },
    })
    value: nasl.core.String[];

    @Prop({
      group: '主要属性',
      title: '最大标签数',
      description: '可以输入的最大标签数量',
      setter: { concept: 'NumberInputSetter' },
    })
    max: nasl.core.Integer;

    @Prop({
      group: '主要属性',
      title: '标签类型',
      description: '标签类型',
      setter: {
        concept: 'EnumSelectSetter',
        options: [
          { title: '主要' },
          { title: '成功' },
          { title: '信息' },
          { title: '警告' },
          { title: '危险' },
        ],
      },
    })
    tagType: 'primary' | 'success' | 'info' | 'warning' | 'danger' = 'info';

    @Prop({
      group: '主要属性',
      title: '标签效果',
      description: '标签效果',
      setter: {
        concept: 'EnumSelectSetter',
        options: [
          { title: '浅色' },
          { title: '深色' },
          { title: '朴素' },
        ],
      },
    })
    tagEffect: 'light' | 'dark' | 'plain' = 'light';

    @Prop({
      group: '主要属性',
      title: '触发键',
      description: '触发输入标签的键',
      setter: {
        concept: 'EnumSelectSetter',
        options: [
          { title: '回车键' },
          { title: '空格键' },
        ],
      },
    })
    trigger: 'Enter' | 'Space' = 'Enter';

    @Prop({
      group: '主要属性',
      title: '可拖拽',
      description: '标签是否可拖拽',
      setter: { concept: 'SwitchSetter' },
    })
    draggable: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '尺寸',
      description: '输入框尺寸',
      setter: {
        concept: 'EnumSelectSetter',
        options: [
          { title: '默认' },
          { title: '大' },
          { title: '小' },
        ],
      },
    })
    size: '' | 'default' | 'large' | 'small';

    @Prop({
      group: '主要属性',
      title: '可清空',
      description: '是否显示清空按钮',
      setter: { concept: 'SwitchSetter' },
    })
    clearable: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '禁用',
      description: '是否禁用输入框',
      setter: { concept: 'SwitchSetter' },
    })
    disabled: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '表单验证',
      description: '是否触发表单验证',
      setter: { concept: 'SwitchSetter' },
    })
    validateEvent: nasl.core.Boolean = true;

    @Prop({
      group: '主要属性',
      title: '只读',
      description: '原生 readonly 属性',
      setter: { concept: 'SwitchSetter' },
    })
    readonly: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '自动聚焦',
      description: '原生 autofocus 属性',
      setter: { concept: 'SwitchSetter' },
    })
    autofocus: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: 'ID',
      description: '原生 id 属性',
      setter: { concept: 'InputSetter' },
    })
    id: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: 'Tab 索引',
      description: '原生 tabindex 属性',
      setter: { concept: 'NumberInputSetter' },
    })
    tabindex: nasl.core.Integer;

    @Prop({
      group: '主要属性',
      title: '最大长度',
      description: '原生 maxlength 属性',
      setter: { concept: 'NumberInputSetter' },
    })
    maxlength: nasl.core.Integer;

    @Prop({
      group: '主要属性',
      title: '最小长度',
      description: '原生 minlength 属性',
      setter: { concept: 'NumberInputSetter' },
    })
    minlength: nasl.core.Integer;

    @Prop({
      group: '主要属性',
      title: '占位符',
      description: '输入框占位文本',
      setter: { concept: 'InputSetter' },
    })
    placeholder: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '自动完成',
      description: '原生 autocomplete 属性',
      setter: { concept: 'InputSetter' },
    })
    autocomplete: nasl.core.String = 'off';

    @Event({
      title: '值改变时',
      description: '绑定值被改变时触发',
    })
    onChange: (value: nasl.core.String[]) => any;

    @Event({
      title: '输入时',
      description: '输入值改变时触发',
    })
    onInput: (value: nasl.core.String) => any;

    @Event({
      title: '添加标签时',
      description: '添加标签时触发',
    })
    onAddTag: (value: nasl.core.String) => any;

    @Event({
      title: '移除标签时',
      description: '移除标签时触发',
    })
    onRemoveTag: (value: nasl.core.String) => any;

    @Event({
      title: '获得焦点时',
      description: '输入框获得焦点时触发',
    })
    onFocus: (event: any) => any;

    @Event({
      title: '失去焦点时',
      description: '输入框失去焦点时触发',
    })
    onBlur: (event: any) => any;

    @Event({
      title: '清空时',
      description: '点击清空按钮时触发',
    })
    onClear: () => any;
  }
} 