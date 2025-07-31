/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    order: 1,
    ideusage: {
      idetype: 'container',
      structured: true,
      childAccept: "['van-sidebar-item'].includes(target.tag)",
      events: {
        click: true,
      },
      namedSlotOmitWrapper: ['item'],
      dataSource: {
        dismiss: "this.getDefaultElements().length > 0 && !this.getAttribute('dataSource')",
        display: 3,
        loopRule: 'nth-child(n+2)',
        loopElem: 'div',
        propertyName: ':dataSource',
        displayData: "\"[{title: '导航一', value: '0'},{title:'导航二', value: '1'}, {title:'导航三', value: '2'}]\"",
      },
    },
  })
  @Component({
    title: '侧边导航',
    icon: 'sidebar',
    description: '侧边导航菜单，用于网站导航功能。',
    group: 'Navigation',
  })
  export class VanSidebar<T, V> extends ViewComponent {
    @Method({
      title: '重新加载',
      description: '清除缓存，重新加载',
    })
    reload(): void {}

    constructor(options?: Partial<VanSidebarOptions<T, V>>) {
      super();
    }
  }

  export class VanSidebarOptions<T, V> extends ViewComponentOptions {
    @Prop({
      group: '数据属性',
      title: '数据源',
      description: '展示数据的输入源，可设置为集合类型变量（List<T>）或输出参数为集合类型的逻辑。',
      docDescription: '支持动态绑定集合类型变量（List<T>）或输出参数为集合类型的逻辑',
      designerValue: [{}, {}, {}],
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


    @Prop({
      group: '数据属性',
      sync: true,
      title: '当前激活的导航项',
      description: '当前激活的导航项的索引',
      setter: { concept: 'InputSetter' },
    })
    modelValue: nasl.core.Integer;

    @Event({
      title: '值改变时',
      description: '当前激活的导航项改变时触发',
    })
    onChange: (value: nasl.core.Integer) => void;

    @Slot({
      title: '默认',
      description: '默认插槽，用于放置导航项',
      snippets: [
        {
          title: '导航项',
          code: '<van-sidebar-item title="导航项" />',
        },
      ],
    })
    slotDefault: () => Array<ViewComponent>;

    @Slot({
      title: '导航项',
      description: '导航项的内容',
    })
    slotItem: (current: T) => Array<ViewComponent>;
  }

  @IDEExtraInfo({
    order: 2,
    ideusage: {
      idetype: 'container',
      editable: 'text',
      textholder: 'text',
      forceUpdateWhenAttributeChange: true,
      operator: {
        delete: "!this.getParent().getParent().getAttribute('dataSource')",
      },
    },
  })
  @Component({
    title: '侧边导航项',
    icon: 'sidebar-item',
    description: '侧边导航的导航项',
    group: 'Navigation',
  })
  export class VanSidebarItem<T, V> extends ViewComponent {
    constructor(options?: Partial<VanSidebarItemOptions<T, V>>) {
      super();
    }
  }

  export class VanSidebarItemOptions<T, V> extends ViewComponentOptions {
    @Prop({
      group: '主要属性',
      title: '文本',
      description: '导航项的文本内容',
      setter: { concept: 'InputSetter' },
    })
    title: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '是否禁用',
      description: '是否禁用该导航项',
      setter: { concept: 'SwitchSetter' },
    })
    disabled: nasl.core.Boolean = false;

    @Prop({
      group: '样式属性',
      title: '徽标内容',
      description: '导航项的徽标内容',
      setter: { concept: 'InputSetter' },
    })
    badge: nasl.core.String | nasl.core.Integer;

    @Prop({
      group: '样式属性',
      title: '徽标是否为小圆点',
      description: '徽标是否为小圆点',
      setter: { concept: 'SwitchSetter' },
    })
    dot: nasl.core.Boolean = false;


    @Event({
      title: '点击',
      description: '点击导航项时触发',
    })
    onClick: (event: MouseEvent) => void;


  }
}
