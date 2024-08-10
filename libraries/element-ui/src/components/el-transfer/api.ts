/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
  })
  @Component({
    title: '穿梭框',
    icon: 'transfer',
    description: '',
    group: 'Selector',
  })
  export class ElTransfer extends ViewComponent {
    constructor(options?: Partial<ElTransferOptions>) {
      super();
    }

    @Method({
      title: 'Clear Query',
      description: '清空某个面板的搜索关键词',
    })
    clearQuery(): any {}
  }

  export class ElTransferOptions extends ViewComponentOptions {
    @Prop({
      group: '主要属性',
      sync: true,
      title: 'Value V Model',
      description: '绑定值',
      setter: { concept: 'InputSetter' },
    })
    value: any[];

    @Prop({
      group: '主要属性',
      title: 'Data',
      description: 'Transfer 的数据源',
      setter: { concept: 'InputSetter' },
    })
    data: any = [];

    @Prop({
      group: '主要属性',
      title: 'Filterable',
      description: '是否可搜索',
      setter: { concept: 'SwitchSetter' },
    })
    filterable: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: 'Filter Placeholder',
      description: '搜索框占位符',
      setter: { concept: 'InputSetter' },
    })
    filterPlaceholder: nasl.core.String = '请输入搜索内容';

    @Prop({
      group: '主要属性',
      title: 'Filter Method',
      description: '自定义搜索方法',
      setter: { concept: 'InputSetter' },
    })
    filterMethod: any;

    @Prop({
      group: '主要属性',
      title: 'Target Order',
      description:
        '右侧列表元素的排序策略：若为 `original`，则保持与数据源相同的顺序；若为 `push`，则新加入的元素排在最后；若为 `unshift`，则新加入的元素排在最前',
      setter: {
        concept: 'EnumSelectSetter',
        options: [
          { title: 'original' },
          { title: 'push' },
          { title: 'unshift' },
        ],
      },
    })
    targetOrder: 'original' | 'push' | 'unshift' = 'original';

    @Prop({
      group: '主要属性',
      title: 'Titles',
      description: '自定义列表标题',
      setter: { concept: 'InputSetter' },
    })
    titles: any[] = ['列表 1', '列表 2'];

    @Prop({
      group: '主要属性',
      title: 'Button Texts',
      description: '自定义按钮文案',
      setter: { concept: 'InputSetter' },
    })
    buttonTexts: any[] = [];

    @Prop({
      group: '主要属性',
      title: 'Render Content',
      description: '自定义数据项渲染函数',
      setter: { concept: 'InputSetter' },
    })
    renderContent: any;

    @Prop({
      group: '主要属性',
      title: 'Format',
      description: '列表顶部勾选状态文案',
      setter: { concept: 'InputSetter' },
    })
    format: any;

    @Prop({
      group: '主要属性',
      title: 'Props',
      description: '数据源的字段别名',
      setter: { concept: 'InputSetter' },
    })
    props: any;

    @Prop({
      group: '主要属性',
      title: 'Left Default Checked',
      description: '初始状态下左侧列表的已勾选项的 key 数组',
      setter: { concept: 'InputSetter' },
    })
    leftDefaultChecked: any[] = [];

    @Prop({
      group: '主要属性',
      title: 'Right Default Checked',
      description: '初始状态下右侧列表的已勾选项的 key 数组',
      setter: { concept: 'InputSetter' },
    })
    rightDefaultChecked: any[] = [];

    @Event({
      title: 'On Change',
      description: '右侧列表元素变化时触发',
    })
    onChange: (event: any) => any;

    @Event({
      title: 'On Left Check Change',
      description: '左侧列表元素被用户选中 / 取消选中时触发',
    })
    onLeftCheckChange: (event: any) => any;

    @Event({
      title: 'On Right Check Change',
      description: '右侧列表元素被用户选中 / 取消选中时触发',
    })
    onRightCheckChange: (event: any) => any;

    @Slot({
      title: 'Left Footer',
      description: '左侧列表底部的内容',
    })
    slotLeftFooter: () => Array<ViewComponent>;

    @Slot({
      title: 'Right Footer',
      description: '右侧列表底部的内容',
    })
    slotRightFooter: () => Array<ViewComponent>;

    @Slot({
      title: 'Default',
      description: '自定义数据项的内容，参数为 { option }',
    })
    slotDefault: (current: Current<any>) => Array<ViewComponent>;
  }
}
