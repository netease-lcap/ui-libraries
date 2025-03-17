/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    order: 4,
    ideusage: {
      idetype: 'element',
    },
  })
  @Component({
    title: '提及',
    icon: 'mention',
    description: '提及组件',
    group: 'Form',
  })
  export class ElMention<T, V> extends ViewComponent {
    constructor(options?: Partial<ElMentionOptions<T, V> & ElFormItemProOptions>) {
      super();
    }
  }

  export class ElMentionOptions<T, V> extends ViewComponentOptions {
    @Prop({
      group: '主要属性',
      title: '数据源',
      description: '数据源',
      setter: {
        concept: 'InputSetter',
      },
    })
    dataSource: nasl.collection.List<T>;

    @Prop({
      group: '数据属性',
      title: '数据类型',
      description: '数据源返回的数据结构的类型，自动识别类型进行展示说明',
      docDescription: '该属性为只读状态，当数据源动态绑定集合List<T>后，会自动识别T的类型并进行展示。',
    })
    dataSchema: T;

    @Prop<ElMentionOptions<T, V>, 'textField'>({
      group: '数据属性',
      title: '文本字段',
      description: '集合的元素类型中，用于显示文本的属性名称',
      docDescription: '集合的元素类型中，用于显示文本的属性名称，支持自定义变更。',
      setter: {
        concept: 'PropertySelectSetter',
      },
    })
    textField: (item: T) => any = ((item: any) => item.text) as any;

    @Prop<ElMentionOptions<T, V>, 'valueField'>({
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
      group: '主要属性',
      title: '设置弹出位置	',
      description: '设置弹出位置	',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '上' }, { title: '下' }],
      },
    })
    placement: 'top' | 'bottom' = 'bottom';

    @Prop({
      group: '主要属性',
      title: '偏移量',
      description: '偏移量',
      setter: {
        concept: 'NumberInputSetter',
      },
    })
    offset: nasl.core.Integer = 0;

    @Prop({
      group: '主要属性',
      title: '整体删除',
      description: '当退格键被按下做删除操作时，是否将提及部分作为整体删除',
      setter: {
        concept: 'SwitchSetter',
      },
    })
    whole: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '触发字符',
      description: '触发提及的字符',
      setter: {
        concept: 'InputSetter',
      },
    })
    prefix: nasl.core.String = '@';

    @Event({
      title: '搜索建议项',
      description: '搜索建议项时触发',
    })
    onSearch: (item: nasl.core.String) => any;

    @Event({
      title: '选择建议项',
      description: '选择建议项时触发',
    })
    onSelect: (item: nasl.core.String) => any;
  }
}
