/// <reference types="@nasl/types" />

namespace nasl.ui {
  @Component({
    title: '搜索框',
    icon: 'search',
    description: '内部元素按照一定的规则布局',
    group: "Form"
  })
  export class VanSearch extends ViewComponent {
    @Prop({
      title: '值',
    })
    value: VanSearchOptions['value'];

    @Prop({
      title: '禁用',
    })
    disabled: nasl.core.Boolean;

    @Prop({
      title: '只读',
    })
    readonly: nasl.core.Boolean;

    constructor(options?: Partial<VanSearchOptions>) {
      super();
    }
  }
  export class VanSearchOptions extends ViewComponentOptions {
    @Prop({
      title: '按钮文字',
      description: '按钮文字'
    })
    private actiontext: nasl.core.String;
    @Prop({
      group: '数据属性',
      title: '值',
      description: '用于标识搜索框的值',
      sync: true,
      settable: true,
    })
    value: nasl.core.String;
    @Prop({
      group: '数据属性',
      title: '最大字符数',
      description: '输入框内输入的最大字符数',
      setter: {
        concept: "NumberInputSetter",
        min: 0,
        precision: 0
      }
    })
    maxlength: nasl.core.Integer;
    @Prop({
      group: '主要属性',
      title: '占位符',
      description: '搜索框为空的显示文字',
      implicitToString: true,
    })
    placeholder: nasl.core.String;
    @Prop({
      group: '主要属性',
      title: '显示清除图标',
      setter: {
        concept: "EnumSelectSetter",
        options: [{
          title: '一直显示'
        }, {
          title: '输入框获取焦点且不为空时展示'
        }]
      }
    })
    cleartrigger: 'always' | 'focus';
    @Prop({
      group: '主要属性',
      title: '对齐方式',
      description: '设置对齐方式',
      setter: {
        concept: "EnumSelectSetter",
        options: [{
          title: '左对齐'
        }, {
          title: '居中对齐'
        }, {
          title: '右对齐'
        }]
      }
    })
    inputAlign: 'left' | 'center' | 'right';
    @Prop({
      group: '主要属性',
      title: '搜索图标位置',
      description: '设置搜索图标位置',
      setter: {
        concept: "EnumSelectSetter",
        options: [{
          title: '左'
        }, {
          title: '右'
        }]
      }
    })
    iconalign: 'left' | 'right';
    @Prop({
      group: '交互属性',
      title: '可清除',
      description: '是否启用清除图标，点击清除图标后会清空输入框',
      setter: {
        concept: "SwitchSetter"
      }
    })
    clearable: nasl.core.Boolean;
    @Prop({
      group: '状态属性',
      title: '只读',
      description: '正常显示，但禁止选择/输入',
      setter: {
        concept: "SwitchSetter"
      },
      settable: true,
    })
    readonly: nasl.core.Boolean;
    @Prop({
      group: '状态属性',
      title: '禁用',
      description: '置灰显示，且禁止任何交互（焦点、点击、选择、输入等）',
      setter: {
        concept: "SwitchSetter"
      },
      settable: true,
    })
    disabled: nasl.core.Boolean;
    @Prop({
      group: '样式属性',
      title: '形状',
      description: '选择搜索框为方形或圆形',
      setter: {
        concept: "EnumSelectSetter",
        options: [{
          title: '方形'
        }, {
          title: '圆形'
        }]
      }
    })
    shape: 'square' | 'round' = 'square';
    @Event({
      title: '确定搜索时触发',
      description: '确定搜索时触发'
    })
    onSearch: (event: nasl.core.String) => void;
    @Event({
      title: '点击搜索图标时触发',
      description: '点击搜索图标时触发'
    })
    onIconsearch: (event: {
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
    @Event({
      title: '输入框内容变化时触发',
      description: '输入框内容变化时触发'
    })
    onInput: (event: nasl.core.String) => void;
    @Event({
      title: '输入框获得焦点时触发',
      description: '输入框获得焦点时触发'
    })
    onFocus: (event: nasl.ui.BaseEvent) => void;
    @Event({
      title: '输入框失去焦点时触发',
      description: '输入框失去焦点时触发'
    })
    onBlur: (event: nasl.ui.BaseEvent) => void;
    @Event({
      title: '点击输入区域时触发',
      description: '点击输入区域时触发'
    })
    onClickinput: (event: nasl.ui.BaseEvent) => void;
    @Event({
      title: '点击清除图标时触发',
      description: '点击清除图标时触发'
    })
    onClear: (event: nasl.ui.BaseEvent) => void;
    @Slot({
      title: 'undefined',
      description: '内容'
    })
    slotDefault: () => Array<ViewComponent>;

    @Slot({
      title: 'undefined',
      description: '内容'
    })
    slotAction: () => Array<ViewComponent>;
  }
}
