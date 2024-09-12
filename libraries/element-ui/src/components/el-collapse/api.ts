/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    order: 3,
    ideusage: {
      idetype: "container",
      structured: true,
      childAccept: "target.tag === 'el-collapse-item'",
      dataSource: {
        dismiss:
          "!this.getAttribute('dataSource') && this.getDefaultElements().length > 0",
        display: 3,
        loopRule: 'nth-child(n+2)',
        loopElem: " > [class^='el-collapse-item']",
        emptySlot: {
          display: 'large',
          condition: "!this.getAttribute('dataSource')",
          accept: false,
        },
        displayData: "\"[{value:'opened'},{value:'1'}, {value:'2'}]\"",
        propertyName: ":dataSource",
      },
      additionalAttribute: {
        value: "opened",
        valueField: "value",
      }
    }
  })
  @Component({
    title: '折叠面板',
    icon: 'collapse',
    description: '通过折叠面板收纳内容区域',
    group: 'Container',
  })
  export class ElCollapse<T, V> extends ViewComponent {
    @Prop({
      title: '当前激活的面板',
    })
    value: V | nasl.collection.List<V>;

    @Method({
      title: 'undefined',
      description: '清除缓存，重新加载',
    })
    reload(): void {}

    constructor(options?: Partial<ElCollapseOptions<T, V>>) {
      super();
    }
  }

  export class ElCollapseOptions<T, V> extends ViewComponentOptions {
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
      | { list: nasl.collection.List<T>; total: nasl.core.Integer }
      | nasl.collection.List<T>;

    @Prop({
      group: '数据属性',
      title: '数据类型',
      description: '数据源返回的数据结构的类型，自动识别类型进行展示说明',
      docDescription:
        '该属性为只读状态，当数据源动态绑定集合List<T>后，会自动识别T的类型并进行展示。',
    })
    dataSchema: T;

    @Prop<ElCollapseOptions<T, V>, 'valueField'>({
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
      group: '数据属性',
      sync: true,
      title: '当前激活的面板',
      description:
        '当前激活的面板(如果是手风琴模式，绑定值类型需要为`string`，否则为`array`)',
      setter: { concept: 'InputSetter' },
    })
    value: V | nasl.collection.List<V>;

    @Prop({
      group: '数据属性',
      title: '面板项属性设置',
      description: '面板项属性设置',
      setter: {
        concept: 'AnonymousFunctionSetter',
      },
      bindOpen: true,
    })
    itemProps: (current: Current<T>) => {
      disabled: nasl.core.Boolean;
    };

    @Prop({
      group: '交互属性',
      title: '手风琴模式',
      description: '手风琴模式',
      setter: { concept: 'SwitchSetter' },
    })
    accordion: nasl.core.Boolean = false;

    @Event({
      title: '当前激活面板改变时触发',
      description:
        '当前激活面板改变时触发(如果是手风琴模式，参数 `activeNames` 类型为`string`，否则为`array`)',
    })
    onChange: (event: V | nasl.collection.List<V>) => any;

    @Slot({
      title: '内容',
      description: '内容',
      emptyBackground: 'add-sub',
      snippets: [
        {
          title: '折叠面板项',
          code: '<el-collapse-item><template #title><el-text text="面板"></el-text></template></el-collapse-item>',
        },
      ],
    })
    slotDefault: () => Array<ViewComponent>;

    @Slot({
      title: '折叠面板项标题',
      description: '折叠面板项标题',
    })
    slotTitle: (current: Current<T>) => Array<ViewComponent>;

    @Slot({
      title: '折叠面板项内容',
      description: '折叠面板项内容',
    })
    slotContent: (current: Current<T>) => Array<ViewComponent>;
  }

  @IDEExtraInfo({
    "ideusage": {
      "idetype": "container",
      "parentAccept": "target.tag === 'el-collapse'",
      "events": {
        "click": true,
      }
    }
  })

  @Component({
    title: '折叠面板项',
    icon: 'collapse-item',
    description: '',
    group: 'Container',
  })
  export class ElCollapseItem extends ViewComponent {
    constructor(options?: Partial<ElCollapseItemOptions>) {
      super();
    }
  }

  export class ElCollapseItemOptions extends ViewComponentOptions {
    @Prop({
      group: '主要属性',
      title: '唯一标志符',
      description: '唯一标志符',
      setter: { concept: 'InputSetter' },
    })
    name: nasl.core.String | nasl.core.Decimal;

    @Prop({
      group: '主要属性',
      title: '是否禁用',
      description: '是否禁用',
      setter: { concept: 'SwitchSetter' },
    })
    disabled: nasl.core.Boolean;

    @Slot({
      title: '内容',
      description: '内容',
    })
    slotDefault: () => Array<ViewComponent>;

    @Slot({
      title: '标题',
      description: 'Collapse Item标题',
    })
    slotTitle: () => Array<ViewComponent>;
  }
}
