/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    order: 3,
    ideusage: {
      idetype: 'container',
      structured: true,
      childAccept: "target.tag === 'van-collapse-item'",
      dataSource: {
        dismiss: "!this.getAttribute('dataSource') && this.getDefaultElements().length > 0",
        display: 3,
        loopRule: 'nth-child(n+2)',
        loopElem: " > [class^='van-collapse-item']",
        emptySlot: {
          display: 'inline',
          condition: "!this.getAttribute('dataSource')",
          accept: false,
        },
        displayData: "\"[{name:'opened'},{name:'1'}, {name:'2'}]\"",
        propertyName: ':dataSource',
      },
      additionalAttribute: {
        nameField: 'name',
      },
      displaySlotConditions: {
        title: "!!this.getAttribute('dataSource')",
        value: "!!this.getAttribute('dataSource')",
        label: "!!this.getAttribute('dataSource')",
        content: "!!this.getAttribute('dataSource')",
      },
      forceUpdateWhenAttributeChange: true,
    },
  })
  @Component({
    title: '折叠面板',
    icon: 'collapse',
    description: '通过折叠面板收纳内容区域',
    group: 'Container',
  })
  export class VanCollapse<T, V> extends ViewComponent {
    constructor(options?: Partial<VanCollapseOptions<T, V>>) {
      super();
    }

    @Prop({
      title: '当前激活的面板',
    })
    modelValue: V | nasl.collection.List<V>;

    @Method({
      title: 'undefined',
      description: '清除缓存，重新加载',
    })
    reload(): void {}

    @Method({
      title: '切换',
      description: '切换所有面板展开状态，传 true 为全部展开，false 为全部收起，不传参为全部切换',
    })
    toggleAll(
      @Param({
        title: '是否展开',
        description: '设置展开状态',
    })
    expand?: nasl.core.Boolean,
    ): void {}
  }

  export class VanCollapseOptions<T, V> extends ViewComponentOptions {
    @Prop({
      group: '数据属性',
      title: '数据源',
      description: '展示数据的输入源，可设置为集合类型变量（List<T>）或输出参数为集合类型的逻辑。',
      docDescription: '支持动态绑定集合类型变量（List<T>）或输出参数为集合类型的逻辑',
      bindOpen: true,
    })
    dataSource: { list: nasl.collection.List<T>; total: nasl.core.Integer } | nasl.collection.List<T>;

    @Prop({
      group: '数据属性',
      title: '数据类型',
      description: '数据源返回的数据结构的类型，自动识别类型进行展示说明',
      docDescription: '该属性为只读状态，当数据源动态绑定集合List<T>后，会自动识别T的类型并进行展示。',
    })
    dataSchema: T;

    @Prop<VanCollapseOptions<T, V>, 'nameField'>({
      group: '数据属性',
      title: '唯一标识字段',
      description: '集合的元素类型中，用于标识选中值的属性',
      docDescription: '集合的元素类型中，用于标识选中值的属性，支持自定义变更',
      setter: {
        concept: 'PropertySelectSetter',
      },
    })
    nameField: (item: T) => V = ((item: any) => item.name) as any;

    @Prop({
      group: '数据属性',
      sync: true,
      title: '当前激活的面板',
      description: '当前激活的面板(如果是手风琴模式，绑定值类型需要为`string`，否则为`array`)',
      setter: { concept: 'InputSetter' },
    })
    modelValue: V | nasl.collection.List<V>;

    @Prop<VanCollapseOptions<T, V>, 'disabledField'>({
      group: '数据属性',
      title: '禁用字段',
      description: '集合的元素类型中，用于标识节点的disabled属性',
      docDescription: '集合的元素类型中，用于标识节点是否被禁用的属性',
      setter: {
        concept: 'PropertySelectSetter',
      },
    })
    disabledField: (item: T) => any = ((item: any) => item.disabled) as any;

    @Prop({
      group: '交互属性',
      title: '手风琴模式',
      description: '是否开启手风琴模式',
      setter: {
        concept: "SwitchSetter"
      }
    })
    accordion: nasl.core.Boolean = false;

    @Prop({
      group: '样式属性',
      title: '是否显示边框',
      description: '是否显示边框',
      setter: {
        concept: "SwitchSetter"
      }
    })
    border: nasl.core.Boolean = true;

    @Prop({
      group: '样式属性',
      title: '标题右侧图标',
      description: '标题右侧图标',
      setter: {
        concept: 'IconSetter',
        customIconFont: 'LCAP_VANT4_ICONS',
      },
      if: (_) => !!_.dataSource,
    })
    rightIcon: nasl.core.String;

    @Event({
      title: '当前激活面板改变时触发',
      description: '当前激活面板改变时触发(如果是手风琴模式，参数 `activeNames` 类型为`string`，否则为`array`)',
    })
    onChange: (event: V | nasl.collection.List<V>) => any;

    @Slot({
      title: '内容',
      description: '内容',
      snippets: [
        {
          title: '折叠面板项',
          code: `<van-collapse-item>
            <template #title>
              <van-text text="面板"></van-text>
            </template>
          </van-collapse-item>`,
        },
      ],
    })
    slotDefault: () => Array<ViewComponent>;

    @Slot({
      title: '内容',
      description: 'Collapse Item内容',
    })
    slotContent: (current: Current<T>) => Array<ViewComponent>;

    @Slot({
      title: '标题栏左侧内容',
      description: 'Collapse Item标题栏左侧内容',
    })
    slotTitle: (current: Current<T>) => Array<ViewComponent>;

    @Slot({
      title: '标题栏右侧内容',
      description: 'Collapse Item自定义标题栏右侧内容',
    })
    slotValue: (current: Current<T>) => Array<ViewComponent>;

    @Slot({
      title: '标题栏描述信息',
      description: 'Collapse Item自定义标题栏描述信息',
    })
    slotLabel: (current: Current<T>) => Array<ViewComponent>;
  }

  @IDEExtraInfo({
    ideusage: {
      idetype: 'container',
      parentAccept: "target.tag === 'van-collapse'",
      events: {
        click: true,
      },
    },
  })

  @Component({
    title: '折叠面板项',
    icon: 'collapse-item',
    description: '',
    group: 'Container',
  })
  export class VanCollapseItem<T, V> extends ViewComponent {
    constructor(options?: Partial<VanCollapseItemOptions<T, V>>) {
      super();
    }

    @Method({
      title: '切换',
      description: '切换面板展开状态，传 true 为展开，false 为收起，不传参为切换',
    })
    toggle(
      @Param({
        title: '是否展开',
        description: '设置展开状态',
    })
    expand?: nasl.core.Boolean,
    ): void {}
  }

  export class VanCollapseItemOptions<T, V> extends ViewComponentOptions {
    @Prop({
      group: '数据属性',
      title: '值',
      description: '用于标识面板项的值'
    })
    name: nasl.core.String | nasl.core.Integer;

    @Prop({
      group: '状态属性',
      title: '禁用',
      description: '置灰显示，且禁止任何交互（焦点、点击、选择、输入等）',
      setter: {
        concept: "SwitchSetter"
      }
    })
    disabled: nasl.core.Boolean = false;

    @Prop({
      group: '样式属性',
      title: '标题右侧图标',
      description: '标题右侧图标',
      setter: {
        concept: 'IconSetter',
        customIconFont: 'LCAP_VANT4_ICONS',
      },
    })
    rightIcon: nasl.core.String;

    @Slot({
      title: '内容',
      description: '内容',
    })
    slotDefault: () => Array<ViewComponent>;

    @Slot({
      title: '标题栏左侧内容',
      description: 'Collapse Item标题栏左侧内容',
    })
    slotTitle: () => Array<ViewComponent>;

    @Slot({
      title: '标题栏右侧内容',
      description: 'Collapse Item自定义标题栏右侧内容',
    })
    slotValue: () => Array<ViewComponent>;

    @Slot({
      title: '标题栏描述信息',
      description: 'Collapse Item自定义标题栏描述信息',
    })
    slotLabel: () => Array<ViewComponent>;
  }
}
