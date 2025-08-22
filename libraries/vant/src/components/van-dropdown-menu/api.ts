/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    order: 1,
    ideusage: {
      idetype: 'container',
      structured: true,
      childAccept: "['van-dropdown-item', 'van-dropdown-item-son'].includes(target.tag)",
      translateBindingProperty: ["direction"],
      forceUpdateWhenAttributeChange: true,
      events: {
        click: true
      },
    },
  })
  @Component({
    title: '下拉菜单',
    icon: 'dropdown-menu',
    description: '向下弹出的菜单列表。',
    group: 'Navigation',
  })
  export class VanDropdownMenu extends ViewComponent {
    @Event({
      title: '关闭所有菜单的展示状态',
      description: '关闭所有菜单的展示状态',
    })
    close: () => void;
    constructor(options?: Partial<VanDropdownMenuOptions>) {
      super();
    }
  }

  export class VanDropdownMenuOptions extends ViewComponentOptions {
    @Prop({
      group: '主要属性',
      title: '菜单标题和选项的选中态颜色',
      description: '菜单标题和选项的选中态颜色',
      setter: { concept: 'InputSetter' },
    })
    activeColor: nasl.core.String = '#1989fa';

    @Prop({
      group: '主要属性',
      title: '菜单展开方向',
      description: '菜单展开方向',
      setter: { 
        concept: 'EnumSelectSetter', 
        options: [{ title: '上' }, { title: '下' }] },
    })
    direction: 'up' | 'down' = 'down';

    @Prop({
      group: '主要属性',
      title: '菜单栏 z-index 层级',
      description: '菜单栏 z-index 层级',
      setter: { concept: 'NumberInputSetter' },
    })
    zIndex: nasl.core.Integer = 10;

    @Prop({
      group: '主要属性',
      title: '动画时长',
      description: '动画时长，单位秒，设置为 0 可以禁用动画',
      setter: { concept: 'InputSetter' },
    })
    duration: nasl.core.String = '0.2';

    @Prop({
      group: '主要属性',
      title: '是否显示遮罩层',
      description: '是否显示遮罩层',
      setter: { concept: 'SwitchSetter' },
    })
    overlay: nasl.core.Boolean = true;

    @Prop({
      group: '主要属性',
      title: '是否在点击遮罩层后关闭菜单',
      description: '是否在点击遮罩层后关闭菜单',
      setter: { concept: 'SwitchSetter' },
    })
    closeOnClickOverlay: nasl.core.Boolean = true;

    @Prop({
      group: '主要属性',
      title: '是否在点击外部元素后关闭菜单',
      description: '是否在点击外部元素后关闭菜单',
      setter: { concept: 'SwitchSetter' },
    })
    closeOnClickOutside: nasl.core.Boolean = true;

    @Prop({
      group: '主要属性',
      title: '滚动阈值',
      description: '滚动阈值，选项数量超过阈值且总宽度超过菜单栏宽度时，可以横向滚动',
      setter: { concept: 'NumberInputSetter' },
    })
    swipeThreshold: nasl.core.Integer;

    @Prop({
      group: '主要属性',
      title: '自动调整下拉菜单的位置',
      description: '是否在祖先元素设置了 transform 时，自动调整下拉菜单的位置',
      setter: { concept: 'SwitchSetter' },
    })
    autoLocate: nasl.core.Boolean = false;

    @Slot({
      title: '菜单项',
      description: '插入`<van-dropdown-menu>`子组件。',
      emptyBackground: 'add-sub',
      snippets: [{
        title: '菜单项',
        code: `<van-dropdown-item>
          <template #title>
            <van-text>标题N</van-text>
          </template>
          <van-flex />
        </van-dropdown-item>`
      }]
    })
    slotDefault: () => Array<VanDropdownItem<any>>;
  }

  @IDEExtraInfo({
    order: 2,
    ideusage: {
      idetype: 'container',
      structured: false,
      parentAccept: "target.tag.endsWith('van-dropdown-menu')",
      // childAccept: "['van-dropdown-item-son'].includes(target.tag)",
      forceUpdateWhenAttributeChange: true,
      dataSource: {
        dismiss: "this.getDefaultElements().length > 0 && !this.getAttribute('dataSource')",
        display: 3,
        emptySlot: {
          display: "inline",
          condition: "!this.getAttribute('dataSource')",
          accept: false
        },
        loopRule: 'nth-child(n+2)',
        loopElem: ".van-popup .van-cell",
      },
      forceRefresh: { slot: 'title' },
    },
  })
  @Component({
    title: '菜单项',
    group: 'Navigation',  
  })
  export class VanDropdownItem<T> extends ViewComponent {
    @Method({
      title: '切换菜单展示状态',
      description: '切换菜单展示状态，传 true 为显示，false 为隐藏，不传参为取反',
    })
    toggle(
      @Param({
        title: '是否显示',
        description: '是否显示',
      })
      show?: nasl.core.Boolean,
    ): void {}

    constructor(options?: Partial<VanDropdownItemOptions<T>>) {
      super();
    }
  }

  export class VanDropdownItemOptions<T> extends ViewComponentOptions {
    @Prop({
      group: '数据属性',
      title: '数据源',
      description: '展示数据的输入源，可设置为数据集对象或者返回数据集的逻辑。',
      designerValue: [{}, {}, {}],
    })
    dataSource: nasl.collection.List<T> | { total: nasl.core.Integer; list: nasl.collection.List<T> };
    
    @Prop({
      group: '数据属性',
      title: '数据类型',
      description: '集合类型每一元素的数据类型'
    })
    dataSchema: T;

    @Prop({
      group: '数据属性',
      title: '文本字段',
      description: '集合的元素类型中，用于显示文本的属性名称',
      setter: {
        concept: 'PropertySelectSetter',
      },
    })
    textField: (item: T) => any = ((item: any) => item.text) as any;

    @Prop({
      group: '数据属性',
      title: '值字段',
      description: '集合的元素类型中，用于标识选中值的属性',
      setter: {
        concept: 'PropertySelectSetter',
      },
    })
    valueField: (item: T) => any = ((item: any) => item.value) as any;

    @Prop({
      group: '数据属性',
      title: '禁用字段',
      description: '集合的元素类型中，用于标识禁用项的属性',
      setter: {
        concept: 'PropertySelectSetter',
      },
    })
    disabledField: (item: T) => any = ((item: any) => item.disabled) as any;

    @Prop({
      group: '数据属性',
      title: '图标属性字段',
      description: '集合的元素类型中，用于图标的属性名称',
      setter: {
        concept: 'PropertySelectSetter',
      },
    })
    iconField: (item: T) => any = ((item: any) => item.icon) as any;

    @Prop({
      group: '数据属性',
      title: '值',
      description: '用于标识菜单项的值',
      sync: true
    })
    modelValue: nasl.core.String;

    // @Prop({
    //   group: '主要属性',
    //   title: '菜单项标题，默认展示当前选中项文字',
    //   description: '菜单项标题',
    // })
    // title: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '是否禁用菜单',
      description: '是否禁用菜单',
      setter: { concept: 'SwitchSetter' },
    })
    disabled: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '是否在首次展开时才渲染菜单内容',
      description: '是否在首次展开时才渲染菜单内容',
      setter: { concept: 'SwitchSetter' },
    })
    lazyRender: nasl.core.Boolean = true;

    @Event({
      title: '菜单项点击事件',
      description: '菜单项点击事件',
    })
    onChange: (event: nasl.core.String) => void;

    @Event({
      title: '打开菜单栏时触发',
      description: '打开菜单栏时触发',
    })
    onOpen: () => void;

    @Event({
      title: '关闭菜单栏时触发',
      description: '关闭菜单栏时触发',
    })
    onClose: () => void;

    @Event({
      title: '打开菜单栏且动画结束后触发',
      description: '打开菜单栏且动画结束后触发',
    })
    onOpened: () => void;

    @Event({
      title: '关闭菜单栏且动画结束后触发',
      description: '关闭菜单栏且动画结束后触发',
    })
    onClosed: () => void;

    @Slot({
      title: '自定义菜单内容',
      description: '自定义菜单内容',
      // emptyBackground: 'add-sub',
      // snippets: [{
      //   title: '菜单子项',
      //   code: `<van-dropdown-item-son title="选项n" />`
      // }]
    })
    slotDefault: () => Array<ViewComponent>;

    @Slot({
      title: '自定义菜单项标题',
      description: '自定义菜单项标题',
    })
    slotTitle: () => Array<ViewComponent>;
  }

//   @IDEExtraInfo({
//     order: 3,
//     ideusage: {
//       idetype: 'container',
//       structured: false,
//       parentAccept: "target.tag.endsWith('van-dropdown-item')",
//       forceUpdateWhenAttributeChange: true,
//       forceRefresh: 'parent',
//     },
//   })
//   @Component({
//     title: '菜单子项',
//     group: 'Navigation',  
//   })
//   export class VanDropdownItemSon<T> extends ViewComponent {
//     constructor(options?: Partial<VanDropdownItemSonOptions<T>>) {
//       super();
//     }
//   }
//   export class VanDropdownItemSonOptions<T> extends ViewComponentOptions {
//     @Prop({
//       group: '数据属性',
//       title: '菜单子项标识符',
//       description: '菜单子项标识符',
//       setter: { concept: 'InputSetter' },
//     })
//     value: nasl.core.String;
    
//     @Prop({
//       group: '主要属性',
//       title: '菜单子项标题',
//       description: '菜单子项标题',
//       setter: { concept: 'InputSetter' },
//     })
//     title: nasl.core.String = '选项n';

//     @Prop({
//       group: '主要属性',
//       title: '是否禁用菜单子项',
//       description: '是否禁用菜单子项',
//       setter: { concept: 'SwitchSetter' },
//     })
//     disabled: nasl.core.Boolean = false;

//     @Prop({
//       group: '主要属性',
//       title: '菜单子项图标',
//       description: '左侧图标名称或图片链接',
//       setter: { concept: 'InputSetter' },
//     })
//     icon: nasl.core.String;

//     @Event({
//       title: '菜单子项点击事件',
//       description: '菜单子项点击事件',
//     })
//     onClick: (event: nasl.core.String) => void;

//     @Slot({
//       title: '自定义菜单子项右侧内容',
//       description: '自定义菜单子项右侧内容',
//     })
//     slotExtra: () => Array<ViewComponent>;
//   }
}
