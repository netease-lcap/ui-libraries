/// <reference types="@nasl/types" />

namespace nasl.ui {
  @Component({
    title: '单选组',
    icon: 'radios',
    description: '多项中选择一个时使用',
    group: "Form"
  })
  export class VanRadioGroup<T, V> extends ViewComponent {
    constructor(options?: Partial<VanRadioGroupOptions<T, V>>) {
      super();
    }

    @Prop({
      title: '选中值',
    })
    value: VanRadioGroupOptions<T, V>['value'];

    @Prop({
      title: '数据',
    })
    data: VanRadioGroupOptions<T, V>['dataSource'];
  }
  export class VanRadioGroupOptions<T, V> extends ViewComponentOptions {
    @Prop({
      group: '数据属性',
      title: '数据源',
      description: '展示数据的输入源，可设置为集合类型变量（List<T>）或输出参数为集合类型的逻辑。',
      designerValue: [{}, {}, {}]
    })
    dataSource: nasl.collection.List<T> | { total: nasl.core.Integer; list: nasl.collection.List<T> };
    @Prop({
      group: '数据属性',
      title: '数据类型',
      description: '数据源返回的数据结构的类型，自动识别类型进行展示说明。'
    })
    dataSchema: T;
    @Prop({
      group: '数据属性',
      title: '值',
      description: '用于标识单选组的值',
      sync: true
    })
    value: V;
    @Prop({
      group: '主要属性',
      title: '单选项图标',
      docDescription: '增加自定义图标显示',
      setter: {
        concept: "IconSetter"
      }
    })
    icon: nasl.core.String = 'sure';
    @Prop({
      group: '主要属性',
      title: '排列方向',
      description: '选择水平或垂直排列',
      setter: {
        concept: "EnumSelectSetter",
        options: [{
          title: '水平'
        }, {
          title: '垂直'
        }]
      }
    })
    direction: 'horizontal' | 'vertical' = 'horizontal';
    @Prop<VanRadioGroupOptions<T, V>, 'column'>({
      group: '主要属性',
      title: '每行排列数',
      description: '水平排列时每行展示的选项数量',
      setter: {
        concept: "NumberInputSetter"
      },
      if: _ => _.direction === 'horizontal'
    })
    column: nasl.core.Integer;
    @Prop({
      group: '状态属性',
      title: '禁用',
      description: '正常显示，但禁止选择/输入',
      setter: {
        concept: "SwitchSetter"
      }
    })
    disabled: nasl.core.Boolean = false;
    @Prop({
      group: '状态属性',
      title: '只读',
      description: '置灰显示，且禁止任何交互（焦点、点击、选择、输入等）',
      setter: {
        concept: "SwitchSetter"
      }
    })
    readonly: nasl.core.Boolean = false;
    @Event({
      title: '值改变时',
      description: '选择值改变时触发'
    })
    onChange: (event: V) => void;
    @Slot({
      title: 'undefined',
      description: '插入`<van-radio>`子组件。',
      emptyBackground: 'add-sub',
      snippets: [{
        title: '单选项',
        code: '<van-radio icon="sure"><van-text text="节点"></van-text></van-radio>'
      }]
    })
    slotDefault: () => Array<VanRadio<V>>;
    @Slot({
      title: 'undefined',
      description: '自定义选项的结构和样式'
    })
    slotItem: (current: Current<T>) => Array<ViewComponent>;
  }
  @Component({
    title: '单选项',
    group: "Form"
  })
  export class VanRadio<V> extends ViewComponent {
    constructor(options?: Partial<VanRadioOptions<V>>) {
      super();
    }
  }
  export class VanRadioOptions<V> extends ViewComponentOptions {
    @Prop({
      group: '数据属性',
      title: '文本',
      description: '文本'
    })
    private title: nasl.core.String;
    @Prop({
      group: '数据属性',
      title: '选项值',
      description: '当前选中的值'
    })
    name: nasl.core.String;
    @Prop({
      group: '主要属性',
      title: '单选项图标',
      docDescription: '增加自定义图标显示',
      setter: {
        concept: "IconSetter"
      }
    })
    icon: nasl.core.String = 'sure';
    @Prop({
      group: '主要属性',
      title: '文本位置',
      description: '设置文本居左或居右放置',
      setter: {
        concept: "EnumSelectSetter",
        options: [{
          title: '右'
        }, {
          title: '左'
        }]
      }
    })
    labelPosition: 'right' | 'left' = 'right';
    @Prop({
      group: '状态属性',
      title: '禁用',
      description: '正常显示，但禁止选择/输入',
      setter: {
        concept: "SwitchSetter"
      }
    })
    disabled: nasl.core.Boolean = false;
    @Event({
      title: '点击后',
      description: '点击某一项后触发'
    })
    onClick: (event: {
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

    @Slot({
      title: '',
      description: ''
    })
    slotDefault: () => Array<ViewComponent>;
  }
}
