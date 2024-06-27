/// <reference types="@nasl/types" />

namespace nasl.ui {
  @Component({
    title: '单选项',
    description: '多项中选择一项',
    icon: 'radios',
    group: 'Form',
  })
  export class Radio extends ViewComponent {
    constructor(options?: Partial<RadioOptions & FormItemOptions>) {
      super();
    }
  }

  export class RadioOptions extends ViewComponentOptions {
    @Prop({
      group: '数据属性',
      title: '选中值',
      description: '当前选中的值',
      sync: true,
      docDescription: '当前选择的值',
    })
    value: any;

    // @Prop({
    //   group: '数据属性',
    //   title: '指定当前是否选中	',
    //   description: '标志选中状态的值',
    //   sync: true,
    //   docDescription: '选项返还的选项值。',
    //   setter: {
    //     concept: 'SwitchSetter',
    //   },
    // })
    // checked: nasl.core.Boolean | null = false;
    // @Prop({
    //   group: '主要属性',
    //   title: '自动选择',
    //   description: '是否自动选择第一个非禁用的项',
    //   docDescription: '是否自动选择第一个非禁用的项',
    //   setter: {
    //     concept: 'SwitchSetter',
    //   },
    // })
    // autoSelect: nasl.core.Boolean = false;

    // @Prop({
    //   group: '交互属性',
    //   title: '可取消',
    //   description: '是否可以取消选择',
    //   docDescription: '是否可以取消选择',
    //   setter: {
    //     concept: 'SwitchSetter',
    //   },
    // })
    // cancelable: nasl.core.Boolean = false;

    // @Prop({
    //   group: '交互属性',
    //   title: '可多选',
    //   description: '是否可以多选',
    //   docDescription: '是否可以多选',
    //   setter: {
    //     concept: 'SwitchSetter',
    //   },
    // })
    // multiple: nasl.core.Boolean = false;

    // @Prop({
    //   group: '状态属性',
    //   title: '只读',
    //   description: '正常显示，但禁止选择/输入',
    //   docDescription: '正常显示，但禁止选择或输入。',
    //   setter: {
    //     concept: 'SwitchSetter',
    //   },
    // })
    // readonly: nasl.core.Boolean = false;

    @Prop({
      group: '状态属性',
      title: '禁用',
      description: '置灰显示，且禁止任何交互（焦点、点击、选择、输入等）',
      docDescription: '置灰显示，且禁止任何交互（焦点、点击、选择、输入等）',
      setter: {
        concept: 'SwitchSetter',
      },
    })
    disabled: nasl.core.Boolean = false;

    // @Event({
    //   title: '选择前',
    //   description: '选择某一项前触发',
    // })
    // onBeforeSelect: (event: {
    //   selected: nasl.core.Boolean;
    //   item: nasl.core.String;
    //   oldItem: nasl.core.String;
    //   value: nasl.core.String;
    //   oldValue: nasl.core.String;
    //   items: nasl.collection.List<nasl.core.String>;
    //   oldItems: nasl.collection.List<nasl.core.String>;
    // }) => any;

    // @Event({
    //   title: '输入时',
    //   description: '选择某一项时触发，仅在单选模式中生效',
    // })
    // onInput: (event: nasl.core.String) => any;

    // @Event({
    //   title: '选择后',
    //   description: '选择某一项时触发。单选模式中：',
    // })
    // onSelect: (event: {
    //   selected: nasl.core.Boolean;
    //   item: nasl.core.String;
    //   oldItem: nasl.core.String;
    //   value: nasl.core.String;
    //   oldValue: nasl.core.String;
    //   items: nasl.collection.List<nasl.core.String>;
    //   oldItems: nasl.collection.List<nasl.core.String>;
    // }) => any;

    @Event({
      title: '改变后',
      description: '选择值改变时触发。单选模式中：',
    })
    onChange: (event: {
      item: nasl.core.String;
      oldItem: nasl.core.String;
      value: nasl.core.String;
      oldValue: nasl.core.String;
      items: nasl.collection.List<nasl.core.String>;
      oldItems: nasl.collection.List<nasl.core.String>;
      values: nasl.collection.List<nasl.core.String>;
    }) => any;

    @Slot({
      title: 'undefined',
      description: '插入文本或 HTML。',
    })
    slotDefault: () => Array<ViewComponent>;
    // @Slot({
    //   title: 'undefined',
    //   description: '插入`<u-capsule>`或`<u-capsules-group>`子组件。',
    //   snippets: [
    //     {
    //       title: '胶囊选项',
    //       code: '<u-capsule>选项</u-capsule>',
    //     },
    //   ],
    // })
    // slotDefault: () => Array<UCapsule>;
  }

  @Component({
    title: '单选组',
    icon: 'capsules',
    description: '多项中选择一项',
    group: 'Form',
  })
  export class RadioGroup<T, V, C> extends ViewComponent {
    constructor(options?: Partial<RadioGroupOptions<T, V, C>>) {
      super();
    }
  }

  export class RadioGroupOptions<T, V, C> extends ViewComponentOptions {
    @Prop({
      title: '相关对象',
      description: '相关对象。当选择此项时，抛出的事件会传递该对象，便于开发',
    })
    private item: object;

    @Prop({
      group: '数据属性',
      title: '数据源',
      description:
        '展示数据的输入源，可设置为集合类型变量（List<T>）或输出参数为集合类型的逻辑。',
      docDescription:
        '支持动态绑定集合类型变量（List<T>）或输出参数为集合类型的逻辑',
      designerValue: [{}, {}, {}],
    })
    dataSource:
      | nasl.collection.List<T>
      | { list: nasl.collection.List<T>; total: nasl.core.Integer };

    @Prop({
      group: '数据属性',
      title: '值',
      description: '此项的值',
      docDescription: '此项的值',
      sync: true,
    })
    value: any;

    @Prop<RadioGroupOptions<T, V, C>, 'textField'>({
      group: '数据属性',
      title: '文本字段',
      description: '集合的元素类型中，用于显示文本的属性名称',
      docDescription:
        '集合的元素类型中，用于显示文本的属性名称，支持自定义变更。',
      setter: {
        concept: 'PropertySelectSetter',
      },
    })
    textField: (item: T) => nasl.core.String;

    @Prop<RadioGroupOptions<T, V, C>, 'valueField'>({
      group: '数据属性',
      title: '值字段',
      description: '集合的元素类型中，用于标识选中值的属性',
      docDescription: '集合的元素类型中，用于标识选中值的属性，支持自定义变更',
      setter: {
        concept: 'PropertySelectSetter',
      },
    })
    valueField: (item: T) => V;

    // @Prop({
    //   group: '主要属性',
    //   title: '标签',
    //   description: '顶部自定义提示文本',
    //   docDescription: '顶部自定义提示文本',
    // })
    // label: nasl.core.String = '';

    // @Prop({
    //   group: '主要属性',
    //   title: 'flag标志',
    //   description: '是否右上角有flag标志',
    //   docDescription: '是否右上角有flag标志',
    //   setter: {
    //     concept: 'SwitchSetter',
    //   },
    // })
    // flag: nasl.core.Boolean = false;

    @Prop({
      group: '状态属性',
      title: '禁用',
      description: '置灰显示，且禁止任何交互（焦点、点击、选择、输入等）',
      docDescription: '置灰显示，且禁止任何交互（焦点、点击、选择、输入等）',
      setter: {
        concept: 'SwitchSetter',
      },
    })
    disabled: nasl.core.Boolean = false;

    @Prop<RadioGroupOptions<T, V, C>, 'size'>({
      group: '样式属性',
      title: '尺寸',
      description: '只对按钮样式生效',
      docDescription: '只对按钮样式生效',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '小' }, { title: '正常' }, { title: '大' }],
      },
      if: (_) => _.optionType === 'button',
    })
    size: 'small' | 'middle' | 'large';

    @Prop({
      group: '样式属性',
      title: '单选样式',
      description: '只对按钮样式生效',
      docDescription: '只对按钮样式生效',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '默认' }, { title: '按钮' }],
      },
    })
    optionType: 'default' | 'button';

    // @Prop({
    //   group: '主要属性',
    //   title: '后缀图标',
    //   docDescription: '支持添加后缀图标，如搜索图标',
    //   setter: {
    //     concept: 'EnumSelectSetter',
    //     options: [{ title: '日历' }],
    //   },
    // })
    // suffixIcon: 'calendar';
    // @Event({
    //   title: '点击',
    //   description: '点击此项时触发，与原生 click 事件不同的是，它只会在非只读和禁用的情况下触发。',
    // })
    // onClick: (event: {
    //   altKey: nasl.core.Boolean;
    //   button: nasl.core.Integer;
    //   clientX: nasl.core.Integer;
    //   clientY: nasl.core.Integer;
    //   ctrlKey: nasl.core.Boolean;
    //   metaKey: nasl.core.Boolean;
    //   movementX: nasl.core.Integer;
    //   movementY: nasl.core.Integer;
    //   offsetX: nasl.core.Integer;
    //   offsetY: nasl.core.Integer;
    //   pageX: nasl.core.Integer;
    //   pageY: nasl.core.Integer;
    //   screenX: nasl.core.Integer;
    //   screenY: nasl.core.Integer;
    //   which: nasl.core.Integer;
    // }) => any;

    @Event({
      title: '选项变化时',
      description: '选项变化时',
    })
    onChange: (event: any) => any;

    @Slot({
      title: 'undefined',
      description: '插入文本或 HTML。',
      snippets: [
        {
          title: '选项',
          code: '<Radio><Text children="单选项"></Text></Radio>',
        },
      ],
    })
    slotDefault: () => Array<ViewComponent>;
  }

  // @Component({
  //   title: '子选项组',
  //   description: '子选项组',
  // })
  // export class UCapsulesGroup extends ViewComponent {
  //   constructor(options?: Partial<UCapsulesGroupOptions>) {
  //     super();
  //   }
  // }

  // export class UCapsulesGroupOptions extends ViewComponentOptions {
  //   @Slot({
  //     title: 'undefined',
  //     description: '插入`<u-capsule>`或`<u-capsules-group>`子组件。',
  //     snippets: [
  //       {
  //         title: '子选项',
  //         code: '<u-capsule>选项</u-capsule>',
  //       },
  //     ],
  //   })
  //   slotDefault: () => Array<UCapsule>;
  // }
}
