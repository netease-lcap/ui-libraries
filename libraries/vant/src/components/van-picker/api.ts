/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    order: 2,
    ideusage: {
      idetype: 'element',
      forceUpdateWhenAttributeChange: true,
    },
  })
  @Component({
    title: '选择器',
    icon: 'picker',
    description: '用于从一组选项中进行选择',
    group: 'Selector',
  })
  export class VanPicker<T, V, P extends nasl.core.Boolean, M extends nasl.core.Boolean, C> extends ViewComponent {
    constructor(options?: Partial<VanPickerOptions<T, V, P, M, C>>) {
      super();
    }
  }

  export class VanPickerOptions<T, V, P extends nasl.core.Boolean, M extends nasl.core.Boolean, C> extends ViewComponentOptions {
    
    @Prop({
      //HUSK: 文档中没有提到dataSource
      group: '数据属性',
      title: '数据源',
      description: '展示数据的输入源，可设置为集合类型变量（List<T>）或输出参数为集合类型的逻辑。',
      docDescription: '支持动态绑定集合类型变量（List<T>）或输出参数为集合类型的逻辑',
    })
    dataSource: { list: nasl.collection.List<T>; total: nasl.core.Integer } | nasl.collection.List<T>;

    @Prop({
      //HUSK: 文档中没有提到textField
      group: '数据属性',
      title: '文本字段',
      description: '集合的元素类型中，用于显示文本的属性名称',
      docDescription: '集合的元素类型中，用于显示文本的属性名称，支持自定义变更。',
      setter: {
        concept: 'PropertySelectSetter',
      },
    })
    textField: (item: T) => any = ((item: any) => item.text) as any;

    @Prop({
      //HUSK: 文档中没有提到valueField
      group: '数据属性',
      title: '值字段',
      description: '集合的元素类型中，用于标识选中值的属性',
      docDescription: '集合的元素类型中，用于标识选中值的属性，支持自定义变更',
      setter: {
        concept: 'PropertySelectSetter',
      },
    })
    valueField: (item: T) => V = ((item: any) => item.value) as any;

    @Prop({
      //HUSK: 文档中没有提到parentField
      group: '数据属性',
      title: '父级字段',
      description: '集合的元素类型中，用于标识父级值的属性',
      docDescription: '集合的元素类型中，用于标识父级值的属性，支持自定义变更',
      setter: { concept: 'PropertySelectSetter' },
    })
    parentField: (item: T) => V = ((item: any) => item.parent) as any;

    @Prop({
      //TODO: 官方文档中是 v-model，但是这里却是 modelValue
      group: '数据属性',
      sync: true,
      title: '选中值',
      description: '选中值。支持语法糖 `v-model`。',
      setter: { concept: 'InputSetter' },
    })
    modelValue: P extends true ? (M extends '' ? nasl.collection.List<V> : nasl.core.String) : V;

    @Prop({
      group: '主要属性',
      title: '占位符',
      description: '占位符',
      setter: { concept: 'InputSetter' },
    })
    placeholder: nasl.core.String = '请选择';

    @Prop({
      group: '主要属性',
      title: '确认按钮文本',
      description: '确认按钮文本',
      setter: { concept: 'InputSetter' },
    })
    confirmButtonText: nasl.core.String = '确认';

    @Prop({
      group: '主要属性',
      title: '取消按钮文本',
      description: '取消按钮文本',
      setter: { concept: 'InputSetter' },
    })
    cancelButtonText: nasl.core.String = '取消';

    @Prop({
      group: '主要属性',
      title: '工具栏位置',
      description: '工具栏位置',
      setter: { concept: 'EnumSelectSetter', options: [{ title: '顶部' }, { title: '底部' }] },
    })
    toolbarPosition: 'top' | 'bottom' = 'top';

    @Prop({
      group: '主要属性',
      title: '是否可清空',
      description: '是否可以清空选项',
      setter: { concept: 'SwitchSetter' },
    })
    clearable: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '禁用组件',
      description: '是否禁用组件',
      setter: { concept: 'SwitchSetter' },
    })
    disabled: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '只读',
      description: '是否只读',
      setter: { concept: 'SwitchSetter' },
    })
    readonly: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '加载中',
      description: '是否显示加载状态',
      setter: { concept: 'SwitchSetter' },
    })
    loading: nasl.core.Boolean = false;

    @Prop({
      //TODO: 官方文档中是 show-toolbar，但是这里却是 showToolbar，
      // 且官方文档中默认为true，这里却是false
      group: '主要属性',
      title: '显示选中值',
      description: '是否显示选中值',
      setter: { concept: 'SwitchSetter' },
    })
    showToolbar: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '是否多选',
      description: '是否允许多选',
      setter: { concept: 'SwitchSetter' },
    })
    multiple: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '是否可搜索',
      description: '是否可搜索',
      setter: { concept: 'SwitchSetter' },
    })
    filterable: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '无数据文本',
      description: '无选项时显示的文字',
      setter: { concept: 'InputSetter' },
    })
    noDataText: nasl.core.String = '暂无数据';

    @Prop({
      group: '样式属性',
      title: '尺寸',
      description: '组件尺寸。可选项：small/default/large。',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '小' }, { title: '正常' }, { title: '大' }],
      },
    })
    size: 'small' | 'default' | 'large' = 'default';

    @Prop({
      //TODO: 官方文档中是 allow-html，但是这里却是 allowHtml
      // 且官方文档中默认为false，这里却是true
      group: '主要属性',
      title: '允许HTML',
      description: '是否允许选项内容包含HTML',
      setter: { concept: 'SwitchSetter' },
    })
    allowHtml: nasl.core.Boolean = true;

    @Prop({
      //TODO: 官方文档中是 option-height，但是这里却是 optionHeight
      // 且类型需支持 number|string
      group: '主要属性',
      title: '选项高度',
      description: '选项的高度，单位为px',
      setter: { concept: 'NumberInputSetter' },
    })
    optionHeight: nasl.core.Integer = 44;

    @Prop({
      //TODO: 官方文档中是 swipe-duration，但是这里却是 swipeDuration
      //且类型需支持 number|string，默认值为1000
      group: '主要属性',
      title: '滑动动画时长',
      description: '滑动动画的时长，单位为ms',
      setter: { concept: 'NumberInputSetter' },
    })
    swipeDuration: nasl.core.Integer = 300;

    @Prop({
      group: '主要属性',
      title: '可见选项数量',
      description: '可见选项的数量',
      setter: { concept: 'NumberInputSetter' },
    })
    visibleOptionNum: nasl.core.Integer = 6;

    @Prop({
      group: '主要属性',
      title: '默认选中索引',
      description: '默认选中项的索引',
      setter: { concept: 'NumberInputSetter' },
    })
    defaultIndex: nasl.core.Integer = 0;

    @Prop({
      group: '主要属性',
      title: '点击遮罩关闭',
      description: '点击遮罩层时是否关闭选择器',
      setter: { concept: 'SwitchSetter' },
    })
    closeOnClickOverlay: nasl.core.Boolean = true;

    @Prop({
      group: '主要属性',
      title: '点击按钮关闭',
      description: '点击按钮时是否关闭选择器',
      setter: { concept: 'SwitchSetter' },
    })
    closeOnClickAction: nasl.core.Boolean = true;

    @Prop({
      group: '主要属性',
      title: '安全区域适配',
      description: '是否开启底部安全区域适配',
      setter: { concept: 'SwitchSetter' },
    })
    safeAreaInsetBottom: nasl.core.Boolean = true;


    //TODO: 缺失columns属性
    //TODO: 缺失columns-field-names属性
    //TODO: 缺失title属性



    @Event({
      title: '选中值变化时',
      description: '选中值变化时触发',
    })
    onChange: (event: {
      value: nasl.core.String | nasl.core.Integer | nasl.collection.List<nasl.core.String | nasl.core.Integer>;
      option: any;
      selectedOptions: any[];
      trigger: 'clear' | 'check' | 'default';
    }) => any;

    @Slot({
      title: '标题',
      description: '自定义标题内容',
    })
    slotTitle: () => Array<ViewComponent>;

    @Slot({
      title: '选项',
      description: '自定义选项内容',
    })
    slotOption: (option: {
      text: nasl.core.String;
      value: nasl.core.String | nasl.core.Integer;
    }) => Array<ViewComponent>;
  }
}
