/// <reference types="@nasl/types" />

namespace nasl.ui {
  @Component({
    title: '级联选择',
    icon: 'cascade-select',
    description: '级联选择框，用于多层级数据的选择，典型场景为省市区选择',
    group: "Selector"
  })
  export class VanCascader<T, V> extends ViewComponent {
    constructor(options?: Partial<VanCascaderOptions<T, V>>) {
      super();
    }

    @Prop({
      title: '选中值',
    })
    value: VanCascaderOptions<T, V>['value'];

    // @Prop({
    //   title: '数据',
    // })
    // data: VanCascaderOptions<T, V>['dataSource'];

    @Prop({
      title: '过滤文本',
    })
    filterText: nasl.core.String;
  }
  export class VanCascaderOptions<T, V> extends ViewComponentOptions {
    @Prop({
      title: '左侧标题',
      description: '左侧标题'
    })
    private labelField: nasl.core.String;
    @Prop({
      title: '树形模式',
      description: '将平铺数据转为树形结构数据',
      setter: {
        concept: "SwitchSetter"
      }
    })
    treeDisplay: nasl.core.Boolean = false;
    @Prop({
      group: '数据属性',
      title: '值',
      description: '用于标识级联选择的值',
      sync: true
    })
    value: V;
    @Prop({
      group: '数据属性',
      title: '数据源',
      description: '展示数据的输入源，可设置为数据集对象或者返回数据集的逻辑。',
      designerValue: [{}]
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
      title: '文本字段名',
      description: '文本的字段名',
      setter: {
        concept: "PropertySelectSetter"
      }
    })
    textField: (item: T) => any = ((item: any)  => item.text) as any;
    @Prop({
      group: '数据属性',
      title: '值字段名',
      description: '选项值的字段名',
      setter: {
        concept: "PropertySelectSetter"
      }
    })
    valueField: (item: T) => V = ((item: any)  => item.value) as any;
    @Prop({
      group: '数据属性',
      title: '父级值字段名',
      setter: {
        concept: "PropertySelectSetter"
      }
    })
    parentField: (item: T) => any = ((item: any) => item.parentId) as any;
    @Prop({
      group: '数据属性',
      title: '子级值字段名',
      setter: {
        concept: "PropertySelectSetter"
      }
    })
    childrenField: (item: T) => any = ((item: any)  => item.children) as any;
    @Prop({
      group: '主要属性',
      title: '占位提示',
      implicitToString: true,
    })
    placeholder: nasl.core.String = '请选择';
    @Prop({
      group: '主要属性',
      title: '顶部栏标题',
      implicitToString: true,
    })
    title: nasl.core.String = '标题';
    @Prop({
      group: '主要属性',
      title: '未选中提示文案',
      implicitToString: true,
    })
    tabPlaceholder: nasl.core.String = '请选择';
    @Prop({
      group: '主要属性',
      title: '对齐方式',
      description: '设置右侧内容的对齐方式',
      setter: {
        concept: "EnumSelectSetter",
        options: [{
          title: '左'
        }, {
          title: '中'
        }, {
          title: '右'
        }]
      }
    })
    inputAlign: 'left' | 'center' | 'right';
    @Prop({
      group: '交互属性',
      title: '开启搜索框',
      description: '是否开启搜索框进行过滤',
      setter: {
        concept: "SwitchSetter"
      }
    })
    filterable: nasl.core.Boolean = false;
    @Prop({
      group: '交互属性',
      title: '点击遮罩层后关闭',
      description: '是否开启点击遮罩层后关闭',
      setter: {
        concept: "SwitchSetter"
      }
    })
    closeOnClickOverlay: nasl.core.Boolean = false;
    @Prop({
      group: '状态属性',
      title: '只读',
      description: '正常显示，但禁止选择/输入',
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
    @Event({
      title: '全部选项选择完成后触发',
      description: '全部选项选择完成后触发'
    })
    onFinish: (event: {
      value: V;
    }) => void;
    @Event({
      title: '选中项变化时触发',
      description: '选中项变化时触发'
    })
    onChange: (event: {
      value: V;
    }) => void;
    @Slot({
      title: 'option'
    })
    slotOption: (current: Current<T>) => Array<ViewComponent>;

    @Slot({
      title: '',
      description: '',
    })
    slotTitle: () => Array<ViewComponent>;
  }
}
